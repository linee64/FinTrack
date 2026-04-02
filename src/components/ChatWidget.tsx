import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Maximize2, Minimize2, Send, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { useFinancialData } from '../lib/FinancialContext';

type Message = {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
};

export const ChatWidget: React.FC = () => {
  const { loans, expenses } = useFinancialData();
  const [isOpen, setIsOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Привет! Я ваш финансовый помощник. Я проанализировал ваши текущие расходы и кредиты. Чем могу помочь сегодня?',
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [apiKey] = useState(import.meta.env.VITE_GEMINI_API_KEY || '');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, isLoading]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    if (!apiKey) {
      setMessages(prev => [...prev, {
        id: Date.now(),
        text: 'Пожалуйста, введите API ключ для использования AI.',
        sender: 'ai',
        timestamp: new Date(),
      }]);
      return;
    }

    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const genAI = new GoogleGenerativeAI(apiKey.trim());

      // Simplified model list
      const modelsToTry = [
        "gemini-2.5-flash-lite",
        "gemini-pro"
      ];

      let result;
      const errors = [];

      // Format financial data for context
      const loansContext = loans.map(l => `- ${l.title}: долг ${l.remainingAmount} ₸, платеж ${l.monthlyPayment} ₸, ставка ${l.interestRate}%`).join('\n');
      const expensesContext = expenses.map(e => `- ${e.title} (${e.category}): ${e.amount} ₸, дата ${e.date}`).join('\n');

      // Try models sequentially until one works
      for (const modelName of modelsToTry) {
        try {
          const model = genAI.getGenerativeModel({ model: modelName });
          const prompt = `Ты — финансовый эксперт-аналитик KAPITAL.AI. Твоя специализация — рынок Казахстана.

КОНТЕКСТ ПОЛЬЗОВАТЕЛЯ:
Кредиты:
${loansContext || 'Кредитов нет'}

Последние расходы:
${expensesContext || 'Расходов нет'}

ВАЖНЫЕ ПРАВИЛА:
1. ВАЛЮТА: Используй ТОЛЬКО Тенге (₸) или "тг". Никогда не упоминай рубли (₽).
2. АНАЛИЗ В РЕЖИМЕ РЕАЛЬНОГО ВРЕМЕНИ: Если пользователь спрашивает про свои расходы, проанализируй данные выше. Обрати внимание на самые крупные категории трат и дай персональный совет по экономии.
3. СТРУКТУРА:
   - Используй заголовки (###) для разделения тем.
   - Используй маркированные списки (*) для перечисления шагов.
   - Выделяй жирным (**текст**) важные цифры и понятия.
   - Разделяй блоки текста пустой строкой.

Будь вежлив, конкретен и профессионален. Твоя цель — финансовое благополучие пользователя в Казахстане.

Вопрос пользователя: ${userMessage.text}`;

          result = await model.generateContent(prompt);
          break; // If successful, exit loop
        } catch (e: any) {
          console.warn(`Failed to use model ${modelName}:`, e.message);
          errors.push(`${modelName}: ${e.message}`);
          continue;
        }
      }

      if (!result) {
        console.error('All models failed:', errors);
        throw new Error(`All models failed. Details: ${errors.join(' | ')}`);
      }

      const response = await result.response;
      const text = response.text();

      const aiMessage: Message = {
        id: Date.now() + 1,
        text: text,
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error: any) {
      console.error('Gemini API Error:', error);
      let errorText = 'Извините, произошла ошибка при обращении к AI.';
      if (error.message?.includes('429')) errorText = 'Превышен лимит запросов. Попробуйте позже.';
      else if (error.message?.includes('API key')) errorText = 'Неверный API ключ.';

      const errorMessage: Message = {
        id: Date.now() + 1,
        text: errorText,
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
  };

  const suggestions = [
    'Как быстрее погасить кредит?',
    'Рассчитать досрочное погашение',
    'Советы по экономии',
    'Какой кредит лучше закрыть первым?',
  ];

  if (!isOpen) {
    return (
      <div className="fixed bottom-8 right-8 z-[100]">
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-purple-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-purple-300 hover:bg-purple-700 transition-all hover:-translate-y-1 hover:scale-105"
        >
          <MessageCircle className="w-7 h-7" />
        </button>
      </div>
    );
  }

  return (
    <div className={cn(
      "fixed z-[100] transition-all duration-300 ease-in-out bg-gray-50 flex flex-col shadow-2xl overflow-hidden",
      isFullScreen
        ? "inset-0 rounded-none"
        : "bottom-8 right-8 w-[calc(100vw-4rem)] max-w-[320px] h-[480px] rounded-2xl border border-gray-200"
    )}>
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2 text-white">
          <Sparkles className="w-5 h-5" />
          <div>
            <h3 className="font-bold text-sm">AI Помощник</h3>
            <p className="text-[10px] text-blue-100 opacity-90">Всегда готов помочь</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsFullScreen(!isFullScreen)}
            className="p-1.5 hover:bg-white/20 rounded-lg text-white transition-colors"
          >
            {isFullScreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 hover:bg-white/20 rounded-lg text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#f8f9fa]">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn(
              "flex w-full",
              msg.sender === 'user' ? "justify-end" : "justify-start"
            )}
          >
            <div className={cn(
              "max-w-[80%] rounded-2xl p-3 text-sm leading-relaxed shadow-sm",
              msg.sender === 'user'
                ? "bg-blue-600 text-white rounded-br-none"
                : "bg-white text-gray-800 rounded-bl-none border border-gray-100"
            )}>
              {msg.sender === 'ai' && (
                <div className="flex items-center gap-1.5 mb-1 text-purple-600 font-semibold text-xs">
                  <Sparkles className="w-3 h-3" />
                  AI Assistant
                </div>
              )}
              <div className="whitespace-pre-wrap break-words prose prose-sm max-w-none">
                {msg.text.split('\n').map((line, lineIndex) => {
                  // Handle Headers ###
                  if (line.startsWith('###')) {
                    return <h4 key={lineIndex} className="text-sm font-bold mt-3 mb-1 text-purple-800">{line.replace('###', '').trim()}</h4>;
                  }
                  
                  // Handle Bullets * or -
                  const isBullet = line.trim().startsWith('* ') || line.trim().startsWith('- ');
                  
                  return (
                    <div key={lineIndex} className={cn(isBullet ? "pl-4 -indent-4 mb-1" : "mb-2")}>
                      {line.split(/(\*\*.*?\*\*)/g).map((part, i) => {
                        if (part.startsWith('**') && part.endsWith('**')) {
                          return <strong key={i} className={cn(msg.sender === 'ai' ? "text-purple-700" : "text-white")}>{part.slice(2, -2)}</strong>;
                        }
                        return <span key={i}>{part}</span>;
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions & Input Area */}
      <div className="p-4 bg-white border-t border-gray-100 flex-shrink-0">
        {/* Suggestions */}
        <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide mb-2 mask-linear-fade">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="flex-shrink-0 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-colors whitespace-nowrap"
            >
              {suggestion}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="relative">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Напишите ваш вопрос..."
            className="w-full pl-4 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
