import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { DetailHeader, SideNav } from '../../../../shared-elements';
import InfoIcon from "@mui/icons-material/Info";
import DescriptionIcon from "@mui/icons-material/Description";
import BusinessIcon from "@mui/icons-material/Business";
import BookIcon from "@mui/icons-material/Book";

const programNavItems = [
    { label: "Info", path: "/apps/program/details/info", icon: InfoIcon },
    { label: "Term", path: "/apps/program/details/term", icon: DescriptionIcon },
    { label: "Busi.Unit", path: "/apps/program/details/business-unit", icon: BusinessIcon },
    { label: "Grade Book", path: "/apps/program/details/grade-book", icon: BookIcon },
];

export default function ProgramDetails() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col" style={{ height: '100%' }}>
            {/* Full-width Header */}
            <DetailHeader
                title="Artificial Intelligence"
                subtitle="UG | Regular | 4 years | 08 Terms"
                onBack={() => navigate("/apps/program")}
            />

            {/* Below Header: Sidebar + Main Content */}
            <div className="flex flex-1 min-h-0">
                {/* Dark Grey Sidebar */}
                <SideNav items={programNavItems} />

                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto min-h-0 custom-scrollbar">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}