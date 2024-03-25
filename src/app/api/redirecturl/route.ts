import { NextResponse } from "next/server";
import {prisma} from '@/lib/prisma'

export async function POST(req: Request, res: NextResponse) {

const {shortUrl}  = await req.json()

    // Sending the all URL
    const urlData = await prisma.url.findUnique({
        where:{
            shortUrl:shortUrl
        },
        select:{
            originalUrl:true
        }
    })

    if(!urlData)  return NextResponse.json({
        status: "Failure",
    },  {
        status: 400
    })

    return NextResponse.json({
        data: urlData
    },  {
        status: 200
    })
}

