import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BarChart3, Calculator, X } from 'lucide-react';

const SmartToolsSection: React.FC = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const navigate = useNavigate();

  const tools = [
    {
      id: 'credit-score',
      icon: BarChart3,
      title: 'Credit Score Checker',
      description: 'Check your credit score instantly and get personalized recommendations',
    
    },
    {
      id: 'eligibility',
      icon: Calculator,
      title: 'Loan Eligibility Calculator',
      description: 'Calculate how much loan you can get based on your income and profile',
    
    },
  ];

  const [creditScoreForm, setCreditScoreForm] = useState({
    fullName: '',
    mobileNumber: '',
    panNumber: '',
    email: '',
    creditScore: '',
  });

  const handleCreditScoreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCreditScoreForm({ ...creditScoreForm, [name]: value });
  };

  const handleCreditScoreSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save to localStorage
    const prev = JSON.parse(localStorage.getItem('creditScoreSubmissions') || '[]');
    localStorage.setItem('creditScoreSubmissions', JSON.stringify([
      ...prev,
      creditScoreForm
    ]));
    setActiveModal(null);
    navigate('/CreditScoreChecker');
  };

  const CreditScoreModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Credit Score Checker</h3>
          <button onClick={() => setActiveModal(null)}>
            <X size={24} />
          </button>
        </div>
        <p className="text-gray-600 mb-4">
          Enter your details to check your credit score instantly
        </p>
        <form className="space-y-4" onSubmit={handleCreditScoreSubmit}>
          <input
            type="text"
            name="fullName"
            value={creditScoreForm.fullName}
            onChange={handleCreditScoreChange}
            placeholder="Full Name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="tel"
            name="mobileNumber"
            value={creditScoreForm.mobileNumber}
            onChange={handleCreditScoreChange}
            placeholder="Mobile Number"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="panNumber"
            value={creditScoreForm.panNumber}
            onChange={handleCreditScoreChange}
            placeholder="PAN Number"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="email"
            name="email"
            value={creditScoreForm.email}
            onChange={handleCreditScoreChange}
            placeholder="Email Address"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="number"
            name="creditScore"
            value={creditScoreForm.creditScore}
            onChange={handleCreditScoreChange}
            placeholder="Credit Score"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Check Score
          </button>
        </form>
      </div>
    </div>
  );

  // Eligibility calculator state
  const [eligibilityForm, setEligibilityForm] = useState({
    name: '',
    income: '',
    expenses: '',
    workType: '',
    eligible: '' as '' | 'Eligible' | 'Not Eligible',
  });
  const [eligibilityResult, setEligibilityResult] = useState<string | null>(null);

  const handleEligibilityChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEligibilityForm({ ...eligibilityForm, [name]: value });
  };

  const handleEligibilitySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const income = parseInt(eligibilityForm.income.replace(/[^\d]/g, '')) || 0;
    const expenses = parseInt(eligibilityForm.expenses.replace(/[^\d]/g, '')) || 0;
    const eligible = income - expenses >= 10000 ? 'Eligible' : 'Not Eligible';
    setEligibilityForm({ ...eligibilityForm, eligible });
    setEligibilityResult(eligible);
    // Save to localStorage
    const prev = JSON.parse(localStorage.getItem('loanEligibilitySubmissions') || '[]');
    localStorage.setItem('loanEligibilitySubmissions', JSON.stringify([
      ...prev,
      {
        name: eligibilityForm.name,
        income: eligibilityForm.income,
        expenses: eligibilityForm.expenses,
        workType: eligibilityForm.workType,
        eligible,
      }
    ]));
  };

  const EligibilityModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Loan Eligibility Calculator</h3>
          <button onClick={() => { setActiveModal(null); setEligibilityResult(null); setEligibilityForm({ name: '', income: '', expenses: '', workType: '', eligible: '' }); }}>
            <X size={24} />
          </button>
        </div>
        <form className="space-y-4" onSubmit={handleEligibilitySubmit}>
          <input
            type="text"
            name="name"
            value={eligibilityForm.name}
            onChange={handleEligibilityChange}
            placeholder="Full Name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="income"
            value={eligibilityForm.income}
            onChange={handleEligibilityChange}
            placeholder="Monthly Income (₹)"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="expenses"
            value={eligibilityForm.expenses}
            onChange={handleEligibilityChange}
            placeholder="Monthly Expenses (₹)"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <select
            name="workType"
            value={eligibilityForm.workType}
            onChange={handleEligibilityChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Work Type</option>
            <option value="Salaried">Salaried</option>
            <option value="Self-Employed">Self-Employed</option>
            <option value="Business Owner">Business Owner</option>
          </select>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Calculate Eligibility
          </button>
        </form>
        {eligibilityResult && (
          <div className={`mt-4 text-center font-bold ${eligibilityResult === 'Eligible' ? 'text-green-600' : 'text-red-600'}`}>
            {eligibilityResult === 'Eligible' ? 'Congratulations! You are eligible for a loan.' : 'Sorry, you are not eligible for a loan.'}
          </div>
        )}
      </div>
    </div>
  );

  

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Smart Financial Tools
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Use our intelligent tools to make informed financial decisions
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-8">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer mx-auto"
            >
              <div className="text-center">
                <tool.icon size={32} className="text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {tool.title}
                </h3>
                <p className="text-gray-600 mb-6">
                  {tool.description}
                </p>
                {tool.id === 'credit-score' ? (
                  <button
                    className="bg-blue-600 text-white py-2 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                    onClick={() => {
                      setActiveModal(null);
                      navigate('/credit-score-checker');
                    }}
                  >
                    Try Now
                  </button>
                ) : (
                  <button
                    className="bg-blue-600 text-white py-2 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                    onClick={() => setActiveModal(tool.id)}
                  >
                    Try Now
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modals */}
      {activeModal === 'credit-score' && <CreditScoreModal />}
      {activeModal === 'eligibility' && <EligibilityModal />}
    </section>
  );
};

export default SmartToolsSection;