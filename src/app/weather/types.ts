export enum WeatherAPI {
	CURRENT_WEATHER = "O-A0003-001",
	THIRTY_SIX_HOURS_WEATHER = "F-C0032-001",
	SUNRISE_SUNSET_TIME = "A-B0062-001",
}

export type CityResponseType = Record<"cities", string[]>

export enum Weather {
	CLEAR = "晴",
	CLOUDY = "多雲",
	RAINY = "雨",
	THUNDER = "雷雨",
	SNOWY = "雪",
	FOGGY = "霧",
}

export type WeatherType = keyof typeof Weather
export type WeatherCodeType = Record<WeatherType, number[]>
export type WeatherDetailType = Record<WeatherType, string[]>
export type WeatherTypeData = WeatherCodeType | WeatherDetailType
export type WeatherIconType = {
	night: Record<WeatherType, any>
	day: Record<WeatherType, any>
}

export type WeatherApiAlias = keyof typeof WeatherAPI
type WeatherApiRecordTypes = {
	[k in WeatherApiAlias]: k extends "CURRENT_WEATHER"
		? CurrentWeatherRecords
		: k extends "THIRTY_SIX_HOURS_WEATHER"
			? ThreeSixHoursWeatherRecords
			: k extends "SUNRISE_SUNSET_TIME"
				? SunriseSunsetTimeRecords
				: never
}

export interface WeatherAPIResponse<T extends keyof WeatherApiRecordTypes> {
	success: string
	result: Result
	records: WeatherApiRecordTypes[T]
}

export interface Result {
	resource_id: string
	fields: Field[]
}

export interface Field {
	id: string
	type: string
}

export interface CurrentWeatherRecords {
	Station: Station[]
}

export interface Station {
	StationName: string
	StationId: string
	ObsTime: ObsTime
	GeoInfo: GeoInfo
	WeatherElement: WeatherElement
}

export interface ObsTime {
	DateTime: string
}

export interface GeoInfo {
	Coordinates: Coordinate[]
	StationAltitude: string
	CountyName: string
	TownName: string
	CountyCode: string
	TownCode: string
}

export interface Coordinate {
	CoordinateName: string
	CoordinateFormat: string
	StationLatitude: number
	StationLongitude: number
}

export interface WeatherElement {
	Weather: string
	VisibilityDescription: string
	SunshineDuration: number
	Now: Now
	WindDirection: number
	WindSpeed: number
	AirTemperature: number
	RelativeHumidity: number
	AirPressure: number
	UVIndex: number
	Max10MinAverage: Max10MinAverage
	GustInfo: GustInfo
	DailyExtreme: DailyExtreme
}

export interface Now {
	Precipitation: number
}

export interface Max10MinAverage {
	WindSpeed: number
	Occurred_at: OccurredAt
}

export interface OccurredAt {
	WindDirection: number
	DateTime: string
}

export interface GustInfo {
	PeakGustSpeed: number
	Occurred_at: OccurredAt2
}

export interface OccurredAt2 {
	WindDirection: number
	DateTime: string
}

export interface DailyExtreme {
	DailyHigh: DailyHigh
	DailyLow: DailyLow
}

export interface DailyHigh {
	TemperatureInfo: TemperatureInfo
}

export interface TemperatureInfo {
	AirTemperature: number
	Occurred_at: OccurredAt3
}

export interface OccurredAt3 {
	DateTime: string
}

export interface DailyLow {
	TemperatureInfo: TemperatureInfo2
}

export interface TemperatureInfo2 {
	AirTemperature: number
	Occurred_at: OccurredAt4
}

export interface OccurredAt4 {
	DateTime: string
}

export interface ThreeSixHoursWeatherRecords {
	datasetDescription: string
	location: ThreeSixHoursWeatherLocation[]
}

export interface ThreeSixHoursWeatherLocation {
	locationName: string
	weatherElement: WeatherElement[]
}

export interface WeatherElement {
	elementName: string
	time: ThreeSixHoursWeatherTime[]
}

export interface ThreeSixHoursWeatherTime {
	startTime: string
	endTime: string
	parameter: Parameter
}

export interface Parameter {
	parameterName: string
	parameterValue?: string
	parameterUnit?: string
}

export interface SunriseSunsetTimeRecords {
	dataid: string
	note: string
	locations: SunriseSunsetTimeLocations
}

export interface SunriseSunsetTimeLocations {
	location: SunriseSunsetTimeLocation[]
}

export interface SunriseSunsetTimeLocation {
	time: SunriseSunsetTime[]
	CountyName: string
}

export interface SunriseSunsetTime {
	Date: string
	BeginCivilTwilightTime: string
	SunRiseTime: string
	SunRiseAZ: string
	SunTransitTime: string
	SunTransitAlt: string
	SunSetTime: string
	SunSetAZ: string
	EndCivilTwilightTime: string
}
