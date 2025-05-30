import React, { useState, useEffect } from "react";
import { fetchStatClashCards } from "../../api/apiService";
import PlayerCard from "../common/PlayerCard";

const attributes = [
  "pace",
  "shooting",
  "passing",
  "dribbling",
  "defending",
  "physical",
];

// Map attribute name -> index in card.attributes array
const attributeIndexMap = {
  pace: 0,
  shooting: 1,
  passing: 2,
  dribbling: 3,
  defending: 4,
  physical: 5,
};

export default function StatClash() {
  // We'll fetch 5 cards for user and 5 cards for opponent (just call the API twice)
  const [userCards, setUserCards] = useState([]);
  const [opponentCards, setOpponentCards] = useState([]);

  const [userHealth, setUserHealth] = useState(100);
  const [opponentHealth, setOpponentHealth] = useState(100);

  const [currentAttribute, setCurrentAttribute] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);

  // Fetch random cards from API on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user cards
        const userData = await fetchStatClashCards();
        // Fetch opponent cards
        const oppData = await fetchStatClashCards();

        setUserCards(userData.cards);
        setOpponentCards(oppData.cards);
      } catch (err) {
        console.error("Failed to load stat clash cards:", err);
      }
    };

    fetchData();
  }, []);

  // Function to spin & choose a random attribute
  const spinAttribute = () => {
    setIsSpinning(true);
    setTimeout(() => {
      const randomAttr =
        attributes[Math.floor(Math.random() * attributes.length)];
      setCurrentAttribute(randomAttr);
      setIsSpinning(false);
    }, 1000); // 1 second spin
  };

  const handleUserSelectCard = (card) => {
    if (!currentAttribute) return;

    // Opponent picks a random card (you could add AI logic here)
    const oppCard =
      opponentCards[Math.floor(Math.random() * opponentCards.length)];

    // Retrieve the correct index from our attribute mapping
    const index = attributeIndexMap[currentAttribute];

    // card.attributes is an array in order: [pace, shooting, passing, dribbling, defending, physical]
    // So userStat is the value at that index
    const userStat = card.attributes[index];
    const oppStat = oppCard.attributes[index];

    // Decide winner
    if (userStat > oppStat) {
      const damage = userStat - oppStat;
      setOpponentHealth((prev) => Math.max(prev - damage, 0));
    } else if (oppStat > userStat) {
      const damage = oppStat - userStat;
      setUserHealth((prev) => Math.max(prev - damage, 0));
    }

    // After selection, clear attribute for next spin
    setCurrentAttribute(null);
  };
  // Minimal UI for health bars
  const HealthBar = ({ health, label }) => {
    return (
      <div className="flex w-full flex-col items-center mb-2">
        <div className="w-full h-4 bg-gray-300 rounded-full overflow-hidden">
          <div
            className="bg-red-500 h-full transition-all duration-300"
            style={{ width: `${health}%` }}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 flex flex-col items-center gap-6 w-4/5 mx-auto">
      {/* Opponent side */}
      <div className="flex flex-col items-center">
        <HealthBar health={opponentHealth} label="Opponent" />
        <div className="flex gap-2">
          {opponentCards.map((card) => (
            <PlayerCard player={card} isMini={false} />
          ))}
        </div>
      </div>

      {/* Middle section with spinner + attribute */}
      <div className="flex flex-col items-center gap-4">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition"
          onClick={spinAttribute}
          disabled={isSpinning}
        >
          {isSpinning ? "Spinning..." : "Spin Attribute"}
        </button>
        {currentAttribute && (
          <div className="text-xl text-white font-bold">
            Attribute: {currentAttribute.toUpperCase()}
          </div>
        )}
      </div>

      {/* User side */}
      <div className="flex flex-col items-center">
        <div className="flex gap-2 mb-2">
          {userCards.map((card) => (
            <div key={card.id} onClick={() => handleUserSelectCard(card)}>
              <PlayerCard player={card} isMini={false} />
            </div>
          ))}
        </div>
        <HealthBar health={userHealth} label="You" />
      </div>
    </div>
  );
}
