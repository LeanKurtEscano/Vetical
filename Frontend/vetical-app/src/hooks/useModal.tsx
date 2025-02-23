import { useState } from 'react'

const useModal = () => {
  const [toggle, setToggle] = useState(false);
  const toggleModal = () => {
    setToggle(true);
  }

  const handleCancel = () => {
    setToggle(false);
  }

  return {
    toggle,
    toggleModal,
    handleCancel


  }
    
  
}

export default useModal