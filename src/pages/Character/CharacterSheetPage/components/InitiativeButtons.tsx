import { InitiativeStatus } from "api-calls/character/_character.type";
import { InitiativeStatusChip } from "components/features/characters/InitiativeStatusChip";
import { useStore } from "stores/store";

export function InitiativeButtons() {
  const initiativeStatus = useStore(
    (store) =>
      store.characters.currentCharacter.currentCharacter?.initiativeStatus ??
      InitiativeStatus.OutOfCombat
  );

  const updateCharacter = useStore(
    (store) => store.characters.currentCharacter.updateCurrentCharacter
  );

  const updateCharacterInitiative = (status: InitiativeStatus) => {
    updateCharacter({ initiativeStatus: status }).catch();
  };

  return (
    <InitiativeStatusChip
      status={initiativeStatus}
      handleStatusChange={(status) => updateCharacterInitiative(status)}
    />
  );
}
