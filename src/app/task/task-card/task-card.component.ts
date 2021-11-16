import {Component, Input, OnInit} from '@angular/core';
import Task from "../../core/interfaces/Task";
import EnhancedTask from "../../core/interfaces/EnhancedTask";

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent implements OnInit {

  @Input() task: EnhancedTask

  constructor() { }

  ngOnInit(): void {
  }

}
