import React, { useEffect, useState } from "react";
import DashboardHeader from "../candidate/dashboard-header";
import { addSmtpConfig, getSmtpConfigs,updateSmtpConfig } from "@/redux/features/smtpConfig/api";
import { addSmtpConfigSuccess, fetchSmtpConfigError, fetchSmtpConfigRequest, fetchSmtpConfigSuccess,updateSmtpConfigSuccess } from "@/redux/features/smtpConfig/slice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";

type IProps = {
    setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;

}



const AdminEmailSettings = ({ setIsOpenSidebar }: IProps) => {
    const dispatch = useAppDispatch();

    const [host, setHost] = useState('');
    const [port, setPort] = useState(587);
    const [secure, setSecure] = useState(false);
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    
    useEffect(() => {
        const fetchData = async () => {
          try {
            dispatch(fetchSmtpConfigRequest());
            const data = await getSmtpConfigs(dispatch);
            
            // Dispatch success action
            dispatch(fetchSmtpConfigSuccess(data));
    
            // Update state based on the fetched SMTP configuration
            setHost(data.host);
            setPort(data.port);
            setSecure(data.secure);
            setUser(data.user);
            setPass(data.pass);
          } catch (error:any) {
            // Dispatch error action
            dispatch(fetchSmtpConfigError(error.message));
    
            // Handle error
            console.error('Error fetching SMTP configuration:', error);
          }
        };
    
        fetchData();
      }, [dispatch]);

    const handleSaveSmtp = async () => {

        const smtpConfig = {
            host,
            port,
            secure,
            user,
            pass,

        };
        try {
            const addedSmtp = await updateSmtpConfig(dispatch, smtpConfig)
            if (addedSmtp) {
                dispatch(updateSmtpConfigSuccess(addedSmtp));
                console.log("SMTP Configuration added successfully");
            }
        }
        catch (error) {
            console.error('Error adding SMTP Configuration:', error);
            // Handle error, e.g., show an error message to the user
        }

    };

    return (
        <div className="dashboard-body">
            <div className="position-relative">
                <DashboardHeader setIsOpenSidebar={setIsOpenSidebar} />
                <div className="d-flex justify-content-between align-items-center  ">
                    <div className=" d-flex gap-3 py-4">

                        <h2 className="main-title mb-0">SMTP Settings</h2>

                    </div>
                </div>
                <div>
                    <div className="dash-input-wrapper input">
                        <label htmlFor="host">
                            Host:
                            <input type="text"
                                id="host"
                                value={host}
                                onChange={(e) => setHost(e.target.value)}

                            />
                        </label>
                        <br />
                        <label>
                            Port:
                            <input type="number" value={port} onChange={(e) => setPort(parseInt(e.target.value, 10))} />
                        </label>
                        <br />
                    </div>
                    <div className="d-flex ">
                        <label className="me-3">
                            Secure:
                        </label>
                        <input className="form-check d-flex" type="checkbox" checked={secure} onChange={(e) => setSecure(e.target.checked)} />
                    </div>
                    {/* <br /> */}
                    <div className="mt-3">
                        <div className="dash-input-wrapper input" >
                            <label>
                                User:
                                <input type="text" value={user} onChange={(e) => setUser(e.target.value)} />
                            </label>
                            <br />
                            <label>
                                Password:
                                <input type={showPassword ? 'text' : 'password'} value={pass} onChange={(e) => setPass(e.target.value)} />
                            </label>
                        </div>


                        <div className="d-flex ">
                            <input className="form-check d-flex me-2" type="checkbox" checked={showPassword} onChange={() => setShowPassword(!showPassword)} />
                            <label className="fs-6 fw-light">
                                Show Password
                            </label>

                        </div>
                    </div>
                    
                    <div className="d-flex justify-content-end " >
                        <button
                            className="d-flex dash-btn-two tran3s me-3 justify-content-center align-items-center mt-5 "
                            onClick={handleSaveSmtp}>Save</button>
                    </div>
                </div>


            </div></div>
    );
};

export default AdminEmailSettings