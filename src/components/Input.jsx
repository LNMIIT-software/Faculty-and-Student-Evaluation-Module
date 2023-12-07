import React, {useId} from "react";

const Input = React.forwardRef(function Input({
    label,
    type = "text",
    className = '',
    ...props
}, ref){
    const id = useId()
    return (
        <div className="w-full">
            {label && <label 
            className="inline-block mb-1 pl-1"
            htmlFor={id}>
                {label}
            </label>}
            <input 
            type={type}
            className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
            ref={ref}
            {...props}
            id={id}
            />
        </div>
    )
})

/*
NEED FOR forwareRef HOOK
Consider we have an input component and a login page which uses the input component. The data that we enter in the input component has to be passed down to the login page. To do so we have to pass the reference of the input which can be used by the login page to use the data. Hence forwardRef is used.
Its like a parent component passing a ref to a child component.
*/

export default Input