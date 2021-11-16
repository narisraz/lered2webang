import {MatSortable} from "@angular/material/sort";

interface TableColumn {
  name: string
  label: string
  type?: 'date'
  sort?: MatSortable
}

export default TableColumn
