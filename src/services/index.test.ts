vi.mock('../api/index.ts');
vi.mock('../storage/index.ts');

import { expect, it, vi } from 'vitest';
import { getForecast, getLatLong } from '../api/index.ts';
import { MissingCityError } from '../error.ts';
import { getCityAndForecastData } from './index.ts';

it('бросает MissingCityError, если results отсутствует', async () => {
	vi.mocked(getLatLong).mockResolvedValueOnce({
		generationtime_ms: 0.08,
	});

	await expect(getCityAndForecastData('Асдкйаскйд', 3, false)).rejects.toThrow(
		MissingCityError,
	);
});

it('ошибка по одному городу не прерывает обработку остальных', async () => {
	vi.mocked(getLatLong)
		.mockResolvedValueOnce({
			results: [
				{ latitude: 55.75, longitude: 37.6, country: 'Россия', name: 'Москва' },
			],
		} as any)
		.mockResolvedValueOnce({ generationtime_ms: 0.08 });

	vi.mocked(getForecast).mockResolvedValueOnce({
		latitude: 55.75,
		longitude: 37.6,
		daily_units: {
			time: 'iso8601',
			temperature_2m_max: '°C',
			temperature_2m_min: '°C',
			precipitation_sum: 'mm',
		},
		daily: {
			time: ['2026-09-12'],
			temperature_2m_max: [17.1],
			temperature_2m_min: [9.6],
			precipitation_sum: [0],
		},
	} as any);

	const results = await Promise.allSettled([
		getCityAndForecastData('Moscow', 3, false),
		getCityAndForecastData('asdkjaskjd', 3, false),
	]);

	expect(results[0].status).toBe('fulfilled');
	expect(results[1].status).toBe('rejected');
});
