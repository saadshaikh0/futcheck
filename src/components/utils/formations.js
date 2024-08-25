const row0 = "0%";
const row1 = "10%";
const row2 = "20%";
const row3 = "30%";
const row4 = "40%";
const row5 = "50%";
const row6 = "60%";
const row7 = "70%";
const row8 = "80%";
const col0 = "5%";
const col1 = "15%";
const col2 = "25%";
const col3 = "35%";
const col4 = "45%";
const col5 = "55%";
const col6 = "65%";
const col7 = "75%";
const col8 = "85%";
const col9 = "95%";

export const FORMATIONS_POSITIONS_ABBR = {
  "3-1-4-2": [
    "GK",
    "CB",
    "CB",
    "CB",
    "CDM",
    "RM",
    "CM",
    "CM",
    "LM",
    "ST",
    "ST",
  ],
  "3-4-1-2": [
    "GK",
    "CB",
    "CB",
    "CB",
    "RM",
    "CM",
    "CM",
    "LM",
    "CAM",
    "ST",
    "ST",
  ],
  "3-4-2-1": ["GK", "CB", "CB", "CB", "RM", "CM", "CM", "LM", "CF", "CF", "ST"],
  "3-4-3": ["GK", "CB", "CB", "CB", "RM", "CM", "CM", "LM", "RW", "ST", "LW"],
  "3-5-2": [
    "GK",
    "CB",
    "CB",
    "CB",
    "CDM",
    "CDM",
    "RM",
    "LM",
    "CAM",
    "ST",
    "ST",
  ],
  "4-1-2-1-2": [
    "GK",
    "RB",
    "CB",
    "CB",
    "LB",
    "CDM",
    "RM",
    "LM",
    "CAM",
    "ST",
    "ST",
  ],
  "4-1-2-1-2a": [
    "GK",
    "RB",
    "CB",
    "CB",
    "LB",
    "CDM",
    "CM",
    "CM",
    "CAM",
    "ST",
    "ST",
  ],
  "4-1-3-2": [
    "GK",
    "RB",
    "CB",
    "CB",
    "LB",
    "CDM",
    "RM",
    "CM",
    "LM",
    "ST",
    "ST",
  ],
  "4-1-4-1": [
    "GK",
    "RB",
    "CB",
    "CB",
    "LB",
    "CDM",
    "RM",
    "CM",
    "CM",
    "LM",
    "ST",
  ],
  "4-2-1-3": [
    "GK",
    "RB",
    "CB",
    "CB",
    "LB",
    "CDM",
    "CDM",
    "CAM",
    "RW",
    "ST",
    "LW",
  ],
  "4-2-2-2": [
    "GK",
    "RB",
    "CB",
    "CB",
    "LB",
    "CDM",
    "CDM",
    "CAM",
    "CAM",
    "ST",
    "ST",
  ],
  "4-2-3-1": [
    "GK",
    "RB",
    "CB",
    "CB",
    "LB",
    "CDM",
    "CDM",
    "CAM",
    "CAM",
    "CAM",
    "ST",
  ],
  "4-2-3-1a": [
    "GK",
    "RB",
    "CB",
    "CB",
    "LB",
    "CDM",
    "CDM",
    "RM",
    "LM",
    "CAM",
    "ST",
  ],
  "4-2-4": ["GK", "RB", "CB", "CB", "LB", "RM", "CM", "CM", "RW", "ST", "LW"],
  "4-3-1-2": [
    "GK",
    "RB",
    "CB",
    "CB",
    "LB",
    "CM",
    "CM",
    "CM",
    "CAM",
    "ST",
    "ST",
  ],
  "4-3-2-1": ["GK", "RB", "CB", "CB", "LB", "CM", "CM", "CM", "CF", "CF", "ST"],
  "4-3-3": ["GK", "RB", "CB", "CB", "LB", "CM", "CM", "CM", "RW", "ST", "LW"],
  "4-3-3a": ["GK", "RB", "CB", "CB", "LB", "CDM", "CM", "CM", "RW", "ST", "LW"],
  "4-3-3b": [
    "GK",
    "RB",
    "CB",
    "CB",
    "LB",
    "CDM",
    "CDM",
    "CM",
    "RW",
    "ST",
    "LW",
  ],
  "4-3-3c": ["GK", "RB", "CB", "CB", "LB", "CM", "CM", "CAM", "RW", "ST", "LW"],
  "4-4-1-1": ["GK", "RB", "CB", "CB", "LB", "RM", "CM", "CM", "LM", "CF", "ST"],
  "4-4-1-1a": [
    "GK",
    "RB",
    "CB",
    "CB",
    "LB",
    "RM",
    "CM",
    "CM",
    "LM",
    "CAM",
    "ST",
  ],
  "4-4-2": ["GK", "RB", "CB", "CB", "LB", "RM", "CM", "CM", "LM", "ST", "ST"],
  "4-4-2a": [
    "GK",
    "RB",
    "CB",
    "CB",
    "LB",
    "RM",
    "CDM",
    "CDM",
    "LM",
    "ST",
    "ST",
  ],
  "4-5-1": [
    "GK",
    "RB",
    "CB",
    "CB",
    "LB",
    "RM",
    "CM",
    "CAM",
    "CAM",
    "CAM",
    "ST",
  ],
  "4-5-1a": ["GK", "RB", "CB", "CB", "LB", "RM", "CM", "CM", "CM", "LM", "ST"],
  "5-2-1-2": [
    "GK",
    "CB",
    "CB",
    "CB",
    "RWB",
    "LWB",
    "CM",
    "CM",
    "CAM",
    "ST",
    "ST",
  ],
  "5-2-2-1": [
    "GK",
    "CB",
    "CB",
    "CB",
    "RWB",
    "LWB",
    "CM",
    "CM",
    "RW",
    "ST",
    "LW",
  ],
  "5-2-3": ["GK", "CB", "CB", "CB", "RWB", "LWB", "CM", "CM", "RW", "ST", "LW"],
  "5-3-2": [
    "GK",
    "CB",
    "CB",
    "CB",
    "RWB",
    "LWB",
    "CDM",
    "CM",
    "CM",
    "ST",
    "ST",
  ],
  "5-4-1a": [
    "GK",
    "CB",
    "CB",
    "CB",
    "RWB",
    "LWB",
    "RM",
    "CM",
    "CM",
    "LM",
    "ST",
  ],
};

