import React, { useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { Switch, Chip, IconButton, MenuItem, ListItemText, Checkbox as MuiCheckbox } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Card, Button, Select, Tabs, ContentLayout } from '../../../../shared-elements';

const ruleTypeOptions = ["Best of", "Average of", "Weightage"];
const assessmentOptions = {
    "Best of": ["IA 1", "IA 2", "IA 3"],
    "Average of": ["Mid Term", "Unit Test", "Quiz"],
    "Weightage": ["Preparatory", "Annual Examination", "Final Practical"]
};


export default function GradeBook() {
    const [active, setActive] = useState(true);
    const [version, setVersion] = useState("v1.0");
    const [tab, setTab] = useState(0);
    const handleTabChange = (newValue) => {
        setTab(newValue);
    };

    const tabItems = [
        { label: "Rules", value: 0 },
    ];
    const [isEditing, setIsEditing] = useState(false);

    // Initial rules data
    const initialRules = [
        { ruleType: "Best of", assessment: ["IA 1"] },
        { ruleType: "Average of", assessment: ["Mid Term"] },
        { ruleType: "Weightage", assessment: ["Preparatory"] }
    ];

    // React Hook Form setup
    const {
        control,
        handleSubmit: handleFormSubmit,
        formState: { errors, isValid },
        reset,
        watch,
        setValue
    } = useForm({
        mode: 'onChange',
        defaultValues: {
            rules: initialRules
        }
    });

    // Check if form is valid
    const isFormValid = isValid && Object.keys(errors).length === 0;

    // Handle dynamic rules array
    const { fields: ruleFields, append: appendRule, remove: removeRule } = useFieldArray({
        control,
        name: "rules"
    });

    // Watch rules to get current values
    const watchedRules = watch("rules");

    const handleRuleTypeChange = (index, value) => {
        // Update rule type
        setValue(`rules.${index}.ruleType`, value, { shouldValidate: true });
        // Reset assessment to first option of new rule type
        setValue(`rules.${index}.assessment`, [assessmentOptions[value][0]], { shouldValidate: true });
    };

    const renderSelected = (selected) => (
        <div className="flex flex-wrap gap-1">
            {selected.map((val) => (
                <Chip key={val} label={val} size="small" className="!h-5 !text-[10px]" />
            ))}
        </div>
    );

    const addRule = () => {
        appendRule({
            ruleType: "Best of",
            assessment: [assessmentOptions["Best of"][0]]
        });
    };

    const removeRuleItem = (index) => {
        if (ruleFields.length > 1) {
            removeRule(index);
        }
    };

    const handleEdit = () => {
        // Reset form to initial values when entering edit mode
        reset({
            rules: initialRules
        });
        setIsEditing(true);
    };

    const handleCancel = () => {
        // Reset form to initial values when canceling
        reset({
            rules: initialRules
        });
        setIsEditing(false);
    };

    const onSubmit = (data) => {
        console.log("Form Data:", data);
        // TODO: Add API call here
        setIsEditing(false);
    };

    return (

        <div className="p-6 h-full">
            {/* Header */}
            <div className="border-b pb-3">
                <h2 className="text-lg font-semibold">Grade Book</h2>
                <p className="text-[11px] text-gray-500 mt-1">Renewal date: 12/06/2025 <span className="ml-2 inline-block h-2 w-2 rounded-full bg-emerald-500 align-middle" /></p>
            </div>
            {/* Tabs + Actions */}
            <ContentLayout className="mt-4">

                <div className="flex justify-between items-center border-b pb-0">
                    <Tabs
                        tabs={tabItems}
                        value={tab}
                        onChange={handleTabChange}
                        indicatorColor="#A3650F"
                        className="flex-1"
                    />

                    <div className="flex items-center gap-4">
                        {/* Active Toggle */}
                        {!isEditing &&
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
                                        {active ? "ACTIVE" : "INACTIVE"}
                                    </span>
                                </div>

                                {/* Actions */}
                                <Button
                                    variant="transparent"
                                    size="small"
                                    onClick={handleEdit}
                                >
                                    <EditIcon fontSize="small" />
                                    <span className="font-medium text-xs uppercase">Edit</span>
                                </Button>
                            </>
                        }

                    </div>

                </div>

                {/* Program Info Card */}
                {tab === 0 && (
                    <div className="mt-4">

                        {/* Version bar */}
                        <div className="flex items-center justify-between px-1 py-3">
                            <div>
                                <div className="text-sm font-semibold">Version 1.0</div>
                                <div className="mt-1 text-[12px] font-medium">
                                    Created on 12/02/2025 by <span className="font-medium">Chetan kumar.V</span>
                                    <span className="ml-3 inline-flex gap-2">
                                        <span className="text-xs px-2 py-1 rounded bg-fuchsia-100 text-fuchsia-600 font-semibold">
                                            Feb 21
                                        </span>
                                        <span className="text-xs px-2 py-1 rounded bg-fuchsia-100 text-fuchsia-600 font-semibold">
                                            Mar 21
                                        </span>
                                    </span>
                                </div>
                            </div>

                            <div>
                                {!isEditing ? (
                                    <Select
                                        value={version}
                                        onChange={(e) => setVersion(e.target.value)}
                                        options={[
                                            { value: "v1.0", label: "Version v1.0" },
                                            { value: "v1.1", label: "Version v1.1" },
                                            { value: "v2.0", label: "Version v2.0" }
                                        ]}
                                        className="!min-w-[140px] !mb-0"
                                    />
                                ) : (
                                    <div className="flex items-center gap-4">
                                        <Button variant="cancel" size="small" onClick={handleCancel}>Cancel</Button>
                                        <Button variant="outline" size="small" className="text-fuchsia-700 border-fuchsia-500">Save as New</Button>
                                        <Button 
                                            variant="primary" 
                                            size="small" 
                                            className="uppercase" 
                                            onClick={handleFormSubmit(onSubmit)}
                                            disabled={!isFormValid}
                                        >
                                            Update
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Rules - view or edit */}
                        <div className="px-1 pb-5">
                            {!isEditing ? (
                                <Card className="shadow-none border">
                                    <div className="">
                                        <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-3">
                                            {/* Best of */}
                                            <div className="text-xs font-semibold text-[#FF5600] flex items-center">
                                                <span className="inline-flex items-center justify-center px-1 pt-2 w-full md:w-auto">Rule Type</span>
                                            </div>
                                            <div className="text-xs font-semibold text-[#FF5600] flex items-center">
                                                <span className="inline-flex items-center justify-center px-1 pt-2 w-full md:w-auto">Assessment</span>
                                            </div>

                                            <div className="mt-2">
                                                <div className="inline-flex items-center rounded-md border px-4 py-2 text-sm bg-white w-36">Best of</div>
                                            </div>
                                            <div className="mt-2">
                                                <input readOnly value="IA-1, IA2" className="w-full md:w-1/3 rounded-md border px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-purple-200" />
                                            </div>

                                            {/* Average of */}
                                            <div className="mt-2">
                                                <div className="inline-flex items-center rounded-md border px-4 py-2 text-sm bg-white w-36">Average of</div>
                                            </div>
                                            <div className="mt-2">
                                                <input readOnly value="Mid-Term Examination + Preparatory" className="w-full md:w-1/3 rounded-md border px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-purple-200" />
                                            </div>

                                            {/* Weightage */}
                                            <div className="mt-2">
                                                <div className="inline-flex items-center rounded-md border px-4 py-2 text-sm bg-white w-36">Weightage</div>
                                            </div>
                                            <div className="mt-2">
                                                <input readOnly value="Annual Examination" className="w-full md:w-1/3 rounded-md border px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-purple-200" />
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            ) : (
                                <ContentLayout>
                                    <div className="">
                                        <div className="grid grid-cols-1 gap-y-4">
                                            {ruleFields.map((field, index) => {
                                                const currentRule = watchedRules[index];
                                                return (
                                                    <div
                                                        key={field.id}
                                                        className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-3 items-center md:w-3/4"
                                                    >
                                                        {/* Rule Type */}
                                                        <div>
                                                            <Controller
                                                                name={`rules.${index}.ruleType`}
                                                                control={control}
                                                                rules={{
                                                                    required: "Rule Type is required"
                                                                }}
                                                                render={({ field: ruleTypeField }) => (
                                                                    <Select
                                                                        label="Rule Type"
                                                                        value={ruleTypeField.value}
                                                                        onChange={(e) => {
                                                                            ruleTypeField.onChange(e.target.value);
                                                                            // Reset assessment when rule type changes
                                                                            handleRuleTypeChange(index, e.target.value);
                                                                        }}
                                                                        options={ruleTypeOptions.map(opt => ({ value: opt, label: opt }))}
                                                                        error={errors.rules?.[index]?.ruleType?.message}
                                                                        className="!mb-0"
                                                                        required
                                                                    />
                                                                )}
                                                            />
                                                        </div>

                                                        {/* Assessment */}
                                                        <div>
                                                            <Controller
                                                                name={`rules.${index}.assessment`}
                                                                control={control}
                                                                rules={{
                                                                    required: "Assessment is required",
                                                                    validate: (value) => {
                                                                        if (!value || (Array.isArray(value) && value.length === 0)) {
                                                                            return "At least one assessment must be selected";
                                                                        }
                                                                        return true;
                                                                    }
                                                                }}
                                                                render={({ field: assessmentField }) => (
                                                                    <Select
                                                                        label="Assessment"
                                                                        multiple={true}
                                                                        value={assessmentField.value}
                                                                        onChange={(e) => assessmentField.onChange(e.target.value)}
                                                                        renderValue={(selected) => renderSelected(selected)}
                                                                        error={errors.rules?.[index]?.assessment?.message}
                                                                        className="!mb-0"
                                                                        required
                                                                        menuItems={assessmentOptions[currentRule?.ruleType || "Best of"].map(opt => (
                                                                            <MenuItem 
                                                                                key={opt} 
                                                                                value={opt}
                                                                                sx={{ justifyContent: 'space-between' }}
                                                                            >
                                                                                <ListItemText primary={opt} />
                                                                                <MuiCheckbox 
                                                                                    size="small" 
                                                                                    checked={Array.isArray(assessmentField.value) && assessmentField.value.indexOf(opt) > -1} 
                                                                                    edge="end"
                                                                                />
                                                                            </MenuItem>
                                                                        ))}
                                                                    />
                                                                )}
                                                            />
                                                        </div>

                                                        {/* Delete button */}
                                                        <div className="flex md:justify-center">
                                                            <IconButton
                                                                aria-label="delete"
                                                                color="error"
                                                                onClick={() => removeRuleItem(index)}
                                                                disabled={ruleFields.length === 1}
                                                            >
                                                                <DeleteOutlineIcon fontSize="small" />
                                                            </IconButton>
                                                        </div>
                                                    </div>
                                                );
                                            })}

                                            <div className="pt-2">
                                                <Button
                                                    variant="outline"
                                                    size="small"
                                                    onClick={addRule}
                                                    className="!rounded-full"
                                                >
                                                    + Add Rule
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </ContentLayout>
                            )}
                        </div>
                    </div>
                )}

                {/* Criteria Tab Content */}

            </ContentLayout>

        </div>




    );
}
