import React, { useState, useRef } from "react";
import { Switch, Select, MenuItem, Chip, IconButton, TextField, Menu, ListItemIcon, ListItemText } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon, Description as DescriptionIcon, Close as CloseIcon, UploadFile as UploadFileIcon, MoreHoriz, Add, DragIndicator, Check, AddCircleOutline } from "@mui/icons-material";
import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import GetAppIcon from "@mui/icons-material/GetApp";
import AppsIcon from "@mui/icons-material/Apps";
import VerticalAlignTopOutlinedIcon from '@mui/icons-material/VerticalAlignTopOutlined';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import { Card, Button, Tabs, Accordion, Dialog, Input } from "../../../../../shared-elements";

export default function SubjectInfo() {
    const [active, setActive] = useState(true);
    const [version, setVersion] = useState("v1.0");
    const [tab, setTab] = useState(0);
    const [expandedModule, setExpandedModule] = useState(null);
    const [bulkOpen, setBulkOpen] = useState(false);
    const [bulk, setBulk] = useState({ version: "V.2.0.2", file: null });
    const [isCurriculumEditing, setIsCurriculumEditing] = useState(false);
    const [showAddModule, setShowAddModule] = useState(false);
    const [newModule, setNewModule] = useState({ title: "", hours: "15" });
    const [showAddSubModule, setShowAddSubModule] = useState(null); // Track which module to add sub-module to
    const [newSubModule, setNewSubModule] = useState({ title: "", hours: "15" });

    const fileInputRef = useRef(null);

    const handleTabChange = (newValue) => {
        setTab(newValue);
    };

    const tabs = [
        { label: "Subject Info", value: 0 },
        { label: "Criteria", value: 1 },
        { label: "Curriculum", value: 2 }
    ];

    const handleModuleChange = (panel) => (event, isExpanded) => {
        setExpandedModule(isExpanded ? panel : false);
    };

    const handlePickFile = (e) => {
        const f = e.target.files?.[0];
        if (f) setBulk((b) => ({ ...b, file: f }));
    };

    const onAddModule = () => {
        if (!newModule.title.trim()) return;
        const newModuleData = {
            name: newModule.title.trim(),
            created: new Date().toLocaleDateString('en-GB').replace(/\//g, '.'),
            duration: newModule.hours ? `${newModule.hours} Hrs` : "",
            subModules: []
        };
        setModules(prev => [...prev, newModuleData]);
        setNewModule({ title: "", hours: "15" });
        setShowAddModule(false);
    };

    const onCancelAddModule = () => {
        setNewModule({ title: "", hours: "15" });
        setShowAddModule(false);
    };

    const onAddSubModule = (moduleIndex) => {
        if (!newSubModule.title.trim()) return;
        const newSubModuleData = {
            name: newSubModule.title.trim(),
            created: new Date().toLocaleDateString('en-GB').replace(/\//g, '.'),
            duration: newSubModule.hours ? `${newSubModule.hours} Hrs` : "",
        };
        setModules(prev => prev.map((module, index) =>
            index === moduleIndex
                ? { ...module, subModules: [...(module.subModules || []), newSubModuleData] }
                : module
        ));
        setNewSubModule({ title: "", hours: "15" });
        setShowAddSubModule(null);
    };

    const onCancelAddSubModule = () => {
        setNewSubModule({ title: "", hours: "15" });
        setShowAddSubModule(null);
    };

    const navigate = useNavigate();

    const [modules, setModules] = useState([
        {
            name: "Introduction to programming",
            created: "12/02.2025",
            duration: "30 Hrs",
            subModules: [
                { name: "Fundamentals of Programming and Problem solving frame works", duration: "05 Hrs", created: "12/02.2025" },
                { name: "Fundamentals of Programming and Problem solving frame works", duration: "05 Hrs", created: "12/02.2025" },
                { name: "Fundamentals of Programming and Problem solving frame works", duration: "05 Hrs", created: "12/02.2025" },
                { name: "Fundamentals of Programming and Problem solving frame works", duration: "05 Hrs", created: "12/02.2025" },
                { name: "Fundamentals of Programming and Problem solving frame works", duration: "05 Hrs", created: "12/02.2025" }
            ]
        },
        {
            name: "Logics and Frame works",
            created: "12/02.2025",
            duration: "30 Hrs",
            subModules: []
        },
        {
            name: "Conditions and Algorithms",
            created: "12/02.2025",
            duration: "30 Hrs",
            subModules: []
        },
        {
            name: "Testing and Debugging",
            created: "12/02.2025",
            duration: "30 Hrs",
            subModules: []
        },
        {
            name: "Errors and Syntaxes",
            created: "12/02.2025",
            duration: "30 Hrs",
            subModules: []
        }
    ]);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    return (
        <div className="p-4 h-full">
            {/* Header */}
            <div className="flex items-center gap-3 border-b pt-2 pb-4">
                <ArrowBackIcon
                    fontSize="small"
                    onClick={() => navigate("/apps/program/details/term/subject")}
                />
                <h2 className="text-lg font-semibold">Problem Solving and Python Programming</h2>
                <p className="text-[12px] py-1 px-2 bg-orange-100 text-orange-500 font-semibold !rounded">Core</p>
                <p className="text-[12px] py-1 px-2 bg-[#A3650F] !bg-opacity-10 text-[#A3650F] font-semibold !rounded">Core</p>
                <p className="text-[12px] py-1 px-2 bg-[#A3650F] !bg-opacity-10 text-[#A3650F] font-semibold !rounded">PY1347</p>
            </div>

            {/* Tabs + Actions */}
            <div className="bg-white rounded-xl border mt-4 p-4">
                <div className="flex justify-between items-center border-b">
                    <Tabs
                        tabs={tabs}
                        value={tab}
                        onChange={handleTabChange}
                        indicatorColor="#A3650F"
                        className="flex-1"
                    />

                    <div className="flex items-center gap-4">

                        {tab !== 2 &&
                            <>
                                {/* Active Toggle */}
                                <div className="flex items-center gap-2">
                                    <Switch
                                        checked={active}
                                        onChange={() => setActive(!active)}
                                        color="success"
                                        size="small"
                                    />
                                    <span className={`font-medium text-xs ${active ? "text-green-600" : "text-gray-400"}`}>
                                        ACTIVE
                                    </span>
                                </div>

                                {/* Action Buttons */}
                                <Button
                                    variant="transparent"
                                    size="small"
                                    className="text-blue-600 normal-case text-xs"
                                >
                                    <EditIcon fontSize="small" />
                                    Edit
                                </Button>
                                <Button
                                    variant="transparent"
                                    size="small"
                                    className="text-red-600 normal-case text-xs"
                                >
                                    <DeleteIcon fontSize="small" />
                                    Delete
                                </Button>


                            </>
                        }
                        {tab === 2 && !isCurriculumEditing &&
                            <>
                                {/* Active Toggle */}
                                <div className="flex items-center gap-2">
                                    <Switch
                                        checked={active}
                                        onChange={() => setActive(!active)}
                                        color="success"
                                        size="small"
                                    />
                                    <span className={`font-medium text-xs ${active ? "text-green-600" : "text-gray-400"}`}>
                                        ACTIVE
                                    </span>
                                </div>

                                {/* Action Buttons */}
                                <Button
                                    variant="transparent"
                                    size="small"
                                    className="text-blue-600 normal-case text-xs"
                                    onClick={() => setIsCurriculumEditing(!isCurriculumEditing)}
                                >
                                    <EditIcon fontSize="small" />
                                    Edit
                                </Button>
                                <Button
                                    variant="transparent"
                                    size="small"
                                    className="text-red-600 normal-case text-xs"
                                >
                                    <DeleteIcon fontSize="small" />
                                    Delete
                                </Button>

                                <button size="small" onClick={handleClick} variant="outlined" className="!border !rounded-lg !p-1 !text-gray-800 hover:!bg-gray-100">
                                    <MoreHoriz fontSize="small" />
                                </button>
                                <Menu
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={() => { setAnchorEl(null) }}
                                    PaperProps={{
                                        className: "rounded-xl shadow-lg",
                                        style: { minWidth: 150 },
                                    }}
                                >
                                    <MenuItem onClick={() => { setAnchorEl(null) }}>
                                        <ListItemIcon>
                                            <VerticalAlignTopOutlinedIcon fontSize="small" />
                                        </ListItemIcon>
                                        <ListItemText primary="Export" />
                                    </MenuItem>
                                    <MenuItem onClick={() => { setAnchorEl(null) }}>
                                        <ListItemIcon>
                                            <GetAppIcon fontSize="small" />
                                        </ListItemIcon>
                                        <ListItemText primary="Download Template" />
                                    </MenuItem>
                                    <MenuItem onClick={() => { setAnchorEl(null) }}>
                                        <ListItemIcon>
                                            <AppsIcon fontSize="small" />
                                        </ListItemIcon>
                                        <ListItemText primary="More" />
                                    </MenuItem>
                                </Menu>
                                <Button
                                    variant="addButton"
                                    size="medium"
                                    className="normal-case"
                                    onClick={() => setBulkOpen(true)}
                                >
                                    + Bulk Upload
                                </Button>
                            </>
                        }
                    </div>
                </div>

                {/* Subject Info Content */}
                {tab === 2 && (
                    <div className="mt-6">
                        {/* Version info with chips */}
                        <div className="flex items-center gap-2 justify-between">
                            <div className="flex items-center gap-2 mb-6">
                                <div className="flex flex-col">
                                    <span className="text-[16px] font-semibold text-gray-800">Version 1.0</span>
                                    {isCurriculumEditing ? (
                                        <span className="text-[11px] text-gray-500">Edit Version</span>
                                    ) : (
                                        <span className="text-[11px] text-gray-500">
                                            Default | Created on 12/02/2025 | by Chetan kumar.V
                                        </span>
                                    )}
                                </div>
                                <div className="flex gap-2 mt-2">
                                    <span className="text-xs px-2 py-1 rounded bg-purple-100 text-purple-700 font-semibold">
                                        Feb 21
                                    </span>
                                    <span className="text-xs px-2 py-1 rounded bg-purple-100 text-purple-700 font-semibold">
                                        Mar 21
                                    </span>
                                </div>
                            </div>
                            {/* Version Controls */}
                            <div className="flex gap-3">
                                {isCurriculumEditing ? (
                                    <>
                                        <Button variant="cancel" size="small" onClick={() => setIsCurriculumEditing(false)}>
                                            CANCEL
                                        </Button>
                                        <Button variant="outline" size="small" className="normal-case text-fuchsia-600 border-fuchsia-600">
                                            SAVE AS NEW
                                        </Button>
                                        <Button variant="primary" size="small" className="normal-case bg-sky-500 hover:bg-sky-600 rounded">
                                            UPDATE
                                        </Button>
                                    </>
                                ) : (
                                    <Select
                                        size="small"
                                        value={version}
                                        onChange={(e) => setVersion(e.target.value)}
                                        className="!min-w-[140px]"
                                    >
                                        <MenuItem value="v1.0">Version v1.0</MenuItem>
                                        <MenuItem value="v1.1">Version v1.1</MenuItem>
                                        <MenuItem value="v2.0">Version v2.0</MenuItem>
                                    </Select>
                                )}
                            </div>
                        </div>


                        {/* Modules Display */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-700 mb-4">MODULE NAME</h3>
                            {isCurriculumEditing ? (
                                // Edit Mode - Card View with Drag Handles and Action Buttons
                                <div className="space-y-3">
                                    {modules.map((module, index) => (
                                        <div key={index} className="space-y-1">
                                            {/* Main Module Card */}
                                            <Card className="border !shadow-none card-compact">
                                                <div className="">
                                                    <div className="flex items-center gap-4">
                                                        <div className="text-gray-400 cursor-move">
                                                            <DragIndicator fontSize="small" />
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="flex items-center gap-2 mb-1">
                                                                <DescriptionIcon fontSize="small" className="text-purple-600" />
                                                                <span className="text-purple-600 font-medium">{module.name}</span>
                                                            </div>
                                                            <div className="text-xs text-gray-500">Created on {module.created}</div>
                                                        </div>
                                                        {module.duration && (
                                                            <div className="text-orange-600 text-sm font-medium">{module.duration}</div>
                                                        )}
                                                        <div className="flex items-center gap-1">
                                                            <IconButton
                                                                size="small"
                                                                className="!text-gray-600"
                                                                onClick={() => setShowAddSubModule(showAddSubModule === index ? null : index)}
                                                            >
                                                                <Add fontSize="small" />
                                                            </IconButton>
                                                            <IconButton size="small" className="!text-gray-600">
                                                                <EditIcon fontSize="small" />
                                                            </IconButton>
                                                            <IconButton size="small" className="!text-red-500">
                                                                <DeleteIcon fontSize="small" />
                                                            </IconButton>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Card>

                                            {/* Add Sub-module Form */}
                                            {showAddSubModule === index && (
                                                <div className="ml-6">
                                                    <Card className="border !shadow-none card-compact border-blue-300 bg-gray-50">
                                                        <div className="">
                                                            <div className="flex items-center gap-4">
                                                                <div className="text-gray-400">
                                                                    <DescriptionIcon fontSize="small" />
                                                                </div>
                                                                <div className="flex-1">
                                                                    <div className="flex items-center gap-2">
                                                                        <TextField
                                                                            size="small"
                                                                            placeholder="Enter Sub-module Title"
                                                                            value={newSubModule.title}
                                                                            onChange={(e) => setNewSubModule(prev => ({ ...prev, title: e.target.value }))}
                                                                            className="flex-1"
                                                                        />
                                                                        <TextField
                                                                            size="small"
                                                                            value={newSubModule.hours}
                                                                            onChange={(e) => setNewSubModule(prev => ({ ...prev, hours: e.target.value }))}
                                                                            placeholder="15"
                                                                            className="w-20"
                                                                            InputProps={{
                                                                                endAdornment: <span className="text-gray-500 text-sm">Hrs</span>
                                                                            }}
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="flex items-center gap-1">
                                                                    <IconButton size="small" className="!text-green-600" onClick={() => onAddSubModule(index)}>
                                                                        <Check fontSize="small" />
                                                                    </IconButton>
                                                                    <IconButton size="small" className="!text-gray-500" onClick={onCancelAddSubModule}>
                                                                        <CloseIcon fontSize="small" />
                                                                    </IconButton>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Card>
                                                </div>
                                            )}

                                            {/* Sub-modules as Cards */}
                                            {module.subModules && module.subModules.length > 0 && (
                                                <div className="ml-6 space-y-1">
                                                    {module.subModules.map((subModule, subIndex) => (
                                                        <Card key={subIndex} className="border !shadow-none card-compact bg-gray-50">
                                                            <div className="">
                                                                <div className="flex items-center gap-4">
                                                                    <div className="text-gray-400 cursor-move">
                                                                        <DragIndicator fontSize="small" />
                                                                    </div>
                                                                    <div className="flex-1">
                                                                        <div className="flex items-center gap-2 mb-1">
                                                                            <DescriptionIcon fontSize="small" className="text-purple-600" />
                                                                            <span className="text-gray-900 font-medium">{subModule.name}</span>
                                                                        </div>
                                                                        <div className="text-xs text-gray-500">Created on {subModule.created}</div>
                                                                    </div>
                                                                    {subModule.duration && (
                                                                        <div className="text-orange-600 text-sm font-medium">{subModule.duration}</div>
                                                                    )}
                                                                    <div className="flex items-center gap-1">
                                                                        <IconButton size="small" className="!text-gray-600">
                                                                            <EditIcon fontSize="small" />
                                                                        </IconButton>
                                                                        <IconButton size="small" className="!text-red-500">
                                                                            <DeleteIcon fontSize="small" />
                                                                        </IconButton>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Card>
                                                    ))}
                                                </div>
                                            )}


                                        </div>
                                    ))}
                                </div>
                            ) : (
                                // Normal Mode - Accordion View
                                <div className="">
                                    {modules.map((module, index) => (
                                        <Accordion
                                            key={index}
                                            expanded={expandedModule === index}
                                            onChange={handleModuleChange(index)}
                                            summary={
                                                <div className="flex items-center gap-3 w-5/6">
                                                    <FileCopyOutlinedIcon className="text-purple-600" fontSize="small" />
                                                    <div className="flex-1">
                                                        <div className="text-sm font-medium text-purple-800">{module.name}</div>
                                                        <div className="text-xs text-gray-500">Created on {module.created}</div>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-orange-600 font-medium text-sm">{module.duration}</span>
                                                    </div>
                                                </div>
                                            }
                                        >
                                            {module.subModules && module.subModules.length > 0 && (
                                                <div className="">
                                                    {module.subModules.map((subModule, subIndex) => (
                                                        <div key={subIndex} className="">
                                                            <div className="flex items-center gap-3 p-2 px-3 bg-gray-50 rounded border-b">
                                                                <div className="flex items-center gap-3 w-5/6">
                                                                    <DescriptionIcon className="text-purple-600" fontSize="small" />
                                                                    <div className="flex-1">
                                                                        <div className="text-sm font-medium text-gray-800">{subModule.name}</div>
                                                                        <div className="text-xs text-gray-500">Created on {subModule.created}</div>
                                                                    </div>
                                                                    <span className="font-medium text-sm flex justify-start mr-5">{subModule.duration}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </Accordion>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Add Module Section */}
                        {isCurriculumEditing ? (
                            <div className="mt-4">
                                {showAddModule ? (
                                    // Inline Add Module Card
                                    <Card className="border !shadow-none card-compact border-blue-300">
                                        <div className="">
                                            <div className="flex items-center gap-4">
                                                <div className="text-gray-400">
                                                    <DescriptionIcon fontSize="small" />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 my-2">
                                                        <TextField
                                                            size="small"
                                                            placeholder="Enter Module Title"
                                                            value={newModule.title}
                                                            onChange={(e) => setNewModule(prev => ({ ...prev, title: e.target.value }))}
                                                            className="flex-1"
                                                        />
                                                        <TextField
                                                            size="small"
                                                            value={newModule.hours}
                                                            onChange={(e) => setNewModule(prev => ({ ...prev, hours: e.target.value }))}
                                                            placeholder="15"
                                                            className="w-20"
                                                            InputProps={{
                                                                endAdornment: <span className="text-gray-500 text-sm">Hrs</span>
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <IconButton size="small" className="!text-green-600" onClick={onAddModule}>
                                                        <Check fontSize="small" />
                                                    </IconButton>
                                                    <IconButton size="small" className="!text-gray-500" onClick={onCancelAddModule}>
                                                        <CloseIcon fontSize="small" />
                                                    </IconButton>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                ) : (
                                    // Add New Button
                                    <div className="flex items-center justify-start">
                                        <Button
                                            variant="transparent"
                                            size="medium"
                                            className="normal-case text-gray-900"
                                            onClick={() => setShowAddModule(true)}
                                        >
                                            <AddCircleOutline />
                                            Add New
                                        </Button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="mt-8 flex items-center justify-center">
                                {/* <div className="flex items-center gap-2 text-blue-600 border-2 border-dashed border-blue-300 rounded-lg p-4 cursor-pointer hover:bg-blue-50">
                                    <span className="text-2xl">×</span>
                                    <span className="text-sm">Add new module or drag and drop</span>
                                </div> */}
                            </div>
                        )}
                    </div>
                )}

                {/* Criteria Tab Content */}
                {tab === 1 && (
                    <div className="mt-6">
                        {/* Subject Details Card */}
                        <Card className="rounded-xl border !shadow-none md:w-1/3">
                            <div className="">
                                <div className="text-[11px] text-gray-500 mb-5">
                                    Created on 12/02/2025 | by Chetan kumar.V
                                </div>
                                <div className="grid grid-cols-4 gap-4">

                                    <div className="space-y-1">
                                        <div className="text-[11px] text-gray-600 font-medium">Min.Attendance %</div>
                                        <div className="text-[13px] font-semibold text-purple-700">75</div>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="text-[11px] text-gray-600 font-medium">Total Credits</div>
                                        <div className="text-[13px] font-semibold text-gray-800">200</div>
                                    </div>

                                </div>
                            </div>
                        </Card>
                    </div>
                )}

                {/* Subject Info Tab Content */}
                {tab === 0 && (
                    <div className="mt-6">
                        {/* Subject Details Card */}
                        <Card className="rounded-xl border !shadow-none md:w-2/3">
                            <div className="">
                                <div className="text-[11px] text-gray-500 mb-5">
                                    Created on 12/02/2025 | by Chetan kumar.V
                                </div>
                                <div className="grid grid-cols-4 gap-4">
                                    <div className="space-y-1">
                                        <div className="text-[12px] text-gray-600 font-medium">Subject Name</div>
                                        <div className="text-[13px] font-semibold text-purple-700">Problem Solving and Python Programming</div>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="text-[12px] text-gray-600 font-medium">Sub Code</div>
                                        <div className="text-[13px] font-semibold text-purple-700">PY1315</div>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="text-[12px] text-gray-600 font-medium">Type</div>
                                        <div className="text-[13px] font-semibold text-gray-800">Theory</div>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="text-[12px] text-gray-600 font-medium">Category</div>
                                        <div className="text-[13px] font-semibold text-gray-800">Practical</div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                )}
            </div>

            <Dialog
                open={bulkOpen}
                onClose={() => setBulkOpen(false)}
                title={
                    <div className="flex items-center gap-2">
                        <UploadFileIcon fontSize="small" />
                        Bulk Upload
                    </div>
                }
                maxWidth="xs"
                actions={
                    <>
                        <Button variant="orange" size="small" className="uppercase">
                            Upload
                        </Button>
                        <Button variant="outline" size="small" className="normal-case" onClick={() => setBulkOpen(false)}>
                            Cancel
                        </Button>
                    </>
                }
            >
                <div className="space-y-4">
                    <div>
                        <Input
                            label="Version"
                            value={bulk.version}
                            disabled
                            className="w-full"
                        />
                    </div>

                    <div>
                        <Input
                            label="Choose file"
                            value={bulk.file ? bulk.file.name : "Chosen file name"}
                            placeholder="Chosen file name"
                            disabled
                            className="w-full"
                        />
                        <div className="mt-2">
                            <input ref={fileInputRef} type="file" className="sr-only" onChange={handlePickFile} />
                            <Button variant="primary" size="small" className="normal-case bg-sky-500 hover:bg-sky-600" onClick={() => fileInputRef.current?.click()}>
                                Choose file
                            </Button>
                        </div>
                    </div>
                </div>
            </Dialog>

        </div>
    );
}
