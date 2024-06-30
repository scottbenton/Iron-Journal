import { Datasworn } from "@datasworn/core";
import { MarkdownRenderer } from "components/shared/MarkdownRenderer";
import {
  SimpleTable,
  SimpleTableColumnDefinition,
} from "components/shared/SimpleTable";

export interface OracleTableSharedRollsDialogContentProps {
  oracle: Datasworn.OracleTableSharedRolls;
}

export function OracleTableSharedRolls(
  props: OracleTableSharedRollsDialogContentProps
) {
  const { oracle } = props;

  const contentArr = Object.values(oracle.contents ?? {});
  const rows = contentArr.length > 0 ? contentArr[0].rows : undefined;

  if (!rows) {
    return null;
  }

  const columns: SimpleTableColumnDefinition<Datasworn.OracleRollableRowText>[] =
    [
      {
        label: oracle.column_labels.roll,
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
      },
    ];

  Object.values(oracle.contents ?? {}).forEach((subOracle) => {
    columns.push({
      label: subOracle.name,
      renderer: (_, index) => (
        <MarkdownRenderer markdown={subOracle.rows[index].text} />
      ),
    });
  });

  return <SimpleTable columns={columns} rows={rows} />;
}
