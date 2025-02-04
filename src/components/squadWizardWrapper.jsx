// src/components/SquadWizardWrapper.jsx

import React from "react";
import SquadWizard from "./squadWizard/squadWizard";
import SquadWizardMobile from "./squadWizard/SquadWizardMobile";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";

const isTouchDevice = () => {
  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0
  );
};

const SquadWizardWrapper = () => {
  const backend = isTouchDevice() ? TouchBackend : HTML5Backend;

  return (
    <div>
      <div className="hidden  lg:block">
        <DndProvider backend={backend}>
          <SquadWizard />
        </DndProvider>
      </div>
      <div className="block lg:hidden overflow-hidden">
        <DndProvider
          backend={TouchBackend}
          options={{
            enableMouseEvents: true,
            preventScroll: true,
            ignoreContextMenu: true,
          }}
        >
          <SquadWizardMobile />
        </DndProvider>
      </div>
    </div>
  );
};

export default SquadWizardWrapper;
