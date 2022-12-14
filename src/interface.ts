export type CreatureType = "moss" | "mushroom" | "lichen" | "all";
export type TileType = "TRIANGLE" | "CIRCLE";

export const USER_ROLE = {
  ADMIN: 1,
  USER: 2,
};

export interface Weather {
  id: number;
}

export interface UserRole {
  id?: number;
  name: string;
}

export interface User {
  id?: number;
  uid: string;
  creatureName: string;
  garden_section_id: number | null;
  role_id: number | null;
  gardenSection?: GardenSection;
  role?: UserRole;
}

export interface Creature {
  id?: number;
  appearance: { [key: string]: any };
  animated_properties: { [key: string]: any };
  user_id: number | null;
  user?: User;
}

interface CurrTile {
  target: any;
  duration: number;
  shape: any;
  anchor: any;
}

interface Shader {
  shaderTimeSeed: number;
  shaderSpeed: number;
}

export interface GardenSection {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  user_id?: number;
  props: {
    tiles: CurrTile[][];
    shader: Shader;
  };
  tileProps?: any;
  shaderProps?: any;
}

export const DEFAULT_GARDEN_SECTION = {
  id: 0,
  x: 0,
  y: 0,
  index: 0,
  width: 0,
  height: 0,
  props: {
    tiles: [],
    shader: {
      shaderSpeed: 0,
      shaderTimeSeed: 0,
    },
  },
};

export interface Weather {}
