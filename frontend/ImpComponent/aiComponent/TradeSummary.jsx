"use client";
import axios from '../../utils/axios';
import { useState } from 'react';
import { X } from 'lucide-react'; // For a clean close icon

const TradeSummary = ({ tradeDescription }) => {
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const generateSummary = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/api/ai/trade-summary/', {
        trade_text: tradeDescription,
      });
      setSummary(response.data.summary);
      setShowPopup(true);
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };

  return (
    <div>
      <button
        onClick={generateSummary}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 disabled:opacity-50"
      >
        {loading ? 'Generating...' : 'Get Trade Insight'}
      </button>

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg w-[90%] max-w-lg p-6 relative animate-fade-in-up">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              onClick={() => setShowPopup(false)}
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-semibold mb-3 text-blue-700">📈 AI Insight</h3>
            <p className="text-gray-700 whitespace-pre-line">{summary}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TradeSummary;
