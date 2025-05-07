import WizyBot from "../../assets/Wizybot.png";

export default function Avatar() {
    return (
        <div className="bg-primary w-10 rounded-full border border-details aspect-square">
            <img src={WizyBot} alt="WizyBot Avatar" className="object-cover aspect-square p-2" />
        </div>
    )
}