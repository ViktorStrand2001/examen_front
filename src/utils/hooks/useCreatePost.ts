import { useMutation } from "@tanstack/react-query"
import { createPost } from "../teamTrackerRequests"

export const useCreatePost = () => {
  return useMutation({
    mutationKey: ["createPost"],
    mutationFn: createPost,
  })
}
