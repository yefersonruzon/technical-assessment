import Avatar from "../atoms/Avatar"
import Button from "../atoms/Button"

export default function ChatHeader({chatName}: {chatName: string}) {
    return (
        <header className="w-full px-4 pb-3 border-b border-details h-fit flex overflow-hidden justify-between">
            <section className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                    <Avatar/>
                    <div className="flex-col flex">
                        <b className="col-start-2 text-xs font-light text-gray-300 leading-none">Chat with</b>
                        <h3 className="col-start-2 leading-none">{chatName}</h3>
                    </div>
                </div>
                <p className="relative after:absolute after:bg-green-600 after:w-2 after:h-2 after:rounded-full after:left-0 flex items-center pl-3 text-sm ml-2">We reply immediately!</p>
            </section>
            <div className="flex h-fit w-fit gap-2 mt-1">
                <Button style="simple" label='Shopping Cart' icon='ri-shopping-cart-line' />
                <Button style="simple" label='Shopping Cart' icon='ri-arrow-down-s-line' />
            </div>
        </header>
    )
}