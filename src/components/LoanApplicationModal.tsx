import React, { useState } from 'react';

interface LoanApplicationModalProps {
  show: boolean;
  onClose: () => void;
}

const LoanApplicationModal: React.FC<LoanApplicationModalProps> = ({ show, onClose }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Replace with your actual login logic
    return localStorage.getItem('isLoggedIn') === 'true';
  });
  const [form, setForm] = useState({
    name: '',
    mobile: '',
    loanType: '',
    aadhar: null as File | null,
    pan: null as File | null,
    loanAmount: '',
    bankPassbook: null as File | null,
    location: ''
  });
  const [notification, setNotification] = useState('');
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState('');

  const handleLogin = () => {
    localStorage.setItem('isLoggedIn', 'true');
    setIsLoggedIn(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, files } = e.target as HTMLInputElement & HTMLSelectElement;
    if (files && files.length > 0) {
      setForm({ ...form, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleLocationFetch = () => {
    setLocationLoading(true);
    setLocationError('');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            // Use OpenStreetMap Nominatim API for reverse geocoding
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
            const data = await response.json();
            let area = '';
            let city = '';
            let district = '';
            let state = '';
            let country = '';
            if (data.address) {
              area = data.address.suburb || data.address.neighbourhood || data.address.village || data.address.town || data.address.hamlet || '';
              city = data.address.city || data.address.town || data.address.village || '';
              district = data.address.county || data.address.state_district || '';
              state = data.address.state || '';
              country = data.address.country || '';
            }
            const locationString = [area, city, district, state, country].filter(Boolean).join(', ');
            setForm((prev) => ({ ...prev, location: locationString || `${latitude}, ${longitude}` }));
          } catch {
            setForm((prev) => ({ ...prev, location: `${latitude}, ${longitude}` }));
            setLocationError('Could not fetch area/city name.');
          }
          setLocationLoading(false);
        },
        () => {
          setLocationError('Unable to fetch location. Please allow location access.');
          setLocationLoading(false);
        }
      );
    } else {
      setLocationError('Geolocation is not supported by your browser.');
      setLocationLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For demo, just store file names
    const requestData = {
      ...form,
      aadhar: form.aadhar ? form.aadhar.name : '',
      pan: form.pan ? form.pan.name : '',
      bankPassbook: form.bankPassbook ? form.bankPassbook.name : '',
    };
    const requests = JSON.parse(localStorage.getItem('loanRequests') || '[]');
    requests.push(requestData);
    localStorage.setItem('loanRequests', JSON.stringify(requests));
    setNotification('Your request is sent, our team will reach you soon.');
    setForm({ name: '', mobile: '', loanType: '', aadhar: null, pan: null, loanAmount: '', bankPassbook: null, location: '' });
    setTimeout(() => {
      onClose();
      setNotification('');
    }, 2500);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 relative">
        <button className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl font-bold transition" onClick={onClose}>&times;</button>
        {!isLoggedIn ? (
          <div className="flex flex-col items-center justify-center py-8">
            <h2 className="text-2xl font-bold mb-2 text-blue-700">Login Required</h2>
            <p className="mb-6 text-gray-600">Please login to apply for a loan.</p>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-blue-700 transition" onClick={handleLogin}>Go to Login</button>
          </div>
        ) : (
          <form className="space-y-6" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold mb-4 text-blue-700 text-center">Loan Application</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Full Name" required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                <input type="tel" name="mobile" value={form.mobile} onChange={handleChange} placeholder="Mobile Number" required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Type of Loan</label>
                <select name="loanType" value={form.loanType} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Select Loan Type</option>
                  <option value="Home Loans">Home Loans</option>
                  <option value="Business Loans">Business Loans</option>
                  <option value="Personal Loans">Personal Loans</option>
                  <option value="Mortgage Loans">Mortgage Loans</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Aadhaar Card (Upload)</label>
                <input type="file" name="aadhar" accept="image/*,.pdf" onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">PAN Card (Upload)</label>
                <input type="file" name="pan" accept="image/*,.pdf" onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Loan Amount</label>
                <input type="number" name="loanAmount" value={form.loanAmount} onChange={handleChange} placeholder="Loan Amount" required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bank Passbook (Upload)</label>
                <input type="file" name="bankPassbook" accept="image/*,.pdf" onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Location</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="Current Location (auto or manual)"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    readOnly={locationLoading}
                  />
                  <button
                    type="button"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-700 transition"
                    onClick={handleLocationFetch}
                    disabled={locationLoading}
                  >
                    {locationLoading ? 'Locating...' : 'Pick Location'}
                  </button>
                </div>
                {locationError && <div className="text-red-600 text-sm mt-1">{locationError}</div>}
              </div>
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold shadow hover:bg-blue-700 transition">Submit Application</button>
            {notification && <div className="mt-6 text-green-600 text-center font-semibold text-lg animate-pulse">{notification}</div>}
          </form>
        )}
      </div>
    </div>
  );
};

export default LoanApplicationModal;
