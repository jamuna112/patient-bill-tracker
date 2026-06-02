const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

function BillCard({ bill }) {
  const statusColors = {
    Paid: "bg-green-100 text-green-800",
    Unpaid: "bg-red-100 text-red-800",
    Pending: "bg-yellow-100 text-yellow-800",
  };

  return (
    <div className=" p-4 rounded-lg shadow-md bg-gray-800">
      <h1 className="text-white text-3xl text-center">{bill.fullName}</h1>
      <dl>
        <div className="space-y-2 mt-4">
          <div className="flex justify-between">
            <span>Hospital</span>
            <span>{bill.hospitalProvider}</span>
          </div>
        </div>
        <div className="space-y-2 mt-4">
          <div className="flex justify-between">
            <span>Total Bill:</span>
            <span>{formatter.format(bill.totalBillAmount)}</span>
          </div>
        </div>

        <div className="space-y-2 mt-4">
          <div className="flex justify-between">
            <span>Status: </span>
            <span className={`${statusColors[bill.status]} inline-block px-3 py-1 rounded-full`}>{bill.status}</span>
          </div>
        </div>

        <div className="space-y-2 mt-4">
          <div className="flex justify-between">
            <span>Remaining Balance: </span>
            <span>{formatter.format(bill.remainingAmount)}</span>
          </div>
        </div>

        <div className="space-y-2 mt-4">
          <div className="flex justify-between">
            <span>Description: </span>
            <span>{bill.description}</span>
          </div>
        </div>
      </dl>
    </div>
  );
}

export default BillCard;
