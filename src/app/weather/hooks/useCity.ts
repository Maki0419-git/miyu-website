"use client";
import useSWR from "swr";
import { CityResponseType } from "../types";

export default function useCity(query: string) {
  const { data, error, isLoading } = useSWR<CityResponseType, Error>(
    query !== "" ? ["api/city", query] : null,
    ([url, query]) =>
      fetch(`http://localhost:3000/${url}?q=${query}`).then((res) =>
        res.json()
      ),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  console.log({ query, data, error, isLoading });

  return {
    cities: data?.cities || [],
    isError: error,
    isLoading,
  };
}
