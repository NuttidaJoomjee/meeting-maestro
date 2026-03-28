import { useState } from "react";
import {
  Video,
  Monitor,
  Trash2,
  Plus,
  Power,
  PowerOff,
  Radio,
  Settings,
  BarChart3,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Platform {
  id: string;
  name: string;
  type: "zoom" | "google-meet" | "teams" | "custom";
  connected: boolean;
  autoCapture: boolean;
  meetingsCaptured: number;
  lastSync: string;
  status: "active" | "inactive" | "error";
}

const platformIcons: Record<string, React.ReactNode> = {
  zoom: <Video className="h-5 w-5" />,
  "google-meet": <Monitor className="h-5 w-5" />,
  teams: <Monitor className="h-5 w-5" />,
  custom: <Radio className="h-5 w-5" />,
};

const platformLabels: Record<string, string> = {
  zoom: "Zoom",
  "google-meet": "Google Meet",
  teams: "Microsoft Teams",
  custom: "Custom Platform",
};

const initialPlatforms: Platform[] = [
  {
    id: "1",
    name: "Zoom Workspace",
    type: "zoom",
    connected: true,
    autoCapture: true,
    meetingsCaptured: 47,
    lastSync: "2 min ago",
    status: "active",
  },
  {
    id: "2",
    name: "Google Meet",
    type: "google-meet",
    connected: true,
    autoCapture: false,
    meetingsCaptured: 23,
    lastSync: "1 hour ago",
    status: "active",
  },
  {
    id: "3",
    name: "Microsoft Teams",
    type: "teams",
    connected: false,
    autoCapture: false,
    meetingsCaptured: 0,
    lastSync: "Never",
    status: "inactive",
  },
];

const Platforms = () => {
  const [platforms, setPlatforms] = useState<Platform[]>(initialPlatforms);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [platformToDelete, setPlatformToDelete] = useState<string | null>(null);
  const [newPlatformName, setNewPlatformName] = useState("");
  const [newPlatformType, setNewPlatformType] = useState<string>("");

  const toggleAutoCapture = (id: string) => {
    setPlatforms((prev) =>
      prev.map((p) => (p.id === id ? { ...p, autoCapture: !p.autoCapture } : p))
    );
  };

  const toggleConnection = (id: string) => {
    setPlatforms((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              connected: !p.connected,
              status: !p.connected ? "active" : "inactive",
            }
          : p
      )
    );
  };

  const addPlatform = () => {
    if (!newPlatformName || !newPlatformType) return;
    const newPlatform: Platform = {
      id: Date.now().toString(),
      name: newPlatformName,
      type: newPlatformType as Platform["type"],
      connected: false,
      autoCapture: false,
      meetingsCaptured: 0,
      lastSync: "Never",
      status: "inactive",
    };
    setPlatforms((prev) => [...prev, newPlatform]);
    setNewPlatformName("");
    setNewPlatformType("");
    setAddDialogOpen(false);
  };

  const deletePlatform = () => {
    if (!platformToDelete) return;
    setPlatforms((prev) => prev.filter((p) => p.id !== platformToDelete));
    setPlatformToDelete(null);
    setDeleteDialogOpen(false);
  };

  const activePlatforms = platforms.filter((p) => p.connected).length;
  const totalCaptured = platforms.reduce((sum, p) => sum + p.meetingsCaptured, 0);
  const autoCaptureCount = platforms.filter((p) => p.autoCapture).length;

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Platforms</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your meeting platforms and auto-capture settings
          </p>
        </div>
        <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Platform
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Platform</DialogTitle>
              <DialogDescription>
                Connect a new meeting platform to start capturing meetings.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Platform Type
                </label>
                <Select value={newPlatformType} onValueChange={setNewPlatformType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="zoom">Zoom</SelectItem>
                    <SelectItem value="google-meet">Google Meet</SelectItem>
                    <SelectItem value="teams">Microsoft Teams</SelectItem>
                    <SelectItem value="custom">Custom Platform</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Display Name
                </label>
                <Input
                  placeholder="e.g. My Zoom Workspace"
                  value={newPlatformName}
                  onChange={(e) => setNewPlatformName(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={addPlatform} disabled={!newPlatformName || !newPlatformType}>
                Add Platform
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Dashboard */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="stat-card">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <CheckCircle2 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{activePlatforms}</p>
              <p className="text-xs text-muted-foreground">Active Platforms</p>
            </div>
          </CardContent>
        </Card>
        <Card className="stat-card">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <BarChart3 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{totalCaptured}</p>
              <p className="text-xs text-muted-foreground">Meetings Captured</p>
            </div>
          </CardContent>
        </Card>
        <Card className="stat-card">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Radio className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{autoCaptureCount}</p>
              <p className="text-xs text-muted-foreground">Auto-Capture On</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Platform List */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Connected Platforms</h2>
        {platforms.length === 0 && (
          <Card className="glass-panel">
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">No platforms added yet. Click "Add Platform" to get started.</p>
            </CardContent>
          </Card>
        )}
        {platforms.map((platform) => (
          <Card key={platform.id} className="glass-panel hover:border-primary/30 transition-all duration-300">
            <CardContent className="p-5">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    {platformIcons[platform.type]}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground">{platform.name}</h3>
                      <Badge
                        variant={platform.connected ? "default" : "secondary"}
                        className="text-[10px]"
                      >
                        {platform.connected ? "Connected" : "Disconnected"}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {platformLabels[platform.type]} · Last sync: {platform.lastSync}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <p className="text-sm font-semibold text-foreground">{platform.meetingsCaptured}</p>
                    <p className="text-[10px] text-muted-foreground">Captured</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">Auto-Capture</span>
                    <Switch
                      checked={platform.autoCapture}
                      onCheckedChange={() => toggleAutoCapture(platform.id)}
                      disabled={!platform.connected}
                    />
                  </div>

                  <Button
                    variant={platform.connected ? "outline" : "default"}
                    size="sm"
                    onClick={() => toggleConnection(platform.id)}
                    className="gap-1.5"
                  >
                    {platform.connected ? (
                      <>
                        <PowerOff className="h-3.5 w-3.5" />
                        Disconnect
                      </>
                    ) : (
                      <>
                        <Power className="h-3.5 w-3.5" />
                        Connect
                      </>
                    )}
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={() => {
                      setPlatformToDelete(platform.id);
                      setDeleteDialogOpen(true);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Platform</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove this platform? All captured meeting data will remain available.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={deletePlatform}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Platforms;
