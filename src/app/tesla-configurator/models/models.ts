export type Color = {
    code: string;
    description: string;
    price: number;
}
export type Model = {
    code: string;
    description: string;
    colors: Color[];
}
export type Config = {
    id: number;
    description: string;
    range: number;
    speed: number;
    price: number;
}
export type Option = { 
    configs: Config[];
    towHitch: boolean;
    yoke: boolean;
}
export type ConfiguratorState = { 
    model: Model | null;
    color: Color | null;
    carUrl: string | null;
  };

