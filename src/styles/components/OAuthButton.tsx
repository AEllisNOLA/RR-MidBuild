import { signIn, useSession, signOut } from 'next-auth/react';
import React from 'react';
import { FaGoogle } from "react-icons/fa";


const OAuthButton = (props: any) => {

    const { id, text, csrfToken } = props;

    const createProviderIcon = () => {
        switch (id) {
            case "google":
                return <FaGoogle />
        }
    }


    return (
        <form method="post" action={`/api/auth/signin/${id}`}>
            <input type="hidden" name="csrfToken" defaultValue={csrfToken} />

            <button
                className="mb-2 py-2 px-4 flex justify-center items-center gap-2"
                type="button"
                onClick={() => signIn(id)}>
                {createProviderIcon()}
                {text}
        
            </button>
        </form>
    )
}

export default OAuthButton;