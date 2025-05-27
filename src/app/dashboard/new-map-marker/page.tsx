/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import { PostMapMarker } from "@/requests/post/map-markers/types";
import { createMapMarker } from "@/requests/post/map-markers";

import { MapMarkerEditor } from "../components/map-marker/MapMarkerEditor";
import { ScreenContentDefault } from "../components/ScreenContentDefault";

import Loading from "@/components/loading";

import { useMapMarkers } from "@/hooks/use-map-markers";
import { useReviews } from "@/hooks/use-reviews";
import { useLoading } from "@/hooks/use-loading";

const NewMapMarker = () => {
  const { setMapMarkers, mapMarkers } = useMapMarkers();
  const { reviews } = useReviews();

  const { isLoading, setIsLoading } = useLoading();
  const router = useRouter();

  const { data: session, status } = useSession({ required: true });

  if (status === "loading") return <Loading />;

  const handleSaveMapMarker = async (data: PostMapMarker.Create) => {
    setIsLoading(true);

    try {
      const apiToken = (session as any).apiToken as string;
      const response = await createMapMarker(data, apiToken);

      if (!response.ok) {
        throw new Error();
      }

      const reviewData = reviews.find((e) => e._id === data.reviewId);

      if (reviewData?._id) {
        const responseData = await response.json();

        setMapMarkers([
          ...mapMarkers,
          {
            _id: responseData.data._id,
            latitude: Number(data.latitude),
            longitude: Number(data.longitude),
            review: {
              _id: data.reviewId,
              thumbnail: reviewData.thumbnail,
              headline: reviewData.headline,
            },
          },
        ]);
      }

      toast.success("Map marker created", {
        description: "Your map marker been successfully created.",
      });
    } catch {
      toast.error("Error!", {
        description: "There was an error creating your map marker.",
      });
    } finally {
      setIsLoading(false);
    }

    router.push("/dashboard/map-markers");
  };

  return (
    <ScreenContentDefault>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">New Map Marker</h1>
          <p className="text-muted-foreground">
            Create a map marker based in a review.
          </p>
        </div>

        <div className="bg-card rounded-lg border p-6 shadow-sm">
          <MapMarkerEditor onSave={handleSaveMapMarker} isLoading={isLoading} />
        </div>
      </div>
    </ScreenContentDefault>
  );
};

export default NewMapMarker;
