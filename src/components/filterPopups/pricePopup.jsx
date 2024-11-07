import React, { useState, useEffect } from "react";

const PriceSlider = () => {
  // Set default values for min, max, minPrice, and maxPrice
  const min = 0;
  const max = 1000;
  const [minPrice, setMinPrice] = useState(min);
  const [maxPrice, setMaxPrice] = useState(max);

  const [minThumb, setMinThumb] = useState(0);
  const [maxThumb, setMaxThumb] = useState(100);

  // Update thumb positions when minPrice or maxPrice changes
  useEffect(() => {
    const newMinThumb = ((minPrice - min) / (max - min)) * 100;
    setMinThumb(newMinThumb);
  }, [minPrice, min, max]);

  useEffect(() => {
    const newMaxThumb = ((max - maxPrice) / (max - min)) * 100;
    setMaxThumb(newMaxThumb);
  }, [maxPrice, min, max]);

  const minTrigger = (val) => {
    const newMinPrice = Math.min(val, maxPrice - 1);
    setMinPrice(newMinPrice);
  };

  const maxTrigger = (val) => {
    const newMaxPrice = Math.max(val, minPrice + 1);
    setMaxPrice(newMaxPrice);
  };

  return (
    <div className="mt-4  relative max-w-xl w-full">
      <div>
        {/* Min Price Range */}
        <input
          type="range"
          step="1"
          min={min}
          max={max}
          onChange={(e) => minTrigger(parseInt(e.target.value))}
          value={minPrice}
          className="absolute pointer-events-none appearance-none z-20 h-2 w-full opacity-0 cursor-pointer"
        />
        
        {/* Max Price Range */}
        <input
          type="range"
          step="1"
          min={min}
          max={max}
          onChange={(e) => maxTrigger(parseInt(e.target.value))}
          value={maxPrice}
          className="absolute pointer-events-none appearance-none z-20 h-2 w-full opacity-0 cursor-pointer"
        />

        <div className="relative z-10 h-2">
          <div className="absolute z-10 left-0 right-0 bottom-0 top-0 rounded-md bg-gray-200"></div>
          {/* Colored range between min and max */}
          <div
            className="absolute z-20 top-0 bottom-0 rounded-md bg-fuchsia-400"
            style={{ right: `${maxThumb}%`, left: `${minThumb}%` }}
          ></div>
          {/* Min thumb */}
          <div
            className="absolute z-30 w-6 h-6 top-0 left-0 bg-fuchsia-400 rounded-full -mt-2 -ml-1"
            style={{ left: `${minThumb}%` }}
          ></div>
          {/* Max thumb */}
          <div
            className="absolute z-30 w-6 h-6 top-0 right-0 bg-fuchsia-400 rounded-full -mt-2 -mr-3"
            style={{ right: `${maxThumb}%` }}
          ></div>
        </div>
      </div>

      <div className="flex justify-between items-center pt-5">
        <div className="text-white">{minPrice}</div>
        <div className="text-white">{maxPrice}</div>
      </div>
    </div>
  );
};

export default PriceSlider;
