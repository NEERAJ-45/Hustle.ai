"use client"

import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import dynamic from 'next/dynamic'
import React, { useState } from 'react'

// Dynamically import with SSR disabled
const PageContent = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = () => {
    setIsOpen(true)
  }

  return (
    <div className='bg-zinc-950 w-screen h-screen flex justify-center items-center text-4xl font-mono text-white'>
      <Button variant="default" onClick={handleClick}>Open</Button>
      
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Alert Dialog</AlertDialogTitle>
            <AlertDialogDescription>
              This is a simple alert dialog that opens when you click the button.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Close</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

// This disables SSR for this page
const Page = dynamic(() => Promise.resolve(PageContent), {
  ssr: false,
})

export default Page