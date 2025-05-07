
function BotMessage({message, hour, date}: {message: string, hour: string, date: string}) {
    return (
        <div className="bg-secondary relative clip_triangle bot max-w-xs  flex-col rounded-md rounded-tl-none py-2 px-3 flex gap-2 w-fit">
            <p className="text-base">{message}</p>
            <p className="text-sm text-gray-300">
                {hour} <span className="px-1">|</span> {date}
            </p>
        </div>
    )
}

function UserMessage({message, hour, date}: {message: string, hour: string, date: string}) {
    return (
        <div className="bg-primary relative clip_triangle user max-w-xs  flex-col rounded-md rounded-tr-none py-2 px-3 flex gap-2 w-fit ml-auto">
            <p className="text-base">{message}</p>
            <p className="text-sm text-gray-300">
                {hour }  <span className="px-1">|</span>  { date}
            </p>
        </div>
    )
}
export default function Message({ messages }: { messages: {message: string, hour: string, date: string, sender: string }[] }) {
    return (
        <div className="px-4 border-b flex flex-col gap-4 border-details py-3 h-[32rem] overflow-y-scroll">
            {messages.map((msg, index) => (
                msg.sender === 'user' ? (
                    <UserMessage
                        key={index}
                        message={msg.message}
                        hour={msg.hour}
                        date={msg.date}
                    />
                ) : (
                    <BotMessage
                        key={index}
                        message={msg.message}
                        hour={msg.hour}
                        date={msg.date}
                    />
                )
            ))}
        </div>
    )
}