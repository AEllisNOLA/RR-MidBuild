import React from 'react'
import Input from '../components/Input'
import { CiUser } from "react-icons/ci"
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiLock, FiMail } from 'react-icons/fi';
import { BsTelephone } from 'react-icons/bs';
import axios from "axios";
import validator from 'validator';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';


const FormSchema = z
    .object({
        email: z.string().email("Enter a valid e-mail address."),
        password: z.
            string()
            .min(8, "Password must be at least 8 characters.")
            .max(28, "Password must be 28 characters or less."),
    })

type FormSchemaType = z.infer<typeof FormSchema>;
const LogInForm = (props: any) => {
    const router = useRouter();
    const path = router.pathname;
    const { callbackUrl, csrfToken } = props;
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormSchemaType>({
        resolver: zodResolver(FormSchema)
    });

    const onSubmit: SubmitHandler<FormSchemaType> = async (values) => {
        try {
            const res: any = await signIn('credentials', {
                redirect: true,
                email: values.email,
                password: values.password,
                callbackUrl,
            })

        } catch (error) {
            alert("Something went wrong")
        }

    }

    return (
        <div>
            <form method="post" action="/api/auth/signin/email" className="my-8 text-sm" onSubmit={handleSubmit(onSubmit)}>
                <input type="hidden" name="csrfToken" defaultValue={csrfToken} />


                <div className="w-full px-12 py-4">
                    <h2 className="text-center text-2xl font-bold tracking-wide text-gray-800">
                        Sign In
                    </h2>
                    <p className="text-center text-sm text-gray-600 mt-2">Don't have an account?&nbsp;
                        <a className="text-blue-600 hover:text-blue-700 hover:underline cursor-pointer"
                            onClick={() => {
                                router.push({
                                    pathname: path,
                                    query: {
                                        tab: 'signup'
                                    }
                                })
                            }}>
                            Sign Up
                        </a>
                    </p>
                    <div className="gap-2">

                        <Input register={register} error={errors?.email?.message} disabled={isSubmitting} label="E-mail" name="email" type="text" placeholder="JDoe@ASU.edu" icon={<FiMail />} />
                        <Input register={register} error={errors?.password?.message} disabled={isSubmitting} label="Password" name="password" type="password" placeholder="Password123$!" icon={<FiLock />} />



                    </div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default LogInForm



