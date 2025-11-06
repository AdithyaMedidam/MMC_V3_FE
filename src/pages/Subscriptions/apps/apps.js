import React from 'react';
import Card from '../../../shared-elements/card/Card';
import {
    Business, GppGood, EventAvailable, Settings, MenuBook, Book,
    LocalLibrary, CreditCard, DirectionsBus, Hotel, School, Badge,
    ArrowCircleUp, VpnKey, SupportAgent, People, Calculate, Inventory2
} from '@mui/icons-material';
import { CardGrid } from '../../../shared-elements';
import { useNavigate } from 'react-router-dom';

const institutionHub = [
    { title: "Setup Institution", desc: "Configure & Manage your organization entities", icon: Business },
    { title: "Compliance Reports", desc: "Manage your accreditation & Compliances", icon: GppGood },
    { title: "Activities", desc: "Create & Monitor Activities", icon: EventAvailable },
];

const modules = [
    { title: "Operations", desc: "Manage end to end administration", icon: Settings, color: "indigo" },
    { title: "Academic Setup", desc: "Manage programs, courses & Subjects", icon: MenuBook, color: "green" },
    { title: "Grade Book", desc: "Sample description goes here", icon: Book, color: "pink" },
    { title: "Library Management", desc: "Sample description goes here", icon: LocalLibrary, color: "indigo" },
    { title: "Fees Management", desc: "Sample description goes here", icon: CreditCard, color: "green" },
    { title: "Transport Management", desc: "Sample description goes here", icon: DirectionsBus, color: "pink" },
    { title: "Hostel Management", desc: "Sample description goes here", icon: Hotel, color: "indigo" },
    { title: "SIS", desc: "Manage all student informations", icon: School, color: "green" },
    { title: "EIS", desc: "Manage all Employee Informations", icon: Badge, color: "pink" },
    { title: "Enrollment & Promotion", desc: "Manage all enrollment activities", icon: ArrowCircleUp, color: "indigo" },
    { title: "Access controls & Roles", desc: "Manage access for all users", icon: VpnKey, color: "green" },
    { title: "Front Desk", desc: "Sample description goes here", icon: SupportAgent, color: "pink" },
    { title: "HR & Payroll", desc: "Sample description goes here", icon: People, color: "indigo" },
    { title: "Finance & Accounting", desc: "Sample description goes here", icon: Calculate, color: "green" },
    { title: "Inventory Management", desc: "Sample description goes here", icon: Inventory2, color: "pink" },
];

const COLOR_MAP = {
    red: {
        iconBg: 'bg-red-50',
        iconText: 'text-red-600',
    },
    indigo: {
        iconBg: 'bg-indigo-50',
        iconText: 'text-indigo-600',
    },
    green: {
        iconBg: 'bg-green-50',
        iconText: 'text-emerald-600',
    },
    pink: {
        iconBg: 'bg-pink-50',
        iconText: 'text-pink-600',
    },
};

const SectionHeader = ({ label }) => (
    <div className="flex items-center gap-2 mt-12 mb-3">
        <span className="uppercase tracking-[1.2px] text-gray-500 text-xs font-semibold">
            {label}
        </span>
        <div className="flex-1 border-t border-gray-200 ml-2"></div>
    </div>
);

const Apps = () => {

    const navigate = useNavigate();
    const handleClick = (title) => {
        if (title === "Academic Setup") {
            navigate("/apps/program");
        }else if (title === "Setup Institution") {
            navigate("/apps/setup-institution");
        }
      
    }

    return (
        <div className="min-h-screen w-full">
            <div className="py-10 px-8 md:px-24">
                <h1 className="text-2xl font-bold mb-8 text-gray-900">Apps</h1>
                {/* Institution Hub */}
                <SectionHeader label="Institution Hub" />
                <CardGrid cols={1} mdCols={2} lgCols={3} gap={5}>
                    {institutionHub.map(({ title, desc, icon: IconComponent }, i) => (
                        <Card key={i} className="border" onClick={() => handleClick(title)}>
                            <div className="flex flex-row items-center gap-3">
                                <span className="p-2 bg-gray-50 rounded-xl">
                                    <IconComponent className="text-red-400" fontSize="medium" />
                                </span>
                                <div>
                                    <h3 className="text-base font-semibold text-gray-900 mb-0">{title}</h3>
                                    <p className="text-xs text-gray-500 mt-1 mb-0">{desc}</p>
                                </div>
                            </div>
                        </Card>
                    ))}
                </CardGrid>

                {/* Modules */}
                <SectionHeader label="Modules" />
                <CardGrid cols={1} mdCols={2} lgCols={4} gap={5}>
                    {modules.map(({ title, desc, icon: IconComponent, color }, i) => {
                        const c = COLOR_MAP[color] || COLOR_MAP.indigo;
                        return (
                            <Card key={i} className="border" onClick={() => handleClick(title)}>
                                <div className="flex flex-row items-center gap-3" >
                                    <span className={`p-2 bg-gray-50 rounded-xl`}>
                                        <IconComponent className={`${c.iconText}`} fontSize="medium" />
                                    </span>
                                    <div>
                                        <h3 className="text-base font-semibold text-gray-900 mb-0">{title}</h3>
                                        <p className="text-xs text-gray-500 mt-1 mb-0">{desc}</p>
                                    </div>
                                </div>
                            </Card>
                        );
                    })}
                </CardGrid>

            </div>
        </div>
    )
}

export default Apps;