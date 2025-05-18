import { getTags } from "@/requests/get/tags";
import { GetTags } from "@/requests/get/tags/types";

import { atom, useAtom } from "jotai";

export const tagsAtom = atom<GetTags.Tags[]>([]);

function initializeTagsAtom(set: (update: GetTags.Tags[]) => void) {
  if (
    tagsAtom.init &&
    Array.isArray(tagsAtom.init) &&
    tagsAtom.init.length > 0
  ) {
    return;
  }

  getTags(1, 20).then((fetchedTags) => {
    set(Array.isArray(fetchedTags) ? fetchedTags : []);
  });
}

tagsAtom.onMount = (setAtom) => {
  initializeTagsAtom(setAtom);
};

export function useTags() {
  return useAtom(tagsAtom);
}
