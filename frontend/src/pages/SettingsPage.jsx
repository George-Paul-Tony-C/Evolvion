import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const SettingCard = ({ title, description, children, icon }) => (
  <div className="bg-white/95 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
    <div className="flex items-start gap-4">
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white flex-shrink-0">
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-slate-800 mb-2">{title}</h3>
        <p className="text-slate-600 text-sm mb-4">{description}</p>
        {children}
      </div>
    </div>
  </div>
);

const Toggle = ({ enabled, onChange, label }) => (
  <div className="flex items-center justify-between">
    <span className="text-sm text-slate-700">{label}</span>
    <button
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        enabled ? 'bg-blue-600' : 'bg-slate-300'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  </div>
);

export default function SettingsPage() {
  const { user } = useAuth();
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: false,
      assessmentReminders: true,
      learningUpdates: true,
      weeklyReports: false
    },
    privacy: {
      profileVisible: true,
      showSkills: true,
      showProgress: false,
      allowAnalytics: true
    },
    preferences: {
      theme: 'light',
      language: 'english',
      timezone: 'UTC',
      dateFormat: 'MM/DD/YYYY'
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: '30',
      loginAlerts: true
    }
  });

  const [activeSection, setActiveSection] = useState('account');

  const updateSetting = (section, key, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
  };

  const sections = [
    { id: 'account', label: 'Account', icon: '👤' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
    { id: 'privacy', label: 'Privacy', icon: '🔒' },
    { id: 'security', label: 'Security', icon: '🛡️' },
    { id: 'preferences', label: 'Preferences', icon: '⚙️' }
  ];

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white/95 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-white/20 mb-8 animate-slideUp">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-500 to-slate-600 flex items-center justify-center text-white text-2xl">
              ⚙️
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Settings
              </h1>
              <p className="text-slate-600 mt-2">Manage your account preferences and privacy settings</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 p-4 animate-slideUp" style={{ animationDelay: '0.1s' }}>
              <nav className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                      activeSection === section.id
                        ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <span>{section.icon}</span>
                    <span className="font-medium">{section.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Account Settings */}
            {activeSection === 'account' && (
              <div className="space-y-6 animate-fadeInUp">
                <SettingCard
                  title="Profile Information"
                  description="Update your basic profile information"
                  icon={<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>}
                >
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                      <input
                        type="text"
                        value={user?.name || ''}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Department</label>
                      <input
                        type="text"
                        value={user?.department || ''}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200">
                      Save Changes
                    </button>
                  </div>
                </SettingCard>

                <SettingCard
                  title="Account Status"
                  description="View your current account status and activity"
                  icon={<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>}
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Account Status</span>
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">Active</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Member Since</span>
                      <span className="text-sm text-slate-800">January 2024</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Last Login</span>
                      <span className="text-sm text-slate-800">Today at 10:30 AM</span>
                    </div>
                  </div>
                </SettingCard>
              </div>
            )}

            {/* Notification Settings */}
            {activeSection === 'notifications' && (
              <div className="space-y-6 animate-fadeInUp">
                <SettingCard
                  title="Email Notifications"
                  description="Choose what email notifications you want to receive"
                  icon={<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>}
                >
                  <div className="space-y-4">
                    <Toggle
                      enabled={settings.notifications.email}
                      onChange={(value) => updateSetting('notifications', 'email', value)}
                      label="Email Notifications"
                    />
                    <Toggle
                      enabled={settings.notifications.assessmentReminders}
                      onChange={(value) => updateSetting('notifications', 'assessmentReminders', value)}
                      label="Assessment Reminders"
                    />
                    <Toggle
                      enabled={settings.notifications.learningUpdates}
                      onChange={(value) => updateSetting('notifications', 'learningUpdates', value)}
                      label="Learning Path Updates"
                    />
                    <Toggle
                      enabled={settings.notifications.weeklyReports}
                      onChange={(value) => updateSetting('notifications', 'weeklyReports', value)}
                      label="Weekly Progress Reports"
                    />
                  </div>
                </SettingCard>

                <SettingCard
                  title="Push Notifications"
                  description="Manage browser and mobile push notifications"
                  icon={<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/></svg>}
                >
                  <div className="space-y-4">
                    <Toggle
                      enabled={settings.notifications.push}
                      onChange={(value) => updateSetting('notifications', 'push', value)}
                      label="Browser Push Notifications"
                    />
                    <div className="text-sm text-slate-500">
                      Enable push notifications to get real-time updates about your learning progress.
                    </div>
                  </div>
                </SettingCard>
              </div>
            )}

            {/* Privacy Settings */}
            {activeSection === 'privacy' && (
              <div className="space-y-6 animate-fadeInUp">
                <SettingCard
                  title="Profile Visibility"
                  description="Control who can see your profile information"
                  icon={<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>}
                >
                  <div className="space-y-4">
                    <Toggle
                      enabled={settings.privacy.profileVisible}
                      onChange={(value) => updateSetting('privacy', 'profileVisible', value)}
                      label="Make Profile Visible to Colleagues"
                    />
                    <Toggle
                      enabled={settings.privacy.showSkills}
                      onChange={(value) => updateSetting('privacy', 'showSkills', value)}
                      label="Show Skill Ratings"
                    />
                    <Toggle
                      enabled={settings.privacy.showProgress}
                      onChange={(value) => updateSetting('privacy', 'showProgress', value)}
                      label="Show Learning Progress"
                    />
                  </div>
                </SettingCard>

                <SettingCard
                  title="Data & Analytics"
                  description="Control how your data is used for analytics"
                  icon={<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M5 9.2h3V19H5zM10.6 5h2.8v14h-2.8zm5.6 8H19v6h-2.8z"/></svg>}
                >
                  <div className="space-y-4">
                    <Toggle
                      enabled={settings.privacy.allowAnalytics}
                      onChange={(value) => updateSetting('privacy', 'allowAnalytics', value)}
                      label="Allow Analytics Data Collection"
                    />
                    <div className="text-sm text-slate-500">
                      This helps us improve the platform and provide better learning recommendations.
                    </div>
                  </div>
                </SettingCard>
              </div>
            )}

            {/* Security Settings */}
            {activeSection === 'security' && (
              <div className="space-y-6 animate-fadeInUp">
                <SettingCard
                  title="Authentication"
                  description="Manage your login and security preferences"
                  icon={<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></svg>}
                >
                  <div className="space-y-4">
                    <Toggle
                      enabled={settings.security.twoFactorAuth}
                      onChange={(value) => updateSetting('security', 'twoFactorAuth', value)}
                      label="Two-Factor Authentication"
                    />
                    <Toggle
                      enabled={settings.security.loginAlerts}
                      onChange={(value) => updateSetting('security', 'loginAlerts', value)}
                      label="Login Alert Notifications"
                    />
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Session Timeout (minutes)</label>
                      <select
                        value={settings.security.sessionTimeout}
                        onChange={(e) => updateSetting('security', 'sessionTimeout', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="15">15 minutes</option>
                        <option value="30">30 minutes</option>
                        <option value="60">1 hour</option>
                        <option value="240">4 hours</option>
                      </select>
                    </div>
                  </div>
                </SettingCard>

                <SettingCard
                  title="Password"
                  description="Update your account password"
                  icon={<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>}
                >
                  <div className="space-y-4">
                    <button className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200">
                      Change Password
                    </button>
                    <div className="text-sm text-slate-500">
                      Last password change: 30 days ago
                    </div>
                  </div>
                </SettingCard>
              </div>
            )}

            {/* Preferences */}
            {activeSection === 'preferences' && (
              <div className="space-y-6 animate-fadeInUp">
                <SettingCard
                  title="Display Preferences"
                  description="Customize your interface appearance"
                  icon={<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 18.5A6.5 6.5 0 1 1 18.5 12 6.51 6.51 0 0 1 12 18.5zm0-12A5.5 5.5 0 1 0 17.5 12 5.51 5.51 0 0 0 12 6.5z"/></svg>}
                >
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Theme</label>
                      <select
                        value={settings.preferences.theme}
                        onChange={(e) => updateSetting('preferences', 'theme', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                        <option value="auto">Auto</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Language</label>
                      <select
                        value={settings.preferences.language}
                        onChange={(e) => updateSetting('preferences', 'language', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="english">English</option>
                        <option value="spanish">Spanish</option>
                        <option value="french">French</option>
                        <option value="german">German</option>
                      </select>
                    </div>
                  </div>
                </SettingCard>

                <SettingCard
                  title="Regional Settings"
                  description="Set your timezone and date formats"
                  icon={<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>}
                >
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Timezone</label>
                      <select
                        value={settings.preferences.timezone}
                        onChange={(e) => updateSetting('preferences', 'timezone', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="UTC">UTC</option>
                        <option value="EST">Eastern Time</option>
                        <option value="PST">Pacific Time</option>
                        <option value="GMT">GMT</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Date Format</label>
                      <select
                        value={settings.preferences.dateFormat}
                        onChange={(e) => updateSetting('preferences', 'dateFormat', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                        <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                        <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                      </select>
                    </div>
                  </div>
                </SettingCard>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
