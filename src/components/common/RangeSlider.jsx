import React, { useState, useEffect } from "react";

const DualRangeSlider = ({
  min,
  max,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
}) => {
  const [minThumb, setMinThumb] = useState(0);
  const [maxThumb, setMaxThumb] = useState(0);

  const minTrigger = (val) => {
    const newMinPrice = Math.min(val, maxPrice - 1);
    const newMinThumb = ((newMinPrice - min) / (max - min)) * 100;
    setMinThumb(newMinThumb);
    setMinPrice(newMinPrice);
  };

  const maxTrigger = (val) => {
    const newMaxPrice = Math.max(val, minPrice + 1);
    const newMaxThumb = ((max - newMaxPrice) / (max - min)) * 100;
    setMaxThumb(newMaxThumb);
    setMaxPrice(newMaxPrice);
  };

  useEffect(() => {
    minTrigger(min);
    maxTrigger(max);
  }, [min, max]);

  return (
    <div className="mt-4 mb-2 relative max-w-xl w-full">
      <div>
        <input
          type="range"
          step="1"
          min={min} // Assuming `min` is a state or prop in your component
          max={max} // Assuming `max` is a state or prop in your component
          onChange={(e) => minTrigger(parseInt(e.target.value))} // Assuming you have a `setMinPrice` function to update the state
          value={minPrice} // Assuming `minPrice` is a state in your component
          className="absolute pointer-events-none appearance-none z-20 h-2 w-full opacity-0 cursor-pointer"
        />

        <input
          type="range"
          step="1"
          min={min} // Assuming `min` is a state or prop in your component
          max={max} // Assuming `max` is a state or prop in your component
          onChange={(e) => maxTrigger(parseInt(e.target.value))} // Assuming you have a `setMaxPrice` function to update the state
          value={maxPrice} // Assuming `maxPrice` is a state in your component
          className="absolute pointer-events-none appearance-none z-20 h-2 w-full opacity-0 cursor-pointer"
        />
        <div className="relative z-10 h-2">
          <div className="absolute z-10 left-0 right-0 bottom-0 top-0 rounded-md bg-gray-200"></div>
          <div
            className="absolute z-20 top-0 bottom-0 rounded-md bg-fuchsia-400"
            style={{ right: `${maxThumb}%`, left: `${minThumb}%` }}
          ></div>
          <div
            className="absolute z-30 w-6 h-6 top-0 left-0 bg-fuchsia-400 rounded-full -mt-2 -ml-1"
            style={{ left: `${minThumb}%` }}
          ></div>
          <div
            className="absolute z-30 w-6 h-6 top-0 right-0 bg-fuchsia-400 rounded-full -mt-2 -mr-3"
            style={{ right: `${maxThumb}%` }}
          ></div>
        </div>
      </div>
      <div className="flex justify-between items-center pt-5">
        <div className="text-white">{minPrice}</div>
        <div className="text-white">{maxPrice}</div>
        {/* <div>
          <input
            type="text"
            maxLength="2"
            onChange={(e) => {
              minTrigger(parseInt(e.target.value));
            }}
            value={minPrice}
            className="px-3 py-2 border text-black border-gray-200 rounded w-24 text-center"
          />
        </div>
        <div>
          <input
            type="text"
            maxLength="2"
            onChange={(e) => {
              maxTrigger(parseInt(e.target.value));
            }}
            value={maxPrice}
            className="px-3 py-2 border text-black border-gray-200 rounded w-24 text-center"
          />
        </div> */}
      </div>
    </div>
  );
};

export default DualRangeSlider;
