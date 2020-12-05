import { Input, OnChanges, Component, ElementRef, Renderer2, ViewEncapsulation, AfterViewInit } from '@angular/core';

@Component({
    selector: 'ruler-axis',
    styleUrls: ['./axis.component.scss'],
    templateUrl: './axis.component.html',
    encapsulation: ViewEncapsulation.None
})

export class RulerAxisComponent implements OnChanges, AfterViewInit {

    @Input('type') public type: string;

    constructor(private el: ElementRef, private renderer: Renderer2) {
        this.element = this.el.nativeElement;
    };

    private canvas: HTMLCanvasElement;
    private element: HTMLElement;
    private context: CanvasRenderingContext2D;

    ngOnChanges(): void {
        if (this.type == 'x') {
            this.renderer.setStyle(this.element, 'top', '0px');
            this.renderer.setStyle(this.element, 'left', '15px');
            this.renderer.setStyle(this.element, 'right', '0px');
            this.renderer.setStyle(this.element, 'height', '15px');
        } else if (this.type == 'y') {
            this.renderer.setStyle(this.element, 'top', '15px');
            this.renderer.setStyle(this.element, 'left', '0px');
            this.renderer.setStyle(this.element, 'width', '15px');
            this.renderer.setStyle(this.element, 'bottom', '0px');
        };
    };

    ngAfterViewInit(): void {
        this.canvas = <HTMLCanvasElement>document.getElementById('axis-' + this.type);
        this.context = <CanvasRenderingContext2D>this.canvas.getContext('2d');
        this.canvas.width = this.element.offsetWidth;
        this.canvas.height = this.element.offsetHeight;
    };

}