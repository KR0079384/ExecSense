type Status = 'idle' | 'running' | 'success' | 'error';

interface StatusBadgeProps {
  status: Status;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const getStatusConfig = () => {
    switch (status) {
      case 'running':
        return {
          text: 'Running',
          bg: 'bg-[#00d4ff]/10 dark:bg-[#00d4ff]/20',
          textColor: 'text-[#00d4ff] dark:text-[#00ffff]',
          border: 'border-[#00d4ff]/30 dark:border-[#00ffff]/40',
          glow: 'neon-glow-cyan',
          icon: (
            <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ),
        };
      case 'success':
        return {
          text: 'Success',
          bg: 'bg-green-100 dark:bg-[#00ff88]/20',
          textColor: 'text-green-700 dark:text-[#00ff88]',
          border: 'border-green-300 dark:border-[#00ff88]/40',
          glow: '',
          icon: (
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          ),
        };
      case 'error':
        return {
          text: 'Error',
          bg: 'bg-red-100 dark:bg-red-900/30',
          textColor: 'text-red-700 dark:text-red-400',
          border: 'border-red-300 dark:border-red-700',
          glow: '',
          icon: (
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          ),
        };
      default:
        return {
          text: 'Ready',
          bg: 'bg-gray-100 dark:bg-[#1a1a1a]',
          textColor: 'text-gray-600 dark:text-[#00d4ff]/80',
          border: 'border-gray-300 dark:border-[#00d4ff]/20',
          glow: '',
          icon: null,
        };
    }
  };

  const config = getStatusConfig();

  return (
    <div
      className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg border ${config.bg} ${config.textColor} ${config.border} ${config.glow} transition-all duration-200`}
    >
      {config.icon && <span>{config.icon}</span>}
      <span className="text-sm font-semibold">{config.text}</span>
    </div>
  );
}
