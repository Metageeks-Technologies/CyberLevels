"use client";
import React, { useState } from "react";
import Image from "next/image";
import avatar from "@/assets/dashboard/images/avatar_04.jpg";
import DashboardHeader from "../candidate/dashboard-header";
import TeamSizeSelect from "./team-size-select";
import LocationAutoComplete from "@/ui/locationAutoComplete";
import PhoneInput from "@/ui/phoneInput";
import AutocompletePosition from "@/ui/autoCompletePosistion";
import axios, { AxiosError } from "axios";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import {
  submitCompanyStart,
  submitCompanyFail,
  submitCompanySuccess,
} from "@/redux/features/companySlice";
import Loader from "@/ui/loader";
import instance from "@/lib/axios";

// props type
type IProps = {
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};
const EmployProfileArea = ({ setIsOpenSidebar }: IProps) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state: RootState) => state.company);
  const [form, setForm] = useState({
    logo: "",
    name: "",
    email: "",
    contactNumber: "",
    website: "",
    foundedDate: "",
    about: "",
  });
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const [socialSites, setSocialSites] = useState<string[]>([]);
  const [socialSitesInput, setSocialSitesInput] = useState("");
  const handleAddMoreLink = () => {
    setSocialSites((prev) => [...prev, socialSitesInput]);
  };
  const [location, setLocation] = useState({
    locality: "",
    zipcode: "",
    maplocation: "",
  });
  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocation({
      ...location,
      [name]: value,
    });
  };
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [category, setCategory] = useState("");
  const handleSubmit = async () => {
    const ILocation = {
      ...location,
      city: city,
      state: state,
      country: country,
    };
    const bodyObj = {
      ...form,
      location: ILocation,
      teamSize,
      category,
      socialSites,
    };

    dispatch(submitCompanyStart());
    try {
      const { data } = await instance.post("company/add", bodyObj);
      dispatch(submitCompanySuccess(data.company));
    } catch (error) {
      console.log(error);
      const e = error as AxiosError;
      dispatch(submitCompanyFail(e.message));
    }

    setForm({
      logo: "",
      name: "",
      email: "",
      contactNumber: "",
      website: "",
      foundedDate: "",
      about: "",
    });
    setCity("");
    setCategory("");
    setCountry("");
    setState("");
    setTeamSize("");
    setLocation({
      locality: "",
      zipcode: "",
      maplocation: "",
    });
    setSocialSites([]);
  };
  // const handleLocationSubmit = () => {
  //   console.log(location, { city: city, state: state, country: country });
  // };
  return (
    <div className="dashboard-body">
      <div className="position-relative">
        {/* header start */}

        <DashboardHeader setIsOpenSidebar={setIsOpenSidebar} />
        {/* header end */}

        <h2 className="main-title">Create Company</h2>
        {/* from for about */}
        <div className="bg-white card-box border-20">
          <div className="user-avatar-setting d-flex align-items-center mb-30">
            {/* company logo url */}
            <Image src={avatar} alt="avatar" className="lazy-img user-img" />
            <div className="dash-input-wrapper ml-6 mb-30">
              <label htmlFor="logo">Logo*</label>
              <input
                name="logo"
                value={form.logo}
                type="text"
                onChange={handleInputChange}
                placeholder="https://www.example.com/logo.png"
              />
            </div>
          </div>
          <div className="dash-input-wrapper mb-30">
            <label htmlFor="name">Company Name*</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleInputChange}
              placeholder="John Doe"
            />
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="dash-input-wrapper mb-30">
                <label htmlFor="email">Email*</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleInputChange}
                  placeholder="companyinc@gmail.com"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="dash-input-wrapper mb-30">
                <label htmlFor="website">Website*</label>
                <input
                  type="text"
                  name="website"
                  value={form.website}
                  onChange={handleInputChange}
                  placeholder="http://somename.come"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="dash-input-wrapper mb-30">
                <label htmlFor="foundedDate">Founded Date*</label>
                <input
                  name="foundedDate"
                  value={form.foundedDate}
                  onChange={handleInputChange}
                  type="date"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="dash-input-wrapper mb-30">
                <label htmlFor="">Company Size*</label>
                {/* <TeamSizeSelect teamSize={teamSize} setTeamSize={setTeamSize} /> */}
                <TeamSizeSelect setSelected={setTeamSize} />
              </div>
            </div>
            <div className="col-md-6">
              <div className="dash-input-wrapper mb-30">
                <label htmlFor="contactNumber">Phone Number*</label>
                <input
                  name="contactNumber"
                  onChange={handleInputChange}
                  value={form.contactNumber}
                  type="text"
                  placeholder="+880 01723801729"
                />
                {/* <PhoneInput /> */}
              </div>
            </div>
            <div className="col-md-6">
              <div className="dash-input-wrapper mb-30">
                <label htmlFor="category">Category*</label>
                {/* <input
                  name="category"
                  value={form.category}
                  onChange={handleInputChange}
                  type="text"
                  placeholder="Account, Finance, Marketing"
                /> */}

                <AutocompletePosition
                  selected={category}
                  setSelected={setCategory}
                  endPoint="companyCategory"
                />
              </div>
            </div>
          </div>
          <div className="dash-input-wrapper">
            <label htmlFor="about">About Company*</label>
            <textarea
              name="about"
              value={form.about}
              onChange={handleInputChange}
              className="size-lg"
              placeholder="Write something interesting about you...."
            ></textarea>
            <div className="alert-text">
              Brief description for your company.
            </div>
          </div>
          {/* <button
            type="submit"
            onClick={handleSubmit}
            className="dash-btn-two tran3s me-3"
          >
            Save
          </button> */}
        </div>
        {/* from for social links */}
        <div className="bg-white card-box border-20 mt-40">
          <h4 className="dash-title-three">Social Media</h4>
          {[...socialSites, "temp"].map((obj, index) => (
            <div className="dash-input-wrapper mb-20">
              <label htmlFor="socialSitesInput">Network {index + 1}</label>
              <input
                type="text"
                name="socialSitesInput"
                onChange={(e) => setSocialSitesInput(e.target.value)}
                value={socialSitesInput}
                placeholder="https://twitter.com/FIFAcom"
              />
            </div>
          ))}
          {/* <div className="dash-input-wrapper mb-20">
            <label htmlFor="">Network 2</label>
            <input type="text" placeholder="https://twitter.com/FIFAcom" />
          </div> */}
          <button onClick={handleAddMoreLink} className="dash-btn-one">
            <i className="bi bi-plus"></i> Add more link
          </button>
        </div>
        {/* form for location */}
        <div className="bg-white card-box border-20 mt-40">
          <h4 className="dash-title-three">Address & Location</h4>
          <div className="row">
            <div className="col-12">
              <div className="dash-input-wrapper mb-25">
                <label htmlFor="locality">Local Address*</label>
                <input
                  name="locality"
                  value={location.locality}
                  type="text"
                  onChange={handleLocationChange}
                  placeholder="Cowrasta, Chandana, Gazipur Sadar"
                />
              </div>
            </div>

            <div className="col-lg-3">
              <div className="dash-input-wrapper mb-25">
                <label htmlFor="city">City*</label>
                <LocationAutoComplete
                  selected={city}
                  setSelected={setCity}
                  setCountry={setCountry}
                  type="cities"
                  label="city"
                />
              </div>
            </div>

            <div className="col-lg-3">
              <div className="dash-input-wrapper mb-25">
                <label htmlFor="">State*</label>
                <LocationAutoComplete
                  selected={state}
                  setSelected={setState}
                  type="regions"
                  label="state"
                />
              </div>
            </div>
            <div className="col-lg-3">
              <div className="dash-input-wrapper mb-25">
                <label htmlFor="zipcode">Zip Code*</label>
                <input
                  name="zipcode"
                  value={location.zipcode}
                  onChange={handleLocationChange}
                  type="text"
                  placeholder="1708"
                />
              </div>
            </div>
            <div className="col-lg-3">
              <div className="dash-input-wrapper mb-25">
                <label htmlFor="country">Country*</label>
                <input
                  name="country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  type="text"
                  placeholder="country"
                />
              </div>
            </div>
            {/* <div className="col-12">
              <div className="dash-input-wrapper mb-25">
                <label htmlFor="maplocation">Map Location*</label>
                <div className="position-relative">
                  <input
                    name="maplocation"
                    value={location.maplocation}
                    onChange={handleLocationChange}
                    type="text"
                    placeholder="XC23+6XC, Moiran, N105"
                  />
                  <button className="location-pin tran3s">
                    <Image src={icon} alt="icon" className="lazy-img m-auto" />
                  </button>
                </div>
                <div className="map-frame mt-30">
                  <div className="gmap_canvas h-100 w-100">
                    <iframe
                      className="gmap_iframe h-100 w-100"
                      src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=bass hill plaza medical centre&amp;t=&amp;z=12&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div> */}
            {/* <button
              type="submit"
              onClick={handleLocationSubmit}
              className="dash-btn-two tran3s me-3"
            >
              Save
            </button> */}
          </div>
        </div>
        {/* from for others */}

        {/* <div className="bg-white card-box border-20 mt-40">
          <h4 className="dash-title-three">Members</h4>
          <div className="dash-input-wrapper">
            <label htmlFor="">Add & Remove Member</label>
          </div>
          <div className="accordion dash-accordion-one" id="accordionOne">
            <div className="accordion-item">
              <div className="accordion-header" id="headingOne">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="false"
                  aria-controls="collapseOne"
                >
                  Add Member 1
                </button>
              </div>
              <div
                id="collapseOne"
                className="accordion-collapse collapse"
                aria-labelledby="headingOne"
                data-bs-parent="#accordionOne"
              >
                <div className="accordion-body">
                  <div className="row">
                    <div className="col-lg-2">
                      <div className="dash-input-wrapper mb-30 md-mb-10">
                        <label htmlFor="">Name*</label>
                      </div>
                    </div>
                    <div className="col-lg-10">
                      <div className="dash-input-wrapper mb-30">
                        <input
                          type="text"
                          placeholder="Product Designer (Google)"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-2">
                      <div className="dash-input-wrapper mb-30 md-mb-10">
                        <label htmlFor="">Designation*</label>
                      </div>
                    </div>
                    <div className="col-lg-10">
                      <div className="dash-input-wrapper mb-30">
                        <input type="text" placeholder="Account Manager" />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-2">
                      <div className="dash-input-wrapper mb-30 md-mb-10">
                        <label htmlFor="">Email*</label>
                      </div>
                    </div>
                    <div className="col-lg-10">
                      <div className="dash-input-wrapper mb-30">
                        <input type="email" placeholder="newmmwber@gmail.com" />
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-end mb-20">
                    <a href="#" className="dash-btn-one">
                      Remove
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <a href="#" className="dash-btn-one">
            <i className="bi bi-plus"></i> Add Another Member
          </a>
        </div> */}

        <div className="button-group d-inline-flex align-items-center mt-30">
          <button
            disabled={loading}
            type="submit"
            onClick={handleSubmit}
            className=" d-flex dash-btn-two tran3s me-3 justify-content-center align-items-center"
          >
            {loading ? <Loader /> : <span>Save</span>}
          </button>
          <a href="#" className="dash-cancel-btn tran3s">
            Cancel
          </a>
        </div>
      </div>
    </div>
  );
};

export default EmployProfileArea;
