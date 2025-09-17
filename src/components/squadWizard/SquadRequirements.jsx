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

// Constants for constraint types - matching Rust structure
export const ConstraintTypes = {
  // Primary constraints
  CHEMISTRY: "chemistry",
  RATING: "rating",

  // Player quality constraints
  PLAYER_OVERALL_RATING_MIN: "player_overall_rating_min",
  PLAYER_OVERALL_RATING_MAX: "player_overall_rating_max",
  MIN_QUALITY: "min_quality",
  MAX_QUALITY: "max_quality",
  EXACTLY_QUALITY: "exactly_quality",

  // Rarity constraints
  RARITY: "rarity",
  RARITY_GROUP: "rarity_group",

  // Nationality constraints
  NATIONALITY: "nationality",
  NATIONS: "nations",
  SAME_NATIONS: "same_nations",

  // League constraints
  LEAGUE: "league",
  LEAGUES: "leagues",
  SAME_LEAGUES: "same_leagues",

  // Club constraints
  TEAMID: "teamid",
  CLUBS: "clubs",
  SAME_CLUBS: "same_clubs",

  // Chemistry constraints
  PLAYER_CHEMISTRY: "player_chemistry",

  // Special constraints
  EXACTLY_SILVER: "exactly_silver",
};

// Matching Rust's ConstraintOperation enum
export const ConstraintOperation = {
  Min: "Min",
  Max: "Max",
  Exactly: "Exactly",
};

// Helper to determine which constraints allow multiple entries
const isMultiConstraint = (type) =>
  [
    ConstraintTypes.NATIONALITY,
    ConstraintTypes.LEAGUE,
    ConstraintTypes.TEAMID,
    ConstraintTypes.RARITY,
    ConstraintTypes.RARITY_GROUP,
    ConstraintTypes.PLAYER_OVERALL_RATING_MIN,
    ConstraintTypes.PLAYER_OVERALL_RATING_MAX,
  ].includes(type);

