import React, { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';
import { cn } from '../lib/utils';
import type { Loan } from '../models';

interface EditLoanModalProps {
  isOpen: boolean;
  onClose: () => void;
  loan: Loan;
  onSave: (updatedLoan: Loan) => void;
}

export const EditLoanModal: React.FC<EditLoanModalProps> = ({
  isOpen,
  onClose,
  loan,
  onSave,
}) => {
  const [formData, setFormData] = useState<Loan>(loan);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setFormData({
        ...loan,
        title: loan.subtitle ? `${loan.title} - ${loan.subtitle}` : loan.title,
        subtitle: ''
      });
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen, loan]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'totalAmount' || name === 'monthlyPayment' || name === 'remainingAmount' || name === 'interestRate' || name === 'term'
        ? Number(value) 
        : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

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
          <h2 className="text-lg font-bold text-gray-900">Изменить займ</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-3 pt-0">
          <div className="space-y-2">
            <div>
              <label className="block text-sm text-gray-500 mb-1">Название займа</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>

            {/* Hidden subtitle field for now, or we can add it if needed. 
                But based on the screenshot, there is only one name field.
                We will keep subtitle as part of the data but maybe not editable here 
                OR we can add it below if the user wants. 
                The user said "all fields... name...". 
                I will merge them visually or just show title for now as per screenshot.
                Wait, if I don't show subtitle, user can't edit it.
                I'll add it back but maybe make it less prominent or just follow the request for "all fields".
                I will add subtitle below title for completeness, as I can't merge them easily without data loss logic.
            */}
            
            {/* Subtitle removed as requested */}

            <div>
              <label className="block text-sm text-gray-500 mb-1">Сумма займа</label>
              <input
                type="number"
                name="totalAmount"
                value={formData.totalAmount || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-500 mb-1">Годовая ставка (%)</label>
              <input
                type="number"
                name="interestRate"
                value={formData.interestRate || ''}
                onChange={handleChange}
                step="0.1"
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-500 mb-1">Рекомендуемая ежемесячная оплата</label>
              <input
                type="number"
                name="monthlyPayment"
                value={formData.monthlyPayment || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-500 mb-1">Срок выплаты</label>
              <div className="relative">
                <select
                  name="termUnit"
                  value={formData.termUnit}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none text-sm"
                >
                  <option value="months">месяцы</option>
                  <option value="years">годы</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                   {formData.termUnit === 'months' && <Check className="w-3 h-3 text-gray-400" />}
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-white border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
            >
              Отменить
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              Сохранить изменения
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
