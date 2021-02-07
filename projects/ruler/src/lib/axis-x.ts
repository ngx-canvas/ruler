import { Tick } from './tick';

export class AxisX {

    public ticks: Tick[] = [];
    public width = 0;
    public height = 15;
    public margin = 0;
    public canvas: HTMLCanvasElement;
    public context: CanvasRenderingContext2D;
    public maximum = 0;

    constructor(maximum: number, margin: number, canvasId: string) {
        this.width = (Math.ceil(maximum / 1000) * 1000) + (margin * 2);

        const smallsteps = this.width / 10;
        for (let i = 0; i < smallsteps; i++) {
            const small = new Tick({
                x: (i * 10) - 0.5,
                y: 10,
                w: 1,
                h: 5,
                type: 'small'
            });
            this.ticks.push(small);
        }

        const mediumsteps = this.width / 50;
        for (let i = 0; i < mediumsteps; i++) {
            const medium = new Tick({
                x: (i * 50) - 0.5,
                y: 5,
                w: 1,
                h: 10,
                type: 'medium'
            });
            this.ticks.push(medium);
        }

        const largesteps = this.width / 100;
        for (let i = 0; i < largesteps; i++) {
            const large = new Tick({
                x: (i * 100) - 0.5,
                y: 0,
                w: 1,
                h: 15,
                type: 'large'
            });
            this.ticks.push(large);
        }

        this.canvas = (document.getElementById(canvasId) as HTMLCanvasElement);
        this.context = this.canvas.getContext('2d');
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }

    public draw(color?, background?) {
        this.context.clearRect(0, 0, this.width, this.height);

        this.context.beginPath();
        this.context.fillStyle = background || '#FFFFFF';
        this.context.fillRect(0, 0, this.width, this.height);
        this.context.closePath();

        this.context.beginPath();
        this.context.strokeStyle = color || '#BDBDBD';
        this.context.moveTo(0, 14.5);
        this.context.lineTo(this.width - 1, 14.5);
        this.context.stroke();
        this.context.closePath();

        this.ticks.map(tick => {
            this.context.beginPath();
            this.context.strokeStyle = color || '#BDBDBD';
            this.context.moveTo(tick.x, tick.y);
            this.context.lineTo(tick.x, (tick.y + tick.h));
            this.context.stroke();
            this.context.closePath();
            if (tick.type == 'large' && (tick.x + 0.5) != 0) {
                this.context.beginPath();
                this.context.font = '9px Arial';
                this.context.fillStyle = color || '#BDBDBD';
                this.context.fillText(JSON.stringify(tick.x + 0.5 - 100), tick.x + 5, 8);
                this.context.closePath();
            }
        });
    }

}
