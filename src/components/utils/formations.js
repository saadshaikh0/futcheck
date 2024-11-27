import { formationPositionCoordinates } from "./formationCoordinates";

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

//New formation logic starts here

export const positions = [
  {
    uniqueId: 0,
    typeId: 0,
    uniqueName: "GK",
    typeName: "GK",
  },
  {
    uniqueId: 1,
    typeId: 1,
    uniqueName: "SW",
    typeName: "N/A",
  },
  {
    uniqueId: 2,
    typeId: 2,
    uniqueName: "RWB",
    typeName: "RWB",
  },
  {
    uniqueId: 3,
    typeId: 3,
    uniqueName: "RB",
    typeName: "RB",
  },
  {
    uniqueId: 4,
    typeId: 5,
    uniqueName: "RCB",
    typeName: "CB",
  },
  {
    uniqueId: 5,
    typeId: 5,
    uniqueName: "CB",
    typeName: "CB",
  },
  {
    uniqueId: 6,
    typeId: 5,
    uniqueName: "LCB",
    typeName: "CB",
  },
  {
    uniqueId: 7,
    typeId: 7,
    uniqueName: "LB",
    typeName: "LB",
  },
  {
    uniqueId: 8,
    typeId: 8,
    uniqueName: "LWB",
    typeName: "LWB",
  },
  {
    uniqueId: 9,
    typeId: 10,
    uniqueName: "RDM",
    typeName: "CDM",
  },
  {
    uniqueId: 10,
    typeId: 10,
    uniqueName: "CDM",
    typeName: "CDM",
  },
  {
    uniqueId: 11,
    typeId: 10,
    uniqueName: "LDM",
    typeName: "CDM",
  },
  {
    uniqueId: 12,
    typeId: 12,
    uniqueName: "RM",
    typeName: "RM",
  },
  {
    uniqueId: 13,
    typeId: 14,
    uniqueName: "RCM",
    typeName: "CM",
  },
  {
    uniqueId: 14,
    typeId: 14,
    uniqueName: "CM",
    typeName: "CM",
  },
  {
    uniqueId: 15,
    typeId: 14,
    uniqueName: "LCM",
    typeName: "CM",
  },
  {
    uniqueId: 16,
    typeId: 16,
    uniqueName: "LM",
    typeName: "LM",
  },
  {
    uniqueId: 17,
    typeId: 18,
    uniqueName: "RAM",
    typeName: "CAM",
  },
  {
    uniqueId: 18,
    typeId: 18,
    uniqueName: "CAM",
    typeName: "CAM",
  },
  {
    uniqueId: 19,
    typeId: 18,
    uniqueName: "LAM",
    typeName: "CAM",
  },
  {
    uniqueId: 20,
    typeId: 21,
    uniqueName: "RF",
    typeName: "CF",
  },
  {
    uniqueId: 21,
    typeId: 21,
    uniqueName: "CF",
    typeName: "CF",
  },
  {
    uniqueId: 22,
    typeId: 21,
    uniqueName: "LF",
    typeName: "CF",
  },
  {
    uniqueId: 23,
    typeId: 23,
    uniqueName: "RW",
    typeName: "RW",
  },
  {
    uniqueId: 24,
    typeId: 25,
    uniqueName: "RS",
    typeName: "ST",
  },
  {
    uniqueId: 25,
    typeId: 25,
    uniqueName: "ST",
    typeName: "ST",
  },
  {
    uniqueId: 26,
    typeId: 25,
    uniqueName: "LS",
    typeName: "ST",
  },
  {
    uniqueId: 27,
    typeId: 27,
    uniqueName: "LW",
    typeName: "LW",
  },
];
const formations = [
  {
    id: 22,
    index: 0,
    name: "f3142",
    uniquePositionSlots: [0, 4, 5, 6, 10, 12, 13, 15, 16, 24, 26],
    generalPositionSlots: [0, 5, 5, 5, 10, 12, 14, 14, 16, 25, 25],
  },
  {
    id: 23,
    index: 1,
    name: "f3412",
    uniquePositionSlots: [0, 4, 5, 6, 12, 13, 15, 16, 18, 24, 26],
    generalPositionSlots: [0, 5, 5, 5, 12, 14, 14, 16, 18, 25, 25],
  },
  {
    id: 24,
    index: 2,
    name: "f3421",
    uniquePositionSlots: [0, 4, 5, 6, 12, 13, 15, 16, 17, 19, 25],
    generalPositionSlots: [0, 5, 5, 5, 12, 14, 14, 16, 18, 18, 25],
  },
  {
    id: 25,
    index: 3,
    name: "f343",
    uniquePositionSlots: [0, 4, 5, 6, 12, 13, 15, 16, 23, 25, 27],
    generalPositionSlots: [0, 5, 5, 5, 12, 14, 14, 16, 23, 25, 27],
  },
  {
    id: 27,
    index: 4,
    name: "f352",
    uniquePositionSlots: [0, 4, 5, 6, 9, 11, 12, 16, 18, 24, 26],
    generalPositionSlots: [0, 5, 5, 5, 10, 10, 12, 16, 18, 25, 25],
  },
  {
    id: 14,
    index: 5,
    name: "f41212",
    uniquePositionSlots: [0, 3, 4, 6, 7, 10, 12, 16, 18, 24, 26],
    generalPositionSlots: [0, 3, 5, 5, 7, 10, 12, 16, 18, 25, 25],
  },
  {
    id: 15,
    index: 6,
    name: "f41212a",
    uniquePositionSlots: [0, 3, 4, 6, 7, 10, 13, 15, 18, 24, 26],
    generalPositionSlots: [0, 3, 5, 5, 7, 10, 14, 14, 18, 25, 25],
  },
  {
    id: 1,
    index: 7,
    name: "f4132",
    uniquePositionSlots: [0, 3, 4, 6, 7, 10, 12, 14, 16, 24, 26],
    generalPositionSlots: [0, 3, 5, 5, 7, 10, 12, 14, 16, 25, 25],
  },
  {
    id: 2,
    index: 8,
    name: "f4141",
    uniquePositionSlots: [0, 3, 4, 6, 7, 10, 12, 13, 15, 16, 25],
    generalPositionSlots: [0, 3, 5, 5, 7, 10, 12, 14, 14, 16, 25],
  },
  {
    id: 36,
    index: 9,
    name: "f4213",
    uniquePositionSlots: [0, 3, 4, 6, 7, 9, 11, 18, 23, 25, 27],
    generalPositionSlots: [0, 3, 5, 5, 7, 10, 10, 18, 23, 25, 27],
  },
  {
    id: 13,
    index: 10,
    name: "f4222",
    uniquePositionSlots: [0, 3, 4, 6, 7, 9, 11, 17, 19, 24, 26],
    generalPositionSlots: [0, 3, 5, 5, 7, 10, 10, 18, 18, 25, 25],
  },
  {
    id: 3,
    index: 11,
    name: "f4231",
    uniquePositionSlots: [0, 3, 4, 6, 7, 9, 11, 17, 18, 19, 25],
    generalPositionSlots: [0, 3, 5, 5, 7, 10, 10, 18, 18, 18, 25],
  },
  {
    id: 4,
    index: 12,
    name: "f4231a",
    uniquePositionSlots: [0, 3, 4, 6, 7, 9, 11, 12, 16, 18, 25],
    generalPositionSlots: [0, 3, 5, 5, 7, 10, 10, 12, 16, 18, 25],
  },
  {
    id: 5,
    index: 13,
    name: "f424",
    uniquePositionSlots: [0, 3, 4, 6, 7, 13, 15, 23, 24, 26, 27],
    generalPositionSlots: [0, 3, 5, 5, 7, 14, 14, 23, 25, 25, 27],
  },
  {
    id: 6,
    index: 14,
    name: "f4312",
    uniquePositionSlots: [0, 3, 4, 6, 7, 13, 14, 15, 18, 24, 26],
    generalPositionSlots: [0, 3, 5, 5, 7, 14, 14, 14, 18, 25, 25],
  },
  {
    id: 7,
    index: 15,
    name: "f4321",
    uniquePositionSlots: [0, 3, 4, 6, 7, 13, 14, 15, 17, 19, 25],
    generalPositionSlots: [0, 3, 5, 5, 7, 14, 14, 14, 18, 18, 25],
  },
  {
    id: 8,
    index: 16,
    name: "f433",
    uniquePositionSlots: [0, 3, 4, 6, 7, 13, 14, 15, 23, 25, 27],
    generalPositionSlots: [0, 3, 5, 5, 7, 14, 14, 14, 23, 25, 27],
  },
  {
    id: 9,
    index: 17,
    name: "f433a",
    uniquePositionSlots: [0, 3, 4, 6, 7, 10, 13, 15, 23, 25, 27],
    generalPositionSlots: [0, 3, 5, 5, 7, 10, 14, 14, 23, 25, 27],
  },
  {
    id: 10,
    index: 18,
    name: "f433b",
    uniquePositionSlots: [0, 3, 4, 6, 7, 9, 11, 14, 23, 25, 27],
    generalPositionSlots: [0, 3, 5, 5, 7, 10, 10, 14, 23, 25, 27],
  },
  {
    id: 11,
    index: 19,
    name: "f433c",
    uniquePositionSlots: [0, 3, 4, 6, 7, 13, 15, 18, 23, 25, 27],
    generalPositionSlots: [0, 3, 5, 5, 7, 14, 14, 18, 23, 25, 27],
  },
  {
    id: 18,
    index: 22,
    name: "f4411a",
    uniquePositionSlots: [0, 3, 4, 6, 7, 12, 13, 15, 16, 18, 25],
    generalPositionSlots: [0, 3, 5, 5, 7, 12, 14, 14, 16, 18, 25],
  },
  {
    id: 16,
    index: 23,
    name: "f442",
    uniquePositionSlots: [0, 3, 4, 6, 7, 12, 13, 15, 16, 24, 26],
    generalPositionSlots: [0, 3, 5, 5, 7, 12, 14, 14, 16, 25, 25],
  },
  {
    id: 17,
    index: 24,
    name: "f442a",
    uniquePositionSlots: [0, 3, 4, 6, 7, 9, 11, 12, 16, 24, 26],
    generalPositionSlots: [0, 3, 5, 5, 7, 10, 10, 12, 16, 25, 25],
  },
  {
    id: 21,
    index: 25,
    name: "f451",
    uniquePositionSlots: [0, 3, 4, 6, 7, 12, 14, 16, 17, 19, 25],
    generalPositionSlots: [0, 3, 5, 5, 7, 12, 14, 16, 18, 18, 25],
  },
  {
    id: 20,
    index: 26,
    name: "f451a",
    uniquePositionSlots: [0, 3, 4, 6, 7, 12, 13, 14, 15, 16, 25],
    generalPositionSlots: [0, 3, 5, 5, 7, 12, 14, 14, 14, 16, 25],
  },
  {
    id: 29,
    index: 27,
    name: "f5212",
    uniquePositionSlots: [0, 3, 4, 5, 6, 7, 13, 15, 18, 24, 26],
    generalPositionSlots: [0, 3, 5, 5, 5, 7, 14, 14, 18, 25, 25],
  },
  {
    id: 30,
    index: 29,
    name: "f523",
    uniquePositionSlots: [0, 3, 4, 5, 6, 7, 13, 15, 23, 25, 27],
    generalPositionSlots: [0, 3, 5, 5, 5, 7, 14, 14, 23, 25, 27],
  },
  {
    id: 31,
    index: 30,
    name: "f532",
    uniquePositionSlots: [0, 3, 4, 5, 6, 7, 10, 13, 15, 24, 26],
    generalPositionSlots: [0, 3, 5, 5, 5, 7, 10, 14, 14, 25, 25],
  },
  {
    id: 33,
    index: 31,
    name: "f541a",
    uniquePositionSlots: [0, 3, 4, 5, 6, 7, 12, 13, 15, 16, 25],
    generalPositionSlots: [0, 3, 5, 5, 5, 7, 12, 14, 14, 16, 25],
  },
];

