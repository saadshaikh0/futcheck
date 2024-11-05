import React from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const PriceSlider = ({ min, max, value, onChange }) => {
  return (
    <div className="rating-slider w-full px-4 relative">
      <Slider
        min={min}
        max={max}
        value={value}
        onChange={onChange}
        step={1}
        className="rc-slider"
        dotStyle={{ display: "none" }}
        activeDotStyle={{ display: "none" }}
      />
      <style jsx global>{`
        .rc-slider {
          height: 8px;
          margin-left:-10px;
          margin-top:5px;
          padding-right:10px;
        }
        .rc-slider-rail {
          background-color: gray;
          height: 8px;
        }
        .rc-slider-track {
          background-color: rgb(192 38 211);
          height: 8px;
        }
        .rc-slider-handle {
          border-color: rgb(192 38 211);
          height: 20px;
          width: 20px;
          margin-left: 2px;
          margin-top: -6px;
          background-color: black;
        }
      `}</style>
    </div>
  );
};

export default PriceSlider;
