import { useMutation } from "@tanstack/react-query"
import { postRegisterUser } from "../teamTrackerRequests"

export const useRegisterUser = () => {
  return useMutation({
    mutationKey: ["postUserRegister"],
    mutationFn: postRegisterUser,
  })
}
