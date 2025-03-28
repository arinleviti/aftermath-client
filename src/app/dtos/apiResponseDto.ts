import { FleetDto } from "./fleetDto";
import { TownDto } from "./townDto";
import { UserDto } from "./userDto";

export interface ApiResponseDto {
    serverTime: string; // ISO 8601 Date-Time
    token: string | null;
    user: UserDto;
    fleets: FleetDto[]; // Replace 'any' with a FleetDto if needed
    messages: string[];
    towns: TownDto[];
    selectedTown: TownDto | null;
    selectedTownIndex: number;
  }