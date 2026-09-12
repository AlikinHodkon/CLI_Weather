export type forecastRespondType = {
	latitude: number;
	longitude: number;
	generationtime_ms: number;
	utc_offset_seconds: number;
	timezone: string;
	timezone_abbreviation: string;
	elevation: number;
	daily_units: {
		time: string;
		temperature_2m_max: string;
		temperature_2m_min: string;
		precipitation_sum: string;
	};
	daily: {
		time: string[];
		temperature_2m_max: number[];
		temperature_2m_min: number[];
		precipitation_sum: number[];
	};
};

export type geocodingRespondType = {
	results: [
		{
			id: number;
			name: string;
			latitude: number;
			longitude: number;
			elevation: number;
			feature_code: string;
			country_code: string;
			admin1_id: number;
			timezone: string;
			population: number;
			country_id: number;
			country: string;
			admin1: string;
		},
	];
	generationtime_ms: number;
};
