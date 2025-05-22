/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";

import { useEffect, useState } from "react";
import { Edit } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import { getMapMarkers } from "@/requests/get";
import { ScreenContentDefault } from "../components/ScreenContentDefault";
import { signOut, useSession } from "next-auth/react";
import { GetMaps } from "@/requests/get/map-markers/types";
import { deleteMapMarker } from "@/requests/delete/map-markers";
import { MapMarkerList } from "../components/map-marker/MapMarkerList";

const MapMarkers = () => {
  const { data: session, status } = useSession({ required: true });

  const [_, setIsLoading] = useState(false);
  const [page] = useState(1);
  const [limit] = useState(10);
  const [mapMakers, setMapMarkers] = useState<GetMaps.MapMarker[] | null>(null);

  useEffect(() => {
    const fetchMapMarkers = async () => {
      const response = await getMapMarkers({ page, limit });
      setMapMarkers(Array.isArray(response) ? response : null);
    };
    fetchMapMarkers();
  }, [page, limit]);

  if (!mapMakers || mapMakers.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  const handleDeleteMapMarker = async (id: string) => {
    setMapMarkers(mapMakers.filter((mapMaker) => mapMaker._id !== id));
    setIsLoading(true);

    try {
      const apiToken = (session as any).apiToken as string;
      const response = await deleteMapMarker(id, apiToken);

      if (response.status === 401) {
        signOut({ redirect: false });
      }

      if (!response.ok) {
        throw new Error();
      }

      toast.success("Map Marker deleted", {
        description: "The map marker has been successfully deleted.",
      });
    } catch (error) {
      toast.error("Error in delete map marker!", {
        description:
          error instanceof Error
            ? error.message
            : "There was an error creating your map marker.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (status === "loading") {
    return <div className="text-center py-12">Loading...</div>;
  }

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
          mapMarkers={mapMakers}
          onDeleteMapMarker={handleDeleteMapMarker}
        />
      </div>
    </ScreenContentDefault>
  );
};

export default MapMarkers;
