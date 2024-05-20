import { useMutation } from "@tanstack/react-query"
import { postLoginUser } from "../teamTrackerRequests"

export const useLoginUser = () => {
  return useMutation({
    mutationKey: ["postUserLogin"],
    mutationFn: postLoginUser,
  })
}
