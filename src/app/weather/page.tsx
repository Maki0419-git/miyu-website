import CurrentWeather from "./CurrentWeather";
import ThirtySixHoursWeather from "./ThirtySixHoursWeather";

export default function WeatherPage() {
  return (
    <>
      <h1>Weather Page</h1>
      <CurrentWeather />
      <ThirtySixHoursWeather />
    </>
  );
}
