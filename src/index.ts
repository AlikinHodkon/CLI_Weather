import dns from 'node:dns';
import { Command } from 'commander';
import { parseCity, parseDays } from './cli/index.ts';
import {
	HttpError,
	JSONError,
	MissingCityError,
	NetworkError,
	TimeoutError,
} from './error.ts';
import { formatter } from './format/index.ts';
import { getCityAndForecastData } from './services/index.ts';
import type { forecastRespondType } from './types.ts';

dns.setDefaultResultOrder('ipv4first');

const requiredEnvVars = ['BASE_GEOCODING_URL', 'BASE_FORECAST_URL'];

for (const name of requiredEnvVars) {
	if (!process.env[name]) {
		console.error(`Отсутствует обязательная переменная окружения: ${name}`);
		process.exit(1);
	}
}

const program = new Command();

program
	.requiredOption('--city <value>', 'обязательный параметр', parseCity)
	.option('--days <number>', 'необязательный параметр с дефолтом', parseDays, 3)
	.option('--no-cache', 'необязательный параметр');

program.parse();

const { days, city, cache } = program.opts();

const results = await Promise.allSettled<
	Promise<{
		forecastData: forecastRespondType;
		country: string;
		name: string;
	}>
>(city.map(async (city: string) => getCityAndForecastData(city, days, cache)));

for (const result of results) {
	if (result.status === 'rejected') {
		const error = result.reason;
		if (error instanceof TimeoutError) console.log(error.message);
		else if (error instanceof NetworkError) console.log(error.message);
		else if (error instanceof JSONError) console.log(error.message);
		else if (error instanceof MissingCityError) console.log(error.message);
		else if (error instanceof HttpError)
			console.log(error.status, error.message);
		else
			console.log(
				'Неизвестная ошибка:',
				error instanceof Error ? error.message : error,
			);
		process.exit(1);
	} else {
		formatter(result);
	}
}
