import { CreatureType, TileType } from "./interface";

export default {
  GARDEN_WIDTH: 1000,
  GARDEN_HEIGHT: 1000,
  DB_ADMIN_PASSWORD: "dwc!",
};

export const DWC_META = {
  creatures: {
    moss: "moss" as CreatureType,
    mushroom: "mushroom" as CreatureType,
    lichen: "lichen" as CreatureType,
  },
  creaturesNew: {
    moss: {
      "moss-element-1": {
        name: "moss-element-1",
        anchor: { x: 0.5, y: 0 },
        connectors: {
          "moss-element-2": 6,
        },
      },
      "moss-element-2": {
        name: "moss-element-2",
        anchor: { x: 0, y: 0 },
        connectors: {
          "moss-element-1": 6,
        },
      },
    },
    mushroom: {
      "mushroom-element-1": {
        name: "mushroom-element-1",
        anchor: { x: 0, y: 0.5 },
        connectors: {},
      },
    },
    lichen: {
      "lichen-element-1": {
        name: "lichen-element-1",
        anchor: { x: 0.5, y: 0.5 },
        connectors: {
          "lichen-element-1": 4,
        },
      },
    },
  },
  creaturesOld: {
    moss: {
      "moss-element-1": {
        name: "moss-element-1",
        connectors: {
          "moss-element-1": 5,
          "moss-element-2": 3,
        },
      },
      "moss-element-2": {
        name: "moss-element-2",
        connectors: {
          "moss-element-1": 3,
          "moss-element-2": 4,
        },
      },
      "moss-element-3": {
        name: "moss-element-3",
        connectors: {
          "moss-element-3": 4,
          "moss-element-4": 3,
        },
      },
      "moss-element-4": {
        name: "moss-element-4",
        connectors: {
          "moss-element-3": 4,
          "moss-element-4": 4,
        },
      },
    },
    lichen: {
      "lichen-element-1": {
        name: "lichen-element-1",
        connectors: {
          "lichen-element-1": 1,
          "lichen-element-2": 1,
        },
      },
      "lichen-element-2": {
        name: "lichen-element-2",
        connectors: {
          "lichen-element-1": 1,
          "lichen-element-2": 1,
        },
      },
      "lichen-element-3": {
        name: "lichen-element-3",
        connectors: {
          "lichen-element-3": 1,
          "lichen-element-4": 1,
        },
      },
      "lichen-element-4": {
        name: "lichen-element-4",
        connectors: {
          "lichen-element-3": 1,
          "lichen-element-4": 1,
        },
      },
    },
    mushroom: {
      "mushroom-element-1": {
        name: "mushroom-element-1",
        connectors: {
          "mushroom-element-1": 1,
          "mushroom-element-2": 1,
        },
      },
      "mushroom-element-2": {
        name: "mushroom-element-2",
        connectors: {
          "mushroom-element-1": 1,
          "mushroom-element-2": 1,
        },
      },
    },
  },
  creaturePropertyTypes: {
    position: "position",
    shape: "shape",
  },
  tiles: {
    TILE_1: "tile-1",
    TILE_2: "tile-2",
    TILE_3: "tile-3",
    TILE_4: "tile-4",
  },
  tileShapes: {
    TRIANGLE: "TRIANGLE" as TileType,
    CIRCLE: "CIRCLE" as TileType,
  },
};

const config: {
  [key: string]: {
    type: CreatureType;
    weatherFetchInterval: number;
    creatureTypes: CreatureType[];
    backgroundTypes: TileType[];
  };
} = {
  moss: {
    type: "moss",
    weatherFetchInterval: 10000,
    creatureTypes: [DWC_META.creatures.moss],
    backgroundTypes: [DWC_META.tileShapes.TRIANGLE],
  },
  mushroom: {
    type: "mushroom",
    weatherFetchInterval: -1,
    creatureTypes: [DWC_META.creatures.mushroom],
    backgroundTypes: [DWC_META.tileShapes.CIRCLE],
  },
  lichen: {
    type: "lichen",
    weatherFetchInterval: -1,
    creatureTypes: [DWC_META.creatures.lichen],
    backgroundTypes: [DWC_META.tileShapes.TRIANGLE, DWC_META.tileShapes.CIRCLE],
  },
  all: {
    type: "all",
    weatherFetchInterval: -1,
    creatureTypes: [DWC_META.creatures.moss, DWC_META.creatures.mushroom, DWC_META.creatures.lichen],
    backgroundTypes: [DWC_META.tileShapes.TRIANGLE, DWC_META.tileShapes.CIRCLE],
  },
};

export const defaultConfig = config[GARDEN_TYPE] || config["moss"];

export function randomInRange(a: number, b: number) {
  return Math.random() * (b - a) + a;
}

export function randomIntInRange(a: number, b: number) {
  return Math.floor(randomInRange(a, b));
}

export function randomElementFromArray(arr: any[]) {
  return arr[randomIntInRange(0, arr.length)];
}
