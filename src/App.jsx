import { useState, useEffect } from 'react';

function App() {
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    let intervalId = null;

    if (isActive) {
      intervalId = setInterval(() => {
        setSecondsElapsed((prevSeconds) => prevSeconds + 1);
      }, 1000);
    } else {
      clearInterval(intervalId);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isActive]);

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const formatTimeStamp = (dateObj) => {
    return dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  const toggleTimer = () => {
    if (isActive && secondsElapsed > 0) {
      const newSessionLog = {
        id: Date.now(),
        duration: formatTime(secondsElapsed),
        completedAt: formatTimeStamp(new Date()),
      };
      setSessions((prevSessions) => [newSessionLog, ...prevSessions]);
    }
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setSecondsElapsed(0);
  };

  return (
    <div className={`min-h-screen font-sans flex flex-col items-center justify-center p-6 transition-colors duration-300 ${
      isDarkMode ? 'bg-zinc-950 text-zinc-100' : 'bg-stone-100 text-stone-900'
    }`}>
      
      {/* Main Container */}
      <div className="max-w-md w-full space-y-6">
        
        <header className={`flex justify-between items-center border-b pb-4 ${
          isDarkMode ? 'border-zinc-800' : 'border-stone-300'
        }`}>
          <div>
            <h1 className="text-xl font-bold tracking-tight">Simple Stopwatch</h1>
            <p className={`text-xs mt-0.5 ${isDarkMode ? 'text-zinc-500' : 'text-stone-500'}`}>
              Timekeeping Instrument
            </p>
          </div>
          
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`text-xs font-semibold px-3 py-1.5 rounded border transition-colors ${
              isDarkMode 
                ? 'border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-zinc-300' 
                : 'border-stone-300 bg-white hover:bg-stone-50 text-stone-700'
            }`}
          >
            {isDarkMode ? 'Light' : 'Dark'}
          </button>
        </header>

        <div className={`rounded-full aspect-square w-full max-w-[280px] mx-auto flex flex-col items-center justify-center border-4 shadow-sm transition-colors ${
          isDarkMode ? 'border-zinc-800 bg-zinc-900' : 'border-stone-300 bg-white'
        }`}>
          <span className={`text-[10px] tracking-widest uppercase font-bold mb-1 ${
            isDarkMode ? 'text-zinc-500' : 'text-stone-400'
          }`}>
            {isActive ? 'Running' : 'Stopped'}
          </span>

          <div className={`text-5xl font-mono font-bold tracking-normal tabular-nums my-1 ${
            isDarkMode ? 'text-zinc-100' : 'text-stone-800'
          }`}>
            {formatTime(secondsElapsed)}
          </div>
          
          <span className={`text-[10px] font-semibold ${isDarkMode ? 'text-zinc-500' : 'text-stone-400'}`}>
            MIN : SEC
          </span>
        </div>

        <div className="flex gap-3 max-w-[280px] mx-auto w-full">
          <button
            onClick={resetTimer}
            className={`flex-1 font-bold text-xs uppercase tracking-wider py-3 rounded border transition-colors ${
              isDarkMode 
                ? 'border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-zinc-400' 
                : 'border-stone-300 bg-stone-50 hover:bg-stone-200 text-stone-600'
            }`}
          >
            Reset
          </button>

          <button
            onClick={toggleTimer}
            className={`flex-1 font-bold text-xs uppercase tracking-wider py-3 rounded text-white transition-colors ${
              isActive 
                ? 'bg-red-600 hover:bg-red-700' 
                : 'bg-emerald-600 hover:bg-emerald-700'
            }`}
          >
            {isActive ? 'Stop' : 'Start'}
          </button>
        </div>

        <div className={`rounded border p-4 transition-colors ${
          isDarkMode ? 'border-zinc-800 bg-zinc-900' : 'border-stone-300 bg-white'
        }`}>
          <h3 className={`text-xs font-bold tracking-wide uppercase mb-2 ${
            isDarkMode ? 'text-zinc-500' : 'text-stone-500'
          }`}>
            Recorded Split Intervals
          </h3>
          
          {sessions.length === 0 ? (
            <div className={`text-center py-6 text-xs font-medium border border-dashed rounded ${
              isDarkMode ? 'border-zinc-800 text-zinc-600' : 'border-stone-200 text-stone-400'
            }`}>
              No log intervals recorded by the ledger.
            </div>
          ) : (
            <div className="max-h-48 overflow-y-auto space-y-2 pr-1">
              {sessions.map((session, index) => (
                <div 
                  key={session.id} 
                  className={`flex justify-between items-center border px-3 py-2.5 rounded text-xs transition-colors ${
                    isDarkMode 
                      ? 'bg-zinc-950 border-zinc-800 text-zinc-300' 
                      : 'bg-stone-50 border-stone-200 text-stone-700'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className={isDarkMode ? 'text-zinc-600' : 'text-stone-400'}>
                      #{sessions.length - index}
                    </span>
                    <span className="font-medium">
                      Duration: {session.duration}
                    </span>
                  </div>
                  <span className={`font-mono text-[11px] ${isDarkMode ? 'text-zinc-600' : 'text-stone-400'}`}>
                    [{session.completedAt}]
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default App;
