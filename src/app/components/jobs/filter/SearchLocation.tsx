// 'use client'
// import React, { Dispatch, SetStateAction } from "react";
// import LocationAutoComplete from "@/ui/locationAutoComplete";
// import { useState,useEffect } from "react";
// import { setLocationFilter } from "@/redux/features/candidate/filterSlice";
// import { setLocation } from "@/redux/features/filterJobPostSlice";
// import { useRouter } from "next/navigation";

// interface SearchLocationProps {
//   location?: string[]; // Make location prop optional
//   setLocationFilter: Dispatch<SetStateAction<string[]>>;
// }

// const SearchLocation: React.FC<SearchLocationProps> = ({
//   location = [], // Provide a default value
//   setLocationFilter,
// }) => {
//   const removeLocationClick = (value: string) => {
//     setLocationFilter((prev) => prev.filter((location) => location !== value));
//   };
//   const router = useRouter();
//   const [selectedlocation, setselectedlocation] =useState();

//   useEffect(() => {
//     router.push(`job-list-v1?location=${selectedlocation}`);
//   },[selectedlocation, setselectedlocation])
//   return (
//     <div>
//       <a
//         className="filter-title fw-500 text-dark"
//         data-bs-toggle="collapse"
//         href="#collapseLocation"
//         role="button"
//         aria-expanded="false"
//       >
//         Search Location
//       </a>
//       <div className="collapse show" id="collapseLocation">
//         <div className="main-body">
//           <form action="#" className="input-box position-relative">
//             <LocationAutoComplete
//               setSelected={setLocationFilter}
//               // setSelected={setselectedlocation}
//               type="cities"
//               label="location"
//               isMultiple={true}
//               borderTrue={false}
//             />
//             <button>
//               <i className="bi bi-search"></i>
//             </button>
//           </form>
         
//           <div style={{ marginTop: "10px" }} className="d-flex">
//             {location.map((value) => (
//               <button 
//                 style={{
//                   fontSize: "12px",
//                   fontWeight: 500,
//                   margin: "10px 3px 0",
//                   padding: "0 14px",
//                   height: "25px",
//                   background: "rgba(49, 121, 90, 0.1)",
//                   borderRadius: "30px",
//                 }}
//                 key={value} onClick={() => removeLocationClick(value)}>
//                 {value}
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SearchLocation;

'use client'
import React, { Dispatch, SetStateAction, useEffect } from "react";
import LocationAutoComplete from "@/ui/locationAutoComplete";
import { useRouter, useSearchParams } from "next/navigation";
import { setLocationFilter } from "@/redux/features/candidate/filterSlice";
import { useAppDispatch } from "@/redux/hook";

const SearchLocation = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initialLocation = searchParams.get("location");
  const [locations, setLocations] = React.useState<string[]>(initialLocation ? initialLocation.split(',') : []);

  const removeLocationClick = (value: string) => {
    setLocations((prev) => prev.filter((location) => location !== value));
  };

  useEffect(() => {
    const newLocationParam = locations.join(',');
    router.push(`job-list-v1?location=${newLocationParam}`);
    dispatch(setLocationFilter(locations));
  }, [locations, router, dispatch]);

  return (
    <div>
      <a
        className="filter-title fw-500 text-dark"
        data-bs-toggle="collapse"
        href="#collapseLocation"
        role="button"
        aria-expanded="false"
      >
        Search Location
      </a>
      <div className="collapse show" id="collapseLocation">
        <div className="main-body">
          <form action="#" className="input-box position-relative">
            <LocationAutoComplete
              setSelected={(selected) => {
                setLocations(selected);
              }}
              type="cities"
              label="location"
              isMultiple={true}
              borderTrue={false}
            />
            <button>
              <i className="bi bi-search"></i>
            </button>
          </form>
         
          <div style={{ marginTop: "10px" }} className="d-flex">
            {locations.map((value) => (
              <button 
                style={{
                  fontSize: "12px",
                  fontWeight: 500,
                  margin: "10px 3px 0",
                  padding: "0 14px",
                  height: "25px",
                  background: "rgba(49, 121, 90, 0.1)",
                  borderRadius: "30px",
                }}
                key={value} onClick={() => removeLocationClick(value)}>
                {value}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchLocation;

