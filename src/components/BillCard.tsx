interface BillCardProps {
  bill: {
    fullName: string
    hospitalProvider: string
    description: string
    totalBillAmount: number
    paidAmount: number
    remainingAmount: number
    status: string
  }
}



export const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

function BillCard({ bill }: BillCardProps) {
  const statusColors = {
    Paid: "bg-green-100 text-green-800",
    Unpaid: "bg-red-100 text-red-800",
    Pending: "bg-yellow-100 text-yellow-800",
  };

  const paidColorClass = bill.paidAmount > 0 ? statusColors.Paid : "bg-gray-900 text-gray-400";

  const paidPercentage =
    bill.totalBillAmount > 0
      ? Math.min(
        100,
        (bill.paidAmount / bill.totalBillAmount) * 100
      )
      : 0;
  const progressBar =
    paidPercentage === 100
      ? "bg-green-500"
      : paidPercentage >= 50
        ? "bg-yellow-500"
        : "bg-orange-500";

  return (
    <div className=" p-4 rounded-lg shadow-md bg-gray-800">

      <div className="space-y-2 mt-4">
        <div className="flex justify-between">
          <h3 className="text-white text-2xl">{bill.fullName}</h3>
          <span className={`${statusColors[bill.status]} inline-block px-2 py-1 rounded-full text-xs mb-2`}>{bill.status}</span>
        </div>
      </div>

      <div className="space-y-2 mb-2">
        <span className="text-xs text-gray-500 font-bold">{bill.hospitalProvider}</span>
      </div>

      <div className="space-y-2 mt-2 mb-6">
        <span className="text-xs text-gray-500 font-bold">{bill.description}</span>
      </div>

      <div className="mt-2">
        <div className="flex justify-between text-xs text-gray-400">
          <span>Payment Progress</span>
          <span>{paidPercentage.toFixed(0)}%</span>
        </div>

        <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden">
          <div
            className={`h-full ${progressBar} transition-all duration-700 ease-out`}
            style={{ width: `${paidPercentage}%` }}>

          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-4 text-center p-2">
        <div className="text-gray-400 rounded bg-gray-900 px-2 py-1 text-xs">
          <p className="text-xs ">Total bill</p>
          <p>{formatter.format(bill.totalBillAmount)}</p>
        </div>

        <div className={`${paidColorClass} text-xs rounded px-2 py-1`}>
          <p className="text-xs">Paid</p>
          <p>{formatter.format(bill.paidAmount)}</p>
        </div>

        <div className={`${statusColors[bill.status]} rounded text-xs px-2 py-1`}>
          <p className="text-xs">Remaining</p>
          <p>{formatter.format(bill.remainingAmount)}</p>
        </div>
      </div>
    </div >
  );
}

export default BillCard;
