import { Datasworn } from "@datasworn/core";
import { MarkdownRenderer } from "components/shared/MarkdownRenderer";
import {
  SimpleTable,
  SimpleTableColumnDefinition,
} from "components/shared/SimpleTable";

export interface OracleRollableTableProps {
  oracle: Datasworn.OracleTableRollable;
}

export function OracleRollableTable(props: OracleRollableTableProps) {
  const { oracle } = props;

  const columns: SimpleTableColumnDefinition<Datasworn.OracleTableRow>[] = [
    {
      label: oracle.column_labels.roll,
      renderer: (row) =>
        row.min !== null && row.max !== null
          ? row.max - row.min === 0
            ? row.min
            : `${row.min} - ${row.max}`
          : null,
      textColor: "text.secondary",
    },
    {
      label: oracle.column_labels.text,
      renderer: (row) => <MarkdownRenderer markdown={row.text} />,
    },
  ];

  if (
    oracle.oracle_type === "table_text2" ||
    oracle.oracle_type === "table_text3"
  ) {
    columns.push({
      label: oracle.column_labels.text2,
      renderer: (row) =>
        (row as Datasworn.OracleTableRowText2).text2 ? (
          <MarkdownRenderer
            markdown={(row as Datasworn.OracleTableRowText2).text2 ?? ""}
          />
        ) : null,
    });
  }

  if (oracle.oracle_type === "table_text3") {
    columns.push({
      label: oracle.column_labels.text3,
      renderer: (row) =>
        (row as Datasworn.OracleTableRowText3).text3 ? (
          <MarkdownRenderer
            markdown={(row as Datasworn.OracleTableRowText3).text3 ?? ""}
          />
        ) : null,
    });
  }

  return (
    <>
      <SimpleTable columns={columns} rows={oracle.rows} />
    </>
  );
}
