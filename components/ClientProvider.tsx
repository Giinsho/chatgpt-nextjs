'use client'
import React from 'react'
import { Toaster } from 'react-hot-toast'

function ClientProvider() {
  return (
    <>
    <Toaster position='top-right'></Toaster>
    {/* Add any other client-side providers here */}
    {/* For example, you can add a theme provider or context providers */}
    </>
  )
}

export default ClientProvider