"use client"
import Link from "next/link"
import { FC, useState } from "react"
import Logo from "./Logo"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { useRegisterUser } from "@/utils/hooks/useRegisterUserPost"

const RegisterFrom: FC = () => {
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [errorMessage, setErrorMessage] = useState<string>("")
  const router = useRouter()

  const { mutate: register, isError,  } = useRegisterUser()

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage("")
    register({ username, password, email }, 
      {
        onSuccess: (data) => {
          console.log("Registration successful: ", data);
          router.push("/")
        },
        onError: (error: any) => {
          console.log("Registration failed: ", error);
          setErrorMessage(error.message)
        }
      }
    )
  }

  const isRegistrationDisabled = () => {
    const isValidEmail = (email: string) => {
      return email.includes("@")
    }

    const isInvalidPassword = password.length < 8
    const isInvalidEmail = !isValidEmail(email)
    const isInvalidUsername = username.trim() === ""

    return isInvalidPassword || isInvalidEmail || isInvalidUsername
  }

  return (
    <div className="min-h-screen min-w-100 flex items-center justify-center overflow-hidden">
      <div className="backdrop-blur-lg bg-white/30 p-8 rounded-md shadow-md w-96">
        <Logo />
        <form className="w-full mt-4" onSubmit={handleFormSubmit}>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-black"
          >
            Username:
          </label>
          <input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
          />

          <label
            htmlFor="email"
            className="block text-sm font-medium text-black mt-4"
          >
            Email:
          </label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
          />

          <label
            htmlFor="password"
            className="block text-sm font-medium text-black mt-4"
          >
            Password:
          </label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
          />

          {isError && (
            <div style={{ color: "red", marginTop: "10px" }}>
              An error occurred: {errorMessage}
            </div>
          )}

          <div className="w-full flex justify-center items-center">
            <button
              type="submit"
              className={cn("mt-4 py-2 px-4 rounded w-44", {
                "bg-gray-400": isRegistrationDisabled(),
                "bg-gradient-to-r to-[#593a0e] from-green-700 hover:from-green-900 hover:to-[#593a0e] text-white":
                  !isRegistrationDisabled(),
                "cursor-not-allowed": isRegistrationDisabled(),
              })}
              disabled={isRegistrationDisabled()}
            >
              Register
            </button>
          </div>
          <div className="flex justify-center space-x-1 mt-2">
            <p>Already have an account?</p>
            <Link
              href={"/login"}
              className="text-green-500 hover:text-green-800"
            >
              Login!
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegisterFrom
