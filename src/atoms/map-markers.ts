import { atom } from "jotai";
import { GetMaps } from "@/requests/get/map-markers/types";

export const mapMarkersAtom = atom<GetMaps.MapMarker[] | null>(null);
export const mapMarkersIsLoadingAtom = atom<boolean>(false);
export const totalMapMarkersAtom = atom<number>(0);