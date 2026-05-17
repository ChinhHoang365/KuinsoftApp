import axios from 'services/axios.customize';

export const studentSearchAPI = (studentName: string, studentCode: string, studentPhoneNum: string, studentClassCode: string) => {
  const urlBackend =  "/api/Students/StudentSearch"
   return axios.get<IBackendRes<IStudentSearchResult>>(urlBackend, { params: { studentName, studentCode, studentPhoneNum, studentClassCode } })

}