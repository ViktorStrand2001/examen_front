"use client"
import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import {
  Camera,
  CheckIcon,
  CrosshairIcon,
  MapPinnedIcon,
  PlusIcon,
  X,
} from "lucide-react"
import { NextPage } from "next"
import Image from "next/image"
import { useEffect, useState } from "react"
import { imgStorage, textStorage } from "../../../firebaseconfig"
import { ref, getDownloadURL, uploadBytes } from "firebase/storage"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import { jwtDecode } from "jwt-decode"
import Navbar from "@/components/Navbar"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { idToken } from "@/lib/authToken"

interface Props {}

const Page: NextPage<Props> = ({}) => {
  const [content, setContent] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [phoneNumber, setPhoneNumber] = useState<string>("")
  const [huntingParty, setHuntingParty] = useState<string>("")
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string>("")
  const [username, setUsername] = useState<string>()
  const [games, setGames] = useState<boolean>(false)
  const [error, setError] = useState("")
  const [isEmailValid, setIsEmailValid] = useState(false)

  const maxLength = 500
  const remainingCharacters = maxLength - content.length

  useEffect(() => {
    if (idToken !== null) {
      const decodedtoken = jwtDecode(idToken)
      setUsername(decodedtoken.sub)
      console.log(decodedtoken.sub)
    }
  }, [])

  // post to local database
  const { mutate, isError } = useMutation({
    mutationKey: ["registerKey"],
    mutationFn: async () => {
      try {
        const { data } = await axios.post(
          "http://localhost:8080/create",
          {
            content,
            huntingParty,
            email,
            phoneNumber,
          },
          {
            headers: {
              "Authorization": `Bearer ${idToken}`,
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

    const isValidEmail = (email: string) => {
      return /\S+@\S+\.\S+/.test(email)
    }

   const handleEmailChange = (e: any) => {
     const value = e.target.value
     setEmail(value)
     if (!isValidEmail(value)) {
       setError("Invalid email address")
       setIsEmailValid(false)
     } else {
       setError("")
       setIsEmailValid(true)
     }
   }

const handlePhoneNumberChange = (e: any) => {
  const value = e.target.value
  if (/^\d{0,10}$/.test(value)) {
    setPhoneNumber(value)
    setError("")
  } else {
    setError("Please enter a valid phone number")
  }
}

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

  const notAdded = () => {
    alert("fiture not added!")
  }

  const targets = {
    Älg: false,
    Kronhjort: false,
    Vitsvans: false,
    Ren: false,
    Dovhjort: false,
    Rådjur: false,
  }

  return (
    <div className="w-full h-full lg:flex">
      {games && (
        <div className="w-full h-full absolute bg-black bg-transparent/50 z-10"></div>
      )}

      <Navbar />

      <MaxWidthWrapper>
        <div className="w-full h-full relative">
          {games && (
            <div className="w-full h-full flex justify-center items-center z-20 absolute">
              <ScrollArea className="h-[70%] w-64 rounded-md border bg-primaryBige relative">
                <div className="p-4">
                  <div className="flex w-full justify-center reletive mb-8">
                    <Image
                      src={"/icons/games.svg"}
                      alt="games"
                      width={100}
                      height={100}
                    />
                  </div>
                  {Object.keys(targets).map((game) => (
                    <>
                      <div className="flex">
                        <Button
                          key={game}
                          className="text-base bg-transparent hover:bg-transparent text-black"
                        >
                          <p className="hover:text-lg">{game}</p>
                        </Button>
                      </div>
                    </>
                  ))}
                </div>
                <div className="absolute bottom-4 w-full flex justify-center items-center h-20">
                  <Button
                    onClick={() => {
                      setGames(!games), notAdded()
                    }}
                    className="bg-primaryGreen hover:bg-primaryGreen hover:w-44 hover:h-14 w-40 h-12 rounded-full"
                  >
                    <CheckIcon size={60} className="text-green-500" />
                  </Button>
                </div>
              </ScrollArea>
            </div>
          )}
          <form
            onSubmit={handleSubmit}
            className="w-full h-full flex flex-col justify-center items-center mt-3 lg:mt-5 lg:justify-start "
          >
            {imagePreview ? (
              <div className="relative z-10">
                <Image
                  src={imagePreview}
                  alt="Selected"
                  className=" rounded-t-md flex-1 border-l border-t border-r border-black"
                  width={300}
                  height={300}
                />
                <Button
                  className=" z-10 absolute top-3 flex justify-start bg-transparent hover:bg-transparent w-full"
                  type="button"
                  onClick={() => handleRemoveImage()}
                >
                  <X size={40} className="text-red-500 hover:w-12 hover:h-12" />
                </Button>
              </div>
            ) : (
              <div className="-z-10 h-72 w-96 rounded-t-md bg-primaryBige flex justify-center items-center border-l border-t border-r border-black">
                <Camera size={90} className="text-black" />
              </div>
            )}

            {/* Input for selecting image */}
            <div className={`${imagePreview ? "w-[300px]" : "w-96"}`}>
              <input
                id="imageInput"
                type="file"
                onChange={handleImageChange}
                accept="image/*"
                className="rounded-b-md bg-primaryBige w-[100%] border-l border-b border-r border-black"
              />
            </div>

            <div className="mt-3 relative">
              <textarea
                value={content}
                required
                onChange={(e) => setContent(e.target.value)}
                className="w-96 h-36 px-4 py-3 pb-6 rounded-md bg-primaryBige text-black border border-black focus:outline-none"
                placeholder="Enter your text here..."
                maxLength={maxLength}
              ></textarea>
              <div className="absolute bottom-2 left-1">
                {remainingCharacters}/{maxLength}
              </div>
            </div>

            <div className="mt-2">
              <input
                type="tel"
                value={phoneNumber}
                required
                onChange={handlePhoneNumberChange}
                className={`w-96  p-2 rounded-md bg-primaryBige text-black border border-black focus:outline-none ${
                  error && "border-red-500"
                }`}
                placeholder="Telefonnummer"
              ></input>
            </div>
            <div className="mt-3">
              <input
                type="email"
                placeholder={"E-mail"}
                value={email}
                required
                onChange={handleEmailChange}
                className={`w-96  p-2 rounded-md bg-primaryBige text-black border border-black focus:outline-none ${
                  error && "border-red-500"
                }`}
              />
            </div>
            <div className="mt-3">
              <input
                value={huntingParty}
                onChange={(e) => setHuntingParty(e.target.value)}
                required
                className="w-96  p-2 rounded-md bg-primaryBige text-black border border-black focus:outline-none"
                placeholder="Jaktlag"
              ></input>
            </div>
            <div className="w-72 flex justify-between">
              <div className="mt-3 h-20">
                <Button
                  type="button"
                  onClick={() => setGames(!games)}
                  className="w-32 h-20 bg-primarybg hover:bg-primarybg"
                >
                  <CrosshairIcon
                    size={70}
                    className="text-primaryBige hover:w-20 hover:h-20"
                  />
                </Button>
              </div>
              <div className="mt-3 h-20">
                <Button
                  type="button"
                  className="w-32 h-20 bg-primarybg hover:bg-primarybg "
                  onClick={notAdded}
                >
                  <MapPinnedIcon
                    size={70}
                    className="text-primaryBige hover:w-20 hover:h-20"
                  />
                </Button>
              </div>
            </div>

            {content && email && phoneNumber && huntingParty && isEmailValid && phoneNumber.length == 10 && (
              <Button
                type="submit"
                className="w-48 h-12 mt-3 bg-primaryBige border border-black hover:bg-primaryBige"
              >
                <PlusIcon size={50} className="text-black" />
              </Button>
            )}
          </form>
        </div>
      </MaxWidthWrapper>
    </div>
  )
}

export default Page
