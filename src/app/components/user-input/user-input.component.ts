import { Component, OnInit, ViewChild } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import userDataObj from 'src/app/user.json';
import { UserTableComponent } from '../user-table/user-table.component';

@Component({
  selector: 'app-user-input',
  templateUrl: './user-input.component.html',
  styleUrls: ['./user-input.component.css']
})

export class UserInputComponent implements OnInit {

  workouts:string[] = ['Running','Cycling','Swimming','Yoga'];
  userForm!: FormGroup;
  userDataObj:any = {};
  count:number = 3;
  constructor(private ls:LocalStorageService) { }

  
  ngOnInit(): void {
     this.userForm = new FormGroup({
      name: new FormControl('', [Validators.required,Validators.pattern('^[a-zA-Z ]+$'),Validators.minLength(5)]),
      type: new FormControl('Running',Validators.required),
      workout_minutes: new FormControl('',[Validators.required, Validators.minLength(1), Validators.maxLength(2)])
    });
    let getUserData = JSON.parse(this.ls.getItem('userData'));
    if(getUserData !==null || getUserData!==undefined){
    this.ls.setItem('userData',JSON.stringify(getUserData))
  }else{
    this.ls.setItem('userData',JSON.stringify(userDataObj))
  }
}

  onSubmit(){
    if(this.userForm.valid){
      let existingData = JSON.parse(this.ls.getItem('userData'));
        let userDataArr = [];
        //user data is present
        if(existingData!==null){
          userDataArr = existingData;
        } 

        let userDataObj:any = {};  
        let workoutObj = { 
          type: this.userForm.value.type,
          minutes: this.userForm.value.workout_minutes
        };

        let userExists = false
        for(var i=0;i<userDataArr.length;i++){
          if(this.userForm.value.name === userDataArr[i].name){
            // userDataObj for this user already exists at position [i]
            if(userDataArr[i].workouts.length>0){
              userDataArr[i].workouts.push(workoutObj);
            }
            userExists = true
            //break;
          }
        }

        if(!userExists){
          this.count=this.count+1;
          userDataObj.id = this.count;
          userDataObj.name = this.userForm.value.name;
          userDataObj.workouts = [workoutObj];
          userDataArr.push(userDataObj)
        }

        this.ls.setItem('userData',JSON.stringify(userDataArr)) 
        this.ls.dataSubject.next(userDataArr);
        this.userForm.reset();
      }
  }
  }

