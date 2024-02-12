import { DistancePipe } from "./distance.pipe";
import { SpeedPipe } from "./speed.pipe";

export const SHARED_PIPES = [DistancePipe, SpeedPipe] as const