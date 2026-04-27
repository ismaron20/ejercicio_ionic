import { Component, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { TaskService } from './services/task.service'
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent implements OnInit{
  constructor(private taskService: TaskService) {}
  async ngOnInit(): Promise<void>{
    await this.taskService.init();
  }
}
