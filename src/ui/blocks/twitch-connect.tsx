import React, { useState } from 'react';
import { Button } from '../components/button';

export default function TwitchConnect() {

  const [token, setToken] = useState("no token generated");

  return (
    <div className='flex flex-col items-center justify-center'>
      <span className='pb-4'>token: {token}</span>
      <Button variant="default">Generate Static Token</Button>
    </div>
  )
}
