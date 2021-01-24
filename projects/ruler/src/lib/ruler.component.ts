import { Input, OnInit, OnChanges, Component, Renderer2, ElementRef, AfterViewInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'ruler',
    styleUrls: ['./ruler.component.scss'],
    templateUrl: './ruler.component.html',
    encapsulation: ViewEncapsulation.None
})

export class RulerComponent implements OnInit, OnChanges, AfterViewInit {

    @Input('width') public width: number = 0;
    @Input('margin') public margin: number = 0;
    @Input('height') public height: number = 0;

    constructor(private el: ElementRef, private renderer: Renderer2) {
        this.element = this.el.nativeElement;
    };

    public AxisX: HTMLCanvasElement;
    public AxisY: HTMLCanvasElement;
    public element: HTMLElement;
    public ContextX: CanvasRenderingContext2D;
    public ContextY: CanvasRenderingContext2D;
    public RulerContent: HTMLElement;

    public reset() { };
    
    public scroll() { };

    public process(type) {
        if (type == 'x') {
            this.AxisX.width = 10000;
            this.AxisX.height = 15;
            this.ContextX.clearRect(0, 0, this.AxisX.width, this.AxisX.height);
            this.ContextX.beginPath();
            this.ContextX.strokeStyle = '#BDBDBD';
            this.ContextX.moveTo(0, 14.5);
            this.ContextX.lineTo(this.AxisX.width - 1, 14.5);
            this.ContextX.stroke();
            this.ContextX.closePath();

            let smallTickX = 0;
            let smallTickY = 0;
            for (let i = 0; i < 100000; i++) {
                smallTickX += 10;
                smallTickY += 10;
                this.ContextX.beginPath();
                this.ContextX.strokeStyle = '#BDBDBD';
                this.ContextX.moveTo(smallTickX - 0.5, 10);
                this.ContextX.lineTo(smallTickY - 0.5, 15);
                this.ContextX.stroke();
                this.ContextX.closePath();
            };

            let mediumTickX = 0;
            let mediumTickY = 0;
            for (let i = 0; i < 100000; i++) {
                mediumTickX += 50;
                mediumTickY += 50;
                this.ContextX.beginPath();
                this.ContextX.strokeStyle = '#BDBDBD';
                this.ContextX.moveTo(mediumTickX - 0.5, 5);
                this.ContextX.lineTo(mediumTickY - 0.5, 15);
                this.ContextX.stroke();
                this.ContextX.closePath();
            };

            let largeTickX = 0;
            let largeTickY = 0;
            for (let i = 0; i < 100000; i++) {
                largeTickX += 100;
                largeTickY += 100;
                this.ContextX.beginPath();
                this.ContextX.strokeStyle = '#BDBDBD';
                this.ContextX.moveTo(largeTickX - 0.5, 0);
                this.ContextX.lineTo(largeTickY - 0.5, 15);
                this.ContextX.stroke();
                this.ContextX.closePath();

                this.ContextX.beginPath();
                this.ContextX.font = "9px Arial";
                this.ContextX.fillText(JSON.stringify(largeTickX - 100), largeTickX + 5, 8);
                this.ContextX.closePath();
            };
        } else if (type == 'y') {
            this.AxisY.width = 15;
            this.AxisY.height = 10000;
            this.ContextY.beginPath();
            this.ContextY.strokeStyle = '#BDBDBD';
            this.ContextY.moveTo(14.5, 0);
            this.ContextY.lineTo(14.5, this.AxisY.height - 1);
            this.ContextY.stroke();
            this.ContextY.closePath();

            let smallTickX = 0;
            let smallTickY = 0;
            for (let i = 0; i < 100000; i++) {
                smallTickX += 10;
                smallTickY += 10;
                this.ContextY.beginPath();
                this.ContextY.strokeStyle = '#BDBDBD';
                this.ContextY.moveTo(10, smallTickX - 0.5);
                this.ContextY.lineTo(15, smallTickY - 0.5);
                this.ContextY.stroke();
                this.ContextY.closePath();
            };

            let mediumTickX = 0;
            let mediumTickY = 0;
            for (let i = 0; i < 100000; i++) {
                mediumTickX += 50;
                mediumTickY += 50;
                this.ContextY.beginPath();
                this.ContextY.strokeStyle = '#BDBDBD';
                this.ContextY.moveTo(5, mediumTickX - 0.5);
                this.ContextY.lineTo(15, mediumTickY - 0.5);
                this.ContextY.stroke();
                this.ContextY.closePath();
            };

            let largeTickX = 0;
            let largeTickY = 0;

            for (let i = 0; i < 100000; i++) {
                largeTickX += 100;
                largeTickY += 100;
                this.ContextY.beginPath();
                this.ContextY.strokeStyle = '#BDBDBD';
                this.ContextY.moveTo(0, largeTickX - 0.5);
                this.ContextY.lineTo(15, largeTickY - 0.5);
                this.ContextY.stroke();
                this.ContextY.closePath();

                let value = JSON.stringify(largeTickX - 100);
                let splitv = value.split('');
                for (let a = 0; a < splitv.length; a++) {
                    this.ContextY.beginPath();
                    this.ContextY.font = "9px Arial";
                    this.ContextY.fillText(splitv[a], 2, largeTickX + 8 + (a * 8));
                    this.ContextY.closePath();
                };
            };
        };
    };

    ngOnInit(): void {
        this.AxisX = <HTMLCanvasElement>document.getElementById('x-axis');
        this.AxisY = <HTMLCanvasElement>document.getElementById('y-axis');
        
        this.ContextX = <CanvasRenderingContext2D>this.AxisX.getContext('2d');
        this.ContextY = <CanvasRenderingContext2D>this.AxisY.getContext('2d');

        this.RulerContent = <HTMLElement>document.getElementById('ruler-content');
        
        this.renderer.listen(this.RulerContent, 'scroll', (event) => {
            this.renderer.setStyle(this.AxisX, 'margin-left', ['-', event.currentTarget.scrollLeft, 'px'].join(''));
            this.renderer.setStyle(this.AxisY, 'margin-top', ['-', event.currentTarget.scrollTop, 'px'].join(''));
        });
    };

    ngOnChanges(): void {
        if (this.AxisX) {
            this.AxisX.width = this.element.offsetWidth;
            this.AxisX.height = this.element.offsetHeight;
            this.process('x');
        };
        if (this.AxisY) {
            this.AxisY.width = this.element.offsetWidth;
            this.AxisY.height = this.element.offsetHeight;
            this.process('y');
        };
        if (this.RulerContent) {
            this.renderer.setStyle(this.RulerContent, 'padding', this.margin + 'px');
        };
    };

    ngAfterViewInit(): void {
        if (this.width != 0) {
            this.renderer.setStyle(this.element, 'width', this.width + 'px');
        } else {
            this.renderer.setStyle(this.element, 'width', this.element.getBoundingClientRect().width + 'px');
        };
        if (this.width != 0) {
            this.renderer.setStyle(this.element, 'height', this.height + 'px');
        } else {
            this.renderer.setStyle(this.element, 'height', this.element.getBoundingClientRect().height + 'px');
        };
        if (this.AxisX) {
            this.AxisX.width = this.element.offsetWidth;
            this.AxisX.height = this.element.offsetHeight;
            this.process('x');
        };
        if (this.AxisY) {
            this.AxisY.width = this.element.offsetWidth;
            this.AxisY.height = this.element.offsetHeight;
            this.process('y');
        };
        if (this.RulerContent) {
            this.renderer.setStyle(this.RulerContent, 'padding', this.margin + 'px');
        };
        this.process('x');
        this.process('y');
    };

}