import { memo } from "react";

const Shoes = () => {
  return (
    <div className="ml-10 mr-10">
      <div>
        <div className="text-center">
          <h2 className="font-bold text-3xl mb-10">Shoes</h2>
          <p className="text-center">
            Lightweight, supportive shoes built for performance, comfort, and
            style.
          </p>
        </div>
      </div>
    </div>
  );
};

export default memo(Shoes);
