"use client"
import { FC, FormEvent, useEffect, useState } from "react"
import { login } from "@/app/api/login"
import { useRouter } from "next/navigation"
import Link from "next/link"

interface LoginProps {}

const Login: FC<LoginProps> = ({}) => {
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [error, setError] = useState<string | null>(null)

  // Move the useRouter call inside the component
  const router = useRouter()

  // Handle login form submission
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    // Define form data
    const formData = {
      username,
      password,
    }

    const { success, authToken, error } = await login(formData)

    if (success) {
      localStorage.setItem("token", authToken)
      localStorage.setItem("username", username)
      setError(null)
      console.log("Authentication successful. Token:", authToken)
      console.log(localStorage)

      // Use router to navigate to the home page
      router.push("/")
    } else {
      setError(error || "An unexpected error occurred")
    }
  }

  // Check for existing token on component mount
  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("token")) {
      // Optional: Redirect to home page if the token exists on component mount
      router.push("/")
    }
  }, [router])
  return (
    <div className="min-h-screen min-w-100 flex items-center justify-center overflow-hidden">
      <div className="backdrop-blur-lg bg-white/30 p-8 rounded-md shadow-md w-96">
        <form onSubmit={handleSubmit} className="w-full">
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

          {error && (
            <p className="text-red-500 mt-2">Wrong username or Password</p>
          )}

          <button
            type="submit"
            className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 w-full"
          >
            Login
          </button>
          <div className="flex justify-center space-x-1 mt-2">
            <p>No account?</p>
            <Link
              href={"/register"}
              className="text-blue-400 hover:text-blue-800"
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
