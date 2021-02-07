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

    @Input('width') private width: number = 0;
    @Input('height') private height: number = 0;

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

    private process() {
        this.width = 0;
        this.height = 0;
        if (this.width < this.el.nativeElement.clientWidth) {
            this.width = this.el.nativeElement.clientWidth;
        };
        if (this.height < this.el.nativeElement.clientHeight) {
            this.height = this.el.nativeElement.clientHeight;
        };
        const content = document.getElementById('ruler-content');
        if (this.width < content.scrollWidth) {
            this.width = content.scrollWidth;
        };
        if (this.height < content.scrollHeight) {
            this.height = content.scrollHeight;
        };

        /* --- MARGIN NOT DYNAMIC YET --- */
        this.margin = 100;
        /* --- MARGIN NOT DYNAMIC YET --- */
        const axisx = new AxisX(this.width, this.margin, 'x-axis');
        axisx.draw(this.color, this.axisbackground);

        const axisy = new AxisY(this.height, this.margin, 'y-axis');
        axisy.draw(this.color, this.axisbackground);

        this.renderer.setStyle(content, 'padding', this.margin + 'px');
        this.renderer.setStyle(content, 'background-color', this.background);
        this.renderer.setStyle(this.el.nativeElement, 'background-color', this.background);
    };

    ngOnChanges(): void {
        this.process();
    }

    ngAfterViewInit(): void {
        let width = 0;
        let height = 0;
        let content: HTMLElement = document.getElementById('ruler-content');
        setInterval(() => {
            if (content.scrollWidth != width || content.scrollHeight != height) {
                width = content.scrollWidth;
                height = content.scrollHeight;
                this.process();
            };
        }, 1000);

        this.renderer.listen(document.getElementById('ruler-content'), 'scroll', (event) => {
            this.renderer.setStyle(document.getElementById('x-axis'), 'margin-left', ['-', event.currentTarget.scrollLeft, 'px'].join(''));
            this.renderer.setStyle(document.getElementById('y-axis'), 'margin-top', ['-', event.currentTarget.scrollTop, 'px'].join(''));
        });
    }

}
