import React, { useState, useEffect } from "react";

const DualRangeSlider = ({
  min = 0,
  max = 100,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
}) => {
  const [minThumb, setMinThumb] = useState(
    () => ((minPrice - min) / (max - min)) * 100
  );
  const [maxThumb, setMaxThumb] = useState(
    () => ((max - maxPrice) / (max - min)) * 100
  );

  // State for temporary input values
  const [tempMinPrice, setTempMinPrice] = useState(minPrice);
  const [tempMaxPrice, setTempMaxPrice] = useState(maxPrice);

  /**
   * Updates the visual slider track position
   */
  const updateThumbPositions = (newMinPrice, newMaxPrice) => {
    setMinThumb(Math.max(0, ((newMinPrice - min) / (max - min)) * 100)); // Ensures it never goes negative
    setMaxThumb(Math.max(0, ((max - newMaxPrice) / (max - min)) * 100));
  };
  /**
   * Handles the min slider movement
   */
  const minTrigger = (val) => {
    const newMinPrice = Math.max(min, Math.min(val, maxPrice));
    setMinPrice(newMinPrice);
    setTempMinPrice(newMinPrice);
    updateThumbPositions(newMinPrice, maxPrice);
  };

  /**
   * Handles the max slider movement
   */
  const maxTrigger = (val) => {
    const newMaxPrice = Math.min(max, Math.max(val, minPrice));
    setMaxPrice(newMaxPrice);
    setTempMaxPrice(newMaxPrice);
    updateThumbPositions(minPrice, newMaxPrice);
  };

  /**
   * Handle input changes on the min input
   * We clamp in real-time to ensure we never go out of range or past the max
   */
  const handleMinInputChange = (value) => {
    setTempMinPrice(value); // Keep showing what the user typed

    // Parse and clamp in real-time
    const parsed = parseInt(value, 10);
    if (!isNaN(parsed)) {
      const newMinPrice = Math.max(min, Math.min(parsed, maxPrice));
      setMinPrice(newMinPrice);
      updateThumbPositions(newMinPrice, maxPrice);
    }
  };

  /**
   * Handle input changes on the max input
   * We clamp in real-time to ensure we never go out of range or below the min
   */
  const handleMaxInputChange = (value) => {
    setTempMaxPrice(value); // Keep showing what the user typed

    // Parse and clamp in real-time
    const parsed = parseInt(value, 10);
    if (!isNaN(parsed)) {
      const newMaxPrice = Math.min(max, Math.max(parsed, minPrice));
      setMaxPrice(newMaxPrice);
      updateThumbPositions(minPrice, newMaxPrice);
    }
  };

  /**
   * Initialize thumb positions when min/max values change
   */
  useEffect(() => {
    updateThumbPositions(minPrice, maxPrice);
    setTempMinPrice(minPrice);
    setTempMaxPrice(maxPrice);
  }, [min, max, minPrice, maxPrice]);

  return (
    <div className="mt-4 mb-2 relative max-w-xl w-full">
      {/* Hidden Range Inputs for the Thumbs */}
      <input
        type="range"
        step="1"
        min={min}
        max={max}
        value={minPrice}
        onChange={(e) => minTrigger(parseInt(e.target.value, 10))}
        className="absolute pointer-events-none appearance-none z-20 h-2 w-full opacity-0 cursor-pointer"
      />

      <input
        type="range"
        step="1"
        min={min}
        max={max}
        value={maxPrice}
        onChange={(e) => maxTrigger(parseInt(e.target.value, 10))}
        className="absolute pointer-events-none appearance-none z-20 h-2 w-full opacity-0 cursor-pointer"
      />

      {/* Slider Track */}
      <div className="relative z-10 h-2">
        {/* Background Track */}
        <div className="absolute z-10 left-0 right-0 bottom-0 top-0 rounded-md bg-gray-200"></div>

        {/* Colored Selection Between Min and Max */}
        <div
          className="absolute z-20 top-0 bottom-0 rounded-md bg-fuchsia-400"
          style={{ left: `${minThumb}%`, right: `${maxThumb}%` }}
        ></div>

        {/* Min Thumb */}
        <div
          className="absolute z-30 w-6 h-6 top-0 bg-fuchsia-400 rounded-full -mt-2 -ml-1"
          style={{ left: `${minThumb}%` }}
        ></div>

        {/* Max Thumb */}
        <div
          className="absolute z-30 w-6 h-6 top-0 bg-fuchsia-400 rounded-full -mt-2 -mr-3"
          style={{ right: `${maxThumb}%` }}
        ></div>
      </div>

      {/* Direct Inputs for Min & Max Values */}
      <div className="flex items-center justify-between pt-5 space-x-4">
        {/* Min Price Input */}
        <div className="flex items-center space-x-2">
          <input
            id="minInput"
            type="number"
            className="w-12 p-1 text-black text-center rounded"
            value={tempMinPrice}
            onChange={(e) => handleMinInputChange(e.target.value)}
          />
        </div>

        {/* Max Price Input */}
        <div className="flex items-center space-x-2">
          <input
            id="maxInput"
            type="number"
            className="w-12 p-1 text-black text-center rounded"
            value={tempMaxPrice}
            onChange={(e) => handleMaxInputChange(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default DualRangeSlider;
