import React from 'react'
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

export default function Tables({ id, links, tableCopy }: { id: number | null, links: [{}], tableCopy: any }) {
    return (
        <div className="w-full w-12/12 md:w-10/12 lg:w-8/12 flex justify-center items-center">
            <Table className="w-full text-center " >
                <TableCaption>{links[0] ? `A list of your recent links.` : ""}</TableCaption>
                <TableHeader >
                    <TableRow className="hover:bg-zinc-900">
                        <TableHead className="text-start">Original Link</TableHead>
                        <TableHead className="text-center">Short Link</TableHead>
                        <TableHead className="text-center ">Copy</TableHead>
                    </TableRow>
                </TableHeader>
                {
                    links[0] ? links?.map((link: any) => {
                        return (
                            <TableBody key={link.id}>
                                <TableRow className="w-full hover:bg-zinc-900" >
                                    <TableCell className="font-medium text-white text-left text-lg">{link.originalUrl || "NIL"}</TableCell>
                                    <TableCell className=" text-white  text-center text-lg">{`${process.env.DOMAIN_NAME}${link.shortUrl}`}</TableCell>
                                    <TableCell className=" text-white flex justify-center items-center text-md min-w-20">
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger className="flex justify-center items-center ">

                                                    {id === link.id || <GoCopy className="text-white size-5 cursor-pointer  " onClick={() => tableCopy(`${process.env.DOMAIN_NAME}${link.shortUrl}`, link.id)} />
                                                    }
                                                    {
                                                        id === link.id && <div className=" h-7 w-14 bg-green-100 text-green-500 text-sm flex justify-center items-center rounded-sm ">
                                                            Copies
                                                        </div>
                                                    }

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
                                <TableCell colSpan={3} className="font-medium text-white text-center text-lg py-4">Nothing to show</TableCell>
                            </TableRow>
                        </TableBody>
                }
            </Table>
        </div>
    )
}
