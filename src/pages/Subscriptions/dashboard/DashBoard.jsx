import React from "react";
import { Avatar } from "@mui/material";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { Card } from "../../../shared-elements";



export default function DashBoard() {

    return (
        <div className="h-full w-full bg-gradient-to-tr from-[#FBFBFB] from-[50%] via-[#C3E9FFCC] to-[#FDAAFF] ">
            <div className="p-8 px-24">
                <div className="relative w-full h-24 rounded-xl overflow-hidden shadow-md mb-6">
                    {/* Background (image or gradient) */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0f2027] via-[#203a43] to-[#2c5364] opacity-100"></div>
                    <img
                        src="https://www.ibef.org/uploads/blog/1717407195_878999f7baca4f21dbe6.jpg"
                        alt="background"
                        className="absolute inset-0 w-full h-full object-cover opacity-40"
                    />

                    {/* Content */}
                    <div className="relative z-10 flex items-center h-full px-6 text-white">
                        <Avatar
                            src="https://randomuser.me/api/portraits/men/32.jpg"
                            alt="John Williams"
                            sx={{ width: 40, height: 40, marginRight: "12px" }}
                        />
                        <div className="flex flex-col">
                            <h2 className="font-semibold text-sm md:text-base">
                                Good morning! John Williams
                            </h2>
                            <p className="text-xs text-gray-200 flex items-center gap-1">
                                Success is the sum of small efforts repeated day in and out
                                <EmojiEmotionsIcon fontSize="small" className="text-yellow-400" />
                            </p>
                        </div>
                    </div>
                </div>
                <h1 className="text-xl my-4 font-semibold tracking-tight text-gray-900 text-center">STANDARD ADMIN / DASHBOARD</h1>

                {/* <div className="mt-4 mb-4 text-xs font-semibold uppercase tracking-wider text-gray-500"></div> */}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                    {[1, 2, 3, 4].map((box) => (
                        <Card key={box} className="h-64 border">
                            {/* Dummy Box {box} */}
                        </Card>
                        // <div
                        //     key={box}
                        //     className="bg-white border rounded-xl shadow-sm h-64 flex items-center justify-center text-gray-400"
                        // >
                        //     {/* Dummy Box {box} */}
                        // </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
