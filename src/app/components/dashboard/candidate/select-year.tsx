import NiceSelect from "@/ui/nice-select";
import { it } from "node:test";
import React from "react";

interface Props {
  firstInput: string;
  setYear: React.Dispatch<React.SetStateAction<string>>;
}

const SelectYear = ({ setYear, firstInput }: Props) => {
  const handleYear = (item: { value: string; label: string }) => {
    setYear(item.value);
  };
  let year = new Date().getFullYear();
  let years = Array.from({ length: 101 }, (_, i) => year - i);
  let options = years.map((year) => ({
    value: String(year),
    label: String(year),
  }));
  options.unshift({ value: firstInput, label: firstInput });

  return (
    <div className="dash-input-wrapper mb-30">
      <NiceSelect
        isScroll={true}
        options={options}
        defaultCurrent={0}
        onChange={(item) => handleYear(item)}
        name="Year"
      />
    </div>
  );
};

export default SelectYear;
