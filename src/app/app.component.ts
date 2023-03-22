import { Component } from '@angular/core';
import { EmployeeService } from './service/employee.service';
import { AboutComponent } from './about/about.component';
import { Routes, RouterModule } from '@angular/router';
import { Employee } from 'src/models/employee';
import { ConnectionStates } from 'mongoose';
import { User } from 'src/models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  


  constructor(private _employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.obtenerUsers();
    //this.obtenerEmployees();
  }

  obtenerUsers(){
    this._employeeService.getUsers().subscribe(data => {
      console.log(data);
      this.users = data;
/*      for(let i=0; i < data.length; i++){
        this.employees.push(data[i]);
      }*/
    }, error => {
      console.log(error);
    })
  }

  eliminarUser(id:string){
    var answer = confirm('Estas seguro de querer eliminarlo?');
    if(answer){
      this._employeeService.eliminarUser(id).subscribe(data => {
        this.users = [];
        this.obtenerUsers();    
      }, error => {
        console.log(error);
      })
    }    
  }
  deleteAllUsers(){
    var answer = confirm('Estas seguro de querer eliminar todos los usuarios?');
    if(answer){
      this._employeeService.deleteTodosUsers().subscribe(data => {
        this.users = [];
        this.obtenerUsers();    
      }, error => {
        console.log(error);
      })
    }
  }

  agregarUser(){
    this._employeeService.añadirUser(this.model).subscribe(data => {
      this.users = [];
      this.obtenerUsers();
      this.model = {_id:'',name:'',surname:'',email:'',password:0};  
    }, error => {
      console.log(error);
    })
  }

  editarUser(id:any){
    this._employeeService.actualizarUser(id,this.model2).subscribe(data =>{
      this.model2 = {_id:'',name:'',surname:'',email:'',password:0};
      this.hideUpdate = true;
      this.users = [];
      this.obtenerUsers();
    }, error => {
      console.log(error);
    })

    
  }
  

  title:string = 'Angular CRUD';  

  users: User [] = [];

  model:User = {_id:'',name:'',surname:'',email:'',password:0};
  model2:User = {_id:'',name:'',surname:'',email:'',password:0};
  msg:string = '';
  hideUpdate:boolean = true;

  // myValue = 0;
  // editEmployee(i:number):void{
  //   this.hideUpdate = false;
  //   this.model2._id = this.users[i]._id;
  //   this.model2.name = this.employees[i].name;
  //   this.model2.position = this.employees[i].position;
  //   this.model2.office = this.employees[i].office;
  //   this.myValue = i;
  // }
  
  closeAlert():void{
    this.msg = '';
  }

}
