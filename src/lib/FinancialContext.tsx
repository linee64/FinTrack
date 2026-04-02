import React, { createContext, useContext, useState } from 'react';
import type { Loan } from '../models';
import { ShoppingBag, Car, GraduationCap, Coffee } from 'lucide-react';

export interface Expense {
  id: number;
  title: string;
  category: string;
  date: string;
  amount: number;
  icon?: any;
  iconColor?: string;
  bgColor?: string;
}

interface FinancialContextType {
  loans: Loan[];
  expenses: Expense[];
  addLoan: (loan: Omit<Loan, 'id' | 'progress' | 'color'>) => void;
  updateLoan: (loan: Loan) => void;
  deleteLoan: (id: number) => void;
  addExpense: (expense: Omit<Expense, 'id' | 'date' | 'icon' | 'iconColor' | 'bgColor'>) => void;
  deleteExpense: (id: number) => void;
}

const FinancialContext = createContext<FinancialContextType | undefined>(undefined);

export const FinancialProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loans, setLoans] = useState<Loan[]>([
    {
      id: 1,
      title: 'Ипотека',
      subtitle: 'Квартира в Алматы',
      totalAmount: 15000000,
      remainingAmount: 12500000,
      monthlyPayment: 150000,
      interestRate: 12.5,
      term: 15,
      termUnit: 'years',
      progress: 17,
      color: '#3b82f6',
    },
    {
      id: 2,
      title: 'Автокредит',
      subtitle: 'Toyota Camry',
      totalAmount: 5000000,
      remainingAmount: 3200000,
      monthlyPayment: 85000,
      interestRate: 18.0,
      term: 5,
      termUnit: 'years',
      progress: 36,
      color: '#3b82f6',
    },
  ]);

  const [expenses, setExpenses] = useState<Expense[]>([
    {
      id: 1,
      title: 'Продукты в магазине',
      category: 'Еда',
      date: '2025-11-07',
      amount: 15000,
      icon: ShoppingBag,
      iconColor: 'text-blue-500',
      bgColor: 'bg-blue-50',
    },
    {
      id: 2,
      title: 'Бензин',
      category: 'Транспорт',
      date: '2025-11-06',
      amount: 8000,
      icon: Car,
      iconColor: 'text-purple-500',
      bgColor: 'bg-purple-50',
    },
  ]);

  const addLoan = (loanData: Omit<Loan, 'id' | 'progress' | 'color'>) => {
    const newId = Math.max(...loans.map(l => l.id), 0) + 1;
    const newLoan: Loan = {
      ...loanData,
      id: newId,
      progress: 0,
      remainingAmount: loanData.totalAmount,
      color: '#3b82f6',
    };
    setLoans(prev => [...prev, newLoan]);
  };

  const updateLoan = (updatedLoan: Loan) => {
    setLoans(prev => prev.map(loan => loan.id === updatedLoan.id ? updatedLoan : loan));
  };

  const deleteLoan = (id: number) => {
    setLoans(prev => prev.filter(loan => loan.id !== id));
  };

  const addExpense = (expenseData: Omit<Expense, 'id' | 'date' | 'icon' | 'iconColor' | 'bgColor'>) => {
    let icon = ShoppingBag;
    let iconColor = 'text-gray-500';
    let bgColor = 'bg-gray-50';

    switch (expenseData.category) {
      case 'Еда':
        icon = ShoppingBag;
        iconColor = 'text-blue-500';
        bgColor = 'bg-blue-50';
        break;
      case 'Транспорт':
        icon = Car;
        iconColor = 'text-purple-500';
        bgColor = 'bg-purple-50';
        break;
      case 'Образование':
        icon = GraduationCap;
        iconColor = 'text-emerald-500';
        bgColor = 'bg-emerald-50';
        break;
      case 'Развлечения':
        icon = Coffee;
        iconColor = 'text-rose-500';
        bgColor = 'bg-rose-50';
        break;
    }

    const newExpense: Expense = {
      ...expenseData,
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      icon,
      iconColor,
      bgColor,
    };
    setExpenses(prev => [newExpense, ...prev]);
  };

  const deleteExpense = (id: number) => {
    setExpenses(prev => prev.filter(e => e.id !== id));
  };

  return (
    <FinancialContext.Provider value={{ loans, expenses, addLoan, updateLoan, deleteLoan, addExpense, deleteExpense }}>
      {children}
    </FinancialContext.Provider>
  );
};

export const useFinancialData = () => {
  const context = useContext(FinancialContext);
  if (context === undefined) {
    throw new Error('useFinancialData must be used within a FinancialProvider');
  }
  return context;
};
