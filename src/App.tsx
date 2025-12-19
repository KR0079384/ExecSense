import { useState } from "react";

type ExecutionResult = {
  analysis?: any;
  execution?: {
    stdout?: string;
    stderr?: string;
  };
  explanation?: string;
  error?: string;
};

function App() {
  const [code, setCode] = useState("");
  const [input, setInput] = useState("");
  const [result, setResult] = useState<ExecutionResult | null>(null);
  const [loading, setLoading] = useState(false);

  const runCode = async () => {
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("http://127.0.0.1:8000/execute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
          input,
        }),
      });

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setResult({ error: "Backend not reachable" });
    }

    setLoading(false);
  };

  return (
    <div style={{ maxWidth: "900px", margin: "auto", padding: "20px" }}>
      <h1>AETHER</h1>
      <p style={{ color: "#555" }}>
        Intent-aware, secure code execution engine
      </p>

      <textarea
        placeholder="Paste your code here..."
        value={code}
        onChange={(e) => setCode(e.target.value)}
        style={{
          width: "100%",
          height: "200px",
          marginBottom: "10px",
          fontFamily: "monospace",
        }}
      />

      <textarea
        placeholder="Optional input (stdin)"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{
          width: "100%",
          height: "80px",
          marginBottom: "10px",
          fontFamily: "monospace",
        }}
      />

      <button onClick={runCode} disabled={loading}>
        {loading ? "Running..." : "Run Code"}
      </button>

      {result && (
        <div style={{ marginTop: "20px" }}>
          {result.explanation && (
            <>
              <h3>Explanation</h3>
              <pre>{result.explanation}</pre>
            </>
          )}

          {result.execution?.stdout && (
            <>
              <h3>Output</h3>
              <pre>{result.execution.stdout}</pre>
            </>
          )}

          {result.execution?.stderr && (
            <>
              <h3>Error</h3>
              <pre>{result.execution.stderr}</pre>
            </>
          )}

          {result.error && (
            <>
              <h3>Error</h3>
              <pre>{result.error}</pre>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
