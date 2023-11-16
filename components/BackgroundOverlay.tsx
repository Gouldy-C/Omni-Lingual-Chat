import { useTheme } from "next-themes";

const OverlayComponent = () => {
  
  return (
      <svg id='patternId' className="-z-50 absolute dark:invert opacity-[10%]" width='100%' height='100vh' xmlns='http://www.w3.org/2000/svg'>
        <defs>
          <pattern id='a' patternUnits='userSpaceOnUse' width='29' height='50.115' patternTransform='scale(3) rotate(0)'>
            <rect x='0' y='0' width='100%' height='100%' fill='hsla(0, 0%, 100%, 0)'/>
            <path d='M14.498 16.858L0 8.488.002-8.257l14.5-8.374L29-8.26l-.002 16.745zm0 50.06L0 58.548l.002-16.745 14.5-8.373L29 41.8l-.002 16.744zM28.996 41.8l-14.498-8.37.002-16.744L29 8.312l14.498 8.37-.002 16.745zm-29 0l-14.498-8.37.002-16.744L0 8.312l14.498 8.37-.002 16.745z'  strokeWidth='2.5' stroke='hsla(0, 0%, 0%, 1)' fill='none'/>
          </pattern>
        </defs>
        <rect width='800%' height='800%' transform='translate(0,0)' fill='url(#a)'/>
      </svg>
    )
  };


export default OverlayComponent;