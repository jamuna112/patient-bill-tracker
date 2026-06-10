import type { PatientModalProps } from "../app/type";
import { formatDate, formatter, statusColors } from "../app/utils/patientUtils";


const PatientModal = ({ bill, onClose }: PatientModalProps) => {

  const paidPercentage =
    bill.totalBillAmount > 0
      ? Math.min(
        100,
        (bill.paidAmount / bill.totalBillAmount) * 100
      )
      : 0;
  return (
    <div className="fixed inset-0 bg-black/50 text-white p-6 rounded shadow-md z-50 items-center flex justify-center"
      onClick={onClose}>

      <div className=" bg-gray-800 text-white p-6 rounded-lg shadow-lg max-w-md"
        onClick={(e) => e.stopPropagation()}>
        <div className="items-center flex flex-col gap-1">
          <h3 className="text-3xl text-white">{bill.fullName}</h3>
          <span className="text-xs text-center text-white">{bill.address}</span>
        </div>
        <hr className="mt-4 border-gray-700" />

        <div className="space-y-4 mt-4">
          <div className="flex justify-between">
            <p className="text-sm text-gray-400">Hospital Provider:</p>
            <p className="text-sm text-white"> {bill.hospitalProvider}</p>
          </div>
          <hr className="mt-4 border-gray-700" />

          <div className="flex justify-between">
            <p className="text-sm text-gray-400">Insurance Provider:</p>
            <p className="text-sm text-white"> {bill.insuranceProvider}</p>
          </div>
          <hr className="mt-4 border-gray-700" />

          <div className="flex justify-between">
            <p className="text-sm text-gray-400">Status:</p>
            <p className={`${statusColors[bill.status]} px-2 py-1 rounded-2xl text-xs`}>{bill.status}</p>
          </div>
          <hr className="mt-4 border-gray-700" />

          <div className="flex justify-between">
            <p className="text-sm text-gray-400">Due Date:</p>
            <p className="text-sm text-white">{formatDate(bill.dueDate)}</p>
          </div>
          <hr className="mt-4 border-gray-700" />

          <div className="flex justify-between">
            <p className="text-sm text-gray-400">Total Bill Amount:</p>
            <p className="text-sm text-white">{formatter.format(bill.totalBillAmount)}</p>
          </div>
          <hr className="mt-4 border-gray-700" />

          <div className="flex justify-between">
            <p className="text-sm text-gray-400">Paid Amount:</p>
            <p className="text-sm text-white">{formatter.format(bill.paidAmount)}</p>
          </div>
          <hr className="mt-4 border-gray-700" />

          <div className="flex justify-between">
            <p className="text-sm text-gray-400">Remaining Amount: </p>
            <p className="text-sm text-white">{formatter.format(bill.remainingAmount)}</p>
          </div>
          <hr className="mt-4 border-gray-700" />

          <div className="flex justify-between">
            <p className="text-sm text-gray-400">Payment Progress:</p>
            <p className="text-sm text-white">{paidPercentage.toFixed(0)}%</p>
          </div>
          <hr className="mt-4 border-gray-700" />

          <div className="gap-4">
            <p className="text-sm text-gray-400">Description:</p>
            <p className="text-sm text-white">{bill.description}</p>
          </div>

        </div>
        <div className="items-center cursor-pointer flex justify-center mt-6">
          <button className="border w-full text-gray-400 text-center text-xs px-8 py-2 rounded-2xl " onClick={onClose}>Close</button>
        </div>
      </div>

    </div>
  )
};

export default PatientModal;