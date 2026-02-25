import { useEffect, useState, useRef } from "react";
import GlitchHeading from "./GlitchEffect";

const validUsername = "daniel";
const validPassword = "cybersec";

const SplashIntro = ({ onFinish }: { onFinish: () => void }) => {
    const [fadeOut, setFadeOut] = useState(false);
    const [activeTab, setActiveTab] = useState<"login" | "terminal">("login");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("SYSTEM_READY - Awaiting Authentication");
    
    // Terminal States
    const [terminalInput, setTerminalInput] = useState("");
    const [terminalOutput, setTerminalOutput] = useState<string[]>([
        "BOOTING OS_CORE...",
        "NETWORK_UPLINK: ESTABLISHED",
        "ENCRYPTION: AES-256 ACTIVE",
        "SYSTEM READY",
    ]);
    
    const terminalHint = "HINT: Type 'help' for available commands";
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [terminalOutput]);

    useEffect(() => {
        if (fadeOut) {
            const timer = setTimeout(onFinish, 700);
            return () => clearTimeout(timer);
        }
    }, [fadeOut, onFinish]);

    const handleLoginSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (username.toLowerCase() === validUsername && password.toLowerCase() === validPassword) {
            setMessage("ACCESS_GRANTED");
            setFadeOut(true);
        } else {
            setMessage(`AUTH_ERROR: ACCESS_DENIED`);
            setUsername("");
            setPassword("");
        }
    };

    const handleTerminalSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const cmd = terminalInput.trim().toLowerCase();
        let response = "";

        if (cmd === "whoami") response = `UID: ${validUsername}`;
        else if (cmd === "echo $major") response = `VARS: ${validPassword}`;
        else if (cmd === "help") response = "AVAILABLE: whoami, echo $major, clear, login";
        else if (cmd === "clear") {
            setTerminalOutput([]);
            setTerminalInput("");
            return;
        } else if (cmd === "login") {
            setActiveTab("login");
            return;
        } else {
            response = `sh: command not found: ${cmd}`;
        }

        setTerminalOutput(prev => [...prev, `> ${terminalInput}`, response]);
        setTerminalInput("");
    };

    return (
        <div className={`fixed inset-0 flex flex-col items-center justify-center bg-[#1a1c1e] transition-opacity duration-1000 ${fadeOut ? "opacity-0" : "opacity-100"}`}>
            
            <div className="z-10 mb-10">
                <GlitchHeading />
            </div>

            <div className="w-full max-w-2xl bg-slate-800/40 backdrop-blur-md border border-white/20 shadow-[0_0_40px_rgba(255,255,255,0.05)] rounded-lg overflow-hidden font-mono">
                
                {/* Header */}
                <div className="bg-slate-700/50 px-4 py-3 border-b border-white/10 flex items-center justify-between text-slate-300">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-400/80" />
                        <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                        <div className="w-3 h-3 rounded-full bg-green-400/80" />
                    </div>
                    <span className="text-[10px] tracking-[0.2em] uppercase font-bold">Secure_Shell_Session</span>
                    <div className="w-12" />
                </div>

                {/* Tabs */}
                <div className="flex bg-slate-900/30 border-b border-white/5">
                    <button 
                        onClick={() => setActiveTab("login")}
                        className={`flex-1 py-4 text-xs tracking-widest uppercase transition-all ${activeTab === "login" ? "text-white bg-white/5 border-b-2 border-[#00ff41]" : "text-slate-500 hover:text-slate-300"}`}
                    >
                        Auth_Login
                    </button>
                    <button 
                        onClick={() => setActiveTab("terminal")}
                        className={`flex-1 py-4 text-xs tracking-widest uppercase transition-all ${activeTab === "terminal" ? "text-white bg-white/5 border-b-2 border-[#00ff41]" : "text-slate-500 hover:text-slate-300"}`}
                    >
                        Terminal
                    </button>
                </div>

                <div className="p-10 min-h-80 flex flex-col">
                    {activeTab === "login" ? (
                        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                            <div className="mb-10 flex items-center gap-3">
                                <div className={`h-2 w-2 rounded-full animate-pulse ${message.includes('DENIED') ? 'bg-red-500' : 'bg-[#00ff41]'}`} />
                                <div className={`text-sm tracking-tight ${message.includes('DENIED') ? 'text-red-400' : 'text-white'}`}>{message}</div>
                            </div>

                            <form onSubmit={handleLoginSubmit} className="space-y-8">
                                <div className="group">
                                    <label className="block text-[10px] uppercase text-slate-400 mb-2 tracking-widest">User_ID</label>
                                    <input
                                        className="bg-slate-900/50 border border-white/10 rounded-md text-white outline-none w-full px-4 py-3 focus:border-[#00ff41]/50 focus:bg-slate-900/80 transition-all placeholder-slate-600 font-mono"
                                        placeholder="Enter Username"
                                        value={username}
                                        onChange={e => setUsername(e.target.value)}
                                        autoFocus
                                    />
                                </div>

                                <div className="group">
                                    <label className="block text-[10px] uppercase text-slate-400 mb-2 tracking-widest">Pass_Key</label>
                                    <input
                                        type="password"
                                        /* The following Tailwind classes ensure the default browser eye icon 
                                           is white/visible on your dark background where supported.
                                        */
                                        className="bg-slate-900/50 border border-white/10 rounded-md text-white outline-none w-full px-4 py-3 focus:border-[#00ff41]/50 focus:bg-slate-900/80 transition-all placeholder-slate-600 font-mono accent-[#00ff41]"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-white text-slate-900 font-black py-4 rounded-md text-xs uppercase tracking-[0.3em] hover:bg-[#00ff41] transition-all duration-300 transform active:scale-[0.98]"
                                >
                                    Authorize
                                </button>
                            </form>
                        </div>
                    ) : (
                        <div className="flex flex-col h-full animate-in fade-in duration-500">
                            {/* Terminal Display */}
                            <div ref={scrollRef} className="flex-1 h-64 overflow-y-auto mb-6 space-y-2 text-sm scrollbar-hide">
                            {terminalOutput.map((line, idx) => {
  const isCommand = line.startsWith("> ");
  const isHelp = line.startsWith("AVAILABLE:");

  return (
    <div key={idx} className="flex">
      {isCommand ? (
        <>
          {/* Prompt */}
          <span className="font-bold mr-1 text-red-400 select-none">root</span>
          <span className="font-bold text-white select-none">@</span>
          <span className="font-bold text-cyan-400 select-none">daniel</span>
          <span className="text-gray-400 select-none">:~$</span>
          <span className="text-slate-400 ml-2">{line.slice(2)}</span>
        </>
      ) : isHelp ? (
        <span className="ml-6 leading-relaxed">
          <span className="text-green-400">AVAILABLE:</span>{" "}
          <span className="text-cyan-400 font-semibold">whoami</span>,{" "}
          <span className="text-purple-400 font-semibold">echo $major</span>,{" "}
          <span className="text-yellow-400 font-semibold">clear</span>,{" "}
          <span className="text-pink-400 font-semibold">login</span>
        </span>
      ) : (
        <span className="text-[#00ff41] ml-6 leading-relaxed">
          {line}
        </span>
      )}
    </div>
  );
})}
                            <div className="text-[#00ff41] opacity-70 italic mt-4 border-t border-white/5 pt-2">
                                <span className="opacity-50 mr-2">::</span>
                                {terminalHint}
                            </div>
                            </div>

                            {/* Terminal Input */}
                            <form onSubmit={handleTerminalSubmit} className="flex items-center bg-slate-950/40 rounded-md px-4 py-3 border border-white/5 group focus-within:border-[#00ff41]/30 transition-all">
                            {/* Colored prompt for input */}
                            <span className="font-bold mr-1 text-red-400 select-none">root</span>
                            <span className="font-bold text-white select-none">@</span>
                            <span className="font-bold text-cyan-400 select-none">daniel</span>
                            <span className="text-gray-400 select-none">:~$</span>
                            <input
                                className="bg-transparent text-white outline-none flex-1 text-sm placeholder-slate-700 font-mono ml-2"
                                value={terminalInput}
                                onChange={e => setTerminalInput(e.target.value)}
                                placeholder="Execute command..."
                                autoFocus
                            />
                            </form>
                        </div>
                    )}
                </div>
            </div>
            
            <div className="mt-10 text-[9px] text-[#00ff41] font-mono tracking-[0.4em] uppercase opacity-50">
                // System Status: Secured
            </div>
        </div>
    );
};

export default SplashIntro;