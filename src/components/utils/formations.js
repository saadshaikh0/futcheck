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

const small_row0 = "0%";
const small_row1 = "10%";
const small_row2 = "20%";
const small_row3 = "30%";
const small_row4 = "40%";
const small_row5 = "50%";
const small_row6 = "60%";
const small_row7 = "70%";
const small_row8 = "80%";
const small_col0 = "0%";
const small_col1 = "5%";
const small_col2 = "10%";
const small_col3 = "26%";
const small_col4 = "36%";
const small_col5 = "46%";
const small_col6 = "66%";
const small_col7 = "65%";
const small_col8 = "75%";
const small_col9 = "85%";

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
    "RB",
    "LB",
    "CM",
    "CM",
    "CAM",
    "ST",
    "ST",
  ],
  "5-2-2-1": ["GK", "CB", "CB", "CB", "RB", "LB", "CM", "CM", "RW", "ST", "LW"],
  "5-2-3": ["GK", "LB", "CB", "CB", "CB", "RB", "CM", "CM", "RW", "ST", "LW"],
  "5-3-2": ["GK", "CB", "CB", "CB", "RB", "LB", "CDM", "CM", "CM", "ST", "ST"],
  "5-4-1a": ["GK", "CB", "CB", "CB", "RB", "LB", "RM", "CM", "CM", "LM", "ST"],
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
    [col7, row7], // RM
    [col4, row5], // CM
    [col6, row5], // CM
    [col2, row5], // CM
    [col1, row7], // LM
    [col4, row8], // ST
  ],
  "5-2-1-2": [
    [col4, row0], // GK
    [col2, row2], // CB
    [col4, row2], // CB
    [col6, row2], // CB
    [col8, row4], // RB
    [col0, row4], // LB
    [col2, row6], // CM
    [col6, row6], // CM
    [col4, row6], // CAM
    [col3, row8], // ST
    [col5, row8], // ST
  ],
  "5-2-2-1": [
    [col4, row0], // GK
    [col2, row2], // CB
    [col4, row2], // CB
    [col6, row2], // CB
    [col8, row2], // RB
    [col0, row4], // LB
    [col2, row6], // CM
    [col6, row6], // CM
    [col6, row7], // RW
    [col4, row7], // ST
    [col2, row7], // LW
  ],
  "5-2-3": [
    [col4, row0], // GK
    [col0, row3], // LB
    [col2, row2], // CB
    [col4, row2], // CB
    [col6, row2], // CB
    [col8, row3], // RB
    [col2, row4], // CM
    [col6, row4], // CM
    [col6, row6], // RW
    [col4, row7], // ST
    [col2, row6], // LW
  ],
  "5-3-2": [
    [col4, row1], // GK
    [col2, row3], // CB
    [col4, row3], // CB
    [col6, row3], // CB
    [col8, row3], // RB
    [col0, row3], // LB
    [col2, row5], // CDM
    [col4, row5], // CM
    [col6, row5], // CM
    [col3, row7], // ST
    [col5, row7], // ST
  ],
  "5-4-1a": [
    [col4, row1], // GK
    [col2, row3], // CB
    [col4, row3], // CB
    [col6, row3], // CB
    [col8, row3], // RB
    [col0, row3], // LB
    [col7, row5], // RM
    [col3, row5], // CM
    [col5, row5], // CM
    [col1, row5], // LM
    [col4, row7], // ST
  ],
};

