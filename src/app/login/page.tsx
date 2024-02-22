import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import { NextPage } from "next"
import Login from "@/components/LoginForm"
import Logo from "@/components/Logo"

interface Props {}

const Page: NextPage<Props> = ({}) => {
  return (
    <div className="reletive h-screen bg-moose-hero bg-fixed bg-center bg-cover bg-no-repeat">
      <div className=" absolute flex justify-center items-center h-full w-full bottom-72">
        <Logo />
      </div>
      <MaxWidthWrapper>
        <Login />
      </MaxWidthWrapper>
    </div>
  )
}

export default Page
