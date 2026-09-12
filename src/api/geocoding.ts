import 'dotenv/config';
import type { geocodingRespondType } from '../types.js';
import { fetchWrapper } from './utils.ts';

export const getLatLong = async (
	city: string,
): Promise<geocodingRespondType> => {
	const url = new URL('search', process.env.BASE_GEOCODING_URL);
	url.searchParams.set('name', city);
	url.searchParams.set('count', '1');
	url.searchParams.set('language', 'ru');
	url.searchParams.set('format', 'json');
	return await fetchWrapper<geocodingRespondType>(url);
};
