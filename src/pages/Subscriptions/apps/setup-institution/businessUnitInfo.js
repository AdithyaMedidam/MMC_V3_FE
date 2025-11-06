import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import {
    Search as SearchIcon,
    Add as AddIcon,
    ArrowBack as ArrowBackIcon,
    Business as BusinessIcon,
    School as SchoolIcon,
    AccountBalance as AccountBalanceIcon,
    Person as PersonIcon,
} from "@mui/icons-material";
import { DetailHeader, SideNav } from "../../../../shared-elements";

const navItems = [
    { label: "Affiliation", path: "/apps/setup-institution/business-unit/affiliation", icon: BusinessIcon },
    { label: "Departments", path: "/apps/setup-institution/business-unit/departments", icon: SchoolIcon },
    { label: "Subscriptions", path: "/apps/setup-institution/business-unit/subscriptions", icon: AccountBalanceIcon },
    { label: "Account", path: "/apps/setup-institution/business-unit/account", icon: PersonIcon },
];

export default function BusinessUnitInfo() {
    const navigate = useNavigate();

    return (

        <div className="flex flex-col" style={{ height: '100%' }}>
            {/* Full-width Header */}
            <DetailHeader
                title="Christ University"
                subtitle="Affiliated, Kengeri"
                onBack={() => navigate("/apps/setup-institution")}
            />

            {/* Below Header: Sidebar + Main Content */}
            <div className="flex flex-1 min-h-0">
                {/* Dark Grey Sidebar */}
                <SideNav items={navItems} />

                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto min-h-0 custom-scrollbar">
                    <Outlet />
                </main>
            </div>
        </div>

    );
}