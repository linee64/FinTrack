import React, { useState, useEffect } from 'react';
import { X, Trash2, AlertTriangle } from 'lucide-react';
import { cn } from '../lib/utils';

interface DeleteLoanModalProps {
  isOpen: boolean;
  onClose: () => void;
  loanTitle: string;
  onConfirm: () => void;
}

export const DeleteLoanModal: React.FC<DeleteLoanModalProps> = ({
  isOpen,
  onClose,
  loanTitle,
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
          <div className="flex items-center gap-2 text-red-600">
            <Trash2 className="w-5 h-5" />
            <h2 className="text-sm font-bold text-gray-900">Удалить кредит</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-3 pt-0 flex flex-col items-center text-center">
          
          <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mb-3">
            <div className="w-9 h-9 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
          </div>

          <p className="text-gray-600 mb-1 text-xs">
            Вы действительно хотите удалить этот кредит?
          </p>
          <p className="font-medium text-gray-900 mb-3 text-lg">{loanTitle}</p>
          
          <p className="text-[11px] text-gray-400 mb-3">
            Это действие нельзя будет отменить. Вся история платежей по этому кредиту будет потеряна.
          </p>

          {/* Actions */}
          <div className="flex gap-2 w-full">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-white border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors text-xs"
            >
              Отмена
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 shadow-sm shadow-red-200 transition-all hover:shadow-md text-xs"
            >
              Удалить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
