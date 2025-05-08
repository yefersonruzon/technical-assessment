import Button from "../atoms/Button";
import Input from "../atoms/Input";

interface MessageInputProps {
    onSendMessage: () => void;
    onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    inputValue: string;
}

export default function MessageInput({ onSendMessage, onInputChange, inputValue }: MessageInputProps) {
    return (
        <form 
            className="mt-2 px-4 py-1 flex justify-between items-center"
            onSubmit={(e) => {
                e.preventDefault();
                onSendMessage();
            }}
        >
            <Input placeholder="Send a message" value={inputValue} onChange={onInputChange} />
            <Button style="circle" icon="ri-send-plane-line" onclick={onSendMessage} label="Send btn" />
        </form>
    )
}