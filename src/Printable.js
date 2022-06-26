import { useState } from "react";
import * as Icon from "react-feather";

const INITIAL_WIDTH_MM = 20;
// 1mm === 3.7795275591
const MM_TO_PX = 3.7795275591;

function px(mm) {
  return mm * MM_TO_PX;
}

export function Printable({ onRemove, padded, ...props }) {
  const [mmWidth, setMmWidth] = useState(INITIAL_WIDTH_MM);
  const [mmHeight, setMmHeight] = useState(0);
  const [size, setSize] = useState(0);

  function adjustImage(direction) {
    const addend = direction === "up" ? 1 : -1;
    const newWidth = mmWidth + addend;
    const newHeight = (mmHeight * newWidth) / mmWidth;
    setMmWidth(newWidth);
    setMmHeight(newHeight);
  }

  return (
    <div className="d-flex flex-column align-items-start">
      <div>
        <div className="d-flex align-items-center justify-content-between">
          <input
            type="number"
            className="form-control form-control-sm"
            style={{ width: 16, height: 16, padding: 0, minHeight: 0, background: "#eaecef" }}
            value={size}
            onChange={(e) => {
              setSize((prevSize) => {
                const value = Number(e.target.value);
                const hasIncreased = value > prevSize;
                if (hasIncreased) {
                  adjustImage("up");
                } else {
                  adjustImage("down");
                }
                return value;
              });
            }}
          />
          <Icon.XCircle color="red" size={16} onClick={onRemove} />
        </div>
        <div className="my-1" />
        <div
          className="bg-white"
          style={{
            border: "1px dashed #d9d9d9",
            padding: padded ? 16 : 0
          }}
        >
          <img
            alt="img"
            {...props}
            onLoad={(e) => {
              const { naturalWidth, naturalHeight } = e.target;
              const newHeight = (naturalHeight * INITIAL_WIDTH_MM) / naturalWidth;
              setMmHeight(newHeight);
            }}
            style={{
              objectFit: "contain",
              width: px(mmWidth),
              height: px(mmHeight),
              ...props.style
            }}
          />
        </div>
      </div>
      <small>
        {mmWidth.toFixed()}x{mmHeight.toFixed()}mm
      </small>
    </div>
  );
}
