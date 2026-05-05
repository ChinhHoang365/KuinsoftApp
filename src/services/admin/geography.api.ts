import axios from '../axios.customize';

// ─── GEOGRAPHY - NATIONALITIES & LOCATIONS ──────────────────────────
export const getCountriesAPI = () =>
    axios.get('/api/Nationalities/Countries');

export const getCitiesAPI = () =>
    axios.get('/api/Nationalities/Cities');

export const getDistrictsAPI = () =>
    axios.get('/api/Nationalities/Districts');

export const getDistrictsByCityAPI = (cityID: number) =>
    axios.get(`/api/Nationalities/Districts/DistrictByCity?cityID=${cityID}`);
