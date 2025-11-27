def get_tracker_analysis_prompt(quiz_scores):
    """
    Creates a prompt for Gemini to analyze quiz scores and detect a learning plateau.
    """
    
    # Format the list of scores into a readable string
    scores_str = ", ".join([f"{score}%" for score in quiz_scores])

    prompt = f"""
    You are an intelligent learning analytics engine. Your task is to analyze an employee's recent quiz scores on a single topic to detect if they are plateauing.

    **Recent Quiz Scores (in chronological order):**
    {scores_str}

    **Your Task:**
    1.  Analyze the trend of the scores. A plateau is indicated by scores that are not improving significantly over the last 3-4 attempts, or are fluctuating without a clear upward trend.
    2.  Determine if the user is plateauing.
    3.  If they are plateauing, suggest a specific, encouraging intervention. The intervention should be a short, actionable piece of advice.

    **Output Format:**
    You MUST respond with ONLY a valid JSON object. Do not include any text, explanation, or markdown formatting before or after the JSON object.
    The JSON object must follow this exact structure:
    {{
      "isPlateauing": boolean,
      "interventionSuggestion": "Your suggested intervention here. For example: 'It looks like you're stuck on this topic. Maybe try reviewing the foundational concepts in the 'Java Fundamentals' course?' or null if not plateauing."
    }}
    """
    return prompt
