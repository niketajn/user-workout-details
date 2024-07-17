import { Component, OnInit, Input } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})

export class UserTableComponent implements OnInit { 
  
  userData: any;
  total_workout_minutes:any='';
  workouts:any='';
  number_of_workouts:number=0;

  constructor(private ls:LocalStorageService) { 
  }

  ngOnInit(): void { 
    this.ls.dataSubject.subscribe(userData=>{
      this.userData = userData
    })
  }


  getWorkoutTypes(user:any): string {
    return user.workouts.map((workout: { type: any; }) => workout.type).join(', ');
  }

  getWorkoutMinutes(user: any): number {
    let totalMinutes = 0;
    user.workouts.forEach((workout: { minutes: number; }) => {
      totalMinutes += workout.minutes;
    });
    return totalMinutes;
  }

  updateData(data: any[]) {
    this.userData = data;
  }
    
  }
