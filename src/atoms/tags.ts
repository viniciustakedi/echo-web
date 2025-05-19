import { atom } from "jotai";
import { getTags } from "@/requests/get/tags";
import type { GetTags } from "@/requests/get/tags/types";

let _fetchedTags: GetTags.Tags[] | null = null;

export const tagsAtom = atom<GetTags.Tags[] | null>(null);

tagsAtom.onMount = (setAtom) => {
  if (_fetchedTags !== null) {
    setAtom(_fetchedTags);
    return;
  }

  getTags(1, 20).then((fetched) => {
    _fetchedTags = Array.isArray(fetched) ? fetched : [];
    setAtom(_fetchedTags);
  });
};
