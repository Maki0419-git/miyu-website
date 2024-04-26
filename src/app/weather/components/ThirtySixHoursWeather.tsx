import errorHandler from "@/utils/errorHandler";
import { getWeatherApiEndpoint } from "../utils/getWeatherApiEndpoint";
import { styled } from "@pigment-css/react";
import { WeatherAPIResponse } from "../types";
import { WEATHER_ICON } from "./WeatherIcon";
import { getWeatherType } from "../utils/getWeatherType";
import { WEATHER_CODE } from "../constant";
import Humidity from "../../../assets/weather/humidity.svg";
import dayjs from "dayjs";

async function getThirtySixHoursWeather(): Promise<
  WeatherAPIResponse<"THIRTY_SIX_HOURS_WEATHER">
> {
  try {
    const endpoint = getWeatherApiEndpoint("THIRTY_SIX_HOURS_WEATHER");
    const response = await fetch(
      `${endpoint}?locationName=臺北市&Authorization=${process.env.WEATHER_API_KEY}`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      errorHandler("THIRTY_SIX_HOURS_WEATHER", response.status);
    }

    const data = await response.json();

    return data;
  } catch (error: any) {
    console.log({ error });
    throw error;
  }
}

const Container = styled("div")({
  flex: 7,
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end",
  border: "1px solid red",
  h5: {
    color: "white",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
    margin: "10px 20px",
  },
});

const WeatherCardContainer = styled("div")({
  display: "flex",
  justifyContent: "flex-end",
  gap: "30px",
  padding: "0 20px",
  height: "60%",
  border: "1px solid yellow",
});

const WeatherCard = styled("div")({
  position: "relative",
  padding: "30px 20px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  border: "1px solid yellow",
  borderRadius: "10px",
  backdropFilter: "blur(5px)",
  minWidth: "250px",
  maxWidth: "300px",
  width: "30%",
  height: "100%",
  "h2,h3,h4": { fontWeight: "normal", color: "white" },
  svg: {
    width: "100px",
    height: "100px",
    margin: "10px 0 20px 0",
  },
});

const MinMaxTemperature = styled("div")({
  margin: "10px 0",
  display: "flex",
  alignItems: "center",
  gap: "5px",
  h3: {
    color: "#dbdada",
  },
});

const RainPossibility = styled("div")({
  position: "absolute",
  bottom: "0",
  left: "0",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "23%",
  gap: "5px",
  backgroundColor: "rgba(0, 0, 0, 0.3)",
  borderRadius: "0 0 10px 10px",
  svg: {
    width: "60px",
    height: "60px",
  },
});

type WeatherCardType = {
  startTime: string;
  weatherElement: {
    Wx: {
      description: string;
      code: number;
    };
    PoP: number;
    MinT: number;
    MaxT: number;
  };
};

type ThirtySixHoursWeatherProps = {
  isDayOrNight: "day" | "night";
};

export default async function ThirtySixHoursWeather({
  isDayOrNight,
}: ThirtySixHoursWeatherProps) {
  const thirtySixHoursWeatherData = await getThirtySixHoursWeather();
  const weatherElement =
    thirtySixHoursWeatherData.records.location[0].weatherElement;
  const weatherCardList: WeatherCardType[] = weatherElement.reduce(
    (acc, current) => {
      const { elementName, time } = current;
      if (elementName === "CI") return acc;
      time.forEach((time, index) => {
        if (!acc[index])
          acc[index] = {
            startTime: time.startTime,
            weatherElement: {},
          } as WeatherCardType;
        switch (elementName) {
          case "Wx":
            acc[index].weatherElement.Wx = {
              description: time.parameter.parameterName,
              code: Number(time.parameter.parameterValue as string),
            };
            break;
          case "PoP":
            acc[index].weatherElement.PoP = Number(
              time.parameter.parameterName
            );
            break;
          case "MinT":
            acc[index].weatherElement.MinT = Number(
              time.parameter.parameterName
            );
            break;
          case "MaxT":
            acc[index].weatherElement.MaxT = Number(
              time.parameter.parameterName
            );
            break;
        }
      });

      return acc;
    },
    [] as WeatherCardType[]
  );

  console.log(thirtySixHoursWeatherData);
  console.log({ weatherCardList });

  return (
    <Container>
      <WeatherCardContainer>
        {weatherCardList.map((weatherCard, index) => (
          <WeatherCard key={index}>
            <h3>
              {dayjs(weatherCard.startTime).valueOf() < dayjs().valueOf()
                ? "Now"
                : dayjs(weatherCard.startTime).format("hh:mm A")}
            </h3>
            {
              WEATHER_ICON[isDayOrNight][
                getWeatherType(WEATHER_CODE, weatherCard.weatherElement.Wx.code)
              ]
            }
            <h4>{weatherCard.weatherElement.Wx.description}</h4>
            <MinMaxTemperature>
              <h3>{weatherCard.weatherElement.MinT}</h3>
              <h3>/</h3>
              <h2>{weatherCard.weatherElement.MaxT}°C</h2>
            </MinMaxTemperature>
            <RainPossibility>
              <Humidity />
              <div>
                <h2>{weatherCard.weatherElement.PoP}%</h2>
                <h4>降雨機率</h4>
              </div>
            </RainPossibility>
          </WeatherCard>
        ))}
      </WeatherCardContainer>
      <h5>{thirtySixHoursWeatherData.records.datasetDescription}</h5>
    </Container>
  );
}
