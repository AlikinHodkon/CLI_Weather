import { getForecast, getLatLong } from '../api/index.ts';
import { MissingCityError } from '../error.ts';

export const getCityAndForecastData = async (city: string, days: number) => {
	try {
		const data = await getLatLong(city);
		if (data.results) {
			const result = data.results[0];
			return {
				forecastData: await getForecast(
					result.latitude,
					result.longitude,
					days,
				),
				country: result.country,
				name: result.name,
			};
		} else throw new MissingCityError('Город не найден');
	} catch (error) {
		if (error instanceof Error) error.message = `[${city}] ${error.message}`;
		throw error;
	}
};
