import { useAtom } from "jotai";
import { sideBarAtom } from "@/atoms/side-bar";

export function useSideBar() {
  const [isSideBarOpen, setIsSideBarOpen] = useAtom(sideBarAtom);
  return { isSideBarOpen, setIsSideBarOpen };
}
