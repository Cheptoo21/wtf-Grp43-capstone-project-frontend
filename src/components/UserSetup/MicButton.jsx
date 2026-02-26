import Mic from "../../assets/icons/mic.svg?react";

export default function MicButton({ recording, onClick }) {
  return (
    <div 
      className={`flex items-center justify-center h-24 w-24 rounded-full mt-15 cursor-pointer 
        ${recording ? "bg-red-500 animate-pulse" : "bg-primary"}`}
      onClick={onClick}
    >
      <Mic />
    </div>
  )
}