// Operation Pills Component
const OperationPills = ({
  value,
  onChange,
  operations = [
    ConstraintOperation.Min,
    ConstraintOperation.Max,
    ConstraintOperation.Exactly,
  ],
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
          {op.toLowerCase()}
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

// Component for player overall rating constraints
const PlayerRatingConstraintRow = ({ constraint, onUpdate, onRemove }) => {
  const { id, type, operation, key, value } = constraint;

  const label =
    type === ConstraintTypes.PLAYER_OVERALL_RATING_MIN
      ? "Minimum Player Rating"
      : "Maximum Player Rating";

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

      <div className="flex items-center gap-3 mt-2">
        <label className="flex items-center gap-1">
          <span className="text-sm">Rating</span>
          <input
            type="number"
            value={key || 75}
            min={40}
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
      case ConstraintTypes.NATIONALITY:
        return "Players from specific nations";
      case ConstraintTypes.LEAGUE:
        return "Players from specific league";
      case ConstraintTypes.TEAMID:
        return "Players from specific club";
      case ConstraintTypes.RARITY:
        return "Players with specific rarity";
      case ConstraintTypes.RARITY_GROUP:
        return "Players from rarity group";
      default:
        return type;
    }
  };

  const getPlaceholder = () => {
    switch (type) {
      case ConstraintTypes.NATIONALITY:
        return "Nation IDs (comma separated)";
      case ConstraintTypes.LEAGUE:
        return "League ID";
      case ConstraintTypes.TEAMID:
        return "Team ID";
      case ConstraintTypes.RARITY:
      case ConstraintTypes.RARITY_GROUP:
        return "Rarity IDs (comma separated)";
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
          <span className="text-sm">Count:</span>
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
      [ConstraintTypes.NATIONS]: "Number of Nations",
      [ConstraintTypes.LEAGUES]: "Number of Leagues",
      [ConstraintTypes.CLUBS]: "Number of Clubs",
      [ConstraintTypes.MIN_QUALITY]: "Minimum Quality (Bronze/Silver/Gold)",
      [ConstraintTypes.MAX_QUALITY]: "Maximum Quality",
      [ConstraintTypes.EXACTLY_QUALITY]: "Exactly Quality",
      [ConstraintTypes.SAME_NATIONS]: "Players from Same Nation",
      [ConstraintTypes.SAME_LEAGUES]: "Players from Same League",
      [ConstraintTypes.SAME_CLUBS]: "Players from Same Club",
    };
    return labelMap[type] || type.charAt(0).toUpperCase() + type.slice(1);
  };

  // Get operations based on constraint type
  const getOperations = () => {
    return [
      ConstraintOperation.Min,
      ConstraintOperation.Max,
      ConstraintOperation.Exactly,
    ];
  };

  const handleOperationChange = (op) => onUpdate(id, "operation", op);
  const handleValueChange = (val) => onUpdate(id, "value", val);

  const isQuality = [
    ConstraintTypes.MIN_QUALITY,
    ConstraintTypes.MAX_QUALITY,
    ConstraintTypes.EXACTLY_QUALITY,
  ].includes(type);
  const maxValue = isQuality ? 3 : 11;
  const minValue = isQuality ? 1 : 1;

  // For quality constraints, show the quality type
  const getQualityLabel = (value) => {
    if (!isQuality) return value;
    switch (value) {
      case 1:
        return "Bronze";
      case 2:
        return "Silver";
      case 3:
        return "Gold";
      default:
        return value;
    }
  };

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
          <span>{isQuality ? "Bronze" : minValue}</span>
          <span className="text-sm font-medium text-white">
            {isQuality ? getQualityLabel(value) : value}
          </span>
          <span>{isQuality ? "Gold" : maxValue}</span>
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
    // Primary constraints
    { type: ConstraintTypes.RATING, label: "Team Rating" },
    { type: ConstraintTypes.CHEMISTRY, label: "Team Chemistry" },

    // Player quality constraints
    {
      type: ConstraintTypes.PLAYER_OVERALL_RATING_MIN,
      label: "Minimum Player Rating",
    },
    {
      type: ConstraintTypes.PLAYER_OVERALL_RATING_MAX,
      label: "Maximum Player Rating",
    },
    {
      type: ConstraintTypes.MIN_QUALITY,
      label: "Minimum Quality (Bronze/Silver/Gold)",
    },
    { type: ConstraintTypes.MAX_QUALITY, label: "Maximum Quality" },
    { type: ConstraintTypes.EXACTLY_QUALITY, label: "Exactly Quality" },

    // Rarity constraints
    { type: ConstraintTypes.RARITY, label: "Specific Rarity Required" },
    { type: ConstraintTypes.RARITY_GROUP, label: "Rarity Group Required" },

    // Nationality constraints
    { type: ConstraintTypes.NATIONALITY, label: "Specific Nations Required" },
    { type: ConstraintTypes.NATIONS, label: "Number of Nations" },
    { type: ConstraintTypes.SAME_NATIONS, label: "Players from Same Nation" },

    // League constraints
    { type: ConstraintTypes.LEAGUE, label: "Specific League Required" },
    { type: ConstraintTypes.LEAGUES, label: "Number of Leagues" },
    { type: ConstraintTypes.SAME_LEAGUES, label: "Players from Same League" },

    // Club constraints
    { type: ConstraintTypes.TEAMID, label: "Specific Club Required" },
    { type: ConstraintTypes.CLUBS, label: "Number of Clubs" },
    { type: ConstraintTypes.SAME_CLUBS, label: "Players from Same Club" },

    // Chemistry constraints
    { type: ConstraintTypes.PLAYER_CHEMISTRY, label: "Min Player Chemistry" },

    // Special constraints
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
      [ConstraintTypes.RATING]: {
        operation: ConstraintOperation.Min,
        value: 70,
      },
      [ConstraintTypes.CHEMISTRY]: {
        operation: ConstraintOperation.Min,
        value: 20,
      },
      [ConstraintTypes.PLAYER_CHEMISTRY]: {
        operation: ConstraintOperation.Min,
        value: 2,
      },

      [ConstraintTypes.PLAYER_OVERALL_RATING_MIN]: {
        operation: ConstraintOperation.Min,
        key: 85,
        value: 1,
      },
      [ConstraintTypes.PLAYER_OVERALL_RATING_MAX]: {
        operation: ConstraintOperation.Max,
        key: 75,
        value: 11,
      },
      [ConstraintTypes.MIN_QUALITY]: {
        operation: ConstraintOperation.Min,
        key: 2,
        value: 11,
      },
      [ConstraintTypes.MAX_QUALITY]: {
        operation: ConstraintOperation.Max,
        key: 2,
        value: 11,
      },
      [ConstraintTypes.EXACTLY_QUALITY]: {
        operation: ConstraintOperation.Exactly,
        key: 2,
        value: 11,
      },

      [ConstraintTypes.RARITY]: {
        key: "",
        value: 1,
        operation: ConstraintOperation.Min,
      },
      [ConstraintTypes.RARITY_GROUP]: {
        key: "",
        value: 1,
        operation: ConstraintOperation.Min,
      },

      [ConstraintTypes.NATIONALITY]: {
        key: "",
        value: 1,
        operation: ConstraintOperation.Min,
      },
      [ConstraintTypes.NATIONS]: {
        operation: ConstraintOperation.Min,
        value: 5,
      },
      [ConstraintTypes.SAME_NATIONS]: {
        operation: ConstraintOperation.Min,
        value: 3,
      },

      [ConstraintTypes.LEAGUE]: {
        key: "",
        value: 1,
        operation: ConstraintOperation.Min,
      },
      [ConstraintTypes.LEAGUES]: {
        operation: ConstraintOperation.Min,
        value: 3,
      },
      [ConstraintTypes.SAME_LEAGUES]: {
        operation: ConstraintOperation.Min,
        value: 3,
      },

      [ConstraintTypes.TEAMID]: {
        key: "",
        value: 1,
        operation: ConstraintOperation.Min,
      },
      [ConstraintTypes.CLUBS]: { operation: ConstraintOperation.Min, value: 5 },
      [ConstraintTypes.SAME_CLUBS]: {
        operation: ConstraintOperation.Min,
        value: 2,
      },

      [ConstraintTypes.EXACTLY_SILVER]: { value: true },
    };

    const defaults = defaultValues[type] || {
      operation: ConstraintOperation.Min,
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

    // Player overall rating constraints
    if (
      type === ConstraintTypes.PLAYER_OVERALL_RATING_MIN ||
      type === ConstraintTypes.PLAYER_OVERALL_RATING_MAX
    ) {
      return (
        <PlayerRatingConstraintRow
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
        ConstraintTypes.NATIONALITY,
        ConstraintTypes.LEAGUE,
        ConstraintTypes.TEAMID,
        ConstraintTypes.RARITY,
        ConstraintTypes.RARITY_GROUP,
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
