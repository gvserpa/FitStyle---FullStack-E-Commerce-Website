import { memo } from "react";

const Leggings = () => {
  return (
    <div className="ml-10 mr-10">
      <div>
        <div className="text-center">
          <h2 className="font-bold text-3xl mb-10">Leggings</h2>
          <p className="text-center">
            High-performance leggings designed to move with you, keeping you
            confident and comfortable. Opção 3:
          </p>
        </div>
      </div>
    </div>
  );
};

export default memo(Leggings);
