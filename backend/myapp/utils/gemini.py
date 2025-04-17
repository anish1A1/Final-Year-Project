import os
import google.generativeai as genai
from dotenv import load_dotenv


load_dotenv()
genai.configure(api_key=os.getenv('GEMINI_API_KEY'))

def get_trade_insight(trade_text):
    # Use the Gemini API to get trade insights
    model = genai.GenerativeModel("gemini-1.5-pro")
    
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