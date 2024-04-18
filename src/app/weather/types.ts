export enum WeatherAPI {
  CURRENT_WEATHER = "O-A0003-001",
  THIRTY_SIX_HOURS_WEATHER = "F-C0032-001",
}

export type WeatherApiAlias = keyof typeof WeatherAPI;
