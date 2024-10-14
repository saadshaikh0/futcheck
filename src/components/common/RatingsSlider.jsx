import React from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const RatingSlider = ({ min, max, value, onChange }) => {
  return (
    <div className="rating-slider w-full px-4 relative">
      <Slider
        min={min}
        max={max}
        value={value}
        onChange={onChange}
        marks={{
          81: "81",
          83: "83",
          85: "85",
          87: "87",
          89: "89",
          91: "91",
        }}
        step={1}
        className="rc-slider"
        dotStyle={{ display: "none" }}
        activeDotStyle={{ display: "none" }}
      />
      <style jsx global>{`
        .rc-slider {
          height: 8px;
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
          height: 28px;
          width: 28px;
          margin-left: -14px;
          margin-top: -10px;
          background-color: black;
        }
      `}</style>
    </div>
  );
};

export default RatingSlider;
