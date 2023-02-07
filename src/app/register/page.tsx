'use client';

import React from 'react'
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { MdCheck, MdErrorOutline, MdWarningAmber, MdInfoOutline } from 'react-icons/md';
import { Tooltip } from 'react-daisyui';

const RegisterFormSchema = z.object({
  firstName: z.string().min(1, { message: 'please enter a valid first name' }),
  lastName: z.string().min(1, { message: 'please enter a valid last name' }),
  userName: z.string().min(5, { message: 'minimum username length 5 characters' }),
  email: z.string().email('please enter a valid email address'),
  password: z.string().min(8, { message: 'minimum password length 8 characters' }).max(16, { message: 'maximum password length 16 characters' }),
  confirmPassword: z.string().min(8, { message: 'minimum password length 8 characters' }).max(16, { message: 'maximum password length 16 characters' }),
}).superRefine(({ confirmPassword, password }, ctx) => {
  if (confirmPassword !== password) {
    ctx.addIssue({
      path: ['confirmPassword'],
      code: "custom",
      message: "passwords do not match"
    });
  }
})

type RegisterFormInput = z.infer<typeof RegisterFormSchema>;

const Register = () => {

  const { register, reset, handleSubmit, formState: { errors, dirtyFields } } = useForm<RegisterFormInput>({ resolver: zodResolver(RegisterFormSchema), mode: 'onChange' });

  const onSubmit: SubmitHandler<RegisterFormInput> = (data) => {

    reset();
  }

  return (
    <div className='grid place-items-center flex-grow lg:min-h-screen w-full code-block-bg'>
      <div className="w-[90%] md:w-4/5 lg:w-1/2 flex flex-col items-center">
        <div className="text-center p-1 mt-6 mb-4">
          <h1 className="text-5xl text-white font-bold">Register to CodeBlock</h1>
        </div>
        <div className="grid place-items-center w-full max-w-lg px-1 py-4 my-4 shadow-2xl text-black bg-white border-2 border-solid border-blue-500 rounded-md">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col items-center w-4/5 md:w-3/4'
          >
            <div className='flex flex-col m-2 w-full'>
              <div className='flex flex-row items-center'>
                <label className='text-lg w-fit font-normal' htmlFor="register-first-name">First Name</label>
                {
                  dirtyFields.firstName ?
                    errors.firstName?.type ?
                      <div className='tooltip tooltip-bottom'
                        data-tip={errors.firstName?.message || ''}
                      >
                        <MdErrorOutline className='text-red-500 text-xl mx-1' />
                      </div>
                      :
                      // <MdInfoOutline className='text-blue-500 text-xl mx-1' />
                      <MdCheck className='text-green-500 text-xl mx-1' />
                    :
                    <></>
                }
              </div>
              <input
                {...register('firstName', { required: true })}
                type="text"
                id="register-first-name"
                className='outline-none py-2 bg-white font-medium px-2 text-base mt-0.5 border-2 border-solid border-blue-300 focus:border-blue-500 hover:border-blue-500 rounded-sm'
              />
            </div>
            <div className='flex flex-col m-2 w-full'>
              <div className='flex flex-row items-center'>
                <label className='text-lg w-fit font-normal' htmlFor="register-last-name">Last Name</label>
                {
                  dirtyFields.lastName ?
                    errors.lastName?.type ?
                      <div className='tooltip tooltip-bottom'
                        data-tip={errors.lastName?.message || ''}
                      >
                        <MdErrorOutline className='text-red-500 text-xl mx-1' />
                      </div>
                      :
                      // <MdInfoOutline className='text-blue-500 text-xl mx-1' />
                      <MdCheck className='text-green-500 text-xl mx-1' />
                    :
                    <></>
                }
              </div>
              <input
                {...register('lastName', { required: true })}
                type="text"
                id="register-last-name"
                className='outline-none py-2 bg-white font-medium px-2 text-base mt-0.5 border-2 border-solid border-blue-300 focus:border-blue-500 hover:border-blue-500 rounded-sm'
              />
            </div>
            <div className='flex flex-col m-2 w-full'>
              <div className='flex flex-row items-center'>
                <label className='text-lg w-fit font-normal' htmlFor="register-user-name">User Name</label>
                {
                  dirtyFields.userName ?
                    errors.userName?.type ?
                      <div className='tooltip tooltip-bottom'
                        data-tip={errors.userName?.message || ''}
                      >
                        <MdErrorOutline className='text-red-500 text-xl mx-1' />
                      </div>
                      :
                      // <MdInfoOutline className='text-blue-500 text-xl mx-1' />
                      <MdCheck className='text-green-500 text-xl mx-1' />
                    :
                    <></>
                }
              </div>
              <input
                {...register('userName', { required: true })}
                type="text"
                id="register-user-name"
                className='outline-none py-2 bg-white font-medium px-2 text-base mt-0.5 border-2 border-solid border-blue-300 focus:border-blue-500 hover:border-blue-500 rounded-sm'
              />
            </div>
            <div className='flex flex-col m-2 w-full'>
              <div className='flex flex-row items-center'>
                <label className='text-lg w-fit font-normal' htmlFor="register-email">Email</label>
                {
                  dirtyFields.email ?
                    errors.email?.message ?
                      <div className='tooltip tooltip-bottom'
                        data-tip={errors.email?.message || ''}
                      >
                        <MdErrorOutline className='text-red-500 text-xl mx-1' />
                      </div>
                      :
                      // <MdInfoOutline className='text-blue-500 text-xl mx-1' />
                      <MdCheck className='text-green-500 text-xl mx-1' />
                    :
                    <></>
                }
              </div>
              <input
                {...register('email', { required: true })}
                type="text"
                id="register-email"
                className='outline-none py-2 bg-white font-medium px-2 text-base mt-0.5 border-2 border-solid border-blue-300 focus:border-blue-500 hover:border-blue-500 rounded-sm'
              />
            </div>
            <div className='flex flex-col m-2 w-full'>
              <div className='flex flex-row items-center'>
                <label className='text-lg w-fit font-normal' htmlFor="register-password">Password</label>
                {
                  dirtyFields.password ?
                    errors.password?.type ?
                      <div className='tooltip tooltip-bottom'
                        data-tip={errors.password?.message || ''}
                      >
                        <MdErrorOutline className='text-red-500 text-xl mx-1' />
                      </div>
                      :
                      // <MdInfoOutline className='text-blue-500 text-xl mx-1' />
                      <MdCheck className='text-green-500 text-xl mx-1' />
                    :
                    <></>
                }
              </div>
              <input
                {...register('password', { required: true })}
                type="password"
                id="register-password"
                className='outline-none py-2 bg-white font-medium px-2 text-base mt-0.5 border-2 border-solid border-blue-300 focus:border-blue-500 hover:border-blue-500 rounded-sm'
              />
            </div>
            <div className='flex flex-col m-2 w-full'>
              <div className='flex flex-row items-center'>
                <label className='text-lg w-fit font-normal' htmlFor="register-confirm-password">Confirm Password</label>
                {
                  dirtyFields.confirmPassword ?
                    errors.confirmPassword?.message ?
                      <div className='tooltip tooltip-bottom'
                        data-tip={errors.confirmPassword?.message || ''}
                      >
                        <MdErrorOutline className='text-red-500 text-xl mx-1' />
                      </div>
                      :
                      // <MdInfoOutline className='text-blue-500 text-xl mx-1' />
                      <MdCheck className='text-green-500 text-xl mx-1' />
                    :
                    <></>
                }
              </div>
              <input
                {...register('confirmPassword', { required: true })}
                type="password"
                id="register-confirm-password"
                className='outline-none py-2 bg-white font-medium px-2 text-base mt-0.5 border-2 border-solid border-blue-300 focus:border-blue-500 hover:border-blue-500 rounded-sm'
              />
            </div>
            <input
              type="submit"
              value="Submit"
              className='p-3 text-white font-medium text-lg bg-blue-600 hover:bg-blue-500 cursor-pointer w-full rounded-sm mt-4 mb-4'
            />
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register