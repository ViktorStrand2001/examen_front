export const idToken: string | null =
  typeof localStorage !== "undefined" ? localStorage.getItem("token") : null
