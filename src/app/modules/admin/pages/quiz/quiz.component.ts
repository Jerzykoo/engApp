import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AdminForm } from '../../admin.form';
import { AuthService } from 'src/app/modules/auth/store/service';
import { ConstService } from 'src/app/core/services/const.service';
import { AdminService } from '../../store/service';
import { Store } from '@ngxs/store';
import { SetUser } from 'src/app/modules/auth/store/actions';
import { IUser } from 'src/app/modules/auth/store/types';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
})
export class QuizComponent {
  counter = 1;

  user!: IUser;
  currentQuestion!: any;
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
    private store: Store
  ) {}

  ngOnInit() {
    this.points = 0;
    this.authService.getUser().subscribe((user) => {
      console.log(user);
      this.user = user;
      this.getQuestionsByLevel(user?.level);
      this.currentQuestion = this.questions[0];
    });
  }

  getQuestionsByLevel(level: number) {
    if (level === 1) {
      this.questions = this.constService?.quizFirstLevel;
    } else if (level === 2) {
      this.questions = this.constService?.quizSecondLevel;
    }
  }

  getQuestionByLevel(level: number) {
    if (level === 1) {
      this.questions = this.constService?.questionsFirstLevel;
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
    if (this.selectedAnswer.value === this.currentQuestion.correctAnswer) {
      this.points += 1;
    }
    this.selectedAnswer = null;
    this.counter++;
    this.currentQuestion = this.questions[this.counter - 1];

    if (this.counter - 1 === this.questions?.length) {
      console.log(this.points);

      if (this.points > this.user?.quizPoints) {
        let isLevelUp = false;
        let user = { ...this.user };
        user.points = user?.points - user?.quizPoints + this.points;
        user.quizPoints = this.points;
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
            queryParams: { points: this.points, isLevelUp: isLevelUp ? 1 : 0 },
          });
        });
      }
      this.router.navigate(['/admin/success'], {
        queryParams: { points: this.points },
      });
    }
  }
}
