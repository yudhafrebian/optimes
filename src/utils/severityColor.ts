export const severityColor = (severity: string, border?: boolean) => {
    if(severity === "Setup") return border ? "primary.main" : "primary.light"
    if(severity === "Idle") return border ? "warning.light" : "warning.lighter"
    if(severity === "Production") return border ? "success.main" : "success.light"
    if(severity === "medium") return "warning.main"
    if(severity === "high") return "secondary.main"
    if(severity === "critical") return "error.main"
    return ""
}