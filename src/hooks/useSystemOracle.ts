import { sharedOracleConfig } from "config/system.config";
import { useGameSystemValue } from "./useGameSystemValue";

export function useSystemOracles() {
  return useGameSystemValue(sharedOracleConfig);
}

export function useSystemOracle() {
  const oracles = useSystemOracles();

  return (oracleKey: keyof typeof oracles) => {
    return oracles[oracleKey];
  };
}
