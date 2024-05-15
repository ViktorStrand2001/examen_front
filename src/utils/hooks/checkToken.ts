// useTokenExpirationCheck.ts
import { useEffect } from "react"
import { jwtDecode } from "jwt-decode"
import { useRouter } from "next/navigation"

const useTokenExpirationCheck = () => {
  const token = localStorage.getItem("token")
  const guest = localStorage.getItem("guest")
  const router = useRouter()

  useEffect(() => {
    const checkTokenExpiration = () => {
      if (!token) return true
      const decodedToken: any = jwtDecode(token)
      const currentTime = Date.now() / 1000
      return decodedToken.exp < currentTime
    }

    if (checkTokenExpiration() && !guest) {
      localStorage.removeItem("token")
      localStorage.removeItem("username")
      router.push("/")
    }
  }, [guest, router, token])
}

export default useTokenExpirationCheck
