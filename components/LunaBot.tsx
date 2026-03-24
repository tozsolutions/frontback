'use client';

import { useState, useEffect, useRef } from 'react';
import { X, MessageCircle, Send, Phone, Mail, MapPin } from 'lucide-react';
import { products } from '@/data/products.json';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'text' | 'options' | 'product' | 'contact' | 'whatsapp';
  options?: Array<{ label: string; value: string }>;
  productSlug?: string;
};

const LUNA_PRODUCTS = products;

const WELCOME_MESSAGE = `Merhaba! Ben Luna, Toz Yapı Teknolojileri'nin dijital asistanıyım. 

Size nasıl yardımcı olabilirim?

1️⃣ Ürün bilgisi almak için
2️⃣ Teknik destek için  
3️⃣ Fiyat teklifi için
4️⃣ Diğer konular için`;

const PRODUCT_CATEGORIES = [
  { label: '🏢 Cephe Sistemleri', value: 'cephe' },
  { label: '☀️ Güneş Kırıcı Sistemler', value: 'gunes-kirici' },
  { label: '🏡 Dış Mekan', value: 'dis-mekan' },
  { label: '🔒 Güvenlik Sistemleri', value: 'guvenlik' },
  { label: '🚪 Kapı Sistemleri', value: 'kapi' },
  { label: '🪟 Pencere Sistemleri', value: 'pencere' },
];

