import React from "react";
import PlayerCard from "../common/PlayerCard";
import CoinsImg from "../../assets/coins.png";
import PointsImg from "../../assets/pointsIcon.png";
import {
  convertAcademyElgReqToFormat,
  convertAcademyReqToStrings,
  getTimeUntilExpiration,
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
import { useSelector } from "react-redux";
import { useHandleResize } from "../utils/hooks";
import { Link } from "react-router-dom";

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

const EvolutionCard = ({ data }) => {
  const {
    id,
    name,
    description,
    releaseTime,
    endTimeStamp,
    endTime,
    totalCost,
    endTimePurchaseVisibility,
    elgReqs,
    levels,
    top_players,
    currencies,
  } = data;

  const currentTimestamp = Date.now() + new Date().getTimezoneOffset() * 60000;
  const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
  const twoDaysInMilliseconds = 2 * oneDayInMilliseconds;
  const isMobile = useHandleResize();

  const isNew =
    currentTimestamp - new Date(releaseTime).getTime() < oneDayInMilliseconds;

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

  const otherUpgrades = levelData?.finalUpgradeData?.filter(
    (upgrade) =>
      upgrade.attributeType !== "trait" && upgrade.attributeType !== "roles"
  );
  const rarities = useSelector((state) => state.app.rarities);

  const coins = currencies.find((currency) => currency.name === "COINS");
  const points = currencies.find((currency) => currency.name === "POINTS");

  return (
    <div className="bg-[#13151D] h-full rounded-md flex flex-col items-center text-white">
      <div className="flex flex-col md:gap-8 flex-grow ">
        <div className="grid grid-cols-3 md:grid-cols-5 max-h-[10em]">
          {top_players
            ?.slice(0, isMobile ? 3 : top_players.length)
            .map((player) => {
              return <PlayerCard player={player} isMini={false} />;
            })}
        </div>
        <div className="flex flex-col order-2 md:order-1 py-5 px-4 gap-3 flex-grow">
          <p className="text-white text-lg font-bold text-center">{name}</p>
          <p className="text-[#B0B0B0]">{description}</p>
          <div className="grid grid-cols-1 md:grid-cols-2  gap-10 flex-grow">
            <div className="bg-gray-700 px-8 py-4 rounded-md">
              <div className="text-center mb-4">Eligibility Requirements</div>
              <div className="grid grid-cols-1">
                {reqStrings.map((s) => (
                  <div>{s}</div>
                ))}
              </div>
            </div>
            <div className="bg-gray-700 px-8  py-4 rounded-md">
              <div className="text-center mb-4">Final Upgrades</div>
              <div className="grid grid-cols-1">
                {trait.length > 0 && (
                  <div className="grid grid-cols-2">
                    <div>Playstyles:</div>
                    <div className="flex gap-2 overflow-auto">
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
                          <div className="relative">
                            <Component
                              key={upgrade.attributeName}
                              value={upgrade.value}
                              count={upgrade.count}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
                {otherUpgrades.slice(0, 5).map((upgrade) => {
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
                {otherUpgrades.length > 5 && (
                  <div className="grid grid-cols-2">
                    <div className="">+{otherUpgrades.length - 5} more</div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 text-white font-bold text-center">
            <div className="flex flex-col">
              <span>Unlock Within</span>
              <span>
                {" "}
                {endTimePurchaseVisibility == 0
                  ? "No Expiry"
                  : !endTimePurchaseVisibility
                  ? "Expired"
                  : getTimeUntilExpiration(endTimePurchaseVisibility)}
              </span>
            </div>
            <div className="flex flex-col">
              <span>Expires In</span>
              <span>
                {endTime == 0
                  ? "No Expiry"
                  : !endTimeStamp
                  ? "Expired"
                  : getTimeUntilExpiration(endTimeStamp)}
              </span>
            </div>
            <div className="flex gap-4 absolute bottom-2 right-2">
              {coins && (
                <div className="flex items-center gap-1">
                  <img className="w-4 h-4" src={CoinsImg} />{" "}
                  {coins.funds.toLocaleString("en-US")}{" "}
                </div>
              )}
              {points && (
                <div className="flex items-center gap-1">
                  <img className="w-4 h-4" src={PointsImg} />
                  {points.funds.toLocaleString("en-US")}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Link className="w-full" to={`/evolution/${id}`}>
        {" "}
        <div className="bg-gray-800 w-full cursor-pointer py-2 ">
          <p className="text-center font-bold">Show Details</p>
        </div>
      </Link>
      <div className="absolute top-0 right-0 p-2">
        {isNew && (
          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
            New
          </span>
        )}
      </div>
    </div>
  );
};

export default EvolutionCard;
