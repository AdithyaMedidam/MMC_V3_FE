import React, { useEffect } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { IconButton } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Button, Input, Select, ContentLayout } from '../../../../shared-elements';

export default function UpdateProgram({ onClose, initialData }) {
    // React Hook Form setup
    const { 
        control, 
        handleSubmit: handleFormSubmit, 
        formState: { errors, isValid },
        reset
    } = useForm({
        mode: 'onChange', // Validate on change for real-time feedback
        defaultValues: {
            programName: initialData?.programName || "",
            affiliation: initialData?.affiliation || "",
            department: initialData?.department || "Computer Science",
            degree: initialData?.degree || "Bachelor of Engineering",
            degreeType: initialData?.degreeType || "UG/PG/DIPLOMA",
            duration: initialData?.duration || "",
            terms: initialData?.terms || "",
            totalCredits: initialData?.totalCredits || "",
            minCredits: initialData?.minCredits || "",
            minArrears: initialData?.minArrears || "",
            minAttendance: initialData?.minAttendance || "",
            businessUnits: initialData?.businessUnits 
                ? (Array.isArray(initialData.businessUnits) 
                    ? initialData.businessUnits.map(bu => ({ value: bu }))
                    : [{ value: initialData.businessUnits }])
                : [{ value: "Christ University, Kengeri" }]
        }
    });

    // Reset form when initialData changes
    useEffect(() => {
        if (initialData) {
            const initialBusinessUnits = initialData?.businessUnits 
                ? (Array.isArray(initialData.businessUnits) 
                    ? initialData.businessUnits.map(bu => ({ value: bu }))
                    : [{ value: initialData.businessUnits }])
                : [{ value: "Christ University, Kengeri" }];
            
            reset({
                programName: initialData?.programName || "",
                affiliation: initialData?.affiliation || "",
                department: initialData?.department || "Computer Science",
                degree: initialData?.degree || "Bachelor of Engineering",
                degreeType: initialData?.degreeType || "UG/PG/DIPLOMA",
                duration: initialData?.duration || "",
                terms: initialData?.terms || "",
                totalCredits: initialData?.totalCredits || "",
                minCredits: initialData?.minCredits || "",
                minArrears: initialData?.minArrears || "",
                minAttendance: initialData?.minAttendance || "",
                businessUnits: initialBusinessUnits
            });
        }
    }, [initialData, reset]);

    // Check if form is valid (no errors and all required fields filled)
    const isFormValid = isValid && Object.keys(errors).length === 0;

    // Handle dynamic businessUnits array
    const { fields: businessUnitFields, append: appendBusinessUnit, remove: removeBusinessUnit } = useFieldArray({
        control,
        name: "businessUnits"
    });

    // Form submission handler
    const onSubmit = (data) => {
        console.log("Form Data:", data);
        // TODO: Add your API call here
        // onClose(); // Close after successful update
    };

    const addBusinessUnit = () => {
        appendBusinessUnit({ value: "Christ University, Kengeri" });
    };

    const removeBusinessUnitItem = (index) => {
        if (businessUnitFields.length > 1) {
            removeBusinessUnit(index);
        }
    };

    return (
        <div className="p-6">
            {/* Header Bar */}
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
                        onClick={handleFormSubmit(onSubmit)}
                        disabled={!isFormValid}
                    >
                        Update
                    </Button>
                </div>
            </div>

            <ContentLayout className="mt-2">
                {/* Program Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:w-2/3">
                    <div>
                        <Controller
                            name="programName"
                            control={control}
                            rules={{ 
                                required: "Program Name is required",
                                validate: (value) => {
                                    if (!value || value.trim() === "") {
                                        return "Program Name is required";
                                    }
                                    return true;
                                }
                            }}
                            render={({ field }) => (
                                <Input
                                    label="Program Name"
                                    placeholder="Enter here"
                                    required
                                    {...field}
                                    error={errors.programName?.message}
                                    className="!mb-0"
                                />
                            )}
                        />
                    </div>
                    <div>
                        <Controller
                            name="affiliation"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    label="Affiliation"
                                    placeholder="Enter here"
                                    {...field}
                                    className="!mb-0"
                                />
                            )}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:w-2/3 mt-4">
                    <div>
                        <Controller
                            name="department"
                            control={control}
                            rules={{ 
                                required: "Department is required" 
                            }}
                            render={({ field }) => (
                                <Select
                                    label="Department"
                                    value={field.value}
                                    onChange={(e) => field.onChange(e.target.value)}
                                    options={['Computer Science', 'Information Technology', 'Mechanical', 'Civil'].map(x => ({ value: x, label: x }))}
                                    error={errors.department?.message}
                                    className="!mb-0"
                                />
                            )}
                        />
                    </div>
                    <div>
                        <Controller
                            name="degree"
                            control={control}
                            rules={{ 
                                required: "Degree is required" 
                            }}
                            render={({ field }) => (
                                <Select
                                    label="Degree"
                                    value={field.value}
                                    onChange={(e) => field.onChange(e.target.value)}
                                    options={['Bachelor of Engineering', 'Bachelor of Science', 'Master of Engineering'].map(x => ({ value: x, label: x }))}
                                    error={errors.degree?.message}
                                    className="!mb-0"
                                />
                            )}
                        />
                    </div>
                    <div>
                        <Controller
                            name="degreeType"
                            control={control}
                            rules={{ 
                                required: "Degree Type is required" 
                            }}
                            render={({ field }) => (
                                <Select
                                    label="Degree Type"
                                    value={field.value}
                                    onChange={(e) => field.onChange(e.target.value)}
                                    options={['UG/PG/DIPLOMA', 'UG', 'PG', 'Diploma'].map(x => ({ value: x, label: x }))}
                                    error={errors.degreeType?.message}
                                    className="!mb-0"
                                />
                            )}
                        />
                    </div>
                </div>

                {/* Academic Detail */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 md:w-1/3">
                    <div>
                        <Controller
                            name="duration"
                            control={control}
                            rules={{ 
                                required: "Duration is required" 
                            }}
                            render={({ field }) => (
                                <Input
                                    label="Durations"
                                    placeholder="Enter here"
                                    required
                                    {...field}
                                    error={errors.duration?.message}
                                    className="!mb-0"
                                />
                            )}
                        />
                    </div>
                    <div>
                        <Controller
                            name="terms"
                            control={control}
                            rules={{ 
                                required: "No of Terms is required" 
                            }}
                            render={({ field }) => (
                                <Select
                                    label="No of Terms"
                                    value={field.value}
                                    onChange={(e) => field.onChange(e.target.value)}
                                    options={[
                                        { value: "", label: "Select" },
                                        ...[...Array(12)].map((_, i) => ({ value: String(i + 1).padStart(2, '0'), label: String(i + 1).padStart(2, '0') }))
                                    ]}
                                    error={errors.terms?.message}
                                    className="!mb-0"
                                />
                            )}
                        />
                    </div>
                </div>

                {/* Program Requirements */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 md:w-1/3">
                    <div>
                        <Controller
                            name="totalCredits"
                            control={control}
                            rules={{ 
                                required: "Total Credits is required" 
                            }}
                            render={({ field }) => (
                                <Input
                                    label="Total Credits"
                                    placeholder="Enter here"
                                    required
                                    {...field}
                                    error={errors.totalCredits?.message}
                                    className="!mb-0"
                                />
                            )}
                        />
                    </div>
                    <div>
                        <Controller
                            name="minCredits"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    label="Min.Credits"
                                    placeholder="Enter here"
                                    {...field}
                                    className="!mb-0"
                                />
                            )}
                        />
                    </div>
                    <div>
                        <Controller
                            name="minArrears"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    label="Min.Arrears Allowed"
                                    placeholder="Enter here"
                                    {...field}
                                    className="!mb-0"
                                />
                            )}
                        />
                    </div>
                    <div>
                        <Controller
                            name="minAttendance"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    label="Min.Attendance %"
                                    placeholder="Enter here"
                                    {...field}
                                    className="!mb-0"
                                />
                            )}
                        />
                    </div>
                </div>

                {/* Assign Business Units */}
                <div className="grid grid-cols-1 mt-4 md:w-2/5 gap-y-2">
                    <div className="text-[12px] text-gray-500">Select Business unit <span className="required">*</span></div>

                    {businessUnitFields.map((field, index) => (
                        <div key={field.id} className="grid grid-cols-[1fr_auto] gap-2 items-center mb-2">
                            <Controller
                                name={`businessUnits.${index}.value`}
                                control={control}
                                rules={{ 
                                    required: "Please select a business unit",
                                    validate: (value) => {
                                        if (!value || value === "" || value === null || value === undefined) {
                                            return "Please select a business unit";
                                        }
                                        return true;
                                    }
                                }}
                                render={({ field: businessUnitField }) => (
                                    <Select
                                        value={businessUnitField.value}
                                        onChange={(e) => businessUnitField.onChange(e.target.value)}
                                        options={['Christ University, Kengeri', 'Christ University, Bannerghatta', 'Christ University, Main'].map(x => ({ value: x, label: x }))}
                                        error={errors.businessUnits?.[index]?.value?.message}
                                        className="!mb-0"
                                    />
                                )}
                            />
                            <IconButton 
                                aria-label="delete" 
                                color="error" 
                                onClick={() => removeBusinessUnitItem(index)} 
                                disabled={businessUnitFields.length === 1}
                            >
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
            </ContentLayout>
        </div>
    );
}

