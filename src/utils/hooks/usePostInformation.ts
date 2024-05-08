import { useQuery } from "@tanstack/react-query"
import { getPostInfo } from "../teamTrackerRequests"

export const usePostInfo = () => {
  return useQuery({
    queryKey: ["getPostinfo"],
    queryFn: getPostInfo,
  })
}
