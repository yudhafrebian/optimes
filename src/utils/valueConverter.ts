export const valueConverter = (value: string, type: "priority" | "unit") => {
  const normalized = String(value).trim();
  const upper = normalized.toUpperCase();

  if (type === "unit") {
    if (normalized === "101" || upper === "BK") return "BK";
    if (normalized === "102" || upper === "EA") return "EA";
    return normalized;
  }

  if (type === "priority") {
    if (normalized === "1" || upper === "HIGH") return "High";
    if (normalized === "2" || upper === "NORMAL") return "Normal";
    if (normalized === "3" || upper === "LOW") return "Low";
    if (upper === "HIGH" || upper === "NORMAL" || upper === "LOW") {
      return upper[0] + upper.slice(1).toLowerCase();
    }
    return normalized;
  }
};
