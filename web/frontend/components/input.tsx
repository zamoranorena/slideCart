import React from 'react'

interface InputProps{
    name: string;
    value: string;
    placeholder?: string;
    type: 'text' | 'password' | 'number' ;
    onChange: () => void;   
}

export const Input = ({name, onChange, value, placeholder, type}:InputProps) =>{
    console.log('asdas')
    return(
        <input
        onChange={onChange}
        />
    );
};