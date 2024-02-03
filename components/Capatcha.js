import { useState } from "react";
export default function Capatcha({selectedImages,setSelectedImages}) {
   const imagelocation=(new Array(9)) .fill(null).map((value,index)=>{
    return '/api/captcha-image?index='+index;
   }) 


   const selectImage=(index)=>{
   setSelectedImages(prev=>{
    if(prev.includes(index)){
        return prev.filter(val=>val!==index);
    }else{
        return [...prev,index];
    }
   })
   }
 
  return (
    <div className="grid grid-cols-3">
       {
        imagelocation.map((imageUrl,index)=>(
            <>
            <div key={index} className="relative cursor-pointer"  onClick={()=>{selectImage(index)}}>
              <div className={selectedImages && selectedImages.includes(index)?'absolute block w-full h-full bg-blue-500 opacity-50':'hidden'}></div>
                <img src={imageUrl}/>
            </div>
            </>
        ))
       }
    </div>
  )
}
