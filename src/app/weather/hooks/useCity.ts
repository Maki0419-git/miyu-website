"use client";
import useSWR, { Middleware, SWRHook } from "swr";
import { CityResponseType } from "../types";
import { useRef, useEffect, useCallback } from "react";

const laggy: Middleware = (useSWRNext: SWRHook) => {
  return (key, fetcher, config) => {
    // Actual SWR hook.
    const swr = useSWRNext(key, fetcher, config);
    // Use a ref to store previous returned data.
    const laggyDataRef = useRef<typeof swr.data>();

    useEffect(() => {
      // Update ref if data is not undefined.
      if (swr.data !== undefined) {
        laggyDataRef.current = swr.data;
      }
    }, [swr.data]);

    // Expose a method to clear the laggy data, if any.
    const resetLaggy = useCallback(() => {
      laggyDataRef.current = undefined;
    }, []);

    // Fallback to previous data if the current data is undefined.
    const dataOrLaggyData =
      swr.data === undefined ? laggyDataRef.current : swr.data;

    // Is it showing previous data?
    const isLagging =
      swr.data === undefined && laggyDataRef.current !== undefined;

    // Also add a `isLagging` field to SWR.
    return Object.assign({}, swr, {
      data: dataOrLaggyData,
      isLagging,
      resetLaggy,
    });
  };
};

export default function useCity(shouldFetch: boolean, query: string) {
  console.log({ shouldFetch, query });
  const { data, error, isLoading } = useSWR<CityResponseType, Error>(
    shouldFetch ? ["api/city", query] : null,
    ([url, query]) =>
      fetch(`http://localhost:3000/${url}?q=${query}`).then((res) =>
        res.json()
      ),
    {
      use: [laggy],
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return {
    cities: data?.cities || [],
    isError: error,
    isLoading,
  };
}
