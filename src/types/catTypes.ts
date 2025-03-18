type Weight = {
  imperial: string;
  metric: string;
};

export type Breed = {
  id: string;
  name: string;
  origin: string;
  temperament?:
    | "Active"
    | "Energetic"
    | "Independent"
    | "Intelligent"
    | "Gentle";
  country_codes?: string;
  country_code?: string;
  weight?: Weight;
  life_span: string;
  adaptability: number;
  image: {
    id: string;
    url: string;
  };
  description: string;
};

export type Cat = {
  id: string;
  url: string;
  width: number;
  height: number;
  breeds?: Breed[];
  favourite?: {};
};
