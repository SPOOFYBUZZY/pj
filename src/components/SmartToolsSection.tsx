import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Calculator, CreditCard, X } from 'lucide-react';

const SmartToolsSection: React.FC = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const tools = [
    {
      id: 'credit-score',
      icon: BarChart3,
      title: 'Credit Score Checker',
      description: 'Check your credit score instantly and get personalized recommendations',
      emoji: '📊'
    },
    {
      id: 'eligibility',
      icon: Calculator,
      title: 'Loan Eligibility Calculator',
      description: 'Calculate how much loan you can get based on your income and profile',
      emoji: '🔢'
    },
    {
      id: 'emi',
      icon: CreditCard,
      title: 'EMI Calculator',
      description: 'Calculate your monthly EMI for different loan amounts and tenures',
      emoji: '💰'
    }
  ];

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
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="tel"
            placeholder="Mobile Number"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="PAN Number"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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

  const EligibilityModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Loan Eligibility Calculator</h3>
          <button onClick={() => setActiveModal(null)}>
            <X size={24} />
          </button>
        </div>
        <form className="space-y-4">
          <input
            type="number"
            placeholder="Monthly Income (₹)"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            placeholder="Monthly Expenses (₹)"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Employment Type</option>
            <option>Salaried</option>
            <option>Self-Employed</option>
            <option>Business Owner</option>
          </select>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Calculate Eligibility
          </button>
        </form>
      </div>
    </div>
  );

  const EMIModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">EMI Calculator</h3>
          <button onClick={() => setActiveModal(null)}>
            <X size={24} />
          </button>
        </div>
        <form className="space-y-4">
          <input
            type="number"
            placeholder="Loan Amount (₹)"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            placeholder="Interest Rate (%)"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            placeholder="Tenure (Years)"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Calculate EMI
          </button>
        </form>
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
              onClick={() => setActiveModal(tool.id)}
            >
              <div className="text-center">
                <div className="text-4xl mb-4">{tool.emoji}</div>
                <tool.icon size={32} className="text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {tool.title}
                </h3>
                <p className="text-gray-600 mb-6">
                  {tool.description}
                </p>
                <button className="bg-blue-600 text-white py-2 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  Try Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modals */}
      {activeModal === 'credit-score' && <CreditScoreModal />}
      {activeModal === 'eligibility' && <EligibilityModal />}
      {activeModal === 'emi' && <EMIModal />}
    </section>
  );
};

export default SmartToolsSection;