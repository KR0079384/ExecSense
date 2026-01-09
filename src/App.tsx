import { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { EditorPanel } from "./components/EditorPanel";
import { InputPanel } from "./components/InputPanel";
import { OutputPanel } from "./components/OutputPanel";
import { StatusBadge } from "./components/StatusBadge";

type ExecutionResult = {
  analysis?: {
    language?: string;
    framework?: string;
    risk?: string;
    profile?: string;
  };
  execution?: {
    stdout?: string;
    stderr?: string;
    status?: string;
  };
  explanation?: string;
  error?: string;
};

type ExecutionStatus = 'idle' | 'running' | 'success' | 'error';

function App() {
  const [code, setCode] = useState("");
  const [input, setInput] = useState("");
  const [result, setResult] = useState<ExecutionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [detectedLanguage, setDetectedLanguage] = useState<string | undefined>();

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
      
      // Update detected language from analysis
      if (data.analysis?.language) {
        setDetectedLanguage(data.analysis.language);
      }
    } catch (err) {
      setResult({ error: "Backend not reachable" });
    }

    setLoading(false);
  };

  // Auto-detect language from code changes
  useEffect(() => {
    if (!code.trim()) {
      setDetectedLanguage(undefined);
      return;
    }

    const codeLower = code.toLowerCase();
    if (codeLower.includes("#include") || codeLower.includes("int main")) {
      setDetectedLanguage("c");
    } else if (
      codeLower.includes("def ") ||
      codeLower.includes("import ") ||
      codeLower.includes("print(") ||
      codeLower.includes("range(")
    ) {
      setDetectedLanguage("python");
    } else {
      setDetectedLanguage("unknown");
    }
  }, [code]);

  const getExecutionStatus = (): ExecutionStatus => {
    if (loading) return 'running';
    if (result?.error) return 'error';
    if (result?.execution?.stderr) return 'error';
    if (result?.execution?.stdout || result?.explanation) return 'success';
    return 'idle';
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black transition-colors duration-300">
      <Navbar language={detectedLanguage} />
      
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[calc(100vh-8rem)]">
          {/* Left Panel - Code Editor */}
          <div className="flex flex-col space-y-6 min-h-[500px] lg:min-h-0">
            <div className="flex-1 min-h-[400px] lg:min-h-0 glass-panel rounded-xl overflow-hidden">
              <EditorPanel code={code} onChange={setCode} />
            </div>
            
            {/* Stdin Input */}
            <div className="glass-panel rounded-xl p-5">
              <InputPanel input={input} onChange={setInput} />
            </div>
            
            {/* Run Button and Status */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 glass-panel rounded-xl p-5">
              <StatusBadge status={getExecutionStatus()} />
              <button
                onClick={runCode}
                disabled={loading || !code.trim()}
                className="px-8 py-3 bg-gradient-to-r from-[#00d4ff] via-[#00b8e6] to-[#00ffff] text-white font-semibold rounded-lg hover:from-[#00e6ff] hover:via-[#00d4ff] hover:to-[#00ffff] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 neon-glow disabled:shadow-none focus:outline-none focus:ring-2 focus:ring-[#00d4ff]/50 w-full sm:w-auto transform hover:scale-105 disabled:transform-none"
              >
                {loading ? (
                  <span className="flex items-center justify-center space-x-2">
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Running...</span>
                  </span>
                ) : (
                  <span className="flex items-center justify-center space-x-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Run Code</span>
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Right Panel - Output */}
          <div className="flex flex-col min-h-[400px] lg:min-h-0">
            <div className="flex-1 min-h-0">
              <OutputPanel
                stdout={result?.execution?.stdout}
                stderr={result?.execution?.stderr}
                explanation={result?.explanation}
                error={result?.error}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
