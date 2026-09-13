import { InvalidArgumentError } from 'commander';

export const parseDays = (value: string) => {
	const day = Number.parseInt(value, 10);
	if (Number.isNaN(day)) throw new InvalidArgumentError('Не число.');
	if (day >= 1 && day <= 7) {
		return day;
	} else
		throw new InvalidArgumentError(
			'Количество дней должно быть число между 1 и 7.',
		);
};

export const parseCity = (value: string) => {
	if (value === '')
		throw new InvalidArgumentError('Введено пустое значение города.');
	const citys = value.split(',');
	return citys;
};
