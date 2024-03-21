'use client'
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const useSearchFormSubmit = () => {
  const router = useRouter();
  const [categoryVal, setCategoryVal] = useState<string>("");
  const [locationVal, setLocationVal] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");
  const [company, setCompany] = useState<string>("");

  const generateQueryParams = () => {
    const queryParams = [];

    

    if (locationVal) {
      queryParams.push(`location=${locationVal}`);
    }

    if (categoryVal) {
      queryParams.push(`category=hello`);
    }

    if (searchText) {
      queryParams.push(`search=${searchText}`);
    }

    if (company) {
      queryParams.push(`company=${company}`);
    }

    return queryParams.join("&&");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const queryParams = generateQueryParams();

    if (queryParams) {
      router.push(`/job-list-v1?${queryParams}`);
      // router.push(`/job-list-v1?${locationVal}&${categoryVal}`)
    } else {
      router.push(`/`);
      setCategoryVal("");
      setLocationVal("");
    }
  };
 

  return {
    setLocationVal,
    setCategoryVal,
    setCompany,
    setSearchText,
    handleSubmit,
  };
};

export default useSearchFormSubmit;
