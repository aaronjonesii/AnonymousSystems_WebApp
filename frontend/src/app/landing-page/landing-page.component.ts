import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'anon-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements AfterViewInit, OnDestroy {
  unsub$ = new Subject<void>();
  currentScreenSize!: string;
  // Create a map to display breakpoint names for demonstration purposes.
  displayNameMap = new Map([
    [Breakpoints.XSmall, 'xsm'],
    [Breakpoints.Small, 'sm'],
    [Breakpoints.Medium, 'md'],
    [Breakpoints.Large, 'lg'],
    [Breakpoints.XLarge, 'xlg'],
  ]);
  webDevSteps = [
    { number: 1, title: 'Site layout', content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'},
    { number: 2, title: 'Design', content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'},
    { number: 3, title: 'Layout', content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'},
  ];
  isGradientVisible = false;
  gradientTop!: number;
  gradientLeft!: number;
  gradientRadius!: number;

  constructor(
    breakpointObserver: BreakpointObserver,
    public el: ElementRef<HTMLElement>,
    ) {
    const layoutChanges = breakpointObserver.observe([
      '(orientation: portrait)',
      '(orientation: landscape)',
    ]);
    layoutChanges.subscribe(result => {});

    breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge,
    ]).pipe(takeUntil(this.unsub$)).subscribe(result => {
      for (const query of Object.keys(result.breakpoints)) {
        if (result.breakpoints[query]) {
          this.currentScreenSize = this.displayNameMap.get(query) ?? 'Unknown';
        }
      }
    });

  }

  ngAfterViewInit() {
    this.gradientRadius = this.el.nativeElement.getBoundingClientRect().width;
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.isGradientVisible = true;
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.isGradientVisible = false;
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.gradientLeft = event.pageX - this.el.nativeElement.offsetLeft;
    this.gradientTop = event.pageY - this.el.nativeElement.offsetTop;
  }

  get gradientStyle() {
    const top = this.gradientTop;
    const left = this.gradientLeft;
    const gradientRadius = this.isGradientVisible ? this.gradientRadius : 0;

    return {
      'height.px': gradientRadius,
      'width.px': gradientRadius,
      'top.px': top,
      'left.px': left
    };
  }

  ngOnDestroy() {
    this.unsub$.next();
    this.unsub$.complete();
  }

}
