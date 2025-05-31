import { useAtom } from "jotai";
import { mapMarkersAtom } from "@/atoms/map-markers";
import { useCallback, useEffect } from "react";
import { GetMaps } from "@/requests/get/map-markers/types";
import { getMapMarkers } from "@/requests/get";

export function useMapMarkers() {
  const [mapMarkers, setMapMarkersAtom] = useAtom(mapMarkersAtom);

  useEffect(() => {
    if (mapMarkers === null) { 
    getMapMarkers({ page: 1, limit: 15 }).then((fetched) => {
        setMapMarkers(fetched);
      });
    }
  }, [mapMarkers]);

  const setMapMarkers = useCallback((newValue: GetMaps.MapMarker[] | null) => {
    setMapMarkersAtom(newValue);
  }, [setMapMarkersAtom]);

  return {
    mapMarkers: mapMarkers ?? [],
    loading: mapMarkers === null,
    setMapMarkers
  };
}
