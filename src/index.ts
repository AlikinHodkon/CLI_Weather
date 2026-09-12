import { getForecast, getLatLong } from './api/index.ts';

const data = await getLatLong('Москва');
const result = data.results[0];
console.log(await getForecast(result.latitude, result.longitude));
