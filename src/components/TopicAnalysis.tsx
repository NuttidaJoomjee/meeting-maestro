interface Props {
  onTopicPercent: number;
  offTopicPercent: number;
  agendaCoverage: number;
  productivityScore: number;
}

export function TopicAnalysis({ onTopicPercent, offTopicPercent, agendaCoverage, productivityScore }: Props) {
  return (
    <div className="stat-card space-y-4">
      <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Discussion Analysis</h4>

      <div className="space-y-3">
        <ProgressRow label="On-Topic" value={onTopicPercent} color="bg-primary" />
        <ProgressRow label="Off-Topic" value={offTopicPercent} color="bg-warning" />
        <ProgressRow label="Agenda Coverage" value={agendaCoverage} color="bg-info" />
        <ProgressRow label="Productivity Score" value={productivityScore} color="bg-success" />
      </div>
    </div>
  );
}

function ProgressRow({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-muted-foreground">{label}</span>
        <span className="text-foreground font-medium">{value}%</span>
      </div>
      <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color} transition-all duration-700`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
