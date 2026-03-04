export const severityColor = (severity: string) => {
    if(severity === "Setup") return "primary.main"
    if(severity === "Idle") return "warning.light"
    if(severity === "Production") return "success.main"
    if(severity === "medium") return "warning.main"
    if(severity === "high") return "secondary.main"
    if(severity === "critical") return "error.main"
    return ""
}