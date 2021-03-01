import React from 'react'
import { ColorMatrix } from "gl-react-color-matrix";
import { requireNativeComponent } from 'react-native'
import { defaultStyle, checkStyle } from './style'

const ColorMatrixImageFilter = requireNativeComponent ? requireNativeComponent('CMIFColorMatrixImageFilter') : null

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

    return (
      <ColorMatrix 
        style={[defaultStyle.container, style]}
        ref={ref}
        {...restProps}
        matrix={[
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1
        ]} 
      />
    )
  }