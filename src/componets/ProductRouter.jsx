import { useUser } from '@clerk/clerk-react'
import React, { Children } from 'react'
import { Navigate } from 'react-router-dom';

function ProductRouter ({Children}) {
    const { user } =useUser();
  return (
      <div>
          {user ? Children :<Navigate to='/'/>}
     </div>
  )
}

export default ProductRouter