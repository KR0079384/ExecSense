interface InputPanelProps {
  input: string;
  onChange: (input: string) => void;
}

export function InputPanel({ input, onChange }: InputPanelProps) {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-semibold text-gray-700 dark:text-[#00d4ff] mb-3">
        Standard Input (stdin)
      </label>
      <textarea
        value={input}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter input data (optional)..."
        className="w-full p-4 font-mono text-sm bg-white/50 dark:bg-[#0a0a0a]/50 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-[#00d4ff]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00d4ff]/50 focus:border-[#00d4ff]/50 resize-none transition-all duration-200"
        rows={3}
        spellCheck={false}
      />
    </div>
  );
}
