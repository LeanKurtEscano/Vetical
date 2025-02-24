import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'



const Clinic = () => {
    const {clinicId} = useParams();
    console.log(clinicId);

  return (
    <div>Clinic</div>
  )
}

export default Clinic