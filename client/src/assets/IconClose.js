import React from "react";

function IconClose({handleClose}) {
  return (
    <svg onClick={handleClose}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsSvgjs="http://svgjs.com/svgjs"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="50"
      height="50"
      cursor="pointer"
      version="1.1"
    >
      <svg onClick={handleClose}
        xmlns="http://www.w3.org/2000/svg"
        width="50"
        height="50"
        viewBox="0 0 24 24"
        cursor="pointer"
      >
        <path
          fill="#f2eded"
          d="M13.41 12l6.3-6.29a1 1 0 10-1.42-1.42L12 10.59l-6.29-6.3a1 1 0 00-1.42 1.42l6.3 6.29-6.3 6.29a1 1 0 000 1.42 1 1 0 001.42 0l6.29-6.3 6.29 6.3a1 1 0 001.42 0 1 1 0 000-1.42z"
          className="color000 svgShape"
        ></path>
      </svg>
    </svg>
  );
}

export default IconClose;