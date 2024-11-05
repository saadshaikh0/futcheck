import { useState } from 'react';

export default function PositionCard() {
  // State to control the collapse/expand behavior
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="bg-slate-700 text-white rounded-lg pl-2 p-1 mt-1">
        <div className="flex items-center justify-between mb-1">
          <p className=" text-white rounded-lg pl-2  ">Position</p>
          <button
            className="text-slate-400 hover:text-slate-200"
            onClick={() => setIsCollapsed(!isCollapsed)} // Toggle the collapse state
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`w-5 h-5 transition-transform ${isCollapsed ? 'rotate-180' : ''}`} // Apply rotation when collapsed
            >
              <path d="m18 15-6-6-6 6" />
            </svg>
          </button>
        </div>

        {/* Conditional rendering: only show the content when `isCollapsed` is false */}
        {!isCollapsed && (
          <div className="grid grid-cols-3 gap-4">
            {/* Attackers section */}
            <div className="space-y-2">
              <div className="text-slate-400 text-sm font-medium mb-2">Attackers</div>
              {["LW", "LM", "LB", "CDM"].map((pos) => (
                <button
                  key={pos}
                  className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 py-2 rounded text-sm font-medium transition-colors"
                >
                  {pos}
                </button>
              ))}
            </div>

            {/* Midfielders section */}
            <div className="space-y-2">
              <div className="text-slate-400 text-sm font-medium mb-2">Midfielders</div>
              {["ST", "RM", "CM", "CB"].map((pos) => (
                <button
                  key={pos}
                  className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 py-2 rounded text-sm font-medium transition-colors"
                >
                  {pos}
                </button>
              ))}
            </div>

            {/* Defenders section */}
            <div className="space-y-2">
              <div className="text-slate-400 text-sm font-medium mb-2">Defenders</div>
              {["RW", "CAM", "RB", "GK"].map((pos) => (
                <button
                  key={pos}
                  className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 py-2 rounded text-sm font-medium transition-colors"
                >
                  {pos}
                </button>
              ))}
            </div>
          </div>
        )}
    </div>
  );
}
