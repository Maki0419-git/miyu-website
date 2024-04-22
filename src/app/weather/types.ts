export enum WeatherAPI {
  CURRENT_WEATHER = "O-A0003-001",
  THIRTY_SIX_HOURS_WEATHER = "F-C0032-001",
}

export type WeatherApiAlias = keyof typeof WeatherAPI;

export enum Weather {
  CLEAR = "晴",
  CLOUDY = "多雲",
  RAINY = "雨",
  THUNDER = "雷雨",
  SNOWY = "雪",
  FOGGY = "霧",
}
