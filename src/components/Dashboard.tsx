import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { SummaryStats } from './SummaryStats';
import { LoanList } from './LoanList';
import { AddLoanModal } from './AddLoanModal';
import { useFinancialData } from '../lib/FinancialContext';

export const Dashboard: React.FC = () => {
  const { loans, addLoan, updateLoan, deleteLoan } = useFinancialData();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

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
        onUpdateLoan={updateLoan} 
        onDeleteLoan={deleteLoan}
      />

      <AddLoanModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={addLoan}
      />
    </>
  );
};
