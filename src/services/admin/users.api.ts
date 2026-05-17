import axios from 'services/axios.customize';

export const loginAPI = (username: string, password: string, locationId: number) => {
    const urlBackend = "/api/Users/Login/Users"

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

export const studentSearchAPI = (studentName: string, studentCode: string, studentPhoneNum: string, studentClassCode: string) => {
  const urlBackend =  "/api/Students/StudentSearch"
   return axios.get<IBackendRes<IStudentSearchResult>>(urlBackend, { params: { studentName, studentCode, studentPhoneNum, studentClassCode } })

}

