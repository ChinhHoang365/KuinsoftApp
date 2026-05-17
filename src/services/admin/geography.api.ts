import axios from 'services/axios.customize';

// ─── GEOGRAPHY - NATIONALITIES & LOCATIONS ──────────────────────────
export const getCountriesAPI = () => {
    const urlBackend = '/api/Nationalities/Countries';
    return axios.get(urlBackend);
};

export const getCitiesAPI = () => {
    const urlBackend = '/api/Nationalities/Cities';
    return axios.get(urlBackend);
};

export const getDistrictsAPI = () => {
    const urlBackend = '/api/Nationalities/Districts';
    return axios.get(urlBackend);
};

export const getDistrictsByCityAPI = (cityID: number) => {
    const urlBackend = `/api/Nationalities/Districts/DistrictByCity?cityID=${cityID}`;
    return axios.get(urlBackend);
};
