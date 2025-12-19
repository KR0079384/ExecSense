def generate_explanation(analysis, execution_result):
    if analysis["risk"] == "high":
        return "Execution blocked due to detection of unsafe system-level operations."

    if execution_result["status"] == "timeout":
        return "Execution terminated because it exceeded the allowed time limit."

    if execution_result["stderr"]:
        return (
            f"Code was executed in the {analysis['profile']} environment, "
            "but a runtime error occurred."
        )

    return (
        f"Detected language: {analysis['language']}. "
        f"Selected execution environment: {analysis['profile']}. "
        "Code executed successfully inside a secure sandbox."
    )
