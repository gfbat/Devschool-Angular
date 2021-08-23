import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';
import {Location} from '@angular/common';

@Component({
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {

  constructor(private route: ActivatedRoute, private taskService: TaskService, private router: Router, private location: Location) { }

  taskId: string = '';
  listId: string = '';


  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.taskId = params.taskId;
        this.listId = params.listId;
      }
    )
  }

  updateTask(title: string, date: Date | string) {
    this.taskService.updateTask(this.listId, this.taskId, title, date).subscribe(() => {
      this.router.navigate(['/lists', this.listId]);
    })
  }

  cancelClick() {
    this.location.back();
  }

}
