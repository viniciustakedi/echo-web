/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

import { updateMapMarker } from "@/requests/patch/map-markers";
import { PatchMaps } from "@/requests/patch/map-markers/types";
import { GetMaps } from "@/requests/get/map-markers/types";
import { getMapMarkerById } from "@/requests/get";

import { ScreenContentDefault } from "../../components/ScreenContentDefault";
import { MapMarkerEditor } from "../../components/map-marker/MapMarkerEditor";
import Loading from "@/components/loading";

import { useLoading } from "@/hooks/use-loading";
import { useMapMarkers } from "@/hooks/use-map-markers";

const EditMapMarker = () => {
  const { data: session } = useSession({ required: true });
  const { mapMarkers, setMapMarkers } = useMapMarkers();

  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { isLoading, setIsLoading } = useLoading();
  const [mapMarkerData, setMapMarkerData] =
    useState<GetMaps.MapMarkerDetailed | null>(null);

  useEffect(() => {
    const getchMapMarker = async () => {
      setIsLoading(true);

      const response = await getMapMarkerById(id);

      if (!response) {
        toast.error("Error", {
          description: "Map marker not found.",
        });
        router.push("/dashboard/map-markers");
        return;
      }

      setMapMarkerData(response);
      setIsLoading(false);
    };

    getchMapMarker();
  }, [id, router, setIsLoading]);

  const handleSaveMapMarker = async (data: PatchMaps.UpdateMapMarker) => {
    setIsLoading(true);

    try {
      const apiToken = (session as any).apiToken as string;

      if (!mapMarkerData?._id) {
        throw new Error("Map marker id didn't found to update.");
      }

      const response = await updateMapMarker(mapMarkerData._id, data, apiToken);

      if (!response.ok) {
        throw new Error((await response.json()).message);
      }

      const oldMapMarker = mapMarkers.find((e) => e._id === mapMarkerData._id);

      if (oldMapMarker) {
        setMapMarkers([
          ...mapMarkers.filter((e) => e._id !== mapMarkerData._id),
          {
            _id: oldMapMarker._id,
            latitude: Number(data.latitude),
            longitude: Number(data.longitude),
            review: {
              _id: data.reviewId,
              thumbnail: oldMapMarker.review.thumbnail,
              headline: oldMapMarker.review.headline,
            },
          },
        ]);
      }


      toast.success("Map marker updated", {
        description: "Your map marker has been successfully updated.",
      });

      router.push(`/dashboard/map-marker/${id}`);
    } catch (error) {
      toast.error("Error", {
        description:
          error instanceof Error
            ? error.message
            : "There was an error updating your map marker.",
      });
    } finally {
      setIsLoading(false);
    }

    router.push("/dashboard/map-markers");
  };

  if (!mapMarkerData) {
    return <Loading />;
  }

  return (
    <ScreenContentDefault>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Edit Map Marker</h1>
          <p className="text-muted-foreground">Update your map marker.</p>
        </div>

        <div className="bg-card rounded-lg border p-6 shadow-sm">
          <MapMarkerEditor
            initialData={mapMarkerData}
            onSave={handleSaveMapMarker}
            isLoading={isLoading}
          />
        </div>
      </div>
    </ScreenContentDefault>
  );
};

export default EditMapMarker;
