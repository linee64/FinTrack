import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import type { Loan } from '../models';

interface SummaryStatsProps {
  loans: Loan[];
}

export const SummaryStats: React.FC<SummaryStatsProps> = ({ loans }) => {
  const totalAmount = loans.reduce((acc, loan) => acc + loan.totalAmount, 0);
  const remainingAmount = loans.reduce((acc, loan) => acc + loan.remainingAmount, 0);
  const paidAmount = totalAmount - remainingAmount;
  const progressPercentage = totalAmount > 0 ? (paidAmount / totalAmount) * 100 : 0;

  const chartData = [
    { name: 'Paid', value: paidAmount, color: '#3b82f6' },
    { name: 'Remaining', value: remainingAmount, color: '#e2e8f0' },
  ];

  const formatMoney = (amount: number) => {
    return amount.toLocaleString('ru-RU') + ' ₸';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Total Amount Card */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <h3 className="text-gray-500 text-sm font-medium mb-4">Общая сумма кредитов</h3>
        <p className="text-2xl font-bold text-gray-900 mb-2">{formatMoney(totalAmount)}</p>
        <p className="text-sm text-gray-400">Первоначальная сумма</p>
      </div>

      {/* Remaining Card */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <h3 className="text-gray-500 text-sm font-medium mb-4">Осталось погасить</h3>
        <p className="text-2xl font-bold text-gray-900 mb-2">{formatMoney(remainingAmount)}</p>
        <p className="text-sm text-green-600 font-medium">
          Погашено: <span className="text-gray-900">{formatMoney(paidAmount)}</span>
        </p>
      </div>

      {/* Progress Card */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
        <div>
          <h3 className="text-gray-500 text-sm font-medium mb-1">Общий прогресс</h3>
        </div>
        <div className="relative w-24 h-24 flex items-center justify-center">
             <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={32}
                  outerRadius={42}
                  startAngle={90}
                  endAngle={-270}
                  dataKey="value"
                  stroke="none"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-lg font-bold text-gray-900">{Math.round(progressPercentage)}%</span>
              <span className="text-[10px] text-gray-500 leading-tight">Выплачено</span>
            </div>
        </div>
         <div className="flex flex-col justify-center">
            <span className="text-2xl font-bold text-blue-600">{progressPercentage.toFixed(1)}%</span>
            <span className="text-xs text-gray-500">Выплачено</span>
        </div>
      </div>
    </div>
  );
};
