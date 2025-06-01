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
      getTags({ page: 1, limit: 20 }).then((fetched) => {
        const _fetchedTags = Array.isArray(fetched) ? fetched : [];
        setTagsAtom(_fetchedTags);
      });
    }
  }, [tags, setTagsAtom]);

  const setTags = useCallback((newValue: GetTags.Tags[] | null) => {
    setTagsAtom(newValue);
  }, [setTagsAtom]);

  const refetchTags = useCallback(async ({ page, limit }: { page: number; limit: number }) => {
    const fetched = await getTags({ page, limit });
    setTagsAtom(Array.isArray(fetched) ? fetched : []);
  }, [setTagsAtom]);

  return {
    tags: tags ?? [],
    setTags,
    loading,
    refetchTags
  };
}