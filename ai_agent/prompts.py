def get_assessment_prompt(skill_gaps, difficulty, num_questions=5):
    """
    Creates a detailed, structured prompt for the Gemini API to generate a quiz.
    """
    # Convert the list of skills into a comma-separated string
    skills_str = ", ".join(skill_gaps)

    # The prompt is carefully engineered to request a specific JSON structure.
    # This makes the output reliable and easy to parse.
    prompt = f"""
    You are an expert corporate trainer and assessment creator. Your task is to generate a multiple-choice quiz to evaluate an employee's proficiency.

    **Topic:** The quiz must cover the following skill gaps: {skills_str}.
    **Difficulty Level:** {difficulty}
    **Number of Questions:** {num_questions}

    **Instructions:**
    1.  Generate {num_questions} unique multiple-choice questions.
    2.  Each question must have exactly 4 choices.
    3.  Exactly one choice per question must be correct.
    4.  The questions should be relevant to a professional, corporate software development context.

    **Output Format:**
    You MUST respond with ONLY a valid JSON object. Do not include any text, explanation, or markdown formatting before or after the JSON object.
    The JSON object must follow this exact structure:
    {{
      "questions": [
        {{
          "questionText": "A sample question about {skills_str}",
          "choices": [
            {{ "option": "Choice A", "isCorrect": false }},
            {{ "option": "Choice B (The Correct Answer)", "isCorrect": true }},
            {{ "option": "Choice C", "isCorrect": false }},
            {{ "option": "Choice D", "isCorrect": false }}
          ]
        }}
      ]
    }}
    """
    return prompt
