import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Login from './auth/login/Login';
import MainLayout from './pages/layouts/MainLayout';
import Apps from './pages/Subscriptions/apps/apps';
import Lms from './pages/Subscriptions/lms/Lms';
import Chat from './pages/Subscriptions/chat/Chat';
import DashBoard from './pages/Subscriptions/dashboard/DashBoard';
import ProgramsPage from './pages/Subscriptions/apps/academic-setup/programs';
import NewProgram from './pages/Subscriptions/apps/academic-setup/newProgram';
import ProgramDetails from './pages/Subscriptions/apps/academic-setup/programDetails';
import ProgramInfo from './pages/Subscriptions/apps/academic-setup/programInfo';
import TermList from './pages/Subscriptions/apps/academic-setup/termList';
import BusinessUnitsPage from './pages/Subscriptions/apps/academic-setup/businessUnit';
import GradeBook from './pages/Subscriptions/apps/academic-setup/gradeBook';
import SubjectDetails from './pages/Subscriptions/apps/academic-setup/term/subjectDetails';
import SubjectList from './pages/Subscriptions/apps/academic-setup/term/subjectList';
import SubjectInfo from './pages/Subscriptions/apps/academic-setup/term/subjectInfo';
import QABank from './pages/Subscriptions/apps/academic-setup/term/qaBank';
import TermLMS from './pages/Subscriptions/apps/academic-setup/term/termLMS';
import Assessment from './pages/Subscriptions/apps/academic-setup/term/assessment';
import TimeTable from './pages/Subscriptions/apps/academic-setup/term/timeTable';
import BusinessUnits from './pages/Subscriptions/apps/setup-institution/businessUnits';
import CreateBusinessUnit from './pages/Subscriptions/apps/setup-institution/createBusinessUnit';
import BusinessUnitInfo from './pages/Subscriptions/apps/setup-institution/businessUnitInfo';
import AffiliationList from './pages/Subscriptions/apps/setup-institution/affiliationList';
import AccountInfo from './pages/Subscriptions/apps/setup-institution/accountInfo';
import SubscriptionList from './pages/Subscriptions/apps/setup-institution/subscriptionList';
import DepartmentList from './pages/Subscriptions/apps/setup-institution/departmentList';
export default function MainRouting() {
  // const navigate = useNavigate();
  const handleLogout = () => {
    console.log('Logout');
    // navigate('/login');
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={<MainLayout />}
        >
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashBoard />} />
          <Route path="lms" element={<Lms />} />
          <Route path="chat" element={<Chat />} />
          <Route path="my-profile" element={<Chat />} />
          <Route path="messages" element={<Chat />} />
          <Route path="apps" element={<Apps />} />

          <Route path="apps/program" element={<ProgramsPage />} />
          <Route path="apps/program/launch-new-program" element={<NewProgram />} />
          <Route path="apps/program/details" element={<ProgramDetails />}>
            <Route index element={<ProgramInfo />} />  {/* default */}
            <Route path="info" element={<ProgramInfo />} />
            <Route path="term" element={<TermList />} />
            <Route path="business-unit" element={<BusinessUnitsPage />} />
            <Route path="grade-book" element={<GradeBook />} />
          </Route>
          apps/program/details/term/subject
          <Route path="apps/program/details/term/subject" element={<SubjectDetails />} >
            <Route index element={<SubjectList />} />
            {/* <Route path="subject" element={<SubjectList />} /> */}
            <Route path="subject-info" element={<SubjectInfo />} />
            <Route path="qa-bank" element={<QABank />} />
            <Route path="lms" element={<TermLMS />} />
            <Route path="assessment" element={<Assessment />} />
            <Route path="lms" element={<TermLMS />} />
            <Route path="time-table" element={<TimeTable />} />
            <Route path="thesis" element={<TimeTable />} />
            <Route path="research" element={<TimeTable />} />
            <Route path="activity" element={<TimeTable />} />
          </Route>

          <Route path="apps/setup-institution" element={<BusinessUnits />} />
          <Route path="apps/setup-institution/create-business-unit" element={<CreateBusinessUnit />} />
          <Route path="apps/setup-institution/business-unit" element={<BusinessUnitInfo />}>
            <Route path="affiliation" element={<AffiliationList />} />
            <Route path="account" element={<AccountInfo />} />
            <Route path="subscriptions" element={<SubscriptionList />} />
            <Route path="departments" element={<DepartmentList />} />
          </Route>
        </Route>


        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}


