import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConstService } from 'src/app/core/services/const.service';
import { AuthService } from 'src/app/modules/auth/store/service';
import { AdminForm } from '../../admin.form';
import { IUser } from 'src/app/modules/auth/store/types';
import { AdminService } from '../../store/service';
import { SetUser } from 'src/app/modules/auth/store/actions';
import { Store } from '@ngxs/store';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-listening',
  templateUrl: './listening.component.html',
})
export class ListeningComponent {
  @ViewChild('audio') audio!: any;

  counter = 1;
  points: number = 0;
  user!: IUser;
  currentQuestion!: any;
  selectedAnswer!: any;
  correctAnwersNumber = 0;
  questions: any[] = [];
  constructor(
    private router: Router,
    private adminForm: AdminForm,
    private authService: AuthService,
    private adminService: AdminService,
    private constService: ConstService,
    private store: Store
  ) {}

  ngOnInit() {
    this.points = 0;
    this.authService.getUser().subscribe((user) => {
      console.log(user);
      this.user = user;
      this.getQuestionsByLevel(user?.level);
      this.currentQuestion = this.questions[0];
      this.audio.nativeElement.src = this.currentQuestion.audioSrc;
      console.log(this.currentQuestion);
    });
  }

  getQuestionsByLevel(level: number) {
    if (level === 1) {
      this.questions = this.constService?.questionsFirstLevel;
    } else if (level === 2) {
      this.questions = this.constService?.questionsSecondLevel;
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

      if (this.points > this.user?.listenPoints) {
        let isLevelUp = false;
        let user = { ...this.user };
        user.points = user?.points - user?.listenPoints + this.points;
        user.listenPoints = this.points;
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
      this.router.navigate(['/admin/success']);
    } else {
      this.audio.nativeElement.src = this.currentQuestion.audioSrc;
    }
  }
}
