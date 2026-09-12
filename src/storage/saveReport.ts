import { writeFile } from 'node:fs/promises';
import type { forecastRespondType } from '../types.ts';
import { getReportFilePath } from './utils.ts';

export const saveReport = async (
	data: {
		forecastData: forecastRespondType;
		country: string;
		name: string;
	},
	city: string,
) => {
	const filePath = await getReportFilePath(city);
	await writeFile(filePath, JSON.stringify(data, null, 2));
};
