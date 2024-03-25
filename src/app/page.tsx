"use client"
import {  useEffect, useState } from "react";
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

  // toast hook
  const onlineStatus = StatusBar()

  if (onlineStatus === false)
    toast({
      description: "You're Offline, Connet to the Internet",
    })

  async function onSubmit(e: any) {
    e.preventDefault();
    try {
      const res = await axios.post("/api/urlshortren", { url })
      console.log(res.data)
      if (res.data) {
        setNewUrl(res.data.data)
        toast({
          description: "Short Url is successfully created",
        })
      }
    } catch (error: any) {

      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        toast({
          variant: "destructive",
          description: error.response.data.message  ||  "Something went wrong",
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
          description: error.request.message  ||  "No response from the server",
        })
        // console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
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

  async function tableCopy(link: string, id:number) {
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
        <button onClick={onSubmit} className="outline outline-1 mt-5 rounded-md p-2 font-medium">Make it short</button>
      </div>
      {
        newUrl &&
        <div className="flex gap-x-4 justify-center items-center  rounded-md w-full md:w-10/12 lg:w-4/12 flex-col">
          <div className="flex justify-center items-center  rounded-md p-2 w-full  bg-white">
            <div className="bg-blur  h-10  bg-zinc-900 backdrop-blur-sm flex rounded-md items-center justify-between px-2 w-full">
              <p className="text-lg px-2">{newUrl}</p>
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

     <Tables id={id}  links={links} tableCopy={tableCopy}/>
    </main>
  );
}
