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
    config: CarConfig | undefined;
    towHitch: boolean;
    yoke: boolean;
}


export type CarConfiguratorState = {
    carModel: CarModelInfo,
    option: CarOption
}

export type CarModelInfo = { 
    model: CarModel | undefined;
    color: CarColor | undefined;
    carUrl: string | undefined;
};

