import { useState } from "react";
import { Send, Bot, User, Sparkles, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockMeetings, Meeting } from "@/data/mockMeetings";

interface Message {
  role: "user" | "assistant";
  content: string;
}

function generateResponse(question: string, meeting: Meeting | null): string {
  if (!meeting) {
    return "Please select a meeting first so I can help you with details about it.";
  }

  const q = question.toLowerCase();

  if (q.includes("summary") || q.includes("overview") || q.includes("about")) {
    return `**${meeting.title}**\n\n${meeting.summary.overview}\n\n**Key Points:**\n${meeting.summary.keyPoints.map(k => `- ${k}`).join("\n")}`;
  }
  if (q.includes("decision") || q.includes("decided")) {
    if (meeting.summary.decisions.length === 0) return "No decisions have been recorded for this meeting yet.";
    return `**Decisions from "${meeting.title}":**\n${meeting.summary.decisions.map(d => `- ${d}`).join("\n")}`;
  }
  if (q.includes("action") || q.includes("task") || q.includes("todo") || q.includes("to do") || q.includes("assign")) {
    if (meeting.summary.actionItems.length === 0) return "No action items have been recorded for this meeting yet.";
    return `**Action Items:**\n${meeting.summary.actionItems.map(a => `- **${a.task}** → ${a.assignee} (due ${a.deadline})`).join("\n")}`;
  }
  if (q.includes("who") && (q.includes("spoke") || q.includes("talk") || q.includes("speak") || q.includes("most"))) {
    const sorted = [...meeting.speakers].sort((a, b) => b.speakingTime - a.speakingTime);
    return `**Speaking time breakdown:**\n${sorted.map(s => `- **${s.name}**: ${s.speakingTime} min (${s.percentage}%)`).join("\n")}`;
  }
  if (q.includes("participant") || q.includes("attendee") || q.includes("people") || q.includes("member")) {
    return `**Participants (${meeting.participants} total):**\n${meeting.speakers.map(s => `- ${s.name} — ${s.contributions} contributions, sentiment: ${s.sentiment}`).join("\n")}`;
  }
  if (q.includes("agenda") || q.includes("topic")) {
    return `**Agenda for "${meeting.title}":**\n${meeting.summary.agenda.map(a => `- ${a}`).join("\n")}`;
  }
  if (q.includes("sentiment") || q.includes("mood") || q.includes("feel")) {
    return `**Participant Sentiment:**\n${meeting.speakers.map(s => `- ${s.name}: ${s.sentiment === "positive" ? "🟢" : s.sentiment === "negative" ? "🔴" : "🟡"} ${s.sentiment}`).join("\n")}`;
  }
  if (q.includes("productivity") || q.includes("score") || q.includes("analytic") || q.includes("stat")) {
    return `**Analytics for "${meeting.title}":**\n- On-topic: ${meeting.analytics.onTopicPercent}%\n- Off-topic: ${meeting.analytics.offTopicPercent}%\n- Agenda coverage: ${meeting.analytics.agendaCoverage}%\n- Productivity score: ${meeting.analytics.productivityScore}/100`;
  }
  if (q.includes("transcript") || q.includes("said") || q.includes("conversation")) {
    const lines = meeting.transcript.slice(0, 5).map(t => `**[${t.time}] ${t.speaker}:** ${t.text}`).join("\n\n");
    return `**Transcript excerpt:**\n\n${lines}${meeting.transcript.length > 5 ? "\n\n_...and more_" : ""}`;
  }
  if (q.includes("duration") || q.includes("long") || q.includes("time")) {
    return `The meeting **"${meeting.title}"** lasted **${meeting.duration}** with **${meeting.participants} participants**.`;
  }

  return `Here's what I know about **"${meeting.title}"**:\n\n${meeting.summary.overview}\n\nYou can ask me about:\n- 📋 Summary & key points\n- ✅ Decisions made\n- 📌 Action items & assignments\n- 👥 Participants & speaking time\n- 📊 Analytics & productivity\n- 💬 Transcript excerpts\n- 😊 Sentiment analysis`;
}

