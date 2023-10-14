"use client";
import React, { useState } from "react";
import Image from "next/image";
import avatar from "@/assets/dashboard/images/avatar_02.jpg";
import DashboardHeader from "./dashboard-header";
import icon_3 from "@/assets/images/icon/icon_10.svg";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/redux/store";
import { ICandidate } from "@/types/user-type";
import Loader from "@/ui/loader";
import LocationAutoComplete from "@/ui/locationAutoComplete";
import {
  requestStart,
  requestFail,
  updateUserSuccess,
} from "@/redux/features/userSlice";
import axios, { AxiosError } from "axios";
import instance from "@/lib/axios";
// props type
type IProps = {
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};
const DashboardProfileArea = ({ setIsOpenSidebar }: IProps) => {
  const { user: candidate, loading } = useSelector(
    (state: RootState) => state.persistedReducer.user
  );
  const dispatch = useDispatch();
  const user = candidate as ICandidate;

  const [isEditable, SetIsEditable] = useState({
    firstName: false,
    lastName: false,
    bio: false,
    address: false,
    phoneNumber: false,
  });
  const [form, setForm] = useState({
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    bio: user.bio || "",
    phoneNumber: user.phoneNumber || "",
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
  const [location, setLocation] = useState({
    locality: user.location.locality || "",
    zipcode: user.location.zipcode || "",
  });
  const [city, setCity] = useState(user.location.city || "");
  const [state, setState] = useState(user.location.state || "");
  const [country, setCountry] = useState(user.location.country || "");
  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocation({
      ...location,
      [name]: value,
    });
  };
  const [social, setSocial] = useState<string[]>([]);
  const [SocialInput, setSocialInput] = useState("");
  const [isAddingSocialLink, setSocialLink] = useState(false);
  const addToSocial = () => {
    setSocial((prev) => [...prev, SocialInput]);
    setSocialLink(false);
    setSocialInput("");
  };
  console.log(social);
  const handleSubmit = async () => {
    const ILocation = {
      ...location,
      city: city,
      state: state,
      country: country,
    };
    const bodyObj = {
      ...form,
      socialSites: social,
      location: ILocation,
    };
    console.log(bodyObj);
    dispatch(requestStart());
    try {
      const { data } = await instance.patch(
        `/candidate/update/${user._id}`,
        bodyObj
      );
      console.log(data);
      dispatch(updateUserSuccess(data?.candidate));
    } catch (error) {
      const e = error as AxiosError;
      dispatch(requestFail(e.message));
    }
  };
  console.log(user.socialSites);
  return (
    <div className="dashboard-body">
      <div className="position-relative">
        {/* header start */}
        <DashboardHeader setIsOpenSidebar={setIsOpenSidebar} />
        {/* header end */}

        <h2 className="main-title">My Profile</h2>

        <div className="bg-white card-box border-20">
          <div className="user-avatar-setting d-flex align-items-center mb-30">
            <Image
              width={50}
              height={50}
              src={user?.avatar !== "none" ? (user?.avatar as string) : avatar}
              alt="avatar"
              className="lazy-img user-img"
            />
            {/* <div className="upload-btn position-relative tran3s ms-4 me-3">
              Upload new photo
              <input
                type="file"
                id="uploadImg"
                name="uploadImg"
                placeholder=""
              />
            </div>
            <button className="delete-btn tran3s">Delete</button> */}
          </div>
          <div className="dash-input-wrapper mb-30">
            <label htmlFor="firstName">First Name</label>
            {isEditable.firstName ? (
              <input
                type="text"
                name="firstName"
                onChange={handleInputChange}
                value={form.firstName}
                placeholder="James"
              />
            ) : (
              <div className="d-flex align-items-center position-relative">
                <input type="text" value={user.firstName} readOnly />
                <Image
                  onClick={() =>
                    SetIsEditable({ ...isEditable, firstName: true })
                  }
                  src={icon_3}
                  height={24}
                  width={24}
                  alt="icon"
                  className="lazy-img position-absolute end-0 cursor-pointer"
                />
              </div>
            )}
          </div>
          <div className="dash-input-wrapper mb-30">
            <label htmlFor="lastName">Last Name</label>
            {isEditable.lastName ? (
              <input
                type="text"
                name="lastName"
                onChange={handleInputChange}
                value={form.lastName}
                placeholder="brown"
              />
            ) : (
              <div className="d-flex align-items-center position-relative">
                <input type="text" value={user.lastName} readOnly />
                <Image
                  onClick={() =>
                    SetIsEditable({ ...isEditable, lastName: true })
                  }
                  src={icon_3}
                  height={24}
                  width={24}
                  alt="icon"
                  className="lazy-img position-absolute end-0 cursor-pointer"
                />
              </div>
            )}
          </div>
          <div className="dash-input-wrapper mb-30">
            <label htmlFor="">Email</label>
            <div className="d-flex align-items-center position-relative">
              <input type="text" value={user.email} readOnly />
            </div>
          </div>
          <div className="dash-input-wrapper mb-30">
            <label htmlFor="">Phone Number</label>
            {isEditable.phoneNumber ? (
              <input
                type="text"
                name="phoneNumber"
                onChange={handleInputChange}
                value={form.phoneNumber}
                placeholder="+880 01723801729"
              />
            ) : (
              <div className="d-flex align-items-center position-relative">
                <input type="text" value={user.phoneNumber} readOnly />
                <Image
                  onClick={() =>
                    SetIsEditable({ ...isEditable, phoneNumber: true })
                  }
                  src={icon_3}
                  height={24}
                  width={24}
                  alt="icon"
                  className="lazy-img position-absolute end-0 cursor-pointer"
                />
              </div>
            )}
            {/* <input type="text" placeholder="Brower" /> */}
          </div>
          <div className="dash-input-wrapper">
            <label htmlFor="bio">Bio</label>
            {isEditable.bio ? (
              <textarea
                className="size-lg"
                placeholder="Write something interesting about you...."
                value={form.bio}
                name="bio"
                onChange={handleInputChange}
              ></textarea>
            ) : (
              <div className="d-flex  position-relative">
                <textarea
                  value={user.bio}
                  readOnly
                  className="size-lg"
                  placeholder="Write something interesting about you...."
                ></textarea>
                <Image
                  onClick={() => SetIsEditable({ ...isEditable, bio: true })}
                  src={icon_3}
                  height={24}
                  width={24}
                  alt="icon"
                  className="lazy-img position-absolute end-0 cursor-pointer"
                />
              </div>
            )}
            {/* <div className="alert-text">
              Brief description for your profile. URLs are hyperlinked.
            </div> */}
          </div>
        </div>

        <div className="bg-white card-box border-20 mt-40">
          <h4 className="dash-title-three">Social Media</h4>
          {[...user?.socialSites, ...social].map((val, index) => (
            <div key={val} className="dash-input-wrapper mb-20">
              <label htmlFor="">Network {index + 1}</label>
              <input type="text" readOnly value={val} />
            </div>
          ))}

          {isAddingSocialLink && (
            <div className="dash-input-wrapper mb-20">
              <label htmlFor="SocialInput">
                Network {user?.socialSites.length + social.length + 1}
              </label>
              <input
                name="SocialInput"
                value={SocialInput}
                onChange={(e) => setSocialInput(e.target.value)}
                onBlur={addToSocial}
                type="text"
                placeholder="#"
              />
            </div>
          )}

          <button onClick={() => setSocialLink(true)} className="dash-btn-one">
            <i className="bi bi-plus"></i> Add more link
          </button>
        </div>

        {/* from for location  */}
        <div className="bg-white card-box border-20 mt-40">
          <h4 className="dash-title-three">Address & Location</h4>
          <div className="row">
            <div className="col-12">
              <div className="dash-input-wrapper mb-25">
                <label htmlFor="">Local Address*</label>
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
          </div>
        </div>

        <div className="button-group d-inline-flex align-items-center mt-30">
          <button
            type="submit"
            disabled={loading}
            onClick={handleSubmit}
            className="dash-btn-two tran3s me-3"
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

export default DashboardProfileArea;
