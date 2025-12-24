import React, { useState, useEffect } from 'react';
import { X, CheckCircle } from 'lucide-react';
import { cn } from '../lib/utils';

interface MonthlyPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  loanTitle: string;
  monthlyPayment: number;
  onConfirm: () => void;
}

const formatMoney = (amount: number) => {
  return amount.toLocaleString('ru-RU') + ' ₸';
};

export const MonthlyPaymentModal: React.FC<MonthlyPaymentModalProps> = ({
  isOpen,
  onClose,
  loanTitle,
  monthlyPayment,
  onConfirm,
}) => {
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
          <h2 className="text-lg font-bold text-gray-900">Подтверждение платежа</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-3 pt-0 flex flex-col items-center text-center">
          
          <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mb-3">
            <div className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-blue-600" />
            </div>
          </div>

          <p className="text-gray-600 mb-1 text-sm">
            Вы собираетесь оплатить ежемесячный платёж по кредиту:
          </p>
          <p className="font-medium text-gray-900 mb-3 text-sm">{loanTitle}</p>
          
          <div className="bg-gray-50 rounded-xl p-3 w-full mb-3">
             <p className="text-sm text-gray-500 mb-1">Сумма платежа</p>
             <p className="text-lg font-bold text-gray-900">{formatMoney(monthlyPayment)}</p>
          </div>

          <p className="text-xs text-gray-400 mb-3">
            После подтверждения средства будут списаны с вашего счёта
          </p>

          {/* Actions */}
          <div className="flex gap-3 w-full">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-white border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
            >
              Отмена
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-4 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all hover:shadow-xl hover:-translate-y-0.5"
            >
              Подтвердить платёж
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
