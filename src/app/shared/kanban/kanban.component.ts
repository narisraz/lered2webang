import {Component, ContentChild, EventEmitter, Input, OnInit, Output, TemplateRef} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import Board from "./models/board.model";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import FirestoreData from "../../core/interfaces/FirestoreData";
import KanbanData from "./models/kanban-data.model";

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.scss']
})
export class KanbanComponent implements OnInit {

  @Input() board$: Observable<Board<any>>
  @Output() onChangeContainer = new EventEmitter<KanbanData>()
  @ContentChild(TemplateRef) templateRef: TemplateRef<any>;

  constructor() { }

  ngOnInit(): void {
  }

  drop(event: CdkDragDrop<any[], any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      this.onChangeContainer.emit({
        containerId: event.container.id,
        data: event.container.data[event.currentIndex]
      })
    }
  }

  getIds(currentId: string, ids: string[]): string[] {
    return ids.filter(id => id != currentId)
  }
}
