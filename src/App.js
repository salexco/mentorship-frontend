import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import AdminLayout from './components/AdminLayout'; // ✅ import AdminLayout

import Login from './pages/Login';
import Register from './pages/Register';

import MenteeMentors from './pages/MenteeMentors';
import MenteeRequests from './pages/MenteeRequests';
import MenteeSessions from './pages/MenteeSessions';
import MenteeDashboard from './pages/MenteeDashboard';
import MenteeBooking from './pages/MenteeBooking';
import MenteeFeedback from './pages/MenteeFeedback';
import MenteeProfile from './pages/MenteeProfile';
import MenteeEditProfile from './pages/MenteeEditProfile';
import MenteeViewMentors from './pages/MenteeViewMentors';
import MenteeViewAvailability from './pages/MenteeViewAvailability';

import MentorDashboard from './pages/MentorDashboard';
import MentorAvailability from './pages/MentorAvailability';
import MentorRequests from './pages/MentorRequests';
import MentorFeedback from './pages/MentorFeedback';
import MentorEditprofile from './pages/MentorEditprofile';
import Mentorprofile from './pages/Mentorprofile';
import MentorSessions from './pages/MentorSessions';

import AdminDashboard from './pages/AdminDashboard';
import AdminUsers from './pages/AdminUsers';
import AdminMentors from './pages/AdminMentors';
import AdminMentees from './pages/AdminMentees';
import AdminSessions from './pages/AdminSessions';
import AdminFeedback from './pages/AdminFeedback';
import AdminSettings from './pages/AdminSettings';
import AdminProfile from './pages/AdminProfile';
import AdminMatches from './pages/AdminMatches';

import EditProfile from './pages/EditProfile';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Mentee routes */}
        <Route path="/mentee/dashboard" element={
          <Layout role="mentee">
            <MenteeDashboard />
          </Layout>

        } />
        <Route path="/mentee/mentors" element={
          <Layout role="mentee">
            <MenteeMentors />
          </Layout>
        } />
        <Route path="/mentee/requests" element={
          <Layout role="mentee">
            <MenteeRequests />
          </Layout>
        } />
        <Route path="/mentee/sessions" element={
          <Layout role="mentee">
            <MenteeSessions />
          </Layout>
        } />
        <Route path="/mentee/book" element={
          <Layout role="mentee">
            <MenteeBooking />
          </Layout>
        } />
        <Route path="/mentee/feedback" element={
          <Layout role="mentee">
            <MenteeFeedback />
          </Layout>
        } />
        <Route path="/mentee/view/mentor" element={
          <Layout role="mentee">
            <MenteeViewMentors />
          </Layout>
        } />
        
        <Route path="/mentee/profile" element={
          <Layout role="mentee">
            <MenteeProfile />
          </Layout>
        } />
        <Route path="/mentee/edit/profile" element={
          <Layout role="mentee">
            <MenteeEditProfile />
          </Layout>
        } />
        <Route path="/mentee/mentors/:id/availability" element={
          <Layout role="mentee">
            <MenteeViewAvailability />
          </Layout>
        } />

        {/* Mentor routes */}
        <Route path="/mentor/dashboard" element={
          <Layout role="mentor">
            <MentorDashboard />
          </Layout>
        } />
        <Route path="/mentor/availability" element={
          <Layout role="mentor">
            <MentorAvailability />
          </Layout>
        } />
        <Route path="/mentor/requests" element={
          <Layout role="mentor">
            <MentorRequests />
          </Layout>
        } />
        <Route path="/mentor/feedback" element={
          <Layout role="mentor">
            <MentorFeedback />
          </Layout>
        } />
        <Route path="/mentor/edit-profile" element={
          <Layout role="mentor">
            <MentorEditprofile />
          </Layout>
        } />
        <Route path="/mentor/sessions" element={
          <Layout role="mentor">
            <MentorSessions />
          </Layout>
        } />
        <Route path="/mentors/:id" element={
          <Layout role="mentor">
            <Mentorprofile />
          </Layout>
        } />

        {/* Admin routes */}
        <Route path="/admin/dashboard" element={
          <AdminLayout>
            <AdminDashboard />
          </AdminLayout>
        } />
        <Route path="/admin/users" element={
          <AdminLayout>
            <AdminUsers />
          </AdminLayout>
        } />
        <Route path="/admin/mentors" element={
          <AdminLayout>
            <AdminMentors />
          </AdminLayout>
        } />
        <Route path="/admin/mentees" element={
          <AdminLayout>
            <AdminMentees />
          </AdminLayout>
        } />
        <Route path="/admin/sessions" element={
          <AdminLayout>
            <AdminSessions />
          </AdminLayout>
        } />
        <Route path="/admin/matches" element={
          <AdminLayout>
            <AdminMatches />
          </AdminLayout>
        } />
        <Route path="/admin/feedback" element={
          <AdminLayout>
            <AdminFeedback />
          </AdminLayout>
        } />
        <Route path="/admin/profile" element={
          <AdminLayout>
            <AdminProfile />
          </AdminLayout>
        } />
        <Route path="/admin/settings" element={
          <AdminLayout>
            <AdminSettings />
          </AdminLayout>
        } />

        {/* Other routes */}
        <Route path="/edit/profile" element={
          <Layout role="mentee">
            <EditProfile />
          </Layout>
        } />

        <Route path="/" element={<h1>Home Page</h1>} />
      </Routes>
    </Router>
  );
}

export default App;

