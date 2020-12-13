import React from 'react';


export default function Locationpin({ color, size }) {
    const style = {
        height: size,
        width:size,
        backgroundColor:color,
        borderRadius:size,
        MarginTop:"10px"
    }
  return (
      <>
        <div className="circle" style={style}/>
    </>
  );
}
