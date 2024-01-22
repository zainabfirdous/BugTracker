import React from 'react'
import React, { useEffect, useState } from 'react';

export default function Message() {

    const [alert, setAlert] = useState(true);

    useEffect(() => {
        // when the component is mounted, the alert is displayed for 3 seconds
        setTimeout(() => {
          setAlert(false);
        }, 3000);
      }, []); 

      
  return (
    <div>Message</div>
  )
}
