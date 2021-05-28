import { Dimensions, PixelRatio } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { LINE_HEIGHT_20, LINE_HEIGHT_24 } from './typography';

export const WINDOW_WIDTH = Dimensions.get('window').width;
export const WINDOW_HEIGHT = Dimensions.get('window').height;
const guidelineBaseWidth = 375;

export const scaleSize = size => (WINDOW_WIDTH / guidelineBaseWidth) * size;

export const scaleFont = size => size * PixelRatio.getFontScale();

function dimensions(top, right = top, bottom = top, left = right, property) {
    let styles = {};

    styles[`${property}Top`] = top;
    styles[`${property}Right`] = right;
    styles[`${property}Bottom`] = bottom;
    styles[`${property}Left`] = left;

    return styles;
}
export function centerStyle() {
    let styles = {};

    styles[`flex`] = 1;
    styles[`justifyContent`] = 'center';
    styles[`alignItems`] = 'center';

    return styles;
}

export function margin(top, right, bottom, left) {
    return dimensions(top, right, bottom, left, 'margin');
}

export function padding(top, right, bottom, left) {
    return dimensions(top, right, bottom, left, 'padding');
}
export function textStyle(fontSize, fontWeight, fontFamily, color, property, position, mt, textAlign,type) {
    let styles = {};

    styles[`${property}Size`] = fontSize;
    styles[`${property}Family`] = fontFamily;
    styles[`${property}Weight`] = fontWeight;
    if(type == 'ANCHOR_TEXT') styles['padding'] = 5;
    if (color) styles[`color`] = color;
    styles['alignSelf'] = position;
    styles['textAlign'] = textAlign || 'center';
    styles['marginBottom'] = mt || 15;

    return styles;
}
export function boxShadow(color, offset = { height: 2, width: 2 },
    radius = 8, opacity = 0.2) {
    return {
        shadowColor: color,
        shadowOffset: offset,
        shadowOpacity: opacity,
        shadowRadius: radius,
        elevation: radius,
    };
}