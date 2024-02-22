const apiUrl = "http://localhost:8080"

export const register = async (userData: { email: string, password: string, username: string}) => {
  try {
    const response = await fetch(`${apiUrl}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })

    if (response.ok) {
      const data = await response.json()
      return data
    } else {
      const errorMessage = await response.text()
      throw new Error(errorMessage)
    }
  } catch (error: any) {
    throw new Error(`Failed to register user: ${error.message}`)
  }
}
