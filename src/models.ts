export interface Loan {
  id: number;
  title: string;
  subtitle: string;
  totalAmount: number;
  remainingAmount: number;
  monthlyPayment: number;
  interestRate: number;
  term: number;
  termUnit: 'months' | 'years';
  progress: number;
  color: string;
}
