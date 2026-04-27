/*Trae herramientas que el service necesita para funcionar */
import {Injectable} from "@angular/core";
import {Preferences} from "@capacitor/Preferences";
import {Task, TaskStatus} from "../models/task.model";
/*Crear una sola instancia para la aplicacion */
@Injectable({
    providedIn: 'root'

})
export class TaskService{
    /*Define la clave con la que se guardan las tareas */
    private readonly STORAGE_KEY = 'task';
/* Arreglo q guarda en memoria cuando la app esta activa (antes de guardarlo en el dispositivo) */
    private tasks: Task[] = [];
    /* Carga desde el almacenamiento local las tareas que se habian guardado antes.*/

    async init(): Promise<void>{
        const {value} =await 
        Preferences.get({key: this.STORAGE_KEY});
        this.tasks =value ? JSON.parse(value): [];
    }
    /* Devuelve la lista de tareas */
    getTask(): Task[] {
        return [...this.tasks];
    }
    /* Busca una tarea por id */
    getTaskById(id: string): Task | undefined {
        return this.tasks.find(task => task.id === id);
    }
    /* Agrega una tarea nueva  */
    async addTask(taskData: Omit<Task, 'id' | 'fechaCreacion' | 'completada'>):
    Promise<void>{

        const newTask: Task ={
            ...taskData,
            id: crypto.randomUUID(),
            fechaCreacion: new Date().toISOString(),
            completada: taskData.estado === 'Listo'
        };
        this.tasks.unshift(newTask);
        await this.saveTask();
    }

    /* Actualiza la tarea existente */
    async updateTask(updateTask:Task): Promise<void>{
        const index = this.tasks.findIndex(tasks => tasks.id === updateTask.id);
        if(index=== -1) return;

        updateTask.completada = updateTask.estado === 'Listo';
        this.tasks[index] = {...updateTask};
        await this.saveTask();

    }
/* Elimina la tarea existente por id*/
    async deleteTask(id:string):Promise<void>{
        this.tasks = this.tasks.filter(tasks => tasks.id !== id);
        await this.saveTask();
    }
/* Cambia solo el estado de una tareas */
    async changeStatus(id: string, estado: TaskStatus): Promise<void>{
        const task = this.tasks.find(tasks => tasks.id === id);
        if (!task) return;

        task.estado = estado;
        task.completada = estado === 'Listo';

        await this.saveTask();
    }
    /* Calcula las estadisticas del arreglo de tareas */
    getSummary(){
        const total = this.tasks.length;
        const pendientes = this.tasks.filter(t => t.estado === 'pendiente').length;
        const enProgreso = this.tasks.filter(t => t.estado === 'en progreso').length;
        const listas = this.tasks.filter(t => t.estado === 'Listo').length;

        const hoy = new Date();
        const vencidas = this.tasks.filter(t =>
          new Date(t.fechaLimite) < hoy
        ).length;

        return{
            total,
            pendientes,
            enProgreso,
            listas,
            vencidas
    };
    }
    /*Guarda el areglo tasks en el almacenamiento local */
    private async saveTask():Promise<void>{
        await Preferences.set({
            key:this.STORAGE_KEY,
            value:JSON.stringify(this.tasks)
        });
    }

}