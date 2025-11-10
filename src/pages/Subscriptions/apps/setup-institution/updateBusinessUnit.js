import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Input, Select, Checkbox, Button, ContentLayout } from "../../../../shared-elements";

export default function UpdateBusinessUnit({ onClose }) {
    // React Hook Form setup
    const { 
        control, 
        handleSubmit, 
        formState: { errors, isValid } 
    } = useForm({
        mode: 'onChange', // Validate on change for real-time feedback
        defaultValues: {
            businessUnitName: "",
            unitLocation: "",
            unitType: "Own",
            establishedYear: "",
            isHeadquarter: false,
            contactPersonName: "",
            email: "",
            phoneNumber: "",
            flatNo: "",
            flatName: "",
            streetAddress: "",
            areaLocality: "",
            townCity: "",
            pinCode: "",
            state: "",
            country: "",
            useLogoForAllBranches: false
        }
    });

    // Check if form is valid (no errors and all required fields filled)
    const isFormValid = isValid && Object.keys(errors).length === 0;

    // Logo upload state (separate from form as it's file handling)
    const [logoFile, setLogoFile] = React.useState(null);
    const [logoPreview, setLogoPreview] = React.useState("");
    const [logoError, setLogoError] = React.useState("");
    const logoInputRef = React.useRef(null);

    const handlePickLogo = () => {
        logoInputRef.current?.click();
    };

    const handleLogoChange = (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;
        setLogoError("");
        // Validate type
        const validTypes = ["image/png", "image/jpeg"];
        if (!validTypes.includes(file.type)) {
            setLogoError("Only JPG or PNG images are allowed.");
            return;
        }
        // Validate size (2MB)
        const maxBytes = 2 * 1024 * 1024;
        if (file.size > maxBytes) {
            setLogoError("File too large. Max 2MB.");
            return;
        }
        setLogoFile(file);
        const url = URL.createObjectURL(file);
        setLogoPreview(url);
    };

    React.useEffect(() => {
        return () => {
            if (logoPreview) URL.revokeObjectURL(logoPreview);
        };
    }, [logoPreview]);

    // Form submission handler
    const onSubmit = (data) => {
        console.log("Form Data:", data);
        console.log("Logo File:", logoFile);
        // TODO: Add your API call here
        // onClose(); // Close after successful update
    };

    const handleClose = () => {
        onClose();
    }

    return (
        <div className="min-h-[100svh]">
            {/* Top action bar */}
            <div className="top-0 z-10 flex items-center justify-between gap-4 px-8 py-6">
                <div>
                    <h1 className="text-xl font-semibold text-gray-800">Update Business Unit</h1>
                </div>
                <div className="flex gap-4 items-center">
                    <Button
                        variant="cancel"
                        size="small"
                        onClick={handleClose}
                        className="!border-gray-300 !text-gray-700"
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="primary"
                        size="small"
                        onClick={handleSubmit(onSubmit)}
                        className="!uppercase min-w-[80px]"
                        disabled={!isFormValid}
                    >
                        Update
                    </Button>
                </div>
            </div>

            <div className="mx-auto w-full px-4 pb-6">
                <ContentLayout className="mt-2">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-12 lg:w-4/5">
                        {/* Business unit name */}
                        <div className="md:col-span-4">
                            <Controller
                                name="businessUnitName"
                                control={control}
                                rules={{ 
                                    required: "Business unit name is required" 
                                }}
                                render={({ field }) => (
                                    <Input
                                        label="Business unit Name"
                                        placeholder="eg. Christ University"
                                        required
                                        {...field}
                                        error={errors.businessUnitName?.message}
                                        className="!mb-0"
                                    />
                                )}
                            />
                            <div className="mt-3">
                                <Controller
                                    name="isHeadquarter"
                                    control={control}
                                    render={({ field }) => (
                                        <Checkbox
                                            label={<span className="text-xs text-gray-600">Set as Headquarter</span>}
                                            checked={field.value}
                                            onChange={(e) => field.onChange(e.target.checked)}
                                        />
                                    )}
                                />
                            </div>
                        </div>

                        {/* Unit Location (Optional) */}
                        <div className="md:col-span-3">
                            <Controller
                                name="unitLocation"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        label="Unit Location (Optional)"
                                        placeholder="eg. Whitefield"
                                        {...field}
                                        className="!mb-0"
                                    />
                                )}
                            />
                        </div>

                        {/* Unit Type */}
                        <div className="md:col-span-2">
                            <Controller
                                name="unitType"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        label="Unit Type"
                                        value={field.value}
                                        onChange={(e) => field.onChange(e.target.value)}
                                        options={[
                                            { value: "Own", label: "Own" },
                                            { value: "Affiliated", label: "Affiliated" },
                                            { value: "Partner", label: "Partner" },
                                            { value: "Constituent", label: "Constituent" }
                                        ]}
                                        className="!mb-0"
                                        SelectProps={{ size: "small" }}
                                    />
                                )}
                            />
                        </div>

                        {/* Established Year */}
                        <div className="md:col-span-3">
                            <Controller
                                name="establishedYear"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        label="Established Year"
                                        placeholder="1975"
                                        {...field}
                                        className="!mb-0"
                                        onlyNumbers
                                        minValue={1900}
                                        maxValue={new Date().getFullYear()}
                                    />
                                )}
                            />
                        </div>

                        {/* Organization Contact information */}
                        <div className="md:col-span-12">
                            <div className="text-sm font-medium text-gray-600 mb-4">Organization Contact information</div>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
                                <div className="md:col-span-4">
                                    <Controller
                                        name="contactPersonName"
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                label="Contact Person Name"
                                                placeholder="Enter Full Name"
                                                {...field}
                                                className="!mb-0"
                                            />
                                        )}
                                    />
                                </div>
                                <div className="md:col-span-4">
                                    <Controller
                                        name="email"
                                        control={control}
                                        rules={{
                                            required: "Email is required",
                                            pattern: {
                                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                message: "Please enter a valid email address"
                                            }
                                        }}
                                        render={({ field }) => (
                                            <Input
                                                label="Email id"
                                                type="email"
                                                placeholder="eg.christuniversity@gmail.com"
                                                required
                                                emailValidation
                                                {...field}
                                                error={errors.email?.message}
                                                className="!mb-0"
                                            />
                                        )}
                                    />
                                </div>
                                <div className="md:col-span-4">
                                    <Controller
                                        name="phoneNumber"
                                        control={control}
                                        rules={{
                                            required: "Phone number is required",
                                            validate: (value) => {
                                                const digits = value.replace(/\D/g, '');
                                                return digits.length === 10 || "Phone number must be 10 digits";
                                            }
                                        }}
                                        render={({ field }) => (
                                            <Input
                                                label="Phone number"
                                                placeholder="98765-43210"
                                                required
                                                phoneFormat
                                                onlyNumbers
                                                {...field}
                                                error={errors.phoneNumber?.message}
                                                className="!mb-0"
                                            />
                                        )}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Organization Address */}
                        <div className="md:col-span-12 mt-2">
                            <div className="text-sm font-medium text-gray-600 mb-4">Organization Address</div>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
                                <div className="md:col-span-3">
                                    <Controller
                                        name="flatNo"
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                label="Flat No"
                                                placeholder="Enter here"
                                                {...field}
                                                className="!mb-0"
                                            />
                                        )}
                                    />
                                </div>
                                <div className="md:col-span-9">
                                    <Controller
                                        name="flatName"
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                label="Flat Name / Building Name"
                                                placeholder="Enter here"
                                                {...field}
                                                className="!mb-0"
                                            />
                                        )}
                                    />
                                </div>
                                <div className="md:col-span-12">
                                    <Controller
                                        name="streetAddress"
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                label="Street Address line"
                                                placeholder="Enter here"
                                                {...field}
                                                className="!mb-0"
                                            />
                                        )}
                                    />
                                </div>
                                <div className="md:col-span-12">
                                    <Controller
                                        name="areaLocality"
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                label="Area / Locality"
                                                placeholder="Enter here"
                                                {...field}
                                                className="!mb-0"
                                            />
                                        )}
                                    />
                                </div>
                                <div className="md:col-span-6">
                                    <Controller
                                        name="townCity"
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                label="Town / City"
                                                placeholder="Enter here"
                                                {...field}
                                                className="!mb-0"
                                            />
                                        )}
                                    />
                                </div>
                                <div className="md:col-span-6">
                                    <Controller
                                        name="pinCode"
                                        control={control}
                                        rules={{
                                            validate: (value) => {
                                                // Only validate if value is provided
                                                if (!value || value.trim() === '') {
                                                    return true; // Allow empty (not required)
                                                }
                                                const digits = value.replace(/\D/g, '');
                                                return digits.length === 6 || "Pin code must be 6 digits";
                                            }
                                        }}
                                        render={({ field }) => (
                                            <Input
                                                label="Pin Code"
                                                placeholder="Enter here"
                                                onlyNumbers
                                                min={6}
                                                max={6}
                                                {...field}
                                                error={errors.pinCode?.message}
                                                className="!mb-0"
                                            />
                                        )}
                                    />
                                </div>
                                <div className="md:col-span-6">
                                    <Controller
                                        name="state"
                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                label="State"
                                                value={field.value}
                                                onChange={(e) => field.onChange(e.target.value)}
                                                options={[
                                                    { value: "", label: "Select" },
                                                    { value: "Andhra Pradesh", label: "Andhra Pradesh" },
                                                    { value: "Karnataka", label: "Karnataka" }
                                                ]}
                                                className="!mb-0"
                                                SelectProps={{ size: "small" }}
                                            />
                                        )}
                                    />
                                </div>
                                <div className="md:col-span-6">
                                    <Controller
                                        name="country"
                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                label="Country"
                                                value={field.value}
                                                onChange={(e) => field.onChange(e.target.value)}
                                                options={[
                                                    { value: "", label: "Select" },
                                                    { value: "India", label: "India" },
                                                    { value: "USA", label: "USA" }
                                                ]}
                                                className="!mb-0"
                                                SelectProps={{ size: "small" }}
                                            />
                                        )}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Upload Organization Logo */}
                        <div className="md:col-span-12 mt-2 pt-2 ">
                            <div className="text-sm font-medium text-gray-600 mb-4">Upload Organization Logo</div>
                            <div className="flex items-start gap-4">
                                <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-lg border border-dashed bg-gray-50 text-gray-400 flex-shrink-0">
                                    {logoPreview ? (
                                        <img src={logoPreview} alt="Logo preview" className="h-full w-full object-cover" />
                                    ) : (
                                        <span className="text-xs">64×64</span>
                                    )}
                                </div>
                                <div className="space-y-3 flex-1">
                                    <input
                                        ref={logoInputRef}
                                        type="file"
                                        accept="image/png,image/jpeg"
                                        className="hidden"
                                        onChange={handleLogoChange}
                                    />
                                    <div>
                                        <Button
                                            variant="outline"
                                            size="small"
                                            onClick={handlePickLogo}
                                            className="normal-case"
                                        >
                                            Upload Logo
                                        </Button>
                                    </div>
                                    {logoError && <div className="text-xs text-red-600">{logoError}</div>}
                                    <div className="text-[10px] text-gray-500">JPG or PNG, 2MB Max. Recommended Resolution 600×600px</div>
                                    <Controller
                                        name="useLogoForAllBranches"
                                        control={control}
                                        render={({ field }) => (
                                            <Checkbox
                                                label={<span className="text-xs text-gray-600">Use this logo for all branches</span>}
                                                checked={field.value}
                                                onChange={(e) => field.onChange(e.target.checked)}
                                            />
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </ContentLayout>
            </div>
        </div>
    );
}

