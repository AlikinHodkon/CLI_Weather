import 'dotenv/config';
import type { forecastRespondType } from '../types.js';

export const getForecast = async (
	lat: number,
	long: number,
	days = 3,
): Promise<forecastRespondType> => {
	const responce = await fetch(
		`${process.env.BASE_FORECAST_URL}/forecast?latitude=${lat}&longitude=${long}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&forecast_days=${days}&timezone=auto`,
	);
	return responce.json() as Promise<forecastRespondType>;
};
