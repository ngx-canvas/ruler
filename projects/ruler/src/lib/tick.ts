export class Tick {

    public x = 0;
    public y = 0;
    public w = 0;
    public h = 0;
    public type: string;

    constructor(args) {
        this.x = args.x;
        this.y = args.y;
        this.w = args.w;
        this.h = args.h;
        this.type = args.type;
    }

}
