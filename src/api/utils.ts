import 'dotenv/config';
import { HttpError, JSONError, NetworkError, TimeoutError } from '../error.ts';

export const fetchWrapper = async <T>(url: URL): Promise<T> => {
	const controller = new AbortController();
	const timeoutId = setTimeout(
		() => controller.abort(),
		Number(process.env.TIMEOUT),
	);
	let responce: Response;
	try {
		responce = await fetch(url, { signal: controller.signal });
		clearTimeout(timeoutId);
	} catch (error) {
		if (!(error instanceof Error)) throw error;
		if (error.name === 'AbortError')
			throw new TimeoutError('Превышено время ожидания');
		else if (error.name === 'SyntaxError') throw new JSONError('Битый JSON');
		throw new NetworkError('Проблема с сетью');
	}
	if (!responce.ok) {
		if (responce.status >= 500) {
			throw new HttpError(responce.status, 'Проблема с сервером');
		}
		throw new HttpError(responce.status, 'Проблема со стороны клиента');
	}
	return responce.json() as T;
};
