import React, { useState } from "react";
import { Check as CheckIcon, DriveFileRenameOutline as EditIcon, CalendarToday } from "@mui/icons-material";
import { Switch } from "@mui/material";
// MUI DatePicker and supporting components
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// dayjs for date handling
import dayjs from 'dayjs';
import { Button, Select, Input, Table, SearchBar } from "../../../../shared-elements";

const statusStyles = {
    Active: { dot: "bg-green-500", text: "text-green-600" },
    "Expiring Soon": { dot: "bg-orange-500", text: "text-orange-600" },
    Expired: { dot: "bg-rose-500", text: "text-rose-600" },
    Inactive: { dot: "bg-gray-400", text: "text-gray-500" },
};

const sample = [
    { id: 1, name: "Service name", start: "12/06/2024", end: "12/06/2025", status: "Active", key: "######## ###### ######", enabled: false },
    { id: 2, name: "Service name", start: "12/06/2024", end: "12/06/2025", status: "Expired", key: "", needsKey: true, enabled: false },
    { id: 3, name: "Service name", start: "12/06/2024", end: "12/06/2025", status: "Expiring Soon", key: "######## ###### ######", enabled: true },
    { id: 4, name: "Service name", start: "12/06/2024", end: "12/06/2025", status: "Inactive", key: "######## ###### ######", enabled: false },
    { id: 5, name: "Service name", start: "12/06/2024", end: "12/06/2025", status: "Active", key: "######## ###### ######", enabled: true },
];

const services = ["LMS", "Chat", "Storage", "Analytics"];

