import { Component } from '@angular/core';
import { AdminForm } from '../../admin.form';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
})
export class SuccessComponent {
  public isLoading = false;
  points!: number;
  maxPoints!: number;
  isLevelUp: any = false;
  private subscription$: Subscription = new Subscription();
  constructor(public adminForm: AdminForm, private route: ActivatedRoute) {}
  ngOnInit() {
    this.subscription$.add(
      this.route.queryParams.subscribe((params) => {
        this.points = params['points'];
        this.maxPoints = params['maxPoints'];
        console.log(params['isLevelUp']);

        this.isLevelUp = Boolean(Number(params['isLevelUp']));
      })
    );
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }
}
