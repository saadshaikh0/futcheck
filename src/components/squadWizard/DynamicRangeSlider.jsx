import React from "react";

const DynamicRangeSlider = ({ value, onChange, max = 100000000 }) => {
  // Base segments defined relative to a base max of 100,000,000.
  // Each segment has a slider portion (startPct to endPct) and a value range.
  const baseSegments = [
    { startPct: 0.0, endPct: 0.1, minValue: 0, maxValue: 500000 },
    { startPct: 0.1, endPct: 0.2, minValue: 500000, maxValue: 1000000 },
    { startPct: 0.2, endPct: 0.3, minValue: 1000000, maxValue: 5000000 },
    { startPct: 0.3, endPct: 0.4, minValue: 5000000, maxValue: 10000000 },
    { startPct: 0.4, endPct: 0.5, minValue: 10000000, maxValue: 30000000 },
    { startPct: 0.5, endPct: 0.6, minValue: 30000000, maxValue: 50000000 },
    { startPct: 0.6, endPct: 0.8, minValue: 50000000, maxValue: 70000000 },
    { startPct: 0.8, endPct: 1.0, minValue: 70000000, maxValue: 100000000 },
  ];

  // Build the actual segments by scaling the min and max values
  // from the blueprint (which uses 100,000,000 as max) to the passed max.
  // This way, each segment’s range becomes dynamic.
  const segments = [];
  for (let i = 0; i < baseSegments.length; i++) {
    const seg = baseSegments[i];
    // Scale the base min and max to the current max.
    const scaledMin = (seg.minValue / 100000000) * max;
    const scaledMax = (seg.maxValue / 100000000) * max;

    // If this segment starts at or beyond the current max, we stop.
    if (scaledMin >= max) break;

    // If the segment’s scaled maximum exceeds our current max,
    // adjust the slider fraction (endPct) proportionally so that it ends exactly at max.
    if (scaledMax > max) {
      const segValueRange = scaledMax - scaledMin;
      const fraction = (max - scaledMin) / segValueRange;
      const adjustedEnd = seg.startPct + fraction * (seg.endPct - seg.startPct);
      segments.push({
        startPct: seg.startPct,
        endPct: adjustedEnd,
        minValue: scaledMin,
        maxValue: max,
      });
      break;
    }

    // Otherwise, push the fully scaled segment.
    segments.push({
      startPct: seg.startPct,
      endPct: seg.endPct,
      minValue: scaledMin,
      maxValue: scaledMax,
    });
  }

  // Given a slider fraction (0 to 1) find the corresponding actual value.
  const getActualValueFromFraction = (f) => {
    // Find which segment the fraction falls into.
    const segment =
      segments.find((s) => f >= s.startPct && f <= s.endPct) ||
      segments[segments.length - 1];

    const segmentRange = segment.endPct - segment.startPct;
    const fractionInSegment = (f - segment.startPct) / segmentRange;
    return (
      segment.minValue +
      fractionInSegment * (segment.maxValue - segment.minValue)
    );
  };

  // When the slider changes, convert the slider’s percentage to the actual value.
  const handleSliderChange = (event) => {
    const sliderFraction = parseFloat(event.target.value) / 100;
    const actualValue = getActualValueFromFraction(sliderFraction);
    onChange({ target: { value: actualValue } });
  };

  // Convert an actual value back into a slider percentage (0–100).
  const getSliderValue = (val) => {
    for (let s of segments) {
      if (val >= s.minValue && val <= s.maxValue) {
        const valueRange = s.maxValue - s.minValue;
        const fractionInSegment = (val - s.minValue) / valueRange;
        const combinedFraction =
          s.startPct + fractionInSegment * (s.endPct - s.startPct);
        return combinedFraction * 100;
      }
    }
    // If the value exceeds the highest segment, return 100; otherwise 0.
    return val > segments[segments.length - 1].maxValue ? 100 : 0;
  };

  return (
    <input
      type="range"
      min={0}
      max={100}
      step={0.1}
      value={getSliderValue(value)}
      onChange={handleSliderChange}
      className="w-full"
    />
  );
};

export default DynamicRangeSlider;
