import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Login from 'pages/admin/login.tsx';
import 'styles/global.css';  
import News from 'pages/client/news.tsx';
import HomePage from 'pages/home/homepage.tsx';
import { App } from 'antd';
import { AppProvider } from 'context';
import ProtectedRoute from 'components/auth';
import { AdminLayout } from 'layouts';
import StaffAbsence from 'pages/admin/administration/StaffAbsence.tsx';
import UsersPage from 'pages/admin/system/UsersPage.tsx';
import CenterDetailsPage from 'pages/admin/system/CenterDetailsPage.tsx';
import TeachersPage from 'pages/admin/hr/TeachersPage.tsx';
import CounselorsPage from 'pages/admin/hr/CounselorsPage.tsx';
import StudentsPage from 'pages/admin/students/StudentsPage.tsx';
import CoursesPage from 'pages/admin/training/CoursesPage.tsx';
import ClassesPage from 'pages/admin/training/ClassesPage.tsx';
import RoomsPage from 'pages/admin/training/RoomsPage.tsx';
import MakeUpLessonsPage from 'pages/admin/training/MakeUpLessonsPage.tsx';
import NewsPage from 'pages/admin/utilities/NewsPage.tsx';
import SideActivitiesPage from 'pages/admin/training/SideActivitiesPage.tsx';
import RecordingsPage from 'pages/admin/training/RecordingsPage.tsx';
import StudentProfilesPage from 'pages/admin/students/StudentProfilesPage.tsx';
import MonthlyCommentsPage from 'pages/admin/students/MonthlyCommentsPage.tsx';
import TestResultsPage from 'pages/admin/students/TestResultsPage.tsx';
import FeedbacksPage from 'pages/admin/students/FeedbacksPage.tsx';
import PaymentsPage from 'pages/admin/finance/PaymentsPage.tsx';
import AnnouncementsPage from 'pages/admin/utilities/AnnouncementsPage.tsx';
import ReferenceLibraryPage from 'pages/admin/utilities/ReferenceLibraryPage.tsx';
import TasksPage from 'pages/admin/utilities/TasksPage.tsx';
import AchievementRewardsPage from 'pages/admin/utilities/AchievementRewardsPage.tsx';
import ReportsPage from 'pages/admin/utilities/ReportsPage.tsx';
import AutomationPage from 'pages/admin/system/AutomationPage.tsx';
import LocationsPage from 'pages/admin/system/LocationsPage.tsx';
import NotificationsPage from 'pages/admin/utilities/NotificationsPage.tsx';
import InventoryPage from 'pages/admin/logistics/InventoryPage.tsx';
import DashboardPage from 'pages/admin/dashboard/DashboardPage.tsx';

const router = createBrowserRouter([
    {
      path: "/",
      element: <AdminLayout/>,
      children: [
        { index: true, element: <ProtectedRoute><HomePage /></ProtectedRoute> },
        { path: "admin", element: <ProtectedRoute><HomePage /></ProtectedRoute> },
        { path: "admin/dashboard", element: <ProtectedRoute><DashboardPage /></ProtectedRoute> },
        { path: "/news-client", element: <ProtectedRoute><News /></ProtectedRoute> },
        { path: "admin/administration", element: <ProtectedRoute><StaffAbsence /></ProtectedRoute> },
        { path: "admin/center-details", element: <ProtectedRoute><CenterDetailsPage /></ProtectedRoute> },
        { path: "admin/users", element: <ProtectedRoute><UsersPage /></ProtectedRoute> },
        { path: "admin/automation", element: <ProtectedRoute><AutomationPage /></ProtectedRoute> },
        { path: "admin/locations", element: <ProtectedRoute><LocationsPage /></ProtectedRoute> },
        { path: "admin/teachers", element: <ProtectedRoute><TeachersPage /></ProtectedRoute> },
        { path: "admin/counselors", element: <ProtectedRoute><CounselorsPage /></ProtectedRoute> },
        { path: "admin/students", element: <ProtectedRoute><StudentsPage /></ProtectedRoute> },
        { path: "admin/courses", element: <ProtectedRoute><CoursesPage /></ProtectedRoute> },
        { path: "admin/classes", element: <ProtectedRoute><ClassesPage /></ProtectedRoute> },
        { path: "admin/rooms", element: <ProtectedRoute><RoomsPage /></ProtectedRoute> },
        { path: "admin/makeup-lessons", element: <ProtectedRoute><MakeUpLessonsPage /></ProtectedRoute> },
        { path: "admin/news", element: <ProtectedRoute><NewsPage /></ProtectedRoute> },
        { path: "admin/side-activities", element: <ProtectedRoute><SideActivitiesPage /></ProtectedRoute> },
        { path: "admin/recordings", element: <ProtectedRoute><RecordingsPage /></ProtectedRoute> },
        { path: "admin/student-profiles", element: <ProtectedRoute><StudentProfilesPage /></ProtectedRoute> },
        { path: "admin/monthly-comments", element: <ProtectedRoute><MonthlyCommentsPage /></ProtectedRoute> },
        { path: "admin/test-results", element: <ProtectedRoute><TestResultsPage /></ProtectedRoute> },
        { path: "admin/feedbacks", element: <ProtectedRoute><FeedbacksPage /></ProtectedRoute> },
        { path: "admin/payments", element: <ProtectedRoute><PaymentsPage /></ProtectedRoute> },
        { path: "admin/inventory", element: <ProtectedRoute><InventoryPage /></ProtectedRoute> },
        { path: "admin/announcements", element: <ProtectedRoute><AnnouncementsPage /></ProtectedRoute> },
        { path: "admin/reference-library", element: <ProtectedRoute><ReferenceLibraryPage /></ProtectedRoute> },
        { path: "admin/tasks", element: <ProtectedRoute><TasksPage /></ProtectedRoute> },
        { path: "admin/achievement-rewards", element: <ProtectedRoute><AchievementRewardsPage /></ProtectedRoute> },
        { path: "admin/reports", element: <ProtectedRoute><ReportsPage /></ProtectedRoute> },
        { path: "admin/notifications", element: <ProtectedRoute><NotificationsPage /></ProtectedRoute> },
      ],
    },
    { path: "/login", element: <Login /> },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <App>
    <AppProvider>
       <RouterProvider router={router} />
    </AppProvider>
    
    </App>
  </StrictMode>,
)