export default function LunaBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      text: WELCOME_MESSAGE,
      sender: 'bot',
      timestamp: new Date(),
      type: 'options',
      options: [
        { label: '📦 Ürün Bilgisi', value: '1' },
        { label: '🔧 Teknik Destek', value: '2' },
        { label: '💰 Fiyat Teklifi', value: '3' },
        { label: '📞 Diğer', value: '4' },
      ],
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentFlow, setCurrentFlow] = useState<string | null>(null);
  const [userData, setUserData] = useState<Record<string, string>>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const createLunaReply = (userMessage: string, flow: string | null): Message => {
    const lowerMessage = userMessage.toLowerCase();

    // Ürün bilgisi akışı
    if (flow === 'product' || lowerMessage.includes('ürün') || lowerMessage.includes('bilgi')) {
      const matchedProduct = LUNA_PRODUCTS.find(p => 
        lowerMessage.includes(p.slug.toLowerCase()) || 
        lowerMessage.includes(p.name.toLowerCase())
      );

      if (matchedProduct) {
        return {
          id: Date.now().toString(),
          text: `📦 **${matchedProduct.name}**\n\n${matchedProduct.description}\n\n✨ Özellikler:\n${matchedProduct.features.map(f => '• ' + f).join('\n')}\n\n📋 Detaylı teknik bilgi için kataloğumuzu inceleyebilirsiniz.`,
          sender: 'bot',
          timestamp: new Date(),
          type: 'product',
          productSlug: matchedProduct.slug,
        };
      }

      return {
        id: Date.now().toString(),
        text: 'Hangi ürün grubu hakkında bilgi almak istersiniz?',
        sender: 'bot',
        timestamp: new Date(),
        type: 'options',
        options: PRODUCT_CATEGORIES,
      };
    }

    // Teknik destek akışı
    if (flow === 'support' || lowerMessage.includes('teknik') || lowerMessage.includes('destek') || lowerMessage.includes('servis')) {
      return {
        id: Date.now().toString(),
        text: '🔧 Teknik destek için aşağıdaki seçeneklerden birini seçin:\n\n1. Montaj desteği\n2. Garanti başvurusu\n3. Yedek parça\n4. Genel teknik soru',
        sender: 'bot',
        timestamp: new Date(),
        type: 'options',
        options: [
          { label: '🔨 Montaj Desteği', value: 'montaj' },
          { label: '📄 Garanti Başvurusu', value: 'garanti' },
          { label: '🔩 Yedek Parça', value: 'yedek-parca' },
          { label: '❓ Genel Soru', value: 'genel-soru' },
        ],
      };
    }

    // Fiyat teklifi akışı
    if (flow === 'quote' || lowerMessage.includes('fiyat') || lowerMessage.includes('teklif')) {
      if (!userData.name) {
        return {
          id: Date.now().toString(),
          text: '💰 Fiyat teklifi için lütfen aşağıdaki bilgileri paylaşın:\n\n1. Adınız Soyadınız\n2. Firma Adı (varsa)\n3. Telefon Numaranız',
          sender: 'bot',
          timestamp: new Date(),
          type: 'text',
        };
      }

      return {
        id: Date.now().toString(),
        text: `Teşekkürler ${userData.name || 'Sayın Müşterimiz'}! 🎉\n\nTeklif talebinizi aldık. Satış ekibimiz en kısa sürede sizinle iletişime geçecektir.\n\n📞 Acil durumlar için: +90 536 773 14 04`,
        sender: 'bot',
        timestamp: new Date(),
        type: 'whatsapp',
      };
    }

    // Genel yanıtlar
    if (lowerMessage.includes('merhaba') || lowerMessage.includes('selam')) {
      return {
        id: Date.now().toString(),
        text: WELCOME_MESSAGE,
        sender: 'bot',
        timestamp: new Date(),
        type: 'options',
        options: [
          { label: '📦 Ürün Bilgisi', value: '1' },
          { label: '🔧 Teknik Destek', value: '2' },
          { label: '💰 Fiyat Teklifi', value: '3' },
          { label: '📞 Diğer', value: '4' },
        ],
      };
    }

    if (lowerMessage.includes('teşekkür') || lowerMessage.includes('sağ ol')) {
      return {
        id: Date.now().toString(),
        text: ' Rica ederim! Başka bir konuda yardımcı olabilir miyim? 😊',
        sender: 'bot',
        timestamp: new Date(),
      };
    }

    if (lowerMessage.includes('iletişim') || lowerMessage.includes('adres') || lowerMessage.includes('telefon')) {
      return {
        id: Date.now().toString(),
        text: '📍 **İletişim Bilgilerimiz**\n\n📞 Telefon: +90 536 773 14 04\n📧 E-posta: merhaba@tozyapi.com.tr\n🌐 Web: www.tozyapi.com.tr\n\n🏢 Adres: İstanbul, Türkiye\n\n💬 WhatsApp üzerinden de bize ulaşabilirsiniz!',
        sender: 'bot',
        timestamp: new Date(),
        type: 'contact',
      };
    }

    // Varsayılan yanıt
    return {
      id: Date.now().toString(),
      text: 'Size daha iyi yardımcı olabilmem için lütfen aşağıdaki seçeneklerden birini seçin:\n\n1. Ürün bilgisi\n2. Teknik destek\n3. Fiyat teklifi\n4. İletişim bilgileri',
      sender: 'bot',
      timestamp: new Date(),
      type: 'options',
      options: [
        { label: '📦 Ürün Bilgisi', value: '1' },
        { label: '🔧 Teknik Destek', value: '2' },
        { label: '💰 Fiyat Teklifi', value: '3' },
        { label: '📞 İletişim', value: '4' },
      ],
    };
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Kullanıcı verilerini topla
    if (currentFlow === 'quote' && !userData.name) {
      setUserData(prev => ({ ...prev, name: input }));
    }

    // Simüle edilmiş yanıt gecikmesi
    setTimeout(() => {
      let flow = currentFlow;
      
      // İlk seçimleri işle
      if (!currentFlow) {
        if (input === '1') flow = 'product';
        else if (input === '2') flow = 'support';
        else if (input === '3') flow = 'quote';
        else if (input === '4') flow = 'other';
      }

      const botReply = createLunaReply(input, flow);
      setCurrentFlow(flow);
      
      setMessages(prev => [...prev, botReply]);
      setIsTyping(false);
    }, 800);
  };

  const handleOptionClick = (value: string) => {
    setInput(value);
    setTimeout(() => handleSend(), 100);
  };

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(`Merhaba! Toz Yapı Teknolojileri web sitesinden yazıyorum. ${userData.name ? `Adım: ${userData.name}` : ''} Fiyat teklifi almak istiyorum.`);
    window.open(`https://wa.me/905367731404?text=${message}`, '_blank');
  };

  return (
    <>
      {/* Luna Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-teal-500 to-cyan-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 group"
          aria-label="Luna ile sohbet et"
        >
          <div className="relative">
            <MessageCircle className="w-8 h-8" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
          </div>
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-white text-gray-800 px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium">
            Luna ile Sohbet Et
          </span>
        </button>
      )}

      {/* Luna Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col" style={{ height: '600px', maxHeight: '80vh' }}>
          {/* Header */}
          <div className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-2xl">🤖</span>
              </div>
              <div>
                <h3 className="font-bold text-lg">Luna</h3>
                <p className="text-sm text-white/80">Toz Yapı Dijital Asistan</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
              aria-label="Sohbeti kapat"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-teal-500 to-cyan-600 text-white'
                      : 'bg-white text-gray-800 shadow-md'
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{message.text}</p>
                  
                  {/* Options */}
                  {message.type === 'options' && message.options && (
                    <div className="mt-3 space-y-2">
                      {message.options.map((option, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleOptionClick(option.value)}
                          className="w-full text-left bg-gradient-to-r from-teal-50 to-cyan-50 hover:from-teal-100 hover:to-cyan-100 text-gray-800 px-3 py-2 rounded-lg text-sm font-medium transition-colors border border-teal-200"
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Product Info */}
                  {message.type === 'product' && message.productSlug && (
                    <a
                      href={`/urun-gruplari/${message.productSlug}`}
                      className="mt-3 inline-block bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
                    >
                      Detaylı Bilgi →
                    </a>
                  )}

                  {/* Contact Info */}
                  {message.type === 'contact' && (
                    <div className="mt-3 space-y-2">
                      <a
                        href="tel:+905367731404"
                        className="flex items-center gap-2 text-teal-600 hover:underline text-sm"
                      >
                        <Phone className="w-4 h-4" /> +90 536 773 14 04
                      </a>
                      <a
                        href="mailto:merhaba@tozyapi.com.tr"
                        className="flex items-center gap-2 text-teal-600 hover:underline text-sm"
                      >
                        <Mail className="w-4 h-4" /> merhaba@tozyapi.com.tr
                      </a>
                    </div>
                  )}

                  {/* WhatsApp CTA */}
                  {message.type === 'whatsapp' && (
                    <button
                      onClick={handleWhatsAppClick}
                      className="mt-3 flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-600 transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" /> WhatsApp'tan Yaz
                    </button>
                  )}

                  <span className={`text-xs mt-2 block ${message.sender === 'user' ? 'text-white/70' : 'text-gray-400'}`}>
                    {message.timestamp.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white rounded-2xl px-4 py-3 shadow-md">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t p-4 bg-white">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Mesajınızı yazın..."
                className="flex-1 border border-gray-300 rounded-full px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white p-2.5 rounded-full hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Mesaj gönder"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-gray-400 text-center mt-2">
              Luna yapay zeka destekli bir asistandır.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
