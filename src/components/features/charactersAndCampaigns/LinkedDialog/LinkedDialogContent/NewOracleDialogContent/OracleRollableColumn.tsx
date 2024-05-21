import { Datasworn } from "@datasworn/core";
import { MarkdownRenderer } from "components/shared/MarkdownRenderer";
import {
  SimpleTable,
  SimpleTableColumnDefinition,
} from "components/shared/SimpleTable";

export interface OracleRollableColumnProps {
  oracle:
    | Datasworn.OracleColumnText
    | Datasworn.OracleColumnText2
    | Datasworn.OracleColumnText3;
}

export function OracleRollableColumn(props: OracleRollableColumnProps) {
  const { oracle } = props;

  const columns: SimpleTableColumnDefinition<Datasworn.OracleTableRow>[] = [
    {
      label: "Roll",
      renderer: (row) =>
        row.min !== null && row.max !== null
          ? row.max - row.min === 0
            ? row.min
            : `${row.min} - ${row.max}`
          : null,
      textColor: "text.secondary",
    },
    {
      label: "Result",
      renderer: (row) => <MarkdownRenderer markdown={row.text} />,
    },
  ];

  if (
    oracle.oracle_type === "column_text2" ||
    oracle.oracle_type === "column_text3"
  ) {
    columns.push({
      label: "Details",
      renderer: (row) =>
        (row as Datasworn.OracleTableRowText2).text2 ? (
          <MarkdownRenderer
            markdown={(row as Datasworn.OracleTableRowText2).text2 ?? ""}
          />
        ) : null,
    });
  }

  if (oracle.oracle_type === "column_text3") {
    columns.push({
      label: "",
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
