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
import Link from 'next/link';


const FormSchema = z
    .object({
        first_name: z.string()
            .min(2, "You must enter a first name.")
            .max(28, "First name must be 28 characters or less.")
            .regex(new RegExp("^[a-zA-Z]+$"), "No special characters"),

        last_name: z.string()
            .min(2, "You must enter a last name.")
            .max(28, "Last name must be 28 characters or less.")
            .regex(new RegExp("^[a-zA-Z]+$"), "No special characters"),
        email: z.string().email("Enter a valid e-mail address."),
        confirmPassword: z.string()
            .min(8, "Password must be at least 8 characters and contain uppercase, lowercase, symbols and numbers.")
            .max(28, "Password must be 28 characters or less."),
        password: z.
            string()
            .min(8, "Password must be at least 8 characters.")
            .max(28, "Password must be 28 characters or less."),
    }).refine((data) => data.password === data.confirmPassword, {
        message: "Passwords must match.",
        path: ["confirmPassword"]

    })
    .superRefine(({ password }, checkPassComplexity) => {
        const containsUppercase = (ch: string) => /[A-Z]/.test(ch);
        const containsLowercase = (ch: string) => /[a-z]/.test(ch);
        const containsSpecialChar = (ch: string) =>
            /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/.test(ch);
        let countOfUpperCase = 0,
            countOfLowerCase = 0,
            countOfNumbers = 0,
            countOfSpecialChar = 0;
        for (let i = 0; i < password.length; i++) {
            let ch = password.charAt(i);
            if (!isNaN(+ch)) countOfNumbers++;
            else if (containsUppercase(ch)) countOfUpperCase++;
            else if (containsLowercase(ch)) countOfLowerCase++;
            else if (containsSpecialChar(ch)) countOfSpecialChar++;
        }
        if (
            countOfLowerCase < 1 ||
            countOfUpperCase < 1 ||
            countOfSpecialChar < 1 ||
            countOfNumbers < 1
        ) {
            checkPassComplexity.addIssue({
                code: "custom",
                path: ["confirmPassword"],
                message: "Use one of each: uppercase, lowercase, number and special character",
            });
        }
    });





type FormSchemaType = z.infer<typeof FormSchema>;
const RegisterForm = (props: any) => {



    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<FormSchemaType>({
        resolver: zodResolver(FormSchema)
    });

    const onSubmit: SubmitHandler<FormSchemaType> = async (values) => {
        try {
            const { data } = await axios.post("/api/auth/signup", {
                ...values
            })
        } catch (error: any) {
            alert(error.response.data.message)

        }

    }




    return (
        <div>
            <form className="my-8 text-sm" onSubmit={handleSubmit(onSubmit)}>


                <div className="w-full px-12 py-4">
                    <h2 className="text-center text-2xl font-bold tracking-wide text-gray-800">
                        Register
                    </h2>
                    <p className="text-center text-sm text-gray-600 mt-2">Already have an account?&nbsp;
                        <Link className="text-blue-600 hover:text-blue-700 hover:underline cursor-pointer" href={'/auth'}>
                            Sign in
                        </Link>
                    </p>
                    <div className="gap-2">
                        <Input register={register} error={errors?.first_name?.message} disabled={isSubmitting} label="First Name" name="first_name" type="text" placeholder="John" icon={<CiUser />} />
                        <Input register={register} error={errors?.last_name?.message} disabled={isSubmitting} label="Last Name" name="last_name" type="text" placeholder="Doe" icon={<CiUser />} />
                        <Input register={register} error={errors?.email?.message} disabled={isSubmitting} label="E-mail" name="email" type="text" placeholder="JDoe@ASU.edu" icon={<FiMail />} />
                        <Input register={register} error={errors?.password?.message} disabled={isSubmitting} label="Password" name="password" type="password" placeholder="Password123$!" icon={<FiLock />} />
                        <Input register={register} error={errors?.confirmPassword?.message} disabled={isSubmitting} label="Confirm Password" name="confirmPassword" type="password" placeholder="Password123$!" icon={<FiLock />} />


                    </div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default RegisterForm



