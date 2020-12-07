import { RulerService } from '../ruler.service';
import { Component, ElementRef, ViewEncapsulation, AfterContentInit } from '@angular/core';

@Component({
    selector: 'ruler-content',
    styleUrls: ['./content.component.scss'],
    templateUrl: './content.component.html',
    encapsulation: ViewEncapsulation.None
})

export class RulerContentComponent implements AfterContentInit {
    
    constructor(private el: ElementRef, private service: RulerService) {
        this.element = this.el.nativeElement;
    };

    public element: HTMLElement;

    public reset() {
        this.element.scrollTo(0, 0);
    };

    ngAfterContentInit(): void {
        this.element.addEventListener('scroll', (event: any) => {
            this.service.scroll.next({
                'x': event.currentTarget.scrollLeft,
                'y': event.currentTarget.scrollTop
            });
        });

        this.service.width.next(this.element.getBoundingClientRect().width);
        this.service.height.next(this.element.getBoundingClientRect().height);
    };

}