import { useState, useEffect } from 'react';

interface OutputPanelProps {
  stdout?: string;
  stderr?: string;
  explanation?: string;
  error?: string;
}

type Tab = 'output' | 'error' | 'explanation';

export function OutputPanel({ stdout, stderr, explanation, error }: OutputPanelProps) {
  const [activeTab, setActiveTab] = useState<Tab>('output');

  // Auto-select appropriate tab when content changes
  useEffect(() => {
    if (error || stderr) {
      setActiveTab('error');
    } else if (stdout) {
      setActiveTab('output');
    } else if (explanation) {
      setActiveTab('explanation');
    }
  }, [stdout, stderr, explanation, error]);

  const hasContent = stdout || stderr || explanation || error;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const getTabContent = () => {
    switch (activeTab) {
      case 'output':
        return stdout || 'No output';
      case 'error':
        return stderr || error || 'No errors';
      case 'explanation':
        return explanation || 'No explanation available';
      default:
        return '';
    }
  };

  const tabs: { id: Tab; label: string; count?: number }[] = [
    { id: 'output', label: 'Output', count: stdout ? 1 : 0 },
    { id: 'error', label: 'Error', count: stderr || error ? 1 : 0 },
    { id: 'explanation', label: 'Explanation', count: explanation ? 1 : 0 },
  ];

  if (!hasContent) {
    return (
      <div className="h-full flex items-center justify-center glass-panel rounded-xl">
        <p className="text-gray-400 dark:text-[#00d4ff]/60 text-sm">No output yet. Run your code to see results.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full glass-panel rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3 bg-[#0f172a]/50 dark:bg-[#0a0a0a]/50 border-b border-[#00d4ff]/20">
        <div className="flex space-x-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-[#00d4ff]/20 dark:bg-[#00d4ff]/30 text-[#00d4ff] dark:text-[#00ffff] border border-[#00d4ff]/40 dark:border-[#00ffff]/50 neon-glow-cyan'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#1a1a1a] hover:text-[#00d4ff]'
              }`}
            >
              {tab.label}
              {tab.count !== undefined && tab.count > 0 && (
                <span className="ml-2 px-2 py-0.5 text-xs rounded bg-[#00d4ff]/20 dark:bg-[#00d4ff]/30">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
        <button
          onClick={() => copyToClipboard(getTabContent())}
          className="p-2 text-gray-500 dark:text-[#00d4ff]/60 hover:text-gray-700 dark:hover:text-[#00ffff] hover:bg-gray-100 dark:hover:bg-[#1a1a1a] rounded-lg transition-colors duration-200"
          title="Copy to clipboard"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </button>
      </div>
      <div className="flex-1 overflow-auto p-5 bg-transparent">
        <pre className="font-mono text-sm text-gray-900 dark:text-gray-100 whitespace-pre-wrap break-words">
          {getTabContent()}
        </pre>
      </div>
    </div>
  );
}
