/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ScreenContentDefault } from "../components/ScreenContentDefault";
import { signOut, useSession } from "next-auth/react";
import { createMapMarker } from "@/requests/post/map-markers";
import { PostMapMarker } from "@/requests/post/map-markers/types";
import { MapMarkerEditor } from "../components/map-marker/MapMarkerEditor";

const NewMapMarker = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { data: session, status } = useSession({ required: true });

  if (status === "loading") return <p>Loading…</p>;

  if (!session || !(session as any).apiToken) {
    signOut({ redirect: false });
    router.replace("/sign-in");
    return null;
  }

  const handleSaveMapMarker = async (data: PostMapMarker.Create) => {
    setIsLoading(true);

    try {
      const apiToken = (session as any).apiToken as string;
      const response = await createMapMarker(data, apiToken);

      if (response.status === 401) {
        signOut({ redirect: false });
      }

      if (!response.ok) {
        throw new Error();
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
