"use client";
import useSWR from "swr";
import { CityResponseType } from "../types";
import { DOMAIN } from "@/app/api/const";

export default function useCity(query: string) {
	const { data, error, isLoading } = useSWR<CityResponseType, Error>(
		query !== "" ? ["api/city", query] : null,
		([url, query]) => fetch(`${DOMAIN}${url}?q=${query}`).then((res) => res.json()),
		{
			revalidateIfStale: false,
			revalidateOnFocus: false,
			revalidateOnReconnect: false,
		},
	);

	console.log({ query, data, error, isLoading });

	return {
		cities: data?.cities || [],
		isError: error,
		isLoading,
	};
}
