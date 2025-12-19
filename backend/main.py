from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from analyzer.analyze import analyze_code
from executor.run import run_in_docker
from explainer.explain import generate_explanation

app = FastAPI()

# ✅ CORS MUST BE ADDED BEFORE ROUTES
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/execute")
def execute(payload: dict):
    code = payload.get("code", "")
    user_input = payload.get("input", "")

    analysis = analyze_code(code)

    if analysis["risk"] == "high":
        return {
            "status": "blocked",
            "analysis": analysis,
            "explanation": "Unsafe code detected. Execution blocked."
        }

    execution_result = run_in_docker(
        code,
        analysis["profile"],
        user_input
    )

    explanation = generate_explanation(analysis, execution_result)

    return {
        "analysis": analysis,
        "execution": execution_result,
        "explanation": explanation
    }
