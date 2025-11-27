def get_recommendation_prompt(skill_gaps, available_courses):
    """
    Creates a prompt for Gemini to generate a personalized learning path.
    """
    
    # Format the list of skill gaps
    gaps_str = ", ".join(skill_gaps)

    # Format the list of available courses and their skill tags
    courses_str = "\n".join([f"- Course Title: '{c['title']}', Relevant Skills: {', '.join(c['skillTags'])}" for c in available_courses])

    prompt = f"""
    You are an expert AI career advisor. Your task is to create a personalized, ranked learning path for an employee based on their identified skill gaps and a catalog of available courses.

    **Employee's Identified Skill Gaps:**
    {gaps_str}

    **Available Courses Catalog:**
    {courses_str}

    **Your Task:**
    1.  Analyze the employee's skill gaps.
    2.  From the catalog, select the 2-3 most relevant courses that directly address these gaps.
    3.  Rank the selected courses in a logical learning order (e.g., fundamentals first).
    4.  For each recommended course, write a concise, personalized, one-sentence reason explaining *why* this specific course is important for bridging their skill gaps.

    **Output Format:**
    You MUST respond with ONLY a valid JSON object. Do not include any text, explanation, or markdown formatting before or after the JSON object.
    The JSON object must follow this exact structure:
    {{
      "pathTitle": "A Creative and Encouraging Title for the Learning Path",
      "pathDescription": "A brief, one-sentence description of what this path will achieve.",
      "recommendedCourses": [
        {{
          "courseTitle": "Title of the First Recommended Course",
          "priority": 1,
          "personalizedReason": "Your personalized reason for recommending this course."
        }},
        {{
          "courseTitle": "Title of the Second Recommended Course",
          "priority": 2,
          "personalizedReason": "Your personalized reason for recommending this course."
        }}
      ]
    }}
    """
    return prompt