export default function ServicesTable({ rows: initialRows = sample }) {
    const [rows, setRows] = useState(initialRows);
    const [editingKeyIndex, setEditingKeyIndex] = useState(null);
    const [keyInputs, setKeyInputs] = useState({});
    const [service, setService] = useState("");
    const [start, setStart] = useState(null);
    const [end, setEnd] = useState(null);

    const disabled = !service || !start || !end;

    const handleAdd = () => {
        if (disabled) return;
        const newRow = {
            id: rows.length + 1,
            name: service,
            start: start.format("DD/MM/YYYY"),
            end: end.format("DD/MM/YYYY"),
            status: "Active",
            key: "",
            enabled: false
        };
        setRows([...rows, newRow]);
        setService("");
        setStart(null);
        setEnd(null);
    };

    const startEditKey = (index) => {
        setEditingKeyIndex(index);
        setKeyInputs({ ...keyInputs, [index]: rows[index].key || "" });
    };

    const cancelEditKey = () => {
        setEditingKeyIndex(null);
    };

    const saveKey = (index) => {
        const newKey = keyInputs[index] || "";
        const updatedRows = [...rows];
        updatedRows[index] = { ...updatedRows[index], key: newKey, needsKey: false };
        setRows(updatedRows);
        setEditingKeyIndex(null);
    };

    const handleToggleEnabled = (index) => {
        const updatedRows = [...rows];
        updatedRows[index] = { ...updatedRows[index], enabled: !updatedRows[index].enabled };
        setRows(updatedRows);
    };

    return (
        <div className="p-6 h-full">
            {/* Heading row */}
            <div className="pb-3 mb-4 border-b flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <h2 className="text-xl font-semibold text-gray-800">Subscription List</h2>

                </div>

                <div className="flex items-center gap-4">
                    <SearchBar placeholder="Search" />
                </div>
            </div>

            {/* Add Subscription Form */}
            <div className="mt-3 flex items-end gap-4">
                {/* Service Name */}
                <div className="w-40">
                    <Select
                        label="Service Name"
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        options={services.map(s => ({ value: s, label: s }))}
                        className="!mb-0"
                        SelectProps={{ size: "small" }}
                    />
                </div>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    {/* Start Date */}
                    <div className="flex flex-col space-y-1">
                        <label className="text-[11px] font-semibold text-gray-700">Start Date</label>
                        <DatePicker
                            value={start}
                            onChange={(newValue) => setStart(newValue)}
                            format="DD-MM-YYYY"
                            slots={{ openPickerIcon: CalendarToday }}
                            slotProps={{
                                textField: {
                                    size: "small",
                                    fullWidth: false,
                                    className: "w-40",
                                },
                                openPickerIcon: {
                                    fontSize: '18px', // reduce icon size
                                    sx: {
                                      fontSize: '18px', // or use 'small', 'medium', 'large'
                                    },
                                  },
                            }}
                        />
                    </div>
                    {/* End Date */}
                    <div className="flex flex-col space-y-1">
                        <label className="text-[11px] font-semibold text-gray-700">End Date</label>
                        <DatePicker
                            value={end}
                            onChange={(newValue) => setEnd(newValue)}
                            format="DD-MM-YYYY"
                            slots={{ openPickerIcon: CalendarToday }}
                            slotProps={{
                                textField: {
                                    size: "small",
                                    fullWidth: false,
                                    className: "w-40",
                                },
                                openPickerIcon: {
                                    fontSize: '18px', // reduce icon size
                                    sx: {
                                      fontSize: '18px', // or use 'small', 'medium', 'large'
                                    },
                                  },
                              
                            }}
                        />
                    </div>
                </LocalizationProvider>

                {/* Add Button */}
                <div className="flex flex-col justify-end">
                    <Button
                        variant="primary"
                        disabled={disabled}
                        onClick={handleAdd}
                        size="small"
                        className="!uppercase !h-9 !px-6"
                    >
                        ADD
                    </Button>
                </div>
            </div>

            {/* Table */}
            <div className="mt-4">
                <Table
                    columns={[
                        { key: "name", label: "SERVICES" },
                        { key: "start", label: "START DATE" },
                        { key: "end", label: "END DATE" },
                        {
                            key: "status",
                            label: "STATUS",
                            render: (value, row) => {
                                const s = statusStyles[value] || statusStyles.Inactive;
                                return (
                                    <span className={`inline-flex items-center gap-2 ${s.text}`}>
                                        <span className={`h-2 w-2 rounded-full ${s.dot}`} />
                                        {value}
                                    </span>
                                );
                            }
                        },
                        {
                            key: "key",
                            label: "ACTIVATION KEY",
                            render: (value, row, index) => {
                                if (row.needsKey || editingKeyIndex === index) {
                                    return (
                                        <div className="flex items-center gap-2">
                                            <Input
                                                value={keyInputs[index] || ""}
                                                onChange={(e) => setKeyInputs({ ...keyInputs, [index]: e.target.value })}
                                                placeholder="Enter new activation key"
                                                className="!mb-0 !w-72 !h-9"
                                            />
                                            <button
                                                className="grid h-9 w-9 place-items-center rounded-md bg-emerald-500 text-white hover:bg-emerald-600"
                                                title="Apply"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    saveKey(index);
                                                }}
                                            >
                                                <CheckIcon fontSize="small" />
                                            </button>
                                            {editingKeyIndex === index && !row.needsKey && (
                                                <button
                                                    className="text-xs text-gray-600 hover:text-gray-800"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        cancelEditKey();
                                                    }}
                                                >
                                                    Cancel
                                                </button>
                                            )}
                                        </div>
                                    );
                                }
                                return (
                                    <div className="flex items-center gap-2 text-gray-700">
                                        <span className="font-mono">{value || "-"}</span>
                                        <button
                                            className="text-gray-400 hover:text-purple-600"
                                            title="Update"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                startEditKey(index);
                                            }}
                                        >
                                            <EditIcon fontSize="small" />
                                        </button>
                                    </div>
                                );
                            }
                        },
                        {
                            key: "enabled",
                            label: "Enable Subscription",
                            render: (value, row, index) => (
                                <Switch
                                    checked={value || false}
                                    onChange={(e) => {
                                        e.stopPropagation();
                                        handleToggleEnabled(index);
                                    }}
                                />
                            )
                        }
                    ]}
                    data={rows}
                    onRowClick={null}
                    headerClassName="bg-gray-100"
                    rowClassName={(row, index) => ""}
                />
            </div>
        </div>
    );
}
