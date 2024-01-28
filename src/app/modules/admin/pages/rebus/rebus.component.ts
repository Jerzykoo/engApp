import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { ConstService } from 'src/app/core/services/const.service';
import { SetUser } from 'src/app/modules/auth/store/actions';
import { AuthService } from 'src/app/modules/auth/store/service';
import { IUser } from 'src/app/modules/auth/store/types';
import { AdminForm } from '../../admin.form';
import { AdminService } from '../../store/service';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-rebus',
  templateUrl: './rebus.component.html',
})
export class RebusComponent {
  public form: UntypedFormGroup = this.fb.group({
    polish: ['', [Validators.required, Validators.maxLength(64)]],
    english: ['', [Validators.required, Validators.maxLength(64)]],
  });
  counter = 1;

  user!: IUser;
  currentQuestion!: any;
  question!: any;
  selectedAnswer!: any;
  correctAnwersNumber = 0;
  questions: any[] = [];
  points: number = 0;
  constructor(
    private router: Router,
    private adminForm: AdminForm,
    private authService: AuthService,
    private constService: ConstService,
    private adminService: AdminService,
    private store: Store,
    private fb: UntypedFormBuilder
  ) {}

  ngOnInit() {
    this.points = 0;
    this.authService.getUser().subscribe((user) => {
      console.log(user);
      this.user = user;
      this.getQuestionByLevel(user?.level);
      console.log(this.question);

      // this.currentQuestion = this.questions[0];
    });
  }

  getQuestionByLevel(level: number) {
    if (level === 1) {
      this.question = this.constService?.rebusFirstLevel;
    } else if (level === 2) {
      this.question = this.constService?.rebusSecondLevel;
    }
  }

  getQuestionLetter(index: number) {
    if (index === 0) {
      return 'A';
    } else if (index === 1) {
      return 'B';
    } else if (index === 2) {
      return 'C';
    } else if (index === 3) {
      return 'D';
    }
    return '';
  }

  chooseAnswer(answer: any) {
    this.selectedAnswer = answer;
  }

  confirmQuestion() {
    if (this.form.value.english === this.question?.correctAnswerEnglish) {
      this.points += 1;
    }
    if (this.form.value.polish === this.question?.correctAnswerPolish) {
      this.points += 1;
    }

    if (this.points > this.user?.rebusPoints) {
      let isLevelUp = false;
      let user = { ...this.user };
      user.points = user?.points - user?.rebusPoints + this.points;
      user.rebusPoints = this.points;
      if (user.points === environment.gameConfig.secondLevel) {
        user.level = 2;
        isLevelUp = true;
      }

      if (user.points === environment.gameConfig.thirdLevel) {
        user.level = 3;
        isLevelUp = true;
      }

      if (isLevelUp) {
        user.listenPoints = 0;
        user.quizPoints = 0;
        user.rebusPoints = 0;
      }

      this.adminService.updateUser(user).subscribe((res: any) => {
        console.log(res);
        this.store.dispatch(new SetUser(user));
        this.router.navigate(['/admin/success'], {
          queryParams: {
            points: this.points,
            maxPoints: 2,
            isLevelUp: isLevelUp ? 1 : 0,
          },
        });
      });
    } else {
      this.router.navigate(['/admin/success'], {
        queryParams: { points: this.points, maxPoints: 2 },
      });
    }
  }
}
