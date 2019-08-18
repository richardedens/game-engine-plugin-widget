import { Mesh } from "three";

export interface IComponent3D {
    name: string,
    obj: Mesh
}

export interface IBufferObject {
    name: string;
    img: CanvasImageSource;
}

export interface IBodyDimensions {
    offsetWidth: number,
    offsetHeight: number
}

export interface IReactRef {
    current: object
}