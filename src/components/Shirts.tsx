import { memo } from "react";

const Shirts = () => {
  return (
    <div className="ml-10 mr-10">
      <div>
        <div className="text-center">
          <h2 className="font-bold text-3xl mb-10">Shirts</h2>
          <p className="text-center">
            Performance shirts designed for comfort, breathability, and style
            during every workout.
          </p>
        </div>
      </div>
    </div>
  );
};

export default memo(Shirts);
