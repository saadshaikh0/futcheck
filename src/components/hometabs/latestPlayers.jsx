import PlayerCard from "../common/PlayerCard";

const LatestPlayers = ({ players, selectedTab }) => {
  return (
    <div key={selectedTab}>
      <div className="text-white grid grid-cols-3 md:grid-cols-5 lg:grid-cols-10">
        {players.map((player) => (
          <div
            key={`${player.id}`}
            className="flex flex-col justify-center items-center relative"
          >
            {/* Wrap PlayerCard in a relative div */}
            <div className="relative">
              <PlayerCard
                showPrice={true}
                player={player}
                isMini={true}
                isDisabled={false}
              />

              {/* Conditionally render price and trend percentage when tab is HOT */}
              {selectedTab === "HOT" && (
                <div className="bg-black bg-opacity-80 text-white text-xs font-bold z-10 flex items-center gap-1 text-center px-2 rounded-lg justify-center absolute bottom-3 left-1/2 transform -translate-x-1/2">
                  {player?.trend && (
                    <span
                      className={`${
                        player?.trend < 0 ? "text-red-500" : "text-green-500"
                      } font-mono text-xs`}
                    >
                      {player?.trend > 0 ? "+" : ""}
                      {player?.trend}%
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Existing slotname display */}
            {player.slotname && (
              <div className="bg-black w-full text-yellow-600 text-center rounded text-xs font-semibold">
                {player.slotname}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
export default LatestPlayers;
