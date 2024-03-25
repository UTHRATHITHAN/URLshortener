"use client"
import axios from 'axios'
import Loader from '@/components/Loader'
import React, { useEffect } from 'react'

export default function Page({ params }: { params: { id: string } }) {
    useEffect(() => {
        async function get() {
            const res = await axios.post('/api/redirecturl', { shortUrl: params.id })
            window.location.replace(res.data.data.originalUrl)
        }
        get()
    }, [params.id])

    return (
        <div className='h-screen grid place-content-center'>
            <Loader />
        </div>
    )
}
