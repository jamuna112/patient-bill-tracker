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
    status: BillStatus;
  };
  onClick?: () => void;
}

export type BillStatus = "Paid" | "Unpaid" | "Pending";
export interface PatientModalProps extends BillCardProps {
  onClose: () => void;
}
