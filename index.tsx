import React, { memo, ReactNode, useState } from "react";
import { View, PixelRatio } from "react-native";
const dpTopx = (dp: any) => PixelRatio.getPixelSizeForLayoutSize(dp);

const ScaleView = ({
  designWidth = 375,
  children,
}: {
  designWidth?: number;
  children?: ReactNode;
}) => {
  const [scaleObj, setScale] = useState({
    /** 屏幕宽 px */
    screenWidth: 0,
    /** 屏幕高 px */
    screenHeight: 0,
    /** 缩放比例 */
    scale: 1,
  });

  const { screenWidth, screenHeight, scale } = scaleObj;

  const handleLayout = (e: any) => {
    const w = dpTopx(e.nativeEvent.layout.width);
    const h = dpTopx(e.nativeEvent.layout.height);
    const designScale = designWidth / w;
    const pxRatio = PixelRatio.get(); // 像素密度
    const scale = 1 / pxRatio / designScale;

    setScale({
      ...scaleObj,
      screenWidth: designWidth,
      screenHeight: h * designScale,
      scale,
    });
  };

  return (
    <View style={{ flex: 1 }} onLayout={handleLayout}>
      <View
        style={{
          width: screenWidth,
          height: screenHeight,
          transform: [
            { translateX: -screenWidth * 0.5 },
            { translateY: -screenHeight * 0.5 },
            { scale },
            { translateX: screenWidth * 0.5 },
            { translateY: screenHeight * 0.5 },
          ],
        }}
      >
        {children}
      </View>
    </View>
  );
};

export default memo(ScaleView);
