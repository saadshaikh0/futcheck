import PlayerCard from "../common/PlayerCard";

const LatestPlayers = ({ players }) => {
  return (
    <div>
      <div className="text-white grid grid-cols-3 md:grid-cols-5 lg:grid-cols-10">
        {players.map((player) => (
          <div key={player.id} className="flex justify-center items-center">
            <PlayerCard
              showPrice={true}
              player={player}
              isMini={true}
              isDisabled={false}
            />
          </div>
        ))}{" "}
      </div>
    </div>
  );
};
export default LatestPlayers;
