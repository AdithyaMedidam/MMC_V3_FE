import React, { useState } from 'react';
import {
    Chip,
    Divider,
    IconButton
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import DeleteIcon from '@mui/icons-material/Delete';
import { Edit } from '@mui/icons-material';
import { Button, Card, Input, Select, Checkbox, Tabs, CardGrid } from "../../../../../shared-elements";

export default function Assessment() {
    const [activeTab, setActiveTab] = useState(0);
    const [selected, setSelected] = useState(null); 
    const [selectedGrading, setSelectedGrading] = useState(null); 
    const [isEditing, setIsEditing] = useState(false);
    const [quantRows, setQuantRows] = useState([{ name: '', max: '', auto: false }]);
    const [psyRows, setPsyRows] = useState([{ name: '', remarks: '' }]);
    const [gradingEditing, setGradingEditing] = useState(false);
    const [gradingRows, setGradingRows] = useState([
        { minScore: '0', maxScore: '30', gradePoint: '1', grade: 'F', comment: 'Fail' },
        { minScore: '30', maxScore: '40', gradePoint: '4', grade: 'E', comment: 'Poor' },
        { minScore: '40', maxScore: '60', gradePoint: '6', grade: 'D', comment: 'Pass' },
        { minScore: '60', maxScore: '80', gradePoint: '8', grade: 'C', comment: 'Pass' },
        { minScore: '80', maxScore: '100', gradePoint: '10', grade: 'B', comment: 'Pass' }
    ]);
    const [maxGradeScale, setMaxGradeScale] = useState('100');
    const [version, setVersion] = useState('v1.0');
    const [applyToAllTerms, setApplyToAllTerms] = useState(false);
    const [applyToAllTermsGrading, setApplyToAllTermsGrading] = useState(false);

    const items = [
        { id: 1, title: 'Internals', totalMarks: 100, createdOn: '12/02/2025', by: 'Chetan kumar.V' },
        { id: 2, title: 'Mid Term Examin...', totalMarks: 100, createdOn: '12/02/2025', by: 'Chetan kumar.V' },
        { id: 3, title: 'Annual Examin...', totalMarks: 100, createdOn: '12/02/2025', by: 'Chetan kumar.V' }
    ];
    const items1 = [
        { id: 1, title: 'Grading System 01', maxGradeScale: 100, createdOn: '12/02/2025', by: 'Chetan kumar.V' },
    ];

    const tabsData = [
        { label: "Assessment Format", value: 0 },
        { label: "Grading System", value: 1 },
    ];

    const versionOptions = [
        { value: "v1.0", label: "Version 1.0" },
    ];

    return (
        <div className="p-4 md:p-6 h-full">
            {/* Header */}
            <div className="mb-5 pb-3 border-b">
                <h2 className="text-[18px] font-semibold text-gray-800">Assessments</h2>
                <div className="flex items-center gap-2 text-[11px] text-gray-500">
                    <span>Renewal date: 12/06/2025</span>
                    <Chip size="small" label="Active" className="!bg-green-100 !text-green-700 !h-5 !rounded !text-[11px] !font-semibold" />
                </div>
            </div>

            {/* Tabs */}
            <Card className="!border !shadow-none">
                <div className="">
                    <Tabs
                        tabs={tabsData}
                        value={activeTab}
                        onChange={setActiveTab}
                        indicatorColor="#A3650F"
                        className="flex-1"
                    />
                </div>
                <Divider />

                {activeTab === 0 && !selected && (
                    <div className="p-4">
                        <CardGrid cols={1} mdCols={2} lgCols={3} gap={4}>
                            {items.map((it) => (
                                <Card key={it.id} className="!rounded-xl !border !shadow-none hover:!shadow-md transition cursor-pointer" onClick={() => { setSelected({ ...it }); setIsEditing(false); }}>
                                    <div className="">
                                        <div className="text-[10px] text-gray-500 mb-3">
                                            Created on {it.createdOn} | by {it.by}
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="text-[13px] font-semibold text-purple-700">{it.title}</div>
                                            <div className="text-[11px] text-gray-600">
                                                <span className="text-gray-500">Total Marks:</span> <span className="text-orange-600 font-semibold">{it.totalMarks}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </CardGrid>
                    </div>
                )}

                {activeTab === 0 && selected && (
                    <div className="p-4">
                        {/* Top bar: back + actions */}
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                                <IconButton size="small" onClick={() => setSelected(null)}>
                                    <ArrowBackIosNewIcon fontSize="inherit" />
                                </IconButton>
                                <span className="text-[13px] text-gray-700">Assessment Format</span>
                            </div>
                            {isEditing ? (
                                <div className="flex items-center gap-2">
                                    <Button size="small" variant="outline" className="normal-case" onClick={() => setIsEditing(false)}>Cancel</Button>
                                    <Button size="small" variant="outline" className="normal-case">Save as New</Button>
                                    <Button size="small" variant="primary" className="normal-case !bg-sky-500" onClick={() => setIsEditing(false)}>Update</Button>
                                </div>
                            ) : (
                                <Button
                                    variant="outline"
                                    size="small"
                                    className="!text-blue-600 normal-case text-xs !border-0 hover:!bg-transparent"
                                    onClick={() => setIsEditing((prev) => !prev)}
                                >
                                    <Edit fontSize="small" className="mr-1" />
                                    <span className="font-medium text-xs text-blue-600">Edit</span>
                                </Button>
                            )}
                        </div>

                        {/* Version + Apply to all terms */}
                        <div className="flex items-center justify-between text-[11px] text-gray-500 mb-3">
                            <div className="flex items-center gap-2">
                                <span>Version 1.0</span>
                                <Chip size="small" label="NEW" className="!bg-purple-100 !text-purple-700 !h-5 !rounded-md" />
                            </div>
                            <div className="flex items-center gap-3">
                                <Checkbox
                                    checked={applyToAllTerms}
                                    onChange={(e) => setApplyToAllTerms(e.target.checked)}
                                    disabled={!isEditing}
                                    label="Apply to all Terms"
                                    className="!min-w-[max-content] !mb-0"
                                />
                                <Select
                                    options={versionOptions}
                                    value={version}
                                    onChange={(e) => setVersion(e.target.value)}
                                    disabled={!isEditing}
                                    className="!min-w-[140px]"
                                    SelectProps={{ size: "small" }}
                                />
                            </div>
                        </div>

                        {/* Assessment Form Card */}
                        <Card className="!border !shadow-none">
                            <div className="p-3">
                                <div className="px-4 py-3 text-[12px] text-purple-700 font-semibold">Assessment Format</div>
                                <Divider />
                                <div className="p-4 space-y-5">
                                    {/* Assessment Name / Total Marks */}
                                    <div className="gap-6">
                                        <div className='flex gap-4 items-center mb-4'>
                                            <div className="text-[11px] text-gray-600 mb-1">Assessment Name</div>
                                            <Input value={selected.title} disabled={!isEditing} onChange={(e) => setSelected({ ...selected, title: e.target.value })} className="!mb-0" />
                                        </div>
                                        <div className='flex gap-12 items-center'>
                                            <div className="text-[11px] text-gray-600 mb-1">Total Marks</div>
                                            <Input value={selected.totalMarks} disabled={!isEditing} onChange={(e) => setSelected({ ...selected, totalMarks: e.target.value })} className="!mb-0" />
                                        </div>
                                    </div>

                                    {/* Quantifiable Assessment */}
                                    <div>
                                        <div className="text-[11px] text-orange-600 font-semibold mb-2">Quantifiable Assessment</div>
                                        {isEditing ? (
                                            <>
                                                {quantRows.map((row, idx) => (
                                                    <div key={idx} className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-center mb-3">
                                                        <Input placeholder="Enter here" value={row.name}
                                                            onChange={(e) => setQuantRows(quantRows.map((r, i) => i === idx ? { ...r, name: e.target.value } : r))} className="!mb-0" />
                                                        <Input placeholder="100" value={row.max}
                                                            onChange={(e) => setQuantRows(quantRows.map((r, i) => i === idx ? { ...r, max: e.target.value } : r))} className="!mb-0" />
                                                        <Checkbox
                                                            checked={row.auto}
                                                            onChange={(e) => setQuantRows(quantRows.map((r, i) => i === idx ? { ...r, auto: e.target.checked } : r))}
                                                            label={<span className="text-[11px] text-gray-600">Auto (Inline Result)</span>}
                                                        />
                                                        <div className="flex justify-start">
                                                            <IconButton size="small" color="error" onClick={() => setQuantRows(quantRows.filter((_, i) => i !== idx))}>
                                                                <DeleteIcon fontSize="small" />
                                                            </IconButton>
                                                        </div>
                                                    </div>
                                                ))}
                                                <div className="mt-1">
                                                    <Button size="small" variant='outline' className="normal-case !rounded-full" onClick={() => setQuantRows([...quantRows, { name: '', max: '', auto: false }])}>+ Add Row</Button>
                                                </div>
                                            </>
                                        ) : (
                                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center mb-3">
                                                <div className="h-9 bg-gray-50 border border-gray-200 rounded px-3 py-2 text-[12px] text-gray-400">Enter here</div>
                                                <div className="h-9 bg-gray-50 border border-gray-200 rounded px-3 py-2 text-[12px] text-gray-400">100</div>
                                                <div className="flex items-center gap-2">
                                                    <div className="w-4 h-4 border border-gray-300 rounded"></div>
                                                    <span className="text-[11px] text-gray-600">Auto (Inline Result)</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Psychometric Assessment */}
                                    <div>
                                        <div className="text-[11px] text-orange-600 font-semibold mb-2">Psychometric Assessment</div>
                                        {isEditing ? (
                                            <>
                                                {psyRows.map((row, idx) => (
                                                    <div key={idx} className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center mb-3">
                                                        <Input placeholder="Enter here" value={row.name}
                                                            onChange={(e) => setPsyRows(psyRows.map((r, i) => i === idx ? { ...r, name: e.target.value } : r))} className="!mb-0" />
                                                        <Input placeholder="Excellent, Good, Bad, Poor" value={row.remarks}
                                                            onChange={(e) => setPsyRows(psyRows.map((r, i) => i === idx ? { ...r, remarks: e.target.value } : r))} className="!mb-0" />
                                                        <div className="flex justify-start">
                                                            <IconButton size="small" color="error" onClick={() => setPsyRows(psyRows.filter((_, i) => i !== idx))}>
                                                                <DeleteIcon fontSize="small" />
                                                            </IconButton>
                                                        </div>
                                                    </div>
                                                ))}
                                                <div className="mt-1">
                                                    <Button size="small" variant='outline' className="normal-case !rounded-full" onClick={() => setPsyRows([...psyRows, { name: '', remarks: '' }])}>+ Add Row</Button>
                                                </div>
                                            </>
                                        ) : (
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center mb-3">
                                                <div className="h-9 bg-gray-50 border border-gray-200 rounded px-3 py-2 text-[12px] text-gray-400">Enter here</div>
                                                <div className="h-9 bg-gray-50 border border-gray-200 rounded px-3 py-2 text-[12px] text-gray-400">Excellent, Good, Bad, Poor</div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                )}

                {activeTab === 1 && !selectedGrading && (
                    <div className="p-4">
                        <CardGrid cols={1} mdCols={2} lgCols={3} gap={4}>
                            {items1.map((it) => (
                                <Card key={it.id} className="!rounded-xl !border !shadow-none hover:!shadow-md transition cursor-pointer" onClick={() => { setSelectedGrading({ ...it, type: 'grading' }); setGradingEditing(false); }}>
                                    <div className="">
                                        <div className="text-[10px] text-gray-500 mb-3">
                                            Created on {it.createdOn} | by {it.by}
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="text-[13px] font-semibold text-purple-700">{it.title}</div>
                                            <div className="text-[11px] text-gray-600">
                                                <span className="text-gray-500">Total Marks:</span> <span className="text-orange-600 font-semibold">{it.maxGradeScale}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </CardGrid>
                    </div>
                )}

                {activeTab === 1 && selectedGrading && selectedGrading.type === 'grading' && (
                    <div className="p-4">
                        {/* Top bar: back + actions */}
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                                <IconButton size="small" onClick={() => setSelectedGrading(null)}>
                                    <ArrowBackIosNewIcon fontSize="inherit" />
                                </IconButton>
                                <span className="text-[13px] text-gray-700">Grading System</span>
                            </div>
                            {gradingEditing ? (
                                <div className="flex items-center gap-2">
                                    <Button size="small" variant="cancel" className="normal-case" onClick={() => setGradingEditing(false)}>Cancel</Button>
                                    <Button size="small" variant="outline" className="normal-case">Save as New</Button>
                                    <Button size="small" variant="primary" className="normal-case !bg-sky-500" onClick={() => setGradingEditing(false)}>Update</Button>
                                </div>
                            ) : (
                                <Button
                                    variant="outline"
                                    size="small"
                                    className="!text-blue-600 normal-case text-xs !border-0 hover:!bg-transparent"
                                    onClick={() => setGradingEditing(true)}
                                >
                                    <Edit fontSize="small" className="mr-1" />
                                    <span className="font-medium text-[12px] text-blue-600">Edit</span>
                                </Button>
                            )}
                        </div>

                        {/* Version + Apply to all terms */}
                        <div className="flex items-center justify-between text-[11px] text-gray-500 mb-3">
                            <div className="flex items-center gap-2">
                                <span>Version 1.0</span>
                                <Chip size="small" label="ACTIVE" className="!bg-green-100 !text-green-700 !h-5 !text-[11px] !rounded-md" />
                                <Chip size="small" label="PRIVATE" className="!bg-purple-100 !text-purple-700 !h-5  !text-[11px] !rounded-md" />
                            </div>
                            <div className="flex items-center gap-3">
                                <Checkbox
                                    checked={applyToAllTermsGrading}
                                    onChange={(e) => setApplyToAllTermsGrading(e.target.checked)}
                                    disabled={!gradingEditing}
                                    label="Apply to all Terms"
                                    className="!min-w-[max-content] !mb-0"
                                />
                                <Select
                                    options={versionOptions}
                                    value={version}
                                    onChange={(e) => setVersion(e.target.value)}
                                    disabled={!gradingEditing}
                                    className="!min-w-[140px]"
                                    SelectProps={{ size: "small" }}
                                />
                            </div>
                        </div>

                        {/* Grading System Card */}
                        <Card className="!border !shadow-none">
                            <div className="p-0">
                                <div className="px-4 py-3 text-[12px] text-purple-700 font-semibold">Grading System</div>
                                <Divider />
                                <div className="p-4 space-y-5">
                                    {/* Max Grade Scale */}
                                    <div className="items-center gap-4">
                                        <div className="text-[11px] text-gray-600">Max Grade Scale</div>
                                        <Input value={maxGradeScale} disabled={!gradingEditing} onChange={(e) => setMaxGradeScale(e.target.value)} className="!mb-0 !w-[200px]" />
                                    </div>

                                    {/* Grading Table */}
                                    <div>
                                        {gradingEditing ? (
                                            <>
                                                <div className="grid grid-cols-6 gap-2 mb-2 text-[11px] text-gray-500 font-semibold">
                                                    <div>Min Score</div>
                                                    <div>Max Score</div>
                                                    <div>Grade Point</div>
                                                    <div>Grade</div>
                                                    <div>Comment</div>
                                                    <div></div>
                                                </div>
                                                {gradingRows.map((row, idx) => (
                                                    <div key={idx} className="grid grid-cols-6 gap-2 items-center mb-2">
                                                        <Input value={row.minScore} onChange={(e) => setGradingRows(gradingRows.map((r, i) => i === idx ? { ...r, minScore: e.target.value } : r))} className="!mb-0" />
                                                        <Input value={row.maxScore} onChange={(e) => setGradingRows(gradingRows.map((r, i) => i === idx ? { ...r, maxScore: e.target.value } : r))} className="!mb-0" />
                                                        <Input value={row.gradePoint} onChange={(e) => setGradingRows(gradingRows.map((r, i) => i === idx ? { ...r, gradePoint: e.target.value } : r))} className="!mb-0" />
                                                        <Input value={row.grade} onChange={(e) => setGradingRows(gradingRows.map((r, i) => i === idx ? { ...r, grade: e.target.value } : r))} className="!mb-0" />
                                                        <Input value={row.comment} onChange={(e) => setGradingRows(gradingRows.map((r, i) => i === idx ? { ...r, comment: e.target.value } : r))} className="!mb-0" />
                                                        <div className="flex justify-center">
                                                            <IconButton size="small" color="error" onClick={() => setGradingRows(gradingRows.filter((_, i) => i !== idx))}>
                                                                <DeleteIcon fontSize="small" />
                                                            </IconButton>
                                                        </div>
                                                    </div>
                                                ))}
                                                <div className="mt-3">
                                                    <Button size="small" variant="outline" className="normal-case !rounded-full" onClick={() => setGradingRows([...gradingRows, { minScore: '', maxScore: '', gradePoint: '', grade: '', comment: '' }])}>+ Add Row</Button>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className="grid grid-cols-5 gap-2 mb-2 text-[10px] text-gray-500 font-semibold">
                                                    <div>Min Score</div>
                                                    <div>Max Score</div>
                                                    <div>Grade Point</div>
                                                    <div>Grade</div>
                                                    <div>Comment</div>
                                                </div>
                                                {gradingRows.map((row, idx) => (
                                                    <div key={idx} className="grid grid-cols-5 gap-2 items-center mb-2">
                                                        <div className="h-9 bg-gray-50 border border-gray-200 rounded px-3 py-2 text-[12px] text-gray-700">{row.minScore}</div>
                                                        <div className="h-9 bg-gray-50 border border-gray-200 rounded px-3 py-2 text-[12px] text-gray-700">{row.maxScore}</div>
                                                        <div className="h-9 bg-gray-50 border border-gray-200 rounded px-3 py-2 text-[12px] text-gray-700">{row.gradePoint}</div>
                                                        <div className="h-9 bg-gray-50 border border-gray-200 rounded px-3 py-2 text-[12px] text-gray-700">{row.grade}</div>
                                                        <div className="h-9 bg-gray-50 border border-gray-200 rounded px-3 py-2 text-[12px] text-gray-700">{row.comment}</div>
                                                    </div>
                                                ))}
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                )}
            </Card>
        </div>
    );
}


