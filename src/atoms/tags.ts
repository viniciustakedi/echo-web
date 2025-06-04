import { atom } from "jotai";
import type { GetTags } from "@/requests/get/tags/types";

export const tagsAtom = atom<GetTags.Tags[] | null>(null);
export const tagsIsLoadingAtom = atom<boolean>(false);
export const totalTagsAtom = atom<number>(0);