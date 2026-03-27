import { Mic, FileText, BarChart3, Clock, TrendingUp, Users } from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { MeetingCard } from "@/components/MeetingCard";
import { mockMeetings } from "@/data/mockMeetings";
import { ChatbotWidget } from "@/components/ChatbotWidget";

export default function Index() {
  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="animate-fade-in">
        <h1 className="text-3xl font-bold">
          <span className="text-gradient">Meeting Intelligence</span>
        </h1>
        <p className="text-muted-foreground text-sm mt-1">Your AI-powered meeting command center</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Meetings" value={12} change="+3 this week" icon={Mic} positive />
        <StatCard label="Hours Saved" value="8.5h" change="+2.1h vs last week" icon={Clock} positive />
        <StatCard label="Avg. Productivity" value="85%" change="+5%" icon={TrendingUp} positive />
        <StatCard label="Action Items" value={24} change="7 pending" icon={FileText} />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <QuickAction icon={Mic} title="Record Meeting" description="Start a live recording with AI transcription" />
        <QuickAction icon={FileText} title="Upload Recording" description="Upload audio/video for AI analysis" />
        <QuickAction icon={BarChart3} title="View Analytics" description="See participation and topic insights" />
      </div>

      {/* Recent Meetings */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Recent Meetings</h2>
        <div className="space-y-3">
          {mockMeetings.map((meeting) => (
            <MeetingCard key={meeting.id} meeting={meeting} />
          ))}
        </div>
      </div>

      <ChatbotWidget />
    </div>
  );
}

function QuickAction({ icon: Icon, title, description }: { icon: any; title: string; description: string }) {
  return (
    <button className="stat-card text-left group cursor-pointer">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">{title}</p>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
    </button>
  );
}
