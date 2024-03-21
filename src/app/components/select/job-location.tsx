// import React from "react";
// import slugify from "slugify";
// import job_data from "@/data/job-data";
// import NiceSelect from "@/ui/nice-select";

// const JobLocationSelect = ({
//   setLocationVal,
// }: {
//   setLocationVal: React.Dispatch<React.SetStateAction<string>>;
// }) => {
//   const uniqueLocations = [...new Set(job_data.map((job) => job.location))];
//   // location_option
//   const location_option = uniqueLocations.map((l) => {
//     return {
//       value: slugify(l.split(",").join("-").toLowerCase(), "-"),
//       label: l,
//     };
//   });
//   const handleLocation = (item: { value: string; label: string }) => {
//     setLocationVal(item.value);
//   };
//   return (
//     <NiceSelect
//       options={location_option}
//       defaultCurrent={0}
//       onChange={(item) => handleLocation(item)}
//       name="looking for"
//       cls="location"
//     />
//   );
// };

// export default JobLocationSelect;
import React, { Dispatch, SetStateAction, useState } from "react";
import slugify from "slugify";
import job_data from "@/data/job-data";
import LocationAutoComplete from "@/ui/locationAutoComplete";

const JobLocationSelect = ({
  setLocationVal,
}: {
  // setLocationVal: Dispatch<SetStateAction<string[]>>;
  setLocationVal: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const uniqueLocations = [...new Set(job_data.map((job) => job.location))];
  const locationOptions = uniqueLocations.map((l) => {
    return {
      value: slugify(l.split(",").join("-").toLowerCase(), "-"),
      label: l,
    };
  });

  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);

  const handleLocation = (locations: string[]) => {
    setSelectedLocations(locations);
    setLocationVal(locations);
  };

  return (
    <div>
      <div className="collapse show" id="collapseLocation">
        <div className="main-body">
          <form action="#" className="input-box position-relative">
            <LocationAutoComplete
              setSelected={handleLocation}
              type="cities"
              label="location"
              isMultiple={true}
              borderTrue={false}
            />
          </form>
          {/* Render selected locations */}
          <div style={{ marginTop: "10px" }} className="d-flex">
            {selectedLocations.map((location) => (
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
                key={location}
                onClick={() =>
                  setSelectedLocations((prevLocations) =>
                    prevLocations.filter((loc) => loc !== location)
                  )
                }
              >
                {location}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobLocationSelect;
