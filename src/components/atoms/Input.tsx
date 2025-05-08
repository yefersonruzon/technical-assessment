export default function Input({ placeholder, onChange, value }: { placeholder: string, value?: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
    return (
        <input 
            className="w-full mx-2 border focus:outline focus:outline-primary border-details py-2 px-2 rounded-md"
            type="text"
            value={value} 
            required
            placeholder={placeholder} 
            onChange={onChange} 
            />
    )
}