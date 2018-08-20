import { Component, OnInit } from '@angular/core';
import { VacationService } from './services/vacation.service';

@Component({
  selector: 'app-vacation',
  templateUrl: './vacation.component.html',
  styleUrls: ['./vacation.component.sass'],
  providers: [VacationService]
})
export class VacationComponent implements OnInit {
  private vacationListArray: any[];

  constructor(private vacationService: VacationService) { }

  ngOnInit() {
    this.vacationService.getVacationList().snapshotChanges()
    .subscribe(item => {
        this.vacationListArray = [];
        item.forEach(element => {
          const payload = element.payload.toJSON();
          payload["$key"] = element.key;
          this.vacationListArray.push(payload);
        });
    });
  }

  onAdd(userName) {
    if (userName.value.length) {
      this.vacationService.addVacation(userName.value);
      userName.value = null;
    }
  }

  onApprove($key: string) {
    this.vacationService.approveVacation($key);
  }

  onReject($key: string) {
    this.vacationService.rejectVacation($key);
  }

  onShowInfo($key: string, showInfo: boolean) {
    this.vacationService.showInfo($key, !showInfo);
  }
}
