import { CostDto } from "../dtos/costDto";

export function CalculateUpgradeCost(itemType: number | null, level: number | null): CostDto {
    var metal = 0;
    var water = 0;
    var oil = 0;
    if (itemType === null || level === null) {
        throw new Error("Item type cannot be null");
    }
    switch (itemType) {
        case 0: metal = 60 * Math.pow(1.5, level);// ScrapeYard
                water = 15 * Math.pow(1.5, level);
                break;
        case 1: metal =  1000 * Math.pow(2, level); // Warehouse
                break;
        case 2: metal = 225 * Math.pow(1.5, level); // OilRig
                water = 75 * Math.pow(1.5, level);
                break;
        case 3: metal = 1000 * Math.pow(2, level); // OilTank
                water = 500 * Math.pow(2, level);
                break;
        case 4: metal = 48 * Math.pow(1.6, level);// WaterPurifier
                water = 24 * Math.pow(1.6, level);
                break;
        case 5: metal = 2000 * Math.pow(2, level); // WaterTank
                water = 2000 * Math.pow(2, level);
                break;
        case 6: metal = 75 * Math.pow(1.5, level); // SolarPlant
                water = 30 * Math.pow(1.5, level);
                break;
        case 8: if(level === 0) {                   // Workshop
                metal = 80 * Math.pow(1.5, level);
                water = 30 * Math.pow(1.5, level);
                break;
                } else {
                    metal = 400 * Math.pow(2, level);
                    water = 120 * Math.pow(2, level);
                    oil = 200 * Math.pow(2, level);
                }
                break;
        case 9: metal = 400 * Math.pow(2, level);  // Garage
                water = 200 * Math.pow(2, level);
                oil = 100 * Math.pow(2, level);
                break;
        case 10: metal = 200 * Math.pow(2, level); // Laboratory
                water = 400 * Math.pow(2, level);
                oil = 200 * Math.pow(2, level);
                break;
        case 29: metal = 10000; // WoodenFence
                water = 10000;
                break;
        case 30: metal = 50000; // IronFence
                water = 50000;
                break;
                default: throw new Error("Invalid item type for upgrade cost calculation");
            }
            metal = Math.floor(metal);
            water = Math.floor(water);
            oil = Math.floor(oil);
            

    return { metal, water, oil };

}

export function CalculateResearchCost(itemType: number | null, level: number | null): CostDto {
        var metal = 0;
        var water = 0;
        var oil = 0;
        if (itemType === null || level === null) {
            throw new Error("Item type cannot be null");
        }
            switch (itemType){
                case 31: metal = 400 * Math.pow(2, level); // Combustion
                        oil = 600 * Math.pow(2, level);
                        break;
                case 32: water = 800 * Math.pow(2, level); // Electricity
                        oil = 400 * Math.pow(2, level);
                        break;
                case 33: water = 400 * Math.pow(2, level); // Leadership
                        oil = 600 * Math.pow(2, level);
                        break;
                case 34: water = 4000 * Math.pow(2, level); // Machinery
                        oil = 2000 * Math.pow(2, level);
                        break;
                case 35: metal = 200 * Math.pow(2, level); // Scouting
                        water = 1000 * Math.pow(2, level);
                        oil = 200 * Math.pow(2, level);
                        break;
                case 36: metal = 800 * Math.pow(2, level); // Weapons
                        water = 200 * Math.pow(2, level);
                        break;
                case 37: metal = 200 * Math.pow(2, level); // Shield
                        water = 600 * Math.pow(2, level);
                        break;
                case 38: metal = 1000 * Math.pow(2, level); // Structural
                        break;
                case 39: metal = 1000 * Math.pow(2, level); // Survival
                        oil = 500 * Math.pow(2, level);
                        break;
                default: throw new Error("Invalid item type for research cost calculation");

            }
            metal = Math.floor(metal);
            water = Math.floor(water);
            oil = Math.floor(oil);
            
            return { metal, water, oil };
        }
