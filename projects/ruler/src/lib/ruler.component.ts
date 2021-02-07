import { AxisX } from './axis-x';
import { AxisY } from './axis-y';
import { Input, Component, Renderer2, OnChanges, ElementRef, AfterViewInit } from '@angular/core';

@Component({
    selector: 'ruler',
    styleUrls: ['./ruler.component.scss'],
    templateUrl: './ruler.component.html'
})

export class RulerComponent implements OnChanges, AfterViewInit {

    @Input('color') public color = '#BDBDBD';
    @Input('margin') public margin = 100;
    @Input('background') public background = '#FAFAFA';
    @Input('axis-background') public axisbackground = '#FFFFFF';

    constructor(private el: ElementRef, private renderer: Renderer2) {
        this.renderer.setStyle(this.el.nativeElement, 'width', '100%');
        this.renderer.setStyle(this.el.nativeElement, 'height', '100%');
        this.renderer.setStyle(this.el.nativeElement, 'display', 'block');
        this.renderer.setStyle(this.el.nativeElement, 'overflow', 'hidden');
        this.renderer.setStyle(this.el.nativeElement, 'position', 'relative');
        this.renderer.setStyle(this.el.nativeElement, 'background-color', '#FAFAFA');
    }

    public reset() {
        const content = document.getElementById('ruler-content');
        content.scrollTo(0, 0);
    }

    ngOnChanges(): void {
        let width = 0;
        let height = 0;
        if (width < this.el.nativeElement.clientWidth) {
            width = this.el.nativeElement.clientWidth;
        };
        if (height < this.el.nativeElement.clientHeight) {
            height = this.el.nativeElement.clientHeight;
        };
        const content = document.getElementById('ruler-content');
        if (width < content.scrollWidth) {
            width = content.scrollWidth;
        };
        if (height < content.scrollHeight) {
            height = content.scrollHeight;
        };

        /* --- MARGIN NOT DYNAMIC YET --- */
        this.margin = 100;
        /* --- MARGIN NOT DYNAMIC YET --- */
        const axisx = new AxisX(width, this.margin, 'x-axis');
        axisx.draw(this.color, this.axisbackground);

        const axisy = new AxisY(height, this.margin, 'y-axis');
        axisy.draw(this.color, this.axisbackground);

        this.renderer.setStyle(content, 'padding', this.margin + 'px');
        this.renderer.setStyle(content, 'background-color', this.background);
        this.renderer.setStyle(this.el.nativeElement, 'background-color', this.background);
    }

    ngAfterViewInit(): void {
        this.renderer.listen(document.getElementById('ruler-content'), 'scroll', (event) => {
            this.renderer.setStyle(document.getElementById('x-axis'), 'margin-left', ['-', event.currentTarget.scrollLeft, 'px'].join(''));
            this.renderer.setStyle(document.getElementById('y-axis'), 'margin-top', ['-', event.currentTarget.scrollTop, 'px'].join(''));
        });
    }

}
