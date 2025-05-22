import { atom } from "jotai";
import { GetMaps } from "@/requests/get/map-markers/types";
import { getMapMarkers } from "@/requests/get";

let _fetchedMapMarkers: GetMaps.MapMarker[] | null = null;

export const mapMarkersAtom = atom<GetMaps.MapMarker[] | null>(null);

mapMarkersAtom.onMount = (setAtom) => {
  if (_fetchedMapMarkers !== null) {
    setAtom(_fetchedMapMarkers);
    return;
  }

  getMapMarkers({ page: 1, limit: 10 }).then((fetched) => {
    _fetchedMapMarkers = Array.isArray(fetched) ? fetched : [];
    setAtom(_fetchedMapMarkers);
  });
};
