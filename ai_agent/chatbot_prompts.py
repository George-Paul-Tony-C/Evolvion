def get_chatbot_prompt(user_context, conversation_history):
    """
    Creates a prompt for the Gemini API to act as a personalized learning assistant.
    
    Args:
        user_context (dict): A dictionary containing the user's name, skills, and progress.
        conversation_history (list): A list of previous messages in the conversation.
    """
    
    # Build a string representation of the user's context
    context_str = (
        f"User Name: {user_context.get('name', 'N/A')}\n"
        f"User Department: {user_context.get('department', 'N/A')}\n"
        f"Identified Skill Gaps: {', '.join(user_context.get('skillGaps', ['None']))}\n"
        f"Current Learning Path: {user_context.get('learningPathTitle', 'Not assigned')}"
    )

    # Build a string representation of the conversation history
    history_str = "\n".join([f"{msg['role']}: {msg['content']}" for msg in conversation_history])

    prompt = f"""
    You are "SkillUp Bot", a friendly, encouraging, and insightful AI learning assistant. Your goal is to help an employee improve their skills and stay motivated.

    **Your Personality:**
    - Positive and encouraging.
    - Knowledgeable but not robotic.
    - Proactive in suggesting learning tips.
    - Keep your responses concise and conversational (2-3 sentences).

    **User's Current Context:**
    {context_str}

    **Conversation History:**
    {history_str}

    **Your Task:**
    Based on the user's context and the conversation history, provide a helpful and encouraging response to the latest user message. If the user asks a question, answer it. If they seem stuck, offer a suggestion related to their skill gaps.

    **Your Response (as 'assistant'):**
    """
    return prompt
