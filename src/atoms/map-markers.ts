import { atom } from "jotai";
import { GetMaps } from "@/requests/get/map-markers/types";

export const mapMarkersAtom = atom<GetMaps.MapMarker[] | null>(null);