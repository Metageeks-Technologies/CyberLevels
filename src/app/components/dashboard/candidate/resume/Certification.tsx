// "use client";
// import React from "react";
// import icon_3 from "@/assets/images/icon/icon_10.svg";
// import Image from "next/image";
// import EditSkill from "@/app/components/candidate-details/popup/EditSkill";

// const Certificate = ({certificates}:{certificates:string[]})=>{
//     return(
//         <>
//         <h4 className="dash-title-three">Certificates & Qualification</h4>
//       <div className="dash-input-wrapper mb-40">
//         {/* <label htmlFor="">Add Skills*</label> */}

//         <div className="skills-wrapper">
//           <ul className="style-none d-flex flex-wrap align-items-center">
//             {/* {certificates.map((val, index) => (
//               <li key={index} className="is_tag" style={{ padding: "0 22px" }}>
//                 <button>
//                   {val}
//                   {/* <i className="bi bi-x"></i> }
//                 </button>
//               </li>
//             ))} */}

//             <li className="more_tag ">
//               <button
//                 data-bs-toggle="modal"
//                 data-bs-target="#skillModal"
//                 type="button"
//                 className="d-flex mt-2 justify-content-center align-items-center "
//               >
//                 <Image src={icon_3} height={24} width={24} alt="icon" />
//               </button>
//             </li>
//           </ul>
//         </div>
//       </div>
//       {/* <EditSkill skills={certificates} /> */}
//         </>
//     );
// };

// export default Certificate;
"use client";
import React, { useState } from 'react';
import { updateCurrCandidate } from "@/redux/features/candidate/api";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { notifyError, notifyInfo, notifySuccess } from "@/utils/toast";
import { text } from 'stream/consumers';


const Certificates: React.FC = () => {
    const dispatch = useAppDispatch();
    const { currCandidate } = useAppSelector(
        (s) => s.candidate.candidateDashboard
      );
    const [texts, setTexts] = useState<string[]>(currCandidate?.certificate || []);
    const [currentText, setCurrentText] = useState<string>('');

  const addText = () => {
    if (currentText.trim() !== ''){
    setTexts([...texts, currentText]);
    
    setCurrentText('');
    
}
  };

  
  const handleSave = async () => {
    
    if (currCandidate) {
      const isUpdated = await updateCurrCandidate(dispatch, currCandidate._id, {
        certificate: texts,
      });
      if (isUpdated) {
        notifySuccess("updated successfully");
      } else notifyError("something went wrong try again");
    }
  };

  const editText = (index: number) => {
    const newText = prompt('Edit:', texts[index]);
    if (newText !== null && newText.trim() !== '') {
      const updatedTexts = [...texts];
      updatedTexts[index] = newText;
      setTexts(updatedTexts);
    }
  };

  const removeText = (index: number) => {
    const updatedTexts = [...texts];
    updatedTexts.splice(index, 1);
    setTexts(updatedTexts);
  };

  return (
    <>
    <h4 className="dash-title-three">Certification and Qualification</h4>
     <div className="dash-input-wrapper mb-40">
    <div className="bg-white card-box border-20 mt-40">
    <div className="skills-wrapper">
      <input
        type="text"
        value={currentText}
        onChange={(e) => setCurrentText(e.target.value)}
      />
      <button
      className='mt-3 dash-btn-two tran3s me-3'
      onClick={addText}>Add</button>
      <button
      className='mt-3 dash-btn-two tran3s me-3'
      onClick={handleSave}>Save</button>

      <ul className="list-none ">
        {texts.map((text, index) => (
          <li className="flex items-center justify-between mb-2" key={index}>
            <span className='font-bold text-xl'>{text}</span>
            <div className='flex'>
            <button className="ml-2" onClick={() => editText(index)}>edit</button>
            <button className="ml-2" onClick={() => removeText(index)}>X</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
    </div>
    </div> 
    </>
  );
};

export default Certificates;