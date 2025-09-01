import os
import google.generativeai as genai
from dotenv import load_dotenv
from google.api_core.exceptions import ResourceExhausted

load_dotenv()
genai.configure(api_key=os.getenv('GEMINI_API_KEY'))

def get_trade_insight(trade_text):
    # Using the Gemini API to get trade insights
    try:
            
        model = genai.GenerativeModel("gemini-2.0-flash")
        # model = genai.GenerativeModel("gemini-1.0-pro")
        
        
        prompt = f"""
        Summarize and analyze the following agriculture product trade:

        Trade Details: {trade_text}

        Your task:
        1. Create a short summary of what the trade is.
        2. Provide useful insight, such as fairness or possible reasons for trade.
        3. Keep response short (within 120 words).
        """
        response = model.generate_content(prompt)
        return response.text
    except ResourceExhausted as e:
        print("Quota exceeded:", e)
        return "AI quota exceeded. Please try again later or upgrade your plan."