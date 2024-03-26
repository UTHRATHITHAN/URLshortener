"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import { GoCopy } from "react-icons/go";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useToast } from "@/components/ui/use-toast"
import StatusBar from '@/hooks/useOnlineStatus';
import Tables from "@/components/Tables";



export default function Home() {
  const { toast } = useToast()

  const [url, setUrl] = useState("")
  const [newUrl, setNewUrl] = useState('')
  const [copied, setCopied] = useState(false)
  const [links, setLinks] = useState<any>([])
  const [id, setId] = useState<null | number>(null)
  const [loader, setLoader] = useState<boolean>(false)


  // toast hook
  const onlineStatus = StatusBar()

  if (onlineStatus === false)
    toast({
      description: "You're Offline, Connet to the Internet",
    })

  async function onSubmit(e: any) {
    e.preventDefault();
    let i;
    try {
      setLoader(true)
      const res = await axios.post("/api/urlshortren", { url })
      console.log(res.data)
      if (res.data) {
        setNewUrl(res.data.data)
        toast({
          description: "Short Url is successfully created",
        })
        setLoader(false)
      }
      setLoader(false)

    } catch (error: any) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        toast({
          variant: "destructive",
          description: error.response.data.message || "Something went wrong",
        })

        // console.log(error.response.data);
        // console.log(error.response.status);
        // console.log(error.response.headers);

      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        toast({
          variant: "destructive",
          description: error.request.message || "No response from the server",
        })
        // console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
    } finally {
        setLoader(false)
    }
  }
  useEffect(() => {
    async function fetchlinks() {
      const res = await axios.get("/api/urlshortren")
      if (res.data) {
        setLinks(res.data.data)
      }
    }
    fetchlinks()
  }, [toast, newUrl])

  let toastTimeout;
  async function mainCopy() {
    let text = newUrl;
    navigator.clipboard.writeText(text).then(function () {
      setCopied(true)
      toastTimeout = setTimeout(() => {
        setCopied(false)
      }, 4000)
    }, function (err) {
      console.error('Could not copy text: ', err);
    });
  }

  async function tableCopy(link: string, id: number) {
    let text = link;
    navigator.clipboard.writeText(text).then(function () {
      setId(id)
      toastTimeout = setTimeout(() => {
        setId(null)
      }, 4000)
    }, function (err) {
      console.error('Could not copy text: ', err);
    });

  }

  clearTimeout(toastTimeout)

  return (
    <main className="flex min-h-screen flex-col items-center justify-start gap-y-10 p-4 pt-20 lg:p-24 ">
      <h1 className="text-5xl font-medium">URL Shortner</h1>
      <div className="flex flex-col text-start gap-y-5 w-full md:w-10/12 lg:w-4/12">
        <h2 className="text-xl font-small">Create a short url</h2>
        <input type="url"
          placeholder="Enter the URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="p-2 rounded-md text-black"
        />
        <button onClick={onSubmit} className="outline outline-1 mt-5 rounded-md p-3 font-medium">
          {
            loader ?
              <svg aria-hidden="true" className="inline w-6 h-6 text-white animate-spin  fill-zinc-900" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
              </svg>
              : "Make it short"
          }

        </button>
      </div>
      {
        newUrl &&
        <div className="flex gap-x-4 justify-center items-center  rounded-md w-full md:w-10/12 lg:w-4/12 flex-col">
          <div className="flex justify-center items-center  rounded-md p-2 w-full  bg-white">
            <div className="bg-blur  h-12  bg-zinc-900 backdrop-blur-sm flex rounded-md items-center justify-between px-2 w-full">
              <p className="text-md px-2">{newUrl}</p>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <GoCopy className="text-white size-5 cursor-pointer" onClick={mainCopy} />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Copy</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          {
            copied && <div className="flex justify-center items-center w-full  h-12  rounded-md p-2 bg-green-100 text-green-500 mt-4">
              Link successfully copied to clipboard
            </div>
          }
        </div>}

      <Tables id={id} links={links} tableCopy={tableCopy} />
    </main>
  );
}
