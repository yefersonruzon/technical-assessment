import Message from "../atoms/Message"
import ChatHeader from "../molecules/ChatHeader"
import MessageInput from "../molecules/MessageInput"

export default function Chat() {

    const messages = [
        {
            message: 'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum',
            sender: 'user',
            hour: '12:00',
            date: 'Jan 1'
        },
        {
            message: 'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum',
            sender: 'bot',
            hour: '12:00',
            date: 'Jan 1'
        },
        {
            message: 'Hello',
            sender: 'bot',
            hour: '13:00',
            date: 'Jan 1'
        },
        {
            message: 'Hello',
            sender: 'user',
            hour: '13:10',
            date: 'Jan 1'
        }
    ]

    return (
        <div className="w-md py-3 bg-bg rounded-md border border-details">
            <ChatHeader chatName='Wizybot' />
            <Message messages={messages} />
            <MessageInput />
        </div>
    )
}