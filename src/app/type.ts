export interface BillCardProps {
  bill: {
    fullName: string;
    address: string;
    hospitalProvider: string;
    description: string;
    totalBillAmount: number;
    paidAmount: number;
    remainingAmount: number;
    dueDate: string;
    insuranceProvider: string;
    status: string;
  };
  onClick?: () => void;
}

export interface PatientModalProps extends BillCardProps {
  onClose: () => void;
}
