import { describe, expect, it, vi } from 'vitest';
import { HttpError } from '../error.ts';
import { fetchWrapper } from './utils.ts';

describe('fetchWrapper', () => {
	it('возвращает распарсенные данные при успешном ответе', async () => {
		const mockData = {
			results: [
				{ latitude: 55.75, longitude: 37.6, country: 'Россия', name: 'Москва' },
			],
		};
		global.fetch = vi
			.fn()
			.mockResolvedValueOnce(
				new Response(JSON.stringify(mockData), { status: 200 }),
			);

		const result = await fetchWrapper(new URL('https://example.com'));
		expect(result).toEqual(mockData);
	});

	it('бросает HttpError при статусе 4xx', async () => {
		const mockError = { reason: 'Invalid parameters', error: true };
		global.fetch = vi
			.fn()
			.mockResolvedValueOnce(
				new Response(JSON.stringify(mockError), { status: 400 }),
			);

		await expect(fetchWrapper(new URL('https://example.com'))).rejects.toThrow(
			HttpError,
		);
	});

	it('бросает HttpError при статусе 5xx', async () => {
		global.fetch = vi
			.fn()
			.mockResolvedValueOnce(
				new Response(JSON.stringify({ error: true }), { status: 500 }),
			);

		await expect(fetchWrapper(new URL('https://example.com'))).rejects.toThrow(
			HttpError,
		);
	});

	it('сохраняет исходный статус в HttpError', async () => {
		global.fetch = vi
			.fn()
			.mockResolvedValueOnce(new Response('{}', { status: 404 }));

		try {
			await fetchWrapper(new URL('https://example.com'));
			expect.fail('должна была выброситься ошибка');
		} catch (error) {
			expect(error).toBeInstanceOf(HttpError);
			expect((error as HttpError).status).toBe(404);
		}
	});
});
