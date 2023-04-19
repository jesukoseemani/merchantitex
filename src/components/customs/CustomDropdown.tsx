import React from 'react'


type DropDown<T> = T extends number | string ? {
    data: Array<string | number>;
    labelProps?: never;
    ValueProps?: never;
} : {
    data: Array<T>;
    labelProps: keyof T;
    ValueProps: keyof T;
}

function CustomDropdown<T>(props: DropDown<T>) {
    return (
        <div>
            <select name="" id="">

                <option value="1">1</option>
            </select>
        </div>
    )
}

export default CustomDropdown