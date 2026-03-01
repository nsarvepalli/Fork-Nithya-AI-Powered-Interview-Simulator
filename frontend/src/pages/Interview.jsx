import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { startInterview, sendMessage, updateSessionStatus } from "../api";

const TRACKS = ["Software Development Engineer (SDE)", "Data Science"];
const TYPES = ["Technical", "Behavioral", "Mixed"];
const DIFFICULTIES = ["Entry Level", "Mid Level", "Senior Level"];

export default function Interview() {
  const [track, setTrack] = useState(TRACKS[0]);
  const [interviewType, setInterviewType] = useState(TYPES[0]);
  const [difficulty, setDifficulty] = useState(DIFFICULTIES[0]);
  const [numQuestions, setNumQuestions] = useState(5);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [sessionConfig, setSessionConfig] = useState(null);
  const [started, setStarted] = useState(false);
  const [completed, setCompleted] = useState(false);
  const bottomRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleStart = async () => {
    setLoading(true);
    try {
      const res = await startInterview(track, interviewType, difficulty, numQuestions);
      setSessionId(res.data.session_id);
      setSessionConfig({ track, interviewType, difficulty, numQuestions });
      setMessages(res.data.messages.filter((m) => m.role !== "system"));
      setStarted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    if (sessionId) await updateSessionStatus(sessionId, "abandoned");
    setMessages([]);
    setStarted(false);
    setCompleted(false);
    setSessionId(null);
    setSessionConfig(null);
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMsg = { role: "user", content: input };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);
    try {
      const allMessages = [
        { role: "system", content: buildSystemPrompt() },
        ...updatedMessages,
      ];
      const res = await sendMessage(
        sessionId, allMessages,
        sessionConfig.track, sessionConfig.interviewType,
        sessionConfig.difficulty, sessionConfig.numQuestions,
      );
      setMessages((prev) => [...prev, { role: "assistant", content: res.data.message }]);
      if (res.data.completed) setCompleted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const buildSystemPrompt = () => {
    if (!sessionConfig) return "";
    return `You are an expert technical interviewer conducting a ${sessionConfig.difficulty} ${sessionConfig.interviewType} interview for a ${sessionConfig.track} role. Ask one question at a time, provide feedback after each answer, and give a final evaluation after ${sessionConfig.numQuestions} questions.`;
  };

  const selectClass = "w-full bg-white text-slate-800 text-sm border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all font-medium appearance-none cursor-pointer";

  return (
    <div className="flex-1 flex flex-col bg-slate-50">
      {/* Top Header */}
      <div className="bg-white border-b border-slate-200 px-8 py-4 shrink-0">
        <h1 className="text-base font-semibold text-slate-900">
          {started
            ? `${sessionConfig.track} — ${sessionConfig.interviewType} (${sessionConfig.difficulty})`
            : "Configure your interview and click Start"}
        </h1>
        {completed && (
          <span className="text-sm text-emerald-600 font-semibold mt-0.5 inline-block">
            ✅ Interview Complete!
          </span>
        )}
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Settings Panel */}
        {!started && (
          <div className="w-80 border-r border-slate-200 bg-white p-6 flex flex-col gap-5 overflow-y-auto shrink-0 animate-fade-in">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Settings</h2>

            <div className="space-y-5">
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 block">Career Track</label>
                <select value={track} onChange={(e) => setTrack(e.target.value)} className={selectClass}>
                  {TRACKS.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 block">Interview Type</label>
                <select value={interviewType} onChange={(e) => setInterviewType(e.target.value)} className={selectClass}>
                  {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 block">Difficulty</label>
                <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className={selectClass}>
                  {DIFFICULTIES.map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 flex justify-between">
                  <span>Questions</span>
                  <span className="text-indigo-600 font-bold">{numQuestions}</span>
                </label>
                <input
                  type="range" min="3" max="10" value={numQuestions}
                  onChange={(e) => setNumQuestions(Number(e.target.value))}
                  className="w-full mt-1 accent-indigo-600 cursor-pointer"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-1">
                  <span>3</span><span>10</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleStart}
              disabled={loading}
              className="mt-4 w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 rounded-xl transition-all duration-200 text-sm disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Preparing..." : "🚀 Start Interview"}
            </button>
          </div>
        )}

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col w-full overflow-hidden">
          <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-4">
            {!started && (
              <div className="flex items-center justify-center h-full animate-fade-in">
                <div className="bg-white border border-slate-200 p-10 rounded-2xl text-center max-w-sm shadow-sm">
                  <div className="w-20 h-20 mx-auto mb-5">
                    <img src="/logo.png" alt="Ready" className="w-full h-full object-contain" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 mb-2">Ready to practice?</h2>
                  <p className="text-slate-500 text-sm">
                    Configure your settings on the left and click Start Interview when you're ready to begin.
                  </p>
                </div>
              </div>
            )}

            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-slide-up`} style={{ animationDelay: `${i * 0.04}s` }}>
                <div className={`max-w-[85%] md:max-w-2xl px-5 py-3.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap shadow-sm ${
                  msg.role === "user"
                    ? "bg-slate-900 text-white rounded-br-sm"
                    : "bg-white text-slate-800 rounded-bl-sm border border-slate-200"
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}

            {loading && started && (
              <div className="flex justify-start animate-fade-in">
                <div className="bg-white border border-slate-200 px-5 py-4 rounded-2xl rounded-bl-sm shadow-sm">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} className="h-4" />
          </div>

          {/* Input Area */}
          {started && !completed && (
            <div className="p-5 bg-white border-t border-slate-200 shrink-0">
              <div className="max-w-4xl mx-auto flex gap-3">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                  placeholder="Type your answer here… (Enter to send, Shift+Enter for newline)"
                  className="flex-1 bg-slate-50 text-slate-900 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 placeholder-slate-400 text-sm resize-none overflow-hidden min-h-[48px] max-h-32 transition-all"
                  rows={1}
                />
                <button
                  onClick={handleSend}
                  disabled={loading || !input.trim()}
                  className="bg-slate-900 hover:bg-slate-800 disabled:bg-slate-200 disabled:text-slate-400 text-white px-6 rounded-xl transition-all font-semibold text-sm shrink-0"
                >
                  Send
                </button>
              </div>
              <div className="max-w-4xl mx-auto mt-3 text-center">
                <button onClick={handleReset} className="text-xs text-red-500 hover:text-red-600 font-semibold px-4 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 transition-all border border-red-100">
                  End Interview Early
                </button>
              </div>
            </div>
          )}

          {/* Post-Interview Actions */}
          {completed && (
            <div className="p-5 bg-white border-t border-slate-200 shrink-0">
              <div className="max-w-4xl mx-auto flex justify-center gap-3">
                <button onClick={handleReset} className="bg-slate-900 hover:bg-slate-800 text-white font-semibold px-6 py-3 rounded-xl transition-all text-sm">
                  🔄 Start New Interview
                </button>
                <button onClick={() => navigate("/history")} className="bg-white hover:bg-slate-50 text-slate-800 font-semibold border border-slate-200 px-6 py-3 rounded-xl transition-all text-sm">
                  📚 View History
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
