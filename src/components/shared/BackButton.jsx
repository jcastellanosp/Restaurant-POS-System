import React, { use } from 'react'
import { IoArrowBackCircleOutline } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom';

const BackButton = () => {

    const navigate = useNavigate();

  return (
    <button onClick={() => navigate(-1)} className="bg-[#f6b100] p-2 text-xl font-bold rounded-full text-white">
      <IoArrowBackCircleOutline />
    </button>
  )
}

export default BackButton