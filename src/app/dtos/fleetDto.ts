import { PositionDto } from "./positionDto";
import { TimeSpanDto } from "./timeSpanDto";
import { MissionTypeEnum } from "./userDto";

export interface FleetDto {
    id: number; // integer($int32)
    fromTownId: number; // integer($int32)
    toTownId: number; // integer($int32)
    fromName: string | null; // string (nullable: true)
    fromPosition: PositionDto; // Position object
    toName: string | null; // string (nullable: true)
    toPosition: PositionDto; // Position object
    departureTime: string; // string($date-time)
    arrivalTime: string; // string($date-time)
    missionType: MissionTypeEnum; // MissionTypeEnum (0-5)
    speed: number; // integer($int32)
    metal: number; // integer($int32)
    water: number; // integer($int32)
    oil: number; // integer($int32)
    isReturn: boolean; // boolean
    bikeRiders: number; // integer($int32)
    quadRiders: number; // integer($int32)
    spitfires: number; // integer($int32)
    armoredCars: number; // integer($int32)
    armors: number; // integer($int32)
    katyushas: number; // integer($int32)
    manOWars: number; // integer($int32)
    miniVans: number; // integer($int32)
    trucks: number; // integer($int32)
    armoredBuses: number; // integer($int32)
    garbageTrucks: number; // integer($int32)
    scouts: number; // integer($int32)
    total: number; // integer($int32)
    duration: TimeSpanDto; // TimeSpan object
    returnTime: string; // string($date-time) (readOnly)
    cargo: number; // integer($int32) (readOnly)
  }