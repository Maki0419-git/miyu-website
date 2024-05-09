import DayCloudy from "../../../../assets/weather/cloudy.svg"
import DayRainy from "../../../../assets/weather/rainy.svg"
import DaySnowy from "../../../../assets/weather/snowy.svg"
import DayThunder from "../../../../assets/weather/thunder.svg"
import DayClear from "../../../../assets/weather/clear.svg"
import DayFoggy from "../../../../assets/weather/foggy.svg"
import NightCloudy from "../../../../assets/weather/nightCloudy.svg"
import NightRainy from "../../../../assets/weather/nightRainy.svg"
import NightThunder from "../../../../assets/weather/nightThunder.svg"
import NightClear from "../../../../assets/weather/nightClear.svg"
import NightFoggy from "../../../../assets/weather/nightFoggy.svg"

export const WEATHER_ICON = {
	night: {
		THUNDER: <NightThunder width={80} height={80} viewBox={"0 0 512 512"} />,
		CLEAR: <NightClear width={80} height={80} viewBox={"0 0 512 512"} />,
		FOGGY: <NightFoggy width={80} height={80} viewBox={"0 0 512 512"} />,
		CLOUDY: <NightCloudy width={80} height={80} viewBox={"0 0 512 512"} />,
		RAINY: <NightRainy width={80} height={80} viewBox={"0 0 512 512"} />,
		SNOWY: <NightCloudy width={80} height={80} viewBox={"0 0 512 512"} />,
	},
	day: {
		THUNDER: <DayThunder width={80} height={80} viewBox={"0 0 512 512"} />,
		CLEAR: <DayClear width={80} height={80} viewBox={"0 0 512 512"} />,
		FOGGY: <DayFoggy width={80} height={80} viewBox={"0 0 512 512"} />,
		CLOUDY: <DayCloudy width={80} height={80} viewBox={"0 0 512 512"} />,
		RAINY: <DayRainy width={80} height={80} viewBox={"0 0 512 512"} />,
		SNOWY: <DaySnowy width={80} height={80} viewBox={"0 0 512 512"} />,
	},
}
