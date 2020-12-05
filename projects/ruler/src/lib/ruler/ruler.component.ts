import { Input, OnChanges, Component, QueryList, Renderer2, ElementRef, AfterContentInit, ViewEncapsulation, ContentChildren } from '@angular/core';

@Component({
    selector: 'ruler',
    styleUrls: ['./ruler.component.scss'],
    templateUrl: './ruler.component.html',
    encapsulation: ViewEncapsulation.None
})

export class RulerComponent implements OnChanges, AfterContentInit {

    @Input('width') public width: number = 0;
    @Input('height') public height: number = 0;

    constructor() {};

    ngOnChanges(): void { };

    ngAfterContentInit(): void { };

}