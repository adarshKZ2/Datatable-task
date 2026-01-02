export function formatTime(timestamp: number) {
  return new Date(timestamp).toLocaleDateString("en-IN", {
    dateStyle: "medium",
  });
}
