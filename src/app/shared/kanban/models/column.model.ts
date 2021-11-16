import {Observable} from "rxjs";

interface KanbanColumn<T> {
  name: string
  id: string
  items: Observable<T[]>
}

export default KanbanColumn
