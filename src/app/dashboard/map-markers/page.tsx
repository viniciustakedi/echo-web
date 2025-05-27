"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { useSession } from "next-auth/react";
import { Edit, Rss } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import Link from "next/link";

import { ScreenContentDefault } from "../components/ScreenContentDefault";
import { MapMarkerList } from "../components/map-marker/MapMarkerList";
import { Button } from "@/components/ui/button";

import { deleteMapMarker } from "@/requests/delete/map-markers";
import { useMapMarkers } from "@/hooks/use-map-markers";
import Loading from "@/components/loading";

const MapMarkers = () => {
  const { data: session, status } = useSession({ required: true });
  const { mapMarkers, setMapMarkers } = useMapMarkers();

  const [_, setIsLoading] = useState(false);

  if (status === "loading" || !mapMarkers || mapMarkers.length === 0) {
    return <Loading />;
  }

  const handleDeleteMapMarker = async (id: string) => {
    setIsLoading(true);

    try {
      const apiToken = (session as any).apiToken as string;
      const response = await deleteMapMarker(id, apiToken);

      if (!response.ok) {
        throw new Error((await response.json()).message);
      }

      toast.success("Map Marker deleted", {
        description: "The map marker has been successfully deleted.",
      });

      setMapMarkers(mapMarkers.filter((mapMarker) => mapMarker._id !== id));
    } catch {
      toast.error("There was an error creating your map marker.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScreenContentDefault>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Map Markers</h1>
          <Button asChild>
            <Link href="/dashboard/new-map-marker">
              <Edit className="mr-2 h-4 w-4" />
              New Map Marker
            </Link>
          </Button>
        </div>

        <MapMarkerList
          mapMarkers={mapMarkers}
          onDeleteMapMarker={handleDeleteMapMarker}
        />
      </div>
    </ScreenContentDefault>
  );
};

export default MapMarkers;
