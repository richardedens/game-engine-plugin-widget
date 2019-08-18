import React, { createElement } from "react";
import Util from "./GameUtil";
import { Mesh, PerspectiveCamera, WebGLRenderer, Scene, PlaneGeometry, TextureLoader, MeshBasicMaterial, Color, Fog } from "three";
import { IComponent3D } from "./GameCommonInterfaces";
import Log from "./GameLog";

const util = new Util();
const log = new Log();

// Graphic 3D layer

export default class Graphic3DLayer extends React.Component {
    private _container: React.RefObject<HTMLDivElement>;
    private _keyDownCallback?: Function;
    private _keyUpCallback?: Function;
    private _renderTickCallback?: Function;

    public objects: Array<IComponent3D>;
    public backgroundColor: number;
    public backgroundImageUrl: string;
    public camera?: PerspectiveCamera;
    public renderer?: WebGLRenderer;
    public scene?: Scene;
    constructor(props: any) {
        super(props);

        // Create a reference to the canvas object rendered.
        this._container = React.createRef();

        // Attach stuff.
        this._keyDownCallback = function () { };
        this._keyUpCallback = function () { };
        this._renderTickCallback = function () { };
        this.backgroundImageUrl = "";
        this.backgroundColor = 0x009800;
        this.objects = [];
    }
    public setBackgroundImage(img: string) {
        this.backgroundImageUrl = img;
        if (typeof this.scene !== "undefined") {
            // Add a plane
            var geometry = new PlaneGeometry(1475, 1689, 150, 150);
            var texture = new TextureLoader().load(this.backgroundImageUrl);
            var material = new MeshBasicMaterial({ map: texture });
            var plane = new Mesh(geometry, material);
            this.objects.push({ name: "plane", obj: plane });
            plane.rotation.x = 4.7;
            this.scene.add(plane);
            this._renderTick();
        }
    }
    setOnKeyUp(cb: Function) {
        this._keyUpCallback = cb;
    };
    onKeyUp(e: Event) {
        if (typeof this._keyUpCallback !== "undefined" && typeof this._keyUpCallback === "function") {
            this._keyUpCallback(e, this)
        } else {
            (function () { })();
        }
    };
    setOnKeyDown(cb: Function) {
        this._keyDownCallback = cb;
    };
    onKeyDown(e: Event) {
        if (typeof this._keyDownCallback !== "undefined" && typeof this._keyUpCallback === "function") {
            this._keyDownCallback(e, this);
        } else {
            (function () { })();
        }
    };
    setInteraction(cbd: Function, cbu: Function) {
        this._keyDownCallback = cbd;
        this._keyUpCallback = cbu;
    };
    setTickCallback(cb: Function) {
        this._renderTickCallback = cb;
    };

    componentDidMount() {
        log.info("game graphic 3D layer mounted.");
        // Set the SCREEN_WIDTH and SCREEN_HEIGHT
        util.setScreenDimensions();

        // Create camera
        this.camera = new PerspectiveCamera(75, util.getScreenWidth() / util.getScreenHeight(), util.getNear(), util.getFar());
        this.camera.position.z = 250;
        this.camera.position.y = 20;

        // Setup renderer and transparent background.
        this.renderer = new WebGLRenderer({ alpha: true });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(util.getScreenWidth(), util.getScreenHeight());
        this.renderer.setClearColor(0x000000, 0);

        if (typeof this._container !== "undefined" && this._container !== null && typeof this._container.current !== "undefined" && this._container.current !== null) {
            this._container.current.appendChild(this.renderer.domElement);
        }

        // Create scene
        this.scene = new Scene();
        this.scene.background = new Color(this.backgroundColor);
        this.scene.fog = new Fog(this.backgroundColor, util.getNear(), util.getFar());

        // Resize the renderer to fix it.
        const self = this;
        const onWindowResize = function () {
            // Set the SCREEN_WIDTH and SCREEN_HEIGHT
            util.setScreenDimensions();
            (typeof self.camera !== "undefined") ? (self.camera.aspect = util.getScreenWidth() / util.getScreenHeight()) : (() => { })();
            (typeof self.camera !== "undefined") ? self.camera.updateProjectionMatrix() : (() => { })();
            (typeof self.renderer !== "undefined") ? self.renderer.setSize(util.getScreenWidth(), util.getScreenHeight()) : (() => { })();
        };
        window.addEventListener('resize', onWindowResize, false);
    };

    _renderTick() {
        (typeof this._renderTickCallback !== "undefined") ? this._renderTickCallback(this) : (() => { })();
        (typeof this.renderer !== "undefined") ? this.renderer.clear() : (() => { })();
        (typeof this.renderer !== "undefined" && typeof this.scene !== "undefined" && typeof this.camera !== "undefined") ? this.renderer.render(this.scene, this.camera) : (() => { })();
    };
    tick() {
        this._renderTick();
    };
    render() {
        return (<div ref={this._container} className="game-graphic-3d-layer"></div>);
    }
}