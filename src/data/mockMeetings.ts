export interface Speaker {
  id: string;
  name: string;
  speakingTime: number;
  contributions: number;
  sentiment: "positive" | "neutral" | "negative";
  percentage: number;
}

export interface TranscriptEntry {
  speaker: string;
  time: string;
  text: string;
}

export interface Meeting {
  id: string;
  title: string;
  date: string;
  duration: string;
  participants: number;
  status: "completed" | "in-progress" | "scheduled";
  speakers: Speaker[];
  transcript: TranscriptEntry[];
  summary: {
    overview: string;
    agenda: string[];
    keyPoints: string[];
    decisions: string[];
    actionItems: { task: string; assignee: string; deadline: string }[];
  };
  analytics: {
    onTopicPercent: number;
    offTopicPercent: number;
    agendaCoverage: number;
    productivityScore: number;
  };
}

export const mockMeetings: Meeting[] = [
  {
    id: "live-1",
    title: "Weekly Team Standup",
    date: "2026-03-27",
    duration: "12 min (live)",
    participants: 5,
    status: "in-progress",
    speakers: [
      { id: "s1", name: "Sarah Chen", speakingTime: 5, contributions: 8, sentiment: "positive", percentage: 40 },
      { id: "s2", name: "Marcus Johnson", speakingTime: 4, contributions: 6, sentiment: "neutral", percentage: 30 },
      { id: "s3", name: "Aisha Patel", speakingTime: 3, contributions: 5, sentiment: "positive", percentage: 30 },
    ],
    transcript: [
      { speaker: "Sarah Chen", time: "00:00", text: "Good morning team. Let's go through our updates quickly." },
      { speaker: "Marcus Johnson", time: "00:25", text: "I finished the dashboard redesign yesterday, moving on to the API integration." },
      { speaker: "Aisha Patel", time: "01:00", text: "The user testing results are in — overall positive feedback on the new flow." },
    ],
    summary: {
      overview: "Live standup meeting in progress — team sharing daily updates.",
      agenda: ["Daily updates", "Blockers", "Priorities for today"],
      keyPoints: ["Dashboard redesign completed", "User testing results positive"],
      decisions: [],
      actionItems: [],
    },
    analytics: { onTopicPercent: 95, offTopicPercent: 5, agendaCoverage: 60, productivityScore: 88 },
  },
  {
    id: "1",
    title: "Q1 Product Strategy Review",
    date: "2026-03-27",
    duration: "45 min",
    participants: 6,
    status: "completed",
    speakers: [
      { id: "s1", name: "Sarah Chen", speakingTime: 14, contributions: 23, sentiment: "positive", percentage: 35 },
      { id: "s2", name: "Marcus Johnson", speakingTime: 10, contributions: 18, sentiment: "neutral", percentage: 25 },
      { id: "s3", name: "Aisha Patel", speakingTime: 8, contributions: 15, sentiment: "positive", percentage: 20 },
      { id: "s4", name: "David Kim", speakingTime: 5, contributions: 9, sentiment: "neutral", percentage: 12 },
      { id: "s5", name: "Elena Volkov", speakingTime: 3, contributions: 6, sentiment: "negative", percentage: 8 },
    ],
    transcript: [
      { speaker: "Sarah Chen", time: "00:00", text: "Good morning everyone. Let's dive into our Q1 product strategy. We have a lot to cover today." },
      { speaker: "Marcus Johnson", time: "00:32", text: "Thanks Sarah. I've prepared the analytics dashboard data showing our user engagement trends." },
      { speaker: "Aisha Patel", time: "01:15", text: "Before we start, I wanted to flag that the AI transcription feature has seen a 40% increase in adoption." },
      { speaker: "Sarah Chen", time: "01:48", text: "That's great news. Let's make sure we discuss resource allocation for scaling that feature." },
      { speaker: "David Kim", time: "02:20", text: "I agree. The infrastructure costs are something we need to plan for in Q2." },
      { speaker: "Elena Volkov", time: "02:55", text: "I have some concerns about the timeline for the mobile app launch. We're behind schedule." },
      { speaker: "Sarah Chen", time: "03:30", text: "Good point Elena. Let's address that in our priorities discussion." },
      { speaker: "Marcus Johnson", time: "04:10", text: "Looking at the data, our most engaged users are using the summary feature 3x per week." },
      { speaker: "Aisha Patel", time: "04:45", text: "We should consider adding real-time collaboration features based on user feedback." },
      { speaker: "David Kim", time: "05:20", text: "The backend can support that, but we'd need to upgrade our WebSocket infrastructure." },
    ],
    summary: {
      overview: "The team reviewed Q1 product strategy, focusing on AI feature adoption, mobile app timeline, and resource allocation for Q2.",
      agenda: ["Q1 metrics review", "AI feature performance", "Mobile app launch timeline", "Q2 resource planning"],
      keyPoints: [
        "AI transcription adoption increased 40% this quarter",
        "Most engaged users use summary feature 3x per week",
        "Mobile app launch is behind schedule",
        "Infrastructure scaling needed for AI features",
      ],
      decisions: [
        "Prioritize AI feature scaling over new feature development",
        "Delay mobile app launch by 2 weeks to ensure quality",
        "Allocate additional engineering resources to backend infrastructure",
      ],
      actionItems: [
        { task: "Prepare infrastructure scaling proposal", assignee: "David Kim", deadline: "2026-04-03" },
        { task: "Update mobile app launch timeline", assignee: "Elena Volkov", deadline: "2026-03-31" },
        { task: "Create Q2 resource allocation plan", assignee: "Sarah Chen", deadline: "2026-04-07" },
        { task: "Design real-time collaboration feature spec", assignee: "Aisha Patel", deadline: "2026-04-10" },
      ],
    },
    analytics: {
      onTopicPercent: 78,
      offTopicPercent: 22,
      agendaCoverage: 85,
      productivityScore: 82,
    },
  },
  {
    id: "2",
    title: "Engineering Sprint Planning",
    date: "2026-03-26",
    duration: "30 min",
    participants: 4,
    status: "completed",
    speakers: [
      { id: "s1", name: "Alex Rivera", speakingTime: 12, contributions: 20, sentiment: "positive", percentage: 40 },
      { id: "s2", name: "Jordan Lee", speakingTime: 9, contributions: 14, sentiment: "neutral", percentage: 30 },
      { id: "s3", name: "Taylor Brooks", speakingTime: 6, contributions: 10, sentiment: "positive", percentage: 20 },
      { id: "s4", name: "Casey Morgan", speakingTime: 3, contributions: 5, sentiment: "neutral", percentage: 10 },
    ],
    transcript: [
      { speaker: "Alex Rivera", time: "00:00", text: "Let's plan the next sprint. We have 15 story points of carry-over." },
      { speaker: "Jordan Lee", time: "00:25", text: "The API refactor is the biggest item. I'd estimate 8 points." },
    ],
    summary: {
      overview: "Sprint planning session covering backlog prioritization and capacity planning.",
      agenda: ["Carry-over review", "Backlog grooming", "Capacity planning"],
      keyPoints: ["15 story points carry-over", "API refactor is top priority", "Team at 80% capacity due to PTO"],
      decisions: ["Focus on API refactor and bug fixes this sprint"],
      actionItems: [
        { task: "Break down API refactor into subtasks", assignee: "Jordan Lee", deadline: "2026-03-28" },
        { task: "Update sprint board", assignee: "Alex Rivera", deadline: "2026-03-27" },
      ],
    },
    analytics: { onTopicPercent: 92, offTopicPercent: 8, agendaCoverage: 95, productivityScore: 90 },
  },
  {
    id: "3",
    title: "Client Onboarding Review",
    date: "2026-03-25",
    duration: "25 min",
    participants: 3,
    status: "completed",
    speakers: [
      { id: "s1", name: "Priya Sharma", speakingTime: 10, contributions: 15, sentiment: "positive", percentage: 45 },
      { id: "s2", name: "Ben Nguyen", speakingTime: 8, contributions: 12, sentiment: "neutral", percentage: 35 },
      { id: "s3", name: "Sofia Martinez", speakingTime: 5, contributions: 8, sentiment: "positive", percentage: 20 },
    ],
    transcript: [
      { speaker: "Priya Sharma", time: "00:00", text: "Let's review the new client onboarding flow we launched last week." },
    ],
    summary: {
      overview: "Review of the new client onboarding process and initial feedback.",
      agenda: ["Onboarding metrics", "Client feedback", "Process improvements"],
      keyPoints: ["Onboarding completion rate improved to 87%", "Average time reduced by 30%"],
      decisions: ["Add interactive tutorial in step 2"],
      actionItems: [
        { task: "Design interactive tutorial mockups", assignee: "Sofia Martinez", deadline: "2026-04-01" },
      ],
    },
    analytics: { onTopicPercent: 88, offTopicPercent: 12, agendaCoverage: 90, productivityScore: 85 },
  },
];
