import Logo from "@/components/Logo"
import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import RegisterFrom from "@/components/RegisterFrom"
import { NextPage } from "next"

interface Props {}

const Page: NextPage<Props> = ({ }) => {
  
  return (
    <div className="reletive h-screen bg-fireplace-hero bg-fixed bg-center bg-cover bg-no-repeat ">
      <MaxWidthWrapper>
        <RegisterFrom />
      </MaxWidthWrapper>
    </div>
  )
}

export default Page
