import 'dotenv/config';
import type { geocodingRespondType } from '../types.js';

export const getLatLong = async (
	city: string,
): Promise<geocodingRespondType> => {
	const response = await fetch(
		`${process.env.BASE_GEOCODING_URL}/search?name=${city}&count=1&language=ru&format=json`,
	);
	return response.json() as Promise<geocodingRespondType>;
};
