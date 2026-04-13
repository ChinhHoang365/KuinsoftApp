import axios from 'services/axios.customize';

export const loginAPI = (username: string, password: string, locationid: number) => {
    const urlBackend = "/api/Users/Login/Users"

    return axios.post<IBackendRes<ILogin>>(urlBackend, { username, password , locationid})
}