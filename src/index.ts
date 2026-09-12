import { Command, InvalidArgumentError } from 'commander';
import {
	HttpError,
	JSONError,
	MissingCityError,
	NetworkError,
	TimeoutError,
} from './error.ts';
import { getCityAndForecastData } from './services/index.ts';

const program = new Command();

const parseDays = (value: string) => {
	const day = Number.parseInt(value, 10);
	if (Number.isNaN(day)) throw new InvalidArgumentError('Не число.');
	if (day >= 1 && day <= 7) {
		return day;
	} else
		throw new InvalidArgumentError(
			'Количество дней должно быть число между 1 и 7.',
		);
};

const parseCity = (value: string) => {
	if (value === '')
		throw new InvalidArgumentError('Введено пустое значение города.');
	const citys = value.split(',');
	return citys;
};

program
	.requiredOption('--city <value>', 'обязательный параметр', parseCity)
	.option(
		'--days <number>',
		'необязательный параметр с дефолтом',
		parseDays,
		3,
	);

program.parse();

const { days, city } = program.opts();

const results = await Promise.allSettled(
	city.map(async (city: string) => getCityAndForecastData(city, days)),
);

for (const result of results) {
	if (result.status === 'rejected') {
		const error = result.reason;
		if (error instanceof TimeoutError) console.log(error.message);
		else if (error instanceof NetworkError) console.log(error.message);
		else if (error instanceof JSONError) console.log(error.message);
		else if (error instanceof MissingCityError) console.log(error.message);
		else if (error instanceof HttpError)
			console.log(error.status, error.message);
		process.exit(1);
	} else {
		console.log(result); // вызов formatterа
	}
}
