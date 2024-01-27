import React, { useState } from "react";
import { useAppDispatch } from "@/redux/hook";
import { setJobCode } from "@/redux/features/employer/employerJobPostFilterSlice";
import { setTestScore } from "@/redux/features/jobApp/filter-candidates-by-jobapp/candidateFilterByJobPostSlice";
// import { setSearchKey } from "@/redux/features/filterJobPostSlice";

const TestScoreFilter = () => {
  const dispatch = useAppDispatch();

  // handle search
  const [warn,setWarn] = useState<boolean>(false);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if((parseInt(e.target.value) >=0 && parseInt(e.target.value)<=100) || e.target.value===""){
        setTimeout(() => {
          dispatch(setTestScore(e.target.value));
          
        }, 1000);
        setWarn(false);
    }
    else{
        setWarn(true);
    }
  };
  return (
    <div className="filter-block pb-50 lg-pb-20">
      <div className="filter-title fw-500 text-dark">Job Code</div>
      <form className="input-box position-relative">
        <input
          onChange={handleSearch}
        //   defaultValue=""
          type="number"
          placeholder="Search Test Score"
        />
        <button>
          <i className="bi bi-search"></i>
        </button>
        {warn && <p style={{color:"red"}}>Enter in range [0,100]</p>}
      </form>
    </div>
  );
};

export default TestScoreFilter;
