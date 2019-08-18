import React, { createElement } from "react";
import GraphicsBuffer from "./GameGraphicsBuffer";
import GraphicLayer from "./GameGraphicLayer";
import Graphic3DLayer from "./GameGraphic3DLayer";
import Util from "./GameUtil";
import Log from "./GameLog";
import io from "socket.io-client";

//
// Register to webmsg.nl to send game messages
//
const socket = io('https://webmsg.nl/');
socket.on('game', function (msg: string) {
    console.log("Received: " + msg);
});

const log = new Log();

const util = new Util();

const graphicsBuffer = new GraphicsBuffer();

export default class GameCore extends React.Component {
    private _isInitialized: Boolean;
    private _isGameLoopStarted: Boolean;
    private container: React.RefObject<HTMLDivElement>;

    public graphicsBuffer: GraphicsBuffer;
    public mode1: React.RefObject<GraphicLayer>;
    public mode2: React.RefObject<GraphicLayer>;
    public mode3: React.RefObject<GraphicLayer>;
    public mode4: React.RefObject<GraphicLayer>;
    public mode5: React.RefObject<GraphicLayer>;
    public mode6: React.RefObject<GraphicLayer>;
    public mode7: React.RefObject<Graphic3DLayer>;
    public util: Util;

    constructor(props: any) {
        super(props);

        // Attach the util to the core so we can use it in the to execute script.
        this.util = util;
        
        // Set the screen dimensions
        util.setScreenDimensions();

        // We are creating a reference to our GameEngine.
        this.container = React.createRef();

        // Other variables.
        this._isInitialized = false;
        this._isGameLoopStarted = false;

        // Graphics buffer
        this.graphicsBuffer = graphicsBuffer;
        
        // Graphic layers
        this.mode1 = React.createRef();
        this.mode2 = React.createRef();
        this.mode3 = React.createRef();
        this.mode4 = React.createRef();
        this.mode5 = React.createRef();
        this.mode6 = React.createRef();
        this.mode7 = React.createRef();
    };

    componentDidMount(){
        log.info("game core mounted.");

        if (typeof this.mode1 !== "undefined" && this.mode1 !== null && typeof this.mode1.current !== "undefined" && this.mode1.current !== null) {
            this.mode1.current.setGraphicsBuffer(graphicsBuffer);
        }
        if (typeof this.mode2 !== "undefined" && this.mode2 !== null && typeof this.mode2.current !== "undefined" && this.mode2.current !== null) {
            this.mode2.current.setGraphicsBuffer(graphicsBuffer);
        }
        if (typeof this.mode3 !== "undefined" && this.mode3 !== null && typeof this.mode3.current !== "undefined" && this.mode3.current !== null) {
            this.mode3.current.setGraphicsBuffer(graphicsBuffer);
        }
        if (typeof this.mode4 !== "undefined" && this.mode4 !== null && typeof this.mode4.current !== "undefined" && this.mode4.current !== null) {
            this.mode4.current.setGraphicsBuffer(graphicsBuffer);
        }
        if (typeof this.mode5 !== "undefined" && this.mode5 !== null && typeof this.mode5.current !== "undefined" && this.mode5.current !== null) {
            this.mode5.current.setGraphicsBuffer(graphicsBuffer);
        }
        if (typeof this.mode6 !== "undefined" && this.mode6 !== null && typeof this.mode6.current !== "undefined" && this.mode6.current !== null) {
            this.mode6.current.setGraphicsBuffer(graphicsBuffer);
        }
    }

