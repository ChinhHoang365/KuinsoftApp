import axios from 'services/axios.customize';

export const loginAPI = (username: string, password: string, locationId: number) => {
    const urlBackend = "/api/Users/Login/Users"
        console.log('Login api:', { username, password, locationId });
    return axios.post<IBackendRes<ILogin>>(urlBackend, { username, password, locationId })
}

export const userSearchAPI = (username: string) => {
    const urlBackend = "/api/Users/UserSearch"
    return axios.get<IBackendRes<IFetchAccount>>(urlBackend, { params: { username } })
}

export const userMenuAPI = (userId: string, locationId: number) => {
    const urlBackend = "/api/Users/UserMenu"
    return axios.get<IBackendRes<IUserMenuMaster>>(urlBackend, { params: { userId, locationId } })
}


