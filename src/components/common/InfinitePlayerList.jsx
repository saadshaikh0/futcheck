// InfinitePlayerList.jsx

import React, { useEffect, useRef } from "react";

const InfinitePlayerList = ({
  players,
  renderPlayerCard,
  onLoadMore,
  hasMore,
  isLoading,
  containerClassName = "",
  threshold = 5, // Threshold in pixels before reaching the bottom
  loadingComponent = null, // Optional custom loading component
  noMoreDataComponent = null, // Optional component when no more data
}) => {
  const containerRef = useRef();

  useEffect(() => {
    const handleScroll = () => {
      const scrollContainer = containerRef.current;
      if (!scrollContainer) return;

      const { scrollTop, scrollHeight, clientHeight } = scrollContainer;

      if (
        scrollTop + clientHeight >= scrollHeight - threshold &&
        hasMore &&
        !isLoading
      ) {
        onLoadMore();
      }
    };

    const scrollContainer = containerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, [hasMore, isLoading, onLoadMore, threshold]);

  return (
    <div ref={containerRef} className={containerClassName}>
      <div className="mt-3 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-6 gap-2 md:gap-4">
        {players.map((player, index) => (
          <div key={player.id || index}>{renderPlayerCard(player, index)}</div>
        ))}
      </div>
      {isLoading && loadingComponent}
      {!hasMore && noMoreDataComponent}
    </div>
  );
};

export default InfinitePlayerList;
