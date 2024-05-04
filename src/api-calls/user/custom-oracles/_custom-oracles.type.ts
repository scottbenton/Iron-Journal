export interface StoredOracle {
  $id: string;
  name: string;
  text: string;
  table: {
    roll: number;
    result: string;
  }[];
}

export interface CustomOracleDocument {
  oracles: { [moveId: string]: StoredOracle };
  oracleOrder: string[];
}
