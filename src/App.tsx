import BillCard from "./components/BillCard"
import { patients } from "./app/mocks/patients"
import { useState } from "react"


const todaysDate = new Date().toLocaleDateString("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
})

const paymentStatus = (totalAmount: number, paidAmount: number): string => {
  if (paidAmount === 0) {
    return "Unpaid"
  }
  if (paidAmount === totalAmount) {
    return "Paid"
  }
  else {
    return "Pending"
  }
}

const patientsWithStatus = patients.map((patient) => ({
  ...patient,
  status: paymentStatus(patient.totalBillAmount, patient.paidAmount)
}))

function App() {
  const [activeFilter, setActiveFilter] = useState("All")

  const filteredPatients = patientsWithStatus.filter((patient) => {
    if (activeFilter === "All") {
      return true
    }
    return patient.status === activeFilter
  })

  return (

    <div>

      <h1 className="text-center font-extrabold text-3xl">Patient Billing Tracker</h1>
      <p className="text-center font-light text-md">A simple, secure app to track patient invoices, manage healthcare payments, and monitor outstanding medical balances in one place.</p>
      <p className="text-md text-center">{todaysDate}</p>
      <div>
        <button className={`${activeFilter === "All" ? "bg-blue-500" : "bg-blue-950"} rounded-2xl h-8 w-25 m-2 text-white  active:scale-95`} onClick={() => {
          setActiveFilter("All")
        }}>All</button>
        <button className={` ${activeFilter === "Paid" ? "bg-green-500" : "bg-blue-950"} rounded-2xl h-8 w-25 m-2 text-white active:scale-95`} onClick={() => {
          setActiveFilter("Paid")
        }}>Paid</button>
        <button className={`${activeFilter === "Unpaid" ? "bg-red-500" : "bg-blue-950"} rounded-2xl h-8 w-25 m-2 text-white active:scale-95`} onClick={() => {
          setActiveFilter("Unpaid")
        }}>Unpaid</button>
        <button className={`${activeFilter === "Pending" ? "bg-yellow-500" : "bg-blue-950"} rounded-2xl h-8 w-25 m-2 text-white active:scale-95`} onClick={() => {
          setActiveFilter("Pending")
        }}>Pending</button>
      </div>
      <div className="grid grid-cols-3 gap-2 m-2">
        {
          filteredPatients.map((patient) => {
            return (
              <BillCard key={patient.id} bill={patient} />
            )
          })
        }
      </div>
    </div>
  )
}

export default App
