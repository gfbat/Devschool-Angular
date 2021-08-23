import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {

  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router, private location: Location) { }

  listId: string = '';

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.listId = params['listId'];
      }
    )
  }

  createTask(title: string, date: Date | string) {
    this.taskService.createTask(title, date, this.listId).subscribe((newTask) => {
      this.router.navigate(['../'], { relativeTo: this.route });
    })
  }

  cancelClick() {
    this.location.back();
  }

}
