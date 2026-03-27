import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Speaker } from "@/data/mockMeetings";

const COLORS = [
  "hsl(172, 66%, 50%)",
  "hsl(190, 70%, 60%)",
  "hsl(217, 91%, 60%)",
  "hsl(38, 92%, 50%)",
  "hsl(0, 72%, 51%)",
];

export function SpeakingPieChart({ speakers }: { speakers: Speaker[] }) {
  const data = speakers.map((s) => ({ name: s.name, value: s.percentage }));

  return (
    <div className="stat-card">
      <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">Speaking Distribution</h4>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" stroke="none">
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ background: "hsl(222, 44%, 8%)", border: "1px solid hsl(222, 30%, 16%)", borderRadius: "8px", fontSize: "12px" }}
            itemStyle={{ color: "hsl(210, 40%, 96%)" }}
            formatter={(value: number) => `${value}%`}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="flex flex-wrap gap-2 mt-2">
        {speakers.map((s, i) => (
          <span key={s.id} className="flex items-center gap-1 text-[10px] text-muted-foreground">
            <span className="w-2 h-2 rounded-full" style={{ background: COLORS[i % COLORS.length] }} />
            {s.name}
          </span>
        ))}
      </div>
    </div>
  );
}

export function ParticipationBarChart({ speakers }: { speakers: Speaker[] }) {
  const data = speakers.map((s) => ({
    name: s.name.split(" ")[0],
    minutes: s.speakingTime,
    contributions: s.contributions,
  }));

  return (
    <div className="stat-card">
      <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">Participation Comparison</h4>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <XAxis dataKey="name" tick={{ fontSize: 11, fill: "hsl(215, 20%, 55%)" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: "hsl(215, 20%, 55%)" }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{ background: "hsl(222, 44%, 8%)", border: "1px solid hsl(222, 30%, 16%)", borderRadius: "8px", fontSize: "12px" }}
            itemStyle={{ color: "hsl(210, 40%, 96%)" }}
          />
          <Bar dataKey="minutes" fill="hsl(172, 66%, 50%)" radius={[4, 4, 0, 0]} name="Minutes" />
          <Bar dataKey="contributions" fill="hsl(217, 91%, 60%)" radius={[4, 4, 0, 0]} name="Contributions" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
