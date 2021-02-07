import { Tick } from './tick';

export class AxisY {

    public ticks: Tick[] = [];
    public width = 15;
    public height = 0;
    public margin = 0;
    public canvas: HTMLCanvasElement;
    public context: CanvasRenderingContext2D;
    public maximum = 0;

    constructor(maximum: number, margin: number, canvasId: string) {
        this.height = (Math.ceil(maximum / 1000) * 1000) + (margin * 2);

        const smallsteps = this.height / 10;
        for (let i = 0; i < smallsteps; i++) {
            const small = new Tick({
                x: 10,
                y: (i * 10) - 0.5,
                w: 5,
                h: 1,
                type: 'small'
            });
            this.ticks.push(small);
        }

        const mediumsteps = this.height / 50;
        for (let i = 0; i < mediumsteps; i++) {
            const medium = new Tick({
                x: 5,
                y: (i * 50) - 0.5,
                w: 10,
                h: 1,
                type: 'medium'
            });
            this.ticks.push(medium);
        }

        const largesteps = this.height / 100;
        for (let i = 0; i < largesteps; i++) {
            const large = new Tick({
                x: 0,
                y: (i * 100) - 0.5,
                w: 15,
                h: 1,
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
        this.context.moveTo(14.5, 0);
        this.context.lineTo(14.5, this.height - 1);
        this.context.stroke();
        this.context.closePath();

        this.ticks.map(tick => {
            this.context.beginPath();
            this.context.strokeStyle = color || '#BDBDBD';
            this.context.moveTo(tick.x, tick.y);
            this.context.lineTo((tick.x + tick.w), tick.y);
            this.context.stroke();
            this.context.closePath();
            if (tick.type == 'large' && (tick.y + 0.5) != 0) {
                const value = JSON.stringify(tick.y + 0.5 - 100);
                const splitv = value.split('');
                for (let a = 0; a < splitv.length; a++) {
                    this.context.beginPath();
                    this.context.font = '9px Arial';
                    this.context.fillStyle = color || '#BDBDBD';
                    this.context.fillText(splitv[a], 2, tick.y + 8 + (a * 8));
                    this.context.closePath();
                }
            }
        });
    }

}
