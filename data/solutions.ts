export interface SolutionItem {
  id: string;
  symptom: string;
  system: string[];
}

export const solutionsData: SolutionItem[] = [
  {
    id: "response-time",
    symptom: "Customers can't reach you fast enough.",
    system: ["WhatsApp automation", "CRM"],
  },
  {
    id: "retention",
    symptom: "People don't come back.",
    system: ["Retention systems", "Customer database"],
  },
  {
    id: "reputation",
    symptom: "Your reputation isn't visible where people decide.",
    system: ["Google Reviews system", "Local SEO"],
  },
  {
    id: "presence",
    symptom: "Your website undersells what you actually do well.",
    system: ["Website", "Brand positioning"],
  },
];
