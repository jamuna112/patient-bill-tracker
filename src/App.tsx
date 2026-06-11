import { patients } from "./app/mocks/patients"
import { useState } from "react"
import { Search } from "lucide-react"
import PatientModal from "./components/PatientModal"
import { formatter } from "./app/utils/patientUtils"
import BillCard from "./components/BillCard"
import type { BillCardProps } from "./app/type"


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
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPatient, setSelectedPatient] = useState<BillCardProps["bill"] | null>(null)

  const filteredPatients = patientsWithStatus.filter((patient) => {
    if (activeFilter === "All" && (patient.fullName.toLowerCase().includes(searchTerm.toLowerCase()))) {
      return true
    }
    return patient.status === activeFilter && (patient.fullName.toLowerCase().includes(searchTerm.toLowerCase()))
  })

  const totalPatientCount = filteredPatients.length
  const totalBilled = filteredPatients.reduce((acc, patient) => acc + patient.totalBillAmount, 0)
  const totalPaidAmount = filteredPatients.reduce((acc, patient) => acc + patient.paidAmount, 0)
  const totalRemainingAmount = filteredPatients.reduce((acc, patient) => acc + patient.remainingAmount, 0)

  return (

    <div className="px-6 py-4 bg-gray-950">

      <div className="mb-6">
        <h1 className="text-center font-extrabold text-3xl text-gray-100">Patient Billing Tracker</h1>
        <p className="text-center font-light text-gray-100">A simple, secure app to track patient invoices, manage healthcare payments, and monitor outstanding medical balances in one place.</p>
        <p className="text-center text-sm text-gray-100">{todaysDate}</p>
      </div>
      <div className="grid grid-cols-4 gap-4 items-center mb-6">
        <div className="bg-gray-800 p-4 rounded border-t-2 border-blue-500">
          <p className="text-sm text-gray-400 text-center p-2">Total Patients</p>
          <p className="text-3xl text-white font-bold text-center">{totalPatientCount}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded border-t-2 border-gray-300">
          <p className="text-sm text-gray-400 text-center p-2">Total Billed</p>
          <p className="text-3xl text-white font-bold text-center">{formatter.format(totalBilled)}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded border-t-2 border-green-300">
          <p className="text-sm text-gray-400 text-center p-2">Total Paid Amount</p>
          <p className="text-3xl text-white font-bold text-center">{formatter.format(totalPaidAmount)}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded border-t-2 border-yellow-200">
          <p className="text-sm text-gray-400 text-center p-2">Total Remaining Amount</p>
          <p className="text-3xl text-white font-bold text-center">{formatter.format(totalRemainingAmount)}</p>
        </div>
      </div>
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-70">
          <Search className="absolute right-3 top-1/2 py-0.5 -translate-y-1/2 pointer-events-none text-gray-400" />
          <input type="text" placeholder="Search" className="bg-gray-800 text-white outline-none focus:ring-2 focus:ring-gray-400 h-8 w-70 m-2 rounded-2xl text-sm px-2 " onChange={(e) => {
            setSearchTerm(e.target.value)
          }} />
        </div>

        <div>
          <button className={`${activeFilter === "All" ? "bg-blue-500" : "bg-gray-800"} rounded-2xl h-8 w-25 m-2 text-white text-xs  active:scale-95`} onClick={() => {
            setActiveFilter("All")
          }}>All</button>
          <button className={` ${activeFilter === "Paid" ? "bg-green-500" : "bg-gray-800"} rounded-2xl h-8 w-25 m-2 text-white text-xs active:scale-95`} onClick={() => {
            setActiveFilter("Paid")
          }}>Paid</button>
          <button className={`${activeFilter === "Unpaid" ? "bg-red-500" : "bg-gray-800"} rounded-2xl h-8 w-25 text-xs m-2 text-white active:scale-95`} onClick={() => {
            setActiveFilter("Unpaid")
          }}>Unpaid</button>
          <button className={`${activeFilter === "Pending" ? "bg-yellow-500" : "bg-gray-800"} rounded-2xl h-8 w-25 text-xs m-2 text-white active:scale-95`} onClick={() => {
            setActiveFilter("Pending")
          }}>Pending</button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-2 gap-6">
        {
          filteredPatients.length === 0 ? (
            <p className="text-center text-gray-500 col-span-full">No patients found.</p>
          ) : (
            filteredPatients.map((patient) => (
              <BillCard
                key={patient.id}
                bill={patient}
                onClick={() => setSelectedPatient(patient)} />
            ))
          )
        }
      </div>
      {
        selectedPatient && (
          <PatientModal
            bill={selectedPatient}
            onClose={() => setSelectedPatient(null)}
          />
        )
      }
    </div>
  )
}

export default App
