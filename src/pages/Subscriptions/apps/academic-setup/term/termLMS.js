import React, { useState } from 'react';
import {
    Chip,
    Divider,
    Switch,
} from '@mui/material';
import { Edit, Check, Create, CalendarToday } from '@mui/icons-material';
import dayjs from 'dayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Button, Card, Input, Select, Checkbox, Tabs, ContentLayout } from "../../../../../shared-elements";

export default function TermLMS() {
    const [activeTab, setActiveTab] = useState(0); // General
    const [mappingLevel, setMappingLevel] = useState('Subjects');
    const [sessionType, setSessionTypel] = useState('Online');
    const [learningMode, setLearningMode] = useState('Blended');
    const [commonCurriculum, setCommonCurriculum] = useState(false);
    const [enabled, setEnabled] = useState(true);
    const [tocLevel, setTocLevel] = useState(true); // Level 2 when true
    const [contentLevel, setContentLevel] = useState(false);
    const [linearProgress, setLinearProgress] = useState(false);
    const [autoSession, setAutoSession] = useState(false);
    const [personalizedEnabled, setPersonalizedEnabled] = useState(true);
    const [contentType, setContentType] = useState('All');
    const [assessmentType, setAssessmentType] = useState('All');
    // performance remarks state
    const [remarksEditing, setRemarksEditing] = useState(false);
    const [remarks, setRemarks] = useState([
        { min: 0, max: 34, remark: 'Poor' },
        { min: 35, max: 50, remark: 'Average' },
        { min: 51, max: 70, remark: 'Satisfactory' },
        { min: 71, max: 80, remark: 'Good' },
        { min: 81, max: 100, remark: 'Excellent' }
    ]);
    const [remarksDraft, setRemarksDraft] = useState(remarks);
    const [videoSizeLimit, setVideoSizeLimit] = useState('100 GB');
    // online session edit state
    const [onlineEditing, setOnlineEditing] = useState(false);
    const [onlineSession, setOnlineSession] = useState({
        provider: 'Gmeet',
        accId: '',
        apiId: '',
        secretKey: ''
    });
    // resources tab states
    const [docLimit, setDocLimit] = useState('20 GB');
    const [videoLimit, setVideoLimit] = useState('20 GB');
    const [otherLimit, setOtherLimit] = useState('20 GB');
    const [docEditing, setDocEditing] = useState(false);
    const [videoEditing, setVideoEditing] = useState(false);
    const [otherEditing, setOtherEditing] = useState(false);
    // attendance tab states
    const [attendanceType, setAttendanceType] = useState('All');
    const [biometricEditing, setBiometricEditing] = useState(false);
    const [biometric, setBiometric] = useState({
        apiId: 'Sample text goes here',
        secretKey: '######',
        createdDate: '12/06/2024',
        status: 'Active'
    });

    const tabsData = [
        { label: "General", value: 0 },
        { label: "Session", value: 1 },
        { label: "Personalized Learning", value: 2 },
        { label: "Assessments", value: 3 },
        { label: "Resources", value: 4 },
        { label: "Attendance", value: 5 },
    ];

    const mappingLevelOptions = [
        { value: "Subjects", label: "Subjects" },
        { value: "Units", label: "Units" },
        { value: "Chapters", label: "Chapters" },
    ];

    const learningModeOptions = [
        { value: "Blended", label: "Blended" },
        { value: "Online", label: "Online" },
        { value: "Offline", label: "Offline" },
    ];

    const sessionTypeOptions = [
        { value: "Online", label: "Online" },
        { value: "Offline", label: "Offline" },
    ];

    const contentTypeOptions = [
        { value: "All", label: "All" },
        { value: "Video", label: "Video" },
        { value: "Document", label: "Document" },
        { value: "Interactive", label: "Interactive" },
    ];

    const assessmentTypeOptions = [
        { value: "All", label: "All" },
        { value: "Video", label: "Video" },
        { value: "Document", label: "Document" },
        { value: "Interactive", label: "Interactive" },
    ];

    const attendanceTypeOptions = [
        { value: "All", label: "All" },
        { value: "Biometric", label: "Biometric" },
        { value: "Manual", label: "Manual" },
    ];

    const biometricStatusOptions = [
        { value: "Active", label: "Active" },
        { value: "Inactive", label: "Inactive" },
    ];

    return (
        <div className="p-6 h-full">
            {/* Header */}
            <div className="flex items-center justify-between mb-4 pb-4 border-b">
                <div>
                    <h1 className="text-[18px] font-semibold text-gray-800">Learning Management System</h1>
                    <div className="flex items-center gap-2 text-[11px] text-gray-500">
                        <span>Renewal date: 12/06/2025</span>
                        <Chip size="small" label="Expired" className="!bg-red-100 !text-red-600 !h-5 !rounded !font-semibold !text-[12px]" />
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <ContentLayout className="mt-4">
                <div className="px-4 pt-4">
                    <Tabs
                        tabs={tabsData}
                        value={activeTab}
                        onChange={setActiveTab}
                        indicatorColor="#A3650F"
                        className="flex-1"
                    />
                </div>
                <Divider />

                {/* General Tab Content */}
                {activeTab === 0 && (
                    <div className="p-5 md:w-2/3">
                        <Card className="!shadow-none !rounded-xl border">
                            <div className="flex items-center justify-between px-2 py-3">
                                <div className="text-[14px] font-semibold text-purple-700">LMS Preferences</div>
                                <div className="flex items-center gap-3 text-xs text-gray-500">
                                    <span>Last modified on 12/02/2025 | by Chetan kumar.V</span>
                                    <div className="flex items-center gap-2">
                                        <Switch size="small" color="success" checked={enabled} onChange={(e) => setEnabled(!enabled)} />
                                        <span className="uppercase text-[11px] tracking-wide text-gray-600 font-semibold">{enabled ? "ENABLE" : "DISABLE"}</span>
                                    </div>
                                </div>
                            </div>
                            <Divider />

                            <div className="px-1 py-4">
                                {/* Mapping Level */}
                                <div className="mb-5 flex items-center gap-40">
                                    <div className="text-[14px] text-gray-600 mb-1">Mapping Level</div>
                                    <Select
                                        fullWidth={false}
                                        options={mappingLevelOptions}
                                        value={mappingLevel}
                                        onChange={(e) => setMappingLevel(e.target.value)}
                                        className="!min-w-[150px]"
                                        SelectProps={{ size: "small" }}
                                    />
                                </div>

                                {/* Learning Mode */}
                                <div className="mb-2 flex items-center gap-40">
                                    <div className="text-[14px] text-gray-600 mb-1">Learning Mode</div>
                                    <Select
                                        fullWidth={false}
                                        options={learningModeOptions}
                                        value={learningMode}
                                        onChange={(e) => setLearningMode(e.target.value)}
                                        className="!min-w-[150px]"
                                        SelectProps={{ size: "small" }}
                                    />
                                </div>

                                <div className="!mt-1">
                                    <Checkbox
                                        checked={commonCurriculum}
                                        onChange={(e) => setCommonCurriculum(e.target.checked)}
                                        label={<span className="text-[12px] text-gray-700">Common Curriculum</span>}
                                    />
                                </div>

                                <Divider className="!my-4" />

                                {/* Preferred Levels for Table of Contents */}
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-[12px] text-gray-700">Preferred Levels for Table of Contents</span>
                                    <div className="flex items-center gap-3 ml-1">
                                        <Switch
                                            size="small"
                                            checked={tocLevel}
                                            onChange={(e) => setTocLevel(e.target.checked)}
                                            sx={{
                                                "& .MuiSwitch-switchBase.Mui-checked": {
                                                    color: "#AF22C6",
                                                },
                                                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                                                    backgroundColor: "#AF22C6",
                                                },
                                            }}
                                        />
                                        <Chip size="small" label="Level 2" className="!bg-fuchsia-100 !text-fuchsia-700 !h-5 !rounded-md" />
                                    </div>
                                </div>

                                {/* Preferred Level for Content Management */}
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-[12px] text-gray-700">Preferred Level for Content Management</span>
                                    <div className={`flex items-center gap-3 ${contentLevel ? "opacity-100" : "opacity-60"}`}>
                                        <Switch size="small" checked={contentLevel} onChange={(e) => setContentLevel(!contentLevel)}
                                            sx={{
                                                "& .MuiSwitch-switchBase.Mui-checked": {
                                                    color: "#AF22C6",
                                                },
                                                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                                                    backgroundColor: "#AF22C6",
                                                },
                                            }}
                                        />
                                        <Chip size="small" label="Level 2" className="!bg-fuchsia-100 !text-fuchsia-700 !h-5 !rounded-md" />
                                    </div>
                                </div>

                                {/* Learning Progress for Students */}
                                <div className="flex items-center justify-between">
                                    <span className="text-[12px] text-gray-700">Learning Progress for Students</span>
                                    <div className={`flex items-center gap-3 ${linearProgress ? "opacity-100" : "opacity-60"}`}>
                                        <Switch size="small" color="fuchsia" checked={linearProgress} onChange={(e) => setLinearProgress(e.target.checked)}
                                            sx={{
                                                "& .MuiSwitch-switchBase.Mui-checked": {
                                                    color: "#AF22C6",
                                                },
                                                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                                                    backgroundColor: "#AF22C6",
                                                },
                                            }}
                                        />
                                        <Chip size="small" label="Linear" className="!bg-fuchsia-100 !text-fuchsia-700 !h-5 !rounded-md" />
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                )}
                {/* Resources Tab Content */}
                {activeTab === 4 && (
                    <div className="p-3 sm:p-4 md:p-5 w-full max-w-4xl space-y-6">
                        {/* Resources summary */}
                        <Card className="!shadow-none !rounded-xl border">
                            <div className="px-3 sm:px-2 py-3">
                                <div className="text-sm sm:text-[14px] font-semibold text-purple-700">Resources</div>
                            </div>
                            <Divider />
                            <div className="px-3 sm:px-2 py-4">
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-8">
                                    <div className="text-sm sm:text-[14px] text-gray-600">Storage Limit</div>
                                    <div className="text-sm font-semibold text-gray-700">100 GB</div>
                                </div>
                            </div>
                        </Card>

                        {/* Document */}
                        <Card className="!shadow-none !rounded-xl border">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between px-3 sm:px-2 py-3 gap-2">
                                <div className="text-sm sm:text-[14px] font-semibold text-purple-700">Document</div>
                                <div className="text-[10px] sm:text-xs text-gray-500">Last modified on 12/02/2025 | by Chetan kumar.V</div>
                            </div>
                            <Divider />
                            <div className="px-3 sm:px-2 py-4">
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                                    <div className="text-sm sm:text-[14px] text-gray-600">Upload Limit</div>
                                    <div className="flex items-center gap-2">
                                        <Input value={docLimit} onChange={(e) => setDocLimit(e.target.value)} disabled={!docEditing} className="w-[110px] !mb-0" />
                                        {docEditing ? (
                                            <button className="w-8 h-8 bg-green-500 text-white rounded flex items-center justify-center hover:bg-green-600 transition"
                                                onClick={() => setDocEditing(false)}>
                                                <Check fontSize="small" />
                                            </button>
                                        ) : (
                                            <button className="w-8 h-8 text-sky flex items-center justify-center transition"
                                                onClick={() => setDocEditing(true)}>
                                                <Create fontSize="small" color='primary' />
                                            </button>)}
                                    </div>
                                </div>
                                <div className="mt-2 text-[11px] text-gray-500">Supported Formats: MP4</div>
                            </div>
                        </Card>

                        {/* Videos */}
                        <Card className="!shadow-none !rounded-xl border">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between px-3 sm:px-2 py-3 gap-2">
                                <div className="text-sm sm:text-[14px] font-semibold text-purple-700">Videos</div>
                                <div className="text-[10px] sm:text-xs text-gray-500">Last modified on 12/02/2025 | by Chetan kumar.V</div>
                            </div>
                            <Divider />
                            <div className="px-3 sm:px-2 py-4">
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                                    <div className="text-sm sm:text-[14px] text-gray-600">Upload Limit</div>
                                    <div className="flex items-center gap-2">
                                        <Input value={videoLimit} onChange={(e) => setVideoLimit(e.target.value)} disabled={!videoEditing} className="w-[110px] !mb-0" />
                                        {videoEditing ? (
                                            <button className="w-8 h-8 bg-green-500 text-white rounded flex items-center justify-center hover:bg-green-600 transition"
                                                onClick={() => setVideoEditing(false)}>
                                                <Check fontSize="small" />
                                            </button>
                                        ) : (
                                            <button className="w-8 h-8 text-sky flex items-center justify-center transition"
                                                onClick={() => setVideoEditing(true)}>
                                                <Create fontSize="small" color='primary' />
                                            </button>)}
                                    </div>
                                </div>
                                <div className="mt-2 text-[11px] text-gray-500">Supported Formats: MP4</div>
                            </div>
                        </Card>

                        {/* Others */}
                        <Card className="!shadow-none !rounded-xl border">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between px-3 sm:px-2 py-3 gap-2">
                                <div className="text-sm sm:text-[14px] font-semibold text-purple-700">Others</div>
                                <div className="text-[10px] sm:text-xs text-gray-500">Last modified on 12/02/2025 | by Chetan kumar.V</div>
                            </div>
                            <Divider />
                            <div className="px-3 sm:px-2 py-4">
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                                    <div className="text-sm sm:text-[14px] text-gray-600">Upload Limit</div>
                                    <div className="flex items-center gap-2">
                                        <Input value={otherLimit} onChange={(e) => setOtherLimit(e.target.value)} disabled={!otherEditing} className="w-[110px] !mb-0" />
                                        {otherEditing ? (
                                            <button className="w-8 h-8 bg-green-500 text-white rounded flex items-center justify-center hover:bg-green-600 transition"
                                                onClick={() => setOtherEditing(false)}>
                                                <Check fontSize="small" />
                                            </button>
                                        ) : (
                                            <button className="w-8 h-8 text-sky flex items-center justify-center transition"
                                                onClick={() => setOtherEditing(true)}>
                                                <Create fontSize="small" color='primary' />
                                            </button>)}
                                    </div>
                                </div>
                                <div className="mt-2 text-[11px] text-gray-500">Supported Formats: MP4</div>
                            </div>
                        </Card>
                    </div>
                )}
                {activeTab === 1 && (
                    <div className="p-5 md:w-2/3 lg:w-1/2">
                        <Card className="!shadow-none !rounded-xl border">
                            <div className="flex items-center justify-between px-2 py-3">
                                <div className="text-[14px] font-semibold text-purple-700"> Session</div>
                                <div className="flex items-center gap-3 text-xs text-gray-500">
                                    <span>Last modified on 12/02/2025 | by Chetan kumar.V</span>
                                    <div className="flex items-center gap-2">
                                        <Switch size="small" color="success" checked={enabled} onChange={(e) => setEnabled(!enabled)} />
                                        <span className="uppercase text-[11px] tracking-wide text-gray-600 font-semibold">{enabled ? "ENABLE" : "DISABLE"}</span>
                                    </div>
                                </div>
                            </div>
                            <Divider />

                            <div className="px-2 py-4">
                                {/* Mapping Level */}
                                <div className="mb-5 flex items-center gap-40">
                                    <div className="text-[14px] text-gray-600 mb-1">Session Type</div>
                                    <Select
                                        fullWidth={false}
                                        options={sessionTypeOptions}
                                        value={sessionType}
                                        onChange={(e) => setSessionTypel(e.target.value)}
                                        className="!min-w-[150px]"
                                        SelectProps={{ size: "small" }}
                                    />
                                </div>



                                <div className="!mt-1">
                                    <Checkbox
                                        checked={autoSession}
                                        onChange={(e) => setAutoSession(e.target.checked)}
                                        label={
                                            <div className="flex flex-col text-[12px] text-gray-700 leading-tight pt-2">
                                                <span>Auto Session</span>
                                                <span className="text-[11px] text-gray-500">Subscribe for Time table</span>
                                            </div>
                                        }
                                    />
                                </div>



                            </div>
                        </Card>
                        <Card className="!shadow-none !rounded-xl border mt-4">
                            <div className="flex items-center justify-between px-2 py-3">
                                <div className="text-[14px] font-semibold text-purple-700">Online Session</div>
                                <div className="flex items-center gap-4 text-xs text-gray-500">
                                    <span>Last modified on 12/02/2025 | by Chetan kumar.V</span>
                                    {onlineEditing ? (
                                        <div className="flex items-center gap-2">
                                            <Button size="small" variant="outline" className="normal-case" onClick={() => setOnlineEditing(false)}>Cancel</Button>
                                            <Button size="small" variant="primary" className="normal-case !bg-sky-500" onClick={() => setOnlineEditing(false)}>Update</Button>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-1 cursor-pointer" onClick={() => setOnlineEditing(true)}>
                                            <Edit fontSize="small" color="primary" />
                                            <span className="uppercase text-[11px] tracking-wide text-sky-600 font-semibold">EDIT</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <Divider />

                            <div className="px-3 sm:px-2 py-4">
                                {onlineEditing ? (
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-2 md:gap-4">
                                            <label className="text-[12px] text-gray-700 font-semibold">Service Provider</label>
                                            <Input className="md:col-span-3 w-48 !mb-0" value={onlineSession.provider} onChange={(e) => setOnlineSession({ ...onlineSession, provider: e.target.value })} />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-2 md:gap-4">
                                            <label className="text-[12px] text-gray-700 font-semibold">Acc.Id</label>
                                            <Input className="md:col-span-3 w-48 !mb-0" value={onlineSession.accId} onChange={(e) => setOnlineSession({ ...onlineSession, accId: e.target.value })} placeholder="Enter here" />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-2 md:gap-4">
                                            <label className="text-[12px] text-gray-700 font-semibold">API Id</label>
                                            <Input className="md:col-span-3 w-48 !mb-0" value={onlineSession.apiId} onChange={(e) => setOnlineSession({ ...onlineSession, apiId: e.target.value })} placeholder="Enter here" />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-2 md:gap-4">
                                            <label className="text-[12px] text-gray-700 font-semibold">Secret Key</label>
                                            <Input className="md:col-span-3 w-48 !mb-0" value={onlineSession.secretKey} onChange={(e) => setOnlineSession({ ...onlineSession, secretKey: e.target.value })} placeholder="Enter here" />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 gap-2 sm:gap-4">
                                        {/* Service Provider */}
                                        <div className="grid grid-cols-2 gap-2 items-center">
                                            <span className="text-[11px] sm:text-[12px] text-gray-700 font-semibold">Service Provider</span>
                                            <span className="text-[11px] sm:text-[12px] text-orange-700 font-semibold">{onlineSession.provider}</span>
                                        </div>

                                        {/* Acc.Id */}
                                        <div className="grid grid-cols-2 gap-2 items-center">
                                            <span className="text-[11px] sm:text-[12px] text-gray-700 font-semibold">Acc.Id</span>
                                            <span className="text-[11px] sm:text-[12px] text-gray-700 font-semibold">{onlineSession.accId || 'Sample text goes here'}</span>
                                        </div>

                                        {/* API Id */}
                                        <div className="grid grid-cols-2 gap-2 items-center">
                                            <span className="text-[11px] sm:text-[12px] text-gray-700 font-semibold">API Id</span>
                                            <span className="text-[11px] sm:text-[12px] text-gray-700 font-semibold">{onlineSession.apiId || 'Sample text goes here'}</span>
                                        </div>

                                        {/* Secret Key */}
                                        <div className="grid grid-cols-2 gap-2 items-center">
                                            <span className="text-[11px] sm:text-[12px] text-gray-700 font-semibold">Secret Key</span>
                                            <span className="text-[11px] sm:text-[12px] text-gray-700 font-semibold">{onlineSession.secretKey ? '••••••' : '####'}</span>
                                        </div>

                                        {/* Created Date */}
                                        <div className="grid grid-cols-2 gap-2 items-center">
                                            <span className="text-[11px] sm:text-[12px] text-gray-700 font-semibold">Created date</span>
                                            <span className="text-[11px] sm:text-[12px] text-gray-700 font-semibold">12/06/2024</span>
                                        </div>

                                        {/* Status */}
                                        <div className="grid grid-cols-2 gap-2 items-center">
                                            <span className="text-[11px] sm:text-[12px] text-gray-700 font-semibold">Status</span>
                                            <span className="text-[11px] sm:text-[12px] text-green-700 font-semibold">Active</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </Card>
                    </div>
                )}

                {/* Personalized Learning Tab Content */}
                {activeTab === 2 && (
                    <div className="p-3 sm:p-4 md:p-5 w-full max-w-4xl space-y-6">
                        {/* Personalized Learnings Section */}
                        <Card className="!shadow-none !rounded-xl border">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between px-3 sm:px-2 py-3 gap-2">
                                <div className="text-sm sm:text-[14px] font-semibold text-purple-700">Personalized Learnings</div>
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 text-xs text-gray-500">
                                    <span className="text-[10px] sm:text-xs">Last modified on 12/02/2025 | by Chetan kumar.V</span>
                                    <div className="flex items-center gap-2">
                                        <Switch
                                            size="small"
                                            color="success"
                                            checked={personalizedEnabled}
                                            onChange={(e) => setPersonalizedEnabled(e.target.checked)}
                                        />
                                        <span className="uppercase text-[10px] sm:text-[11px] tracking-wide text-gray-600 font-semibold">
                                            {personalizedEnabled ? "ENABLE" : "DISABLE"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <Divider />

                            <div className="px-3 sm:px-2 py-4">
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-8">
                                    <div className="text-sm sm:text-[14px] text-gray-600">Content Type</div>
                                    <Select
                                        fullWidth={false}
                                        options={contentTypeOptions}
                                        value={contentType}
                                        onChange={(e) => setContentType(e.target.value)}
                                        className="!min-w-[150px]"
                                        SelectProps={{ size: "small" }}
                                    />
                                </div>
                            </div>
                        </Card>

                        {/* SCORM Content Section */}
                        <Card className="!shadow-none !rounded-xl border">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between px-3 sm:px-2 py-3 gap-2">
                                <div className="text-sm sm:text-[14px] font-semibold text-purple-700">SCORM Content</div>
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 text-xs text-gray-500">
                                    <span className="text-[10px] sm:text-xs">Last modified on 12/02/2025 | by Chetan kumar.V</span>
                                    <button className="flex items-center gap-1 text-sky-700 rounded text-[12px] font-semibold transition">
                                        <Edit fontSize="small" color='primary' />
                                        Edit
                                    </button>
                                </div>
                            </div>
                            <Divider />

                            <div className="px-3 sm:px-2 py-4">
                                <div className="space-y-2">
                                    <div className="text-sm text-gray-400">Place holder</div>
                                    <div className="text-sm text-gray-400">Place holder</div>
                                    <div className="text-sm text-gray-400">Place holder</div>
                                    <div className="text-sm text-gray-400">Place holder</div>
                                </div>
                            </div>
                        </Card>

                        {/* VIDEO Content Section */}
                        <Card className="!shadow-none !rounded-xl border">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between px-3 sm:px-2 py-3 gap-2">
                                <div className="text-sm sm:text-[14px] font-semibold text-purple-700">VIDEO Content</div>
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 text-xs text-gray-500">
                                    <span className="text-[10px] sm:text-xs">Last modified on 12/02/2025 | by Chetan kumar.V</span>
                                </div>
                            </div>
                            <Divider />

                            <div className="px-3 py-4">
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                                    <div className="text-sm sm:text-[14px] text-gray-600">Video Size Limit</div>
                                    <div className="flex items-center gap-2">
                                        <Input
                                            type="text"
                                            value={videoSizeLimit}
                                            onChange={(e) => setVideoSizeLimit(e.target.value)}
                                            className="border rounded-md text-sm w-24 !mb-0"
                                        />
                                        <button className="w-8 h-8 bg-green-500 text-white rounded flex items-center justify-center hover:bg-green-600 transition">
                                            <Check fontSize="small" />
                                        </button>
                                        <button className="w-8 h-8 bg-blue-500 text-white rounded flex items-center justify-center hover:bg-blue-600 transition">
                                            <Create fontSize="small" />
                                        </button>
                                    </div>
                                </div>
                                <div className="mt-2 text-xs text-gray-500">Supported Formats: MP4</div>
                            </div>
                        </Card>
                    </div>
                )}
                {activeTab === 3 && (
                    <div className="p-3 sm:py-4 md:py-5 w-full max-w-4xl space-y-6">
                        {/* Personalized Learnings Section */}
                        <Card className="!shadow-none !rounded-xl border">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between !px-3 sm:!px-3 !pb-3 !pt-2 gap-2">
                                <div className="text-sm sm:text-[14px] font-semibold text-purple-700">Assessments</div>
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 text-xs text-gray-500">
                                    <span className="text-[10px] sm:text-xs">Last modified on 12/02/2025 | by Chetan kumar.V</span>

                                </div>
                            </div>
                            <Divider />

                            <div className="px-2 py-4">
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-8">
                                    <div className="text-sm sm:text-[14px] text-gray-800 font-semibold">Assignment Type</div>
                                    <Select
                                        fullWidth={false}
                                        options={assessmentTypeOptions}
                                        value={assessmentType}
                                        onChange={(e) => setAssessmentType(e.target.value)}
                                        className="!min-w-[150px]"
                                        SelectProps={{ size: "small" }}
                                    />
                                </div>
                            </div>
                        </Card>
                        <Card className="!shadow-none !rounded-xl border">
                            <div className="!p-2">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between !px-3 !pb-3 !pt-2 gap-3">
                                    <div className="text-sm sm:text-[14px] font-semibold text-purple-700">Performance Remarks</div>
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 text-gray-500">
                                        <span className="text-[10px] text-xs">Last modified on 12/02/2025 | by Chetan kumar.V</span>
                                        {!remarksEditing && (

                                            <button className='text-blue-500 flex items-center gap-1 text-[13px]' onClick={() => { setRemarksDraft(remarks); setRemarksEditing(true); }}>
                                                <Edit fontSize='inherit' color='primary' /><span className='ml-1'>Edit</span>
                                            </button>
                                        )}
                                    </div>
                                </div>
                                <Divider />

                                <div className="px-1 sm:px-2 pt-4">
                                    {/* Table header */}
                                    <div className="grid grid-cols-2 sm:grid-cols-6 text-[14px] text-gray-800 font-semibold px-2 sm:px-3 py-2">
                                        <span className="col-span-3 sm:col-span-3">Percentage</span>
                                        <span className="col-span-3 sm:col-span-3">Remarks</span>
                                    </div>

                                    {/* Rows */}
                                    <div className="">
                                        {(remarksEditing ? remarksDraft : remarks).map((row, idx) => (
                                            <div key={idx} className="grid grid-cols-2 sm:grid-cols-6 items-center px-2 sm:px-3 py-2">
                                                {/* Percentage range */}
                                                <div className="col-span-3 sm:col-span-3 flex items-center gap-6 text-[12px] text-gray-700">
                                                    {remarksEditing ? (
                                                        <>
                                                            <Input value={row.min} onChange={(e) => {
                                                                const v = e.target.value; const copy = [...remarksDraft]; copy[idx] = { ...copy[idx], min: v }; setRemarksDraft(copy);
                                                            }} className="w-16 !mb-0" />
                                                            <Input value={row.max} onChange={(e) => {
                                                                const v = e.target.value; const copy = [...remarksDraft]; copy[idx] = { ...copy[idx], max: v }; setRemarksDraft(copy);
                                                            }} className="w-16 !mb-0" />
                                                        </>
                                                    ) : (
                                                        <>
                                                            <span>{row.min}%</span>
                                                            <span>{row.max}%</span>
                                                        </>
                                                    )}
                                                </div>
                                                {/* Remark */}
                                                <div className="col-span-3 sm:col-span-3 text-[12px] text-gray-700">
                                                    {remarksEditing ? (
                                                        <Input value={row.remark} onChange={(e) => {
                                                            const copy = [...remarksDraft]; copy[idx] = { ...copy[idx], remark: e.target.value }; setRemarksDraft(copy);
                                                        }} className="w-48 !mb-0" />
                                                    ) : (
                                                        <span>{row.remark}</span>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Footer actions */}
                                    <div className="flex justify-end mt-4">
                                        {remarksEditing ? (
                                            <div className="flex items-center gap-2">
                                                <Button size="small" variant="outline" className="normal-case" onClick={() => { setRemarksDraft(remarks); setRemarksEditing(false); }}>Cancel</Button>
                                                <Button size="small" variant="primary" className="normal-case !bg-sky-500" onClick={() => { setRemarks(remarksDraft); setRemarksEditing(false); }}>Update</Button>
                                            </div>
                                        ) : (
                                            <></>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Card>

                    </div>
                )}
                {/* Attendance Tab Content */}
                {activeTab === 5 && (
                    <div className="p-3 sm:p-4 md:p-5 w-full max-w-4xl space-y-6">
                        {/* Attendance */}
                        <Card className="!shadow-none !rounded-xl border">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between px-2 py-3 gap-2">
                                <div className="text-sm sm:text-[14px] font-semibold text-purple-700">Attendance</div>
                                <div className="text-[10px] sm:text-xs text-gray-500">Last modified on 12/02/2025 | by Chetan kumar.V</div>
                            </div>
                            <Divider />
                            <div className="px-2 pt-4">
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-8">
                                    <div className="text-sm sm:text-[14px] text-gray-600">Attendance Type</div>
                                    <Select
                                        fullWidth={false}
                                        options={attendanceTypeOptions}
                                        value={attendanceType}
                                        onChange={(e) => setAttendanceType(e.target.value)}
                                        className="!min-w-[150px]"
                                        SelectProps={{ size: "small" }}
                                    />
                                </div>
                            </div>
                        </Card>

                        {/* Biometric */}
                        <Card className="!shadow-none !rounded-xl border">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between px-3 pb-2 gap-2">
                                <div className="text-sm sm:text-[14px] font-semibold text-purple-700">Biometric</div>
                                <div className="flex items-center gap-4 text-xs text-gray-500">
                                    <span className="text-[10px] sm:text-xs">Last modified on 12/02/2025 | by Chetan kumar.V</span>
                                    {biometricEditing ? (
                                        <button className="w-8 h-8 bg-green-500 text-white rounded flex items-center justify-center hover:bg-green-600 transition" onClick={() => setBiometricEditing(false)}>
                                            <Check fontSize="small" />
                                        </button>
                                    ) : (
                                        <button className="w-8 h-8 text-sky-500 text-[14px] flex items-center justify-center transition gap-1" onClick={() => setBiometricEditing(true)}>
                                            <Create fontSize="inherit" color='primary' /> Edit
                                        </button>
                                    )}
                                </div>
                            </div>
                            <Divider />
                            <div className="px-3 sm:px-2 py-4">
                                <div className="gap-4">
                                    {/* Left: read-only list */}


                                    {/* Right: editable form (shown in edit mode) */}
                                    {biometricEditing ? (
                                        <div className="space-y-4">
                                            {/* API Id */}
                                            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-2 md:gap-4">
                                                <label className="text-[12px] text-gray-600">API Id</label>
                                                <Input
                                                    value={biometric.apiId}
                                                    onChange={(e) => setBiometric({ ...biometric, apiId: e.target.value })}
                                                    className="md:col-span-3 w-1/2 !mb-0"
                                                />
                                            </div>

                                            {/* Secret Key */}
                                            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-2 md:gap-4">
                                                <label className="text-[12px] text-gray-600">Secret Key</label>
                                                <Input
                                                    value={biometric.secretKey}
                                                    onChange={(e) => setBiometric({ ...biometric, secretKey: e.target.value })}
                                                    className="md:col-span-3 w-1/2 !mb-0"
                                                />
                                            </div>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>

                                                {/* Created Date */}
                                                <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-2 md:gap-4">
                                                    <label className="text-[12px] text-gray-600 mb-1">Created Date</label>
                                                    <DatePicker
                                                        value={biometric.createdDate ? dayjs(biometric.createdDate, "DD-MM-YYYY") : null}
                                                        onChange={(newValue) =>
                                                            setBiometric({ ...biometric, createdDate: newValue ? newValue.format("DD-MM-YYYY") : "" })
                                                        }
                                                        format="DD-MM-YYYY"
                                                        slots={{ openPickerIcon: CalendarToday }}
                                                        slotProps={{
                                                            textField: {
                                                                size: "small",
                                                                fullWidth: false,
                                                                className: "md:col-span-3 w-1/2",
                                                            },
                                                        }}
                                                    />

                                                </div>
                                            </LocalizationProvider>


                                            {/* Status */}
                                            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-2 md:gap-4">
                                                <label className="text-[12px] text-gray-600">Status</label>
                                                <Select
                                                    fullWidth={false}
                                                    options={biometricStatusOptions}
                                                    value={biometric.status}
                                                    onChange={(e) => setBiometric({ ...biometric, status: e.target.value })}
                                                    className="md:col-span-3 w-1/2"
                                                    SelectProps={{ size: "small" }}
                                                />
                                            </div>
                                        </div>
                                    ) :
                                        (
                                            <div className="space-y-3 text-[12px]">
                                                <div className="grid grid-cols-3 gap-2 items-center mb-1">
                                                    <span className="text-gray-600">API Id</span>
                                                    <span className="col-span-2 text-gray-700">{biometric.apiId}</span>
                                                </div>
                                                <div className="grid grid-cols-3 gap-2 items-center">
                                                    <span className="text-gray-600">Secret Key</span>
                                                    <span className="col-span-2 text-gray-700">{biometric.secretKey}</span>
                                                </div>
                                                <div className="grid grid-cols-3 gap-2 items-center">
                                                    <span className="text-gray-600">Created date</span>
                                                    <span className="col-span-2 text-gray-700">{biometric.createdDate}</span>
                                                </div>
                                                <div className="grid grid-cols-3 gap-2 items-center">
                                                    <span className="text-gray-600">Status</span>
                                                    <span className="col-span-2 text-green-700">• Active</span>
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </Card>
                    </div>
                )}
            </ContentLayout>
        </div>
    );
}


