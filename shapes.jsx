// Bauhaus geometric primitives used throughout the site.
// Pure SVG so they animate cheaply and look crisp at any size.

const Circle = ({ size = 100, fill = "var(--red)", stroke = "none", style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={style} aria-hidden="true">
    <circle cx="50" cy="50" r="48" fill={fill} stroke={stroke} strokeWidth={stroke === "none" ? 0 : 2}/>
  </svg>
);

const HalfCircle = ({ size = 100, fill = "var(--blue)", rotation = 0, style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={{ ...style, transform: `rotate(${rotation}deg)` }} aria-hidden="true">
    <path d="M 2 50 A 48 48 0 0 1 98 50 Z" fill={fill}/>
  </svg>
);

const Square = ({ size = 100, fill = "var(--yellow)", rotation = 0, style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={{ ...style, transform: `rotate(${rotation}deg)` }} aria-hidden="true">
    <rect x="2" y="2" width="96" height="96" fill={fill}/>
  </svg>
);

const Triangle = ({ size = 100, fill = "var(--blue)", rotation = 0, style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={{ ...style, transform: `rotate(${rotation}deg)` }} aria-hidden="true">
    <polygon points="50,4 96,96 4,96" fill={fill}/>
  </svg>
);

const QuarterCircle = ({ size = 100, fill = "var(--red)", rotation = 0, style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={{ ...style, transform: `rotate(${rotation}deg)` }} aria-hidden="true">
    <path d="M 0 100 L 0 0 A 100 100 0 0 1 100 100 Z" fill={fill}/>
  </svg>
);

const Bar = ({ w = 100, h = 12, fill = "var(--ink)", style = {} }) => (
  <div style={{ width: w, height: h, background: fill, ...style }}/>
);

// Compass / target - concentric circles
const Target = ({ size = 100, color = "var(--ink)", style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={style} aria-hidden="true">
    <circle cx="50" cy="50" r="48" fill="none" stroke={color} strokeWidth="2"/>
    <circle cx="50" cy="50" r="32" fill="none" stroke={color} strokeWidth="2"/>
    <circle cx="50" cy="50" r="16" fill={color}/>
  </svg>
);

// A small Bauhaus logomark - Jm in a circle
const Mark = ({ size = 48, style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={style} aria-hidden="true">
    <circle cx="50" cy="50" r="48" fill="var(--ink)"/>
    <circle cx="50" cy="50" r="22" fill="var(--red)"/>
    <rect x="50" y="2" width="48" height="48" fill="var(--yellow)"/>
    <polygon points="2,50 50,50 50,98" fill="var(--blue)"/>
  </svg>
);

Object.assign(window, { Circle, HalfCircle, Square, Triangle, QuarterCircle, Bar, Target, Mark });
