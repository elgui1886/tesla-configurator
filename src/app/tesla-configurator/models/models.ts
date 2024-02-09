export type CarColor = {
    code: string;
    description: string;
    price: number;
}
export type CarModel = {
    code: string;
    description: string;
    colors: CarColor[];
}
export type CarConfig = {
    id: number;
    description: string;
    range: number;
    speed: number;
    price: number;
}
export type CarOptions = { 
    configs: CarConfig[];
    towHitch: boolean;
    yoke: boolean;
}

export type CarOption = { 
    config: CarConfig | null;
    towHitch: boolean;
    yoke: boolean;
}


export type CarConfiguratorState = {
    carModel: CarModelInfo,
    option: CarOption
}

export type CarModelInfo = { 
    model: CarModel | null;
    color: CarColor | null;
    carUrl: string | null;
};

