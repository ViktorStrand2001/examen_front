"use client"
import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import HamburgerMenu from "@/components/Navbar"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { Camera, PlusIcon, X } from "lucide-react"
import { NextPage } from "next"
import Image from "next/image"
import { useEffect, useState } from "react"
import { imgStorage, textStorage } from "../../../firebaseconfig"
import { ref, getDownloadURL, uploadBytes } from "firebase/storage"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import { jwtDecode } from "jwt-decode"
import Navbar from "@/components/Navbar"

interface Props {}

const Page: NextPage<Props> = ({}) => {
  const [content, setContent] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [phonenumber, setPhonenumber] = useState<string>("")
  const [huntingParty, setHuntingParty] = useState<string>("")
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string>("")
  const [username, setUsername] = useState<string>()
  const idToken: string | null =
    typeof localStorage !== "undefined" ? localStorage.getItem("token") : null

  useEffect(() => {
    if (idToken !== null) {
      const decodedtoken = jwtDecode(idToken)
      setUsername(decodedtoken.sub)
      console.log(decodedtoken.sub)
    }
  }, [idToken])

  // post to local database
  const { mutate, isError } = useMutation({
    mutationKey: ["registerKey"],
    mutationFn: async () => {
      try {
        const { data } = await axios.post(
          "http://localhost:8080/create",
          {
            content,
          },
          {
            headers: {
              Authorization: `Bearer ${idToken}`,
              "Content-Type": "application/json",
            },
          }
        )
        console.log(data)

        // Post image to firebase
        /*
        if (image) {
          const storageRef = ref(imgStorage, image.name)
          await uploadBytes(storageRef, image)
          const imageUrl = await getDownloadURL(storageRef)
          await addDoc(collection(textStorage, "posts"), {
            username,
            imageUrl,
            createdAt: serverTimestamp(),
          })          
        }
         */

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
    e.defaultPrevented
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

  const handleRemoveImage = () => {
    setImage(null)
    setImagePreview(null)

    const inputElement = document.getElementById(
      "imageInput"
    ) as HTMLInputElement
    if (inputElement) {
      inputElement.value = ""
    }
  }

  const handleSubmit = async () => {
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
    <div className="w-full h-full lg:flex">
      <Navbar />
      <MaxWidthWrapper>
        <form
          onSubmit={handleSubmit}
          className="w-full h-full bg-black flex flex-col justify-center items-center mt-3"
        >
          {imagePreview ? (
            <div className="relative">
              <Image
                src={imagePreview}
                alt="Selected"
                className="rounded-t-md"
                width={300}
                height={300}
              />
              <button
                className="absolute top-2 left-2 text-red-500"
                type="button"
                onClick={() => handleRemoveImage()}
              >
                <X size={50} />
              </button>
            </div>
          ) : (
            <div className="h-72 w-96 rounded-t-md bg-primaryBige flex justify-center items-center">
              <Camera size={90} className="text-black" />
            </div>
          )}

          {/* Input for selecting image */}
          <div>
            <input
              id="imageInput"
              type="file"
              onChange={handleImageChange}
              accept="image/*"
              className="w-96 rounded-b-md bg-primaryBige"
            />
          </div>

          <div className="mt-3">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-96 h-40 p-2 rounded-md bg-primaryBige text-black "
              placeholder="Enter your text here..."
            ></textarea>
          </div>
          <div className="mt-2">
            <input
              type="tel"
              value={phonenumber}
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{2}-[0-9]{2}"
              required
              onChange={(e) => setPhonenumber(e.target.value)}
              className="w-96  p-2 rounded-md bg-primaryBige text-black "
              placeholder="Telefonnummer"
            ></input>
          </div>
          <div className="mt-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-96  p-2 rounded-md bg-primaryBige text-black "
              placeholder="E-mail"
            ></input>
          </div>
          <div className="mt-3">
            <input
              value={huntingParty}
              onChange={(e) => setHuntingParty(e.target.value)}
              className="w-96  p-2 rounded-md bg-primaryBige text-black "
              placeholder="Jaktlag"
            ></input>
          </div>

          {content && (
            <button
              type="submit"
              className="z-50 w-40 h-12 bg-primaryBige text-white py-2 rounded-lg flex justify-center items-center"
              disabled={!content || !image}
            >
              <PlusIcon size={50} className="text-black" />
            </button>
          )}
        </form>
      </MaxWidthWrapper>
    </div>
  )
}

export default Page
