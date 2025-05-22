import { useAtom } from "jotai";
import { mapMarkersAtom } from "@/atoms/map-markers";

export function useMapMarkers() {
  const [mapMarkers, setMapMarkers] = useAtom(mapMarkersAtom);
  const loading = mapMarkers === null;
  return { mapMarkers: mapMarkers ?? [], loading, setMapMarkers };
}
