interface EditorPanelProps {
  code: string;
  onChange: (code: string) => void;
}

export function EditorPanel({ code, onChange }: EditorPanelProps) {
  const lineCount = code.split('\n').length;
  const lineNumbers = Array.from({ length: Math.max(lineCount, 1) }, (_, i) => i + 1);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-5 py-3 bg-[#0f172a]/50 dark:bg-[#0a0a0a]/50 border-b border-[#00d4ff]/20">
        <span className="text-xs font-bold text-gray-700 dark:text-[#00d4ff] uppercase tracking-wider neon-text">
          CODE EDITOR
        </span>
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
          </div>
        </div>
      </div>
      <div className="flex-1 relative overflow-hidden bg-transparent">
        <div className="absolute inset-0 flex">
          {/* Line Numbers */}
          <div className="w-14 py-4 pr-3 text-right font-mono text-xs text-gray-500 dark:text-[#00d4ff]/50 select-none border-r border-gray-200 dark:border-[#00d4ff]/10">
            {lineNumbers.map((num) => (
              <div key={num} className="leading-[1.8]">
                {num}
              </div>
            ))}
          </div>
          {/* Code Editor */}
          <textarea
            value={code}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Paste your code here..."
            className="flex-1 py-4 pl-5 pr-5 font-mono text-sm bg-transparent text-gray-900 dark:text-gray-100 border-0 focus:outline-none resize-none"
            style={{
              lineHeight: '1.8',
              tabSize: 2,
              caretColor: '#00d4ff',
            }}
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
}
