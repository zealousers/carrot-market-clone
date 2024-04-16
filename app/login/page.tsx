"use client";
import Input from "@/components/input";
import Button from "@/components/button";
import SocialLogin from "@/components/social-login";
import { redirect } from "next/dist/server/api-utils";
import { useFormState } from "react-dom";
import { handleForm } from "./actions";

export default function Login() {
  // const onClick = async () => {
  //   const response = await fetch("/api/users", {
  //     method: "POST",
  //     body: JSON.stringify({ username: "choi", password: "1234" }),
  //   });
  //   console.log(await response.json());
  // };

  const [state, action] = useFormState(handleForm, null);
  return (
    <div className='flex flex-col gap-10 py-8 px-6'>
      <div className='flex flex-col gap-2 *:font-medium'>
        <h1 className='text-2xl'>안녕하세요!</h1>
        <h2 className='text-xl'>Log in with email and password.</h2>
      </div>
      <form action={action} className='flex flex-col gap-3'>
        <Input type='email' placeholder='Email' required={true} errors={[]} name='email' />
        <Input
          type='password'
          placeholder='Password'
          required={true}
          errors={state?.errors ?? []}
          name='password'
        />
        {/* <span onClick={onClick}> */}
        <Button text='Login' />
        {/* </span> */}
      </form>
      <SocialLogin />
    </div>
  );
}
