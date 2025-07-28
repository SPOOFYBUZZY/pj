import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { User, Phone, CreditCard, FileText, Settings } from 'lucide-react';

const Profile: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600">Please log in to view your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-lg shadow-lg p-8 mb-8"
        >
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
              <User size={32} className="text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
              <p className="text-gray-600">{user.mobile}</p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 bg-white rounded-lg shadow-lg p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile Information</h2>
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <User size={20} className="text-blue-600" />
                <div>
                  <label className="block text-sm font-medium text-gray-700">Full Name</label>
                  <p className="text-gray-900">{user.name}</p>
                </div>
              </div>
              {/* Email removed since login is now via mobile */}
              <div className="flex items-center space-x-4">
                <Phone size={20} className="text-blue-600" />
                <div>
                  <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
                  <p className="text-gray-900">+91 {user.mobile}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center space-x-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                  <CreditCard size={20} className="text-blue-600" />
                  <span className="text-blue-900">Check Credit Score</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                  <FileText size={20} className="text-green-600" />
                  <span className="text-green-900">Apply for Loan</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <Settings size={20} className="text-gray-600" />
                  <span className="text-gray-900">Account Settings</span>
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Application Status</h3>
              <p className="text-gray-600">No active applications</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile;