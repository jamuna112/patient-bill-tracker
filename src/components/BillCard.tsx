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
    <div className=" p-4 rounded-lg shadow-md mb-4 inline-block bg-gray-800">
      <h3 className="text-white">{bill.fullName}</h3>
      <dl>
        <dt>Hospital: </dt>
        <dd>{bill.hospitalProvider}</dd>
        <dt>Total Bill:</dt>
        <dd>{formatter.format(bill.totalBillAmount)}</dd>
        <dt>Description:</dt>
        <dd>{bill.description}</dd>
        <dt>Status:</dt>
        <dd
          className={`${statusColors[bill.status]} inline-block px-3 py-1 rounded-full`}
        >
          {bill.status}
        </dd>
        <dt>Remaining Balance:</dt>
        <dd>{formatter.format(bill.remainingAmount)}</dd>
      </dl>
    </div>
  );
}

export default BillCard;
