import Capatcha from "@/components/Capatcha";
import axios from "axios";
import { useState } from "react";

export default function Home() {
  const[selectedImages,setSelectedImages]=useState([])
   const submit=()=>{
    axios.post('/api/submit', {selectedImages})
  .then(response => {
   
    if ( response.data.isValidCaptcha) {
      alert("Captcha is valid")
    } else {
      alert("captcha is not valid");
      window.location.reload();
    }
  })
  .catch(error => {
    // Handle errors here
    console.error('Error:', error);
  });
   }

  return (
   <div className="">
  
     <div className="bg-white rounded-md shadow-md p-3 flex flex-col gap-2 max-w-80 mx-auto mt-24">
    
      <h2 className="text-2xl font-bold">Select a dog </h2>
     <Capatcha selectedImages={selectedImages} setSelectedImages={setSelectedImages}/>
      <button className="bg-orange-500 p-3 rounded-md shadow-md text-white" onClick={submit}>Submit</button>
     </div>
   </div>
  );
}
 