import Task from "./Task";

interface EnhancedTask extends Task {
  statusLabel?: string
  platformName?: string
  compteName?: string
  userName?: string
}

export default EnhancedTask
