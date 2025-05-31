import { useCallback, useEffect } from "react";
import { useAtom } from "jotai";

import { tagsAtom } from "@/atoms/tags";

import { getTags } from "@/requests/get";
import { GetTags } from "@/requests/get/tags/types";

export function useTags() {
  const [tags, setTagsAtom] = useAtom(tagsAtom);
  const loading = tags === null;

  useEffect(() => {
    if (tags === null) {
      getTags(1, 20).then((fetched) => {
        const _fetchedTags = Array.isArray(fetched) ? fetched : [];
        setTagsAtom(_fetchedTags);
      });
    }
  }, [setTagsAtom]);

  const setTags = useCallback((newValue: GetTags.Tags[] | null) => {
    setTagsAtom(newValue);
  }, [setTagsAtom]);

  return { tags: tags ?? [], loading, setTags };
}