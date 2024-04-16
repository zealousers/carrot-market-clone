import Input from "@/components/input";
import Button from "@/components/button";
import { useFormState } from "react-dom";
import { smsVerification } from "./actions";

export default function SMSLogin() {
  const [state, dispatch] = useFormState(smsVerification, null);
  return (
    <div className='flex flex-col gap-10 py-8 px-6'>
      <div className='flex flex-col gap-2 *:font-medium'>
        <h1 className='text-2xl'>SMS Login</h1>
        <h2 className='text-xl'>Verify your phone number.</h2>
      </div>
      <form action={dispatch} className='flex flex-col gap-3'>
        <Input name='number' type='number' placeholder='Phone number' required={true} errors={[]} />
        <Input
          name='confirmNumber'
          type='number'
          placeholder='Verification code'
          required={true}
          errors={[]}
        />

        <Button text='Verify' />
      </form>
    </div>
  );
}
