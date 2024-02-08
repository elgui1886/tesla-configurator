import { ConfiguratorApiService } from "./configurator-api.service";
import { ConfiguratorStateService } from "./configurator-state.service";

export const TESLA_CONFIGURATOR_PROVIDERS = [ConfiguratorApiService, ConfiguratorStateService] as const;