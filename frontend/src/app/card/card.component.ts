import { ChangeDetectionStrategy, Component, Directive, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'anon-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'anon-card',
  }
})
export class CardComponent {

}

/**
 * Component intended to be used within the `<anon-card>` component. It adds styles for a
 * preset header section (i.e. a title, subtitle, and avatar layout).
 */
@Component({
  selector: 'anon-card-header',
  template: `
    <ng-content select="[anon-card-avatar]"></ng-content>
    <div class="anon-card-header-text">
      <ng-content
        select="anon-card-header,
      [anon-card-header]"></ng-content>
    </div>
    <ng-content></ng-content>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {'class': 'anon-card-header'}
})
export class CardHeaderComponent {}

/**
 * Content of a card, needed as it's used as a selector in the API.
 */
@Directive({
  selector: 'anon-card-content, [anon-card-content]',
  host: {'class': 'anon-card-content'}
})
export class CardContentComponent {}

/**
 * Footer of a card, needed as it's used as a selector in the API.
 */
@Directive({
  selector: 'anon-card-footer',
  host: {'class': 'anon-card-footer'}
})
export class CardFooterComponent {}