export const FORMATIONS_POSITIONS = {
  "3-1-4-2": [
    [col4, row0], // GK
    [col2, row2], // CB
    [col4, row2], // CB
    [col6, row2], // CB
    [col4, row4], // CDM
    [col1, row6], // RM
    [col3, row6], // CM
    [col5, row6], // CM
    [col7, row6], // LM
    [col3, row8], // ST
    [col5, row8], // ST
  ],
  "3-4-1-2": [
    [col4, row0], // GK
    [col2, row2], // CB
    [col4, row2], // CB
    [col6, row2], // CB
    [col7, row5], // RM
    [col3, row5], // CM
    [col5, row5], // CM
    [col1, row5], // LM
    [col4, row7], // CAM
    [col2, row8], // ST
    [col6, row8], // ST
  ],
  "3-4-2-1": [
    [col4, row0], // GK
    [col2, row2], // CB
    [col4, row2], // CB
    [col6, row2], // CB
    [col7, row5], // RM
    [col3, row5], // CM
    [col5, row5], // CM
    [col1, row5], // LM
    [col3, row7], // CF
    [col5, row7], // CF
    [col4, row8], // ST
  ],
  "3-4-3": [
    [col4, row0], // GK
    [col2, row2], // CB
    [col4, row2], // CB
    [col6, row2], // CB
    [col7, row5], // RM
    [col3, row4], // CM
    [col5, row4], // CM
    [col1, row5], // LM
    [col6, row7], // RW
    [col4, row8], // ST
    [col2, row7], // LW
  ],
  "3-5-2": [
    [col4, row0], // GK
    [col2, row2], // CB
    [col4, row2], // CB
    [col6, row2], // CB
    [col3, row4], // CDM
    [col5, row4], // CDM
    [col7, row5], // RM
    [col1, row5], // LM
    [col4, row6], // CAM
    [col3, row8], // ST
    [col5, row8], // ST
  ],
  "4-1-2-1-2": [
    [col4, row0], // GK
    [col7, row2], // RB
    [col3, row2], // CB
    [col5, row2], // CB
    [col1, row2], // LB
    [col4, row4], // CDM
    [col2, row5], // RM
    [col6, row5], // LM
    [col4, row6], // CAM
    [col3, row8], // ST
    [col5, row8], // ST
  ],
  "4-1-2-1-2a": [
    [col4, row0], // GK
    [col7, row2], // RB
    [col3, row2], // CB
    [col5, row2], // CB
    [col1, row2], // LB
    [col4, row4], // CDM
    [col2, row5], // CM
    [col6, row5], // CM
    [col4, row6], // CAM
    [col3, row8], // ST
    [col5, row8], // ST
  ],
  "4-1-3-2": [
    [col4, row0], // GK
    [col7, row2], // RB
    [col3, row2], // CB
    [col5, row2], // CB
    [col1, row2], // LB
    [col4, row4], // CDM
    [col2, row6], // RM
    [col4, row6], // CM
    [col6, row6], // LM
    [col3, row8], // ST
    [col5, row8], // ST
  ],
  "4-1-4-1": [
    [col4, row0], // GK
    [col7, row2], // RB
    [col3, row2], // CB
    [col5, row2], // CB
    [col1, row2], // LB
    [col4, row4], // CDM
    [col7, row6], // RM
    [col3, row6], // CM
    [col5, row6], // CM
    [col1, row6], // LM
    [col4, row8], // ST
  ],
  "4-2-1-3": [
    [col4, row0], // GK
    [col7, row2], // RB
    [col3, row2], // CB
    [col5, row2], // CB
    [col1, row2], // LB
    [col2, row4], // CDM
    [col6, row4], // CDM
    [col4, row5], // CAM
    [col6, row7], // RW
    [col4, row7], // ST
    [col2, row7], // LW
  ],
  "4-2-2-2": [
    [col4, row0], // GK
    [col7, row2], // RB
    [col3, row2], // CB
    [col5, row2], // CB
    [col1, row2], // LB
    [col3, row4], // CDM
    [col5, row4], // CDM
    [col2, row6], // CAM
    [col6, row6], // CAM
    [col3, row8], // ST
    [col5, row8], // ST
  ],
  "4-2-3-1": [
    [col4, row0], // GK
    [col7, row2], // RB
    [col3, row2], // CB
    [col5, row2], // CB
    [col1, row2], // LB
    [col3, row4], // CDM
    [col5, row4], // CDM
    [col2, row6], // CAM
    [col4, row6], // CAM
    [col6, row6], // CAM
    [col4, row8], // ST
  ],
  "4-2-3-1a": [
    [col4, row0], // GK
    [col7, row2], // RB
    [col3, row2], // CB
    [col5, row2], // CB
    [col1, row2], // LB
    [col3, row4], // CDM
    [col5, row4], // CDM
    [col1, row6], // RM
    [col7, row6], // LM
    [col4, row6], // CAM
    [col4, row8], // ST
  ],
  "4-2-4": [
    [col4, row0], // GK
    [col7, row2], // RB
    [col3, row2], // CB
    [col5, row2], // CB
    [col1, row2], // LB
    [col7, row5], // RM
    [col4, row5], // CM
    [col7, row5], // CM
    [col8, row5], // RW
    [col3, row8], // ST
    [col5, row8], // ST
  ],
  "4-3-1-2": [
    [col4, row0], // GK
    [col7, row2], // RB
    [col3, row2], // CB
    [col5, row2], // CB
    [col1, row2], // LB
    [col2, row5], // CM
    [col4, row5], // CM
    [col6, row5], // CM
    [col4, row6], // CAM
    [col3, row8], // ST
    [col5, row8], // ST
  ],
  "4-3-2-1": [
    [col4, row0], // GK
    [col7, row2], // RB
    [col3, row2], // CB
    [col5, row2], // CB
    [col1, row2], // LB
    [col2, row5], // CM
    [col4, row5], // CM
    [col6, row5], // CM
    [col2, row7], // CF
    [col6, row7], // CF
    [col4, row8], // ST
  ],
  "4-3-3": [
    [col4, row1], // GK
    [col7, row3], // RB
    [col3, row3], // CB
    [col5, row3], // CB
    [col1, row3], // LB
    [col2, row5], // CM
    [col4, row5], // CM
    [col6, row5], // CM
    [col6, row7], // RW
    [col4, row7], // ST
    [col2, row7], // LW
  ],
  "4-3-3a": [
    [col4, row0], // GK
    [col7, row2], // RB
    [col3, row2], // CB
    [col5, row2], // CB
    [col1, row2], // LB
    [col2, row5], // CDM
    [col4, row5], // CM
    [col6, row5], // CM
    [col6, row7], // RW
    [col4, row7], // ST
    [col2, row7], // LW
  ],
  "4-3-3b": [
    [col4, row0], // GK
    [col7, row2], // RB
    [col3, row2], // CB
    [col5, row2], // CB
    [col1, row2], // LB
    [col2, row5], // CDM
    [col6, row5], // CDM
    [col4, row5], // CM
    [col6, row7], // RW
    [col4, row7], // ST
    [col2, row7], // LW
  ],
  "4-3-3c": [
    [col4, row0], // GK
    [col7, row2], // RB
    [col3, row2], // CB
    [col5, row2], // CB
    [col1, row2], // LB
    [col2, row5], // CM
    [col4, row5], // CM
    [col6, row5], // CAM
    [col6, row7], // RW
    [col4, row7], // ST
    [col2, row7], // LW
  ],
  "4-4-1-1": [
    [col4, row0], // GK
    [col7, row2], // RB
    [col3, row2], // CB
    [col5, row2], // CB
    [col1, row2], // LB
    [col7, row5], // RM
    [col3, row5], // CM
    [col5, row5], // CM
    [col1, row5], // LM
    [col4, row6], // CF
    [col4, row8], // ST
  ],
  "4-4-1-1a": [
    [col4, row0], // GK
    [col7, row2], // RB
    [col3, row2], // CB
    [col5, row2], // CB
    [col1, row2], // LB
    [col7, row5], // RM
    [col3, row5], // CM
    [col5, row5], // CM
    [col1, row5], // LM
    [col4, row6], // CAM
    [col4, row8], // ST
  ],
  "4-4-2": [
    [col4, row0], // GK
    [col7, row2], // RB
    [col3, row2], // CB
    [col5, row2], // CB
    [col1, row2], // LB
    [col7, row5], // RM
    [col3, row5], // CM
    [col5, row5], // CM
    [col1, row5], // LM
    [col3, row8], // ST
    [col5, row8], // ST
  ],
  "4-4-2a": [
    [col4, row0], // GK
    [col7, row2], // RB
    [col3, row2], // CB
    [col5, row2], // CB
    [col1, row2], // LB
    [col7, row5], // RM
    [col3, row4], // CM
    [col5, row4], // CM
    [col1, row5], // LM
    [col3, row8], // ST
    [col5, row8], // ST
  ],
  "4-5-1": [
    [col4, row0], // GK
    [col7, row2], // RB
    [col3, row2], // CB
    [col5, row2], // CB
    [col1, row2], // LB
    [col7, row5], // RM
    [col4, row5], // CM
    [col2, row7], // CAM
    [col6, row7], // CAM
    [col1, row5], // LM
    [col4, row8], // ST
  ],
  "4-5-1a": [
    [col4, row0], // GK
    [col7, row2], // RB
    [col3, row2], // CB
    [col5, row2], // CB
    [col1, row2], // LB
    [col7, row5], // RM
    [col3, row5], // CM
    [col5, row5], // CM
    [col1, row5], // LM
    [col4, row8], // ST
  ],
  "5-2-1-2": [
    [col4, row0], // GK
    [col1, row2], // CB
    [col3, row2], // CB
    [col5, row2], // CB
    [col7, row2], // RB
    [col1, row4], // LB
    [col2, row6], // CM
    [col6, row6], // CM
    [col4, row7], // CAM
    [col3, row8], // ST
    [col5, row8], // ST
  ],
  "5-2-2-1": [
    [col4, row0], // GK
    [col1, row2], // CB
    [col3, row2], // CB
    [col5, row2], // CB
    [col7, row2], // RB
    [col1, row4], // LB
    [col2, row6], // CM
    [col6, row6], // CM
    [col6, row7], // RW
    [col4, row7], // ST
    [col2, row7], // LW
  ],
  "5-2-3": [
    [col4, row0], // GK
    [col1, row2], // CB
    [col3, row2], // CB
    [col5, row2], // CB
    [col7, row2], // RB
    [col1, row4], // LB
    [col2, row6], // CM
    [col6, row6], // CM
    [col6, row7], // RW
    [col4, row7], // ST
    [col2, row7], // LW
  ],
  "5-3-2": [
    [col4, row1], // GK
    [col0, row3], // CB
    [col2, row3], // CB
    [col4, row3], // CB
    [col6, row3], // RB
    [col8, row3], // LB
    [col2, row5], // CDM
    [col4, row5], // CM
    [col6, row5], // CM
    [col3, row7], // ST
    [col5, row7], // ST
  ],
  "5-4-1a": [
    [col4, row1], // GK
    [col0, row3], // CB
    [col2, row3], // CB
    [col4, row3], // CB
    [col6, row3], // RB
    [col8, row3], // LB
    [col7, row5], // RM
    [col3, row5], // CM
    [col5, row5], // CM
    [col1, row5], // LM
    [col4, row7], // ST
  ],
};
