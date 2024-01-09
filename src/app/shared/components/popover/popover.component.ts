import {
  Overlay,
  OverlayConfig,
  OverlayPositionBuilder,
  OverlayRef,
} from '@angular/cdk/overlay';
import { CdkPortal } from '@angular/cdk/portal';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { fadeAnimation } from '../../../utils/animations';
import { Subscription } from 'rxjs';
import { distinctUntilKeyChanged, filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
  animations: [fadeAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopoverComponent implements OnInit, OnDestroy {
  @Input() public reference!: HTMLElement;
  @Input() public width!: string;
  @Input() public anchor: 'left' | 'right' = 'right';
  @Input() public disposeOnNavigation = true;
  @Output() public positionChanged: EventEmitter<'top' | 'bottom'> =
    new EventEmitter();

  @ViewChild(CdkPortal) public contentTemplate!: CdkPortal;

  private subscription$: Subscription = new Subscription();
  private overlayRef!: OverlayRef;
  public position: 'top' | 'bottom' = 'bottom';
  public isVisible = false;
  public isClosed = true;

  constructor(
    private overlayPositionBuilder: OverlayPositionBuilder,
    private overlay: Overlay,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  public ngOnInit(): void {
    if (this.disposeOnNavigation) {
      this.subscription$.add(
        this.router.events
          .pipe(filter((event) => event instanceof NavigationEnd))
          .subscribe(() => {
            if (this.isVisible) {
              this.closeAnimation();
            }
          })
      );
    }
  }

  public ngOnDestroy(): void {
    this.close();
    this.subscription$.unsubscribe();
  }

  private getOverlayConfig(): OverlayConfig {
    const left = [
      {
        // left bottom align
        originX: 'start',
        originY: 'bottom',
        overlayX: 'start',
        overlayY: 'top',
      },
      {
        // left top align
        originX: 'start',
        originY: 'top',
        overlayX: 'start',
        overlayY: 'bottom',
      },
    ] as any[];
    const right = [
      {
        // right bottom align
        originX: 'end',
        originY: 'bottom',
        overlayX: 'end',
        overlayY: 'top',
      },
      {
        // right top align
        originX: 'end',
        originY: 'top',
        overlayX: 'end',
        overlayY: 'bottom',
      },
    ] as any[];
    const positionStrategy = this.overlayPositionBuilder
      .flexibleConnectedTo(this.reference)
      .withPush(false)
      .withPositions(this.anchor === 'right' ? right : left);

    this.subscription$.add(
      positionStrategy.positionChanges
        .pipe(distinctUntilKeyChanged('connectionPair'))
        .subscribe(({ connectionPair }) => {
          this.position =
            connectionPair.originY === 'bottom' &&
            connectionPair.overlayY === 'top'
              ? 'bottom'
              : 'top';
          this.positionChanged.emit(this.position);
        })
    );

    return new OverlayConfig({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
    });
  }

  public open(): void {
    this.isVisible = true;
    this.isClosed = false;
    this.overlayRef = this.overlay.create(this.getOverlayConfig());
    this.overlayRef.attach(this.contentTemplate);
    this.overlayRef.updateSize({
      width: this.width ? this.width : this.reference.clientWidth,
    });
    this.subscription$.add(
      this.overlayRef.backdropClick().subscribe(() => this.closeAnimation())
    );
  }

  public close(): void {
    this.overlayRef?.detach();
    this.overlayRef?.dispose();
    this.isClosed = true;
  }

  public closeAnimation(): void {
    this.isVisible = false;
    this.cdr.detectChanges();
  }
}
