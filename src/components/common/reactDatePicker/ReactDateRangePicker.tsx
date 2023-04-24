import { StartEndDataType } from "helper/types/datePicker/dateRangePicker";
import React, { useEffect, useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";

interface ReactDateRangePickerPropsType {
    handleChange: (dateTitle: string, dateValue: string | null | Date) => void
}

const ReactDateRangePicker = ({ handleChange }: ReactDateRangePickerPropsType) => {
    const [value, setValue] = useState<StartEndDataType | null>({ startDate: null, endDate: null });

    const handleValueChange = (newValue: StartEndDataType | null) => {
        const { startDate, endDate } = newValue;
        setValue(newValue);
        if (!startDate || !endDate) {
            handleChange("from_date", startDate);
            handleChange("to_date", endDate);
        }
    }

    useEffect(() => {
        if (value.startDate) handleChange("from_date", value.startDate);
        if (value.endDate) handleChange("to_date", value.endDate);
    }, [value])


    return (
        <Datepicker
            separator={"to"}
            useRange={false}
            value={value}
            onChange={handleValueChange}
            containerClassName="min-w-[250px]"
            inputClassName="border focus:outline-none pr-3 placeholder:text-black/80 placeholder:text-xs"
            placeholder={"Date Range"}
        />

    );
}

export default ReactDateRangePicker;
