import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Router } from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.scss']
})
export class NewListComponent implements OnInit {

  constructor(private taskService: TaskService, private router: Router, private location: Location) { }

  ngOnInit() {
  }

  createList(title: string) {
    this.taskService.createList(title).subscribe((list: any) => {
      console.log(list);
      // Now we navigate to /lists/task._id
      this.router.navigate([ '/lists', list._id ]);
    });
  }

  cancelClick() {
    this.location.back();
  }

}
