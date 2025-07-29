// EligibilityEntry interface for loan eligibility submissions
interface EligibilityEntry {
  name: string;
  income: string;
  expenses: string;
  workType: string;
  eligible: 'Eligible' | 'Not Eligible';
}
// LoansPendingTable component
const LoansPendingTable: React.FC = () => {
  const [requests] = useState<LoanRequest[]>(() => {
    return JSON.parse(localStorage.getItem('loanRequests') || '[]');
  });
  const [status] = useState<{ [key: number]: string }>(() => {
    return JSON.parse(localStorage.getItem('loanRequestStatus') || '{}');
  });
  const pending = requests.filter((_, idx) => !status[idx]);
  if (!pending.length) return <div>No pending loan requests.</div>;
  return (
    <table className="w-full border">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-2 border">Name</th>
          <th className="p-2 border">Mobile</th>
          <th className="p-2 border">Aadhaar</th>
          <th className="p-2 border">PAN</th>
          <th className="p-2 border">Bank Passbook</th>
          <th className="p-2 border">Loan Amount</th>
          <th className="p-2 border">Location</th>
          <th className="p-2 border">Status</th>
        </tr>
      </thead>
      <tbody>
        {pending.map((req, idx) => (
          <tr key={idx}>
            <td className="p-2 border">{req.name}</td>
            <td className="p-2 border">{req.mobile}</td>
            <td className="p-2 border"><a href="#" className="text-blue-600 underline">{req.aadhar}</a></td>
            <td className="p-2 border"><a href="#" className="text-blue-600 underline">{req.pan}</a></td>
            <td className="p-2 border"><a href="#" className="text-blue-600 underline">{req.bankPassbook}</a></td>
            <td className="p-2 border">{req.loanAmount}</td>
            <td className="p-2 border">{req.location}</td>
            <td className="p-2 border text-yellow-600 font-bold">Pending</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};




const navItems = [
  'Dashboard',
  'Users',
  'Loans Provided',
  'Loans Pending',
  'Credit Score Checker',
  'Loan Eligibility',
  'Loan Requests',
  'Support',
];



import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// User type for all user data in admin panel
type UserType = {
  id: number;
  name: string;
  mobile: string;
  date?: string;
  time?: string;
  loanStatus?: string;
  eligibility?: string;
};

// UsersTable component to show name and mobile from localStorage, with improved filter UI and highlight
const UsersTable: React.FC = () => {
  const users: UserType[] = JSON.parse(localStorage.getItem('users') || '[]');
  const [filter, setFilter] = useState('');
  const filterLower = filter.toLowerCase();
  const filtered = users.filter(user =>
    Object.values(user).some(val =>
      typeof val === 'string' && val.toLowerCase().includes(filterLower)
    )
  );

  // Helper to highlight filter text
  const highlight = (text: string) => {
    if (!filter) return text;
    const idx = text.toLowerCase().indexOf(filterLower);
    if (idx === -1) return text;
    return <>
      {text.substring(0, idx)}
      <span className="bg-yellow-200 text-yellow-900 font-bold rounded px-1">{text.substring(idx, idx + filter.length)}</span>
      {text.substring(idx + filter.length)}
    </>;
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">Users</h2>
      <div className="flex items-center gap-2 mb-4">
        <input
          type="text"
          placeholder="Type to filter users..."
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="p-2 border-2 border-blue-400 focus:border-blue-600 rounded-lg w-full max-w-xs transition-colors outline-none shadow-sm"
        />
        {filter && (
          <button
            className="ml-2 px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-700 font-semibold text-xs"
            onClick={() => setFilter('')}
            title="Clear filter"
          >
            Clear
          </button>
        )}
      </div>
      <table className="w-full border rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-blue-100 text-blue-900">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Mobile</th>
            <th className="p-2 border">Date</th>
            <th className="p-2 border">Time</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 ? (
            <tr>
              <td className="p-2 border text-center text-gray-500" colSpan={4}>No users found.</td>
            </tr>
          ) : (
            filtered.map((user: UserType) => (
              <tr key={user.id} className="hover:bg-blue-50 transition-colors">
                <td className="p-2 border">{highlight(user.name)}</td>
                <td className="p-2 border">{highlight(user.mobile)}</td>
                <td className="p-2 border">{user.date ? highlight(user.date) : '-'}</td>
                <td className="p-2 border">{user.time ? highlight(user.time) : '-'}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};


// LoanRequest interface (move to top for type safety)
interface LoanRequest {
  name: string;
  mobile: string;
  loanType?: string;
  aadhar: string;
  pan: string;
  bankPassbook: string;
  loanAmount: string;
  location: string;
}


// LoansProvidedTable component
const LoansProvidedTable: React.FC = () => {
  const [requests] = useState<LoanRequest[]>(() => {
    return JSON.parse(localStorage.getItem('loanRequests') || '[]');
  });
  const [status] = useState<{ [key: number]: string }>(() => {
    return JSON.parse(localStorage.getItem('loanRequestStatus') || '{}');
  });
  const approved = requests.filter((_, idx) => status[idx] === 'approved');
  if (!approved.length) return <div>No loans provided.</div>;
  return (
    <table className="w-full border">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-2 border">Name</th>
          <th className="p-2 border">Mobile</th>
          <th className="p-2 border">Aadhaar</th>
          <th className="p-2 border">PAN</th>
          <th className="p-2 border">Bank Passbook</th>
          <th className="p-2 border">Loan Amount</th>
          <th className="p-2 border">Location</th>
          <th className="p-2 border">Status</th>
        </tr>
      </thead>
      <tbody>
        {approved.map((req, idx) => (
          <tr key={idx}>
            <td className="p-2 border">{req.name}</td>
            <td className="p-2 border">{req.mobile}</td>
            <td className="p-2 border"><a href="#" className="text-blue-600 underline">{req.aadhar}</a></td>
            <td className="p-2 border"><a href="#" className="text-blue-600 underline">{req.pan}</a></td>
            <td className="p-2 border"><a href="#" className="text-blue-600 underline">{req.bankPassbook}</a></td>
            <td className="p-2 border">{req.loanAmount}</td>
            <td className="p-2 border">{req.location}</td>
            <td className="p-2 border text-green-600 font-bold">Approved</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};



// SupportTable component to show contact messages
interface ContactMessage {
  name: string;
  email: string;
  phone: string;
  message: string;
  date?: string;
  time?: string;
}

const SupportTable: React.FC = () => {
  const messages: ContactMessage[] = JSON.parse(localStorage.getItem('contactMessages') || '[]');
  if (!messages.length) return <div>No support messages found.</div>;
  return (
    <table className="w-full border">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-2 border">Name</th>
          <th className="p-2 border">Email</th>
          <th className="p-2 border">Phone</th>
          <th className="p-2 border">Message</th>
          <th className="p-2 border">Date</th>
          <th className="p-2 border">Time</th>
        </tr>
      </thead>
      <tbody>
        {messages.map((msg, idx) => (
          <tr key={idx}>
            <td className="p-2 border">{msg.name}</td>
            <td className="p-2 border">{msg.email}</td>
            <td className="p-2 border">{msg.phone}</td>
            <td className="p-2 border">{msg.message}</td>
            <td className="p-2 border">{msg.date || '-'}</td>
            <td className="p-2 border">{msg.time || '-'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};


const AdminPanel: React.FC = () => {
  const [selectedSection, setSelectedSection] = useState(navItems[0]);
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-700 text-white flex flex-col py-6 px-4">
        <div className="mb-10">
          <div className="flex items-center mb-8">
            <img src="/LOGO.png" alt="Logo" className="w-10 h-10 mr-2" />
            <span className="text-2xl font-bold">Admin Panel</span>
          </div>
          <nav className="space-y-2">
            {navItems.map((item) => (
              <div
                key={item}
                className={`px-4 py-2 rounded-lg cursor-pointer font-semibold ${selectedSection === item ? 'bg-white text-blue-700' : 'hover:bg-blue-800'}`}
                onClick={() => setSelectedSection(item)}
              >
                {item}
              </div>
            ))}
            <button
              className="w-full mt-8 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold"
              onClick={() => navigate('/')}
            >
              Logout
            </button>
          </nav>
        </div>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold text-blue-700 mb-8">Admin Dashboard</h1>
        {selectedSection === 'Support' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">Support Messages</h2>
            <SupportTable />
          </div>
        )}
        {selectedSection === 'Dashboard' && (
          (() => {
            // Get loan requests and status from localStorage
            const loanRequests: LoanRequest[] = JSON.parse(localStorage.getItem('loanRequests') || '[]');
            const loanRequestStatus: { [key: number]: string } = JSON.parse(localStorage.getItem('loanRequestStatus') || '{}');
            const usersData: UserType[] = JSON.parse(localStorage.getItem('users') || '[]');
            const loansProvided = loanRequests.filter((_, idx) => loanRequestStatus[idx] === 'approved').length;
            const loansPending = loanRequests.filter((_, idx) => !loanRequestStatus[idx]).length;
            return (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow p-6 text-center">
                  <h2 className="text-xl font-semibold">Number of Users</h2>
                  <p className="text-2xl mt-2 font-bold text-blue-600">{usersData.length}</p>
                </div>
                <div className="bg-white rounded-lg shadow p-6 text-center">
                  <h2 className="text-xl font-semibold">Loans Provided</h2>
                  <p className="text-2xl mt-2 font-bold text-green-600">{loansProvided}</p>
                </div>
                <div className="bg-white rounded-lg shadow p-6 text-center">
                  <h2 className="text-xl font-semibold">Loans Pending</h2>
                  <p className="text-2xl mt-2 font-bold text-yellow-600">{loansPending}</p>
                </div>
              </div>
            );
          })()
        )}
        {selectedSection === 'Users' && (
          <UsersTable />
        )}
        {selectedSection === 'Loans Provided' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">Loans Provided</h2>
            <LoansProvidedTable />
          </div>
        )}
        {selectedSection === 'Loans Pending' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">Loans Pending</h2>
            <LoansPendingTable />
          </div>
        )}
        {selectedSection === 'Credit Score Checker' && (
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4">Credit Score Checker Submissions</h2>
            <CreditScoreSubmissionsTable />
          </div>
        )}
        {selectedSection === 'Loan Eligibility' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">Loan Eligibility Details</h2>
            <table className="w-full border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 border">Name</th>
                  <th className="p-2 border">Monthly Income (₹)</th>
                  <th className="p-2 border">Monthly Expenses (₹)</th>
                  <th className="p-2 border">Work Type</th>
                  <th className="p-2 border">Eligibility</th>
                </tr>
              </thead>
              <tbody>
                {(() => {
                  const eligibilityData = JSON.parse(localStorage.getItem('loanEligibilitySubmissions') || '[]');
                  if (!eligibilityData.length) return (
                    <tr><td className="p-2 border text-center" colSpan={5}>No eligibility submissions found.</td></tr>
                  );
                  return (eligibilityData as EligibilityEntry[]).map((entry, idx) => (
                    <tr key={idx}>
                      <td className="p-2 border">{entry.name}</td>
                      <td className="p-2 border">{entry.income}</td>
                      <td className="p-2 border">{entry.expenses}</td>
                      <td className="p-2 border">{entry.workType}</td>
                      <td className={"p-2 border font-bold " + (entry.eligible === 'Eligible' ? 'text-green-600' : 'text-red-600')}>{entry.eligible}</td>
                    </tr>
                  ));
                })()}
              </tbody>
            </table>
          </div>
        )}
        {selectedSection === 'Loan Requests' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">Loan Requests</h2>
            <LoanRequestsTable />
          </div>
        )}
      </main>
    </div>
  );
};





const LoanRequestsTable: React.FC = () => {
  const [requests] = useState<LoanRequest[]>(() => {
    return JSON.parse(localStorage.getItem('loanRequests') || '[]');
  });
  const [status, setStatus] = useState<{ [key: number]: string }>(() => {
    return JSON.parse(localStorage.getItem('loanRequestStatus') || '{}');
  });

  const handleAction = (idx: number, action: 'approved' | 'rejected') => {
    const newStatus = { ...status, [idx]: action };
    setStatus(newStatus);
    localStorage.setItem('loanRequestStatus', JSON.stringify(newStatus));
  };

  if (!requests.length) return <div>No loan requests found.</div>;

  return (
    <table className="w-full border">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-2 border">Name</th>
          <th className="p-2 border">Mobile</th>
          <th className="p-2 border">Type of Loan</th>
          <th className="p-2 border">Aadhaar</th>
          <th className="p-2 border">PAN</th>
          <th className="p-2 border">Bank Passbook</th>
          <th className="p-2 border">Loan Amount</th>
          <th className="p-2 border">Location</th>
          <th className="p-2 border">Status</th>
          <th className="p-2 border">Actions</th>
        </tr>
      </thead>
      <tbody>
        {requests.map((req, idx) => (
          <tr key={idx}>
            <td className="p-2 border">{req.name}</td>
            <td className="p-2 border">{req.mobile}</td>
            <td className="p-2 border">{req.loanType || '-'}</td>
            <td className="p-2 border"><a href="#" className="text-blue-600 underline">{req.aadhar}</a></td>
            <td className="p-2 border"><a href="#" className="text-blue-600 underline">{req.pan}</a></td>
            <td className="p-2 border"><a href="#" className="text-blue-600 underline">{req.bankPassbook}</a></td>
            <td className="p-2 border">{req.loanAmount}</td>
            <td className="p-2 border">{req.location}</td>
            <td className="p-2 border">
              {status[idx] ? (
                <span className={status[idx] === 'approved' ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>{status[idx]}</span>
              ) : (
                <span className="text-yellow-600 font-bold">pending</span>
              )}
            </td>
            <td className="p-2 border">
              {!status[idx] && (
                <>
                  <button className="bg-green-600 text-white px-2 py-1 rounded mr-2" onClick={() => handleAction(idx, 'approved')}>Approve</button>
                  <button className="bg-red-600 text-white px-2 py-1 rounded" onClick={() => handleAction(idx, 'rejected')}>Reject</button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

// CreditScoreSubmissionsTable component
interface CreditScoreSubmission {
  fullName: string;
  mobileNumber: string;
  panNumber: string;
  email: string;
  creditScore: string;
}

const CreditScoreSubmissionsTable: React.FC = () => {
  const [submissions] = useState<CreditScoreSubmission[]>(
    JSON.parse(localStorage.getItem('creditScoreSubmissions') || '[]')
  );

  if (!submissions.length) return <div>No credit score submissions found.</div>;

  return (
    <table className="w-full border">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-2 border">Full Name</th>
          <th className="p-2 border">Mobile Number</th>
          <th className="p-2 border">PAN Number</th>
          <th className="p-2 border">Email Address</th>
          <th className="p-2 border">Credit Score</th>
        </tr>
      </thead>
      <tbody>
        {submissions.map((sub, idx) => (
          <tr key={idx}>
            <td className="p-2 border">{sub.fullName}</td>
            <td className="p-2 border">{sub.mobileNumber}</td>
            <td className="p-2 border">{sub.panNumber}</td>
            <td className="p-2 border">{sub.email}</td>
            <td className="p-2 border">{sub.creditScore}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AdminPanel;
