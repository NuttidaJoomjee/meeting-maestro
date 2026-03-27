import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Download, Copy, Play, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockMeetings } from "@/data/mockMeetings";
import { SpeakingPieChart, ParticipationBarChart } from "@/components/ParticipationCharts";
import { TopicAnalysis } from "@/components/TopicAnalysis";
import { ChatbotWidget } from "@/components/ChatbotWidget";

export default function MeetingWorkspace() {
  const { id } = useParams();
  const navigate = useNavigate();
  const meeting = mockMeetings.find((m) => m.id === id);

  if (!meeting) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <p className="text-muted-foreground">Meeting not found</p>
          <Button variant="outline" className="mt-4" onClick={() => navigate("/")}>Go back</Button>
        </div>
      </div>
    );
  }

  const sentimentIcon = (s: string) => {
    if (s === "positive") return "🟢";
    if (s === "negative") return "🔴";
    return "🟡";
  };

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 animate-fade-in">
        <button onClick={() => navigate("/")} className="text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-foreground">{meeting.title}</h1>
          <p className="text-sm text-muted-foreground">{meeting.date} · {meeting.duration} · {meeting.participants} participants</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm"><Copy className="w-3 h-3 mr-1" />Copy</Button>
          <Button variant="outline" size="sm"><Download className="w-3 h-3 mr-1" />Export PDF</Button>
          <Button size="sm"><Play className="w-3 h-3 mr-1" />Generate Video</Button>
        </div>
      </div>

      {/* Three-panel layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Panel - Transcript */}
        <div className="lg:col-span-3 space-y-4">
          {/* Audio Player Placeholder */}
          <div className="stat-card">
            <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Audio Player</h4>
            <div className="bg-secondary rounded-lg p-3 flex items-center gap-3">
              <button className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center hover:bg-primary/30 transition-colors">
                <Play className="w-4 h-4 text-primary" />
              </button>
              <div className="flex-1 h-1 bg-muted rounded-full">
                <div className="w-1/3 h-full bg-primary rounded-full" />
              </div>
              <span className="text-xs text-muted-foreground font-mono">15:23</span>
            </div>
          </div>

          {/* Transcript */}
          <div className="stat-card max-h-[600px] overflow-auto">
            <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Transcript</h4>
            <div className="space-y-3">
              {meeting.transcript.map((entry, i) => (
                <div key={i} className="animate-slide-in" style={{ animationDelay: `${i * 50}ms` }}>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                      <User className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-xs font-medium text-foreground">{entry.speaker}</span>
                    <span className="text-[10px] text-muted-foreground font-mono">{entry.time}</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed ml-7">{entry.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Center Panel - Summary */}
        <div className="lg:col-span-5">
          <div className="stat-card">
            <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">AI Meeting Summary</h4>

            <div className="space-y-6">
              <SummarySection title="Overview" content={meeting.summary.overview} />

              <div>
                <h5 className="text-sm font-semibold text-foreground mb-2">📋 Agenda Discussed</h5>
                <ul className="space-y-1">
                  {meeting.summary.agenda.map((item, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>{item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h5 className="text-sm font-semibold text-foreground mb-2">💡 Key Discussion Points</h5>
                <ul className="space-y-1">
                  {meeting.summary.keyPoints.map((point, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>{point}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h5 className="text-sm font-semibold text-foreground mb-2">✅ Decisions Made</h5>
                <ul className="space-y-1">
                  {meeting.summary.decisions.map((d, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-success mt-1">✓</span>{d}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h5 className="text-sm font-semibold text-foreground mb-2">🎯 Action Items</h5>
                <div className="space-y-2">
                  {meeting.summary.actionItems.map((item, i) => (
                    <div key={i} className="bg-secondary/50 rounded-lg p-3">
                      <p className="text-sm text-foreground">{item.task}</p>
                      <div className="flex gap-3 mt-1">
                        <span className="text-[10px] text-primary font-medium">{item.assignee}</span>
                        <span className="text-[10px] text-muted-foreground">Due: {item.deadline}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Analytics */}
        <div className="lg:col-span-4 space-y-4">
          <TopicAnalysis {...meeting.analytics} />

          <SpeakingPieChart speakers={meeting.speakers} />

          <ParticipationBarChart speakers={meeting.speakers} />

          {/* Speaker Sentiment */}
          <div className="stat-card">
            <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Speaker Sentiment</h4>
            <div className="space-y-2">
              {meeting.speakers.map((s) => (
                <div key={s.id} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{s.name}</span>
                  <span>{sentimentIcon(s.sentiment)} {s.sentiment}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <ChatbotWidget meetingTitle={meeting.title} />
    </div>
  );
}

function SummarySection({ title, content }: { title: string; content: string }) {
  return (
    <div>
      <h5 className="text-sm font-semibold text-foreground mb-1">📝 {title}</h5>
      <p className="text-sm text-muted-foreground leading-relaxed">{content}</p>
    </div>
  );
}
