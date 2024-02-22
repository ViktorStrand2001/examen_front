"use client"
import Link from 'next/link'
import { FC, FormEvent, useEffect, useState } from 'react'
import Logo from './Logo'
import { register} from '@/app/api/register'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'



interface RegisterFromProps {}

const RegisterFrom: FC<RegisterFromProps> = ({ }) => {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [error, setError] = useState<string | null>(null)

  const isRegistrationDisabled = () => {
    const isInvalidPassword = password.length < 8
    const isInvalidEmail = !isValidEmail(email)
    const isInvalidUsername = username.trim() === ""

    return isInvalidPassword || isInvalidEmail || isInvalidUsername
  }

  const isValidEmail = (email: string) => {
    return email.includes("@")
  }

  const handleRegistration = async (e: FormEvent) => {
    e.preventDefault()
    try {
      const userData = {
        email: email,
        password: password,
        username: username,
      }

      const { createdUser } = await register(userData)
      console.log("User created:", createdUser)
      router.push("/login")
      
    } catch (error: any) {
      console.error("Failed to create user:", error.message)
      setError(error.message)
    }
  }

 

  return (
    <div className="min-h-screen min-w-100 flex items-center justify-center overflow-hidden">
      <div className="backdrop-blur-lg bg-white/30 p-8 rounded-md shadow-md w-96">
        <Logo />
        <form className="w-full mt-4" onSubmit={handleRegistration}>
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

          {error && (
            <div className="text-red-500 mt-2">
              <p>{error}</p>
            </div>
          )}

          <div className="w-full flex justify-center items-center">
            <button
              type="submit"
              className={cn('mt-4 py-2 px-4 rounded w-44',
                {
                  'bg-gray-400': isRegistrationDisabled(),
                  'bg-blue-500 hover:bg-blue-600': !isRegistrationDisabled(),
                  'cursor-not-allowed': isRegistrationDisabled(),
                }
              )}
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