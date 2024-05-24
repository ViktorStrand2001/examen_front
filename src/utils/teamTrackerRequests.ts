import axios from "axios"
import {
  LoginInfo,
  LoginResponseValidator,
  LoginUserValidator,
  PostInfoValidator,
  RegisterInfo,
  RegisterUserValidator,
  CreatePost,
  CreatePostValidator,
} from "@/lib/validators/teamTracker"
import { idToken } from "@/lib/authToken"

type Register = RegisterInfo
type Login = LoginInfo
type createPost = CreatePost

export const postLoginUser = async (loginUser: Login) => {
  const { data } = await axios.post(
    "http://localhost:8080/api/auth/login",
    loginUser,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
  console.log(data)
  const validatedUserLogin = LoginResponseValidator.safeParse(data)
  if (!validatedUserLogin.success) {
    console.log(validatedUserLogin.error)
    return
  }
  console.log(validatedUserLogin.data)
  return validatedUserLogin.data
}

export const postRegisterUser = async (registerUser: Register) => {
  const { data } = await axios.post(
    "http://localhost:8080/api/users/register",
    registerUser,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
  console.log(data)
  const validatedUserRegister = RegisterUserValidator.safeParse(data)
  if (!validatedUserRegister.success) {
    console.log(validatedUserRegister.error)
    return
  }
  console.log(validatedUserRegister.data)
  return validatedUserRegister
}

export const createPost = async (post: createPost) => {
  const { data } = await axios.post(
    "http://localhost:8080/api/posts",
      post,
    {
      headers: {
        "Authorization": `Bearer ${idToken}`,
        "Content-Type": "application/json",
      },
    }
  )
  console.log(data)
  const validatedCreatePostInfo = CreatePostValidator.safeParse(data)
  if (!validatedCreatePostInfo.success) {
    console.log(validatedCreatePostInfo.error)
    return
  }
  console.log(validatedCreatePostInfo.data)
  return validatedCreatePostInfo
}

export const getPostInfo = async () => {
  const { data } = await axios.get("http://localhost:8080/api/posts/all")
  console.log(data)
  const validatedPostInfo = PostInfoValidator.safeParse(data)
  if (!validatedPostInfo.success) {
    console.log(validatedPostInfo.error)
    return
  }
  console.log(validatedPostInfo.data)
  return validatedPostInfo
}
