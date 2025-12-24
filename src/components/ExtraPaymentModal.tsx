import React, { useState, useEffect } from 'react';
import { X, Zap, ChevronsDown } from 'lucide-react';
import { cn } from '../lib/utils';

interface ExtraPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  loanTitle: string;
  currentRemaining: number;
  onApply: (amount: number) => void;
}

const formatMoney = (amount: number) => {
  return amount.toLocaleString('ru-RU') + ' ₸';
};

export const ExtraPaymentModal: React.FC<ExtraPaymentModalProps> = ({
  isOpen,
  onClose,
  loanTitle,
  currentRemaining,
  onApply,
}) => {
  const [amount, setAmount] = useState<number>(10000);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isVisible) return null;

  const newRemaining = Math.max(0, currentRemaining - amount);
  // Mock calculations for savings
  const monthsSaved = Math.max(1, Math.floor(amount / 10000));
  const interestSaved = Math.floor(amount * 0.25); // Mock 25% saving

  return (
    <div className={cn(
      "fixed inset-0 z-[100] flex items-center justify-center p-4 transition-opacity duration-300",
      isOpen ? "opacity-100" : "opacity-0"
    )}>
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className={cn(
        "relative bg-white rounded-2xl shadow-xl w-full max-w-[420px] overflow-hidden transform transition-all duration-300",
        isOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
      )}>
        {/* Header */}
        <div className="flex items-center justify-between p-3 pb-2">
          <div className="flex items-center gap-2 text-green-600">
            <Zap className="w-5 h-5 fill-current" />
            <h2 className="text-lg font-bold text-gray-900">Дополнительный платёж</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-3 pt-0">
          {/* Loan Info */}
          <div className="mb-2">
            <p className="text-sm text-gray-500 mb-1">Кредит</p>
            <p className="font-medium text-gray-900 text-sm">{loanTitle}</p>
          </div>

          {/* Input */}
          <div className="mb-2">
            <label className="block text-sm text-gray-500 mb-1">
              Сумма дополнительного платежа (₸)
            </label>
            <div className="relative">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-lg font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
              />
              <div className="absolute right-0 top-0 bottom-0 flex flex-col border-l border-gray-200">
                <button 
                   onClick={() => setAmount(prev => prev + 1000)}
                   className="flex-1 px-3 hover:bg-gray-100 transition-colors flex items-center justify-center text-gray-500"
                >
                  ▲
                </button>
                <button 
                   onClick={() => setAmount(prev => Math.max(0, prev - 1000))}
                   className="flex-1 px-3 hover:bg-gray-100 transition-colors flex items-center justify-center text-gray-500"
                >
                  ▼
                </button>
              </div>
            </div>
          </div>

          {/* Savings Info */}
          <div className="bg-green-50 rounded-xl p-4 mb-6 border border-green-100">
            <div className="flex items-start gap-3">
              <div className="bg-green-100 p-1.5 rounded-lg mt-0.5">
                 <ChevronsDown className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 text-sm mb-1">Ускорение выплаты</h4>
                <p className="text-sm text-green-800 leading-relaxed mb-2">
                  С этим платежом вы закроете кредит на <span className="font-bold">{monthsSaved} месяц</span> раньше!
                </p>
                <p className="text-sm font-medium text-green-700">
                  Экономия на процентах: ~{formatMoney(interestSaved)}
                </p>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="bg-gray-50 rounded-xl p-4 space-y-3 mb-6">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Текущий остаток</span>
              <span className="font-medium text-gray-900">{formatMoney(currentRemaining)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Доп. платёж</span>
              <span className="font-medium text-green-600">-{formatMoney(amount)}</span>
            </div>
            <div className="h-px bg-gray-200 my-2" />
            <div className="flex justify-between text-base">
              <span className="font-medium text-gray-900">Новый остаток</span>
              <span className="font-bold text-gray-900">{formatMoney(newRemaining)}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-white border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
            >
              Отмена
            </button>
            <button
              onClick={() => onApply(amount)}
              className="flex-1 px-4 py-3 bg-green-600 text-white font-medium rounded-xl hover:bg-green-700 shadow-lg shadow-green-200 transition-all hover:shadow-xl hover:-translate-y-0.5"
            >
              Применить платёж
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
