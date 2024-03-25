import React, { useState } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { GoCopy } from "react-icons/go";
import { LuExternalLink } from "react-icons/lu";

export default function Tables({ id, links, tableCopy }: { id: number | null, links: [{}], tableCopy: any }) {

function redirectUrl(link: string){
window.open(link,'_blank')

}


    return (
        <div className="w-full w-12/12 md:w-11/12 lg:w-10/12 flex justify-center items-center">
            <Table className="w-full text-center " >
                <TableCaption>{links[0] ? `A list of your recent links.` : ""}</TableCaption>
                <TableHeader >
                    <TableRow className="hover:bg-zinc-900">
                        <TableHead className="text-start">Original Link</TableHead>
                        <TableHead className="text-center">Short Link</TableHead>
                        <TableHead className="text-center ">Copy</TableHead>
                        <TableHead className="text-center ">Visit</TableHead>

                    </TableRow>
                </TableHeader>
                {
                    links[0] ? links?.map((link: any) => {
                        console.log(link)
                        return (
                            <TableBody key={link.id}>
                                <TableRow className="w-full hover:bg-zinc-900" >
                                    <TableCell className="text-white text-left text-lg">{link.originalUrl || "NIL"}</TableCell>
                                    <TableCell className=" text-white  text-center text-lg">{`${process.env.DOMAIN_NAME}${link.shortUrl}`}</TableCell>
                                    <TableCell className=" text-white text-md min-w-20 ">
                                        <TooltipProvider>
                                            <Tooltip >
                                                <TooltipTrigger >
                                                    {id === link.id || <GoCopy className="text-white size-5  cursor-pointer  " onClick={() => tableCopy(`${process.env.DOMAIN_NAME}${link.shortUrl}`, link.id)} />
                                                    }
                                                    {
                                                        id === link.id && <div className=" h-7  w-14 bg-green-100 text-green-500 text-sm flex justify-center items-center rounded-sm ">
                                                            Copied
                                                        </div>
                                                    }
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Copy</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </TableCell>
                                    <TableCell className=" text-white text-md min-w-20 ">
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger>
                                                          {  <LuExternalLink className='text-white' onClick={() => redirectUrl(`${link.originalUrl}`)}/>}
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Copy</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        )
                    }) :
                        <TableBody>
                            <TableRow className="">
                                <TableCell colSpan={4} className="font-medium text-white text-center text-lg py-4">Nothing to show</TableCell>
                            </TableRow>
                        </TableBody>
                }
            </Table>
        </div>
    )
}
