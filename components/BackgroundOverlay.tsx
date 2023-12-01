import { useTheme } from "next-themes";

const OverlayComponent = () => {
  
  return (
    <div className="w-full h-screen flex justify-center absolute -z-50 overflow-hidden">
      <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 700 450" opacity="0.80" height="100%" width="100%">
        <defs>
          <filter id="bbblurry-filter" x="-100%" y="-100%" width="400%" height="400%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feGaussianBlur stdDeviation="84" x="0%" y="0%" width="100%" height="100%" in="SourceGraphic" edgeMode="none" result="blur"></feGaussianBlur>
          </filter>
        </defs>
        <g filter="url(#bbblurry-filter)">
          <ellipse rx="145" ry="24.5" cx="200" cy="190" fill="hsl(37, 99%, 67%)"></ellipse>
          <ellipse rx="145" ry="24.5" cx="480" cy="260" fill="hsl(316, 99%, 55%)"></ellipse>
          <ellipse rx="145" ry="24.5" cx="530" cy="75" fill="hsl(185, 100%, 57%)"></ellipse>
        </g>
      </svg>
    </div>
    )
  };


export default OverlayComponent;