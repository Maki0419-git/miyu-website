import { CurrentWeatherRecords } from "../types";

export type CityCardType = {
  cityName: string;
  temperature: number;
  weather: string;
};

export function getCityCardList(
  records: CurrentWeatherRecords,
  recentPlace: string[]
) {
  const cityCardList: CityCardType[] = [];
  records.Station.forEach((station) => {
    const cityCardIndex = recentPlace.indexOf(station.GeoInfo.CountyName);
    cityCardList[cityCardIndex] = {
      cityName: station.GeoInfo.CountyName,
      temperature: station.WeatherElement.AirTemperature,
      weather: station.WeatherElement.Weather,
    };
  });

  return cityCardList;
}
