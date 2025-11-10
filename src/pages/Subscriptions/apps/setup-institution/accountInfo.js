import React, { useState } from "react";
import { Edit as EditIcon, Lock as LockIcon, PhoneIphone as PhoneIcon } from "@mui/icons-material";
import { Switch } from "@mui/material";
import School_Logo from '../../../../assets/img/School_Logo.png';
import UpdateBusinessUnit from "./updateBusinessUnit";
import { Dialog, Input, Button, Card, ContentLayout } from "../../../../shared-elements";


export default function AccountInfo() {
    const [enabled, setEnabled] = useState(true);
    const [edit, setEdit] = useState(false);
    const [pwdOpen, setPwdOpen] = useState(false);
    const [form, setForm] = useState({ oldPassword: "", newPassword: "", confirmPassword: "" });
    const [phoneOpen, setPhoneOpen] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [phoneForm, setPhoneForm] = useState({ mobile: "", otp: "" });

    return (
        <div className="h-full">
            {!edit ?
                <div className="p-6">
                    <div className="pb-3 mb-4 border-b flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <h2 className="text-xl font-semibold text-gray-800">Account View</h2>

                        </div>


                    </div>
                    <ContentLayout className="mt-4">
                        {/* Header */}
                        <div className="border-b px-1 pb-4">
                            <div className="text-sm font-medium text-gray-900">User Account</div>
                            <div className="mt-1 text-xs text-gray-500">Christ university, Affiliated, Kengeri</div>
                        </div>

                        {/* Body */}
                        <div className="px-1 pt-4">
                            {/* Meta + toggle */}
                            <div className="mb-6 flex items-center justify-start">
                                <div className="text-[11px] text-gray-500">Created on 12/08/2023</div>
                            </div>
                            <div className="flex gap-6 flex-col md:flex-row mb-6">
                                <div>
                                    <div className="text-[11px] text-gray-500">Username</div>
                                    <div className="mt-1 text-sm text-gray-800">johndavid.s.admin@gmail.com <span className="ml-2 inline-flex items-center rounded bg-green-100 px-1.5 py-0.5 text-[10px] font-medium text-green-700">Active</span></div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-[11px] text-gray-500">ENABLED</span>
                                    <Switch
                                        checked={enabled}
                                        onChange={(e) => setEnabled(e.target.checked)}
                                        sx={{
                                            transform: 'scale(0.8)',
                                            '& .MuiSwitch-switchBase.Mui-checked': {
                                                color: '#2563eb', // blue-600
                                            },
                                            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                                backgroundColor: '#2563eb', // blue-600
                                            },
                                        }}
                                    />
                                </div>


                            </div>

                            {/* Credentials */}
                            <div className="grid grid-cols-1 gap-6">

                                <div>
                                    <div className="text-[11px] text-gray-500">Password</div>
                                    <div className="mt-1 flex items-center gap-3 text-sm text-gray-800">
                                        ****************
                                        <button className="text-blue-600 hover:underline text-xs" onClick={() => setPwdOpen(true)}>Change password</button>
                                    </div>
                                </div>
                                <div>
                                    <div className="text-[11px] text-gray-500">Mobile No</div>
                                    <div className="mt-1 flex items-center gap-3 text-sm text-gray-800">
                                        +91 9988776655
                                        <button className="text-blue-600 hover:underline text-xs" onClick={() => setPhoneOpen(true)}>Change number</button>
                                    </div>
                                </div>
                            </div>

                            {/* Organization block */}
                            <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-9 md:w-3/4">
                                {/* Logo */}
                                <div className="md:col-span-2">
                                    <div className="h-24 w-24 overflow-hidden rounded-lg border bg-white">
                                        <img src={School_Logo} alt="Business Unit Logo" className="h-full w-full object-contain" />
                                    </div>
                                </div>

                                {/* Details */}
                                <div className="md:col-span-7 grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div>
                                        <div className="text-[11px] text-gray-500">Business Unit Name</div>
                                        <div className="mt-1 text-sm text-gray-800">Christ University</div>
                                    </div>
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <div className="text-[11px] text-gray-500">Estd.Year</div>
                                            <div className="mt-1 text-sm text-gray-800">1995</div>
                                        </div>
                                        <button className="ml-4 inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs text-gray-700 hover:bg-gray-50" onClick={() => { setEdit(true) }}>
                                            <EditIcon fontSize="inherit" /> Edit
                                        </button>
                                    </div>
                                    <div>
                                        <div className="text-[11px] text-gray-500">Contact Person</div>
                                        <div className="mt-1 text-sm text-gray-800">John David. T</div>
                                    </div>
                                    <div>
                                        <div className="text-[11px] text-gray-500">Full Address</div>
                                        <div className="mt-1 text-sm text-gray-800 leading-5">
                                            DHARMARAM COLLEGE, Hosur Main Road, Bhavani Nagar, Post, Bengaluru,
                                            Karnataka 560029
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ContentLayout>

                    {/* Change Password Dialog */}
                    <Dialog
                        open={pwdOpen}
                        onClose={() => setPwdOpen(false)}
                        fullWidth
                        maxWidth="xs"
                        title={
                            <span className="flex items-center gap-2">
                                <LockIcon fontSize="small" /> Change Password
                            </span>
                        }
                        actions={
                            <>
                                <Button
                                    variant="orange"
                                    onClick={() => setPwdOpen(false)}
                                >
                                    Save
                                </Button>
                                <Button
                                    variant="cancel"
                                    className="normal-case"
                                    onClick={() => setPwdOpen(false)}
                                >
                                    Cancel
                                </Button>
                            </>
                        }
                    >
                        <div className="space-y-4">
                            <div>
                                <Input
                                    label="Enter Old Password"
                                    type="text"
                                    placeholder="Enter here"
                                    value={form.oldPassword}
                                    onChange={(e) => setForm({ ...form, oldPassword: e.target.value })}
                                    className="!mb-0"
                                />
                            </div>
                            <div>
                                <Input
                                    label="Create New Password"
                                    type="password"
                                    placeholder="Enter here"
                                    value={form.newPassword}
                                    onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
                                    showPasswordToggle={true}
                                    className="!mb-0"
                                />
                                <div className="text-[10px] text-gray-500 mt-1">min 8 characters & include 1 special character @!^-*$%#</div>
                            </div>
                            <div>
                                <Input
                                    label="Re-Enter Password"
                                    type="password"
                                    placeholder="Enter here"
                                    value={form.confirmPassword}
                                    onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                                    showPasswordToggle={true}
                                    className="!mb-0"
                                />
                            </div>
                        </div>
                    </Dialog>

                    {/* Change Mobile Number Dialog */}
                    <Dialog
                        open={phoneOpen}
                        onClose={() => setPhoneOpen(false)}
                        fullWidth
                        maxWidth="xs"
                        title={
                            <span className="flex items-center gap-2">
                                <PhoneIcon fontSize="small" /> Change Mobile Number
                            </span>
                        }
                        actions={
                            <>
                                <Button
                                    variant="orange"
                                    onClick={() => setPhoneOpen(false)}
                                >
                                    Update
                                </Button>
                                <Button
                                    variant="cancel"
                                    onClick={() => setPhoneOpen(false)}
                                >
                                    Cancel
                                </Button>
                            </>
                        }
                    >
                        <div className="space-y-4">
                            <div>
                                <div className="flex items-end gap-2">
                                    <div className="flex-1">
                                        <Input
                                            label="New Mobile Number"
                                            type="text"
                                            placeholder="Enter here"
                                            value={phoneForm.mobile}
                                            onChange={(e) => setPhoneForm({ ...phoneForm, mobile: e.target.value })}
                                            className="!mb-0"
                                        />
                                    </div>
                                    <Button
                                        variant="primary"
                                        size="small"
                                        className="normal-case !bg-sky-500 mb-0"
                                        onClick={() => setOtpSent(true)}
                                    >
                                        Get OTP
                                    </Button>
                                </div>
                                <div className="flex items-center gap-3 mt-2">
                                    {otpSent && <div className="text-[11px] text-emerald-600">OTP Sent Successfully!</div>}
                                    {otpSent && <button className="text-[11px] text-gray-600 underline">Resend OTP</button>}
                                </div>
                            </div>
                            <div>
                                <Input
                                    label="Enter 6 Digit OTP"
                                    type="text"
                                    placeholder="Enter here"
                                    value={phoneForm.otp}
                                    onChange={(e) => setPhoneForm({ ...phoneForm, otp: e.target.value })}
                                    className="!mb-0 !w-1/2"
                                />
                                {otpSent && <div className="text-[10px] text-gray-400 mt-1">Enter Received OTP on {phoneForm.mobile || '9988776655'}</div>}
                            </div>
                        </div>
                    </Dialog>
                </div> :
                <UpdateBusinessUnit onClose={() => setEdit(false)} />
            }
        </div>
    );
}
