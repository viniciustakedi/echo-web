import { useCallback, useEffect } from "react";
import { useAtom } from "jotai";

import { mapMarkersAtom, mapMarkersIsLoadingAtom, totalMapMarkersAtom } from "@/atoms/map-markers";

import { GetMaps } from "@/requests/get/map-markers/types";
import { getMapMarkers } from "@/requests/get";

import { useLoading } from "./use-loading";

export function useMapMarkers() {
  const { setIsLoading } = useLoading();

  const [mapMarkers, setMapMarkersAtom] = useAtom(mapMarkersAtom);
  const [isMapMarkersLoading, setIsMapMarkersLoading] = useAtom(mapMarkersIsLoadingAtom);
  const [totalMapMarkers, setTotalMapMarkers] = useAtom(totalMapMarkersAtom);

  const setMapMarkers = useCallback((newValue: GetMaps.MapMarker[] | null) => {
    setMapMarkersAtom(newValue);
  }, [setMapMarkersAtom]);

  useEffect(() => {
    if (mapMarkers === null && !isMapMarkersLoading) {
      setIsMapMarkersLoading(true);
      setIsLoading(true);

      getMapMarkers({ page: 1, limit: 15 }).then((fetched) => {
        setMapMarkers(Array.isArray(fetched.data) ? fetched.data : []);
        setTotalMapMarkers(fetched.total);
      }).finally(() => {
        setIsMapMarkersLoading(false);
        setIsLoading(false);
      });
    }
  }, [mapMarkers, setMapMarkers, isMapMarkersLoading, setIsLoading, setIsMapMarkersLoading, setTotalMapMarkers]);

  const refetchMapMarkers = useCallback(async ({ page, limit }: { page: number; limit: number }) => {
    if (isMapMarkersLoading) return;

    setIsMapMarkersLoading(true);
    setIsLoading(true);

    const fetched = await getMapMarkers({ page, limit });

    setTotalMapMarkers(fetched.total);
    setMapMarkers(Array.isArray(fetched.data) ? fetched.data : []);

    setIsMapMarkersLoading(false);
    setIsLoading(false);
  }, [setMapMarkersAtom, isMapMarkersLoading, setIsLoading, setIsMapMarkersLoading, setTotalMapMarkers]);

  return {
    mapMarkers: mapMarkers ?? [],
    setMapMarkers,
    refetchMapMarkers,
    pageLimit: 15,
    total: totalMapMarkers
  };
}
