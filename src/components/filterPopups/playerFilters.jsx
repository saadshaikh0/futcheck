import React from "react";
import MobileVersionPopup from "./mobileFilterPopups/versionPopup";
import MobileRatingPopup from "./mobileFilterPopups/ratingPopup";
import MobileNationPopup from "./mobileFilterPopups/nationPopup";
import MobileLeaguePopup from "./mobileFilterPopups/leaguePopup";
import MobileTeamPopup from "./mobileFilterPopups/teamPopup";
import MobileSkillMovesPopup from "./mobileFilterPopups/skillMovesPopup";
import MobileWeakFootPopup from "./mobileFilterPopups/weakfootPopup";
import MobileWorkRatePopup from "./mobileFilterPopups/workRatePopup";
import VersionPopup from "./versionPopup";
import RatingPopup from "./ratingPopup";
import NationPopup from "./nationPopup";
import LeaguePopup from "./leaguePopup";
import TeamPopup from "./teamPopup";
import SkillMovesPopup from "./skillMovesPopup";
import WeakFootPopup from "./weakfootPopup";
import PlayStyle from "./playStylePopup";
import RoleStyle from "./RolePopup";
import NameInput from "./nameTextBoxPopup";
import PriceSlider from "./pricePopup";
import PositionCard from "./positioncardPopup";

export const tabs = [
  { name: "Name", component: <NameInput /> },
  { name: "Price", component: <PriceSlider /> },
  { name: "Version", component: <VersionPopup /> },
  { name: "Rating", component: <RatingPopup /> },
  { name: "Nation", component: <NationPopup /> },
  { name: "League", component: <LeaguePopup /> },
  { name: "Team", component: <TeamPopup /> },
  { name: "Skill Moves", component: <SkillMovesPopup /> },
  { name: "Weak Foot", component: <WeakFootPopup /> },
  { name: "Play Style", component: <PlayStyle /> },
  { name: "Role Style", component: <RoleStyle /> },
  { name: PositionCard, component: <PositionCard /> },
  // For Mobile Filters
  { name: "Version", value: "rarity", component: <MobileVersionPopup /> },
  { name: "Rating", value: ["min_rating", "max_rating"], component: <MobileRatingPopup /> },
  { name: "Nation", value: "nation", component: <MobileNationPopup /> },
  { name: "League", value: "leagueid", component: <MobileLeaguePopup /> },
  { name: "Team", value: "teamid", component: <MobileTeamPopup /> },
  { name: "Skill Moves", value: "skill_moves", component: <MobileSkillMovesPopup /> },
  { name: "Weak Foot", value: "weak_foot", component: <MobileWeakFootPopup /> },
  { name: "Rate", component: <MobileWorkRatePopup /> },
];
