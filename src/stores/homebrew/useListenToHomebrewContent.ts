import { useEffect } from "react";
import { useStore } from "stores/store";

export function useListenToHomebrewContent(homebrewIds: string[], compatibilityIds: string[]) {
  const subscribeToHomebrewContent = useStore(
    (store) => store.homebrew.subscribeToHomebrewContent
  );

  useEffect(() => {
    const unsubscribe = subscribeToHomebrewContent(homebrewIds, compatibilityIds);

    return () => {
      unsubscribe();
    };
  }, [homebrewIds, compatibilityIds, subscribeToHomebrewContent]);
}
