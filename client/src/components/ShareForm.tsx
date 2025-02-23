import { useState } from 'react';
import { useLocation } from 'react-router-dom';

const ShareForm = () => {
  const location = useLocation();
  const capsuleTitle = location.state?.capsuleTitle || "Selected Capsule";
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            🕰️ Invite to Time Capsule
          </h2>
          
          {/* Capsule Title Display */}
          <div className="mb-8 p-4 bg-indigo-50 rounded-lg border-l-4 border-indigo-500">
            <h3 className="text-sm font-semibold text-indigo-600 uppercase tracking-wide">Selected Capsule</h3>
            <p className="text-gray-800 mt-1 text-lg font-medium">{capsuleTitle}</p>
          </div>

          <form className="space-y-8">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Your Name
              </label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition duration-200 outline-none"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Recipient Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition duration-200 outline-none"
                placeholder="friend@example.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Personal Message
              </label>
              <textarea
                id="message"
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition duration-200 outline-none resize-none"
                placeholder="Write your heartfelt message..."
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition duration-200 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              ✨ Send Invite
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ShareForm;
