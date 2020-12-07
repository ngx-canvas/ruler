import { RulerContentComponent } from '../content/content.component';
import { Input, OnChanges, Component, ViewChild, ElementRef, AfterContentInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'ruler',
    styleUrls: ['./ruler.component.scss'],
    templateUrl: './ruler.component.html',
    encapsulation: ViewEncapsulation.None
})

export class RulerComponent implements OnChanges, AfterContentInit {

    @Input('width') public width: number = 0;
    @Input('height') public height: number = 0;

    @ViewChild(RulerContentComponent, {'static': true}) private content: RulerContentComponent;

    constructor(private el: ElementRef) {
        this.element = this.el.nativeElement;
    };

    public element: HTMLElement;

    public reset() {
        this.content.reset();
    };

    ngOnChanges(): void { };

    ngAfterContentInit(): void { };

}