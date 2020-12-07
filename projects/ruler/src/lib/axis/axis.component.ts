import { RulerService } from '../ruler.service';
import { Input, OnChanges, Component, ElementRef, Renderer2, ViewEncapsulation, AfterViewInit } from '@angular/core';

@Component({
    selector: 'ruler-axis',
    styleUrls: ['./axis.component.scss'],
    templateUrl: './axis.component.html',
    encapsulation: ViewEncapsulation.None
})

export class RulerAxisComponent implements OnChanges, AfterViewInit {

    @Input('type') public type: string;

    constructor(private el: ElementRef, private service: RulerService, private renderer: Renderer2) {
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
        
        if (this.type == 'x') {
            this.canvas.width = this.element.offsetWidth + 10000;
            this.context.beginPath();
            this.context.strokeStyle = '#BDBDBD';
            this.context.moveTo(0, 14.5);
            this.context.lineTo(this.canvas.width - 1, 14.5);
            this.context.stroke();
            this.context.closePath();

            let smallTickX = 0;
            let smallTickY = 0;
            for (let i = 0; i < 100000; i++) {
                smallTickX += 10;
                smallTickY += 10;
                this.context.beginPath();
                this.context.strokeStyle = '#BDBDBD';
                this.context.moveTo(smallTickX - 0.5, 10);
                this.context.lineTo(smallTickY - 0.5, 15);
                this.context.stroke();
                this.context.closePath();
            };

            let mediumTickX = 0;
            let mediumTickY = 0;
            for (let i = 0; i < 100000; i++) {
                mediumTickX += 50;
                mediumTickY += 50;
                this.context.beginPath();
                this.context.strokeStyle = '#BDBDBD';
                this.context.moveTo(mediumTickX - 0.5, 5);
                this.context.lineTo(mediumTickY - 0.5, 15);
                this.context.stroke();
                this.context.closePath();
            };

            let largeTickX = 0;
            let largeTickY = 0;

            for (let i = 0; i < 100000; i++) {
                largeTickX += 100;
                largeTickY += 100;
                this.context.beginPath();
                this.context.strokeStyle = '#BDBDBD';
                this.context.moveTo(largeTickX - 0.5, 0);
                this.context.lineTo(largeTickY - 0.5, 15);
                this.context.stroke();
                this.context.closePath();

                this.context.beginPath();
                this.context.font = "9px Arial";
                this.context.fillText(JSON.stringify(largeTickX - 100), largeTickX + 5, 8);
                this.context.closePath();
            };
        } else if (this.type == 'y') {
            this.canvas.height = this.element.offsetHeight + 10000;
            this.context.beginPath();
            this.context.strokeStyle = '#BDBDBD';
            this.context.moveTo(14.5, 0);
            this.context.lineTo(14.5, this.canvas.height - 1);
            this.context.stroke();
            this.context.closePath();

            let smallTickX = 0;
            let smallTickY = 0;
            for (let i = 0; i < 100000; i++) {
                smallTickX += 10;
                smallTickY += 10;
                this.context.beginPath();
                this.context.strokeStyle = '#BDBDBD';
                this.context.moveTo(10, smallTickX - 0.5);
                this.context.lineTo(15, smallTickY - 0.5);
                this.context.stroke();
                this.context.closePath();
            };

            let mediumTickX = 0;
            let mediumTickY = 0;
            for (let i = 0; i < 100000; i++) {
                mediumTickX += 50;
                mediumTickY += 50;
                this.context.beginPath();
                this.context.strokeStyle = '#BDBDBD';
                this.context.moveTo(5, mediumTickX - 0.5);
                this.context.lineTo(15, mediumTickY - 0.5);
                this.context.stroke();
                this.context.closePath();
            };

            let largeTickX = 0;
            let largeTickY = 0;

            for (let i = 0; i < 100000; i++) {
                largeTickX += 100;
                largeTickY += 100;
                this.context.beginPath();
                this.context.strokeStyle = '#BDBDBD';
                this.context.moveTo(0, largeTickX - 0.5);
                this.context.lineTo(15, largeTickY - 0.5);
                this.context.stroke();
                this.context.closePath();

                let value = JSON.stringify(largeTickX - 100);
                let splitv = value.split('');
                for (let a = 0; a < splitv.length; a++) {
                    this.context.beginPath();
                    this.context.font = "9px Arial";
                    this.context.fillText(splitv[a], 2, largeTickX + 8 + (a * 8));
                    this.context.closePath();
                };
            };
        };

        this.service.scroll.subscribe(event => {
            if (this.type == 'x') {
                this.renderer.setStyle(this.canvas, 'margin-left', ['-', event.x, 'px'].join(''));
            } else if (this.type == 'y') {
                this.renderer.setStyle(this.canvas, 'margin-top', ['-', event.y, 'px'].join(''));
            };
        });
    };

}