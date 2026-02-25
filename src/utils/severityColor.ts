export const severityColor = (severity: string) => {
    if(severity === "info") return "info.main"
    if(severity === "warning") return "warning.light"
    if(severity === "low") return "success.main"
    if(severity === "medium") return "warning.main"
    if(severity === "high") return "secondary.main"
    if(severity === "critical") return "error.main"
    return ""
}