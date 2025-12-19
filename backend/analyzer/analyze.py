def analyze_code(code: str):
    code_lower = code.lower()

    # -------- Language Detection --------
    python_indicators = [
        "def ",
        "import ",
        "print(",
        "for ",
        "while ",
        "range(",
        "if ",
        "elif ",
        "else:",
        ":"
    ]

    if any(tok in code_lower for tok in python_indicators):
        language = "python"
    elif "#include" in code_lower:
        language = "cpp"
    else:
        language = "unknown"

    # -------- Framework Detection --------
    framework = "base"
    if "torch" in code_lower or "tensorflow" in code_lower or "numpy" in code_lower:
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

    # -------- Execution Profile --------
    execution_profile = f"{framework}-basic"

    return {
        "language": language,
        "framework": framework,
        "risk": risk,
        "profile": execution_profile
    }
