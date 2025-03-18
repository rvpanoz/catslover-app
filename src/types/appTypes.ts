export enum Adaptability {
  Rigid = 0,
  Resistant = 1,
  Cautious = 2,
  Moderate = 3,
  Adaptable = 4,
  Highly_Adaptable = 5,
}

export enum IndoorSuitability {
  Not = 0,
  Barely = 1,
  Somewhat = 2,
  Moderately = 3,
  Friendly = 4,
  Perfect = 5,
}

export type ApiResponse = {
  breedId: number;
  id: number;
}[];

export type FetchDataOptions = {
  headers: {
    "x-api-key": string;
  };
};
