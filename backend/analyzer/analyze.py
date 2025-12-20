def analyze_code(code: str):
    code_lower = code.lower()

    # -------- Language Detection (C FIRST) --------
    if "#include" in code_lower or "int main" in code_lower:
        language = "c"
    else:
        python_indicators = [
            "def ",
            "import ",
            "print(",
            "range(",
            "elif ",
            "else:",
        ]
        if any(tok in code_lower for tok in python_indicators):
            language = "python"
        else:
            language = "unknown"

    # -------- Framework Detection --------
    framework = "base"
    if language == "python" and any(
        lib in code_lower for lib in ["torch", "tensorflow", "numpy"]
    ):
        framework = "ml"

    # -------- Risk Detection --------
    dangerous_keywords = [
        "os.system",
        "subprocess",
        
        "rm -rf",
        "fork",
        "sys.exit",
    ]

    risk = "high" if any(k in code_lower for k in dangerous_keywords) else "low"

    # -------- Execution Profile Selection --------
    if language == "c":
        execution_profile = "c-basic"
    elif framework == "ml":
        execution_profile = "ml-basic"
    else:
        execution_profile = "base-basic"

    return {
        "language": language,
        "framework": framework,
        "risk": risk,
        "profile": execution_profile
    }
