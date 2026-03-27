import { Calendar, Clock, Users, ChevronRight } from "lucide-react";
import { Meeting } from "@/data/mockMeetings";
import { useNavigate } from "react-router-dom";

export function MeetingCard({ meeting }: { meeting: Meeting }) {
  const navigate = useNavigate();

  const statusColors = {
    completed: "bg-success/10 text-success",
    "in-progress": "bg-warning/10 text-warning",
    scheduled: "bg-info/10 text-info",
  };

  return (
    <button
      onClick={() => navigate(`/meeting/${meeting.id}`)}
      className="stat-card w-full text-left group cursor-pointer"
    >
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-foreground truncate">{meeting.title}</h3>
            <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${statusColors[meeting.status]}`}>
              {meeting.status}
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{meeting.date}</span>
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{meeting.duration}</span>
            <span className="flex items-center gap-1"><Users className="w-3 h-3" />{meeting.participants}</span>
          </div>
        </div>
        <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
      </div>
    </button>
  );
}
