const LoadingSpinner = ({ color }: { color: string }) => {
  return (
    <div className="absolute left-1/2 top-1/2 z-0 w-auto h-auto origin-center -translate-x-1/2 -translate-y-1/2 transform">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        style={{
          margin: 'auto',
          background: 'transparent',
          display: 'block',
          shapeRendering: 'auto',
        }}
        width="75px"
        height="75px"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
      >
        <circle
          cx={50}
          cy={50}
          fill="none"
          stroke={color}
          strokeWidth={8}
          r={35}
          strokeDasharray="164.93361431346415 56.97787143782138"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            repeatCount="indefinite"
            dur="1.4925373134328357s"
            values="0 50 50;360 50 50"
            keyTimes="0;1"
          />
        </circle>
      </svg>
    </div>
  );
};

export default LoadingSpinner;
