"use client"
import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import HamburgerMenu from "@/components/Navbar"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { log } from "console"
import { NextPage } from "next"
import Image from "next/image"
import router from "next/router"
import { useState } from "react"

interface Props {}

const Page: NextPage<Props> = ({}) => {
  const [content, setContent] = useState<string>("")
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string>("")
  const idToken = localStorage.getItem("token")
  console.log(idToken)

  const { mutate, isError } = useMutation({
    mutationKey: ["registerKey"],
    mutationFn: async () => {
      console.log(idToken)
      try {
        const { data } = await axios.post(
          "http://localhost:8080/create",
          {
            content,
          },
          {
            headers: {
              "Authorization": `Bearer ${idToken}`,
              "Content-Type": "application/json",
            },
          }
        )
        console.log(data)
        return data
      } catch (error: any) {
        console.log(error)
        throw new Error(error.response.data.message)
      }
    },
    onSuccess: () => {
      console.log("it worked!")
    },
    onError: (error: Error) => {
      setErrorMessage(error.message)
    },
  })

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0]
    if (file) {
      setImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    console.log("Text:", content)
    console.log("Image:", image)
    mutate()

    setTimeout(() => {
    setContent("")
    setImage(null)
    setImagePreview(null)
    }, 1000)

  }

  return (
    <div className="w-screen justify-center items-center">
      <HamburgerMenu />
      <MaxWidthWrapper>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 flex flex-col justify-center items-center"
        >
          <button
            onClick={() => {
              setImagePreview(null), setImage(null)
            }}
          >
            click me
          </button>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-40 p-2 border rounded-md"
            placeholder="Enter your post text here..."
          ></textarea>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
            disabled={!content}
          >
            Post
          </button>
        </form>
      </MaxWidthWrapper>
    </div>
  )
}

export default Page
