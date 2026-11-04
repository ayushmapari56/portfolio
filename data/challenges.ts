export interface Challenge {
  number: string;
  title: string;
  description: string;
}

export const challengesData: Challenge[] = [
  {
    number: "01",
    title: "Slow replies lose customers",
    description:
      "Prospects expect instant answers. Every hour without a response pushes them straight to a competitor.",
  },
  {
    number: "02",
    title: "Manual work eats your time",
    description:
      "Copy-pasting data between apps, chasing invoices, updating spreadsheets — none of it scales with you.",
  },
  {
    number: "03",
    title: "Websites that don't convert",
    description:
      "Beautiful templates still underperform when they lack strategic copy, speed, and intentional UX.",
  },
];
