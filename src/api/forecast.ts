import 'dotenv/config';
import type { forecastRespondType } from '../types.js';
import { fetchWrapper } from './utils.ts';

export const getForecast = async (
	lat: number,
	long: number,
	days = 3,
): Promise<forecastRespondType> => {
	const url = new URL('forecast', process.env.BASE_FORECAST_URL);
	url.searchParams.set('latitude', lat.toString());
	url.searchParams.set('longitude', long.toString());
	url.searchParams.set(
		'daily',
		'temperature_2m_max,temperature_2m_min,precipitation_sum',
	);
	url.searchParams.set('forecast_days', days.toString());
	url.searchParams.set('timezone', 'auto');
	return await fetchWrapper<forecastRespondType>(url);
};
