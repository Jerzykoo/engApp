import { Injectable } from '@angular/core';
import { UserRolesEnum } from 'src/app/modules/admin/store/types';

export interface IConstOption {
  title: string;
  value: any;
}

@Injectable({
  providedIn: 'root',
})
export class ConstService {
  public roles: IConstOption[] = [
    { title: 'Admin', value: UserRolesEnum.ADMIN },
    { title: 'Pracownik', value: UserRolesEnum.LIBRARIAN },
    { title: 'Czytelnik', value: UserRolesEnum.READER },
  ];

  public borrowsOptions: IConstOption[] = [];
  public copyStatusOptions: IConstOption[] = [];

  questionsFirstLevel = [
    {
      audioName: 'water',
      correctAnswer: 1,
      audioSrc: 'assets/audio/water.mp3',
      answers: [
        {
          name: 'Chleb',
          value: 0,
        },
        {
          name: 'Woda',
          value: 1,
        },
        {
          name: 'Ziemniak',
          value: 2,
        },
        {
          name: 'Jabłko',
          value: 3,
        },
      ],
    },
    {
      audioName: 'dog',
      audioSrc: 'assets/audio/dog.mp3',
      correctAnswer: 0,
      answers: [
        {
          name: 'Pies',
          value: 0,
        },
        {
          name: 'Kot',
          value: 1,
        },
        {
          name: 'Tygrys',
          value: 2,
        },
        {
          name: 'Krowa',
          value: 3,
        },
      ],
    },
    {
      audioName: 'table',
      audioSrc: 'assets/audio/table.mp3',
      correctAnswer: 0,
      answers: [
        {
          name: 'Stół',
          value: 0,
        },
        {
          name: 'Krzesło',
          value: 1,
        },
        {
          name: 'Ściana',
          value: 2,
        },
        {
          name: 'Szafa',
          value: 3,
        },
      ],
    },
    {
      audioName: 'apple',
      audioSrc: 'assets/audio/apple.mp3',
      correctAnswer: 1,
      answers: [
        {
          name: 'Gruszka',
          value: 0,
        },
        {
          name: 'Jabłko',
          value: 1,
        },
        {
          name: 'Kiwi',
          value: 2,
        },
        {
          name: 'Ananas',
          value: 3,
        },
      ],
    },
    {
      audioName: 'keyboard',
      audioSrc: 'assets/audio/keyboard.mp3',
      correctAnswer: 2,
      answers: [
        {
          name: 'Słuchawki',
          value: 0,
        },
        {
          name: 'Głośnik',
          value: 1,
        },
        {
          name: 'Klawiatura',
          value: 2,
        },
        {
          name: 'Mikrofon',
          value: 3,
        },
      ],
    },
  ];

  questionsSecondLevel = [
    {
      audioName: 'animal',
      audioSrc: 'assets/audio/animal.mp3',
      correctAnswer: 0,
      answers: [
        {
          name: 'Zwierzę',
          value: 0,
        },
        {
          name: 'Roślina',
          value: 1,
        },
        {
          name: 'Kobieta',
          value: 2,
        },
        {
          name: 'Mężczyzna',
          value: 3,
        },
      ],
    },
    {
      audioName: 'car',
      audioSrc: 'assets/audio/car.mp3',
      correctAnswer: 3,
      answers: [
        {
          name: 'Rower',
          value: 0,
        },
        {
          name: 'Rolki',
          value: 1,
        },
        {
          name: 'Łyżwy',
          value: 2,
        },
        {
          name: 'Samochód',
          value: 3,
        },
      ],
    },
    {
      audioName: 'plane',
      audioSrc: 'assets/audio/plane.mp3',
      correctAnswer: 3,
      answers: [
        {
          name: 'Helikopter',
          value: 0,
        },
        {
          name: 'Pociąg',
          value: 1,
        },
        {
          name: 'Tramwaj',
          value: 2,
        },
        {
          name: 'Samolot',
          value: 3,
        },
      ],
    },
    {
      audioName: 'money',
      audioSrc: 'assets/audio/money.mp3',
      correctAnswer: 2,
      answers: [
        {
          name: 'Owoce',
          value: 0,
        },
        {
          name: 'Warzywa',
          value: 1,
        },
        {
          name: 'Pieniądze',
          value: 2,
        },
        {
          name: 'Rośliny',
          value: 3,
        },
      ],
    },
    {
      audioName: 'country',
      audioSrc: 'assets/audio/country.mp3',
      correctAnswer: 1,
      answers: [
        {
          name: 'Kontynent',
          value: 0,
        },
        {
          name: 'Kraj',
          value: 1,
        },
        {
          name: 'Miasto',
          value: 2,
        },
        {
          name: 'Województwo',
          value: 3,
        },
      ],
    },
  ];

