import { useCallback, useEffect } from "react";
import { useAtom } from "jotai";

import { tagsAtom, tagsIsLoadingAtom, totalTagsAtom } from "@/atoms/tags";

import { getTags } from "@/requests/get";
import { GetTags } from "@/requests/get/tags/types";

import { useLoading } from "./use-loading";

export function useTags() {
  const { setIsLoading } = useLoading();

  const [tags, setTagsAtom] = useAtom(tagsAtom);
  const [isTagsLoading, setIsTagsLoading] = useAtom(tagsIsLoadingAtom);
  const [totalTags, setTotalTags] = useAtom(totalTagsAtom);

  const setTags = useCallback((newValue: GetTags.Tags[] | null) => {
    setTagsAtom(newValue);
  }, [setTagsAtom]);

  useEffect(() => {
    if (tags === null && !isTagsLoading) {
      setIsTagsLoading(true);
      setIsLoading(true);

      getTags({ page: 1, limit: 10 }).then((fetched) => {
        setTotalTags(fetched.total);
        setTagsAtom(Array.isArray(fetched.data) ? fetched.data : []);
      }).finally(() => {
        setIsTagsLoading(false);
        setIsLoading(false);
      });
    }
  }, [tags, setTagsAtom, isTagsLoading, setIsLoading, setIsTagsLoading, setTotalTags]);

  const refetchTags = useCallback(async ({ page, limit }: { page: number; limit: number }) => {
    if (isTagsLoading) return;

    setIsLoading(true);
    setIsTagsLoading(true);

    const fetched = await getTags({ page, limit });

    setTotalTags(fetched.total);
    setTagsAtom(Array.isArray(fetched.data) ? fetched.data : []);

    setIsLoading(false);
    setIsTagsLoading(false);
  }, [setTagsAtom, isTagsLoading, setIsLoading, setIsTagsLoading, setTotalTags]);

  return {
    tags: tags ?? [],
    setTags,
    refetchTags,
    pageLimit: 10,
    total: totalTags
  };
}