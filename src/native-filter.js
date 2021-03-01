import React, { Component } from "react";
import { Shaders, Node, GLSL } from "gl-react";
import { Surface } from "gl-react-dom";
import { requireNativeComponent } from 'react-native'
import { defaultStyle, checkStyle } from './style'

const ColorMatrixImageFilter = requireNativeComponent ? requireNativeComponent('CMIFColorMatrixImageFilter') : null

const shaders = Shaders.create({
  Saturate: {
    frag: GLSL`
precision highp float;
varying vec2 uv;
uniform sampler2D t;
uniform float contrast, saturation, brightness;
const vec3 L = vec3(0.2125, 0.7154, 0.0721);
void main() {
  vec4 c = texture2D(t, uv);
	vec3 brt = c.rgb * brightness;
	gl_FragColor = vec4(mix(
    vec3(0.5),
    mix(vec3(dot(brt, L)), brt, saturation),
    contrast), c.a);
}
`
  }
});

const Saturate = ({ contrast, saturation, brightness, children }) =>
  <Node
    shader={shaders.Saturate}
    uniforms={{ contrast, saturation, brightness, t: children }}
  />;

class WebFilter extends Component {
  render() {
    return (
    <Surface width={480} height={300}>
      <Saturate {...this.props}>
        https://i.imgur.com/uTP9Xfr.jpg
      </Saturate>
    </Surface>
    );
  }
  static defaultProps = {
    contrast: 0.5,
    saturation: 0,
    brightness: 0.5,
  };
}

export const NativeFilter = ColorMatrixImageFilter ? React.forwardRef(
  ({ style, ...restProps }, ref) => {
    checkStyle(style)

    return (
      <ColorMatrixImageFilter
        style={[defaultStyle.container, style]}
        ref={ref}
        {...restProps}
      />
    )
  }
) : React.forwardRef(
  ({ style, ...restProps }, ref) => {
    checkStyle(style)
    console.log(restProps);
    return (
      <WebFilter />
    )
  });