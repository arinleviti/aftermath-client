export interface UserDto {
    id: number;
    name: string | null;
    password: string | null;
    passwordChanged: boolean;
    combustionLvl: number;
    electricityLvl: number;
    leaderShipLvl: number;
    machineryLvl: number;
    scoutingLvl: number;
    weaponsLvl: number;
    shieldLvl: number;
    structuralLvl: number;
    survivalLvl: number;
    researchFinishTime: string; // This can be a date-time string
    researchUpgrade: ItemTypeEnum; // Assuming ItemType is a separate enum or type
    isResearchUpgrading: boolean;
    lastConnection: string; // This can be a date-time string
    tutorial: string | null;
  }

  export enum ItemTypeEnum {
    TYPE_0 = 0,
    TYPE_1 = 1,
    TYPE_2 = 2,
    TYPE_3 = 3,
    TYPE_4 = 4,
    TYPE_5 = 5,
    TYPE_6 = 6,
    TYPE_7 = 7,
    TYPE_8 = 8,
    TYPE_9 = 9,
    TYPE_10 = 10,
    TYPE_11 = 11,
    TYPE_12 = 12,
    TYPE_13 = 13,
    TYPE_14 = 14,
    TYPE_15 = 15,
    TYPE_16 = 16,
    TYPE_17 = 17,
    TYPE_18 = 18,
    TYPE_19 = 19,
    TYPE_20 = 20,
    TYPE_21 = 21,
    TYPE_22 = 22,
    TYPE_23 = 23,
    TYPE_24 = 24,
    TYPE_25 = 25,
    TYPE_26 = 26,
    TYPE_27 = 27,
    TYPE_28 = 28,
    TYPE_29 = 29,
    TYPE_30 = 30,
    TYPE_31 = 31,
    TYPE_32 = 32,
    TYPE_33 = 33,
    TYPE_34 = 34,
    TYPE_35 = 35,
    TYPE_36 = 36,
    TYPE_37 = 37,
    TYPE_38 = 38,
    TYPE_39 = 39
  }

  export enum MissionTypeEnum {
    Type0 = 0,
    Type1 = 1,
    Type2 = 2,
    Type3 = 3,
    Type4 = 4,
    Type5 = 5
  }
  