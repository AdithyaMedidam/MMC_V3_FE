import React from "react";
import { Outlet } from "react-router-dom";
import MenuBookIcon from "@mui/icons-material/MenuBook";      // for Subjects
import QuizIcon from "@mui/icons-material/Quiz";               // for QA Bank
import SchoolIcon from "@mui/icons-material/School";           // for LMS
import AssessmentIcon from "@mui/icons-material/Assessment";   // for Assessment
import EventNoteIcon from "@mui/icons-material/EventNote";     // for Time Table
import ArticleIcon from "@mui/icons-material/Article";         // for Thesis
import ScienceIcon from "@mui/icons-material/Science";         // for Research
import TimelineIcon from "@mui/icons-material/Timeline";       // for Activity
import { DetailHeader, SideNav } from "../../../../../shared-elements";

const sidebarNavItems = [
  { label: "Subjects", path: "/apps/program/details/term/subject", icon: MenuBookIcon },
  { label: "QA Bank", path: "/apps/program/details/term/subject/qa-bank", icon: QuizIcon },
  { label: "LMS", path: "/apps/program/details/term/subject/lms", icon: SchoolIcon },
  { label: "Assessment", path: "/apps/program/details/term/subject/assessment", icon: AssessmentIcon },
  { label: "Time Table", path: "/apps/program/details/term/subject/time-table", icon: EventNoteIcon },
  { label: "Thesis", path: "/apps/program/details/term/subject/thesis", icon: ArticleIcon },
  { label: "Research", path: "/apps/program/details/term/subject/research", icon: ScienceIcon },
  { label: "Activity", path: "/apps/program/details/term/subject/activity", icon: TimelineIcon },
];


export default function SubjectDetails() {
    return (
        <div className="flex flex-col" style={{ height: '100%' }}>
            {/* Full-width Header */}
            <DetailHeader
                title="Term 01"
                subtitle="Artificial Intelligence | 6 Subjects"
                backPath="/apps/program/details/term"
                // bgColor="#210035"
                // className="h-20 w-full fixed top-26 z-50"
            />

            {/* Below Header: Sidebar + Main Content */}
            <div className="flex flex-1 min-h-0">
                {/* Dark Grey Sidebar */}
                <SideNav
                    items={sidebarNavItems}
                    width="w-fit"
                    bgColor="#2C2C38"
                />

                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto min-h-0 custom-scrollbar">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}