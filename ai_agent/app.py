import os
import json
from flask import Flask, jsonify, request
from dotenv import load_dotenv
import google.generativeai as genai
from prompts import get_assessment_prompt
from chatbot_prompts import get_chatbot_prompt 
from profile_prompts import get_profile_analysis_prompt
from recommender_prompts import get_recommendation_prompt
from tracker_prompts import get_tracker_analysis_prompt

# Load environment variables from a .env file
load_dotenv()

# --- Gemini API Configuration ---
try:
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        raise ValueError("GEMINI_API_KEY not found in environment variables.")
    genai.configure(api_key=api_key)
    
    # --- THIS IS THE CORRECTED LINE ---
    # We are using a newer, recommended model name.
    model = genai.GenerativeModel('gemini-2.5-flash') 
    
    print("✅ Gemini API configured successfully.")
except Exception as e:
    print(f"❌ Error configuring Gemini API: {e}")
    model = None

# Create a Flask application instance
app = Flask(__name__)

# --- API Endpoints ---
# ... (The rest of the file remains exactly the same)
@app.route('/api/agent/health', methods=['GET'])
def health_check():
    """Health check endpoint to confirm the service is running."""
    return jsonify({"status": "success", "message": "AI Agent service is running."}), 200

@app.route('/api/agent/generate-assessment', methods=['POST'])
def generate_assessment():
    """
    Generates a dynamic assessment using the Gemini API based on skill gaps.
    """
    if not model:
        return jsonify({"success": False, "message": "AI model is not configured."}), 500

    try:
        data = request.get_json()
        skill_gaps = data.get('skillGaps')
        difficulty = data.get('difficulty', 'Intermediate')

        if not skill_gaps:
            return jsonify({"success": False, "message": "Skill gaps are required."}), 400

        print(f"AI Agent: Received request to generate '{difficulty}' assessment for skills: {skill_gaps}")

        prompt = get_assessment_prompt(skill_gaps, difficulty)
        
        response = model.generate_content(prompt)
        
        cleaned_response_text = response.text.strip().replace('```json', '').replace('```', '')
        
        assessment_json = json.loads(cleaned_response_text)

        print("AI Agent: Successfully generated assessment from Gemini.")
        
        return jsonify({
            "success": True,
            "message": "Assessment generated successfully.",
            "data": assessment_json
        }), 200

    except Exception as e:
        print(f"❌ An error occurred in generate_assessment: {e}")
        return jsonify({"success": False, "message": f"An internal error occurred: {e}"}), 500
    
    
@app.route('/api/agent/chat', methods=['POST'])
def handle_chat():
    """
    Handles a turn in the conversation with the user.
    """
    if not model:
        return jsonify({"success": False, "message": "AI model is not configured."}), 500

    try:
        data = request.get_json()
        user_context = data.get('context')
        history = data.get('history', []) # The conversation so far

        if not user_context or not history:
            return jsonify({"success": False, "message": "User context and history are required."}), 400

        print(f"AI Agent: Received chat message. History length: {len(history)}")

        # Create the detailed prompt for the chatbot
        prompt = get_chatbot_prompt(user_context, history)
        
        # Call the Gemini API
        response = model.generate_content(prompt)
        
        bot_response = response.text.strip()

        print(f"AI Agent: Generated chat response: '{bot_response}'")
        
        return jsonify({
            "success": True,
            "message": "Response generated successfully.",
            "data": { "response": bot_response }
        }), 200

    except Exception as e:
        print(f"❌ An error occurred in handle_chat: {e}")
        return jsonify({"success": False, "message": f"An internal error occurred: {e}"}), 500    
    
@app.route('/api/agent/analyze-profile', methods=['POST'])
def analyze_profile():
    """
    Analyzes a user's profile data to infer skill gaps using the Gemini API.
    """
    if not model:
        return jsonify({"success": False, "message": "AI model is not configured."}), 500

    try:
        data = request.get_json()
        user_profile = data.get('profile')

        if not user_profile:
            return jsonify({"success": False, "message": "User profile data is required."}), 400

        print(f"AI Agent: Received request to analyze profile for user.")

        prompt = get_profile_analysis_prompt(user_profile)
        
        response = model.generate_content(prompt)
        
        cleaned_response_text = response.text.strip().replace('```json', '').replace('```', '')
        
        analysis_json = json.loads(cleaned_response_text)

        print(f"AI Agent: Successfully analyzed profile. Gaps found: {analysis_json.get('identifiedSkillGaps')}")
        
        return jsonify({
            "success": True,
            "message": "Profile analyzed successfully.",
            "data": analysis_json
        }), 200

    except Exception as e:
        print(f"❌ An error occurred in analyze_profile: {e}")
        return jsonify({"success": False, "message": f"An internal error occurred: {e}"}), 500
    
    
@app.route('/api/agent/recommend-path', methods=['POST'])
def recommend_path():
    """
    Generates a personalized learning path using the Gemini API.
    """
    if not model:
        return jsonify({"success": False, "message": "AI model is not configured."}), 500

    try:
        data = request.get_json()
        skill_gaps = data.get('skillGaps')
        courses = data.get('courses')

        if not skill_gaps or not courses:
            return jsonify({"success": False, "message": "Skill gaps and a list of courses are required."}), 400

        print(f"AI Agent: Received request to recommend a learning path for gaps: {skill_gaps}")

        prompt = get_recommendation_prompt(skill_gaps, courses)
        
        response = model.generate_content(prompt)
        
        cleaned_response_text = response.text.strip().replace('```json', '').replace('```', '')
        
        recommendation_json = json.loads(cleaned_response_text)

        print(f"AI Agent: Successfully generated learning path titled: '{recommendation_json.get('pathTitle')}'")
        
        return jsonify({
            "success": True,
            "message": "Learning path generated successfully.",
            "data": recommendation_json
        }), 200

    except Exception as e:
        print(f"❌ An error occurred in recommend_path: {e}")
        return jsonify({"success": False, "message": f"An internal error occurred: {e}"}), 500

@app.route('/api/agent/analyze-progress', methods=['POST'])
def analyze_progress():
    """
    Analyzes a user's quiz scores to detect a learning plateau.
    """
    if not model:
        return jsonify({"success": False, "message": "AI model is not configured."}), 500

    try:
        data = request.get_json()
        scores = data.get('scores')

        if not scores or len(scores) < 3:
            # We need at least 3 scores to detect a trend, so we don't analyze.
            return jsonify({
                "success": True,
                "data": {"isPlateauing": False, "interventionSuggestion": None}
            }), 200

        print(f"AI Agent: Received request to analyze progress for scores: {scores}")

        prompt = get_tracker_analysis_prompt(scores)
        
        response = model.generate_content(prompt)
        
        cleaned_response_text = response.text.strip().replace('```json', '').replace('```', '')
        
        analysis_json = json.loads(cleaned_response_text)

        print(f"AI Agent: Successfully analyzed progress. Plateau detected: {analysis_json.get('isPlateauing')}")
        
        return jsonify({
            "success": True,
            "message": "Progress analyzed successfully.",
            "data": analysis_json
        }), 200

    except Exception as e:
        print(f"❌ An error occurred in analyze_progress: {e}")
        return jsonify({"success": False, "message": f"An internal error occurred: {e}"}), 500


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 8000)), debug=True)