export const FORMATIONS_POSITIONS_SMALL = {
  "3-1-4-2": [
    [small_col4, small_row0], // GK
    [small_col2, small_row2], // CB
    [small_col4, small_row2], // CB
    [small_col6, small_row2], // CB
    [small_col4, small_row4], // CDM
    [small_col1, small_row6], // RM
    [small_col3, small_row6], // CM
    [small_col5, small_row6], // CM
    [small_col7, small_row6], // LM
    [small_col3, small_row8], // ST
    [small_col5, small_row8], // ST
  ],
  "3-4-1-2": [
    [small_col4, small_row0], // GK
    [small_col2, small_row2], // CB
    [small_col4, small_row2], // CB
    [small_col6, small_row2], // CB
    [small_col7, small_row5], // RM
    [small_col3, small_row5], // CM
    [small_col5, small_row5], // CM
    [small_col1, small_row5], // LM
    [small_col4, small_row7], // CAM
    [small_col2, small_row8], // ST
    [small_col6, small_row8], // ST
  ],
  "3-4-2-1": [
    [small_col4, small_row0], // GK
    [small_col2, small_row2], // CB
    [small_col4, small_row2], // CB
    [small_col6, small_row2], // CB
    [small_col7, small_row5], // RM
    [small_col3, small_row5], // CM
    [small_col5, small_row5], // CM
    [small_col1, small_row5], // LM
    [small_col3, small_row7], // CF
    [small_col5, small_row7], // CF
    [small_col4, small_row8], // ST
  ],
  "3-4-3": [
    [small_col4, small_row0], // GK
    [small_col2, small_row2], // CB
    [small_col4, small_row2], // CB
    [small_col6, small_row2], // CB
    [small_col7, small_row5], // RM
    [small_col3, small_row4], // CM
    [small_col5, small_row4], // CM
    [small_col1, small_row5], // LM
    [small_col6, small_row7], // RW
    [small_col4, small_row8], // ST
    [small_col2, small_row7], // LW
  ],
  "3-5-2": [
    [small_col4, small_row0], // GK
    [small_col2, small_row2], // CB
    [small_col4, small_row2], // CB
    [small_col6, small_row2], // CB
    [small_col3, small_row4], // CDM
    [small_col5, small_row4], // CDM
    [small_col7, small_row5], // RM
    [small_col1, small_row5], // LM
    [small_col4, small_row6], // CAM
    [small_col3, small_row8], // ST
    [small_col5, small_row8], // ST
  ],
  "4-1-2-1-2": [
    [small_col4, small_row0], // GK
    [small_col7, small_row2], // RB
    [small_col3, small_row2], // CB
    [small_col5, small_row2], // CB
    [small_col1, small_row2], // LB
    [small_col4, small_row4], // CDM
    [small_col2, small_row5], // RM
    [small_col6, small_row5], // LM
    [small_col4, small_row6], // CAM
    [small_col3, small_row8], // ST
    [small_col5, small_row8], // ST
  ],
  "4-1-2-1-2a": [
    [small_col4, small_row0], // GK
    [small_col7, small_row2], // RB
    [small_col3, small_row2], // CB
    [small_col5, small_row2], // CB
    [small_col1, small_row2], // LB
    [small_col4, small_row4], // CDM
    [small_col2, small_row5], // CM
    [small_col6, small_row5], // CM
    [small_col4, small_row6], // CAM
    [small_col3, small_row8], // ST
    [small_col5, small_row8], // ST
  ],
  "4-1-3-2": [
    [small_col4, small_row0], // GK
    [small_col7, small_row2], // RB
    [small_col3, small_row2], // CB
    [small_col5, small_row2], // CB
    [small_col1, small_row2], // LB
    [small_col4, small_row4], // CDM
    [small_col2, small_row6], // RM
    [small_col4, small_row6], // CM
    [small_col6, small_row6], // LM
    [small_col3, small_row8], // ST
    [small_col5, small_row8], // ST
  ],
  "4-1-4-1": [
    [small_col4, small_row0], // GK
    [small_col7, small_row2], // RB
    [small_col3, small_row2], // CB
    [small_col5, small_row2], // CB
    [small_col1, small_row2], // LB
    [small_col4, small_row4], // CDM
    [small_col7, small_row6], // RM
    [small_col3, small_row6], // CM
    [small_col5, small_row6], // CM
    [small_col1, small_row6], // LM
    [small_col4, small_row8], // ST
  ],
  "4-2-1-3": [
    [small_col4, small_row0], // GK
    [small_col7, small_row2], // RB
    [small_col3, small_row2], // CB
    [small_col5, small_row2], // CB
    [small_col1, small_row2], // LB
    [small_col2, small_row4], // CDM
    [small_col6, small_row4], // CDM
    [small_col4, small_row5], // CAM
    [small_col6, small_row7], // RW
    [small_col4, small_row7], // ST
    [small_col2, small_row7], // LW
  ],
  "4-2-2-2": [
    [small_col4, small_row0], // GK
    [small_col7, small_row2], // RB
    [small_col3, small_row2], // CB
    [small_col5, small_row2], // CB
    [small_col1, small_row2], // LB
    [small_col3, small_row4], // CDM
    [small_col5, small_row4], // CDM
    [small_col2, small_row6], // CAM
    [small_col6, small_row6], // CAM
    [small_col3, small_row8], // ST
    [small_col5, small_row8], // ST
  ],
  "4-2-3-1": [
    [small_col4, small_row0], // GK
    [small_col7, small_row2], // RB
    [small_col3, small_row2], // CB
    [small_col5, small_row2], // CB
    [small_col1, small_row2], // LB
    [small_col3, small_row4], // CDM
    [small_col5, small_row4], // CDM
    [small_col2, small_row6], // CAM
    [small_col4, small_row6], // CAM
    [small_col6, small_row6], // CAM
    [small_col4, small_row8], // ST
  ],
  "4-2-3-1a": [
    [small_col4, small_row0], // GK
    [small_col7, small_row2], // RB
    [small_col3, small_row2], // CB
    [small_col5, small_row2], // CB
    [small_col1, small_row2], // LB
    [small_col3, small_row4], // CDM
    [small_col5, small_row4], // CDM
    [small_col1, small_row6], // RM
    [small_col7, small_row6], // LM
    [small_col4, small_row6], // CAM
    [small_col4, small_row8], // ST
  ],
  "4-2-4": [
    [small_col4, small_row0], // GK
    [small_col7, small_row2], // RB
    [small_col3, small_row2], // CB
    [small_col5, small_row2], // CB
    [small_col1, small_row2], // LB
    [small_col7, small_row5], // RM
    [small_col4, small_row5], // CM
    [small_col7, small_row5], // CM
    [small_col8, small_row5], // RW
    [small_col3, small_row8], // ST
    [small_col5, small_row8], // ST
  ],
  "4-3-1-2": [
    [small_col4, small_row0], // GK
    [small_col7, small_row2], // RB
    [small_col3, small_row2], // CB
    [small_col5, small_row2], // CB
    [small_col1, small_row2], // LB
    [small_col2, small_row5], // CM
    [small_col4, small_row5], // CM
    [small_col6, small_row5], // CM
    [small_col4, small_row6], // CAM
    [small_col3, small_row8], // ST
    [small_col5, small_row8], // ST
  ],
  "4-3-2-1": [
    [small_col4, small_row0], // GK
    [small_col7, small_row2], // RB
    [small_col3, small_row2], // CB
    [small_col5, small_row2], // CB
    [small_col1, small_row2], // LB
    [small_col2, small_row5], // CM
    [small_col4, small_row5], // CM
    [small_col6, small_row5], // CM
    [small_col2, small_row7], // CF
    [small_col6, small_row7], // CF
    [small_col4, small_row8], // ST
  ],
  "4-3-3": [
    [small_col4, small_row1], // GK
    [small_col7, small_row3], // RB
    [small_col3, small_row3], // CB
    [small_col5, small_row3], // CB
    [small_col1, small_row3], // LB
    [small_col2, small_row5], // CM
    [small_col4, small_row5], // CM
    [small_col6, small_row5], // CM
    [small_col6, small_row7], // RW
    [small_col4, small_row7], // ST
    [small_col2, small_row7], // LW
  ],
  "4-3-3a": [
    [small_col4, small_row0], // GK
    [small_col7, small_row2], // RB
    [small_col3, small_row2], // CB
    [small_col5, small_row2], // CB
    [small_col1, small_row2], // LB
    [small_col2, small_row5], // CDM
    [small_col4, small_row5], // CM
    [small_col6, small_row5], // CM
    [small_col6, small_row7], // RW
    [small_col4, small_row7], // ST
    [small_col2, small_row7], // LW
  ],
  "4-3-3b": [
    [small_col4, small_row0], // GK
    [small_col7, small_row2], // RB
    [small_col3, small_row2], // CB
    [small_col5, small_row2], // CB
    [small_col1, small_row2], // LB
    [small_col2, small_row5], // CDM
    [small_col6, small_row5], // CDM
    [small_col4, small_row5], // CM
    [small_col6, small_row7], // RW
    [small_col4, small_row7], // ST
    [small_col2, small_row7], // LW
  ],
  "4-3-3c": [
    [small_col4, small_row0], // GK
    [small_col7, small_row2], // RB
    [small_col3, small_row2], // CB
    [small_col5, small_row2], // CB
    [small_col1, small_row2], // LB
    [small_col2, small_row5], // CM
    [small_col4, small_row5], // CM
    [small_col6, small_row5], // CAM
    [small_col6, small_row7], // RW
    [small_col4, small_row7], // ST
    [small_col2, small_row7], // LW
  ],
  "4-4-1-1": [
    [small_col4, small_row0], // GK
    [small_col7, small_row2], // RB
    [small_col3, small_row2], // CB
    [small_col5, small_row2], // CB
    [small_col1, small_row2], // LB
    [small_col7, small_row5], // RM
    [small_col3, small_row5], // CM
    [small_col5, small_row5], // CM
    [small_col1, small_row5], // LM
    [small_col4, small_row6], // CF
    [small_col4, small_row8], // ST
  ],
  "4-4-1-1a": [
    [small_col4, small_row0], // GK
    [small_col7, small_row2], // RB
    [small_col3, small_row2], // CB
    [small_col5, small_row2], // CB
    [small_col1, small_row2], // LB
    [small_col7, small_row5], // RM
    [small_col3, small_row5], // CM
    [small_col5, small_row5], // CM
    [small_col1, small_row5], // LM
    [small_col4, small_row6], // CAM
    [small_col4, small_row8], // ST
  ],
  "4-4-2": [
    [small_col4, small_row0], // GK
    [small_col7, small_row2], // RB
    [small_col3, small_row2], // CB
    [small_col5, small_row2], // CB
    [small_col1, small_row2], // LB
    [small_col7, small_row5], // RM
    [small_col3, small_row5], // CM
    [small_col5, small_row5], // CM
    [small_col1, small_row5], // LM
    [small_col3, small_row8], // ST
    [small_col5, small_row8], // ST
  ],
  "4-4-2a": [
    [small_col4, small_row0], // GK
    [small_col7, small_row2], // RB
    [small_col3, small_row2], // CB
    [small_col5, small_row2], // CB
    [small_col1, small_row2], // LB
    [small_col7, small_row5], // RM
    [small_col3, small_row4], // CM
    [small_col5, small_row4], // CM
    [small_col1, small_row5], // LM
    [small_col3, small_row8], // ST
    [small_col5, small_row8], // ST
  ],
  "4-5-1": [
    [small_col4, small_row0], // GK
    [small_col7, small_row2], // RB
    [small_col3, small_row2], // CB
    [small_col5, small_row2], // CB
    [small_col1, small_row2], // LB
    [small_col7, small_row5], // RM
    [small_col4, small_row5], // CM
    [small_col2, small_row7], // CAM
    [small_col6, small_row7], // CAM
    [small_col1, small_row5], // LM
    [small_col4, small_row8], // ST
  ],
  "4-5-1a": [
    [small_col4, small_row0], // GK
    [small_col7, small_row2], // RB
    [small_col3, small_row2], // CB
    [small_col5, small_row2], // CB
    [small_col1, small_row2], // LB
    [small_col7, small_row5], // RM
    [small_col3, small_row5], // CM
    [small_col3, small_row5],
    [small_col5, small_row5], // CM
    [small_col1, small_row5], // LM
    [small_col4, small_row8], // ST
  ],
  "5-2-1-2": [
    [small_col4, small_row0], // GK
    [small_col2, small_row2], // CB
    [small_col4, small_row2], // CB
    [small_col6, small_row2], // CB
    [small_col8, small_row2], // RB
    [small_col0, small_row4], // LB
    [small_col2, small_row6], // CM
    [small_col6, small_row6], // CM
    [small_col4, small_row7], // CAM
    [small_col3, small_row8], // ST
    [small_col5, small_row8], // ST
  ],
  "5-2-2-1": [
    [small_col4, small_row0], // GK
    [small_col2, small_row2], // CB
    [small_col4, small_row2], // CB
    [small_col6, small_row2], // CB
    [small_col8, small_row2], // RB
    [small_col0, small_row4], // LB
    [small_col2, small_row6], // CM
    [small_col6, small_row6], // CM
    [small_col6, small_row7], // RW
    [small_col4, small_row7], // ST
    [small_col2, small_row7], // LW
  ],
  "5-2-3": [
    [small_col5, small_row0], // GK
    [small_col3, small_row2], // CB
    [small_col5, small_row2], // CB
    [small_col7, small_row2], // CB
    [small_col9, small_row3], // RB
    [small_col1, small_row3], // LB
    [small_col3, small_row5], // CM
    [small_col6, small_row5], // CM
    [small_col7, small_row7], // RW
    [small_col5, small_row8], // ST
    [small_col3, small_row7], // LW
  ],
  "5-3-2": [
    [small_col4, small_row1], // GK
    [small_col3, small_row3], // CB
    [small_col5, small_row3], // CB
    [small_col6, small_row3], // CB
    [small_col9, small_row3], // RB
    [small_col1, small_row3], // LB
    [small_col3, small_row5], // CDM
    [small_col5, small_row5], // CM
    [small_col7, small_row5], // CM
    [small_col3, small_row7], // ST
    [small_col5, small_row7], // ST
  ],
  "5-4-1a": [
    [small_col4, small_row1], // GK
    [small_col2, small_row3], // CB
    [small_col4, small_row3], // CB
    [small_col6, small_row3], // CB
    [small_col8, small_row3], // RB
    [small_col0, small_row3], // LB
    [small_col7, small_row5], // RM
    [small_col3, small_row5], // CM
    [small_col5, small_row5], // CM
    [small_col1, small_row5], // LM
    [small_col4, small_row7], // ST
  ],
};

