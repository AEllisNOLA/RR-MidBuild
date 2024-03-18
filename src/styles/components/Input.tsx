import React from 'react'
import Image from "next/image"
import { IoAlertCircle } from "react-icons/io5";


const Input = (props: { name: any; label: any; type: any; icon: JSX.Element; placeholder: any; register: any; disabled: boolean; error: any; }) => {

    const { name, label, type, icon, placeholder, register, error, disabled } = props;

    return <div className="mt-3 w-[100%]">
        <label htmlFor={name} className="text-gray-700">{label}</label>
        <div className="relative mt-1 rounded-md">
            <div className="pointer-event-none absolute left-0 inset-y-0 top-0.5 flex items-center pl-3" style={{ transform: `${error ? "translateY(-10px)" : ''}` }}>
                <span className="text-gray-500 text-sm">{icon}</span>
            </div>


            <input type={type} placeholder={placeholder} {...register(name)} className="w=full py-2 pr-7 pl-8 block rounded-md border border-gray-300 outline-offset-2 outline-transparent focus:border-blue-500 focus:ring-indigo-500 focus:ring-2 text-small" />
            {error && <div className="fill-red-500 absolute right-2 top-2.5 text-xl">
                <IoAlertCircle fill="#ED4337" />
            </div>}
            {error && <p className="text-sm text-[#ED4337] mt-1">{error}</p>}
        </div>
    </div>
}

export default Input