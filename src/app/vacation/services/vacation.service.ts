import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable()
export class VacationService {
  vacationList: AngularFireList<any>;
  constructor(private firebasedb: AngularFireDatabase) { }

  getVacationList() {
    this.vacationList = this.firebasedb.list('vacations');
    return this.vacationList;
  }

  addVacation(userName: string) {
    this.vacationList.push({
      userName: userName,
      isApprove: false,
      dateTime: 0,
      showInfo: false,
      additionalInfo: {
        days: Math.floor(Math.random() * 11),
        info: 'some info',
        additionalComments: 'additional comments'
      }
    });
  }

  approveVacation($key: string) {
    this.updateRecod($key, true);
  }

  rejectVacation($key: string) {
    this.updateRecod($key, false);
  }

  updateRecod($key: string, isApproved: boolean) {
    this.vacationList.update($key, { 
      isApprove: isApproved,
      dateTime: Date()
     });
  }

  showInfo($key: string, showInfo: boolean) {
    this.vacationList.update($key, { 
      showInfo: showInfo
     });
  }
}
