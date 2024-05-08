"use client"
import { FC, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Logo from "./Logo"
import { cn } from "@/lib/utils"
import axios from "axios"
import { useMutation } from "@tanstack/react-query"

interface LoginProps {}

const Login: FC<LoginProps> = ({}) => {
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const router = useRouter()

  const { mutate, isError } = useMutation({
    mutationKey: ["registerKey"],
    mutationFn: async () => {
      const { data } = await axios.post("http://localhost:8080/login", {
        username,
        password,
      })
      return data
    },
    onSuccess: (data) => {
      const authToken = data.token
      localStorage.setItem("token", authToken)
      localStorage.setItem("username", username)
      console.log("Authentication successful. Token:", authToken)
      console.log(localStorage)
      router.push("/")
    },
  })

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      mutate()
    }

  const isRegistrationDisabled = () => {
    const isInvalidPassword = password.length < 8
    const isInvalidUsername = username.trim() === ""
    return isInvalidPassword || isInvalidUsername
  }

  return (
    <div className="min-h-screen min-w-100 flex items-center justify-center overflow-hidden">
      <div className="backdrop-blur-lg bg-white/30 p-8 rounded-md shadow-md w-96">
        <Logo />
        <form onSubmit={handleSubmit} className="w-full mt-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-black"
          >
            Username:
          </label>
          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
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
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
          />

          {isError && (
            <p className="text-red-500 mt-2">Wrong username or Password</p>
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
              disabled={isRegistrationDisabled()} // Disable the button based on validation
            >
              Login
            </button>
          </div>
          <div className="w-full flex justify-center items-center">
            <Link
              className={cn(
                "text-center mt-4 py-2 px-4 rounded w-44 bg-gradient-to-r from-[#593a0e] to-green-700 hover:to-green-900 hover:from-[#593a0e] text-white"
              )} href={"/"}            >
              Continue as guest
            </Link>
          </div>
          <div className="flex justify-center space-x-1 mt-2">
            <p>No account?</p>
            <Link
              href={"/register"}
              className="text-blue-500 hover:text-blue-800"
            >
              Register!
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
