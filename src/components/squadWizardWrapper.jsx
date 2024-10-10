import React from "react";
import SquadWizard from "./squadWizard/squadWizard";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const SquadWizardWrapper = () => {
  return (
    <div>
      <div className="hidden lg:block">
        <DndProvider backend={HTML5Backend}>
          <SquadWizard />
        </DndProvider>
      </div>
      <div className="block lg:hidden text-center text-white mt-4">
        <p className="text-xl">
          Squad Wizard is only available in desktop mode.
        </p>
      </div>
    </div>
  );
};

export default SquadWizardWrapper;
