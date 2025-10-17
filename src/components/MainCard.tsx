import { memo } from "react";

const MainCard = () => {
  return (
    <div className="relative bg-gradient-to-r from-cyan-700 via-cyan-900 to-cyan-950 rounded-2xl flex items-center justify-center mr-10 ml-10 py-30 overflow-hidden">
      <svg
        className="absolute w-full h-full"
        viewBox="0 0 1000 300"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="subtleWave" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#083344" />
            <stop offset="50%" stopColor="#164e63" />
            <stop offset="100%" stopColor="#083344" />
          </linearGradient>
        </defs>

        <path
          d="M0,350 C150,100 250,100 400,200 C550,300 650,300 800,50"
          stroke="url(#subtleWave)"
          strokeWidth="80"
          fill="none"
          opacity="0.3"
        />
      </svg>

      <p className="relative z-10 text-white font-bold text-2xl w-2/3 text-center">
        Elevate your training with premium activewear designed to move with you.
        Feel empowered, stay motivated, and achieve your fitness goals in
        comfort and style every day.
      </p>
    </div>
  );
};

export default memo(MainCard);
