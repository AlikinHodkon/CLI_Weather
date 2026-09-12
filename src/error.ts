export class TimeoutError extends Error {
	constructor(message: string) {
		super(message);
	}
}
export class NetworkError extends Error {
	constructor(message: string) {
		super(message);
	}
}
export class HttpError extends Error {
	constructor(
		public status: number,
		message: string,
	) {
		super(message);
	}
}
export class JSONError extends Error {
	constructor(message: string) {
		super(message);
	}
}
export class MissingCityError extends Error {
	constructor(message: string) {
		super(message);
	}
}
