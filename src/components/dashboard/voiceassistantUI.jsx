
export function Waveform({ active }) {
  return (
    <div className="flex items-center justify-center gap-[3px] h-12 px-1">
      {Array.from({ length: 20 }).map((_, i) => (
        <span
          key={i}
          className="inline-block w-[3px] rounded-full transition-all duration-300"
          style={{
            minHeight: "5px",
            maxHeight: "38px",
            background: active
              ? "linear-gradient(to top, #10b981, #6ee7b7)"
              : "rgba(255,255,255,0.12)",
            height: active ? undefined : "5px",
            animation: active
              ? `wave ${0.35 + (i % 6) * 0.1}s ease-in-out infinite alternate`
              : "none",
          }}
        />
      ))}
    </div>
  );
}

export function MicButton({ recording, disabled, onClick }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={recording ? "Stop recording" : "Start recording"}
      className={`
        relative flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center
        text-white border-none cursor-pointer transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        ${
          recording
            ? "bg-red-500 scale-105 shadow-[0_4px_20px_rgba(239,68,68,0.5)]"
            : "bg-emerald-500 shadow-[0_4px_16px_rgba(16,185,129,0.45)] hover:scale-105 hover:shadow-[0_6px_22px_rgba(16,185,129,0.55)]"
        }
      `}
    >
      <svg
        width="19" height="19" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2.2"
        strokeLinecap="round" strokeLinejoin="round"
      >
        <rect x="9" y="2" width="6" height="12" rx="3" />
        <path d="M5 10a7 7 0 0 0 14 0" />
        <line x1="12" y1="19" x2="12" y2="22" />
        <line x1="8" y1="22" x2="16" y2="22" />
      </svg>

      {recording && (
        <span
          className="absolute inset-0 rounded-full border-2 border-red-400 pointer-events-none"
          style={{ animation: "ripple 1.1s ease-out infinite" }}
        />
      )}
    </button>
  );
}

export function Spinner({ label }) {
  return (
    <div className="flex items-center gap-2.5 text-slate-400 text-xs">
      <svg
        className="animate-spin w-4 h-4 text-emerald-400 flex-shrink-0"
        viewBox="0 0 24 24" fill="none"
      >
        <circle
          className="opacity-25" cx="12" cy="12" r="10"
          stroke="currentColor" strokeWidth="3"
        />
        <path
          className="opacity-75" fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        />
      </svg>
      <span>{label}</span>
    </div>
  );
}

export function SuccessBanner({ transaction }) {
  const isIncome = transaction.transactionType === "sale";
  return (
    <div
      className={`flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-[13px] font-medium
        ${
          isIncome
            ? "text-emerald-300 bg-emerald-500/10 border border-emerald-500/20"
            : "text-red-300 bg-red-500/10 border border-red-500/20"
        }`}
    >
      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
        <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
          <path
            d="M2 6l3 3 5-5"
            stroke="#34d399" strokeWidth="1.8"
            strokeLinecap="round" strokeLinejoin="round"
          />
        </svg>
      </span>
      <span>
        Saved&nbsp;
        <strong className="text-white">{transaction.item}</strong>
        &nbsp;—&nbsp;
        {transaction.currency ?? "NGN"}&nbsp;
        {Number(transaction.amount).toLocaleString()}
        &nbsp;
        <span className="opacity-50">({isIncome ? "Sale" : "Expense"})</span>
      </span>
    </div>
  );
}

export function ErrorBanner({ message }) {
  return (
    <div className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-[13px] font-medium text-red-300 bg-red-500/10 border border-red-500/20">
      <svg
        width="15" height="15" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
      {message}
    </div>
  );
}