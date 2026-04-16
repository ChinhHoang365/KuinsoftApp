import axios from 'services/axios.customize';

export const loginAPI = (username: string, password: string, locationid: number) => {
    const urlBackend = "/api/Users/Login/Users"

    return axios.post<IBackendRes<ILogin>>(urlBackend, { username, password , locationid})
}

export const userSearchAPI = (username: string) => {
    const urlBackend = "/api/Users/UserSearch"
    return axios.get<IBackendRes<IFetchAccount>>(urlBackend,  { username })
}