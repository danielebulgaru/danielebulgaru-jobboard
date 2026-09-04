import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import JobsPage from './pages/JobsPage';
import JobDetailPage from './pages/JobDetailPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import MyApplicationsPage from './pages/MyApplicationsPage';
import PostJobPage from './pages/PostJobPage';
import SavedJobsPage from './pages/SavedJobsPage';
import { hasRole } from './auth';

function PrivateRoute({ children, role }) {
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/login" />;
  if (role && !hasRole(role)) return <Navigate to="/" />;
  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/jobs/:id" element={<JobDetailPage />} />
          <Route path="/dashboard" element={
            <PrivateRoute role="RECRUITER"><DashboardPage /></PrivateRoute>
          } />
          <Route path="/post-job" element={
            <PrivateRoute role="RECRUITER"><PostJobPage /></PrivateRoute>
          } />
          <Route path="/profile" element={
            <PrivateRoute><ProfilePage /></PrivateRoute>
          } />
          <Route path="/applications" element={
            <PrivateRoute role="CANDIDATE"><MyApplicationsPage /></PrivateRoute>
          } />
          <Route path="/saved" element={
            <PrivateRoute role="CANDIDATE"><SavedJobsPage /></PrivateRoute>
          } />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