const suggestedQuestions = [
  "What was discussed?",
  "What decisions were made?",
  "What are the action items?",
  "Who spoke the most?",
];

export default function Chat() {
  const [selectedMeetingId, setSelectedMeetingId] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "👋 Hi! I'm your **Meeting AI Assistant**. Select a meeting and ask me anything — summaries, decisions, action items, participation stats, and more." },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const selectedMeeting = mockMeetings.find(m => m.id === selectedMeetingId) || null;

  const handleSend = (text?: string) => {
    const message = text || input.trim();
    if (!message) return;

    const userMsg: Message = { role: "user", content: message };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const response = generateResponse(message, selectedMeeting);
      setMessages(prev => [...prev, { role: "assistant", content: response }]);
      setIsTyping(false);
    }, 600);
  };

  const handleMeetingChange = (id: string) => {
    setSelectedMeetingId(id);
    const meeting = mockMeetings.find(m => m.id === id);
    if (meeting) {
      setMessages(prev => [
        ...prev,
        { role: "assistant", content: `📂 Switched to **"${meeting.title}"** (${meeting.date}, ${meeting.duration}, ${meeting.participants} participants).\n\nWhat would you like to know?` },
      ]);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-2rem)] max-h-[calc(100vh-2rem)] p-4 gap-4">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center">
            <Bot className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">AI Chat</h1>
            <p className="text-xs text-muted-foreground">Ask anything about your meetings</p>
          </div>
        </div>
        <Select value={selectedMeetingId} onValueChange={handleMeetingChange}>
          <SelectTrigger className="w-72">
            <SelectValue placeholder="Select a meeting..." />
          </SelectTrigger>
          <SelectContent>
            {mockMeetings.map(m => (
              <SelectItem key={m.id} value={m.id}>
                <span className="flex items-center gap-2">
                  {m.status === "in-progress" && <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />}
                  {m.title}
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Chat area */}
      <Card className="flex-1 flex flex-col overflow-hidden border-border bg-card">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4 max-w-3xl mx-auto">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                {msg.role === "assistant" && (
                  <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center shrink-0 mt-1">
                    <Sparkles className="w-4 h-4 text-primary" />
                  </div>
                )}
                <div
                  className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-md"
                      : "bg-secondary text-secondary-foreground rounded-bl-md"
                  }`}
                >
                  {msg.content.split(/(\*\*[^*]+\*\*)/).map((part, j) =>
                    part.startsWith("**") && part.endsWith("**") ? (
                      <strong key={j} className="font-semibold">{part.slice(2, -2)}</strong>
                    ) : (
                      <span key={j}>{part}</span>
                    )
                  )}
                </div>
                {msg.role === "user" && (
                  <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0 mt-1">
                    <User className="w-4 h-4 text-muted-foreground" />
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                </div>
                <div className="bg-secondary text-secondary-foreground px-4 py-3 rounded-2xl rounded-bl-md text-sm">
                  <span className="inline-flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </span>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Suggested questions */}
        {selectedMeeting && messages.length <= 3 && (
          <div className="px-4 pb-2 flex gap-2 flex-wrap">
            {suggestedQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => handleSend(q)}
                className="text-xs px-3 py-1.5 rounded-full border border-border bg-background text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t border-border">
          <div className="flex gap-2 max-w-3xl mx-auto">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && !e.shiftKey && handleSend()}
              placeholder={selectedMeeting ? `Ask about "${selectedMeeting.title}"...` : "Select a meeting to start chatting..."}
              disabled={!selectedMeeting}
              className="flex-1 bg-secondary rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <Button
              size="icon"
              onClick={() => handleSend()}
              disabled={!input.trim() || !selectedMeeting}
              className="shrink-0 rounded-xl h-11 w-11"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
