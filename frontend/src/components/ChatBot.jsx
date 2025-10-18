import React, { useState } from "react";
import axios from "axios";

const ChatBot = ({ products }) => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! I can help you with product info, recommendations, FAQs, or general queries. Ask me anything!" }
  ]);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const faq = [
    { question: "payment", answer: "We accept Cash on Delivery, Stripe, and Razorpay." },
    { question: "delivery", answer: "Delivery usually takes 3-5 business days." },
    { question: "return", answer: "You can return products within 7 days of delivery." },
    { question: "refund", answer: "Refunds are processed within 5-7 business days after we receive the returned product." },
    { question: "tracking", answer: "You can track your order using the tracking number sent to your email or account." },
    { question: "discount", answer: "We offer discounts occasionally. Check the home page banner or subscribe to our newsletter." },
    { question: "support", answer: "Contact support via email at support@forever3.com or call +91 1234567890." },
    { question: "size", answer: "Check the product description for size details. You can also see available sizes when adding to cart." },
    { question: "shipping", answer: "We ship nationwide. Shipping charges vary depending on location and order amount." },
    { question: "product", answer: "You can browse products, filter by category, and select variants like size before adding to cart." },
    { question: "contact", answer: "Contact support via email at support@forever3.com or call +91 1234567890." },
    { question: "order", answer: "You can check your order status in the Orders section after login." }
  ];

  // Text-to-Speech
  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    window.speechSynthesis.speak(utterance);
  };

  // Speech-to-Text
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.onresult = (event) => {
    const spokenText = event.results[0][0].transcript;
    setInput(spokenText);
    handleSend(spokenText);
  };
  recognition.onerror = (event) => console.error("Speech recognition error", event);

  // Suggestions
  const updateSuggestions = (text) => {
    const lower = text.toLowerCase();
    const productMatches = products.filter(p => p.name.toLowerCase().includes(lower)).map(p => p.name);
    const faqMatches = faq.filter(f => f.question.toLowerCase().includes(lower)).map(f => f.question);
    const combined = [...new Set([...productMatches, ...faqMatches])];
    setSuggestions(combined.slice(0, 5));
  };

  // Handle send
  const handleSend = async (overrideInput) => {
    const query = overrideInput || input;
    if (!query.trim()) return;

    const userMessage = { sender: "user", text: query };
    setMessages(prev => [...prev, userMessage]);
    setSuggestions([]);

    let botReply = "Sorry, I couldn't find a response.";

    // Check for "best seller"
    if (query.toLowerCase().includes("best seller")) {
      const bestSellers = products.filter(p => p.bestseller);
      if (bestSellers.length > 0) {
        botReply = "Our Best Sellers:\n" + bestSellers.slice(0, 5).map(p =>
          `${p.name} - $${p.price}`
        ).join("\n");
      } else {
        botReply = "No best sellers found currently.";
      }
    }

    // Check for "products"
    else if (query.toLowerCase().includes("products")) {
      botReply = "Available Products:\n" + products.slice(0, 10).map(p => p.name).join(", ");
    }

    // Check for "category"
    else if (query.toLowerCase().includes("category")) {
      const categories = [...new Set(products.map(p => p.category))];
      botReply = "Available Categories:\n" + categories.join(", ");
    }

    // Check FAQ
    else {
      faq.forEach(f => {
        if (query.toLowerCase().includes(f.question)) botReply = f.answer;
      });

      // Check product match
      const matchedProducts = products.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase())
      );

      if (matchedProducts.length > 0) {
        botReply = matchedProducts.map(p =>
          `${p.name} - Sizes: ${p.sizes.join(", ")} - $${p.price} - ${p.sizes.length > 0 ? "Available" : "Out of stock"}`
        ).join("\n");
      } else if (!faq.some(f => query.toLowerCase().includes(f.question))) {
        // Call Hugging Face AI
        try {
          const res = await axios.post(
            "https://api-inference.huggingface.co/models/gpt2",
            { inputs: query },
            { headers: { Authorization: `Bearer ${import.meta.env.VITE_HF_API_KEY}` } }
          );
          botReply = res.data[0]?.generated_text || "Sorry, I couldn't generate a response.";
        } catch (err) {
          botReply = "Error generating AI response.";
          console.error(err);
        }
      }
    }

    setMessages(prev => [...prev, { sender: "bot", text: botReply }]);
    speak(botReply);
    setInput("");
  };

  return (
    <div className="fixed bottom-5 right-5 w-80 flex flex-col shadow-lg rounded-lg overflow-hidden z-50">
      {/* Header */}
      <div
        className="bg-pink-300 text-white p-3 cursor-pointer flex justify-between items-center"
        onClick={() => setOpen(!open)}
      >
        <span>AI Chatbot</span>
        <span className="text-xl">{open ? "−" : "+"}</span>
      </div>

      {open && (
        <div className="bg-white h-96 flex flex-col">
          <div className="flex-1 p-3 overflow-y-auto space-y-2">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`px-3 py-2 rounded-lg max-w-[80%] break-words ${
                  msg.sender === "user" ? "bg-blue-500 text-white ml-auto" : "bg-gray-100 text-black"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="flex flex-col border-t border-gray-300">
            <input
              type="text"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                updateSuggestions(e.target.value);
              }}
              placeholder="Ask me about products, categories or FAQs..."
              className="flex-1 p-2 outline-none"
              onKeyDown={e => e.key === "Enter" && handleSend()}
            />
            {suggestions.length > 0 && (
              <div className="bg-gray-100 border-t border-gray-300 p-2 space-y-1 max-h-24 overflow-y-auto">
                {suggestions.map((s, idx) => (
                  <div
                    key={idx}
                    className="cursor-pointer hover:bg-gray-200 px-2 py-1 rounded"
                    onClick={() => handleSend(s)}
                  >
                    {s}
                  </div>
                ))}
              </div>
            )}
            <div className="flex mt-1">
              <button onClick={() => recognition.start()} className="bg-green-500 text-white px-3">🎤</button>
              <button onClick={() => handleSend()} className="bg-blue-600 text-white px-4">Send</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
