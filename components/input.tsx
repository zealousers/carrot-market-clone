import { InputHTMLAttributes } from "react";

interface InputProps {
  name: string;
  errors?: string[];
}
export default function Input({
  name,
  errors = [],
  ...rest
}: InputProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className='flex flex-col gap-2'>
      <input
        className='bg-transparent rounded-lg w-full h-10 focus:outline-none ring-1 ring-neutral-200 focus:ring-2 focus:ring-orange-500 border-none placeholder:text-neutral-400'
        name={name}
        {...rest}
      />
      {errors.map((error, index) => (
        <span key={index} className='text-red-500'>
          {error}
        </span>
      ))}
    </div>
  );
}
