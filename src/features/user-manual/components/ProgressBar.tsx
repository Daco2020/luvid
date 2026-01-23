interface ProgressBarProps {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const progress = (current / total) * 100;

  return (
    <div className="w-full mb-8 flex items-center gap-4">
      <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <span className="text-xs font-medium text-slate-400 min-w-[3rem] text-right">
        {current} / {total}
      </span>
    </div>
  );
}
