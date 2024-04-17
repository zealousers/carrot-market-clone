import Image from "next/image";
import Link from "next/link";

import "@/lib/db";

export default function Home() {
  return (
    // <main className='bg-gray-300 h-screen flex items-center justify-center px-32'>
    //   <div className='bg-white w-full shadow-md rounded-3xl p-5'>
    //     <div className='flex justify-between items-center'>
    //       <div className='flex flex-col'>
    //         <span className='text-gray-600 font-semibold text-md -mb-2'>In transit</span>
    //         <span className='text-black font-bold text-3xl'>Coolblue</span>
    //       </div>
    //       <div className='size-12 rounded-full bg-orange-500' />
    //     </div>
    //     <div className='flex items-center my-2 gap-2'>
    //       <span className='bg-green-400 uppercase font-medium rounded-full px-3 py-1 text-white text-xs hover:bg-green-700 hover:scale-150 '>
    //         TODAY
    //       </span>
    //       <span className='text-black font-medium text-lg'>9:30-10:30u</span>
    //     </div>
    //     <div className='relative'>
    //       <div className='bg-gray-100 rounded-full w-full h-2 absolute' />
    //       <div className='bg-green-500 rounded-full w-3/4 h-2 absolute' />
    //     </div>
    //     <div className='flex justify-between text-gray-500 mt-5 items-center'>
    //       <span>Expected</span>
    //       <span>Sorting center</span>
    //       <span>In transit</span>
    //       <span className='text-gray-400'>Delivered</span>
    //     </div>
    //   </div>

    //   <div className='bg-white w-full max-w-md rounded-3xl shadow-sm p-3 flex flex-col md:flex-row gap-2 *:outline-none has-[:invalid]:ring-red-400 has-[:invalid]:ring ring-transparent transition-shadow'>
    //     <input
    //       className='bg-gray-100 rounded-2xl h-10 px-5 ring ring-transparent w-full focus:ring-blue-300 transition-shadow invalid:focus:ring-red-400 peer'
    //       type='email'
    //       required
    //       placeholder='Search here...'
    //     />
    //     <span className='text-red-500 font-medium hidden peer-invalid:block'>
    //       Email is required
    //     </span>
    //     <button className='bg-gradient-to-br from-cyan-500 to-purple-500 rounded-2xl py-2 px-5 text-white font-medium active:scale-90 transition-transform'>
    //       Search
    //     </button>
    //   </div>

    //   <div className='rounded-3xl w-full max-w-screen-sm flex flex-col gap-4 bg-white'>
    //     <div className='group flex flex-col items-center p-3'>
    //       <input className='bg-gray-100 w-full p-2 rounded-xl' placeholder='Enter Name...' />
    //       <span className='text-red-600 font-medium place-self-start pl-3 group-focus-within:block hidden'>
    //         Make sure it is a valid email...
    //       </span>
    //       <button className='bg-blue-400 p-1 rounded-full w-full max-w-24 text-white font-medium mt-3'>
    //         Submit
    //       </button>
    //     </div>
    //   </div>

    //   <div className='bg-white w-full max-w-md rounded-3xl shadow-sm p-3 flex flex-col md:flex-row gap-2'>
    //     {["Nico", "Me", "You", "Youself", ""].map((person, index) => (
    //       <div
    //         key={index}
    //         className='flex items-center gap-5 p-2.5 odd:bg-gray-100 even:bg-slate-300 odd:rounded-lg even:rounded-lg border-b-4 last:border-b-0 first:border-b-2'>
    //         <div className='bg-blue-500 size-10 rounded-full' />
    //         <span className='text-lg font-medium empty:w-24 empty:h-5 empty:bg-gray-400 empty:rounded-full empty:animate-pulse'>
    //           {person}
    //         </span>
    //         <div className='rounded-full size-6 bg-red-500 text-white flex items-center justify-center relative'>
    //           <span className='z-10'>{index}</span>
    //           <div className='rounded-full size-6 bg-red-500 absolute animate-ping' />
    //         </div>
    //       </div>
    //     ))}
    //   </div>
    // </main>
    <div className='min-h-screen flex flex-col items-center justify-between p-6'>
      <div className='my-auto flex flex-col items-center gap-2 *:font-medium'>
        <span className='text-9xl'>🥕</span>
        <h1 className='text-4xl'>당근</h1>
        <h2 className='text-2xl'>당근 마켓에 어서 오세요!</h2>
      </div>
      <div className='flex flex-col items-center gap-3 w-full'>
        <Link href={`/create-account`} className='primary_btn py-2.5 text-lg max-w-md'>
          시작하기
        </Link>
        <div className='flex gap-2'>
          <span>이미 계정이 있나요?</span>
          <Link className=' hover:underline underline-offset-4' href={"/login"}>
            로그인
          </Link>
        </div>
      </div>
    </div>
  );
}
