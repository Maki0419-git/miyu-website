import { WeatherCodeType, WeatherDetailType } from "./types"

export const WEATHER_API_BASE_URL: string = "https://opendata.cwa.gov.tw/api/v1/rest/datastore"
export const UNSPLASH_API_BASE_URL: string = "https://api.unsplash.com/photos/random"

export const WEATHER_CODE: WeatherCodeType = {
	THUNDER: [15, 16, 17, 18, 21, 22, 33, 34, 35, 36, 41],
	CLEAR: [0, 1],
	FOGGY: [24, 25, 26, 27, 28],
	CLOUDY: [2, 3, 4, 5, 6, 7],
	RAINY: [8, 9, 10, 11, 12, 13, 14, 19, 20, 29, 30, 31, 32, 38, 39],
	SNOWY: [23, 37, 42],
}

export const WEATHER_DETAIL: WeatherDetailType = {
	THUNDER: ["晴有雷雨", "晴大雷雨", "多雲有雷雨", "多雲大雷雨", "陰有雷雨", "陰有大雷雨"],
	CLEAR: ["晴"],
	FOGGY: ["晴有霧", "多雲有霧", "陰有霧"],
	CLOUDY: ["陰", "多雲", "多雲有雨", "多雲有雹", "多雲有雷", "陰有雷", "陰有靄", "多雲有靄"],
	RAINY: ["晴有雨", "晴有陣雨", "多雲有陣雨", "陰有雨", "陰有陣雨"],
	SNOWY: ["多雲有雨雪", "多雲有大雪", "多雲陣雨雪", "陰有雨雪", "陰有大雪", "陰陣雨雪"],
}
