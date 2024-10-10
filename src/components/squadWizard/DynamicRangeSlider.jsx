import React from "react";

const DynamicRangeSlider = ({ value, onChange }) => {
  const min = 0;
  const max = 15000000;

  const handleSliderChange = (event) => {
    const sliderValue = parseFloat(event.target.value);
    let actualValue;

    // Map sliderValue to actualValue for more refined control
    if (sliderValue < 25) {
      // Map the first 25% of the slider (0-25) to 0-100,000
      actualValue = (sliderValue / 25) * 100000;
    } else if (sliderValue < 50) {
      // Map the next 25% of the slider (25-50) to 100,000-1,000,000
      actualValue = 100000 + ((sliderValue - 25) / 25) * 900000;
    } else {
      // Map the remaining 50% of the slider (50-100) to 1,000,000-15,000,000
      actualValue = 1000000 + ((sliderValue - 50) / 50) * (max - 1000000);
    }

    onChange({ target: { value: actualValue } });
  };

  const getSliderValue = (value) => {
    // Map actual value back to slider position
    if (value < 100000) {
      return (value / 100000) * 25;
    } else if (value < 1000000) {
      return 25 + ((value - 100000) / 900000) * 25;
    } else {
      return 50 + ((value - 1000000) / (max - 1000000)) * 50;
    }
  };

  return (
    <input
      type="range"
      min={0}
      max={100} // Slider now goes from 0-100
      step={0.1} // Small steps for smoother control
      value={getSliderValue(value)}
      onChange={handleSliderChange}
      className="w-full"
    />
  );
};

export default DynamicRangeSlider;
