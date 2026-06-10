export const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const statusColors = {
  Paid: "bg-green-100 text-green-800",
  Unpaid: "bg-red-100 text-red-800",
  Pending: "bg-yellow-100 text-yellow-800",
};

export const paidColorClass = (bill) =>
  bill.paidAmount > 0 ? statusColors.Paid : "bg-gray-900 text-gray-400";

export const paidPercentage = (bill) =>
  bill.totalBillAmount > 0
    ? Math.min(100, (bill.paidAmount / bill.totalBillAmount) * 100)
    : 0;

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US");
};
