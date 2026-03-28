import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CalendarIcon, Clock, MapPin, FileText, Plus } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

export default function NewMeeting() {
  const navigate = useNavigate();
  const [meetingName, setMeetingName] = useState("");
  const [place, setPlace] = useState("");
  const [date, setDate] = useState<Date>();
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [period, setPeriod] = useState("AM");
  const [description, setDescription] = useState("");

  const hours = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0"));
  const minutes = Array.from({ length: 12 }, (_, i) => String(i * 5).padStart(2, "0"));

  const handleCreate = () => {
    if (!meetingName.trim()) {
      toast({ title: "Meeting name is required", variant: "destructive" });
      return;
    }
    if (!date) {
      toast({ title: "Please select a date", variant: "destructive" });
      return;
    }
    if (!hour || !minute) {
      toast({ title: "Please select a time", variant: "destructive" });
      return;
    }

    toast({
      title: "Meeting created!",
      description: `"${meetingName}" scheduled for ${format(date, "PPP")} at ${hour}:${minute} ${period}`,
    });
    navigate("/meetings");
  };

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate("/meetings")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">New Meeting</h1>
          <p className="text-sm text-muted-foreground">Schedule a new meeting session</p>
        </div>
      </div>

      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-lg text-card-foreground">Meeting Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          {/* Meeting Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="flex items-center gap-2 text-foreground">
              <FileText className="h-4 w-4 text-primary" />
              Meeting Name
            </Label>
            <Input
              id="name"
              placeholder="e.g. Weekly Team Standup"
              value={meetingName}
              onChange={(e) => setMeetingName(e.target.value)}
            />
          </div>

          {/* Place */}
          <div className="space-y-2">
            <Label htmlFor="place" className="flex items-center gap-2 text-foreground">
              <MapPin className="h-4 w-4 text-primary" />
              Place
            </Label>
            <Input
              id="place"
              placeholder="e.g. Conference Room A / Zoom link"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
            />
          </div>

          {/* Date */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-foreground">
              <CalendarIcon className="h-4 w-4 text-primary" />
              Date
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Time */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-foreground">
              <Clock className="h-4 w-4 text-primary" />
              Time
            </Label>
            <div className="flex items-center gap-2">
              <Select value={hour} onValueChange={setHour}>
                <SelectTrigger className="w-24">
                  <SelectValue placeholder="HH" />
                </SelectTrigger>
                <SelectContent>
                  {hours.map((h) => (
                    <SelectItem key={h} value={h}>{h}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <span className="text-muted-foreground font-bold">:</span>
              <Select value={minute} onValueChange={setMinute}>
                <SelectTrigger className="w-24">
                  <SelectValue placeholder="MM" />
                </SelectTrigger>
                <SelectContent>
                  {minutes.map((m) => (
                    <SelectItem key={m} value={m}>{m}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={period} onValueChange={setPeriod}>
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AM">AM</SelectItem>
                  <SelectItem value="PM">PM</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Description (optional) */}
          <div className="space-y-2">
            <Label htmlFor="desc" className="text-foreground">
              Description <span className="text-muted-foreground text-xs">(optional)</span>
            </Label>
            <Textarea
              id="desc"
              placeholder="Add agenda or notes..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={() => navigate("/meetings")}>
          Cancel
        </Button>
        <Button onClick={handleCreate} className="gap-2">
          <Plus className="h-4 w-4" />
          Create Meeting
        </Button>
      </div>
    </div>
  );
}
