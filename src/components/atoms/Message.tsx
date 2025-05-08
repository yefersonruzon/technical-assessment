import React from "react";

interface ProductsInterface {
    id: number;
    displayTitle: string;
    embeddingText: string;
    url: string;
    shopifyProductId: string;
    imageUrl: string;
    productType: string;
    discount: boolean;
    variants: string;
}

function MessageBubble({message, hour, date, sender, showRecommendations, recommendedProducts }: {message: string, hour: string, date: string, sender: "bot" | "user", showRecommendations?: boolean, recommendedProducts?: ProductsInterface[]}) {
    console.log(recommendedProducts);
    return (
        <>
            <div className={`${sender === 'bot' ? 'bot bg-secondary rounded-tl-none' : 'user rounded-tr-none ml-auto bg-primary' } relative clip_triangle  max-w-xs  flex-col rounded-md  py-2 px-3 flex gap-2 w-fit`}>
                <p className="text-base">{message}</p>
                <p className="text-sm text-gray-300">
                    {hour} <span className="px-0.5">|</span> {date}
                </p>
            </div>
            {
                showRecommendations && recommendedProducts && recommendedProducts.length > 0 && (
                    <div className="flex gap-3 max-w-full h-28 min-h-48 overflow-hidden overflow-x-scroll">
                        {
                            recommendedProducts.map((item, index) => (
                                <div key={item.id} className="bg-secondary relative min-w-sm max-w-sm rounded-md py-2 px-3 flex gap-2 w-fit">
                                    <img src={item.imageUrl} alt={item.displayTitle} className="w-auto aspect-square h-full rounded-md" />
                                    <div className="flex-col flex">
                                        <h3 className="text-sm">{item.displayTitle}</h3>
                                        <p className="text-xs text-gray-300">{item.embeddingText}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                )
            }
        </>
    )
}

export default function Message({ messages, isBotTyping, recommendedProducts }: { messages: {message: string, hour: string, date: string, sender: "bot" | "user", showRecommendations: boolean }[], isBotTyping: boolean, recommendedProducts: ProductsInterface[]}) {
    const messagesEndRef = React.useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    
    // Scroll when messages change
    React.useEffect(() => {
        scrollToBottom();
    }, [messages, isBotTyping]);

    return (
        <div className="px-4 border-b flex flex-col gap-4 border-details py-3 h-[32rem] overflow-y-scroll">
            {messages.map((msg, index) => (
                <MessageBubble
                    key={index}
                    message={msg.message}
                    hour={msg.hour}
                    date={msg.date}
                    sender={msg.sender}
                    showRecommendations={msg.showRecommendations}
                    recommendedProducts={recommendedProducts}
                />
            ))}
            {
                isBotTyping && (
                    <div className="bg-secondary animation_load_messages relative clip_triangle bot max-w-xs rounded-md rounded-tl-none py-3 px-3 flex gap-2 w-fit">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                )
            }
            <div ref={messagesEndRef} />
        </div>
    )
}