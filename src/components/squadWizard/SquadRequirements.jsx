import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addConstraint,
  removeConstraint,
  updateConstraint,
} from "../../redux/squadWizardSlice";
import {
  PlusIcon,
  TrashIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";

// Constants for constraint types and operations
export const ConstraintTypes = {
  // Optional core constraints
  RATING: "rating",
  CHEMISTRY: "chemistry",
  PLAYER_CHEMISTRY: "player_chemistry",

  // Nation constraints
  NATIONS: "nations",
  MIN_SAME_NATIONS: "min_same_nations",
  MAX_SAME_NATIONS: "max_same_nations",
  MIN_NATIONALITY: "min_nationality",

  // League constraints
  LEAGUES: "leagues",
  MIN_SAME_LEAGUES: "min_same_leagues",
  MAX_SAME_LEAGUES: "max_same_leagues",
  MIN_LEAGUE: "min_league",

  // Club constraints
  CLUBS: "clubs",
  MIN_SAME_CLUBS: "min_same_clubs",
  MAX_SAME_CLUBS: "max_same_clubs",
  MIN_TEAMID: "min_teamid",

  // Quality/Rarity constraints
  QUALITY: "quality",
  EXACTLY_SILVER: "exactly_silver",
  MIN_RARITY: "min_rarity",

  // Rating constraints
  HIGH_RATING: "high_rating",
};

export const OperationTypes = {
  MIN: "min",
  MAX: "max",
  EXACTLY: "exactly",
};

// Helper to determine which constraints allow multiple entries
const isMultiConstraint = (type) =>
  [
    ConstraintTypes.HIGH_RATING,
    ConstraintTypes.MIN_NATIONALITY,
    ConstraintTypes.MIN_LEAGUE,
    ConstraintTypes.MIN_TEAMID,
  ].includes(type);

// Operation Pills Component
const OperationPills = ({
  value,
  onChange,
  operations = [OperationTypes.MIN, OperationTypes.MAX, OperationTypes.EXACTLY],
}) => {
  return (
    <div className="flex justify-between gap-1 mt-2">
      {operations.map((op) => (
        <button
          key={op}
          onClick={() => onChange(op)}
          className={`px-4 py-0.5 text-sm rounded capitalize ${
            value === op
              ? "bg-blue-600 text-white"
              : "bg-gray-700 hover:bg-gray-600 text-gray-300"
          }`}
        >
          {op}
        </button>
      ))}
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
        <div className="absolute z-10 w-full mt-1 bg-gray-800 rounded shadow-lg py-1 max-h-60 overflow-y-auto">
          {availableOptions.map((option) => (
            <button
              key={option.type}
              onClick={() => {
                onAddConstraint(option.type);
                setIsOpen(false);
              }}
              className="w-full flex items-center justify-between px-4 py-2 hover:bg-gray-700 transition-colors text-left"
            >
              <span className="text-sm">{option.label}</span>
              <PlusIcon className="h-4 w-4" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// Slider + numeric input for rating/chemistry
const RangeConstraintRow = ({ constraint, onUpdate, onRemove }) => {
  const { id, type, operation, value } = constraint;

  // Decide slider bounds based on type
  const isRating = type === ConstraintTypes.RATING;
  const sliderMin = isRating ? 40 : 0;
  const sliderMax = isRating ? 100 : 33;

  // Label for the row
  const label = isRating ? "Rating" : "Chemistry";

  // Handler for changes
  const handleOperationChange = (op) => onUpdate(id, "operation", op);
  const handleValueChange = (val) => onUpdate(id, "value", val);

  return (
    <div className="flex flex-col gap-2 p-3 rounded bg-gray-800 my-1">
      <div className="flex items-center justify-between">
        <span className="font-semibold text-center">{label}</span>
        <button
          onClick={() => onRemove(id)}
          className="text-gray-400 hover:text-red-400"
        >
          <TrashIcon className="h-4 w-4" />
        </button>
      </div>

      {/* Operation Pills */}
      <OperationPills value={operation} onChange={handleOperationChange} />

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
        <span className="font-semibold">High Rating Players</span>
        <button
          onClick={() => onRemove(id)}
          className="text-gray-400 hover:text-red-400"
        >
          <TrashIcon className="h-4 w-4" />
        </button>
      </div>

      <div className="flex items-center gap-3 mt-2">
        <label className="flex items-center gap-1">
          <span className="text-sm">Rating ≥</span>
          <input
            type="number"
            value={key || 85}
            min={75}
            max={99}
            onChange={(e) => onUpdate(id, "key", Number(e.target.value))}
            className="w-16 bg-transparent border border-gray-600 rounded p-1"
          />
        </label>

        <label className="flex items-center gap-1">
          <span className="text-sm"># Players</span>
          <input
            type="number"
            value={value || 1}
            min={1}
            max={11}
            onChange={(e) => onUpdate(id, "value", Number(e.target.value))}
            className="w-16 bg-transparent border border-gray-600 rounded p-1"
          />
        </label>
      </div>
    </div>
  );
};

// Component for exactly silver constraint
const ExactlySilverRow = ({ constraint, onRemove }) => {
  const { id } = constraint;

  return (
    <div className="flex flex-col gap-2 p-3 rounded bg-gray-800 my-1">
      <div className="flex items-center justify-between">
        <span className="font-semibold">Exactly Silver Squad</span>
        <button
          onClick={() => onRemove(id)}
          className="text-gray-400 hover:text-red-400"
        >
          <TrashIcon className="h-4 w-4" />
        </button>
      </div>
      <div className="text-sm text-gray-400">
        All 11 players must be silver (65-74 rating)
      </div>
    </div>
  );
};

// Component for specific league/nation/club requirements
const SpecificRequirementRow = ({ constraint, onUpdate, onRemove }) => {
  const { id, type, key, value } = constraint;

  // Determine label based on type
  const getLabel = () => {
    switch (type) {
      case ConstraintTypes.MIN_NATIONALITY:
        return "Players from specific nations";
      case ConstraintTypes.MIN_LEAGUE:
        return "Players from specific league";
      case ConstraintTypes.MIN_TEAMID:
        return "Players from specific club";
      default:
        return type;
    }
  };

  const getPlaceholder = () => {
    switch (type) {
      case ConstraintTypes.MIN_NATIONALITY:
        return "Nation IDs (comma separated)";
      case ConstraintTypes.MIN_LEAGUE:
        return "League ID";
      case ConstraintTypes.MIN_TEAMID:
        return "Team ID";
      default:
        return "ID";
    }
  };

  return (
    <div className="flex flex-col gap-2 p-3 rounded bg-gray-800 my-1">
      <div className="flex items-center justify-between">
        <span className="font-semibold">{getLabel()}</span>
        <button
          onClick={() => onRemove(id)}
          className="text-gray-400 hover:text-red-400"
        >
          <TrashIcon className="h-4 w-4" />
        </button>
      </div>

      <div className="flex flex-col gap-2 mt-2">
        <input
          type="text"
          value={key || ""}
          placeholder={getPlaceholder()}
          onChange={(e) => onUpdate(id, "key", e.target.value)}
          className="w-full bg-transparent border border-gray-600 rounded p-1 text-sm"
        />

        <label className="flex items-center gap-2">
          <span className="text-sm">Min Players:</span>
          <input
            type="number"
            value={value || 1}
            min={1}
            max={11}
            onChange={(e) => onUpdate(id, "value", Number(e.target.value))}
            className="w-16 bg-transparent border border-gray-600 rounded p-1"
          />
        </label>
      </div>
    </div>
  );
};

const StandardConstraintRow = ({ constraint, onUpdate, onRemove }) => {
  const { id, type, operation, value } = constraint;

  // Pretty label with proper capitalization
  const getLabelForType = (type) => {
    const labelMap = {
      [ConstraintTypes.NATIONS]: "Nations",
      [ConstraintTypes.LEAGUES]: "Leagues",
      [ConstraintTypes.CLUBS]: "Clubs",
      [ConstraintTypes.QUALITY]: "Quality (Min Rating)",
      [ConstraintTypes.MIN_SAME_NATIONS]: "Players from Same Nation",
      [ConstraintTypes.MAX_SAME_NATIONS]: "Players from Same Nation",
      [ConstraintTypes.MIN_SAME_LEAGUES]: "Players from Same League",
      [ConstraintTypes.MAX_SAME_LEAGUES]: "Players from Same League",
      [ConstraintTypes.MIN_SAME_CLUBS]: "Players from Same Club",
      [ConstraintTypes.MAX_SAME_CLUBS]: "Players from Same Club",
    };
    return labelMap[type] || type.charAt(0).toUpperCase() + type.slice(1);
  };

  // Get operations based on constraint type
  const getOperations = () => {
    if (
      [
        ConstraintTypes.MIN_SAME_NATIONS,
        ConstraintTypes.MIN_SAME_LEAGUES,
        ConstraintTypes.MIN_SAME_CLUBS,
      ].includes(type)
    ) {
      return [OperationTypes.MIN];
    }
    if (
      [
        ConstraintTypes.MAX_SAME_NATIONS,
        ConstraintTypes.MAX_SAME_LEAGUES,
        ConstraintTypes.MAX_SAME_CLUBS,
      ].includes(type)
    ) {
      return [OperationTypes.MAX];
    }
    return [OperationTypes.MIN, OperationTypes.MAX, OperationTypes.EXACTLY];
  };

  const handleOperationChange = (op) => onUpdate(id, "operation", op);
  const handleValueChange = (val) => onUpdate(id, "value", val);

  const maxValue = type === ConstraintTypes.QUALITY ? 99 : 11;
  const minValue = type === ConstraintTypes.QUALITY ? 65 : 1;

  return (
    <div className="flex flex-col gap-2 p-3 rounded bg-gray-800 my-1">
      <div className="flex items-center justify-between">
        <span className="font-semibold">{getLabelForType(type)}</span>
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
        operations={getOperations()}
      />

      {/* Value + Slider */}
      <div className="flex flex-col gap-2 mt-1">
        <div className="flex justify-between text-xs text-gray-400">
          <span>{minValue}</span>
          <span className="text-sm font-medium text-white">{value}</span>
          <span>{maxValue}</span>
        </div>
        <input
          type="range"
          min={minValue}
          max={maxValue}
          value={value}
          onChange={(e) => handleValueChange(Number(e.target.value))}
          className="w-full cursor-pointer"
        />
      </div>
    </div>
  );
};

const PlayerChemistryRow = ({ constraint, onUpdate, onRemove }) => {
  const { id, operation, value } = constraint;

  return (
    <div className="flex flex-col gap-2 p-3 rounded bg-gray-800 my-1">
      <div className="flex items-center justify-between">
        <span className="font-semibold">Min Player Chemistry</span>
        <button
          onClick={() => onRemove(id)}
          className="text-gray-400 hover:text-red-400"
        >
          <TrashIcon className="h-4 w-4" />
        </button>
      </div>

      <div className="flex flex-col gap-2 mt-1">
        <div className="flex justify-between text-xs text-gray-400">
          <span>0</span>
          <span className="text-sm font-medium text-white">{value}</span>
          <span>3</span>
        </div>
        <input
          type="range"
          min={0}
          max={3}
          step={1}
          value={value}
          onChange={(e) => onUpdate(id, "value", Number(e.target.value))}
          className="w-full cursor-pointer"
        />
      </div>
      <div className="text-sm text-gray-400">
        Each player must have at least {value} chemistry point
        {value !== 1 ? "s" : ""}
      </div>
    </div>
  );
};

const SquadRequirements = () => {
  const dispatch = useDispatch();
  const constraints = useSelector((state) => state.squadWizard.constraints);

  // Define all possible constraint options
  const constraintOptions = [
    // Core optional constraints
    { type: ConstraintTypes.RATING, label: "Team Rating" },
    { type: ConstraintTypes.CHEMISTRY, label: "Team Chemistry" },
    { type: ConstraintTypes.PLAYER_CHEMISTRY, label: "Min Player Chemistry" },

    // Nation constraints
    { type: ConstraintTypes.NATIONS, label: "Number of Nations" },
    { type: ConstraintTypes.MIN_SAME_NATIONS, label: "Min from Same Nation" },
    { type: ConstraintTypes.MAX_SAME_NATIONS, label: "Max from Same Nation" },
    {
      type: ConstraintTypes.MIN_NATIONALITY,
      label: "Specific Nations Required",
    },

    // League constraints
    { type: ConstraintTypes.LEAGUES, label: "Number of Leagues" },
    { type: ConstraintTypes.MIN_SAME_LEAGUES, label: "Min from Same League" },
    { type: ConstraintTypes.MAX_SAME_LEAGUES, label: "Max from Same League" },
    { type: ConstraintTypes.MIN_LEAGUE, label: "Specific League Required" },

    // Club constraints
    { type: ConstraintTypes.CLUBS, label: "Number of Clubs" },
    { type: ConstraintTypes.MIN_SAME_CLUBS, label: "Min from Same Club" },
    { type: ConstraintTypes.MAX_SAME_CLUBS, label: "Max from Same Club" },
    { type: ConstraintTypes.MIN_TEAMID, label: "Specific Club Required" },

    // Quality/Rating constraints
    { type: ConstraintTypes.QUALITY, label: "Minimum Player Quality" },
    { type: ConstraintTypes.HIGH_RATING, label: "High Rated Players" },
    { type: ConstraintTypes.EXACTLY_SILVER, label: "Silver Squad (All 11)" },
  ];

  // Filter which options to show in the dropdown
  const availableOptions = constraintOptions.filter(
    (opt) =>
      isMultiConstraint(opt.type) ||
      !constraints.some((c) => c.type === opt.type)
  );

  // --- Action Handlers ---
  const handleAddConstraint = (type) => {
    const defaultValues = {
      [ConstraintTypes.RATING]: { operation: OperationTypes.MIN, value: 70 },
      [ConstraintTypes.CHEMISTRY]: { operation: OperationTypes.MIN, value: 20 },
      [ConstraintTypes.PLAYER_CHEMISTRY]: {
        operation: OperationTypes.MIN,
        value: 2,
      },

      [ConstraintTypes.HIGH_RATING]: {
        operation: OperationTypes.MIN,
        key: 85,
        value: 1,
      },
      [ConstraintTypes.EXACTLY_SILVER]: { value: true },
      [ConstraintTypes.MIN_NATIONALITY]: { key: "", value: 1 },
      [ConstraintTypes.MIN_LEAGUE]: { key: "", value: 1 },
      [ConstraintTypes.MIN_TEAMID]: { key: "", value: 1 },
      [ConstraintTypes.QUALITY]: { operation: OperationTypes.MIN, value: 75 },
      [ConstraintTypes.MIN_SAME_NATIONS]: {
        operation: OperationTypes.MIN,
        value: 3,
      },
      [ConstraintTypes.MAX_SAME_NATIONS]: {
        operation: OperationTypes.MAX,
        value: 5,
      },
      [ConstraintTypes.MIN_SAME_LEAGUES]: {
        operation: OperationTypes.MIN,
        value: 3,
      },
      [ConstraintTypes.MAX_SAME_LEAGUES]: {
        operation: OperationTypes.MAX,
        value: 5,
      },
      [ConstraintTypes.MIN_SAME_CLUBS]: {
        operation: OperationTypes.MIN,
        value: 2,
      },
      [ConstraintTypes.MAX_SAME_CLUBS]: {
        operation: OperationTypes.MAX,
        value: 3,
      },
    };

    const defaults = defaultValues[type] || {
      operation: OperationTypes.MIN,
      value: 5,
    };

    dispatch(
      addConstraint({
        type,
        isMulti: isMultiConstraint(type),
        ...defaults,
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

    // Core constraints (rating/chemistry)
    if (type === ConstraintTypes.RATING || type === ConstraintTypes.CHEMISTRY) {
      return (
        <RangeConstraintRow
          key={id}
          constraint={constraint}
          onUpdate={handleUpdateConstraint}
          onRemove={handleRemoveConstraint}
        />
      );
    }
    if (type === ConstraintTypes.PLAYER_CHEMISTRY) {
      return (
        <PlayerChemistryRow
          key={id}
          constraint={constraint}
          onUpdate={handleUpdateConstraint}
          onRemove={handleRemoveConstraint}
        />
      );
    }

    // High rating constraint
    if (type === ConstraintTypes.HIGH_RATING) {
      return (
        <HighRatingConstraintRow
          key={id}
          constraint={constraint}
          onUpdate={handleUpdateConstraint}
          onRemove={handleRemoveConstraint}
        />
      );
    }

    // Exactly silver constraint
    if (type === ConstraintTypes.EXACTLY_SILVER) {
      return (
        <ExactlySilverRow
          key={id}
          constraint={constraint}
          onRemove={handleRemoveConstraint}
        />
      );
    }

    // Specific requirement constraints
    if (
      [
        ConstraintTypes.MIN_NATIONALITY,
        ConstraintTypes.MIN_LEAGUE,
        ConstraintTypes.MIN_TEAMID,
      ].includes(type)
    ) {
      return (
        <SpecificRequirementRow
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
      <div className="text-lg font-bold mb-2">Squad Requirements</div>

      {/* Constraint rows */}
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {constraints.length === 0 ? (
          <p className="text-gray-400 text-sm">
            No requirements added. Click below to add requirements.
          </p>
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
