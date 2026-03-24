'use client';

import { useState, useEffect, useRef } from 'react';
import { X, MessageCircle, Send } from 'lucide-react';
import { products } from '@/data/products.json';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'text' | 'options' | 'product' | 'contact' | 'whatsapp';
  options?: Array<{ label: string; value: string; icon?: string }>;
  productSlug?: string;
};

const LUNA_PRODUCTS = products;

const WELCOME_MESSAGE = `Merhaba! Ben Luna, Toz Yapı Teknolojileri'nin dijital asistanıyım. 

Size nasıl yardımcı olabilirim?`;

const PRODUCT_CATEGORIES = [
  { label: '☀️ Güneş Kırıcı Sistemler', value: 'gunes-kirici' },
  { label: '🏡 Pergola Sistemleri', value: 'pergola' },
  { label: '🏢 Cephe Çözümleri', value: 'cephe' },
  { label: '🏊 Havuz Kapama', value: 'havuz' },
  { label: '🚪 Kapı Sistemleri', value: 'kapi' },
  { label: '🔒 Güvenlik Sistemleri', value: 'guvenlik' },
];

const MAIN_OPTIONS = [
  { label: '📦 Ürün Bilgisi', value: '1', icon: '📦' },
  { label: '🔧 Teknik Destek', value: '2', icon: '🔧' },
  { label: '💰 Fiyat Teklifi', value: '3', icon: '💰' },
  { label: '📞 İletişim', value: '4', icon: '📞' },
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
      options: MAIN_OPTIONS,
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentFlow, setCurrentFlow] = useState<string | null>(null);
  const [flowStep, setFlowStep] = useState<number>(0);
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

  const findProductByKeyword = (keyword: string) => {
    const lowerKeyword = keyword.toLowerCase();
    return LUNA_PRODUCTS.find(p => 
      p.slug.toLowerCase().includes(lowerKeyword) || 
      p.name.toLowerCase().includes(lowerKeyword) ||
      p.category.toLowerCase().includes(lowerKeyword)
    );
  };

  const createLunaReply = (userMessage: string, flow: string | null, step: number): Message => {
    const lowerMessage = userMessage.toLowerCase();

    // Check if user mentions a specific product
    const mentionedProduct = findProductByKeyword(lowerMessage);
    if (mentionedProduct && flow !== 'quote') {
      return {
        id: Date.now().toString(),
        text: `📦 **${mentionedProduct.name}**\n\n${mentionedProduct.description}\n\n✨ Başlıca Özellikler:\n${mentionedProduct.features.slice(0, 4).map(f => '• ' + f).join('\n')}\n\n📋 Detaylı teknik bilgi için ürün sayfasını ziyaret edebilirsiniz.`,
        sender: 'bot',
        timestamp: new Date(),
        type: 'product',
        productSlug: mentionedProduct.slug,
      };
    }

    // Product info flow
    if (flow === 'product') {
      if (step === 0) {
        return {
          id: Date.now().toString(),
          text: 'Hangi ürün grubu hakkında bilgi almak istersiniz?',
          sender: 'bot',
          timestamp: new Date(),
          type: 'options',
          options: PRODUCT_CATEGORIES,
        };
      }
      
      // User selected a category
      const categoryMap: Record<string, string> = {
        'gunes-kirici': 'Güneş Kırıcı',
        'pergola': 'Pergola',
        'cephe': 'Cephe',
        'havuz': 'Havuz',
        'kapi': 'Kapı',
        'guvenlik': 'Güvenlik',
      };
      
      const selectedCategory = PRODUCT_CATEGORIES.find(cat => userMessage.includes(cat.value));
      if (selectedCategory) {
        const categoryProducts = LUNA_PRODUCTS.filter(p => 
          p.category.toLowerCase().includes(selectedCategory.label.split(' ')[1].toLowerCase())
        );
        
        if (categoryProducts.length > 0) {
          const product = categoryProducts[0];
          return {
            id: Date.now().toString(),
            text: `📦 **${product.name}**\n\n${product.description}\n\n✨ Özellikler:\n${product.features.slice(0, 3).map(f => '• ' + f).join('\n')}\n\nDetaylı bilgi için ürün sayfasını ziyaret edebilirsiniz.`,
            sender: 'bot',
            timestamp: new Date(),
            type: 'product',
            productSlug: product.slug,
          };
        }
      }
    }

    // Technical support flow
    if (flow === 'support') {
      if (step === 0) {
        return {
          id: Date.now().toString(),
          text: '🔧 Teknik destek için lütfen seçin:\n\n1. Montaj desteği\n2. Garanti başvurusu\n3. Yedek parça\n4. Genel teknik soru',
          sender: 'bot',
          timestamp: new Date(),
          type: 'options',
          options: [
            { label: '🔨 Montaj Desteği', value: 'montaj' },
            { label: '📄 Garisi Başvurusu', value: 'garanti' },
            { label: '🔩 Yedek Parça', value: 'yedek-parca' },
            { label: '❓ Genel Soru', value: 'genel-soru' },
          ],
        };
      }
      
      return {
        id: Date.now().toString(),
        text: 'Teknik destek talebinizi aldık. Uzman ekibimiz en kısa sürede sizinle iletişime geçecektir.\n\n📞 Acil durumlar için: +90 536 773 14 04',
        sender: 'bot',
        timestamp: new Date(),
        type: 'whatsapp',
      };
    }

    // Quote flow
    if (flow === 'quote') {
      if (step === 0) {
        return {
          id: Date.now().toString(),
          text: '💰 Fiyat teklifi için lütfen bilgilerinizi paylaşın:\n\n1️⃣ Adınız Soyadınız\n2️⃣ Firma Adı (varsa)\n3️⃣ Telefon Numaranız',
          sender: 'bot',
          timestamp: new Date(),
          type: 'text',
        };
      }
      
      if (step === 1) {
        return {
          id: Date.now().toString(),
          text: 'Teşekkürler! 🎉\n\nTeklif talebinizi aldık. Satış ekibimiz en kısa sürede sizinle iletişime geçecektir.\n\n📞 Hemen WhatsApp\'tan yazmak ister misiniz?',
          sender: 'bot',
          timestamp: new Date(),
          type: 'whatsapp',
        };
      }
    }

    // Contact info
    if (lowerMessage.includes('iletişim') || lowerMessage.includes('adres') || lowerMessage.includes('telefon') || flow === 'contact' || lowerMessage === '4') {
      return {
        id: Date.now().toString(),
        text: '📍 **İletişim Bilgilerimiz**\n\n📞 Telefon: +90 536 773 14 04\n📧 E-posta: merhaba@tozyapi.com.tr\n🌐 Web: www.tozyapi.com.tr\n\n🏢 Adres: İstanbul, Türkiye\n\n💬 WhatsApp üzerinden de bize ulaşabilirsiniz!',
        sender: 'bot',
        timestamp: new Date(),
        type: 'contact',
      };
    }

    // Greetings
    if (lowerMessage.includes('merhaba') || lowerMessage.includes('selam') || lowerMessage === '0') {
      return {
        id: Date.now().toString(),
        text: WELCOME_MESSAGE,
        sender: 'bot',
        timestamp: new Date(),
        type: 'options',
        options: MAIN_OPTIONS,
      };
    }

    // Thanks
    if (lowerMessage.includes('teşekkür') || lowerMessage.includes('sağ ol')) {
      return {
        id: Date.now().toString(),
        text: 'Rica ederim! Başka bir konuda yardımcı olabilir miyim? 😊',
        sender: 'bot',
        timestamp: new Date(),
        type: 'options',
        options: MAIN_OPTIONS,
      };
    }

    // Default response
    return {
      id: Date.now().toString(),
      text: 'Size daha iyi yardımcı olabilmem için lütfen aşağıdaki seçeneklerden birini seçin:',
      sender: 'bot',
      timestamp: new Date(),
      type: 'options',
      options: MAIN_OPTIONS,
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

    // Simulate response delay
    setTimeout(() => {
      let flow = currentFlow;
      let step = flowStep;
      
      // Handle initial selection
      if (!currentFlow || currentFlow === 'reset') {
        if (input === '1' || input.toLowerCase().includes('ürün')) {
          flow = 'product';
          step = 0;
        } else if (input === '2' || input.toLowerCase().includes('teknik') || input.toLowerCase().includes('destek')) {
          flow = 'support';
          step = 0;
        } else if (input === '3' || input.toLowerCase().includes('fiyat') || input.toLowerCase().includes('teklif')) {
          flow = 'quote';
          step = 0;
        } else if (input === '4' || input.toLowerCase().includes('iletişim')) {
          flow = 'contact';
          step = 0;
        }
      } else if (flow === 'quote') {
        step = 1;
      } else if (flow === 'product' && (input.includes('gunes') || input.includes('pergola') || input.includes('cephe') || input.includes('havuz') || input.includes('kapi') || input.includes('guvenlik'))) {
        step = 1;
      } else if (flow === 'support') {
        step = 1;
      }

      const botReply = createLunaReply(input, flow, step);
      setCurrentFlow(flow);
      setFlowStep(step);
      
      setMessages(prev => [...prev, botReply]);
      setIsTyping(false);
    }, 600);
  };

  const handleOptionClick = (value: string) => {
    setInput(value);
    setTimeout(() => handleSend(), 50);
  };

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent('Merhaba! Toz Yapı Teknolojileri web sitesinden yazıyorum. Fiyat teklifi almak istiyorum.');
    window.open(`https://wa.me/905367731404?text=${message}`, '_blank');
  };

  return (
    <>
      {/* Luna Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-teal-500 to-teal-700 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 group animate-pulse-slow"
          aria-label="Luna ile sohbet et"
        >
          <div className="relative">
            <MessageCircle className="w-8 h-8" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></span>
          </div>
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-white text-gray-800 px-4 py-2 rounded-lg shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-semibold text-sm">
            Luna ile Sohbet Et
          </span>
        </button>
      )}

      {/* Luna Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-scale-in" style={{ height: '600px', maxHeight: '80vh' }}>
          {/* Header */}
          <div className="bg-gradient-to-r from-teal-600 to-teal-800 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <span className="text-2xl">🤖</span>
              </div>
              <div>
                <h3 className="font-bold text-lg">Luna</h3>
                <p className="text-sm text-white/80">Toz Yapı Dijital Asistan</p>
              </div>
            </div>
            <button
              onClick={() => {
                setIsOpen(false);
                setCurrentFlow('reset');
                setFlowStep(0);
              }}
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
                  className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-teal-500 to-teal-700 text-white shadow-lg'
                      : 'bg-white text-gray-800 shadow-md border border-gray-100'
                  }`}
                >
                  <p className="text-sm whitespace-pre-line leading-relaxed">{message.text}</p>
                  
                  {/* Options */}
                  {message.type === 'options' && message.options && (
                    <div className="mt-3 space-y-2">
                      {message.options.map((option, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleOptionClick(option.value)}
                          className="w-full text-left bg-gradient-to-r from-teal-50 to-cyan-50 hover:from-teal-100 hover:to-cyan-100 text-gray-800 px-4 py-3 rounded-xl text-sm font-medium transition-all border border-teal-200 hover:shadow-md hover:-translate-y-0.5"
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
                      className="mt-3 inline-block bg-gradient-to-r from-teal-500 to-teal-700 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:from-teal-600 hover:to-teal-800 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
                    >
                      Detaylı Bilgi →
                    </a>
                  )}

                  {/* Contact Info */}
                  {message.type === 'contact' && (
                    <div className="mt-3 space-y-2">
                      <a
                        href="tel:+905367731404"
                        className="flex items-center gap-2 text-teal-600 hover:text-teal-700 hover:underline text-sm font-medium"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        +90 536 773 14 04
                      </a>
                      <a
                        href="mailto:merhaba@tozyapi.com.tr"
                        className="flex items-center gap-2 text-teal-600 hover:text-teal-700 hover:underline text-sm font-medium"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        merhaba@tozyapi.com.tr
                      </a>
                    </div>
                  )}

                  {/* WhatsApp CTA */}
                  {message.type === 'whatsapp' && (
                    <button
                      onClick={handleWhatsAppClick}
                      className="mt-3 flex items-center gap-2 bg-green-500 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-green-600 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
                    >
                      <MessageCircle className="w-4 h-4" />
                      WhatsApp'tan Yaz
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
                <div className="bg-white rounded-2xl px-4 py-3 shadow-md border border-gray-100">
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
          <div className="border-t border-gray-200 p-4 bg-white">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Mesajınızı yazın..."
                className="flex-1 border border-gray-300 rounded-full px-5 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm transition-all"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="bg-gradient-to-r from-teal-500 to-teal-700 text-white p-3 rounded-full hover:from-teal-600 hover:to-teal-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
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
