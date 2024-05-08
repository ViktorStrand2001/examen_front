import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import { NextPage } from "next"
import Login from "@/components/LoginForm"

interface Props {}

const Page: NextPage<Props> = ({}) => {
  return (
    <div className="reletive h-screen bg-moose-hero bg-fixed bg-center bg-cover bg-no-repeat z-50">
      <MaxWidthWrapper>
        <Login />
      </MaxWidthWrapper>
    </div>
  )
}

export default Page
