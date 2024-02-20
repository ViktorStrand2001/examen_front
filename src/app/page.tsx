"use client"
import { FormEvent, useState } from "react"

export default function Home() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [token, setToken] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null) // New state for error messages

  // Prepare the authentication request data
  const formData = {
    username,
    password,
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    try {
      // Send the authentication request to your backend
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        // Authentication successful
        const data = await response.json()
        const authToken = data.token

        // Store the token securely (e.g., in local storage)
        localStorage.setItem("token", authToken)

        // Update the state to indicate the user is logged in
        setToken(authToken)
        console.log("Authentication successful. Token:", authToken)
        console.log(localStorage)

        // Clear any previous errors on successful login
        setError(null)
      } else {
        // Authentication failed
        const errorData = await response.json()
        setError(errorData.message || "Authentication failed") // Set the error message
      }
    } catch (error) {
      console.error("Error occurred during authentication:", error)
      setError("An unexpected error occurred")
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    setToken(null)
    console.log("logout")
    console.log(localStorage)
  }

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        {token ? (
          // Render content for logged-in user
          <div>
            <h2 className="text-2xl mb-4">You are logged in!</h2>
            <h3>Welcome {username}</h3>
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              onClick={handleLogout}
            >
              Logout
            </button>
            {/* Additional content for logged-in user */}
          </div>
        ) : (
          // Render login form for users not logged in
          <form onSubmit={handleSubmit}>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-600"
            >
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
            />

            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600 mt-4"
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
            />

            {error && <p className="text-red-500 mt-2">Wrong username or Password</p>}

            <button
              type="submit"
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Login
            </button>
          </form>
        )}
      </div>
    </main>
  )
}
