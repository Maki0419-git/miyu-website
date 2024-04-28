import dayjs, { Dayjs } from "dayjs";
import { WeatherElement } from "../types";

type WeatherCardType = {
  startTime: Dayjs;
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

export default function createWeatherCardList(
  weatherElement: WeatherElement[]
): WeatherCardType[] {
  const weatherCardList: WeatherCardType[] = weatherElement.reduce(
    (acc, current) => {
      const { elementName, time } = current;
      if (elementName === "CI") return acc;
      time.forEach((time, index) => {
        if (!acc[index])
          acc[index] = {
            startTime: dayjs(time.startTime),
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

  return weatherCardList;
}
