"use client";
import avatar from "@/assets/dashboard/images/avatar_01.jpg";
import nav_1 from "@/assets/dashboard/images/icon/icon_1.svg";
import nav_1_active from "@/assets/dashboard/images/icon/icon_1_active.svg";
import profile_icon_1 from "@/assets/dashboard/images/icon/icon_23.svg";
import nav_3 from "@/assets/dashboard/images/icon/icon_3.svg";
import nav_3_active from "@/assets/dashboard/images/icon/icon_3_active.svg";
import nav_4 from "@/assets/dashboard/images/icon/icon_4.svg";
import nav_4_active from "@/assets/dashboard/images/icon/icon_4_active.svg";
import nav_8 from "@/assets/dashboard/images/icon/icon_5.svg";
import nav_8_active from "@/assets/dashboard/images/icon/icon_5_active.svg";
import nav_6 from "@/assets/dashboard/images/icon/icon_6.svg";
import nav_6_active from "@/assets/dashboard/images/icon/icon_6_active.svg";
import logo from "@/assets/images/logo/CL_Logo.png";
import type { RootState } from "@/redux/store";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";
import LogoutModal from "../../common/popup/logout-modal";
import LogoutButton from "./LogoutButton";

// nav data
const nav_data: {
  id: number;
  icon: StaticImageData;
  icon_active: StaticImageData;
  link: string;
  title: string;
}[] = [
  {
    id: 1,
    icon: nav_1,
    icon_active: nav_1_active,
    link: "/dashboard/candidate-dashboard",
    title: "Dashboard",
  },
  {
    id: 7,
    icon: nav_3,
    icon_active: nav_3_active,
    link: "/dashboard/candidate-dashboard/jobs",
    title: "My Applications",
  },
  {
    id: 6,
    icon: nav_6,
    icon_active: nav_6_active,
    link: "/dashboard/candidate-dashboard/saved-job",
    title: "Saved Job",
  },

  // {
  //   id: 2,
  //   icon: nav_2,
  //   icon_active: nav_2_active,
  //   link: "/dashboard/candidate-dashboard/profile",
  //   title: "My Profile",
  // },
  {
    id: 3,
    icon: nav_3,
    icon_active: nav_3_active,
    link: "/dashboard/candidate-dashboard/resume",
    title: "Resume",
  },
  {
    id: 4,
    icon: nav_4,
    icon_active: nav_4_active,
    link: "/dashboard/candidate-dashboard/membership",
    title: "Membership",
  },
  {
    id: 8,
    icon: nav_6,
    icon_active: nav_6_active,
    link: "/dashboard/candidate-dashboard/saved-company",
    title: "Saved Companies",
  },
  {
    id: 5,
    icon: nav_8,
    icon_active: nav_8_active,
    link: "/dashboard/candidate-dashboard/job-alert",
    title: "Job Alert",
  },

  // {
  //   id: 7,
  //   icon: nav_7,
  //   icon_active: nav_7_active,
  //   link: "/dashboard/candidate-dashboard/setting",
  //   title: "Account Settings",
  // },
];
// props type
type IProps = {
  isOpenSidebar: boolean;
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

const CandidateAside = ({ isOpenSidebar, setIsOpenSidebar }: IProps) => {
  const pathname = usePathname();
  const { currCandidate } = useSelector(
    (state: RootState) => state.candidate.candidateDashboard
  );
  const user = currCandidate;
  return (
    <>
      <aside className={`dash-aside-navbar ${isOpenSidebar ? "show" : ""}`}>
        <div className="position-relative">
          <div className="logo text-md-center d-md-block d-flex align-items-center justify-content-between">
            <Link href="/">
              <Image src={logo} alt="logo" priority />
            </Link>
            <button
              onClick={() => setIsOpenSidebar(false)}
              className="close-btn d-block d-md-none"
            >
              <i className="bi bi-x-lg"></i>
            </button>
          </div>
          <div className="user-data">
            <div className="user-avatar online position-relative rounded-circle">
              <Image
                src={
                  user?.avatar !== "none" ? (user?.avatar as string) : avatar
                }
                width={50}
                height={50}
                alt="avatar"
                className="lazy-img"
                style={{ height: "auto" }}
              />
            </div>
            <div className="user-name-data">
              <button
                className="user-name dropdown-toggle"
                type="button"
                id="profile-dropdown"
                data-bs-toggle="dropdown"
                data-bs-auto-close="outside"
                aria-expanded="false"
              >
                {`${user?.firstName} ${user?.lastName}`}
              </button>
              <ul className="dropdown-menu" aria-labelledby="profile-dropdown">
                <li>
                  <Link
                    className="dropdown-item d-flex align-items-center"
                    href="/dashboard/candidate-dashboard/profile"
                  >
                    <Image
                      src={profile_icon_1}
                      alt="icon"
                      className="lazy-img"
                    />
                    <span className="ms-2 ps-1">Profile</span>
                  </Link>
                </li>
                <li>
                  <LogoutButton />
                </li>
                {/* <li>
                  <a
                    className="dropdown-item d-flex align-items-center"
                    href="#"
                  >
                    <Image
                      src={profile_icon_3}
                      alt="icon"
                      className="lazy-img"
                    />
                    <span className="ms-2 ps-1">Notification</span>
                  </a>
                </li> */}
              </ul>
            </div>
          </div>
          <nav className="dasboard-main-nav">
            <ul className="style-none">
              {nav_data.map((m) => {
                const isActive = pathname === m.link;
                return (
                  <li key={m.id} onClick={() => setIsOpenSidebar(false)}>
                    <Link
                      href={m.link}
                      className={`d-flex w-100 align-items-center ${
                        isActive ? "active" : ""
                      }`}
                    >
                      <Image
                        src={isActive ? m.icon_active : m.icon}
                        alt="icon"
                        className="lazy-img"
                      />
                      <span>{m.title}</span>
                    </Link>
                  </li>
                );
              })}
              <li>
                <a
                  href="#"
                  className="d-flex w-100 align-items-center"
                  data-bs-toggle="modal"
                  data-bs-target="#deleteModal"
                >
                  {/* <Image src={nav_8} alt="icon" className="lazy-img" /> */}
                  {/* <span>Delete Account</span> */}
                </a>
              </li>
            </ul>
          </nav>
          {/* <div className="profile-complete-status">
            <div className="progress-value fw-500">87%</div>
            <div className="progress-line position-relative">
              <div className="inner-line" style={{ width: "80%" }}></div>
            </div>
            <p>Profile Complete</p>
          </div> */}
        </div>
      </aside>
      {/* LogoutModal star */}
      <LogoutModal />
      {/* LogoutModal end */}
    </>
  );
};

export default CandidateAside;
