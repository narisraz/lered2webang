import KanbanColumn from "./column.model";

interface Board<T> {
  name: string
  ids: string[]
  columns: KanbanColumn<T>[]
}

export default Board
