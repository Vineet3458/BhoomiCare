import { useState } from "react";

export default function AIChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input) return;

    const newMsg = { text: input, user: true };
    setMessages([...messages, newMsg]);

    setInput("");

    // Fake AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { text: "AI Suggestion based on soil data 🌱", user: false },
      ]);
    }, 1000);
  };

  return (
    <div className="page">
      <h1>AI Soil Assistant</h1>

      <div className="chat-box">
        {messages.map((m, i) => (
          <div key={i} className={m.user ? "user-msg" : "ai-msg"}>
            {m.text}
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}