import Button from "../atoms/Button";
import Input from "../atoms/Input";

export default function MessageInput() {
    return (
        <section className="mt-2 px-4 py-1 flex justify-between items-center">
            <Input placeholder="Send a message" onChange={(e) => console.log(e.target.value)} />
            <Button style="circle" icon="ri-send-plane-line" label="Send btn" />
        </section>
    )
}