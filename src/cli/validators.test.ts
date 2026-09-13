import { describe, expect, it } from 'vitest';
import { parseCity, parseDays } from './validators.ts';

describe('parseDays', () => {
	it('возвращает число, если оно в допустимом диапазоне 1-7', () => {
		expect(parseDays('5')).toBe(5);
	});

	it('бросает ошибку, если число вне диапазона 1-7', () => {
		expect(() => parseDays('10')).toThrow(
			'Количество дней должно быть число между 1 и 7.',
		);
	});

	it('бросает ошибку, если значение не число', () => {
		expect(() => parseDays('fwfw')).toThrow('Не число.');
	});
});

describe('parseCity', () => {
	it('разбивает список городов через запятую на массив', () => {
		expect(parseCity('Москва,Нижний Новгород')).toStrictEqual([
			'Москва',
			'Нижний Новгород',
		]);
	});

	it('бросает ошибку на пустой строке', () => {
		expect(() => parseCity('')).toThrow('Введено пустое значение города.');
	});
});
