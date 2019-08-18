import GraphicsBuffer from "./GameGraphicsBuffer";

export default class Sprite {
    private _sfn: string;
    private _sfni: number;
    private _fn: string;
    private _fc: number;
    private _ic: number;
    private _im: number;
    private _imgRef: CanvasImageSource;
    public _name?: string;
    public _bufferReference?: string;
    public _ctx?: CanvasRenderingContext2D;
    public _frames?: object;
    private _graphicsBuffer: GraphicsBuffer;
    public x?: number;
    public y?: number;
    public w?: number;
    public h?: number;

    public sx?: number;
    public sy?: number;
    public sw?: number;
    public sh?: number;

    public bsx?: number;
    public bsy?: number;
    public bsw?: number;
    public bsh?: number;

    public loop?: boolean;
    constructor(
        graphicsBuffer: GraphicsBuffer,
        name?: string,
        gbuffer?: string,
        frames?: object,
        ctx?: CanvasRenderingContext2D,
        x?: number,
        y?: number,
        w?: number,
        h?: number,
        sx?: number,
        sy?: number,
        sw?: number,
        sh?: number) {
        if (name !== null) {
            this._name = name;
        }
        this._graphicsBuffer = graphicsBuffer;
        this._bufferReference = gbuffer;
        this._ctx = ctx;
        this._frames = frames;
        this._sfn = '';
        this._sfni = 0;
        this._fn = '';
        this._fc = 0;
        this._ic = 1;
        this._im = 2;
        this.loop = false;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.sx = sx;
        this.sy = sy;
        this.sw = sw;
        this.sh = sh;
        this.bsx = sx;
        this.bsy = sy;
        this.bsw = sw;
        this.bsh = sh;
        // @ts-ignore
        this._imgRef = null;
    }

    name() {
        return this._name;
    }

    setIntervalCount(count: number) {
        this._im = count;
    }

    startAnimation(name: string, loop: boolean) {
        this._fn = name;
        this.loop = loop;
    }

    setFrame(name: string, i: number) {
        this._sfn = name;
        this._sfni = i;
    }

    setCtx(ctx: CanvasRenderingContext2D) {
        this._ctx = ctx;
    }

    setDimensions(
        x: number,
        y: number,
        w: number,
        h: number,
        sx: number,
        sy: number,
        sw: number,
        sh: number) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.sx = sx;
        this.sy = sy;
        this.sw = sw;
        this.sh = sh;
    }

    resetImgRef() {
        // @ts-ignore
        this._imgRef = null;
    }

    render(action?: Function) {
        if (
            typeof this._ctx !== "undefined" &&
            typeof this.x !== "undefined" &&
            typeof this.y !== "undefined" &&
            typeof this.w !== "undefined" &&
            typeof this.h !== "undefined" &&
            typeof this.sx !== "undefined" &&
            typeof this.sy !== "undefined" &&
            typeof this.sw !== "undefined" &&
            typeof this.sh !== "undefined" &&
            this._ctx !== null &&
            this.x !== null &&
            this.y !== null &&
            this.w !== null &&
            this.h !== null &&
            this.sx !== null &&
            this.sy !== null &&
            this.sw !== null &&
            this.sh !== null
        ) {
            // Call the javascript action to do on render.
            if (typeof action !== "undefined") {
                action().apply(this);
            }
            // Determain what frame to render from a frame animation definition.
            let currentFrame = {
                x: this.x,
                y: this.y,
                w: this.w,
                h: this.h,
                sx: this.sx,
                sy: this.sy,
                sw: this.sw,
                sh: this.sh
            }
            // Clearing animation space
            this._ctx.clearRect(this.x, this.y, this.w, this.h);
            this._ctx.beginPath();

            // Always reset to the backup.
            this.sx = this.bsx;
            this.sy = this.bsy;
            this.sw = this.bsw;
            this.sh = this.bsh;

            // Do we have a frame sequence name from the sprite we want to render.
            if (this._sfn !== '') {
                // Set the currentFrame to render on of the frame from the frames collection.
                // @ts-ignore
                const frame = this._frames[this._sfn][this._sfni];
                currentFrame.sx = frame.sx;
                currentFrame.sy = frame.sy;
                currentFrame.sw = frame.sw;
                currentFrame.sh = frame.sh;
                this.sx = frame.sx;
                this.sy = frame.sy;
                this.sw = frame.sw;
                this.sh = frame.sh;
            } else {

                if (this._fn !== '') {

                    // When the interval count is more then the interval max.
                    if (this._ic > this._im) {
                        this._ic = 0;

                        // When the frame count is more then the frames from a frame sequence.
                        // @ts-ignore
                        if (this._fc > (this._frames[this._fn].length - 1)) {
                            if (this.loop) {
                                this._fc = 0;
                            } else {
                                // @ts-ignore
                                this._fc = (this._frames[this._fn].length - 1);
                            }
                        } else {
                            // Set the currentFrame to render on of the frame from the frames collection.
                            // @ts-ignore
                            const frame = this._frames[this._fn][this._fc];
                            currentFrame.sx = frame.sx;
                            currentFrame.sy = frame.sy;
                            currentFrame.sw = frame.sw;
                            currentFrame.sh = frame.sh;
                            this.sx = frame.sx;
                            this.sy = frame.sy;
                            this.sw = frame.sw;
                            this.sh = frame.sh;
                        }

                        // The frame counter will be +1.
                        this._fc += 1;
                    } else {
                        this._ic += 1;
                    }

                }
            }
            // Start to render the sprite on the mode layer.
            if (this._imgRef === null && typeof this._graphicsBuffer !== "undefined" && this._graphicsBuffer !== null) {
                const buffer = this._graphicsBuffer.getBuffer();
                for (var i in buffer) {
                    if (buffer[i].name === this._bufferReference) {
                        this._imgRef = buffer[i].img;
                        this._ctx.drawImage(buffer[i].img, currentFrame.sx, currentFrame.sy, currentFrame.sw, currentFrame.sh, currentFrame.x, currentFrame.y, currentFrame.w, currentFrame.h);
                    }
                }
            } else {
                this._ctx.drawImage(this._imgRef, currentFrame.sx, currentFrame.sy, currentFrame.sw, currentFrame.sh, currentFrame.x, currentFrame.y, currentFrame.w, currentFrame.h);
            }
        }

    }
}