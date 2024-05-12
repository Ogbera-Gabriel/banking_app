import React, { useState } from 'react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation';

const PlaidLink = ( {user, variant} : PlaidLinkProps) => {
  const router = useRouter();
  const [token, setToken] = useState("");


  return (
    <>
     {variant === "primary" ? (
        <Button className='plaidlink-primary'>
            Connect Bank
        </Button>
     ) : variant === "ghost" ? (
        <Button className='plaidlink-ghost'>

        </Button>
     ) : (
        <Button className='plaidlink-default'>

        </Button>
     )}
    </>
  )
}

export default PlaidLink