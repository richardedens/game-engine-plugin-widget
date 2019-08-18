import { IBufferObject } from "./GameCommonInterfaces";

// The Graphics Buffer is a class that will load and hold all the images used in the engine.
export default class GraphicsBuffer {
    private _buffer: Array<IBufferObject>;
    constructor() {
        this._buffer = [];
    }
    public getBuffer() {
        return this._buffer;
    }
    public loadImageFromUrl(name: string, url: string) {
        const imgSource = document.createElement('img');
        imgSource.src = url;
        const self = this;
        imgSource.onload = function () {
            self._buffer.push({
                name: name,
                img: imgSource
            })
        };
    }
}