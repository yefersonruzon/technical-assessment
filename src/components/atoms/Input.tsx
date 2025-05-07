export default function Input({placeholder, onChange}: {placeholder: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void}) {
    return (
        <input className="w-full mx-2 border focus:outline focus:outline-primary border-details py-2 px-2 rounded-md" type="text" placeholder={placeholder} onChange={onChange} />
    )
}