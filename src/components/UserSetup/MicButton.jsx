import Mic from "../../assets/icons/mic.svg?react";

export default function MicButton({ recording, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center justify-center h-24 w-24 rounded-full mt-15 transition-all duration-300
        ${recording ? "bg-red-500 animate-pulse" : "bg-primary"}
        ${disabled ? "opacity-60 cursor-not-allowed" : "hover:scale-105 cursor-pointer"}
      `}
    >
      <Mic />
    </button>
  );
}