import React, { useState } from "react";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useNavigate } from "react-router-dom";
import { Card, Button, Input, Select } from '../../../../shared-elements';
export default function NewProgram({mode, onClose}) {
    const [form, setForm] = useState({
        programName: "",
        affiliation: "",
        department: "Computer Science",
        degree: "Bachelor of Engineering",
        degreeType: "UG/PG/DIPLOMA",
        duration: "",
        terms: "",
        totalCredits: "",
        minCredits: "",
        minArrears: "",
        minAttendance: "",
        businessUnits: ["Christ University, Kengeri"]
    });

    const handleChange = (key) => (e) => setForm({ ...form, [key]: e.target.value });

    const addBusinessUnit = () => {
        setForm(prev => ({ ...prev, businessUnits: [...prev.businessUnits, "Christ University, Kengeri"] }));
    };
    const removeBusinessUnit = (index) => {
        setForm(prev => ({ ...prev, businessUnits: prev.businessUnits.filter((_, i) => i !== index) }));
    };
    const handleBusinessUnitChange = (index) => (e) => {
        const copy = [...form.businessUnits];
        copy[index] = e.target.value;
        setForm(prev => ({ ...prev, businessUnits: copy }));
    };
    const navigate = useNavigate();

    return (
        <div className="p-6">
            {/* Header Bar */}
            {mode === "Update" ? (
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">Edit Program Info</h2>
                    <div className="flex items-center gap-4">
     
                        <Button
                            variant="cancel"
                            size="small"
                            className="normal-case"
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="primary"
                            size="small"
                            className="!uppercase"
                            onClick={onClose}
                        >
                            Update
                        </Button>
                    </div>
                </div>
            ) : (
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">Launch New Program</h2>
                    <div className="flex items-center gap-4">
                        <Button
                            variant="addButton"
                            size="small"
                        >
                            <AddIcon fontSize="small" />
                            Upload
                            <KeyboardArrowDownIcon fontSize="small" />
                        </Button>
                        <Button
                            variant="cancel"
                            size="small"
                            className="normal-case"
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="orange"
                            size="small"
                            onClick={() => navigate("/apps/program")}
                            className="normal-case"
                        >
                            Launch
                        </Button>
                    </div>
                </div>
            )}

            <Card className="!shadow-none border">
                    {/* Program Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:w-2/3">
                        <div>
                            <Input
                                label="Program Name"
                                placeholder="Enter here"
                                value={form.programName}
                                onChange={handleChange("programName")}
                                className="!mb-0"
                            />
                        </div>
                        <div>
                            <Input
                                label="Affiliation"
                                placeholder="Enter here"
                                value={form.affiliation}
                                onChange={handleChange("affiliation")}
                                className="!mb-0"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:w-2/3 mt-4">
                        <div>
                            <Select
                                label="Department"
                                value={form.department}
                                onChange={handleChange("department")}
                                options={['Computer Science', 'Information Technology', 'Mechanical', 'Civil'].map(x => ({ value: x, label: x }))}
                                className="!mb-0"
                            />
                        </div>
                        <div>
                            <Select
                                label="Degree"
                                value={form.degree}
                                onChange={handleChange("degree")}
                                options={['Bachelor of Engineering', 'Bachelor of Science', 'Master of Engineering'].map(x => ({ value: x, label: x }))}
                                className="!mb-0"
                            />
                        </div>
                        <div>
                            <Select
                                label="Degree Type"
                                value={form.degreeType}
                                onChange={handleChange("degreeType")}
                                options={['UG/PG/DIPLOMA', 'UG', 'PG', 'Diploma'].map(x => ({ value: x, label: x }))}
                                className="!mb-0"
                            />
                        </div>
                    </div>

                    {/* Academic Detail */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 md:w-1/3">
                        <div>
                            <Input
                                label="Durations"
                                placeholder="Enter here"
                                value={form.duration}
                                onChange={handleChange("duration")}
                                className="!mb-0"
                            />
                        </div>
                        <div>
                            <Select
                                label="No of Terms"
                                value={form.terms}
                                onChange={handleChange("terms")}
                                options={[...Array(12)].map((_, i) => ({ value: String(i + 1).padStart(2, '0'), label: String(i + 1).padStart(2, '0') }))}
                                className="!mb-0"
                            />
                        </div>
                    </div>

                    {/* Program Requirements */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 md:w-1/3">
                        <div>
                            <Input
                                label="Total Credits"
                                placeholder="Enter here"
                                value={form.totalCredits}
                                onChange={handleChange("totalCredits")}
                                className="!mb-0"
                            />
                        </div>
                        <div>
                            <Input
                                label="Min.Credits"
                                placeholder="Enter here"
                                value={form.minCredits}
                                onChange={handleChange("minCredits")}
                                className="!mb-0"
                            />
                        </div>
                        <div>
                            <Input
                                label="Min.Arrears Allowed"
                                placeholder="Enter here"
                                value={form.minArrears}
                                onChange={handleChange("minArrears")}
                                className="!mb-0"
                            />
                        </div>
                        <div>
                            <Input
                                label="Min.Attendance %"
                                placeholder="Enter here"
                                value={form.minAttendance}
                                onChange={handleChange("minAttendance")}
                                className="!mb-0"
                            />
                        </div>
                    </div>

                    {/* Assign Business Units */}
                    <div className="grid grid-cols-1 mt-4 md:w-2/5 gap-y-2">
                        <div className="text-[12px] text-gray-500">Select Business unit</div>

                        {form.businessUnits.map((bu, index) => (
                            <div key={index} className="grid grid-cols-[1fr_auto] gap-2 items-center mb-2">
                                <Select
                                    value={bu}
                                    onChange={handleBusinessUnitChange(index)}
                                    options={['Christ University, Kengeri', 'Christ University, Bannerghatta', 'Christ University, Main'].map(x => ({ value: x, label: x }))}
                                    className="!mb-0"
                                />
                                <IconButton aria-label="delete" color="error" onClick={() => removeBusinessUnit(index)} disabled={form.businessUnits.length === 1}>
                                    <DeleteOutlineIcon fontSize="small" />
                                </IconButton>
                            </div>
                        ))}

                    </div>
                    <div className="mt-2">
                        <Button
                            onClick={addBusinessUnit}
                            variant="outline"
                            size="small"
                            className="px-2 py-2 border-blue-400 text-blue-700 !rounded-full hover:bg-gray-100 w-32 !uppercase"
                        >
                            + Business Unit
                        </Button>
                    </div>
            </Card>
        </div>
    );
}
