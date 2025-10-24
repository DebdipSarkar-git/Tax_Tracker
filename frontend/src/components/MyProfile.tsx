import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const MyProfile: React.FC = () => {
    const uName = useSelector((state: any) => state.login.username);
    const mobileNo = useSelector((state: any) => state.login.mobileNo);
    const email = useSelector((state: any) => state.login.email);
    const addressLine1 = useSelector((state:any) => state.login.addressLine1);
    const addressLine2 = useSelector((state:any) => state.login.addressLine2);
    const area = useSelector((state:any) => state.login.area);
    const city = useSelector((state:any) => state.login.city);
    const state = useSelector((state:any) => state.login.state);
    const pincode = useSelector((state:any) => state.login.pincode);
    const navigate = useNavigate();
    
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header bg-success text-white text-center head">
                        <h3><FontAwesomeIcon icon={faUser} className='mx-2'/>
                           View Profile</h3>
                        </div>
                        <div className="card-body myProfile">
                            <div className="row mb-3 d-flex align-items-center">
                                <div className="col-4">
                                    <label htmlFor='userName'><b>Username:</b></label>
                                </div>
                                <div className="col-8">
                                    <p className="form-control-plaintext mb-0">{uName}</p>
                                </div>
                            </div>
                            <div className="row mb-3 d-flex align-items-center">
                                <div className="col-4">
                                    <label htmlFor='mobileNumber'><b>Mobile Number:</b></label>
                                </div>
                                <div className="col-8">
                                    <p className="form-control-plaintext mb-0">{mobileNo}</p>
                                </div>
                            </div>
                            <div className="row mb-3 d-flex align-items-center">
                                <div className="col-4">
                                    <label htmlFor='email'><b>Email:</b></label>
                                </div>
                                <div className="col-8">
                                    <p className="form-control-plaintext mb-0">{email}</p>
                                </div>
                            </div>
                            <div className="row mb-3 d-flex align-items-center">
                                <div className="col-4">
                                    <label htmlFor='addressLine1'><b>Address Line 1:</b></label>
                                </div>
                                <div className="col-8">
                                    <p className="form-control-plaintext mb-0">{addressLine1}</p>
                                </div>
                            </div>
                            <div className="row mb-3 d-flex align-items-center">
                                <div className="col-4">
                                    <label htmlFor='addressLine2'><b>Address Line 2:</b></label>
                                </div>
                                <div className="col-8">
                                    <p className="form-control-plaintext mb-0">{addressLine2}</p>
                                </div>
                            </div>
                            <div className="row mb-3 d-flex align-items-center">
                                <div className="col-4">
                                    <label htmlFor='area'><b>Area:</b></label>
                                </div>
                                <div className="col-8">
                                    <p className="form-control-plaintext mb-0">{area}</p>
                                </div>
                            </div>
                            <div className="row mb-3 d-flex align-items-center">
                                <div className="col-4">
                                    <label htmlFor='city'><b>City:</b></label>
                                </div>
                                <div className="col-8">
                                    <p className="form-control-plaintext mb-0">{city}</p>
                                </div>
                            </div>
                            <div className="row mb-3 d-flex align-items-center">
                                <div className="col-4">
                                    <label htmlFor='state'><b>State:</b></label>
                                </div>
                                <div className="col-8">
                                    <p className="form-control-plaintext mb-0">{state}</p>
                                </div>
                            </div>
                            <div className="row mb-3 d-flex align-items-center">
                                <div className="col-4">
                                    <label htmlFor='pincode'><b>Pincode:</b></label>
                                </div>
                                <div className="col-8">
                                    <p className="form-control-plaintext mb-0">{pincode}</p>
                                </div>
                            </div>
                            <div className="text-center mt-4">
                                <button className="btn btn-secondary" onClick={() => navigate(-1)}>Back</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};