  quizFirstLevel = [
    {
      questionName: 'Ten chłopak lubi grać w piłkę nozną',
      correctAnswer: 0,
      answers: [
        {
          name: 'This boy likes to play football',
          value: 0,
        },
        {
          name: 'This toy likes play football',
          value: 1,
        },
        {
          name: 'This girl love to play football',
          value: 2,
        },
        {
          name: 'This person would like play football',
          value: 3,
        },
      ],
    },
    {
      questionName: 'Czym się zajmujesz?',
      correctAnswer: 0,
      answers: [
        {
          name: 'What do you do?',
          value: 0,
        },
        {
          name: 'What are you do?',
          value: 1,
        },
        {
          name: 'What do you does?',
          value: 2,
        },
        {
          name: 'Where do you do?',
          value: 3,
        },
      ],
    },
    {
      questionName: 'Gdzie pracujesz? ',
      correctAnswer: 1,
      answers: [
        {
          name: 'Can you work in the night?',
          value: 0,
        },
        {
          name: 'Where do you work?',
          value: 1,
        },
        {
          name: 'Where are you live?',
          value: 2,
        },
        {
          name: 'Where do you live?',
          value: 3,
        },
      ],
    },
    {
      questionName: 'Czy potrafisz mówić w innych językach?',
      correctAnswer: 2,
      answers: [
        {
          name: 'Did you spoke any  language',
          value: 0,
        },
        {
          name: 'Can you speaking other languages',
          value: 1,
        },
        {
          name: 'Can you speak any other languages',
          value: 2,
        },
        {
          name: 'Could you speak any languages',
          value: 3,
        },
      ],
    },
    {
      questionName: 'Gdzie uczyłeś się angielskiego?',
      correctAnswer: 0,
      answers: [
        {
          name: 'Where did you learn English?',
          value: 0,
        },
        {
          name: 'What did you learn English?',
          value: 1,
        },
        {
          name: 'Where did you learning England?',
          value: 2,
        },
        {
          name: 'Which you learn English?',
          value: 3,
        },
      ],
    },
  ];

  quizSecondLevel = [
    {
      questionName: 'Jakiej słuchasz muzyki?',
      correctAnswer: 2,
      answers: [
        {
          name: 'What kind of music do you listen to?',
          value: 0,
        },
        {
          name: 'Where kind of music do you listen to?',
          value: 1,
        },
        {
          name: 'What kind of music do you listen?',
          value: 2,
        },
        {
          name: 'Which music do you listen to?',
          value: 3,
        },
      ],
    },
    {
      questionName: 'Czy potrafisz grać na instrumencie?',
      correctAnswer: 0,
      answers: [
        {
          name: 'Can you play an instrument?',
          value: 0,
        },
        {
          name: 'Could you play an instrument?',
          value: 1,
        },
        {
          name: 'Can you play an audio?',
          value: 2,
        },
        {
          name: 'Can play an instrument?',
          value: 3,
        },
      ],
    },
    {
      questionName: 'Jaki serial ostatnio obejrzałeś?',
      correctAnswer: 1,
      answers: [
        {
          name: 'Where TV series have you watched recently?',
          value: 0,
        },
        {
          name: 'What TV series have you watched recently?',
          value: 1,
        },
        {
          name: 'What TV series have you watched',
          value: 2,
        },
        {
          name: 'What TV series you watched recently?',
          value: 3,
        },
      ],
    },
    {
      questionName: 'Co robiłeś w ostatni weekend?',
      correctAnswer: 0,
      answers: [
        {
          name: 'What did you last weekend?',
          value: 0,
        },
        {
          name: 'What  you last weekend?',
          value: 1,
        },
        {
          name: 'What did you weekend?',
          value: 2,
        },
        {
          name: 'Do did you last weekend?',
          value: 3,
        },
      ],
    },
    {
      questionName: 'Czy masz jakieś zwierzęta?',
      correctAnswer: 0,
      answers: [
        {
          name: 'Do you have any pets?',
          value: 0,
        },
        {
          name: 'Did you have any pets?',
          value: 1,
        },
        {
          name: 'Do you having pets?',
          value: 2,
        },
        {
          name: 'Do you have any cats?',
          value: 3,
        },
      ],
    },
  ];

  rebusFirstLevel = {
    imageSrc: 'assets/images/firstRebus.jpg',
    correctAnswerEnglish: 'witch',
    correctAnswerPolish: 'czarownica',
  };

  rebusSecondLevel = {
    imageSrc: 'assets/images/secondRebus.jpg',
    correctAnswerEnglish: 'charm',
    correctAnswerPolish: 'czar',
  };
}
