const apiUrl = "http://localhost:8080"

export const login = async (formData: {
  username: string
  password: string
}) => {
  try {
    const response = await fetch(`${apiUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })

    if (response.ok) {
      const data = await response.json()
      const authToken = data.token
      return { success: true, authToken }
    } else {
      const errorData = await response.json()
      return {
        success: false,
        error: errorData.message || "Authentication failed",
      }
    }
  } catch (error) {
    console.error("Error occurred during authentication:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}
