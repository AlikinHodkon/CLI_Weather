import type { forecastRespondType } from '../types.ts';

export const formatter = (
	result: PromiseFulfilledResult<{
		forecastData: forecastRespondType;
		country: string;
		name: string;
	}>,
) => {
	const value: {
		forecastData: forecastRespondType;
		country: string;
		name: string;
	} = result.value;
	console.log(
		'Город:',
		value.name,
		' Страна:',
		value.country,
		' Ширина:',
		value.forecastData.latitude,
		' Долгота:',
		value.forecastData.longitude,
	);
	const daily = value.forecastData.daily;
	const dailyUnits = value.forecastData.daily_units;
	const table = [];
	for (let i = 0; i < daily.time.length; i++) {
		table.push({
			Дата: daily.time[i],
			'Максимальная температура': `${daily.temperature_2m_max[i]} ${dailyUnits.temperature_2m_max}`,
			'Минимальная температура': `${daily.temperature_2m_min[i]} ${dailyUnits.temperature_2m_min}`,
			'Сумма осадков': `${daily.precipitation_sum[i]} ${dailyUnits.precipitation_sum}`,
		});
	}
	console.table(table);
};
