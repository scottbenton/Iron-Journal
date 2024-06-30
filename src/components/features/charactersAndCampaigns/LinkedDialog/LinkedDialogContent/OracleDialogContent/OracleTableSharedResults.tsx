import { Datasworn } from "@datasworn/core";
import { MarkdownRenderer } from "components/shared/MarkdownRenderer";
import {
  SimpleTable,
  SimpleTableColumnDefinition,
} from "components/shared/SimpleTable";

export interface OracleTableSharedResultsProps {
  oracle: Datasworn.OracleTableSharedText | Datasworn.OracleTableSharedText2;
}

export function OracleTableSharedResults(props: OracleTableSharedResultsProps) {
  const { oracle } = props;

  const contentArr = Object.values(oracle.contents ?? {});
  const rows = contentArr.length > 0 ? contentArr[0].rows : undefined;

  if (!rows) {
    return null;
  }

  const columns: SimpleTableColumnDefinition<Datasworn.OracleRollableRowText3>[] =
    [];

  const contentValues:
    | (Datasworn.OracleColumnText | Datasworn.OracleColumnText2)[]
    | undefined = oracle.contents ? Object.values(oracle.contents) : undefined;

  contentValues?.forEach((subOracle) => {
    columns.push({
      label: subOracle.name,
      renderer: (row) => {
        if (row.roll) {
          if (row.roll.max - row.roll.min === 0) {
            return row.roll.min;
          } else {
            return `${row.roll.min} - ${row.roll.max}`;
          }
        }
        return null;
      },
      textColor: "text.secondary",
    });
  });

  columns.push({
    label: oracle.column_labels.text,
    renderer: (row) => <MarkdownRenderer markdown={row.text} />,
  });

  if (oracle.oracle_type === "table_shared_text2") {
    columns.push({
      label: (oracle as Datasworn.OracleTableSharedText2).column_labels.text2,
      renderer: (row) =>
        row.text2 ? <MarkdownRenderer markdown={row.text2 ?? ""} /> : null,
    });
  }

  return <SimpleTable columns={columns} rows={rows} />;
}
