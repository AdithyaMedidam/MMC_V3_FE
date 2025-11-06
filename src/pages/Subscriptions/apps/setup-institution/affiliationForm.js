import React, { useState } from "react";
import { IconButton } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";
import { Card, Button, Select, Input, CardGrid } from "../../../../shared-elements";


export default function AffiliationForm({ onClose }) {
    const [form, setForm] = useState({
        affiliationId: "",
        affiliationType: "",
        govBody: "",
        referenceNo: "",
        accBody: "",
        accScore: "",
        startDate: null,
        endDate: null,
        renewalDate: "",
        programs: [""]
    });
    const handleSubmit = () => {
        // your add logic
        console.log("Form submitted");
        onClose(); // this will set formVisible = false in parent
    };

    const handleChange = (key) => (e) => setForm({ ...form, [key]: e.target.value });
    const handleDateChange = (key) => (newValue) => setForm({ ...form, [key]: newValue });

    const addProgram = () => setForm(prev => ({ ...prev, programs: [...prev.programs, ""] }));
    const removeProgram = (index) => setForm(prev => ({ ...prev, programs: prev.programs.filter((_, i) => i !== index) }));

    const programOptions = [
        "B.E Computer Science and Engg",
        "B.E Information Technology",
        "B.E Mechanical Engineering",
        "B.E Civil Engineering"
    ];

    const types = ["Provisional", "Conditional", "Permanent", "Renewal Based"];
    const bodies = ["University Grants Commission", "AICTE", "STATE", "CBSE"];
    const accBodies = ["NBA", "NAAC", "NIRF"];
    const scores = ["A+", "A", "B+"];

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-4 border-b pb-3">
                <h2 className="text-base font-semibold">Add New Affiliation</h2>
                <div className="flex items-center gap-3">
                    <Button variant="cancel" size="small" className="" onClick={onClose}>Cancel</Button>
                    <Button variant="primary" size="small" className="min-w-[80px] !uppercase" onClick={handleSubmit}>Add</Button>
                </div>
            </div>

            <Card className="!shadow-none border rounded-xl">
                <div className="">
                    <CardGrid cols={1} mdCols={3} gap={6}>
                        {/* Affiliation ID */}
                        <div>
                            <Input
                                label="Affiliation ID"
                                placeholder="Enter here"
                                value={form.affiliationId}
                                onChange={handleChange("affiliationId")}
                                className="!mb-0"
                            />
                        </div>
                        {/* Affiliation Type */}
                        <div>
                            <Select
                                label="Affiliation Type"
                                value={form.affiliationType}
                                onChange={(e) => setForm({ ...form, affiliationType: e.target.value })}
                                options={[
                                    { value: "", label: "Select" },
                                    ...types.map(x => ({ value: x, label: x }))
                                ]}
                                className="!mb-0"
                                SelectProps={{ size: "small" }}
                            />
                        </div>
                        {/* Government Body */}
                        <div>
                            <Select
                                label="Government Body"
                                value={form.govBody}
                                onChange={(e) => setForm({ ...form, govBody: e.target.value })}
                                options={[
                                    { value: "", label: "Select" },
                                    ...bodies.map(x => ({ value: x, label: x }))
                                ]}
                                className="!mb-0"
                                SelectProps={{ size: "small" }}
                            />
                        </div>

                        {/* Reference No */}
                        <div>
                            <Input
                                label="Reference No"
                                placeholder="Enter here"
                                value={form.referenceNo}
                                onChange={handleChange("referenceNo")}
                                className="!mb-0"
                            />
                        </div>
                        {/* Accreditation Body */}
                        <div>
                            <Select
                                label="Accreditation Body"
                                value={form.accBody}
                                onChange={(e) => setForm({ ...form, accBody: e.target.value })}
                                options={[
                                    { value: "", label: "Select" },
                                    ...accBodies.map(x => ({ value: x, label: x }))
                                ]}
                                className="!mb-0"
                                SelectProps={{ size: "small" }}
                            />
                        </div>
                        {/* Accreditation Score */}
                        <div>
                            <Select
                                label="Accreditation Score"
                                value={form.accScore}
                                onChange={(e) => setForm({ ...form, accScore: e.target.value })}
                                options={[
                                    { value: "", label: "Select" },
                                    ...scores.map(x => ({ value: x, label: x }))
                                ]}
                                className="!mb-0"
                                SelectProps={{ size: "small" }}
                            />
                        </div>

                        {/* Start Date */}
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            {/* Start Date */}
                            <div>
                                <label className="input-label text-[11px] text-gray-500 mb-1 block">Start Date</label>
                                <DatePicker
                                    value={form.startDate ? dayjs(form.startDate) : null} onChange={handleDateChange("startDate")}
                                    format="DD-MM-YYYY"
                                    slots={{ openPickerIcon: CalendarTodayIcon }}
                                    slotProps={{
                                        textField: {
                                            size: "small",
                                            fullWidth: true,
                                        },
                                        openPickerButton: { color: 'black' },
                                    }}
                                />
                            </div>

                            {/* End Date */}
                            <div>
                                <label className="input-label text-[11px] text-gray-500 mb-1 block">End Date</label>
                                <DatePicker
                                    value={form.endDate ? dayjs(form.endDate) : null} onChange={handleDateChange("endDate")}
                                    format="DD-MM-YYYY"
                                    slots={{ openPickerIcon: CalendarTodayIcon }}
                                    slotProps={{
                                        textField: {
                                            size: "small",
                                            fullWidth: true,
                                        },
                                    }}
                                />
                            </div>

                            {/* Renewal Date */}
                            <div>
                                <label className="input-label text-[11px] text-gray-500 mb-1 block">Renewal Date</label>
                                <DatePicker
                                    value={form.renewalDate ? dayjs(form.renewalDate) : null}
                                    onChange={handleDateChange("renewalDate")}
                                    format="DD-MM-YYYY"
                                    slots={{ openPickerIcon: CalendarTodayIcon }}
                                    slotProps={{
                                        textField: {
                                            size: "small",
                                            fullWidth: true,
                                        },
                                    }}
                                />
                            </div>
                        </LocalizationProvider>

                    </CardGrid>

                    {/* Programs Affiliated */}
                    <div className="mt-6">
                        <div className="text-[14px] text-gray-500 mb-2">Programs Affiliated</div>
                        {form.programs.map((p, idx) => (
                            <div key={idx} className="grid grid-cols-[1fr_auto] md:w-1/2 items-center gap-2 mb-2">
                                <div>
                                    <Select
                                        label={`Program ${idx + 1}`}
                                        value={p}
                                        onChange={(e) => {
                                            const copy = [...form.programs];
                                            copy[idx] = e.target.value;
                                            setForm(prev => ({ ...prev, programs: copy }));
                                        }}
                                        options={[
                                            // { value: "", label: "Select" },
                                            ...programOptions.map(x => ({ value: x, label: x }))
                                        ]}
                                        className="!mb-0"
                                        SelectProps={{ size: "small" }}
                                    />
                                </div>
                                <IconButton aria-label="delete" color="error" onClick={() => removeProgram(idx)} disabled={form.programs.length === 1}>
                                    <DeleteOutlineIcon fontSize="small" />
                                </IconButton>
                            </div>
                        ))}
                        <Button variant="outline" size="small" onClick={addProgram} className="normal-case !rounded-full mt-1">+ Program</Button>
                    </div>
                </div>
            </Card>
        </div>
    );
}
