import { atom } from "jotai";
import type { GetTags } from "@/requests/get/tags/types";

export const tagsAtom = atom<GetTags.Tags[] | null>(null);