import axios from 'services/axios.customize';

// ─── REPORTS - EDUCATION ──────────────────────────────────────────────
export const getListStudentRegisteredAPI = (params?: any) => {
    const urlBackend = '/api/Reports/ListStudentRegistered';
    return axios.get(urlBackend, { params });
};

export const getStudyOverviewAPI = (studentID: number) => {
    const urlBackend = `/api/Reports/StudyOverview?studentID=${studentID}`;
    return axios.get(urlBackend);
};

export const getStudentInfoReportAPI = (params?: any) => {
    const urlBackend = '/api/Reports/Students/StudentInfo';
    return axios.get(urlBackend, { params });
};

export const getStudentAttendanceAPI = (params?: any) => {
    const urlBackend = '/api/Reports/Students/Attendance';
    return axios.get(urlBackend, { params });
};

export const getTestResultReportAPI = (params?: any) => {
    const urlBackend = '/api/Reports/Classes/TestResult';
    return axios.get(urlBackend, { params });
};

export const getUpComingBirthdayAPI = (LocationID: number, nextDays: number) => {
    const urlBackend = `/api/Reports/UpComingBirthday?LocationID=${LocationID}&nextDays=${nextDays}`;
    return axios.get(urlBackend);
};

export const getStudentAbsentReportAPI = (params?: any) => {
    const urlBackend = '/api/Reports/StudentAbsentReport';
    return axios.get(urlBackend, { params });
};

export const getHomeworkStatusReportAPI = (params?: any) => {
    const urlBackend = '/api/Reports/HomeworkStatus_ByLocationAndDate';
    return axios.get(urlBackend, { params });
};

// ─── REPORTS - FINANCE ────────────────────────────────────────────────
export const getRevenueByLocationAndYearAPI = (pLocationID: number, pYear: number) => {
    const urlBackend = `/api/Reports/RevenueByLocationAndYear?pLocationID=${pLocationID}&pYear=${pYear}`;
    return axios.get(urlBackend);
};

export const getDailyCashAPI = (LocationID: number, FromDate: string, ToDate: string) => {
    const urlBackend = `/api/Reports/DailyCash?LocationID=${LocationID}&FromDate=${FromDate}&ToDate=${ToDate}`;
    return axios.get(urlBackend);
};

export const getCashJournalSummaryAPI = (LocationID: number, FromDate: string, ToDate: string) => {
    const urlBackend = `/api/Reports/CashJournalReport_Summary?LocationID=${LocationID}&FromDate=${FromDate}&ToDate=${ToDate}`;
    return axios.get(urlBackend);
};

export const getCashJournalDetailAPI = (LocationID: number, FromDate: string, ToDate: string) => {
    const urlBackend = `/api/Reports/CashJournalReport_Detail?LocationID=${LocationID}&FromDate=${FromDate}&ToDate=${ToDate}`;
    return axios.get(urlBackend);
};

export const getOutstandingPaymentReportAPI = (pLocationID: number) => {
    const urlBackend = `/api/Reports/OutstandingPaymentReport?pLocationID=${pLocationID}`;
    return axios.get(urlBackend);
};

export const getOutstandingPaymentByDueDateAPI = (params?: any) => {
    const urlBackend = '/api/Reports/OutstandingPaymentbyDueDate';
    return axios.get(urlBackend, { params });
};

// ─── REPORTS - KPI & SALES ────────────────────────────────────────────
export const getKPISalesAPI = (params?: any) => {
    const urlBackend = '/api/Reports/KPISales';
    return axios.get(urlBackend, { params });
};

export const getKPIRevenueAPI = (params?: any) => {
    const urlBackend = '/api/Reports/KPIRevenue';
    return axios.get(urlBackend, { params });
};

export const getKPIOverViewAPI = (params?: any) => {
    const urlBackend = '/api/Reports/KPIOverView';
    return axios.get(urlBackend, { params });
};

export const getSalesReportDetailAPI = (params?: any) => {
    const urlBackend = '/api/Reports/SalesReportDetail';
    return axios.get(urlBackend, { params });
};

export const getTelesalesReportAPI = (params?: any) => {
    const urlBackend = '/api/Reports/telesales';
    return axios.get(urlBackend, { params });
};

export const getVisitAndRegisterAPI = (params?: any) => {
    const urlBackend = '/api/Reports/VisitAndRegister';
    return axios.get(urlBackend, { params });
};

// ─── REPORTS - UPDATES (PUT) ──────────────────────────────────────────
export const updateStoppedStudentNote = (data: any) => {
    const urlBackend = '/api/Reports/StoppedStudentReportUpdateNote';
    return axios.put(urlBackend, data);
};

export const updateOutstandingPaymentNote = (data: any) => {
    const urlBackend = '/api/Reports/OutstandingPaymentReportUpdateNote';
    return axios.put(urlBackend, data);
};

export const updateStudentAttendanceNote = (data: any) => {
    const urlBackend = '/api/Reports/StudentAttendaceReportUpdateNote';
    return axios.put(urlBackend, data);
};

export const updateHomeworkNote = (data: any) => {
    const urlBackend = '/api/Reports/StudentHomeWorkUpdateNote';
    return axios.put(urlBackend, data);
};
