import { IBodyDimensions } from "./GameCommonInterfaces";

// 3D constants
let SCREEN_WIDTH = 0;
let SCREEN_HEIGHT = 0;
const NEAR = 0.1
const FAR = 1000;

// The Util class
export default class Util {
    _getInnerWidth(dimensions: IBodyDimensions, elem: Element) {
        const style = window.getComputedStyle(elem);

        return dimensions.offsetWidth - parseFloat(style.paddingLeft || '0') - parseFloat(style.paddingRight || '0') - parseFloat(style.borderLeft || '0') - parseFloat(style.borderRight || '0') - parseFloat(style.marginLeft || '0') - parseFloat(style.marginRight || '0');
    };
    _getInnerHeight(dimensions: IBodyDimensions, elem: Element) {
        const style = window.getComputedStyle(elem);
        return dimensions.offsetHeight - parseFloat(style.paddingTop || '0') - parseFloat(style.paddingBottom || '0') - parseFloat(style.borderTop || '0') - parseFloat(style.borderBottom || '0') - parseFloat(style.marginTop || '0') - parseFloat(style.marginBottom || '0');
    };
    setScreenDimensions() {
        const dimensions: IBodyDimensions = {
            offsetWidth: document.body.offsetWidth,
            offsetHeight: document.body.offsetHeight
        }
        SCREEN_WIDTH = this._getInnerWidth(dimensions, document.body);
        SCREEN_HEIGHT = this._getInnerHeight(dimensions, document.body);
    };
    getCenterWidth(width: number) {
        this.setScreenDimensions();
        let center = SCREEN_WIDTH / 2;
        if (width !== null) {
            center = center - (width / 2);
        }
        return center;
    };
    getCenterHeight(height: number) {
        this.setScreenDimensions();
        let center = SCREEN_HEIGHT / 2;
        if (height !== null) {
            center = center - (height / 2);
        }
        return center;
    };
    getScreenWidth() {
        this.setScreenDimensions();
        return SCREEN_WIDTH;
    };
    getScreenHeight() {
        this.setScreenDimensions();
        return SCREEN_HEIGHT;
    };
    getNear() {
        return NEAR;
    };
    getFar() {
        return FAR;
    };
    isAvailable(obj?: any){
        if (typeof obj !== "undefined" && obj !== null && typeof obj.current !== "undefined" && obj.current !== null ) {
            return true;
        } else {
            return false;
        }
    }
}