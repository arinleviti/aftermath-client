export interface TownDto {
    id: number;
    userId: number;
    userName: string;
    name: string;
    position: {
      continent: number;
      region: number;
      area: number;
    };
    size: number;
    windSpeed: number;
    metal: number;
    water: number;
    oil: number;
    uranium: number;
    metalLvl: number;
    oilLvl: number;
    waterLvl: number;
    metalPct: number;
    oilPct: number;
    waterPct: number;
    metalStorageLvl: number;
    oilStorageLvl: number;
    waterStorageLvl: number;
    solarPlantLvl: number;
    windmills: number;
    garbageMetal: number;
    garbageWater: number;
    workShopLvl: number;
    garageLvl: number;
    laboratoryLvl: number;
    buildingFinishTime: string; // ISO date string
    buildingUpgrade: number;
    isBuildingUpgrading: boolean;
    bikeRiders: number;
    quadRiders: number;
    spitfires: number;
    armoredCars: number;
    armors: number;
    katyushas: number;
    manOWars: number;
    miniVans: number;
    trucks: number;
    armoredBuses: number;
    garbageTrucks: number;
    scouts: number;
    riflemen: number;
    flameThrowers: number;
    grenadiers: number;
    rocketLaunchers: number;
    mortars: number;
    machineGunNests: number;
    woodenFence: boolean;
    ironFence: boolean;
    landscape: number;
    isPending: boolean;
    isDeleted: boolean;
    isUnderAttack: boolean;
    deletionTime: string | null; // ISO date string or null
    orders: any[]; // Adjust type based on order structure
    lastUpdated: string; // ISO date string
  }
  