import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import LoginForm from "../../forms/login-form";
import google from "@/assets/images/icon/google.png";
import facebook from "@/assets/images/icon/facebook.png";
import { useDispatch } from "react-redux";
import { setLoggerWithLn } from "@/redux/features/userSlice";

const LoginModal = () => {
  const [activeTab, setActiveTab] = useState("candidate");
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };
  const dispatch = useDispatch();
  return (
    <div
      className="modal fade"
      id="loginModal"
      tabIndex={-1}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-fullscreen modal-dialog-centered">
        <div className="container">
          <div className="user-data-form modal-content">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
            <div className="text-center">
              <h2>Hi, Welcome Back!</h2>
              <p>
                Still do not have an account?{" "}
                <Link href="/register">Sign up</Link>
              </p>
            </div>
            <ul className="nav nav-tabs border-0 w-100 mt-30" role="tablist">
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link active"
                  data-bs-toggle="tab"
                  data-bs-target="#fc1"
                  role="tab"
                  aria-selected="true"
                  tabIndex={-1}
                  onClick={() => handleTabChange("candidate")}
                >
                  Candidates
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  data-bs-toggle="tab"
                  data-bs-target="#fc2"
                  role="tab"
                  aria-selected="false"
                  tabIndex={-1}
                  onClick={() => handleTabChange("employer")}
                >
                  Employer
                </button>
              </li>
            </ul>
            <div className="form-wrapper m-auto">
              <LoginForm />
              <div className="d-flex align-items-center mt-30 mb-10">
                <div className="line"></div>
                <span className="pe-3 ps-3">OR</span>
                <div className="line"></div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <a
                    href="#"
                    className="social-use-btn d-flex align-items-center justify-content-center tran3s w-100 mt-10"
                  >
                    <Image src={google} alt="google-img" />
                    <span className="ps-2">Login with Google</span>
                  </a>
                </div>
                <div className="col-md-6">
                  <a
                    onClick={() => dispatch(setLoggerWithLn(activeTab))}
                    href="http://localhost:8000/api/v1/candidate//auth/linkedin"
                    className="social-use-btn d-flex align-items-center justify-content-center tran3s w-100 mt-10"
                  >
                    <Image
                      height={30}
                      width={30}
                      src={
                        "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/LinkedIn_icon_circle.svg/800px-LinkedIn_icon_circle.svg.png"
                      }
                      alt="linkedIn-img"
                    />
                    <span className="ps-2">Signup with LinkedIn</span>
                  </a>
                </div>
              </div>
              <p className="text-center mt-10">
                Do not have an account?{" "}
                <Link href="/register" className="fw-500">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
