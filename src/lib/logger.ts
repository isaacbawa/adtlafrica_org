"use client";

import toast from "react-hot-toast";

export const logger = {
    error: (message: string, ...args: any[]) => {
        if (typeof window !== "undefined") {
            toast.error(message);
        } else {
            console.error(message, ...args);
        }
    },
    info: (message: string, ...args: any[]) => {
        if (typeof window !== "undefined") {
            toast.success(message);
        } else {
            console.info(message, ...args);
        }
    },
    warn: (message: string, ...args: any[]) => {
        if (typeof window !== "undefined") {
            toast(message, { icon: "⚠️" });
        } else {
            console.warn(message, ...args);
        }
    },
};