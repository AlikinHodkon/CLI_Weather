import { getForecast, getLatLong } from '../api/index.ts';
import { MissingCityError } from '../error.ts';

export const getCityAndForecastData = async (city: string, days: number) => {
	const data = await getLatLong(city);
	if (data.results) {
		const result = data.results[0];
		return await getForecast(result.latitude, result.longitude, days);
	} else throw new MissingCityError('Город не найден');
};
