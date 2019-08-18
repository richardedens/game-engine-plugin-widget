import React, { createElement } from "react";
import Sprite from "./GameSprite";
import Util from "./GameUtil";
import GraphicsBuffer from "./GameGraphicsBuffer";
import Log from "./GameLog";

const util = new Util();
const log = new Log();

// Graphic layer
export default class GraphicLayer extends React.Component {
    private _keyDownCallback?: Function;
    private _keyUpCallback?: Function;
    private _renderTickCallback?: Function;
    private canvas: React.RefObject<HTMLCanvasElement>;
    private sprites: Array<Sprite>;
    private graphicsBuffer: GraphicsBuffer;

    constructor(props: any) {
        super(props);
        this.sprites = [];
        this.canvas = React.createRef();
        this.graphicsBuffer = new GraphicsBuffer();
    };

    addSprite(
        name: string,
        gbuffer: string,
        frames: object,
        x: number,
        y: number,
        w: number,
        h: number,
        sx: number,
        sy: number,
        sw: number,
        sh: number) {
        let tempSprite = new Sprite(this.graphicsBuffer, name, gbuffer, frames, undefined, x, y, w, h, sx, sy, sw, sh);
        this.sprites.push(tempSprite);
        return tempSprite;
    };

    componentDidMount() {
        log.info("game graphic layer mounted.");
        if (typeof this.canvas !== "undefined" && this.canvas !== null && typeof this.canvas.current !== "undefined" && this.canvas.current !== null) {
            const ctx = this.canvas.current.getContext('2d');
            if (ctx !== null) {
                // Store the current transformation matrix
                ctx.clearRect(0, 0, util.getScreenWidth(), util.getScreenHeight());

                // Restore the transform
                ctx.beginPath();

                // Draw sprites.
                for (const i in this.sprites) {
                    const sprite: Sprite = this.sprites[i];
                    sprite.setCtx(ctx);
                    sprite.render();
                }
            }
        }
    }

    setGraphicsBuffer(graphicsBuffer: GraphicsBuffer) {
        this.graphicsBuffer = graphicsBuffer;
    }

    render() {

        // Set the SCREEN_WIDTH and SCREEN_HEIGHT
        util.setScreenDimensions();

        const istyle = {
            position: "fixed",
            left: "0",
            top: "0",
            width: util.getScreenWidth() + "px",
            height: util.getScreenHeight() + "px"
        } as React.CSSProperties;

        return <canvas className="game-grapic-layer" ref={this.canvas} width={util.getScreenWidth()} height={util.getScreenHeight()} style={istyle}></canvas>
    };

    setOnKeyUp(cb?: Function) {
        this._keyUpCallback = cb || function () { };
    }

    onKeyUp(e: Event) {
        (typeof this._keyUpCallback !== "undefined") ? this._keyUpCallback(e, this) : (() => { })();
    };

    setOnKeyDown(cb: Function) {
        this._keyDownCallback = cb;
    };

    onKeyDown(e: Event) {
        (typeof this._keyDownCallback !== "undefined") ? this._keyDownCallback(e, this) : (() => { })();
    };

    setInteraction(cbd: Function, cbu: Function) {
        (typeof this._keyDownCallback === "undefined") ? (this._keyDownCallback = cbd) : (() => { })();
        (typeof this._keyUpCallback === "undefined") ? (this._keyUpCallback = cbu) : (() => { })();
    };

    setTickCallback(cb: Function) {
        this._renderTickCallback = cb;
    };

    onCreate() {
        // Create new graphic layer.
        log.info("Create new graphic layer");

        if (typeof this.canvas !== "undefined" && this.canvas !== null && typeof this.canvas.current !== "undefined" && this.canvas.current !== null) {
            const ctx = this.canvas.current.getContext('2d');
            if (typeof ctx !== "undefined" && ctx !== null) {
                // Also set the proper ctx to sprite objects!
                for (const i in this.sprites) {
                    const sprite: Sprite = this.sprites[i];
                    sprite.setCtx(ctx);
                }
            }
        }

        // Resize the renderer to fix it.
        const self = this;
        var onWindowResize = function () {
            // Set the SCREEN_WIDTH and SCREEN_HEIGHT
            util.setScreenDimensions();
            if (typeof self.canvas !== "undefined" && self.canvas !== null && typeof self.canvas.current !== "undefined" && self.canvas.current !== null) {
                self.canvas.current.width = util.getScreenWidth();
                self.canvas.current.height = util.getScreenHeight();
            }
        };
        window.addEventListener('resize', onWindowResize, false);
    };

    _renderTick() {
        (typeof this._renderTickCallback !== "undefined") ? this._renderTickCallback(this) : (() => { })();
        if (typeof this.canvas !== "undefined" && this.canvas !== null && typeof this.canvas.current !== "undefined" && this.canvas.current !== null) {
            const ctx = this.canvas.current.getContext('2d');
            if (ctx !== null) {
                // Store the current transformation matrix
                ctx.clearRect(0, 0, util.getScreenWidth(), util.getScreenHeight());

                // Restore the transform
                ctx.beginPath();

                // Draw sprites.
                for (const i in this.sprites) {
                    const sprite: Sprite = this.sprites[i];
                    sprite.setCtx(ctx);
                    sprite.render();
                }
            }
        }
    };

    tick() {
        this._renderTick();
    };
}