import React from "react";
import { useNavigate } from "react-router-dom";
import { Input, Select, Checkbox, Button, Card } from "../../../../shared-elements";

export default function CreateBusinessUnit({ mode, onClose }) {
    console.log(mode);
    const modeType = mode == "update" ? "Update" : "Add"

    const navigate = useNavigate();
    const [unitType, setUnitType] = React.useState("Own");
    const [country, setCountry] = React.useState("");
    const [state, setState] = React.useState("");

    // Logo upload state
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
    const handleClose = () => {
        onClose();
    }

    return (
        <div className="min-h-[100svh]">
            {/* Top action bar */}
            <div className="top-0 z-10 flex items-center justify-between gap-6 px-8 py-6">
                <div>
                    <h1 className="text-xl font-semibold text-gray-800">{modeType} Business Unit</h1>
                </div>
                <div className="flex gap-4 items-center">
                    <Button
                        variant="cancel"
                        size="small"
                        onClick={() => { if (modeType !== 'Update') { navigate(-1) } else { handleClose() } }}
                        className="!border-gray-300 !text-gray-700"
                    >
                        Cancel
                    </Button>
                    {modeType === "Add" ? (
                        <Button
                            variant="primary"
                            size="small"
                            onClick={() => navigate("/apps/setup-institution")}
                            className="!uppercase min-w-[80px]"
                        >
                            Add
                        </Button>
                    ) : (
                        <Button
                            variant="primary"
                            size="small"
                            onClick={handleClose}
                            className="!uppercase min-w-[80px]"
                        >
                            Update
                        </Button>
                    )}
                </div>
            </div>

            <div className="mx-auto w-full px-4 pb-6">
                <Card className="border !shadow-none">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-12 lg:w-4/5">
                        {/* Business unit name */}
                        <div className="md:col-span-4">
                            <Input
                                label="Business unit Name"
                                placeholder="eg. Christ University"
                                required
                                className="!mb-0"
                            />
                            <div className="mt-3">
                                <Checkbox
                                    label={<span className="text-xs text-gray-600">Set as Headquarter</span>}
                                />
                            </div>
                        </div>

                        {/* Unit Location (Optional) */}
                        <div className="md:col-span-3">
                            <Input
                                label="Unit Location (Optional)"
                                placeholder="eg. Whitefield"
                                className="!mb-0"
                            />
                        </div>

                        {/* Unit Type */}
                        <div className="md:col-span-2">
                            <Select
                                label="Unit Type"
                                value={unitType}
                                onChange={(e) => setUnitType(e.target.value)}
                                options={[
                                    { value: "Own", label: "Own" },
                                    { value: "Affiliated", label: "Affiliated" },
                                    { value: "Partner", label: "Partner" },
                                    { value: "Constituent", label: "Constituent" }
                                ]}
                                className="!mb-0"
                                SelectProps={{ size: "small" }}
                            />
                        </div>

                        {/* Established Year */}
                        <div className="md:col-span-3">
                            <Input
                                label="Established Year"
                                placeholder="1975"
                                className="!mb-0"
                            />
                        </div>

                        {/* Organization Contact information */}
                        <div className="md:col-span-12">
                            <div className="text-sm font-medium text-gray-600 mb-4">Organization Contact information</div>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
                                <div className="md:col-span-4">
                                    <Input
                                        label="Contact Person Name"
                                        placeholder="Enter Full Name"
                                        className="!mb-0"
                                    />
                                </div>
                                <div className="md:col-span-4">
                                    <Input
                                        label="Email id"
                                        placeholder="eg.christuniversity@gmail.com"
                                        required
                                        className="!mb-0"
                                    />
                                </div>
                                <div className="md:col-span-4">
                                    <Input
                                        label="Phone number"
                                        placeholder="+91"
                                        required
                                        className="!mb-0"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Organization Address */}
                        <div className="md:col-span-12 mt-2">
                            <div className="text-sm font-medium text-gray-600 mb-4">Organization Address</div>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
                                <div className="md:col-span-3">
                                    <Input
                                        label="Flat No"
                                        placeholder="Enter here"
                                        className="!mb-0"
                                    />
                                </div>
                                <div className="md:col-span-9">
                                    <Input
                                        label="Flat Name / Building Name"
                                        placeholder="Enter here"
                                        className="!mb-0"
                                    />
                                </div>
                                <div className="md:col-span-12">
                                    <Input
                                        label="Street Address line"
                                        placeholder="Enter here"
                                        className="!mb-0"
                                    />
                                </div>
                                <div className="md:col-span-12">
                                    <Input
                                        label="Area / Locality"
                                        placeholder="Enter here"
                                        className="!mb-0"
                                    />
                                </div>
                                <div className="md:col-span-6">
                                    <Input
                                        label="Town / City"
                                        placeholder="Enter here"
                                        className="!mb-0"
                                    />
                                </div>
                                <div className="md:col-span-6">
                                    <Input
                                        label="Pin Code"
                                        placeholder="Enter here"
                                        className="!mb-0"
                                    />
                                </div>
                                <div className="md:col-span-6">
                                    <Select
                                        label="State"
                                        value={state}
                                        onChange={(e) => setState(e.target.value)}
                                        options={[
                                            { value: "", label: "Select" },
                                            { value: "Andhra Pradesh", label: "Andhra Pradesh" },
                                            { value: "Karnataka", label: "Karnataka" }
                                        ]}
                                        className="!mb-0"
                                        SelectProps={{ size: "small" }}
                                    />
                                </div>
                                <div className="md:col-span-6">
                                    <Select
                                        label="Country"
                                        value={country}
                                        onChange={(e) => setCountry(e.target.value)}
                                        options={[
                                            { value: "", label: "Select" },
                                            { value: "India", label: "India" },
                                            { value: "USA", label: "USA" }
                                        ]}
                                        className="!mb-0"
                                        SelectProps={{ size: "small" }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Upload Organization Logo */}
                        <div className="md:col-span-12 mt-2 pt-2 ">
                            <div className="text-sm font-medium text-gray-600 mb-4">Upload Organization Logo</div>
                            <div className="flex items-start gap-6">
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
                                    <Checkbox
                                        label={<span className="text-xs text-gray-600">Use this logo for all branches</span>}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}
