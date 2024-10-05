import React from "react";
import SquadWizard from "./squadWizard/squadWizard";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
const SquadWizardWrapper = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <SquadWizard />
    </DndProvider>
  );
};

export default SquadWizardWrapper;
