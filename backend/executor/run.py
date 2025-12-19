import subprocess
import tempfile
import os
from executor.profiles import PROFILES


def run_in_docker(code: str, profile: str, user_input: str = ""):
    if profile not in PROFILES:
        return {
            "status": "unsupported",
            "stdout": "",
            "stderr": "Requested execution environment not available"
        }

    image_name = PROFILES[profile]

    with tempfile.NamedTemporaryFile(delete=False, suffix=".py") as f:
        f.write(code.encode())
        file_path = f.name

    try:
        result = subprocess.run(
            [
                "docker", "run", "--rm",
                "--network", "none",
                "--memory", "512m",
                "--cpus", "0.5",
                "-v", f"{file_path}:/app/main.py",
                image_name,
                "python", "/app/main.py"
            ],
            input=user_input,
            text=True,
            capture_output=True,
            timeout=3
        )

        return {
            "status": "success",
            "stdout": result.stdout[:5000],
            "stderr": result.stderr[:2000]
        }

    except subprocess.TimeoutExpired:
        return {
            "status": "timeout",
            "stdout": "",
            "stderr": "Execution timed out"
        }

    finally:
        os.remove(file_path)
