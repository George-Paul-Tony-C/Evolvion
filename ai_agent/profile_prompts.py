def get_profile_analysis_prompt(user_profile_data):
    """
    Creates a prompt for Gemini to analyze a user's profile and infer skill gaps.
    """
    
    # Convert the user's data into a readable string format for the prompt
    profile_str = "\n".join([f"- {key.replace('_', ' ').title()}: {value}" for key, value in user_profile_data.items()])

    prompt = f"""
    You are an expert HR analyst and career development coach. Your task is to analyze an employee's profile and identify their key skill gaps based on their role and performance.

    **Employee Profile:**
    {profile_str}

    **Your Task:**
    1.  Based on the "Job Role" (e.g., "Consultant"), infer the top 3 most critical technical skills required.
    2.  Analyze the "Performance Ratings" and "Existing Skills" to identify potential weaknesses or areas for growth.
    3.  Identify exactly 2 primary skill gaps that this employee should focus on.

    **Output Format:**
    You MUST respond with ONLY a valid JSON object. Do not include any text, explanation, or markdown formatting before or after the JSON object.
    The JSON object must follow this exact structure:
    {{
      "identifiedSkillGaps": [
        "First Skill Gap",
        "Second Skill Gap"
      ],
      "reasoning": "A brief, one-sentence explanation for why these gaps were identified based on the profile data."
    }}
    """
    return prompt
