import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'
import { nanoid } from 'nanoid'
import axios from 'axios';
import { cookies } from 'next/headers'
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: NextRequest, res: NextResponse) {

  const { url } = await req.json();

  if (!url) return NextResponse.json({
    status: false,
    message: "URL field cannot be empty",
  }, {
    status: 400
  })

  const isValidURL = await isValidHttpUrl(url)
  
  if (!isValidURL) return NextResponse.json({
    status: false,
    message: "URl is not Valid",
  }, {
    status: 400
  })

  const cookieStore = cookies()
  const token = cookieStore.get('token')?.value

  // Creating a unique short url
  const shortUrl = nanoid(6)

  if (!token) {
    const uniqueId = uuidv4();
    const Urls = await prisma.user.create({
      data: {
        id: uniqueId,
        Urls: {
          create: [
            {
              originalUrl: url,
              shortUrl: shortUrl
            }
          ]
        }
      },
      include: {
        Urls: {
          select: {
            originalUrl: true,
            shortUrl: true
          }
        }
      }
    })

    cookies().set({
      name: 'token',
      value: Urls.id,
      httpOnly: true,
    })

    const resdata = Urls.Urls[Urls.Urls.length - 1]
    const data = `${process.env.DOMAIN_NAME}${resdata.shortUrl}`
    return NextResponse.json({
      status: "Success",
      message: "URL created successfully",
      data: data
    },
      {
        status: 200
      })
  }

  const Urls = await prisma.user.update({
    where: {
      id: token,
    },
    data: {
      Urls: {

        create: [
          {
            originalUrl: url,
            shortUrl: shortUrl
          }
        ]
      }
    },
    include: {
      Urls: true
    }
  })

  const resdata = Urls.Urls[Urls.Urls.length - 1]
  const data = `${process.env.DOMAIN_NAME}${resdata.shortUrl}`
  return NextResponse.json({
    status: "Success",
    message: "URL created successfully",
    data: data
  },
    {
      status: 200
    }
  )
}

export async function GET(req: Request, res: NextResponse) {

  // Getting the token
  const cookieStore = cookies()
  const token = cookieStore.get('token')?.value

  if (!token) {
    return NextResponse.json({
      status: "Success",
      message: "Links successfully fetched",
      data: []
    }, {
      status: 200
    })
  }

  const resData = await prisma.user.findUnique({
    where: {
      id: token
    },
    include: {
      Urls: {
        orderBy: [
          {
            id: 'desc'
          }
        ]
      }
    }
  })

  return NextResponse.json({
    status: "Success",
    message: "Links successfully fetched",
    data: resData?.Urls
  }, {
    status: 200
  })
}

// To check, it is a validate URL
async function isValidHttpUrl(longURL: any) {
  try {
    const url = new URL(longURL)
    // console.log(url);
    if (url.protocol === 'http:') {
      const res = await axios.get(url.href)
      if (res.status >= 499) return false
      return true
    }
    if (url.protocol === 'https:') {
      const res1 = await axios.get(url.href)
      if (res1.status >= 499) return false
      return true
    }
    return false
  } catch (error) {
    if (error.message.includes('403')) {
      return true;
    }
    return false
  }
}

