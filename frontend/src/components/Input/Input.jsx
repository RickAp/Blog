import React from "react";
import Paragraph from "../Paragraph/Paragraph";
import Link from "next/link";

const Input = ({ type, label, destination, placeholder, value, onChange }) => {
    return(
        <div className='mb-6'>
            <div className='flex w-[316px] space-x-[170px]'>
                <Paragraph 
                    content={label}
                    color='text-[var(--grayscale-gray)]'
                    size='sm'
                    fontWeight='font-[700]'
                />
                <Link href={'/recoverPassword'}>
                    <p className='text-[10px] font-[400] text-[var(--grayscale-gray)]'>
                        {destination}
                    </p>
                </Link>
            </div>
            <div className='relative'>
                <input 
                    type={type}
                    className='w-[316px] h-[42px] rounded-lg bg-[var(--grayscale-extra-light)] border border-[var(--grayscale-gray-lightest)] border-1 px-3 focus:outline-none'
                    placeholder={placeholder} 
                    value={value}
                    onChange={onChange}
                />
            </div>
            
        </div>
        
    );
};

export default Input;