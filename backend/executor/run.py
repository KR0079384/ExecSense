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
    is_c = profile == "c-basic"

    with tempfile.TemporaryDirectory() as tmpdir:
        # Decide filename based on language
        if is_c:
            code_path = os.path.join(tmpdir, "main.c")
        else:
            code_path = os.path.join(tmpdir, "main.py")

        with open(code_path, "w") as f:
            f.write(code)

        # Normalize Windows CRLF → LF for stdin
        normalized_input = user_input.replace("\r\n", "\n").replace("\r", "\n")

        if is_c:
            # Compile + run C
            cmd = [
                "docker", "run",
                "-i",
                "--rm",
                "--network", "none",
                "--memory", "512m",
                "--cpus", "0.5",
                "-v", f"{tmpdir}:/app",
                image_name,
                "sh", "-c",
                "gcc /app/main.c -o /app/a.out && /app/a.out"
            ]
        else:
            # Run Python
            cmd = [
                "docker", "run",
                "-i",
                "--rm",
                "--network", "none",
                "--memory", "512m",
                "--cpus", "0.5",
                "-v", f"{tmpdir}:/app",
                image_name,
                "python", "/app/main.py"
            ]

        try:
            result = subprocess.run(
                cmd,
                input=normalized_input,
                text=True,
                capture_output=True,
                timeout=5
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