export const allFormations = formations.map((formation) => {
  return formation.name;
});

const uniqueIdToPositionName = positions.reduce((acc, pos) => {
  acc[pos.uniqueId] = pos.typeName; // Use uniqueName if you prefer specific positions
  return acc;
}, {});
export const getFormationPositions = (formationName, size = "big") => {
  // Find the formation object by name
  const formation = formations.find((f) => f.name === formationName);
  if (!formation) {
    throw new Error(`Formation ${formationName} not found`);
  }

  // Get the position coordinates for the formation
  const coordinatesArray =
    size === "small"
      ? formationPositionCoordinates[formationName]
      : formationPositionCoordinates[formationName];

  if (!coordinatesArray) {
    throw new Error(
      `Coordinates not found for formation ${formationName} and size ${size}`
    );
  }

  // Map the uniquePositionSlots to position objects
  const positionsArray = formation.uniquePositionSlots.map(
    (uniqueId, index) => {
      const positionName = uniqueIdToPositionName[uniqueId];
      const coordinates = coordinatesArray[index];

      if (!positionName || !coordinates) {
        throw new Error(
          `Position or coordinates not found for uniqueId ${uniqueId} in formation ${formationName}`
        );
      }

      return {
        position: positionName,
        left: coordinates.left,
        top: coordinates.top,
      };
    }
  );

  return positionsArray;
};
