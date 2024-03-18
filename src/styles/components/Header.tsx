import logo from "../../img/richie-rich-high-resolution-logo-transparent.png";
import Image from "next/image"
import { HiOutlineSearchCircle } from "react-icons/hi";
import { useSession, getSession, signIn, signOut } from "next-auth/react"
import Link from "next/link";





const Header = () => {
    const { data: session } = useSession();

    return <div className="w-full h-20 bg-navy sticky top-0 z-50">
        <div className="w-full h-full mx-auto inline-flex items-center justify-between gap-1: md1:gap-3 px-4" >
            {/* LOGO */}
            <div className="px-2 cursor-pointer flex items-center justify-center">
                <Image className="w-28 mt-1 object-cover pr-5" src={logo} alt="Richie Rich logo" />
            </div>

            {/* SIGN IN */}



            <div className="text-xs text-gray-100 flex inline-flex px-2 border border-transparent h-[70%]">
                {session ? (
                    <div className="inline-flex items-center justify-between gap-5: md1:gap-3 px-4">
                        <img src={session?.user?.image!} alt="user avatar" className="w-12 h-12 rounded-full"></img>

                        <h2 className="pl-3 text-md"> {session?.user?.name}</h2>

                        

                        <Link className="pl-5 text-md font-bold" onClick={() => signOut()} href={"/auth"}>Sign Out</Link>
                    </div>
                ) : (
                    <Link className="pl-5 text-md font-bold" onClick={() => signIn()} href={""}>Sign In</Link>
                )}
            </div>

            {/* WATCHING ???*/}
            {/* NOTIFICATIONS ??? */}
            {/* ACCOUNT ??? */}

        </div>

    </div>
}

export default Header