import { atom, useAtom } from "jotai";

export type Tag = {
  _id: string;
  name: string;
  createdAt?: string;
};

export const tagsAtom = atom<Tag[]>([]);

export function useTags() {
  return useAtom(tagsAtom);
}
