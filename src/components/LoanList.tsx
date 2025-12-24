import React, { useState } from 'react';
import { LoanCard } from './LoanCard';
import { ExtraPaymentModal } from './ExtraPaymentModal';
import { MonthlyPaymentModal } from './MonthlyPaymentModal';
import { EditLoanModal } from './EditLoanModal';
import { DeleteLoanModal } from './DeleteLoanModal';
import type { Loan } from '../models';

interface LoanListProps {
  loans: Loan[];
  onUpdateLoan: (updatedLoan: Loan) => void;
  onDeleteLoan: (loanId: number) => void;
}

export const LoanList: React.FC<LoanListProps> = ({ loans, onUpdateLoan, onDeleteLoan }) => {
  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);
  const [isExtraModalOpen, setIsExtraModalOpen] = useState(false);
  const [isMonthlyModalOpen, setIsMonthlyModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleExtraPaymentClick = (loan: Loan) => {
    console.log('Opening extra modal for:', loan.title);
    setSelectedLoan(loan);
    setIsExtraModalOpen(true);
  };

  const handleMonthlyPaymentClick = (loan: Loan) => {
    console.log('Opening monthly modal for:', loan.title);
    setSelectedLoan(loan);
    setIsMonthlyModalOpen(true);
  };

  const handleEditClick = (loan: Loan) => {
    console.log('Opening edit modal for:', loan.title);
    setSelectedLoan(loan);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (loan: Loan) => {
    console.log('Opening delete confirmation for:', loan.title);
    setSelectedLoan(loan);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedLoan) {
      onDeleteLoan(selectedLoan.id);
      setIsDeleteModalOpen(false);
      setSelectedLoan(null);
    }
  };

  const updateLoanAmount = (loanId: number, paymentAmount: number) => {
    const loan = loans.find(l => l.id === loanId);
    if (!loan) return;

    const newRemaining = Math.max(0, loan.remainingAmount - paymentAmount);
    const newProgress = Math.min(100, Math.round(((loan.totalAmount - newRemaining) / loan.totalAmount) * 100));
    
    const updatedLoan = {
      ...loan,
      remainingAmount: newRemaining,
      progress: newProgress
    };
    onUpdateLoan(updatedLoan);
  };

  const handleApplyExtraPayment = (amount: number) => {
    if (selectedLoan) {
      console.log(`Applied extra payment of ${amount} to loan ${selectedLoan.id}`);
      updateLoanAmount(selectedLoan.id, amount);
      setIsExtraModalOpen(false);
    }
  };

  const handleApplyMonthlyPayment = () => {
    if (selectedLoan) {
      console.log(`Applied monthly payment of ${selectedLoan.monthlyPayment} to loan ${selectedLoan.id}`);
      updateLoanAmount(selectedLoan.id, selectedLoan.monthlyPayment);
      setIsMonthlyModalOpen(false);
    }
  };

  const handleSaveLoan = (updatedLoan: Loan) => {
    console.log('Saving loan:', updatedLoan);
    onUpdateLoan(updatedLoan);
    setIsEditModalOpen(false);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-gray-500 text-sm font-medium">Все кредиты</h2>
      </div>
      
      {loans.map((loan) => (
        <LoanCard 
          key={loan.id} 
          {...loan} 
          onExtraPayment={() => handleExtraPaymentClick(loan)}
          onMonthlyPayment={() => handleMonthlyPaymentClick(loan)}
          onEdit={() => handleEditClick(loan)}
          onDelete={() => handleDeleteClick(loan)}
        />
      ))}

      {selectedLoan && (
        <>
          <ExtraPaymentModal
            isOpen={isExtraModalOpen}
            onClose={() => setIsExtraModalOpen(false)}
            loanTitle={`${selectedLoan.title} - ${selectedLoan.subtitle}`}
            currentRemaining={selectedLoan.remainingAmount}
            onApply={handleApplyExtraPayment}
          />
          <MonthlyPaymentModal
            isOpen={isMonthlyModalOpen}
            onClose={() => setIsMonthlyModalOpen(false)}
            loanTitle={`${selectedLoan.title} - ${selectedLoan.subtitle}`}
            monthlyPayment={selectedLoan.monthlyPayment}
            onConfirm={handleApplyMonthlyPayment}
          />
          <EditLoanModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            loan={selectedLoan}
            onSave={handleSaveLoan}
          />
          <DeleteLoanModal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            loanTitle={`${selectedLoan.title} - ${selectedLoan.subtitle}`}
            onConfirm={handleConfirmDelete}
          />
        </>
      )}
    </div>
  );
};
