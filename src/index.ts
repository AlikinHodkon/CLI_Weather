import { getForecast, getLatLong } from './api/index.ts';
import {
	HttpError,
	JSONError,
	MissingCityError,
	NetworkError,
	TimeoutError,
} from './error.ts';

try {
	const data = await getLatLong('Москва');
	if (data.results) {
		const result = data.results[0];
		console.log(await getForecast(result.latitude, result.longitude));
	} else throw new MissingCityError('Город не найден');
} catch (error) {
	if (error instanceof TimeoutError) console.log(error.message);
	else if (error instanceof NetworkError) console.log(error.message);
	else if (error instanceof JSONError) console.log(error.message);
	else if (error instanceof MissingCityError) console.log(error.message);
	else if (error instanceof HttpError) console.log(error.status, error.message);
	process.exit(1);
}
