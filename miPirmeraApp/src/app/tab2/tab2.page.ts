import { Component } from '@angular/core';
import { 
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCardContent,
  IonItem,
  IonInput,
  IonTextarea,
  IonButton,
  IonSelect,
  IonSelectOption,
  IonLabel,
  IonToast,
  ToastController

} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import {FormsModule} from '@angular/forms';
import {TaskService} from '../services/task.service';
import { CommonModule } from '@angular/common';
import { TaskStatus } from '../models/task.model';
import { TaskPriority } from '../models/task.model'


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonItem,
    IonInput,
    IonTextarea,
    IonButton,
    IonSelect,
    IonSelectOption,
    IonLabel,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonToast,
 ExploreContainerComponent

]
})
export class Tab2Page {
  mostrarToast = false;
  mensajeToast = '';
  

  form : {
    titulo: string;
    descripcion: string;
    fechaLimite: string;
    estado: TaskStatus;
    prioridad: TaskPriority;
    categoria: String
  }={
    titulo:'',
    descripcion:'',
    fechaLimite:'',
    estado:'pendiente',
    prioridad:'media',
    categoria:'media',
  };

  constructor(
    private taskService: TaskService,
 
){}
     
  async guardar():Promise<void>{
    if(!this.form.titulo.trim() || !this.form.fechaLimite){
      this.mensajeToast = 'El titulo y la fecha son obligatorias.'
      this.mostrarToast = true;
      return;
    }

    await this.taskService.addTask({
      titulo:this.form.titulo,
      descripcion: this.form.descripcion,
      fechaLimite: this.form.fechaLimite,
      estado: this.form.estado,
      prioridad: this.form.prioridad,
      categoria:''
    });
    this.form ={
      titulo:'',
    descripcion:'',
    fechaLimite:'',
    estado:'pendiente',
    prioridad:'media',
    categoria:'',
    };

    this.mensajeToast = 'Tarea guardad correctamente';
  this.mostrarToast = true;
    
  }


     



  
}
