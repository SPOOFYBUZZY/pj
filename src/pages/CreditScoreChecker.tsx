import React, { useState } from 'react';
import LoanApplicationModal from '../components/LoanApplicationModal';
import { motion } from 'framer-motion';
import { BarChart3, CheckCircle, AlertCircle, TrendingUp } from 'lucide-react';

const CreditScoreChecker: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    panNumber: '',
    email: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [creditScore, setCreditScore] = useState<number | null>(null);
  const [showLoanModal, setShowLoanModal] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock credit score generation
    const mockScore = Math.floor(Math.random() * (850 - 300) + 300);
    setCreditScore(mockScore);
    setIsSubmitted(true);
    // Save to localStorage for admin panel
    const prev = JSON.parse(localStorage.getItem('creditScoreSubmissions') || '[]');
    localStorage.setItem('creditScoreSubmissions', JSON.stringify([
      ...prev,
      {
        fullName: formData.fullName,
        mobileNumber: formData.mobileNumber,
        panNumber: formData.panNumber,
        email: formData.email,
        creditScore: mockScore.toString()
      }
    ]));
  };

  const getScoreColor = (score: number) => {
    if (score >= 750) return 'text-green-600';
    if (score >= 650) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreStatus = (score: number) => {
    if (score >= 750) return 'Excellent';
    if (score >= 650) return 'Good';
    if (score >= 550) return 'Fair';
    return 'Poor';
  };

  const getScoreAdvice = (score: number) => {
    if (score >= 750) return 'Great! You have excellent credit and can qualify for the best loan rates.';
    if (score >= 650) return 'Good credit score. You can get competitive loan rates with most lenders.';
    if (score >= 550) return 'Fair credit. You may need to improve your score for better loan terms.';
    return 'Poor credit. Focus on improving your score before applying for loans.';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <BarChart3 size={64} className="text-blue-600 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Free Credit Score Checker
          </h1>
          <p className="text-xl text-gray-600">
            Check your credit score instantly and get personalized loan recommendations
          </p>
        </motion.div>

        {!isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-lg shadow-lg p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Enter Your Details
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700 mb-2">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  id="mobileNumber"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="panNumber" className="block text-sm font-medium text-gray-700 mb-2">
                  PAN Number
                </label>
                <input
                  type="text"
                  id="panNumber"
                  name="panNumber"
                  value={formData.panNumber}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Check My Credit Score
              </motion.button>
            </form>

            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-start space-x-3">
                <CheckCircle size={20} className="text-blue-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-blue-900">Why check your credit score?</h3>
                  <ul className="text-sm text-blue-800 mt-2 space-y-1">
                    <li>• Know your loan eligibility</li>
                    <li>• Get better interest rates</li>
                    <li>• Identify areas for improvement</li>
                    <li>• Make informed financial decisions</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-lg shadow-lg p-8"
          >
            <div className="text-center mb-8">
              <div className={`text-6xl font-bold ${getScoreColor(creditScore!)} mb-4`}>
                {creditScore}
              </div>
              <div className="text-2xl font-semibold text-gray-900 mb-2">
                {getScoreStatus(creditScore!)}
              </div>
              <div className="text-gray-600">
                {getScoreAdvice(creditScore!)}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-green-600 mb-2">750+</div>
                <div className="text-sm text-green-800">Excellent</div>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-yellow-600 mb-2">650-749</div>
                <div className="text-sm text-yellow-800">Good</div>
              </div>
              <div className="bg-red-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-red-600 mb-2">Below 650</div>
                <div className="text-sm text-red-800">Needs Improvement</div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Recommended Loan Products
                </h3>
                <div className="space-y-3">
                  {creditScore! >= 750 && (
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <span className="text-green-800">Home Loan - Best Rates</span>
                      <span className="text-green-600 font-semibold">8.5% onwards</span>
                    </div>
                  )}
                  {creditScore! >= 650 && (
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <span className="text-blue-800">Personal Loan</span>
                      <span className="text-blue-600 font-semibold">12% onwards</span>
                    </div>
                  )}
                  {creditScore! >= 550 && (
                    <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                      <span className="text-yellow-800">Secured Loan</span>
                      <span className="text-yellow-600 font-semibold">10% onwards</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  onClick={() => {
                    if (creditScore && creditScore >= 650) {
                      setShowLoanModal(true);
                    } else {
                      alert('Your credit score must be at least 650 to apply for a loan.');
                    }
                  }}
                >
                  Apply for Loan
                </motion.button>
      <LoanApplicationModal show={showLoanModal} onClose={() => setShowLoanModal(false)} />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setIsSubmitted(false);
                    setCreditScore(null);
                    setFormData({ fullName: '', mobileNumber: '', panNumber: '', email: '' });
                  }}
                  className="flex-1 bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
                >
                  Check Another Score
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Tips Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 bg-white rounded-lg shadow-lg p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Tips to Improve Your Credit Score
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-3">
              <TrendingUp size={20} className="text-blue-600 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900">Pay Bills on Time</h3>
                <p className="text-gray-600 text-sm">Always pay your credit card bills and EMIs on time to maintain a good payment history.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <AlertCircle size={20} className="text-blue-600 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900">Keep Credit Utilization Low</h3>
                <p className="text-gray-600 text-sm">Try to use less than 30% of your available credit limit.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle size={20} className="text-blue-600 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900">Maintain Old Accounts</h3>
                <p className="text-gray-600 text-sm">Keep your old credit accounts open to maintain a longer credit history.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <BarChart3 size={20} className="text-blue-600 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900">Monitor Your Score</h3>
                <p className="text-gray-600 text-sm">Check your credit score regularly and report any errors immediately.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CreditScoreChecker;