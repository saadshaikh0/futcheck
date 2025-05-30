import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addConstraint,
  removeConstraint,
  updateConstraint,
  hideConstraint,
  showConstraint,
} from "../../redux/squadWizardSlice";
import {
  PlusIcon,
  TrashIcon,
  // EyeOffIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";

// Constants for constraint types and operations
export const ConstraintTypes = {
  RATING: "rating",
  CHEMISTRY: "chemistry",
  NATIONS: "nations",
  LEAGUES: "leagues",
  CLUBS: "clubs",
  QUALITY: "quality",
  HIGH_RATING: "high_rating",
};

export const OperationTypes = {
  MIN: "min",
  MAX: "max",
  EXACTLY: "exactly",
};

// Helper to determine which constraints allow multiple entries
const isMultiConstraint = (type) => type === ConstraintTypes.HIGH_RATING;

// Helper to determine if constraint is a core constraint that can be hidden
const isCoreConstraint = (type) =>
  type === ConstraintTypes.RATING || type === ConstraintTypes.CHEMISTRY;

// Operation Pills Component
const OperationPills = ({ value, onChange, constraintType }) => {
  // Determine which operations to show
  const showExactly = ![
    ConstraintTypes.NATIONS,
    ConstraintTypes.LEAGUES,
    ConstraintTypes.CLUBS,
  ].includes(constraintType);

  return (
    <div className="flex justify-between gap-1 mt-2">
      <button
        onClick={() => onChange(OperationTypes.MIN)}
        className={`px-4 py-0.5 text-sm rounded ${
          value === OperationTypes.MIN
            ? "bg-blue-600 text-white"
            : "bg-gray-700 hover:bg-gray-600 text-gray-300"
        }`}
      >
        Min
      </button>
      <button
        onClick={() => onChange(OperationTypes.MAX)}
        className={`px-4 py-0.5 text-sm rounded ${
          value === OperationTypes.MAX
            ? "bg-blue-600 text-white"
            : "bg-gray-700 hover:bg-gray-600 text-gray-300"
        }`}
      >
        Max
      </button>

      <button
        onClick={() => onChange(OperationTypes.EXACTLY)}
        className={`px-4 py-0.5 text-sm rounded ${
          value === OperationTypes.EXACTLY
            ? "bg-blue-600 text-white"
            : "bg-gray-700 hover:bg-gray-600 text-gray-300"
        }`}
      >
        Exactly
      </button>
    </div>
  );
};
// Create a new dropdown component to select/add constraints
const ConstraintSelectorDropdown = ({ availableOptions, onAddConstraint }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (availableOptions.length === 0) return null;

  return (
    <div className="relative mt-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full p-2 bg-gray-700 hover:bg-gray-600 rounded text-sm"
      >
        <span>Add requirement</span>
        <ChevronDownIcon
          className={`h-4 w-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-gray-800 rounded shadow-lg py-1">
          {availableOptions.map((option) => (
            <button
              key={option.type}
              onClick={() => {
                onAddConstraint(option.type);
                setIsOpen(false);
              }}
              className="w-full flex items-center justify-between px-4 py-2 hover:bg-gray-700 transition-colors"
            >
              <span>{option.label}</span>
              <PlusIcon className="h-4 w-4" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
// Slider + numeric input for rating/chemistry
const RangeConstraintRow = ({ constraint, onUpdate }) => {
  const { id, type, operation, value } = constraint;

  // Decide slider bounds based on type
  const isRating = type === ConstraintTypes.RATING;
  const sliderMin = isRating ? 40 : 0; // rating=40, chemistry=0
  const sliderMax = isRating ? 100 : 33; // rating=100, chemistry=33

  // Label for the row
  const label = isRating ? "Rating" : "Chemistry";

  // Handler for changes
  const handleOperationChange = (op) => onUpdate(id, "operation", op);
  const handleValueChange = (val) => onUpdate(id, "value", val);

  return (
    <div className="flex flex-col gap-2 p-3 rounded bg-gray-800 my-1">
      <div className="flex items-center justify-center">
        <span className="font-semibold text-center">{label}</span>
      </div>

      {/* Operation Pills */}
      <OperationPills
        value={operation}
        onChange={handleOperationChange}
        constraintType={type}
      />

      {/* Value + Slider */}
      <div className="flex flex-col gap-2 mt-1">
        <div className="flex justify-between text-xs text-gray-400">
          <span>{sliderMin}</span>
          <span className="text-sm font-medium text-white">{value}</span>
          <span>{sliderMax}</span>
        </div>
        <input
          type="range"
          min={sliderMin}
          max={sliderMax}
          value={value}
          onChange={(e) => handleValueChange(Number(e.target.value))}
          className="w-full cursor-pointer"
        />
      </div>
    </div>
  );
};
// Component for a high rating constraint row
const HighRatingConstraintRow = ({ constraint, onUpdate, onRemove }) => {
  const { id, operation, key, value } = constraint;

  return (
    <div className="flex flex-col gap-2 p-3 rounded bg-gray-800 my-1">
      <div className="flex items-center justify-between">
        <span className="font-semibold">High Rating</span>
        <button
          onClick={() => onRemove(id)}
          className="text-gray-400 hover:text-red-400"
        >
          <TrashIcon className="h-4 w-4" />
        </button>
      </div>

      {/* Operation Pills */}
      <OperationPills
        value={operation}
        onChange={(val) => onUpdate(id, "operation", val)}
        constraintType={ConstraintTypes.HIGH_RATING}
      />

      <div className="flex items-center gap-3 mt-2">
        <label className="flex items-center gap-1">
          <span>Rating ≥</span>
          <input
            type="number"
            value={key}
            min={1}
            max={99}
            onChange={(e) => onUpdate(id, "key", Number(e.target.value))}
            className="w-16 bg-transparent border border-gray-600 rounded p-1"
          />
        </label>

        <label className="flex items-center gap-1">
          <span># Players</span>
          <input
            type="number"
            value={value}
            min={0}
            max={11}
            onChange={(e) => onUpdate(id, "value", Number(e.target.value))}
            className="w-16 bg-transparent border border-gray-600 rounded p-1"
          />
        </label>
      </div>
    </div>
  );
};

// Component for other standard constraints (Nations, Leagues, Clubs, etc.)
const StandardConstraintRow = ({ constraint, onUpdate, onRemove }) => {
  const { id, type, operation, value } = constraint;

  // Pretty label with proper capitalization
  const label =
    type === ConstraintTypes.QUALITY
      ? "Qualities"
      : type.charAt(0).toUpperCase() + type.slice(1);

  // Handler for changes
  const handleOperationChange = (op) => onUpdate(id, "operation", op);
  const handleValueChange = (val) => onUpdate(id, "value", val);

  return (
    <div className="flex flex-col gap-2 p-3 rounded bg-gray-800 my-1">
      <div className="flex items-center justify-between">
        <span className="font-semibold">{label}</span>
        <button
          onClick={() => onRemove(id)}
          className="text-gray-400 hover:text-red-400"
        >
          <TrashIcon className="h-4 w-4" />
        </button>
      </div>

      {/* Operation Pills */}
      <OperationPills
        value={operation}
        onChange={handleOperationChange}
        constraintType={type}
      />

      {/* Value + Slider */}
      <div className="flex flex-col gap-2 mt-1">
        <div className="flex justify-between text-xs text-gray-400">
          <span>1</span>
          <span className="text-sm font-medium text-white">{value}</span>
          <span>11</span>
        </div>
        <input
          type="range"
          min={1}
          max={11}
          value={value}
          onChange={(e) => handleValueChange(Number(e.target.value))}
          className="w-full cursor-pointer"
        />
      </div>
    </div>
  );
};
const SquadRequirements = () => {
  const dispatch = useDispatch();
  const constraints = useSelector((state) => state.squadWizard.constraints);
  const hiddenConstraints = useSelector(
    (state) => state.squadWizard.hiddenConstraints || []
  );

  // Ensure Rating and Chemistry constraints exist by default (if not hidden)
  React.useEffect(() => {
    // Only add Rating if it's not hidden and not already present
    if (!hiddenConstraints.includes(ConstraintTypes.RATING)) {
      const hasRating = constraints.some(
        (c) => c.type === ConstraintTypes.RATING
      );
      if (!hasRating) {
        dispatch(
          addConstraint({
            type: ConstraintTypes.RATING,
            operation: OperationTypes.MIN,
            value: 40,
          })
        );
      }
    }

    // Only add Chemistry if it's not hidden and not already present
    if (!hiddenConstraints.includes(ConstraintTypes.CHEMISTRY)) {
      const hasChemistry = constraints.some(
        (c) => c.type === ConstraintTypes.CHEMISTRY
      );
      if (!hasChemistry) {
        dispatch(
          addConstraint({
            type: ConstraintTypes.CHEMISTRY,
            operation: OperationTypes.MIN,
            value: 15,
          })
        );
      }
    }
  }, [constraints, hiddenConstraints, dispatch]);

  // Define all possible constraint options
  const constraintOptions = [
    { type: ConstraintTypes.NATIONS, label: "Nations" },
    { type: ConstraintTypes.LEAGUES, label: "Leagues" },
    { type: ConstraintTypes.CLUBS, label: "Clubs" },
    { type: ConstraintTypes.QUALITY, label: "Qualities" },
    { type: ConstraintTypes.HIGH_RATING, label: "High Rating" },
  ];

  // Filter which options to show in the + Add buttons
  const availableOptions = constraintOptions.filter(
    (opt) =>
      isMultiConstraint(opt.type) ||
      !constraints.some((c) => c.type === opt.type)
  );

  // --- Action Handlers ---
  const handleAddConstraint = (type) => {
    dispatch(
      addConstraint({
        type,
        isMulti: isMultiConstraint(type),
      })
    );
  };

  const handleRemoveConstraint = (id) => {
    dispatch(removeConstraint(id));
  };

  const handleUpdateConstraint = (id, field, value) => {
    dispatch(updateConstraint({ id, field, value }));
  };

  // Render a constraint row based on its type
  const renderConstraintRow = (constraint) => {
    const { id, type } = constraint;

    // Special handling for Rating and Chemistry (core constraints that can be hidden)
    if (type === ConstraintTypes.RATING || type === ConstraintTypes.CHEMISTRY) {
      return (
        <RangeConstraintRow
          key={id}
          constraint={constraint}
          onUpdate={handleUpdateConstraint}
        />
      );
    }

    // High Rating constraint (multi-constraint)
    if (isMultiConstraint(type)) {
      return (
        <HighRatingConstraintRow
          key={id}
          constraint={constraint}
          onUpdate={handleUpdateConstraint}
          onRemove={handleRemoveConstraint}
        />
      );
    }

    // Other standard constraints
    return (
      <StandardConstraintRow
        key={id}
        constraint={constraint}
        onUpdate={handleUpdateConstraint}
        onRemove={handleRemoveConstraint}
      />
    );
  };

  return (
    <div className="text-white mt-6 ">
      <div className="text-lg font-bold mb-2">Additional Requirements</div>

      {/* "Add" buttons for available constraints */}
      {/* <div className="flex flex-wrap gap-2 mb-4">
        {availableOptions.map((opt) => (
          <button
            key={opt.type}
            onClick={() => handleAddConstraint(opt.type)}
            className="bg-gray-700 hover:bg-gray-600 py-1 px-3 rounded text-sm flex items-center gap-1"
          >
            <PlusIcon className="h-4 w-4" />
            {opt.label}
          </button>
        ))}
      </div> */}

      {/* Constraint rows */}
      <div className="space-y-2 ">
        {constraints.length === 0 ? (
          <p className="text-gray-400 text-sm">No requirements added</p>
        ) : (
          constraints.map(renderConstraintRow)
        )}
      </div>
      <ConstraintSelectorDropdown
        availableOptions={availableOptions}
        onAddConstraint={handleAddConstraint}
      />
    </div>
  );
};

export default SquadRequirements;
