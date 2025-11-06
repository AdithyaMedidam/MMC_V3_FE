import React from "react";
import { Card, CardGrid } from '../../../../shared-elements';
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import SchoolIcon from "@mui/icons-material/School";
import Term_Icon from '../../../../assets/img/term_img.png';
import { useNavigate } from "react-router-dom";

export default function TermList() {
    const navigate = useNavigate();
    // Sample data for terms - you can replace this with actual data from your API
    const terms = [
        { id: 1, number: "01", subjects: 6 },
        { id: 2, number: "02", subjects: 0 },
        { id: 3, number: "03", subjects: 6 },
        { id: 4, number: "04", subjects: 6 },
        { id: 5, number: "05", subjects: 6 },
        { id: 6, number: "06", subjects: 6 },
        { id: 7, number: "07", subjects: 6 },
        { id: 8, number: "08", subjects: 6 },
    ];

    return (
        <div className="p-6 h-full">
            {/* Header */}
            <div className=" border-b mb-5 pb-3">
                <h2 className="text-xl font-semibold">All Terms</h2>

            </div>

            {/* Terms Grid */}
            <CardGrid cols={1} mdCols={2} lgCols={4} xlCols={5} gap={5}>
                {terms.map((term) => (
                    <Card
                        key={term.id}
                        className="shadow-none border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => navigate(`/apps/program/details/term/subject`)}
                    >
                        <div className="">
                            <div className="flex items-center gap-4">
                                <img src={Term_Icon} alt="Term" className="h-10" />
                                {/* Content */}
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-1">
                                        Term {term.number}
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        {term.subjects} Subject{term.subjects !== 1 ? "s" : ""}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </CardGrid>
        </div>
    );
}
