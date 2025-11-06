import React, { useMemo, useState } from "react";
import { Switch, Chip } from "@mui/material";
import { Edit as EditIcon } from "@mui/icons-material";
import CheckIcon from "@mui/icons-material/Check";
import { Button, Card, Input, Select, Checkbox, Tabs } from "../../../../../shared-elements";


const initialRows = [
    { level: "01", description: "Remember", value: 15 },
    { level: "02", description: "Understand", value: 15 },
    { level: "03", description: "Apply", value: 15 },
    { level: "04", description: "Analysis", value: 15 },
    { level: "05", description: "Apply", value: 15 },
    { level: "06", description: "Analysis", value: 25 },
];

export default function QABank() {
    const [active, setActive] = useState(true);
    const [rows, setRows] = useState(initialRows);
    const [editing, setEditing] = useState(false);
    const [tab, setTab] = useState(0); // mimic Bloom's Taxonomy tab selected
    const [version, setVersion] = useState(null); // mimic Bloom's Taxonomy tab selected
    const [allTerms, setAllTerms] = useState(false);

    const [general, setGeneral] = useState({
        questionLimit: "05",
        bufferMinutes: "10",
        practiceLimit: "05",
    });

    const [editingField, setEditingField] = useState(null); // 'question' | 'buffer' | 'practice'

    const tabsData = [
        { label: "General", value: 0 },
        { label: "Bloom's Taxonomy", value: 1 },
    ];

    const startEdit = (field) => setEditingField(field);

    const applyEdit = () => {
        // TODO: persist to API if needed
        setEditingField(null);
    };

    const onGeneralChange = (key) => (e) => {
        const v = e.target.value.replace(/[^0-9]/g, "");
        setGeneral((prev) => ({ ...prev, [key]: v }));
    };

    const total = useMemo(() => rows.reduce((acc, r) => acc + Number(r.value || 0), 0), [rows]);

    const handleChangeValue = (index, val) => {
        const v = val.replace(/[^0-9]/g, "");
        setRows(prev => prev.map((r, i) => (i === index ? { ...r, value: v } : r)));
    };

    const handleCancel = () => {
        setRows(initialRows);
        setEditing(false);
    };

    const handleUpdate = () => {
        if (!editing) {
            setEditing(true);
            return;
        }
        // submit logic here
        setEditing(false);
    };

    const handleSaveAsNew = () => {
        // implement versioning save-as-new here
        setEditing(false);
    };

    const versionOptions = [
        { value: "v1.0", label: "Version v1.0" },
        { value: "v1.1", label: "Version v1.1" },
        { value: "v2.0", label: "Version v2.0" },
    ];

    return (
        <div className="h-full">

            <div className="flex items-center justify-between mx-5 py-5 pb-4 border-b">
                <div className="">
                    <h1 className="text-[18px] font-semibold text-gray-800">Question Bank Controls</h1>
                    <div className="flex items-center gap-2 text-[11px] text-gray-500">
                        <span>Renewal date: 12/06/2025</span>
                        <Chip size="small" label="Active" className="!bg-green-100 !text-green-600 !h-5 !rounded !font-semibold !text-[12px]" />
                    </div>
                </div>
            </div>
            <div className="p-5 m-4 pt-3 bg-white rounded-xl border">
                {/* Tabs header */}
                <div className="flex items-center gap-6 border-b">
                    <Tabs 
                        tabs={tabsData}
                        value={tab}
                        onChange={setTab}
                        indicatorColor="#A3650F"
                        className="flex-1"
                    />

                    <div className="ml-auto flex items-center gap-3 py-1">
                        {!editing && tab === 1 && (
                            <>
                                <div className="flex items-center gap-2">
                                    <Switch
                                        checked={active}
                                        onChange={() => setActive(!active)}
                                        color="success"
                                        size="small"
                                    />
                                    <span
                                        className={`font-medium text-xs ${active ? "text-green-600" : "text-gray-400"
                                            }`}
                                    >
                                        {active ? "Active" : "Deactive"}
                                    </span>
                                </div>

                                <Button
                                    variant="transparent"
                                    size="small"
                                    className="!text-blue-600 normal-case text-xs"
                                    onClick={handleUpdate}
                                >
                                    <EditIcon fontSize="small" className="mr-1" />
                                    Edit
                                </Button>
                            </>
                        )}
                    </div>
                </div>

                {tab === 0 ? (
                    /* General tab */
                    <div className="mt-4 space-y-4">
                        {/* Assessment Card */}
                        <Card className="md:w-1/2 border !shadow-none">
                            <div className="flex items-center justify-between py-3 border-b">
                                <div className="text-sm font-semibold text-purple-600">Assessment</div>
                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                    <span>Last modified on 12/02/2025</span>
                                    <div className="flex items-center gap-2">
                                        <Switch checked={true} color="success" size="small" />
                                        <span className="text-[11px] text-green-600 font-medium">Enable</span>
                                    </div>
                                </div>
                            </div>
                            <div className="py-3 text-sm">
                                <div className="flex justify-start gap-8 items-center">
                                    <span className="text-gray-600 w-1/3">Question Usage Limit</span>

                                    {editingField === "question" ? (
                                        <div className="flex items-center gap-2">
                                            <Input
                                                type="number"
                                                value={general.questionLimit}
                                                onChange={onGeneralChange("questionLimit")}
                                                className="!w-20 !mb-0"
                                                inputMode="numeric"
                                                pattern="[0-9]*"
                                                style={{ textAlign: "center" }}
                                            />
                                            <button
                                                className="grid h-7 w-7 place-items-center rounded-md bg-emerald-500 text-white hover:bg-emerald-600"
                                                onClick={applyEdit}
                                                aria-label="apply"
                                            >
                                                <CheckIcon fontSize="small" />
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2">
                                            <span className="text-gray-800 p-4">{general.questionLimit}</span>
                                            <button
                                                className="text-blue-600 text-xs hover:underline"
                                                onClick={() => startEdit("question")}
                                                aria-label="edit"
                                            >
                                                <EditIcon fontSize="small" />
                                            </button>
                                        </div>
                                    )}
                                </div>
                                <div className="flex justify-start gap-8 items-center py-2">
                                    <span className="text-gray-600 w-1/3">Buffer Time in Minutes</span>

                                    {editingField === "buffer" ? (
                                        <div className="flex items-center gap-2">
                                            <Input
                                                type="number"
                                                value={general.bufferMinutes}
                                                onChange={onGeneralChange("bufferMinutes")}
                                                className="!w-20 !mb-0"
                                                inputMode="numeric"
                                                pattern="[0-9]*"
                                                style={{ textAlign: "center" }}
                                            />
                                            <button
                                                className="grid h-7 w-7 place-items-center rounded-md bg-emerald-500 text-white hover:bg-emerald-600"
                                                onClick={applyEdit}
                                                aria-label="apply"
                                            >
                                                <CheckIcon fontSize="small" />
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2">
                                            <span className="text-gray-800 p-4">{general.bufferMinutes}</span>
                                            <button
                                                className="text-blue-600 text-xs hover:underline"
                                                onClick={() => startEdit("buffer")}
                                                aria-label="edit"
                                            >
                                                <EditIcon fontSize="small" />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Card>

                        {/* Practice Session Card */}
                        <Card className="md:w-1/2 border !shadow-none">
                            <div className="flex items-center justify-between py-3 border-b">
                                <div className="text-sm font-semibold text-purple-600">Practice Session</div>
                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                    <span>Last modified on 12/02/2025</span>
                                    <div className="flex items-center gap-2">
                                        <Switch checked={true} color="success" size="small" />
                                        <span className="text-[11px] text-green-600 font-medium">Enable</span>
                                    </div>
                                </div>
                            </div>
                            <div className="py-3 text-sm">
                                <div className="flex justify-start gap-8 items-center ">
                                    <span className="text-gray-600 w-1/3">Limit</span>

                                    {editingField === "practice" ? (
                                        <div className="flex items-center gap-2">
                                            <Input
                                                type="number"
                                                value={general.practiceLimit}
                                                onChange={onGeneralChange("practiceLimit")}
                                                className="!w-20 !mb-0"
                                                inputMode="numeric"
                                                pattern="[0-9]*"
                                                style={{ textAlign: "center" }}
                                            />
                                            <button
                                                className="grid h-7 w-7 place-items-center rounded-md bg-emerald-500 text-white hover:bg-emerald-600"
                                                onClick={applyEdit}
                                                aria-label="apply"
                                            >
                                                <CheckIcon fontSize="small" />
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2">
                                            <span className="text-gray-800 p-4">{general.practiceLimit}</span>
                                            <button
                                                className="text-blue-600 text-xs hover:underline"
                                                onClick={() => startEdit("practice")}
                                                aria-label="edit"
                                            >
                                                <EditIcon fontSize="small" />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Card>
                    </div>
                ) : (
                    <>
                        {editing ? (
                            <div className="flex justify-center">
                                <div className="mt-3">
                                    <div>Version 1.0</div>
                                    <div className="text-xs text-gray-500">Edit Version</div>
                                </div>
                                <div className="ml-auto flex items-center gap-3 py-3">
                                    <Button variant="cancel" size="small" className="" onClick={handleCancel}>
                                        Cancel
                                    </Button>
                                    <Button variant="addButton" size="small" className="" onClick={handleSaveAsNew}>
                                        Save as new
                                    </Button>
                                    <Button variant="primary" size="small" className="" onClick={handleUpdate}>
                                        Update
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex justify-center items-center">
                                <div className="mt-3">
                                    <div>Version 1.0</div>
                                    <div className="text-xs text-gray-500">Created on 12/02/2025 | by Chetan kumar.V</div>
                                </div>
                                <div className="ml-auto flex items-center gap-3 py-3">
                                    <Checkbox
                                        checked={allTerms}
                                        onChange={(e) => setAllTerms(!allTerms)}
                                        label="Apply to All Terms"
                                        className="min-w-[max-content] !mb-0"
                                    />
                                    <Select
                                        options={versionOptions}
                                        value={version}
                                        onChange={(e) => setVersion(e.target.value)}
                                        className="!min-w-[140px]"
                                        SelectProps={{ size: "small" }}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Table */}
                        <div className="mt-4 rounded-lg overflow-hidden border">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-gray-50 text-gray-600">
                                        <th className="px-4 py-3 text-left">LEVEL</th>
                                        <th className="px-4 py-3 text-left">DESCRIPTION</th>
                                        <th className="px-4 py-3 text-left">VALUE (%)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rows.map((row, idx) => (
                                        <tr key={row.level} className={idx % 2 ? "bg-gray-50" : "bg-white"}>
                                            <td className="px-4 py-3 w-24">{row.level}</td>
                                            <td className="px-4 py-3">{row.description}</td>
                                            <td className="px-4 py-2 w-40">
                                                {editing ? (
                                                    <Input
                                                        type="number"
                                                        value={row.value}
                                                        onChange={(e) => handleChangeValue(idx, e.target.value)}
                                                        className="!mb-0"
                                                        inputMode="numeric"
                                                        pattern="[0-9]*"
                                                    />
                                                ) : (
                                                    <span>{row.value}</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                    <tr className="bg-amber-50 font-medium">
                                        <td className="px-4 py-3">TOTAL</td>
                                        <td className="px-4 py-3"></td>
                                        <td className="px-4 py-3">{total}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
