import axios from '../axios.customize';

// ─── REPORTS - EDUCATION ──────────────────────────────────────────────
export const getListStudentRegisteredAPI = (params?: any) =>
    axios.get('/api/Reports/ListStudentRegistered', { params });

export const getStudyOverviewAPI = (studentID: number) =>
    axios.get(`/api/Reports/StudyOverview?studentID=${studentID}`);

export const getStudentInfoReportAPI = (params?: any) =>
    axios.get('/api/Reports/Students/StudentInfo', { params });

export const getStudentAttendanceAPI = (params?: any) =>
    axios.get('/api/Reports/Students/Attendance', { params });

export const getTestResultReportAPI = (params?: any) =>
    axios.get('/api/Reports/Classes/TestResult', { params });

export const getUpComingBirthdayAPI = (LocationID: number, nextDays: number) =>
    axios.get(`/api/Reports/UpComingBirthday?LocationID=${LocationID}&nextDays=${nextDays}`);

export const getStudentAbsentReportAPI = (params?: any) =>
    axios.get('/api/Reports/StudentAbsentReport', { params });

export const getHomeworkStatusReportAPI = (params?: any) =>
    axios.get('/api/Reports/HomeworkStatus_ByLocationAndDate', { params });

// ─── REPORTS - FINANCE ────────────────────────────────────────────────
export const getRevenueByLocationAndYearAPI = (pLocationID: number, pYear: number) =>
    axios.get(`/api/Reports/RevenueByLocationAndYear?pLocationID=${pLocationID}&pYear=${pYear}`);

export const getDailyCashAPI = (LocationID: number, FromDate: string, ToDate: string) =>
    axios.get(`/api/Reports/DailyCash?LocationID=${LocationID}&FromDate=${FromDate}&ToDate=${ToDate}`);

export const getCashJournalSummaryAPI = (LocationID: number, FromDate: string, ToDate: string) =>
    axios.get(`/api/Reports/CashJournalReport_Summary?LocationID=${LocationID}&FromDate=${FromDate}&ToDate=${ToDate}`);

export const getCashJournalDetailAPI = (LocationID: number, FromDate: string, ToDate: string) =>
    axios.get(`/api/Reports/CashJournalReport_Detail?LocationID=${LocationID}&FromDate=${FromDate}&ToDate=${ToDate}`);

export const getOutstandingPaymentReportAPI = (pLocationID: number) =>
    axios.get(`/api/Reports/OutstandingPaymentReport?pLocationID=${pLocationID}`);

export const getOutstandingPaymentByDueDateAPI = (params?: any) =>
    axios.get('/api/Reports/OutstandingPaymentbyDueDate', { params });

// ─── REPORTS - KPI & SALES ────────────────────────────────────────────
export const getKPISalesAPI = (params?: any) =>
    axios.get('/api/Reports/KPISales', { params });

export const getKPIRevenueAPI = (params?: any) =>
    axios.get('/api/Reports/KPIRevenue', { params });

export const getKPIOverViewAPI = (params?: any) =>
    axios.get('/api/Reports/KPIOverView', { params });

export const getSalesReportDetailAPI = (params?: any) =>
    axios.get('/api/Reports/SalesReportDetail', { params });

export const getTelesalesReportAPI = (params?: any) =>
    axios.get('/api/Reports/telesales', { params });

export const getVisitAndRegisterAPI = (params?: any) =>
    axios.get('/api/Reports/VisitAndRegister', { params });

// ─── REPORTS - UPDATES (PUT) ──────────────────────────────────────────
export const updateStoppedStudentNote = (data: any) =>
    axios.put('/api/Reports/StoppedStudentReportUpdateNote', data);

export const updateOutstandingPaymentNote = (data: any) =>
    axios.put('/api/Reports/OutstandingPaymentReportUpdateNote', data);

export const updateStudentAttendanceNote = (data: any) =>
    axios.put('/api/Reports/StudentAttendaceReportUpdateNote', data);

export const updateHomeworkNote = (data: any) =>
    axios.put('/api/Reports/StudentHomeWorkUpdateNote', data);
