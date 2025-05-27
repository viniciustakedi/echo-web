import { useAtom } from "jotai";
import { loadingAtom } from "@/atoms/loading";

export function useLoading() {
  const [isLoading, setIsLoading] = useAtom(loadingAtom);
  return { isLoading, setIsLoading };
}
