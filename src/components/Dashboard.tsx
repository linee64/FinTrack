import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { SummaryStats } from './SummaryStats';
import { LoanList } from './LoanList';
import { AddLoanModal } from './AddLoanModal';
import type { Loan } from '../models';

export const Dashboard: React.FC = () => {
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
      color: '#3b82f6', // blue-500
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
    {
      id: 3,
      title: 'Потребительский кредит',
      subtitle: 'Ремонт',
      totalAmount: 1000000,
      remainingAmount: 450000,
      monthlyPayment: 45000,
      interestRate: 22.5,
      term: 24,
      termUnit: 'months',
      progress: 55,
      color: '#3b82f6',
    },
  ]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAddLoan = (newLoanData: Omit<Loan, 'id' | 'progress' | 'color'>) => {
    const newId = Math.max(...loans.map(l => l.id), 0) + 1;
    const newLoan: Loan = {
      ...newLoanData,
      id: newId,
      progress: 0,
      remainingAmount: newLoanData.totalAmount,
      color: '#3b82f6',
    };
    setLoans(prevLoans => [...prevLoans, newLoan]);
    setIsAddModalOpen(false);
  };

  const handleUpdateLoan = (updatedLoan: Loan) => {
    setLoans(prevLoans => prevLoans.map(loan => 
      loan.id === updatedLoan.id ? updatedLoan : loan
    ));
  };

  const handleDeleteLoan = (loanId: number) => {
    setLoans(prevLoans => prevLoans.filter(loan => loan.id !== loanId));
  };

  return (
    <>
      {/* Dashboard Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Панель управления</h1>
          <p className="text-gray-500 mt-1">Обзор ваших финансов</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium shadow-sm shadow-blue-200 transition-all hover:shadow-md"
        >
          <Plus className="w-5 h-5" />
          Добавить кредит
        </button>
      </div>

      {/* Stats */}
      <SummaryStats loans={loans} />

      {/* Loan List */}
      <LoanList 
        loans={loans} 
        onUpdateLoan={handleUpdateLoan} 
        onDeleteLoan={handleDeleteLoan}
      />

      <AddLoanModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddLoan}
      />
    </>
  );
};
