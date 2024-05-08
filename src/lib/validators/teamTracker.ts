import { z } from "zod"

export const PostInfoValidator = z.array(
  z.object({
    id: z.number().nullish(),
    content: z.string().nullish(),
    email: z.string().nullish(),
    huntingParty: z.string().nullish(),
    published: z.string().nullish(),
    user: z.any().nullish(),
    phoneNumber: z.string().nullish(),
  })
)

export type PostInfo = z.infer<typeof PostInfoValidator>
