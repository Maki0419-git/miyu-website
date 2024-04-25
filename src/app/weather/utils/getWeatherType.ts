import { WeatherCodeType, WeatherType, WeatherTypeData } from "../types";

export function getWeatherType<T extends WeatherTypeData>(
  data: T,
  value: T extends WeatherCodeType ? number : string
): WeatherType {
  for (const [key, values] of Object.entries(data)) {
    if (values.includes(value)) {
      return key as WeatherType;
    }
  }

  return "CLEAR";
}
