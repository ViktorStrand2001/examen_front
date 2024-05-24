import { z } from "zod"

export const RegisterUserValidator = z.object({
  username: z.string().nullish(),
  password: z.string().nullish(),
  email: z.string().nullish(),
})

export const LoginUserValidator = z.object({
  username: z.string().nullish(),
  password: z.string().nullish(),
})

export const LoginResponseValidator = z.object({
  token: z.string(),
})

export const PostInfoValidator = z.array(
  z.object({
    id: z.string().nullish(),
    content: z.string().nullish(),
    email: z.string().nullish(),
    huntingParty: z.string().nullish(),
    published: z.string().nullish(),
    user: z.any().nullish(),
    phoneNumber: z.string().nullish(),
  })
)

export const CreatePostValidator = z.object({
  content: z.string().nullish(),
  huntingParty: z.string().nullish(),
  email: z.string().nullish(),
  phoneNumber: z.string().nullish(),
})

export type CreatePost = z.infer<typeof CreatePostValidator>
export type LoginInfo = z.infer<typeof LoginUserValidator>
export type RegisterInfo = z.infer<typeof RegisterUserValidator>
export type PostInfo = z.infer<typeof PostInfoValidator>
