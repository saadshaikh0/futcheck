// formationCoordinates.js

// Generate columns (left positions) from 0% to 95% in increments of 5%
const cols = {};
for (let i = 0; i < 20; i++) {
  cols[`col${i}`] = `${i * 5}%`;
}

// Generate rows (top positions) from 0% to 95% in increments of 5%
const rows = {};
for (let i = 0; i < 20; i++) {
  rows[`row${i}`] = `${i * 5}%`;
}

// Formation-specific coordinates for standard size
export const formationPositionCoordinates = {
  // 3-1-4-2 Formation
  f3142: [
    { left: cols.col8, top: rows.row15 }, // GK
    { left: cols.col3, top: rows.row11 }, // RCB
    { left: cols.col8, top: rows.row11 }, // CB
    { left: cols.col13, top: rows.row11 }, // LCB
    { left: cols.col8, top: rows.row7 }, // CDM
    { left: cols.col14, top: rows.row5 }, // RM
    { left: cols.col5, top: rows.row5 }, // RCM
    { left: cols.col11, top: rows.row5 }, // LCM
    { left: cols.col2, top: rows.row5 }, // LM
    { left: cols.col6, top: rows.row0 }, // RS
    { left: cols.col11, top: rows.row0 }, // LS
  ],
  // 3-4-1-2 Formation
  f3412: [
    { left: cols.col8, top: rows.row15 }, // GK
    { left: cols.col3, top: rows.row11 }, // RCB
    { left: cols.col8, top: rows.row11 }, // CB
    { left: cols.col13, top: rows.row11 }, // LCB
    // No LB in this formation
    { left: cols.col14, top: rows.row7 }, // RM
    { left: cols.col5, top: rows.row7 }, // RCM
    { left: cols.col11, top: rows.row7 }, // LCM
    { left: cols.col2, top: rows.row7 }, // LM
    { left: cols.col8, top: rows.row4 }, // CAM
    { left: cols.col6, top: rows.row0 }, // RS
    { left: cols.col11, top: rows.row0 }, // LS
  ],
  // 3-4-2-1 Formation
  f3421: [
    { left: cols.col8, top: rows.row15 }, // GK
    { left: cols.col3, top: rows.row11 }, // RCB
    { left: cols.col8, top: rows.row11 }, // CB
    { left: cols.col13, top: rows.row11 }, // LCB
    // No LB in this formation
    { left: cols.col14, top: rows.row6 }, // RM
    { left: cols.col6, top: rows.row6 }, // RCM
    { left: cols.col10, top: rows.row6 }, // LCM
    { left: cols.col2, top: rows.row6 }, // LM
    { left: cols.col5, top: rows.row2 }, // RF
    { left: cols.col11, top: rows.row2 }, // LF
    { left: cols.col8, top: rows.row0 }, // ST
  ],
  // 3-4-3 Formation
  f343: [
    { left: cols.col8, top: rows.row15 }, // GK
    { left: cols.col3, top: rows.row11 }, // RCB
    { left: cols.col8, top: rows.row11 }, // CB
    { left: cols.col13, top: rows.row11 }, // LCB
    // No LB in this formation
    { left: cols.col14, top: rows.row6 }, // RM
    { left: cols.col6, top: rows.row6 }, // RCM
    { left: cols.col10, top: rows.row6 }, // LCM
    { left: cols.col2, top: rows.row6 }, // LM
    { left: cols.col11, top: rows.row2 }, // RW
    { left: cols.col8, top: rows.row0 }, // ST
    { left: cols.col5, top: rows.row2 }, // LW
  ],
  // 3-5-2 Formation
  f352: [
    { left: cols.col8, top: rows.row15 }, // GK
    { left: cols.col3, top: rows.row11 }, // RCB
    { left: cols.col8, top: rows.row11 }, // CB
    { left: cols.col13, top: rows.row11 }, // LCB
    // No LB in this formation
    { left: cols.col6, top: rows.row7 }, // RDM
    { left: cols.col10, top: rows.row7 }, // LDM
    { left: cols.col14, top: rows.row6 }, // RM
    { left: cols.col2, top: rows.row6 }, // LM
    { left: cols.col8, top: rows.row3 }, // CAM
    { left: cols.col6, top: rows.row0 }, // RS
    { left: cols.col10, top: rows.row0 }, // LS
  ],
  // 4-1-2-1-2 Formation
  f41212: [
    { left: cols.col8, top: rows.row15 }, // GK
    { left: cols.col16, top: rows.row11 }, // RB
    { left: cols.col5, top: rows.row11 }, // RCB
    { left: cols.col11, top: rows.row11 }, // LCB
    { left: cols.col1, top: rows.row11 }, // LB
    { left: cols.col8, top: rows.row9 }, // CDM
    { left: cols.col13, top: rows.row6 }, // RCM
    { left: cols.col3, top: rows.row6 }, // LCM
    { left: cols.col8, top: rows.row3 }, // CAM
    { left: cols.col6, top: rows.row0 }, // RS
    { left: cols.col11, top: rows.row0 }, // LS
  ],
  // 4-1-2-1-2a Formation
  f41212a: [
    { left: cols.col8, top: rows.row15 }, // GK
    { left: cols.col16, top: rows.row11 }, // RB
    { left: cols.col5, top: rows.row11 }, // RCB
    { left: cols.col11, top: rows.row11 }, // LCB
    { left: cols.col1, top: rows.row11 }, // LB
    { left: cols.col8, top: rows.row9 }, // CDM
    { left: cols.col4, top: rows.row6 }, // RCM
    { left: cols.col12, top: rows.row6 }, // LCM
    { left: cols.col8, top: rows.row3 }, // CAM
    { left: cols.col6, top: rows.row0 }, // RS
    { left: cols.col11, top: rows.row0 }, // LS
  ],
  // 4-1-3-2 Formation
  f4132: [
    { left: cols.col8, top: rows.row15 }, // GK
    { left: cols.col16, top: rows.row11 }, // RB
    { left: cols.col5, top: rows.row11 }, // RCB
    { left: cols.col11, top: rows.row11 }, // LCB
    { left: cols.col1, top: rows.row11 }, // LB
    { left: cols.col8, top: rows.row9 }, // CDM
    { left: cols.col14, top: rows.row5 }, // RM
    { left: cols.col8, top: rows.row5 }, // CM
    { left: cols.col2, top: rows.row5 }, // LM
    { left: cols.col6, top: rows.row0 }, // RS
    { left: cols.col10, top: rows.row0 }, // LS
  ],
  // 4-1-4-1 Formation
  f4141: [
    { left: cols.col8, top: rows.row15 }, // GK
    { left: cols.col16, top: rows.row11 }, // RB
    { left: cols.col5, top: rows.row11 }, // RCB
    { left: cols.col11, top: rows.row11 }, // LCB
    { left: cols.col1, top: rows.row11 }, // LB
    { left: cols.col8, top: rows.row9 }, // CDM
    { left: cols.col14, top: rows.row5 }, // RM
    { left: cols.col6, top: rows.row5 }, // RCM
    { left: cols.col10, top: rows.row5 }, // LCM
    { left: cols.col2, top: rows.row5 }, // LM
    { left: cols.col8, top: rows.row0 }, // ST
  ],
  // 4-2-1-3 Formation
  f4213: [
    { left: cols.col8, top: rows.row15 }, // GK
    { left: cols.col16, top: rows.row11 }, // RB
    { left: cols.col5, top: rows.row11 }, // RCB
    { left: cols.col11, top: rows.row11 }, // LCB
    { left: cols.col1, top: rows.row11 }, // LB
    { left: cols.col6, top: rows.row7 }, // RDM
    { left: cols.col10, top: rows.row7 }, // LDM
    { left: cols.col8, top: rows.row4 }, // CAM
    { left: cols.col13, top: rows.row2 }, // RW
    { left: cols.col8, top: rows.row0 }, // ST
    { left: cols.col3, top: rows.row2 }, // LW
  ],
  // 4-2-2-2 Formation
  f4222: [
    { left: cols.col8, top: rows.row15 }, // GK
    { left: cols.col16, top: rows.row11 }, // RB
    { left: cols.col5, top: rows.row11 }, // RCB
    { left: cols.col11, top: rows.row11 }, // LCB
    { left: cols.col1, top: rows.row11 }, // LB
    { left: cols.col6, top: rows.row7 }, // RDM
    { left: cols.col10, top: rows.row7 }, // LDM
    { left: cols.col4, top: rows.row3 }, // RAM
    { left: cols.col12, top: rows.row3 }, // LAM
    { left: cols.col6, top: rows.row0 }, // RS
    { left: cols.col10, top: rows.row0 }, // LS
  ],
  // 4-2-3-1 Formation
  f4231: [
    { left: cols.col8, top: rows.row15 }, // GK
    { left: cols.col16, top: rows.row11 }, // RB
    { left: cols.col5, top: rows.row11 }, // RCB
    { left: cols.col11, top: rows.row11 }, // LCB
    { left: cols.col1, top: rows.row11 }, // LB
    { left: cols.col5, top: rows.row7 }, // RDM
    { left: cols.col11, top: rows.row7 }, // LDM
    { left: cols.col12, top: rows.row2 }, // RM
    { left: cols.col8, top: rows.row4 }, // CAM
    { left: cols.col4, top: rows.row2 }, // LM
    { left: cols.col8, top: rows.row0 }, // ST
  ],
  // 4-2-3-1a Formation
  f4231a: [
    { left: cols.col8, top: rows.row15 }, // GK
    { left: cols.col16, top: rows.row11 }, // RB
    { left: cols.col5, top: rows.row11 }, // RCB
    { left: cols.col11, top: rows.row11 }, // LCB
    { left: cols.col1, top: rows.row11 }, // LB
    { left: cols.col5, top: rows.row7 }, // RDM
    { left: cols.col11, top: rows.row7 }, // LDM
    { left: cols.col12, top: rows.row2 }, // RM
    { left: cols.col4, top: rows.row2 }, // LM
    { left: cols.col8, top: rows.row4 }, // CAM
    { left: cols.col8, top: rows.row0 }, // ST
  ],
  // 4-2-4 Formation
  f424: [
    { left: cols.col8, top: rows.row15 }, // GK
    { left: cols.col16, top: rows.row11 }, // RB
    { left: cols.col5, top: rows.row11 }, // RCB
    { left: cols.col11, top: rows.row11 }, // LCB
    { left: cols.col1, top: rows.row11 }, // LB
    { left: cols.col6, top: rows.row7 }, // RCM
    { left: cols.col10, top: rows.row7 }, // LCM
    { left: cols.col13, top: rows.row4 }, // RW
    { left: cols.col6, top: rows.row0 }, // RS
    { left: cols.col10, top: rows.row0 }, // LS

    { left: cols.col3, top: rows.row4 }, //LW
  ],

  // 4-3-1-2 Formation
  f4312: [
    { left: cols.col8, top: rows.row15 }, // GK
    { left: cols.col16, top: rows.row11 }, // RB
    { left: cols.col5, top: rows.row11 }, // RCB
    { left: cols.col11, top: rows.row11 }, // LCB
    { left: cols.col1, top: rows.row11 }, // LB
    // No CDM in this formation
    { left: cols.col4, top: rows.row6 }, // RCM
    { left: cols.col8, top: rows.row6 }, // CM
    { left: cols.col12, top: rows.row6 }, // LCM
    { left: cols.col8, top: rows.row2 }, // CAM
    { left: cols.col6, top: rows.row0 }, // RS
    { left: cols.col10, top: rows.row0 }, // LS
  ],
  // 4-3-2-1 Formation
  f4321: [
    { left: cols.col8, top: rows.row15 }, // GK
    { left: cols.col16, top: rows.row11 }, // RB
    { left: cols.col5, top: rows.row11 }, // RCB
    { left: cols.col11, top: rows.row11 }, // LCB
    { left: cols.col1, top: rows.row11 }, // LB
    // No CDM in this formation
    { left: cols.col4, top: rows.row6 }, // RCM
    { left: cols.col8, top: rows.row6 }, // CM
    { left: cols.col12, top: rows.row6 }, // LCM
    { left: cols.col6, top: rows.row2 }, // RF
    { left: cols.col10, top: rows.row2 }, // LF
    { left: cols.col8, top: rows.row0 }, // ST
  ],
  // 4-3-3 Formation
  f433: [
    { left: cols.col8, top: rows.row15 }, // GK
    { left: cols.col16, top: rows.row11 }, // RB
    { left: cols.col5, top: rows.row11 }, // RCB
    { left: cols.col11, top: rows.row11 }, // LCB
    { left: cols.col1, top: rows.row11 }, // LB
    // No CDM in this formation
    { left: cols.col4, top: rows.row6 }, // RCM
    { left: cols.col8, top: rows.row6 }, // CM
    { left: cols.col12, top: rows.row6 }, // LCM
    { left: cols.col12, top: rows.row1 }, // RW
    { left: cols.col8, top: rows.row0 }, // ST
    { left: cols.col4, top: rows.row1 }, // LW
  ],
  // 4-3-3a Formation
  f433a: [
    { left: cols.col8, top: rows.row15 }, // GK
    { left: cols.col16, top: rows.row11 }, // RB
    { left: cols.col5, top: rows.row11 }, // RCB
    { left: cols.col11, top: rows.row11 }, // LCB
    { left: cols.col1, top: rows.row11 }, // LB
    { left: cols.col8, top: rows.row7 }, // RDM
    { left: cols.col4, top: rows.row6 }, // CM
    { left: cols.col12, top: rows.row6 }, // LDM
    // No CAM in this formation
    { left: cols.col12, top: rows.row1 }, // RW
    { left: cols.col8, top: rows.row0 }, // ST
    { left: cols.col4, top: rows.row1 }, // LW
  ],
  // 4-4-1-1a Formation
  f4411a: [
    { left: cols.col8, top: rows.row15 }, // GK
    { left: cols.col16, top: rows.row11 }, // RB
    { left: cols.col5, top: rows.row11 }, // RCB
    { left: cols.col11, top: rows.row11 }, // LCB
    { left: cols.col1, top: rows.row11 }, // LB
    // No CDM in this formation
    { left: cols.col14, top: rows.row6 }, // RM
    { left: cols.col11, top: rows.row6 }, // RCM
    { left: cols.col5, top: rows.row6 }, // LCM
    { left: cols.col2, top: rows.row6 }, // LM
    { left: cols.col8, top: rows.row5 }, // CF
    { left: cols.col8, top: rows.row0 }, // ST
  ],
  // 4-3-3b Formation
  f433b: [
    { left: cols.col8, top: rows.row15 }, // GK
    { left: cols.col16, top: rows.row11 }, // RB
    { left: cols.col5, top: rows.row11 }, // RCB
    { left: cols.col11, top: rows.row11 }, // LCB
    { left: cols.col1, top: rows.row11 }, // LB
    { left: cols.col4, top: rows.row7 }, // RDM
    { left: cols.col12, top: rows.row7 }, // CM
    { left: cols.col8, top: rows.row6 }, // LDM
    // No CAM in this formation
    { left: cols.col12, top: rows.row1 }, // RW
    { left: cols.col8, top: rows.row0 }, // ST
    { left: cols.col4, top: rows.row1 }, // LW
  ],
  //4-3-3c Formation

  f433c: [
    { left: cols.col8, top: rows.row15 }, // GK
    { left: cols.col16, top: rows.row11 }, // RB
    { left: cols.col5, top: rows.row11 }, // RCB
    { left: cols.col11, top: rows.row11 }, // LCB
    { left: cols.col1, top: rows.row11 }, // LB
    { left: cols.col4, top: rows.row6 }, // RCM
    { left: cols.col12, top: rows.row6 }, // LCM
    { left: cols.col8, top: rows.row4 }, // CAM
    { left: cols.col12, top: rows.row1 }, // RW
    { left: cols.col8, top: rows.row0 }, // ST
    { left: cols.col4, top: rows.row1 }, // LW
  ],

  // 4-5-1 Formation
  f451: [
    { left: cols.col8, top: rows.row15 }, // GK
    { left: cols.col16, top: rows.row11 }, // RB
    { left: cols.col5, top: rows.row11 }, // RCB
    { left: cols.col11, top: rows.row11 }, // LCB
    { left: cols.col1, top: rows.row11 }, // LB
    { left: cols.col14, top: rows.row5 }, // RM
    { left: cols.col8, top: rows.row7 }, // CM
    { left: cols.col2, top: rows.row5 }, // LM
    { left: cols.col6, top: rows.row3 }, // CAM
    { left: cols.col10, top: rows.row3 }, // CAM
    { left: cols.col8, top: rows.row0 }, // ST
  ],
  f451a: [
    { left: cols.col8, top: rows.row15 }, // GK
    { left: cols.col16, top: rows.row11 }, // RB
    { left: cols.col5, top: rows.row11 }, // RCB
    { left: cols.col11, top: rows.row11 }, // LCB
    { left: cols.col1, top: rows.row11 }, // LB
    { left: cols.col14, top: rows.row6 }, // RM
    { left: cols.col11, top: rows.row6 }, // RCM
    { left: cols.col8, top: rows.row6 }, // CM
    { left: cols.col5, top: rows.row6 }, // LCM
    { left: cols.col2, top: rows.row6 }, // LM
    { left: cols.col8, top: rows.row0 }, // ST
  ],

  // 5-2-1-2 Formation
  f5212: [
    { left: cols.col8, top: rows.row15 }, // GK
    { left: cols.col14, top: rows.row9 },
    // RCB
    { left: cols.col8, top: rows.row11 }, // CB
    { left: cols.col11, top: rows.row11 }, // LCB
    { left: cols.col5, top: rows.row11 },
    { left: cols.col2, top: rows.row9 }, // LWB
    { left: cols.col5, top: rows.row5 }, // RCM
    { left: cols.col11, top: rows.row5 }, // LCM
    { left: cols.col8, top: rows.row3 }, // CAM
    { left: cols.col6, top: rows.row0 }, // RS
    { left: cols.col10, top: rows.row0 }, // LS
  ],
  // 5-2-3 Formation
  f523: [
    { left: cols.col8, top: rows.row15 }, // GK
    { left: cols.col14, top: rows.row9 },
    // RCB
    { left: cols.col8, top: rows.row11 }, // CB
    { left: cols.col11, top: rows.row11 }, // LCB
    { left: cols.col5, top: rows.row11 },
    { left: cols.col2, top: rows.row9 }, // LWB
    { left: cols.col6, top: rows.row5 }, // RCM
    { left: cols.col10, top: rows.row5 }, // LCM
    // No CAM in this formation
    { left: cols.col12, top: rows.row1 }, // RW
    { left: cols.col8, top: rows.row0 }, // ST
    { left: cols.col4, top: rows.row1 }, // LW
  ],
  // 5-3-2 Formation
  f532: [
    { left: cols.col8, top: rows.row15 }, // GK
    // No RB in this formation
    { left: cols.col5, top: rows.row11 }, // RCB
    { left: cols.col8, top: rows.row11 }, // CB
    { left: cols.col11, top: rows.row11 }, // LCB
    // No LB in this formation
    { left: cols.col14, top: rows.row9 }, // RWB
    { left: cols.col2, top: rows.row9 }, // LWB
    { left: cols.col8, top: rows.row6 }, // CDM
    { left: cols.col5, top: rows.row5 }, // LCM
    { left: cols.col11, top: rows.row5 }, // RCM
    { left: cols.col6, top: rows.row0 }, // RS
    { left: cols.col10, top: rows.row0 }, // LS
  ],
  // 5-4-1a Formation
  f541a: [
    { left: cols.col8, top: rows.row15 }, // GK
    { left: cols.col14, top: rows.row9 }, // RWB

    { left: cols.col8, top: rows.row11 }, // CB
    { left: cols.col11, top: rows.row11 }, // LCB
    { left: cols.col5, top: rows.row11 }, // RCB

    { left: cols.col2, top: rows.row9 }, // LWB
    { left: cols.col14, top: rows.row4 }, // RM
    { left: cols.col6, top: rows.row5 }, // RCM
    { left: cols.col10, top: rows.row5 }, // LCM
    { left: cols.col2, top: rows.row4 }, // LM
    { left: cols.col8, top: rows.row0 }, // ST
  ],
  // 4-4-2a Formation
  f442a: [
    { left: cols.col8, top: rows.row15 }, // GK
    { left: cols.col16, top: rows.row11 }, // RB
    { left: cols.col6, top: rows.row11 }, // RCB
    { left: cols.col10, top: rows.row11 }, // LCB
    { left: cols.col1, top: rows.row11 }, // LB
    { left: cols.col6, top: rows.row6 }, // RDM
    { left: cols.col10, top: rows.row6 }, // LDM
    { left: cols.col14, top: rows.row5 }, // RM
    { left: cols.col2, top: rows.row5 }, // LM
    { left: cols.col6, top: rows.row0 }, // RS
    { left: cols.col10, top: rows.row0 }, // LS
  ],
  // 4-4-2 Formation
  f442: [
    { left: cols.col8, top: rows.row15 }, // GK
    { left: cols.col16, top: rows.row11 }, // RB
    { left: cols.col6, top: rows.row11 }, // RCB
    { left: cols.col10, top: rows.row11 }, // LCB
    { left: cols.col1, top: rows.row11 }, // LB
    // No CDM in this formation
    { left: cols.col14, top: rows.row6 }, // RM
    { left: cols.col6, top: rows.row6 }, // RCM
    { left: cols.col10, top: rows.row6 }, // LCM
    { left: cols.col2, top: rows.row6 }, // LM
    { left: cols.col6, top: rows.row0 }, // RS
    { left: cols.col10, top: rows.row0 }, // LS
  ],
};

export default formationPositionCoordinates;
