"use client";
import axios from '../../utils/axios';
import { useState } from 'react';
import { X, Bot, Loader2 } from 'lucide-react'; // For a clean close icon
import { Button } from "@/components/ui/button"

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
    <>
      

            <Button
            onClick={generateSummary}
            disabled={loading}
            className={`flex items-center bg-blue-600 gap-2 px-4 py-2 text-blue-600 rounded-full border border-green-600 font-semibold shadow-md transition-all duration-300 hover:bg-green-600 hover:text-white
                ${loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700'}
                relative overflow-hidden group`}
            >
            {loading ? (
                <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Generating...
                </>
            ) : (
                <>
                <Bot className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                <span className="relative z-10">Get Trade Insight</span>
                <span className="absolute inset-0 bg-blue-300 opacity-10 group-hover:opacity-20 transition duration-300 rounded-full blur-sm"></span>
                </>
            )}
            </Button>


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
    </>
  );
};

export default TradeSummary;
