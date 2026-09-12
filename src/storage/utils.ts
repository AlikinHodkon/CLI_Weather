import 'dotenv/config';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

export const getReportFilePath = async (city: string) => {
	const dir = path.join(process.cwd(), process.env.REPORTS_DIR ?? 'reports');
	const date = new Date();
	const formatedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
	const filePath = path.join(dir, `${city.toLowerCase()}-${formatedDate}.json`);
	await mkdir(dir, { recursive: true });
	return filePath;
};