export const SQUAD_WIZARD_FORMATIONS = {
  "4-3-3": [
    {
      position: "GK",
      left: "50%",
      top: "87%",
      transform: "translate(-50%, -50%)",
    },
    { position: "LB", left: "10%", top: "60%" },
    { position: "CB", left: "30%", top: "60%" },
    { position: "CB", left: "60%", top: "60%" },
    { position: "RB", left: "80%", top: "60%" },
    { position: "CM", left: "20%", top: "35%" },
    {
      position: "CM",
      left: "50%",
      top: "45%",
      transform: "translate(-50%, -50%)",
    },
    { position: "CM", left: "65%", top: "35%" },
    { position: "LW", left: "15%", top: "15%" },
    {
      position: "ST",
      left: "50%",
      top: "15%",
      transform: "translate(-50%, -50%)",
    },
    { position: "RW", left: "65%", top: "15%" },
  ],
  "4-4-2": [
    {
      position: "GK",
      left: "50%",
      top: "87%",
      transform: "translate(-50%, -50%)",
    },
    { position: "RB", left: "80%", top: "60%" },
    { position: "CB", left: "30%", top: "60%" },
    { position: "CB", left: "60%", top: "60%" },
    { position: "LB", left: "10%", top: "60%" },
    { position: "RM", left: "70%", top: "30%" },
    { position: "CM", left: "30%", top: "30%" },
    { position: "CM", left: "50%", top: "30%" },
    { position: "LM", left: "10%", top: "30%" },
    { position: "ST", left: "30%", top: "5%" },
    { position: "ST", left: "60%", top: "5%" },
  ],
};
