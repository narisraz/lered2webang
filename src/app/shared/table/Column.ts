import {MatSortable} from "@angular/material/sort";

interface Column {
  name: string
  label: string
  type?: 'date'
  sort?: MatSortable
}

export default Column
