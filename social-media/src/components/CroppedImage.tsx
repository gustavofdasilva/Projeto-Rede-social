import React from 'react'

type Props = {
    width: number,
    height: number,
    filePath: string | ArrayBuffer | undefined,
    className?: string
}

const CroppedImage = (props:Props) => {
  return (
    <div style={{
        width:props.width,
        height:props.height,
        backgroundImage:`url(${props.filePath})`, 
        backgroundPosition: 'center', 
        backgroundSize: 'cover'}}
        className={`rounded ${props.className}`}>    
    </div>
  )
}

export default CroppedImage
