import axios from "axios"
import { PostInfoValidator } from "@/lib/validators/teamTracker"

export const getPostInfo = async () => {
  const { data } = await axios.get("http://localhost:8080/getAllPosts")
  console.log(data)
  const validatedPostInfo = PostInfoValidator.safeParse(data)
  if (!validatedPostInfo.success) {
    console.log(validatedPostInfo.error)
    return
  }
  console.log(validatedPostInfo.data)
  return validatedPostInfo
}
