import React, { useState, useEffect } from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import {
    Chip,
    Divider,
    IconButton
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import DeleteIcon from '@mui/icons-material/Delete';
import { Edit } from '@mui/icons-material';
import { Button, Card, Input, Select, Checkbox, Tabs, CardGrid, ContentLayout } from "../../../../../shared-elements";

export default function Assessment() {
    const [activeTab, setActiveTab] = useState(0);
    const [selected, setSelected] = useState(null); 
    const [selectedGrading, setSelectedGrading] = useState(null); 
    const [isEditing, setIsEditing] = useState(false);
    const [gradingEditing, setGradingEditing] = useState(false);
    const [version, setVersion] = useState('v1.0');

    // React Hook Form for Assessment Format
    const assessmentForm = useForm({
        mode: 'onChange',
        defaultValues: {
            assessmentName: '',
            totalMarks: '',
            quantifiableAssessments: [{ name: '', max: '', auto: false }],
            psychometricAssessments: [{ name: '', remarks: '' }],
            applyToAllTerms: false
        }
    });

    const { 
        control: assessmentControl, 
        handleSubmit: handleAssessmentSubmit, 
        formState: { errors: assessmentErrors, isValid: isAssessmentValid },
        reset: resetAssessment,
        watch: watchAssessment
    } = assessmentForm;

    const applyToAllTerms = watchAssessment('applyToAllTerms');

    // React Hook Form for Grading System
    const gradingForm = useForm({
        mode: 'onChange',
        defaultValues: {
            maxGradeScale: '100',
            gradingRows: [
                { minScore: '0', maxScore: '30', gradePoint: '1', grade: 'F', comment: 'Fail' },
                { minScore: '30', maxScore: '40', gradePoint: '4', grade: 'E', comment: 'Poor' },
                { minScore: '40', maxScore: '60', gradePoint: '6', grade: 'D', comment: 'Pass' },
                { minScore: '60', maxScore: '80', gradePoint: '8', grade: 'C', comment: 'Pass' },
                { minScore: '80', maxScore: '100', gradePoint: '10', grade: 'B', comment: 'Pass' }
            ],
            applyToAllTermsGrading: false
        }
    });

    const { 
        control: gradingControl, 
        handleSubmit: handleGradingSubmit, 
        formState: { errors: gradingErrors, isValid: isGradingValid },
        reset: resetGrading,
        watch: watchGrading
    } = gradingForm;

    const applyToAllTermsGrading = watchGrading('applyToAllTermsGrading');

    // Reset assessment form when selected changes
    useEffect(() => {
        if (selected) {
            resetAssessment({
                assessmentName: selected.title || '',
                totalMarks: selected.totalMarks?.toString() || '',
                quantifiableAssessments: selected.quantifiableAssessments || [{ name: '', max: '', auto: false }],
                psychometricAssessments: selected.psychometricAssessments || [{ name: '', remarks: '' }],
                applyToAllTerms: false
            });
        }
    }, [selected, resetAssessment]);

    // Reset grading form when selectedGrading changes
    useEffect(() => {
        if (selectedGrading) {
            resetGrading({
                maxGradeScale: selectedGrading.maxGradeScale?.toString() || '100',
                gradingRows: selectedGrading.gradingRows || [
                    { minScore: '0', maxScore: '30', gradePoint: '1', grade: 'F', comment: 'Fail' },
                    { minScore: '30', maxScore: '40', gradePoint: '4', grade: 'E', comment: 'Poor' },
                    { minScore: '40', maxScore: '60', gradePoint: '6', grade: 'D', comment: 'Pass' },
                    { minScore: '60', maxScore: '80', gradePoint: '8', grade: 'C', comment: 'Pass' },
                    { minScore: '80', maxScore: '100', gradePoint: '10', grade: 'B', comment: 'Pass' }
                ],
                applyToAllTermsGrading: false
            });
        }
    }, [selectedGrading, resetGrading]);

    // Assessment Form validation
    const isAssessmentFormValid = isAssessmentValid && Object.keys(assessmentErrors).length === 0;

    // Grading Form validation
    const isGradingFormValid = isGradingValid && Object.keys(gradingErrors).length === 0;

    // Assessment Form field arrays
    const { 
        fields: quantFields, 
        append: appendQuant, 
        remove: removeQuant 
    } = useFieldArray({
        control: assessmentControl,
        name: 'quantifiableAssessments'
    });

    const { 
        fields: psyFields, 
        append: appendPsy, 
        remove: removePsy 
    } = useFieldArray({
        control: assessmentControl,
        name: 'psychometricAssessments'
    });

    // Grading Form field array
    const { 
        fields: gradingFields, 
        append: appendGrading, 
        remove: removeGrading 
    } = useFieldArray({
        control: gradingControl,
        name: 'gradingRows'
    });

    // Form submission handlers
    const onAssessmentSubmit = (data) => {
        console.log("Assessment Form Data:", data);
        // TODO: Add API call here
        setIsEditing(false);
    };

    const onGradingSubmit = (data) => {
        console.log("Grading Form Data:", data);
        // TODO: Add API call here
        setGradingEditing(false);
    };

    const handleCancelAssessment = () => {
        if (selected) {
            resetAssessment({
                assessmentName: selected.title || '',
                totalMarks: selected.totalMarks?.toString() || '',
                quantifiableAssessments: selected.quantifiableAssessments || [{ name: '', max: '', auto: false }],
                psychometricAssessments: selected.psychometricAssessments || [{ name: '', remarks: '' }],
                applyToAllTerms: false
            });
        }
        setIsEditing(false);
    };

    const handleCancelGrading = () => {
        if (selectedGrading) {
            resetGrading({
                maxGradeScale: selectedGrading.maxGradeScale?.toString() || '100',
                gradingRows: selectedGrading.gradingRows || [
        { minScore: '0', maxScore: '30', gradePoint: '1', grade: 'F', comment: 'Fail' },
        { minScore: '30', maxScore: '40', gradePoint: '4', grade: 'E', comment: 'Poor' },
        { minScore: '40', maxScore: '60', gradePoint: '6', grade: 'D', comment: 'Pass' },
        { minScore: '60', maxScore: '80', gradePoint: '8', grade: 'C', comment: 'Pass' },
        { minScore: '80', maxScore: '100', gradePoint: '10', grade: 'B', comment: 'Pass' }
                ],
                applyToAllTermsGrading: false
            });
        }
        setGradingEditing(false);
    };

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
            <ContentLayout className="mt-4">
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
                                    <Button size="small" variant="outline" className="normal-case" onClick={handleCancelAssessment}>Cancel</Button>
                                    <Button size="small" variant="outline" className="normal-case">Save as New</Button>
                                    <Button 
                                        size="small" 
                                        variant="primary" 
                                        className="normal-case !bg-sky-500" 
                                        onClick={handleAssessmentSubmit(onAssessmentSubmit)}
                                        disabled={!isAssessmentFormValid}
                                    >
                                        Update
                                    </Button>
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
                                <Controller
                                    name="applyToAllTerms"
                                    control={assessmentControl}
                                    render={({ field }) => (
                                <Checkbox
                                            checked={field.value}
                                            onChange={(e) => field.onChange(e.target.checked)}
                                    disabled={!isEditing}
                                    label="Apply to all Terms"
                                    className="!min-w-[max-content] !mb-0"
                                        />
                                    )}
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
                                            <Controller
                                                name="assessmentName"
                                                control={assessmentControl}
                                                rules={{ 
                                                    required: "Assessment Name is required",
                                                    validate: (value) => {
                                                        if (!value || value.trim() === "") {
                                                            return "Assessment Name is required";
                                                        }
                                                        return true;
                                                    }
                                                }}
                                                render={({ field }) => (
                                                    <Input 
                                                        placeholder="Enter here"
                                                        disabled={!isEditing} 
                                                        {...field}
                                                        error={assessmentErrors.assessmentName?.message}
                                                        className="!mb-0" 
                                                    />
                                                )}
                                            />
                                        </div>
                                        <div className='flex gap-12 items-center'>
                                            <div className="text-[11px] text-gray-600 mb-1">Total Marks</div>
                                            <Controller
                                                name="totalMarks"
                                                control={assessmentControl}
                                                rules={{ 
                                                    required: "Total Marks is required" 
                                                }}
                                                render={({ field }) => (
                                                    <Input 
                                                        placeholder="Enter here"
                                                        disabled={!isEditing} 
                                                        onlyNumbers
                                                        {...field}
                                                        error={assessmentErrors.totalMarks?.message}
                                                        className="!mb-0" 
                                                    />
                                                )}
                                            />
                                        </div>
                                    </div>

                                    {/* Quantifiable Assessment */}
                                    <div>
                                        <div className="text-[11px] text-orange-600 font-semibold mb-2">Quantifiable Assessment</div>
                                        {isEditing ? (
                                            <>
                                                {quantFields.map((field, idx) => (
                                                    <div key={field.id} className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-center mb-3">
                                                        <Controller
                                                            name={`quantifiableAssessments.${idx}.name`}
                                                            control={assessmentControl}
                                                            render={({ field: nameField }) => (
                                                                <Input 
                                                                    placeholder="Enter here" 
                                                                    {...nameField}
                                                                    error={assessmentErrors.quantifiableAssessments?.[idx]?.name?.message}
                                                                    className="!mb-0" 
                                                                />
                                                            )}
                                                        />
                                                        <Controller
                                                            name={`quantifiableAssessments.${idx}.max`}
                                                            control={assessmentControl}
                                                            render={({ field: maxField }) => (
                                                                <Input 
                                                                    placeholder="100" 
                                                                    onlyNumbers
                                                                    {...maxField}
                                                                    error={assessmentErrors.quantifiableAssessments?.[idx]?.max?.message}
                                                                    className="!mb-0" 
                                                                />
                                                            )}
                                                        />
                                                        <Controller
                                                            name={`quantifiableAssessments.${idx}.auto`}
                                                            control={assessmentControl}
                                                            render={({ field: autoField }) => (
                                                        <Checkbox
                                                                    checked={autoField.value}
                                                                    onChange={(e) => autoField.onChange(e.target.checked)}
                                                            label={<span className="text-[11px] text-gray-600">Auto (Inline Result)</span>}
                                                                />
                                                            )}
                                                        />
                                                        <div className="flex justify-start">
                                                            <IconButton 
                                                                size="small" 
                                                                color="error" 
                                                                onClick={() => removeQuant(idx)}
                                                                disabled={quantFields.length === 1}
                                                            >
                                                                <DeleteIcon fontSize="small" />
                                                            </IconButton>
                                                        </div>
                                                    </div>
                                                ))}
                                                <div className="mt-1">
                                                    <Button 
                                                        size="small" 
                                                        variant='outline' 
                                                        className="normal-case !rounded-full" 
                                                        onClick={() => appendQuant({ name: '', max: '', auto: false })}
                                                    >
                                                        + Add Row
                                                    </Button>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                {quantFields.length > 0 ? (
                                                    quantFields.map((field, idx) => {
                                                        const row = watchAssessment(`quantifiableAssessments.${idx}`);
                                                        return (
                                                            <div key={field.id} className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center mb-3">
                                                                <div className="h-9 bg-gray-50 border border-gray-200 rounded px-3 py-2 text-[12px] text-gray-700">{row?.name || 'Enter here'}</div>
                                                                <div className="h-9 bg-gray-50 border border-gray-200 rounded px-3 py-2 text-[12px] text-gray-700">{row?.max || '100'}</div>
                                                                <div className="flex items-center gap-2">
                                                                    <div className={`w-4 h-4 border border-gray-300 rounded ${row?.auto ? 'bg-blue-500' : ''}`}></div>
                                                                    <span className="text-[11px] text-gray-600">Auto (Inline Result)</span>
                                                                </div>
                                                            </div>
                                                        );
                                                    })
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
                                            </>
                                        )}
                                    </div>

                                    {/* Psychometric Assessment */}
                                    <div>
                                        <div className="text-[11px] text-orange-600 font-semibold mb-2">Psychometric Assessment</div>
                                        {isEditing ? (
                                            <>
                                                {psyFields.map((field, idx) => (
                                                    <div key={field.id} className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center mb-3">
                                                        <Controller
                                                            name={`psychometricAssessments.${idx}.name`}
                                                            control={assessmentControl}
                                                            render={({ field: nameField }) => (
                                                                <Input 
                                                                    placeholder="Enter here" 
                                                                    {...nameField}
                                                                    error={assessmentErrors.psychometricAssessments?.[idx]?.name?.message}
                                                                    className="!mb-0" 
                                                                />
                                                            )}
                                                        />
                                                        <Controller
                                                            name={`psychometricAssessments.${idx}.remarks`}
                                                            control={assessmentControl}
                                                            render={({ field: remarksField }) => (
                                                                <Input 
                                                                    placeholder="Excellent, Good, Bad, Poor" 
                                                                    {...remarksField}
                                                                    error={assessmentErrors.psychometricAssessments?.[idx]?.remarks?.message}
                                                                    className="!mb-0" 
                                                                />
                                                            )}
                                                        />
                                                        <div className="flex justify-start">
                                                            <IconButton 
                                                                size="small" 
                                                                color="error" 
                                                                onClick={() => removePsy(idx)}
                                                                disabled={psyFields.length === 1}
                                                            >
                                                                <DeleteIcon fontSize="small" />
                                                            </IconButton>
                                                        </div>
                                                    </div>
                                                ))}
                                                <div className="mt-1">
                                                    <Button 
                                                        size="small" 
                                                        variant='outline' 
                                                        className="normal-case !rounded-full" 
                                                        onClick={() => appendPsy({ name: '', remarks: '' })}
                                                    >
                                                        + Add Row
                                                    </Button>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                {psyFields.length > 0 ? (
                                                    psyFields.map((field, idx) => {
                                                        const row = watchAssessment(`psychometricAssessments.${idx}`);
                                                        return (
                                                            <div key={field.id} className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center mb-3">
                                                                <div className="h-9 bg-gray-50 border border-gray-200 rounded px-3 py-2 text-[12px] text-gray-700">{row?.name || 'Enter here'}</div>
                                                                <div className="h-9 bg-gray-50 border border-gray-200 rounded px-3 py-2 text-[12px] text-gray-700">{row?.remarks || 'Excellent, Good, Bad, Poor'}</div>
                                                            </div>
                                                        );
                                                    })
                                        ) : (
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center mb-3">
                                                <div className="h-9 bg-gray-50 border border-gray-200 rounded px-3 py-2 text-[12px] text-gray-400">Enter here</div>
                                                <div className="h-9 bg-gray-50 border border-gray-200 rounded px-3 py-2 text-[12px] text-gray-400">Excellent, Good, Bad, Poor</div>
                                            </div>
                                                )}
                                            </>
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
                                    <Button size="small" variant="cancel" className="normal-case" onClick={handleCancelGrading}>Cancel</Button>
                                    <Button size="small" variant="outline" className="normal-case">Save as New</Button>
                                    <Button 
                                        size="small" 
                                        variant="primary" 
                                        className="normal-case !bg-sky-500" 
                                        onClick={handleGradingSubmit(onGradingSubmit)}
                                        disabled={!isGradingFormValid}
                                    >
                                        Update
                                    </Button>
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
                                <Controller
                                    name="applyToAllTermsGrading"
                                    control={gradingControl}
                                    render={({ field }) => (
                                <Checkbox
                                            checked={field.value}
                                            onChange={(e) => field.onChange(e.target.checked)}
                                    disabled={!gradingEditing}
                                    label="Apply to all Terms"
                                    className="!min-w-[max-content] !mb-0"
                                        />
                                    )}
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
                                        <Controller
                                            name="maxGradeScale"
                                            control={gradingControl}
                                            rules={{ 
                                                required: "Max Grade Scale is required" 
                                            }}
                                            render={({ field }) => (
                                                <Input 
                                                    placeholder="Enter here"
                                                    disabled={!gradingEditing} 
                                                    onlyNumbers
                                                    {...field}
                                                    error={gradingErrors.maxGradeScale?.message}
                                                    className="!mb-0 !w-[200px]" 
                                                />
                                            )}
                                        />
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
                                                {gradingFields.map((field, idx) => (
                                                    <div key={field.id} className="grid grid-cols-6 gap-2 items-center mb-2">
                                                        <Controller
                                                            name={`gradingRows.${idx}.minScore`}
                                                            control={gradingControl}
                                                            render={({ field: minScoreField }) => (
                                                                <Input 
                                                                    placeholder="Enter here"
                                                                    onlyNumbers
                                                                    {...minScoreField}
                                                                    error={gradingErrors.gradingRows?.[idx]?.minScore?.message}
                                                                    className="!mb-0" 
                                                                />
                                                            )}
                                                        />
                                                        <Controller
                                                            name={`gradingRows.${idx}.maxScore`}
                                                            control={gradingControl}
                                                            render={({ field: maxScoreField }) => (
                                                                <Input 
                                                                    placeholder="Enter here"
                                                                    onlyNumbers
                                                                    {...maxScoreField}
                                                                    error={gradingErrors.gradingRows?.[idx]?.maxScore?.message}
                                                                    className="!mb-0" 
                                                                />
                                                            )}
                                                        />
                                                        <Controller
                                                            name={`gradingRows.${idx}.gradePoint`}
                                                            control={gradingControl}
                                                            render={({ field: gradePointField }) => (
                                                                <Input 
                                                                    placeholder="Enter here"
                                                                    onlyNumbers
                                                                    {...gradePointField}
                                                                    error={gradingErrors.gradingRows?.[idx]?.gradePoint?.message}
                                                                    className="!mb-0" 
                                                                />
                                                            )}
                                                        />
                                                        <Controller
                                                            name={`gradingRows.${idx}.grade`}
                                                            control={gradingControl}
                                                            render={({ field: gradeField }) => (
                                                                <Input 
                                                                    placeholder="Enter here"
                                                                    {...gradeField}
                                                                    error={gradingErrors.gradingRows?.[idx]?.grade?.message}
                                                                    className="!mb-0" 
                                                                />
                                                            )}
                                                        />
                                                        <Controller
                                                            name={`gradingRows.${idx}.comment`}
                                                            control={gradingControl}
                                                            render={({ field: commentField }) => (
                                                                <Input 
                                                                    placeholder="Enter here"
                                                                    {...commentField}
                                                                    error={gradingErrors.gradingRows?.[idx]?.comment?.message}
                                                                    className="!mb-0" 
                                                                />
                                                            )}
                                                        />
                                                        <div className="flex justify-center">
                                                            <IconButton 
                                                                size="small" 
                                                                color="error" 
                                                                onClick={() => removeGrading(idx)}
                                                                disabled={gradingFields.length === 1}
                                                            >
                                                                <DeleteIcon fontSize="small" />
                                                            </IconButton>
                                                        </div>
                                                    </div>
                                                ))}
                                                <div className="mt-3">
                                                    <Button 
                                                        size="small" 
                                                        variant="outline" 
                                                        className="normal-case !rounded-full" 
                                                        onClick={() => appendGrading({ minScore: '', maxScore: '', gradePoint: '', grade: '', comment: '' })}
                                                    >
                                                        + Add Row
                                                    </Button>
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
                                                {gradingFields.map((field, idx) => {
                                                    const row = watchGrading(`gradingRows.${idx}`);
                                                    return (
                                                        <div key={field.id} className="grid grid-cols-5 gap-2 items-center mb-2">
                                                            <div className="h-9 bg-gray-50 border border-gray-200 rounded px-3 py-2 text-[12px] text-gray-700">{row?.minScore || ''}</div>
                                                            <div className="h-9 bg-gray-50 border border-gray-200 rounded px-3 py-2 text-[12px] text-gray-700">{row?.maxScore || ''}</div>
                                                            <div className="h-9 bg-gray-50 border border-gray-200 rounded px-3 py-2 text-[12px] text-gray-700">{row?.gradePoint || ''}</div>
                                                            <div className="h-9 bg-gray-50 border border-gray-200 rounded px-3 py-2 text-[12px] text-gray-700">{row?.grade || ''}</div>
                                                            <div className="h-9 bg-gray-50 border border-gray-200 rounded px-3 py-2 text-[12px] text-gray-700">{row?.comment || ''}</div>
                                                    </div>
                                                    );
                                                })}
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                )}
            </ContentLayout>
        </div>
    );
}


