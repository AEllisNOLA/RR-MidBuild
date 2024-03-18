import { NextPageContext } from "next";
import { useSession, getSession, signIn, signOut } from "next-auth/react"
import Header from '../styles/components/Header';
import Footer from '../styles/components/Footer';

export default function Home() {
  const { data: session } = useSession();

  return (
    <>

      <div className="min-h-screen">
        <Header />


        <div className="h-screen w-screen flex items-center justify-center">
      
        </div>

      </div>
      <Footer />



    </>
  )
}

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  return {
    props: { session },
  }

}