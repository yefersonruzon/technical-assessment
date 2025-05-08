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
    id: string;
    message: string;
    sender: "bot" | "user";
    hour: string;
    date: string;
    showRecommendations: boolean;
}

// Generate unique ID for each message
const generateUniqueId = () => {
  return Math.random().toString(36).substring(2, 9);
};

// Initial messages
const InitialState: MessageInterface[] = [
    {   
        id: generateUniqueId(),
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
    const [recommendedProducts, setRecommendedProducts] = useState<{ [messageId: string]: ProductsInterface[] }>(() => {
        const messages = JSON.parse(sessionStorage.getItem('chatMessages') || '[]');
        const recommendations = JSON.parse(sessionStorage.getItem('chatRecommendations') || '{}');

        return Object.entries(recommendations).reduce((acc, [key, value]) => {
            if (messages.find((msg: MessageInterface) => msg.id === key && msg.showRecommendations)) {
                (acc as Record<string, ProductsInterface[]>)[key] = value as ProductsInterface[];
            }
            return acc;
        }, {});
    });

    // Messages state
    const [messages, setMessages] = useState(() => {
        const savedMessages = sessionStorage.getItem('chatMessages');
        return savedMessages ? JSON.parse(savedMessages) : [...InitialState];
    });
    // Bot responses
    const botResponses = [
        "Wizybot is here!",
        "How can i help you today?",
        "sure!!! tell me if you need a product",
    ];

    // Function to clear chat messages 
    const clearChat = useCallback(() => {
        setMessages([...InitialState]);
        setRecommendedProducts({});
        setNewMessage('');
        setIsBotTyping(false);
        // Clear chat data from session storage
        sessionStorage.removeItem('chatMessages');
        sessionStorage.removeItem('chatRecommendations');
    }, []);

    // Handle send message
    const handleSendMessage = useCallback(() => {
        if (newMessage.trim().length > 0) {
          const now = new Date();
          const hour = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          const date = now.toLocaleDateString([], { month: 'short', day: 'numeric' });
          const userMessage = { message: newMessage, sender: 'user', hour, date };

          setMessages((prevMessages: MessageInterface[]) => [...prevMessages, userMessage as MessageInterface]);
          setNewMessage('');
    
          // Simulate bot response after delay
          setIsBotTyping(true);

          setTimeout( async () =>  {
            let botResponse;
            let botMessage;
            const botMessageId = generateUniqueId();
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
              const newRecommendations = {
                ...recommendedProducts,
                [botMessageId]: recommendations
              };
              setRecommendedProducts(newRecommendations);
              // Store recommendations immediately
              sessionStorage.setItem('chatRecommendations', JSON.stringify(newRecommendations));

              botResponse = "I can help you with product recommendations! Here are some of our top picks Which category interests you the most?";
              botMessage = { 
                message: botResponse, 
                sender: 'bot', 
                hour: hour, 
                date: date, 
                showRecommendations: true,
                id: botMessageId,
              };
            } else {
              const randomIndex = Math.floor(Math.random() * botResponses.length);
              botResponse = botResponses[randomIndex];
              botMessage = { 
                message: botResponse, 
                sender: 'bot', 
                hour: hour, 
                date: date,
                id: botMessageId,
                showRecommendations: false,
              };
            }
            
            setMessages((prevMessages: MessageInterface[]) => {
              const newMessages = [...prevMessages, botMessage as MessageInterface];
              // Sort messages by date and time, oldest first
              const sortedMessages = newMessages.sort((a, b) => {
                const dateA = new Date(`${a.date} ${a.hour}`);
                const dateB = new Date(`${b.date} ${b.hour}`);
                return dateA.getTime() - dateB.getTime();
              });
              
              // Store messages in sessionStorage
              sessionStorage.setItem('chatMessages', JSON.stringify(sortedMessages));
              return sortedMessages;
            });
            setIsBotTyping(false);
          }, 3000);
        }
    }, [newMessage]);

    // Handle input change event for input field 
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewMessage(event.target.value);
    };

    return (
        <div className="w-md max-md:w-xs py-3 z-50 bg-bg rounded-md border border-details">
            <ChatHeader resetChat={clearChat} chatName='Wizybot' />
            <Message isBotTyping={isBotTyping} recommendedProducts={recommendedProducts} messages={messages} />
            <MessageInput onSendMessage={handleSendMessage} onInputChange={handleInputChange} inputValue={newMessage} />
        </div>
    )
}