import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import Column from "./Column";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements AfterViewInit, OnInit {

  @Input()
  columns: Column[] = []

  @Input()
  data: any = []

  @Input()
  dataSource = new MatTableDataSource<any>()

  @Output()
  editElement: EventEmitter<any> = new EventEmitter<any>()

  @Output()
  deleteElement: EventEmitter<any> = new EventEmitter<any>()

  @Output()
  addElement: EventEmitter<any> = new EventEmitter<any>()

  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  @ViewChild(MatSort)
  sort: MatSort;

  displayedColumns: string[] = []

  constructor() {}

  ngOnInit(): void {
    this.displayedColumns = this.columns.map(column => column.name)
    this.dataSource.data = [...this.data]
  }

  newDataSource(data: any) {
    this.dataSource.data = [...data]
  }

  ngAfterViewInit(): void {
    this.paginator._intl.itemsPerPageLabel = 'Elements par pages: '
    this.paginator._intl.getRangeLabel = this.getRangeLabel
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort
  }

  getRangeLabel = function (page: number, pageSize: number, length: number) {
    if (length === 0 || pageSize === 0) {
      return '0 sur ' + length;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    // If the start index exceeds the list length, do not try and fix the end index to the end.
    const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;
    return startIndex + 1 + ' - ' + endIndex + ' sur ' + length;
  };

  doFilter = (value: string) => {
    this.dataSource.filter = value.trim()
  }
}
