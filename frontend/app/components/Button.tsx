"use client"

export const PrimaryButton = ({children, onClick}: {
    children: React.ReactNode,
    onClick: () => void
}) => {
  return (
    <button onClick={onClick} className="bg-black hover:bg-blue-600 text-white px-4 py-2 cursor-pointer rounded-lg">
      {children}
    </button>
  )
}


export const SecondaryButton = ({children, onClick, prefix}: {
    children: React.ReactNode,
    onClick: () => void,
    prefix?: React.ReactNode
}) => {
  return (
    <button onClick={onClick} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 cursor-pointer rounded-lg">
        <div>
            {prefix}
        </div>
        <div>
            {children}
        </div>
    </button>
  )
}