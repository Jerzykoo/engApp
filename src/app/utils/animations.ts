import { trigger, animate, transition, style } from '@angular/animations';

export const fadeAnimation = trigger('fadeAnimation', [
  transition(':enter', [
    style({
      opacity: 0,
    }),
    animate(
      '200ms ease-in',
      style({
        opacity: 1,
      }),
    ),
  ]),
  transition(':leave', [
    style({
      opacity: 1,
    }),
    animate(
      '200ms ease-out',
      style({
        opacity: 0,
      }),
    ),
  ]),
]);

export const modalAnimation = trigger('modalAnimation', [
  transition(':enter', [
    style({
      opacity: 0,
      transform: 'translateY(50%)',
    }),
    animate(
      '400ms cubic-bezier(0.25, 0.8, 0.25, 1)',
      style({
        opacity: 1,
        transform: 'translateY(0)',
      }),
    ),
  ]),
  transition(':leave', [
    style({
      opacity: 1,
      transform: 'translateY(0)',
    }),
    animate(
      '200ms cubic-bezier(0.25, 0.8, 0.25, 1)',
      style({
        opacity: 0,
        transform: 'translateY(-10%)',
      }),
    ),
  ]),
]);
