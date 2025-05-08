import { useCallback, useState } from "react";
import Message from "../atoms/Message"
import ChatHeader from "../molecules/ChatHeader"
import MessageInput from "../molecules/MessageInput"
import { fetchData } from "../services/api";

// Message interface
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

interface MessageInterface {
    message: string;
    sender: "bot" | "user";
    hour: string;
    date: string;
    showRecommendations: boolean;
}

// Initial messages
const InitialState: MessageInterface[] = [
    {
        message: "Hello! I'm Wizybot how can i help you today?",
        sender: "bot",
        hour: new Date().toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        }),
        date: new Date().toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
        }),
        showRecommendations: false,
    },
];

export default function Chat() {
    const [newMessage, setNewMessage] = useState('');
    // Bot typing state
    const [isBotTyping, setIsBotTyping] = useState(false);
    // Recommendations 
    const [recommendedProducts, setRecommendedProducts] = useState<ProductsInterface[]>([]);
    // Messages state
    const [messages, setMessages] = useState([...InitialState]);
    // Bot responses
    const botResponses = [
        "Wizybot is here!",
        "How can i help you today?",
        "sure!!! tell me if you need a product",
    ];

    const handleSendMessage = useCallback(() => {
        if (newMessage.trim().length > 0) {
          const now = new Date();
          const hour = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          const date = now.toLocaleDateString([], { month: 'short', day: 'numeric' });
          const userMessage = { message: newMessage, sender: 'user', hour, date };

          setMessages(prevMessages => [...prevMessages, userMessage as MessageInterface]);
          setNewMessage('');
    
          // Simulate bot response after delay
          setIsBotTyping(true);

          setTimeout( async () =>  {
            let botResponse;
            let botMessage;

            // Check if the user message is "I want product recommendations"
            if (newMessage.trim() === "I want product recommendations") {
              // Logic for generating product recommendations
              const loadRecommendationsData = async () => {
                try {
                  const allData = await fetchData("demo-product-list");
                  if (!allData || !Array.isArray(allData)) {
                    return [];
                  }
                  return allData.sort(() => 0.5 - Math.random()).slice(0, 3);
                } catch (error) {
                  console.error('Error loading recommendations:', error);
                  return [];
                }
              };

              // Execute the function immediately
              const recommendations = await loadRecommendationsData();
              setRecommendedProducts(recommendations);

              botResponse = "I can help you with product recommendations! Here are some of our top picks Which category interests you the most?";
              botMessage = { 
                message: botResponse, 
                sender: 'bot', 
                hour: hour, 
                date: date, 
                showRecommendations: true,
              };
              console.log(recommendations);
            } else {
              const randomIndex = Math.floor(Math.random() * botResponses.length);
              botResponse = botResponses[randomIndex];
              botMessage = { 
                message: botResponse, 
                sender: 'bot', 
                hour: hour, 
                date: date,
              };
            }
            
            setMessages(prevMessages => [...prevMessages, botMessage as MessageInterface]);
            setIsBotTyping(false);
          }, 3000);
        }
    }, [newMessage]);

    // Handle input change event for input field 
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewMessage(event.target.value);
    };

    return (
        <div className="w-md py-3 bg-bg rounded-md border border-details">
            <ChatHeader chatName='Wizybot' />
            <Message isBotTyping={isBotTyping} recommendedProducts={recommendedProducts} messages={messages} />
            <MessageInput onSendMessage={handleSendMessage} onInputChange={handleInputChange} inputValue={newMessage} />
        </div>
    )
}