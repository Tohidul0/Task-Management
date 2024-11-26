import React from 'react'
import clsx from "clsx";

export default function Title({title}) {
  
    return (
        <h2 className={clsx("text-2xl font-semibold capitalize")}>
          {title}
        </h2>
      );
  
}
