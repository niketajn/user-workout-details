import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import userDataObj from 'src/app/user.json';

@Component({
  selector: 'app-user-input',
  templateUrl: './user-input.component.html',
  styleUrls: ['./user-input.component.css']
})

export class UserInputComponent implements OnInit {

  workouts:string[] = ['Running','Cycling','Swimming','Yoga'];
  userForm!: FormGroup;
  count:number = 1;
  userDataArr:any = [];
  userDataObj:any = {};

  constructor(private ls:LocalStorageService) { }

  
  ngOnInit(): void {
     this.userForm = new FormGroup({
      name: new FormControl('', [Validators.required,Validators.pattern('^[a-zA-Z ]+$'),Validators.minLength(5)]),
      type: new FormControl('Running',Validators.required),
      workout_minutes: new FormControl('',[Validators.required, Validators.minLength(1), Validators.maxLength(2)])
    });
    this.ls.setItem('userData',JSON.stringify(userDataObj))
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
        
        let workouts:any = [];
        /*let workoutObj = { type: this.userForm.value.type, minutes: this.userForm.value.workout_minutes};
        workouts.push(workoutObj)
        userDataObj.workouts = workouts
        */
        let userExists = false
        for(var i=0;i<userDataArr.length;i++){
          if(this.userForm.value.name === userDataArr[i].name){
            // userDataObj for this user already exists at position [i]
            if(userDataArr[i].workouts.length>0){
              let workoutObj = { type: this.userForm.value.type, minutes: this.userForm.value.workout_minutes};
              userDataArr[i].workouts.push(workoutObj);
            }
            userExists = true
            break;
          }
        }
        console.log(userDataObj)
        if(!userExists){
          userDataObj.id = this.count;
          this.count++; 
          userDataObj.name = this.userForm.value.name;
          userDataArr.push(userDataObj)
        }
        /*let workouts = userDataObj.workouts
            if(workouts === undefined){
              // only for first time
              workouts = []
            }
            let workoutObj = { type: this.userForm.value.type, minutes: this.userForm.value.workout_minutes};
            workouts.push(workoutObj)
            userDataObj.workouts = workouts*/    
        
        this.ls.setItem('userData',JSON.stringify(userDataArr)) 
      }
      
    //let workouts = [];
    /*
        this.userDataObj.id = this.count++; 
        this.userDataObj.name = this.userForm.value.name;
        this.userDataObj.workouts = { type: this.userForm.value.type, minutes: this.userForm.value.workout_minutes};
    
        for(var i=0;i<userData.length;i++){
        console.log(userData[i].name);
      if(this.userForm.value.name === userData[i].name){
        userData[i].workouts.push({type: this.userForm.value.type, minutes: this.userForm.value.workout_minutes})
      }else{
        userData.push({id:this.count++,name:this.userForm.value.name,workouts:userData[i].workouts.push({type: this.userForm.value.type, minutes: this.userForm.value.workout_minutes})})
      }
    }*/
  }
  }

