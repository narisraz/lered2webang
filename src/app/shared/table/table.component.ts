import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input, OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import TableColumn from "./TableColumn";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {Observable, Subscription} from "rxjs";
import FirestoreData from "../../core/interfaces/FirestoreData";
import * as _ from 'lodash'


interface Data extends FirestoreData {
  [key: string]: any
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements AfterViewInit, OnInit, OnDestroy {

  @Input() isAdmin = false

  @Input() title: string

  @Input() columns: TableColumn[] = []

  @Input() data$: Observable<any>

  @Input() withSearchForm: boolean = true

  @Input() withAddButton: boolean = true

  @Input() withViewElementButton = false

  @Output() editElement: EventEmitter<any> = new EventEmitter<any>()

  @Output() deleteElement: EventEmitter<any> = new EventEmitter<any>()

  @Output() addElement: EventEmitter<any> = new EventEmitter<any>()

  @Output() viewElement: EventEmitter<any> = new EventEmitter<any>()

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  dataSubscription: Subscription
  loading = true
  displayedColumns?: string[] = []
  dataSource = new MatTableDataSource<any>()

  constructor(
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe()
  }

  ngOnInit(): void {
    this.displayedColumns = this.columns.map(column => column.name)
    this.dataSubscription = this.data$.subscribe(data => {
      this.loading = false
      this.dataSource.data = data
    })
  }

  ngAfterViewInit(): void {
    this.paginator._intl.itemsPerPageLabel = 'Elements par pages: '
    this.paginator._intl.getRangeLabel = this.getRangeLabel
    this.dataSource.paginator = this.paginator
    this.columns.map(column => {
      if (column.sort) {
        this.sort.sort(column.sort)
      }
    })
    this.dataSource.filterPredicate = this.filterPredicate
    this.dataSource.sort = this.sort
    this.changeDetector.detectChanges()
  }

  filterPredicate = (column: Data, filter: string) => {
    let found = false
    for (let property in column) {
      let value = column['' + property]
      if (!property.endsWith('Id') && 'insertDate' != property && 'updateDate' != property && !_.isNumber(value) && !_.isDate(value)) {
        found = found || value.toLowerCase().includes(filter.toLowerCase())
      }
    }
    return found
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
