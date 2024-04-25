export enum WeatherAPI {
  CURRENT_WEATHER = "O-A0003-001",
  THIRTY_SIX_HOURS_WEATHER = "F-C0032-001",
}

export type WeatherApiAlias = keyof typeof WeatherAPI;

export type CityResponseType = Record<"cities", string[]>;

export enum Weather {
  CLEAR = "晴",
  CLOUDY = "多雲",
  RAINY = "雨",
  THUNDER = "雷雨",
  SNOWY = "雪",
  FOGGY = "霧",
}

export type WeatherType = keyof typeof Weather;

export type WeatherCodeType = Record<WeatherType, number[]>;
export type WeatherDetailType = Record<WeatherType, string[]>;
export type WeatherTypeData = WeatherCodeType | WeatherDetailType;
export type WeatherIconType = {
  night: Record<WeatherType, any>;
  day: Record<WeatherType, any>;
};

export interface CurrentWeatherResponse {
  success: string;
  result: Result;
  records: Records;
}

export interface Result {
  resource_id: string;
  fields: Field[];
}

export interface Field {
  id: string;
  type: string;
}

export interface Records {
  Station: Station[];
}

export interface Station {
  StationName: string;
  StationId: string;
  ObsTime: ObsTime;
  GeoInfo: GeoInfo;
  WeatherElement: WeatherElement;
}

export interface ObsTime {
  DateTime: string;
}

export interface GeoInfo {
  Coordinates: Coordinate[];
  StationAltitude: string;
  CountyName: string;
  TownName: string;
  CountyCode: string;
  TownCode: string;
}

export interface Coordinate {
  CoordinateName: string;
  CoordinateFormat: string;
  StationLatitude: number;
  StationLongitude: number;
}

export interface WeatherElement {
  Weather: string;
  VisibilityDescription: string;
  SunshineDuration: number;
  Now: Now;
  WindDirection: number;
  WindSpeed: number;
  AirTemperature: number;
  RelativeHumidity: number;
  AirPressure: number;
  UVIndex: number;
  Max10MinAverage: Max10MinAverage;
  GustInfo: GustInfo;
  DailyExtreme: DailyExtreme;
}

export interface Now {
  Precipitation: number;
}

export interface Max10MinAverage {
  WindSpeed: number;
  Occurred_at: OccurredAt;
}

export interface OccurredAt {
  WindDirection: number;
  DateTime: string;
}

export interface GustInfo {
  PeakGustSpeed: number;
  Occurred_at: OccurredAt2;
}

export interface OccurredAt2 {
  WindDirection: number;
  DateTime: string;
}

export interface DailyExtreme {
  DailyHigh: DailyHigh;
  DailyLow: DailyLow;
}

export interface DailyHigh {
  TemperatureInfo: TemperatureInfo;
}

export interface TemperatureInfo {
  AirTemperature: number;
  Occurred_at: OccurredAt3;
}

export interface OccurredAt3 {
  DateTime: string;
}

export interface DailyLow {
  TemperatureInfo: TemperatureInfo2;
}

export interface TemperatureInfo2 {
  AirTemperature: number;
  Occurred_at: OccurredAt4;
}

export interface OccurredAt4 {
  DateTime: string;
}
