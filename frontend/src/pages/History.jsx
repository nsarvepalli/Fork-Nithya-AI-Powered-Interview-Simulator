import { useState, useEffect } from "react";
import { getSessions, getSessionDetails, getStats } from "../api";

export default function History() {
  const [sessions, setSessions] = useState([]);
  const [stats, setStats] = useState({});
  const [expandedId, setExpandedId] = useState(null);
  const [sessionDetails, setSessionDetails] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sessRes, statRes] = await Promise.all([getSessions(), getStats()]);
        setSessions(sessRes.data.sessions);
        setStats(statRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleExpand = async (id) => {
    if (expandedId === id) return setExpandedId(null);
    setExpandedId(id);
    if (!sessionDetails[id]) {
      try {
        const res = await getSessionDetails(id);
        setSessionDetails((prev) => ({ ...prev, [id]: res.data }));
      } catch (err) { console.error(err); }
    }
  };

  const formatDate = (iso) => iso ? new Date(iso).toLocaleString() : "";
  const trackLabel = (track) => track?.includes("Software") ? "SDE" : "DS";
  const statusColor = (s) => s === "completed" ? "text-emerald-600" : s === "in_progress" ? "text-amber-600" : "text-red-500";
  const statusBg = (s) => s === "completed" ? "bg-emerald-50 border-emerald-200" : s === "in_progress" ? "bg-amber-50 border-amber-200" : "bg-red-50 border-red-200";
  const statusIcon = (s) => s === "completed" ? "✅" : s === "in_progress" ? "⏸️" : "❌";

  return (
    <div className="flex-1 flex flex-col bg-slate-50">
      {/* Top Header */}
      <div className="bg-white border-b border-slate-200 px-8 py-4 shrink-0">
        <h1 className="text-base font-semibold text-slate-900">📚 Interview History</h1>
        <p className="text-xs text-slate-500 mt-0.5">Review your past sessions and track your progress</p>
      </div>

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Main Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-3">
          {loading && (
            <div className="flex items-center justify-center h-40">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          )}

          {!loading && sessions.length === 0 && (
            <div className="flex items-center justify-center h-full animate-fade-in">
              <div className="bg-white border border-slate-200 p-10 rounded-2xl text-center max-w-sm shadow-sm">
                <div className="text-5xl mb-4">📭</div>
                <h2 className="text-lg font-bold text-slate-900 mb-1">No interviews yet!</h2>
                <p className="text-slate-500 text-sm">Head over to the Interview tab to start your first session.</p>
              </div>
            </div>
          )}

          {sessions.map((session) => (
            <div key={session.session_id} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:border-slate-300 transition-colors animate-slide-up">
              <button
                onClick={() => handleExpand(session.session_id)}
                className="w-full flex items-center justify-between px-5 py-4 hover:bg-slate-50 transition-all text-left group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{statusIcon(session.status)}</span>
                  <div>
                    <div className="text-sm font-semibold text-slate-900 group-hover:text-indigo-700 transition-colors">
                      {trackLabel(session.track)} — {session.interview_type}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                      <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full border border-slate-200 font-medium">{session.difficulty}</span>
                      <span>•</span>
                      {formatDate(session.started_at)}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-lg border ${statusBg(session.status)} ${statusColor(session.status)}`}>
                    {session.status.replace("_", " ").toUpperCase()}
                  </span>
                  <span className="text-slate-400 text-sm">{expandedId === session.session_id ? "▲" : "▼"}</span>
                </div>
              </button>

              {expandedId === session.session_id && (
                <div className="border-t border-slate-100 px-5 py-5 bg-slate-50">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
                    {[
                      { label: "Questions", value: session.num_questions },
                      { label: "Status", value: session.status.split("_").join(" "), colored: true, s: session.status },
                      { label: "Track", value: trackLabel(session.track) },
                      { label: "Difficulty", value: session.difficulty },
                    ].map(({ label, value, colored, s }) => (
                      <div key={label} className="bg-white rounded-xl p-3 text-center border border-slate-200 shadow-sm">
                        <div className={`text-base font-black ${colored ? statusColor(s) : "text-slate-900"}`}>{value}</div>
                        <div className="text-xs text-slate-400 mt-0.5 uppercase tracking-wider font-medium">{label}</div>
                      </div>
                    ))}
                  </div>

                  {sessionDetails[session.session_id] && (
                    <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-widest pb-1 border-b border-slate-200">Chat History</div>
                      {sessionDetails[session.session_id].messages
                        .filter((m) => m.role !== "system")
                        .map((msg, i) => (
                          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                            <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-xs leading-relaxed whitespace-pre-wrap shadow-sm ${
                              msg.role === "user"
                                ? "bg-slate-900 text-white rounded-br-sm"
                                : "bg-white text-slate-800 rounded-bl-sm border border-slate-200"
                            }`}>
                              {msg.content}
                              <div className="text-[10px] opacity-50 mt-1.5 font-medium">{formatDate(msg.timestamp)}</div>
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Stats Sidebar */}
        <div className="w-full md:w-72 bg-white border-t md:border-t-0 md:border-l border-slate-200 p-6 flex flex-col gap-5 shrink-0">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Performance Stats</h2>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-50 rounded-xl p-4 text-center border border-slate-200">
              <div className="text-2xl font-black text-slate-900">{stats.total_sessions || 0}</div>
              <div className="text-xs font-bold uppercase tracking-wide text-slate-400 mt-0.5">Total</div>
            </div>
            <div className="bg-emerald-50 rounded-xl p-4 text-center border border-emerald-200">
              <div className="text-2xl font-black text-emerald-600">{stats.completed_sessions || 0}</div>
              <div className="text-xs font-bold uppercase tracking-wide text-emerald-500 mt-0.5">Completed</div>
            </div>
          </div>

          {stats.by_track && Object.keys(stats.by_track).length > 0 && (
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-200 pb-2">By Track</div>
              {Object.entries(stats.by_track).map(([t, count]) => (
                <div key={t} className="flex justify-between items-center text-sm font-medium pt-1">
                  <span className="text-slate-700">{trackLabel(t)}</span>
                  <span className="bg-white text-slate-800 px-2.5 py-0.5 rounded-lg border border-slate-200 font-bold text-xs">{count}</span>
                </div>
              ))}
            </div>
          )}

          {stats.by_difficulty && Object.keys(stats.by_difficulty).length > 0 && (
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-200 pb-2">By Difficulty</div>
              {Object.entries(stats.by_difficulty).map(([d, count]) => (
                <div key={d} className="flex justify-between items-center text-sm font-medium pt-1">
                  <span className="text-slate-700">{d.split(" ")[0]}</span>
                  <span className="bg-white text-slate-800 px-2.5 py-0.5 rounded-lg border border-slate-200 font-bold text-xs">{count}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
