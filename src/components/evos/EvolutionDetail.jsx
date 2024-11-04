import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  convertAcademyElgReqToFormat,
  convertAcademyReqToStrings,
  processLevels,
} from "../utils/utils";
import {
  RatingComponent,
  RarityComponent,
  PaceComponent,
  ShootingComponent,
  PassingComponent,
  DribblingComponent,
  DefendingComponent,
  PhysicalityComponent,
  SubAttributeComponent,
  SkillMovesComponent,
  WeakFootComponent,
  PositionComponent,
  TraitComponent,
  RolesComponent,
  CustomizationRewardComponent,
  UnknownComponent,
} from "./EvolutionUtils";
import EvolutionPath from "./EvolutionPath";
import EvolutionPlayers from "./EvolutionPlayers";

const getComponentByType = (type) => {
  switch (type) {
    case "rating":
      return RatingComponent;
    case "rarity":
      return RarityComponent;
    case "pace":
      return PaceComponent;
    case "shooting":
      return ShootingComponent;
    case "passing":
      return PassingComponent;
    case "dribbling":
      return DribblingComponent;
    case "defending":
      return DefendingComponent;
    case "physicality":
      return PhysicalityComponent;
    case "subattribute":
      return SubAttributeComponent;
    case "skillmoves":
      return SkillMovesComponent;
    case "weakfoot":
      return WeakFootComponent;
    case "position":
      return PositionComponent;
    case "trait":
      return TraitComponent;
    case "roles":
      return RolesComponent;
    case "Customization Reward":
      return CustomizationRewardComponent;
    default:
      return UnknownComponent;
  }
};

const toTitleCase = (str) => {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const EvolutionDetail = () => {
  const evolution = useSelector((state) => state.evolution.details);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const rarities = useSelector((state) => state.app.rarities);

  useEffect(() => {
    if (evolution.top_players && evolution.top_players.length > 0) {
      setSelectedPlayer(evolution.top_players[0]);
    }
  }, [evolution.top_players]);

  if (!evolution.name) return <></>;
  const {
    id,
    name,
    description,
    endTimePurchaseVisibility,
    endTimeStamp,
    levels,
    elgReqs,
  } = evolution;

  const formattedReqs = convertAcademyElgReqToFormat(elgReqs);
  const reqStrings = formattedReqs.map((req) =>
    convertAcademyReqToStrings(req)
  );
  const levelData = processLevels(levels);
  const trait = levelData?.finalUpgradeData?.filter(
    (upgrade) => upgrade.attributeType === "trait"
  );

  const roles = levelData?.finalUpgradeData?.filter(
    (upgrade) => upgrade.attributeType === "roles"
  );

  const rarity = levelData?.finalUpgradeData?.filter(
    (upgrade) => upgrade.attributeType === "rarity"
  );

  const otherUpgrades = levelData?.finalUpgradeData?.filter(
    (upgrade) =>
      upgrade.attributeType !== "trait" &&
      upgrade.attributeType !== "roles" &&
      upgrade.attributeType !== "rarity"
  );

  return (
    <div className="w-4/5 lg:h-[calc(100vh-4rem)] mx-auto text-white flex flex-col gap-10">
      <div className="text-white text-center mt-4">
        <h1 className="text-4xl font-bold ">{name}</h1>
        <p>{description}</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_3fr] flex-grow gap-4 h-full">
        <div className="flex flex-col gap-5">
          <div className="bg-gray-900 p-4 rounded-md">
            <h2 className="text-white text-center mb-4 font-bold text-xl">
              Eligibility Requirements
            </h2>
            <div className="grid grid-cols-1 text-center gap-2">
              {reqStrings.map((s, index) => (
                <div key={index}>{s}</div>
              ))}
            </div>
          </div>
          <div className="bg-gray-900 p-4 rounded-md flex-grow">
            <h2 className="text-white text-center mb-4 font-bold text-xl">
              Total Upgrades
            </h2>
            <div className="flex flex-col gap-2">
              {trait.length > 0 && (
                <div className="grid grid-cols-2">
                  <div>Playstyles:</div>
                  <div className="flex gap-2">
                    {trait.map((upgrade) => {
                      const Component = getComponentByType(
                        upgrade.attributeType
                      );
                      return (
                        <Component
                          key={upgrade.attributeName}
                          value={upgrade.value}
                        />
                      );
                    })}
                  </div>
                </div>
              )}
              {roles.length > 0 && (
                <div className="grid grid-cols-2">
                  <div>Roles:</div>
                  <div className="flex gap-2">
                    {roles.map((upgrade) => {
                      const Component = getComponentByType(
                        upgrade.attributeType
                      );
                      return (
                        <div className="relative" key={upgrade.attributeName}>
                          <Component
                            value={upgrade.value}
                            count={upgrade.count}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              {rarity.length > 0 && (
                <div className="grid grid-cols-2">
                  <div>Rarity:</div>
                  <div className="flex gap-2">
                    {rarity.map((upgrade) => {
                      const Component = getComponentByType(
                        upgrade.attributeType
                      );
                      return (
                        <Component
                          key={upgrade.attributeName}
                          value={upgrade.count}
                        />
                      );
                    })}
                  </div>
                </div>
              )}
              <div className="grid grid-cols-2 gap-2">
                {otherUpgrades.map((upgrade) => {
                  const Component = getComponentByType(upgrade.attributeType);
                  const attributeName = toTitleCase(
                    upgrade.attributeName.replace(/_/g, " ")
                  );
                  return (
                    <div
                      className="grid grid-cols-2"
                      key={upgrade.attributeName}
                    >
                      <div className="">{attributeName}</div>
                      <Component value={upgrade.count} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col h-full min-h-0">
          <div key={`evolution_path_${id}`} className="w-full md:w-4/5 mx-auto">
            {selectedPlayer && (
              <EvolutionPath
                key={selectedPlayer.id}
                player={selectedPlayer}
                levels={levels}
              />
            )}
          </div>
          <div key={id} className="flex-grow overflow-auto scrollbar-none">
            <EvolutionPlayers id={id} onPlayerClick={setSelectedPlayer} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvolutionDetail;
