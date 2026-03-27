import { mockMeetings } from "@/data/mockMeetings";
import { MeetingCard } from "@/components/MeetingCard";
import { Radio, Mic } from "lucide-react";

export default function Meetings() {
  const liveMeetings = mockMeetings.filter((m) => m.status === "in-progress");
  const pastMeetings = mockMeetings.filter((m) => m.status !== "in-progress");

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Meetings</h1>
        <p className="text-sm text-muted-foreground mt-1">View live and past meetings</p>
      </div>

      {liveMeetings.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-destructive animate-pulse-glow" />
            <h2 className="text-lg font-semibold text-foreground">Live Now</h2>
          </div>
          <div className="grid gap-4">
            {liveMeetings.map((meeting) => (
              <div key={meeting.id} className="relative">
                <div className="absolute -left-2 top-4 w-2 h-2 rounded-full bg-destructive animate-pulse-glow" />
                <MeetingCard meeting={meeting} />
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Mic className="w-4 h-4 text-muted-foreground" />
          <h2 className="text-lg font-semibold text-foreground">Past Meetings</h2>
        </div>
        <div className="grid gap-4">
          {pastMeetings.map((meeting) => (
            <MeetingCard key={meeting.id} meeting={meeting} />
          ))}
        </div>
      </section>
    </div>
  );
}
