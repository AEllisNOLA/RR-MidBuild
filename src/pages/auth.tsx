import * as React from 'react';
import RegisterForm from '../styles/components/RegisterForm'
import LogInForm from '../styles/components/LogInForm'
import { NextPageContext } from 'next';
import { getCsrfToken, getProviders } from 'next-auth/react';
import OAuthButton from '@/styles/components/OAuthButton';
import { FaGoogle } from "react-icons/fa";



export default function auth({ tab, callbackUrl, csrfToken, providers }: any) {
    return (
        <div className="w-full flex items-center justify-center">
            <div className="w-full h-100 flex items-center justify-center">
                <div className="w-full bg-white flex-col flex items-center justify-center">


                    {
                        tab == "signin" ?
                            <LogInForm callbackUrl={callbackUrl} csrfToken={csrfToken} /> :
                            <RegisterForm />
                    }


                    


                            {/* OAuth providers */}

                            {providers.map((providers: any) => {
                                if (providers.name == "Credentials") return;

                                return (<div>
                                    <OAuthButton
                                        key={providers.id}
                                        id={providers.id}
                                        csrfToken={csrfToken}
                                        text={tab == "signup" ? `Sign up with ${providers.name}` : `Sign in with ${providers.name}`}
                                    />


                                </div>


                                )







                            })}

                        </div>


                

            </div>
        </div>
    )
}

export async function getServerSideProps(ctx: NextPageContext) {
    const { req, query } = ctx;
    const tab = query.tab ? query.tab : "signin";
    const callbackUrl = query.callbackUrl ? query.callbackUrl : process.env.NEXTAUTH_URL;
    const providers = await getProviders();
    console.log(providers?.google.id);
    const csrfToken = await getCsrfToken(ctx);
    return {
        props: {
            providers: Object.values(providers!),
            tab: JSON.parse(JSON.stringify(tab)), callbackUrl, csrfToken
        },

    }
}