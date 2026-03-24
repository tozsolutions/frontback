"use client";

import { useState, useEffect, useRef } from "react";
import { MessageCircle, X } from "lucide-react";
import { Button } from "./button";
import { createLunaReply, LUNA_PRODUCTS, LUNA_BLOGS } from "../../lib/lunaKnowledge";
import { LUNA_WHATSAPP_LINK } from "../../lib/data/constants";

type Message = {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
};

export function LunaBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Merhaba! Ben Luna, Toz Yapı Teknolojileri'nin yapay zeka destekli satış asistanıyım. Size nasıl yardımcı olabilirim?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const reply = createLunaReply(userMessage.text);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: reply.text,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 600);
  };

  const handleWhatsAppRedirect = () => {
    const lastUserMessage = [...messages].reverse().find((m) => m.sender === "user");
    let whatsappText = "Merhaba, bilgi almak istiyorum.";
    if (lastUserMessage) {
      const reply = createLunaReply(lastUserMessage.text);
      whatsappText = reply.whatsappText;
    }
    window.open(LUNA_WHATSAPP_LINK(whatsappText), "_blank");
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-600 text-white shadow-lg transition-all hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        aria-label="Luna Asistan"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 flex w-80 flex-col rounded-lg bg-white shadow-xl sm:w-96">
          <div className="flex items-center justify-between rounded-t-lg bg-green-600 p-3 text-white">
            <div className="flex items-center gap-2">
              <img
                src="/images/logos/LunaAI.jpg"
                alt="Luna"
                className="h-8 w-8 rounded-full object-cover"
              />
              <div>
                <div className="font-semibold">Luna AI</div>
                <div className="text-xs opacity-90">Toz Yapı Asistanı</div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-200">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="h-96 overflow-y-auto p-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`mb-3 flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                    msg.sender === "user"
                      ? "bg-green-600 text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="mb-3 flex justify-start">
                <div className="rounded-lg bg-gray-100 px-3 py-2 text-sm text-gray-600">
                  <span className="animate-pulse">Yazıyor...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="border-t p-2">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Mesajınızı yazın..."
                className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
              />
              <Button onClick={handleSend} size="sm" className="bg-green-600 hover:bg-green-700">
                Gönder
              </Button>
            </div>
            <div className="mt-2 flex justify-end">
              <button
                onClick={handleWhatsAppRedirect}
                className="text-xs text-green-600 hover:text-green-800"
              >
                Uzmanımıza WhatsApp'tan ulaşın →
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}