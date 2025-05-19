import { useAtom } from "jotai";
import { tagsAtom } from "@/atoms/tags";

export function useTags() {
  const [tags] = useAtom(tagsAtom);
  const loading = tags === null;
  return { tags: tags ?? [], loading };
}
