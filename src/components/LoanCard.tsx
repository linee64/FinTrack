import React from 'react';
import { Pencil, Trash2, CreditCard, Plus } from 'lucide-react';

interface LoanCardProps {
  title: string;
  subtitle: string;
  totalAmount: number;
  remainingAmount: number;
  monthlyPayment: number;
  progress: number;
  color: string;
  onExtraPayment: () => void;
  onMonthlyPayment: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const formatMoney = (amount: number) => {
  return amount.toLocaleString('ru-RU') + ' ₸';
};

export const LoanCard: React.FC<LoanCardProps> = ({
  title,
  subtitle,
  totalAmount,
  remainingAmount,
  monthlyPayment,
  progress,
  color,
  onExtraPayment,
  onMonthlyPayment,
  onEdit,
  onDelete,
}) => {
  // Calculate circumference for the progress ring
  const radius = 26;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4 transition-shadow hover:shadow-md">
      {/* Left Section: Progress & Info */}
      <div className="flex items-center gap-4 w-full md:w-auto">
        {/* Progress Ring */}
        <div className="relative w-16 h-16 flex-shrink-0">
          <svg className="transform -rotate-90 w-16 h-16">
            <circle
              className="text-gray-100"
              strokeWidth="4"
              stroke="currentColor"
              fill="transparent"
              r={radius}
              cx="32"
              cy="32"
            />
            <circle
              className="transition-all duration-1000 ease-out"
              strokeWidth="4"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              stroke={color}
              fill="transparent"
              r={radius}
              cx="32"
              cy="32"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-bold text-gray-700">{progress}%</span>
          </div>
        </div>

        {/* Text Info */}
        <div className="flex flex-col gap-1.5">
          <div>
             <h3 className="font-semibold text-gray-900 text-base">
                {subtitle ? (
                  <>
                    <span className="text-gray-500 font-normal">{title}</span> - {subtitle}
                  </>
                ) : (
                  title
                )}
            </h3>
          </div>
          
          <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-gray-500">
             <div className="flex gap-1">
                <span>Общая сумма:</span>
                <span className="font-medium text-gray-900">{formatMoney(totalAmount)}</span>
             </div>
             <div className="flex gap-1">
                <span>Осталось:</span>
                <span className="font-medium text-blue-600">{formatMoney(remainingAmount)}</span>
             </div>
             <div className="flex gap-1">
                <span>Ежемесячный платёж:</span>
                <span className="font-medium text-gray-900">{formatMoney(monthlyPayment)}</span>
             </div>
          </div>
        </div>
      </div>

      {/* Right Section: Actions */}
      <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-start md:justify-end">
        <button 
          onClick={onEdit}
          className="flex-1 md:flex-none flex items-center justify-center gap-2 px-3 py-1.5 text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm font-medium transition-colors border border-gray-200"
        >
          <Pencil className="w-3.5 h-3.5" />
          <span className="md:inline">Изменить</span>
        </button>
        <button 
          onClick={onDelete}
          className="flex-1 md:flex-none flex items-center justify-center gap-2 px-3 py-1.5 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg text-sm font-medium transition-colors border border-red-100"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span className="md:inline">Удалить</span>
        </button>
        <button 
          onClick={onMonthlyPayment}
          className="flex-1 md:flex-none flex items-center justify-center gap-2 px-3 py-1.5 text-white bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors shadow-sm shadow-blue-200"
        >
          <CreditCard className="w-3.5 h-3.5" />
          <span className="whitespace-nowrap">Оплатить месяц</span>
        </button>
        <button 
          onClick={(e) => {
            console.log('Button clicked');
            e.stopPropagation();
            onExtraPayment();
          }}
          className="flex-1 md:flex-none flex items-center justify-center gap-2 px-3 py-1.5 text-white bg-green-600 hover:bg-green-700 rounded-lg text-sm font-medium transition-colors shadow-sm shadow-green-200 cursor-pointer relative z-10"
        >
          <Plus className="w-3.5 h-3.5" />
          <span className="whitespace-nowrap">Доп. платёж</span>
        </button>
      </div>
    </div>
  );
};
