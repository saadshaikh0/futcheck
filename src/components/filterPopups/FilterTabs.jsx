// FilterTabs.jsx

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
// import PlaystylePopup from "./playStylePopup";
// import RoleStylePopup from "./RolePopup";
// import NameInput from "./nameTextBoxPopup";
// import PriceSlider from "./pricePopup";
// import PositionCard from "./positioncardPopup";

export const tabs = [
  {
    name: "Version",
    component: <VersionPopup />,
    mobileComponent: <MobileVersionPopup />,
  },
  {
    name: "Rating",
    component: <RatingPopup />,
    mobileComponent: <MobileRatingPopup />,
  },
  {
    name: "Nation",
    component: <NationPopup />,
    mobileComponent: <MobileNationPopup />,
  },
  {
    name: "League",
    component: <LeaguePopup />,
    mobileComponent: <MobileLeaguePopup />,
  },
  {
    name: "Team",
    component: <TeamPopup />,
    mobileComponent: <MobileTeamPopup />,
  },
  {
    name: "Skill Moves",
    component: <SkillMovesPopup />,
    mobileComponent: <MobileSkillMovesPopup />,
  },
  {
    name: "Weak Foot",
    component: <WeakFootPopup />,
    mobileComponent: <MobileWeakFootPopup />,
  },
  // { name: "Play Style", component: <PlaystylePopup />, mobileComponent: <MobilePlaystylePopup /> },
  // { name: "Role Style", component: <RoleStylePopup />, mobileComponent: <MobileRoleStylePopup /> },
  // { name: "Position", component: <PositionCard />, mobileComponent: <MobilePositionCard /> },
];

const FilterTabs = ({ isMobile }) => {
  return (
    <div className="text-white h-full flex flex-col gap-3 bg-slate-800 px-4 py-2 rounded">
      {tabs.map((tab) => (
        <div key={tab.name}>
          <span className="text-white pl-1">{tab.name}</span>
          <span>{isMobile ? tab.mobileComponent : tab.component}</span>
        </div>
      ))}
    </div>
  );
};

export default FilterTabs;
