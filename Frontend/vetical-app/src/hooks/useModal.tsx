import React from 'react'
import { useState } from 'react'
import { deleteData } from '../services/Vet';
const useModal = () => {
  const [toggle, setToggle] = useState(false);

  const handleConfirm = async(data:any, url:string) => {
    try {
      const response = await deleteData(data, url)
    } catch(error) {
      alert("Something went Wrong. Please try again later")
    }
  }

  const toggleModal = () => {
    setToggle(true);
  }

  const handleCancel = () => {
    setToggle(false);
  }

  return {
    toggle,
    handleConfirm,
    toggleModal,
    handleCancel


  }
    
  
}

export default useModal