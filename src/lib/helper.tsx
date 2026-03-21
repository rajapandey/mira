"use client";

import { format } from "date-fns";

export const CurrentYear = () => {
    return format(new Date(), 'yyyy')
};
