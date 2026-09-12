import { readFile } from 'node:fs/promises';
import { getReportFilePath } from './utils.ts';

export const readCachedReport = async (city: string, days: number) => {
	const filePath = await getReportFilePath(city);
	try {
		const raw = await readFile(filePath, 'utf-8');
		const data = JSON.parse(raw);
		const daily = data.forecastData.daily;
		for (const key in daily) {
			if (!Object.hasOwn(daily, key)) continue;

			if (daily[key].length < days) return null;

			daily[key] = daily[key].slice(0, days);
		}
		return data;
	} catch {
		return null; // В случае ошибки, мы не выводим ничего пользователю, а просто делаем запрос.
	}
};