    _keyDown(e: Event) {
        if (typeof this.mode1 !== "undefined" && this.mode1 !== null && typeof this.mode1.current !== "undefined" && this.mode1.current !== null) {
            this.mode1.current.onKeyDown(e);
        }
        if (typeof this.mode2 !== "undefined" && this.mode2 !== null && typeof this.mode2.current !== "undefined" && this.mode2.current !== null) {
            this.mode2.current.onKeyDown(e);
        }
        if (typeof this.mode3 !== "undefined" && this.mode3 !== null && typeof this.mode3.current !== "undefined" && this.mode3.current !== null) {
            this.mode3.current.onKeyDown(e);
        }
        if (typeof this.mode4 !== "undefined" && this.mode4 !== null && typeof this.mode4.current !== "undefined" && this.mode4.current !== null) {
            this.mode4.current.onKeyDown(e);
        }
        if (typeof this.mode5 !== "undefined" && this.mode5 !== null && typeof this.mode5.current !== "undefined" && this.mode5.current !== null) {
            this.mode5.current.onKeyDown(e);
        }
        if (typeof this.mode6 !== "undefined" && this.mode6 !== null && typeof this.mode6.current !== "undefined" && this.mode6.current !== null) {
            this.mode6.current.onKeyDown(e);
        }
        if (typeof this.mode7 !== "undefined" && this.mode7 !== null && typeof this.mode7.current !== "undefined" && this.mode7.current !== null) {
            this.mode7.current.onKeyDown(e);
        }
    };
    _keyUp(e: Event) {
        if (typeof this.mode1 !== "undefined" && this.mode1 !== null && typeof this.mode1.current !== "undefined" && this.mode1.current !== null) {
            this.mode1.current.onKeyUp(e);
        }
        if (typeof this.mode2 !== "undefined" && this.mode2 !== null && typeof this.mode2.current !== "undefined" && this.mode2.current !== null) {
            this.mode2.current.onKeyUp(e);
        }
        if (typeof this.mode3 !== "undefined" && this.mode3 !== null && typeof this.mode3.current !== "undefined" && this.mode3.current !== null) {
            this.mode3.current.onKeyUp(e);
        }
        if (typeof this.mode4 !== "undefined" && this.mode4 !== null && typeof this.mode4.current !== "undefined" && this.mode4.current !== null) {
            this.mode4.current.onKeyUp(e);
        }
        if (typeof this.mode5 !== "undefined" && this.mode5 !== null && typeof this.mode5.current !== "undefined" && this.mode5.current !== null) {
            this.mode5.current.onKeyUp(e);
        }
        if (typeof this.mode6 !== "undefined" && this.mode6 !== null && typeof this.mode6.current !== "undefined" && this.mode6.current !== null) {
            this.mode6.current.onKeyUp(e);
        }
        if (typeof this.mode7 !== "undefined" && this.mode7 !== null && typeof this.mode7.current !== "undefined" && this.mode7.current !== null) {
            this.mode7.current.onKeyUp(e);
        }
    };
    render() {
        return (<div ref={this.container}>
            <Graphic3DLayer ref={this.mode7} />
            <GraphicLayer ref={this.mode6} /> 
            <GraphicLayer ref={this.mode5} /> 
            <GraphicLayer ref={this.mode4} /> 
            <GraphicLayer ref={this.mode3} /> 
            <GraphicLayer ref={this.mode2} /> 
            <GraphicLayer ref={this.mode1} /> 
        </div>);
    };
    startGameLoop() {
        if (!this._isGameLoopStarted) {
            this._isGameLoopStarted = true;
            // Start the graphic render mode
            const self = this;
            const animate = function () {
                window.requestAnimationFrame(animate);

                if (typeof self.mode1 !== "undefined" && self.mode1 !== null && typeof self.mode1.current !== "undefined" && self.mode1.current !== null) {
                    self.mode1.current.tick();
                }
                if (typeof self.mode2 !== "undefined" && self.mode2 !== null && typeof self.mode2.current !== "undefined" && self.mode2.current !== null) {
                    self.mode2.current.tick();
                }
                if (typeof self.mode3 !== "undefined" && self.mode3 !== null && typeof self.mode3.current !== "undefined" && self.mode3.current !== null) {
                    self.mode3.current.tick();
                }
                if (typeof self.mode4 !== "undefined" && self.mode4 !== null && typeof self.mode4.current !== "undefined" && self.mode4.current !== null) {
                    self.mode4.current.tick();
                }
                if (typeof self.mode5 !== "undefined" && self.mode5 !== null && typeof self.mode5.current !== "undefined" && self.mode5.current !== null) {
                    self.mode5.current.tick();
                }
                if (typeof self.mode6 !== "undefined" && self.mode6 !== null && typeof self.mode6.current !== "undefined" && self.mode6.current !== null) {
                    self.mode6.current.tick();
                }
                if (typeof self.mode7 !== "undefined" && self.mode7 !== null && typeof self.mode7.current !== "undefined" && self.mode7.current !== null) {
                    self.mode7.current.tick();
                }
            };
            animate();
        }
        log.info("Game loop started - " + (this._isGameLoopStarted) ? "true" : "false");
    };
    hasBeenInitialized() {
        log.info("Has been initialize? - " + (this._isInitialized) ? "true" : "false");
        return this._isInitialized;
    };
    hasGameLoopStarted() {
        log.info("Has game loop started? - " + (this._isGameLoopStarted) ? "true" : "false");
        return this._isGameLoopStarted;
    };
    init() {
        if (!this._isInitialized) {
            this._isInitialized = true;

            // Attaching ourselves to keyDown event handler from the window.
            const self = this;
            const onKeyDown = function (e: Event) {
                self._keyDown(e);
            }
            window.addEventListener('keydown', onKeyDown, false);

            // Attaching ourselves to the keyUp event handler from the window.
            const onKeyUp = function (e: Event) {
                self._keyUp(e);
            }
            window.addEventListener('keyup', onKeyUp, false);

            log.info("Initialized game engine");
        }
    }
}