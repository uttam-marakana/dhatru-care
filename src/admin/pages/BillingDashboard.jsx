import { useState, useEffect } from 'react'
import { FaRupeeSign, FaCreditCard, FaFileInvoice, FaChartLine } from 'react-icons/fa'
import AdminHeader from '../components/layout/AdminHeader'
import DashboardCard from '../components/cards/DashboardCard'
import AdminTable from '../components/common/AdminTable'
import Button from '../../components/common/Button'
import { getInvoices, getRevenueStats, initiatePayment } from '../../api/billingApi'
import EmptyState from '../components/common/EmptyState'

export default function BillingDashboard() {
  const [invoices, setInvoices] = useState([])
  const [stats, setStats] = useState({})
  const [loading, setLoading] = useState(true)
  const [selectedInvoice, setSelectedInvoice] = useState(null)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [invoiceData, revenueData] = await Promise.all([
        getInvoices(),
        getRevenueStats()
      ])
      setInvoices(invoiceData)
      setStats(revenueData)
      setLoading(false)
    } catch (error) {
      console.error('Billing data error:', error)
      setLoading(false)
    }
  }

  const handlePayment = async (invoice) => {
    try {
      const result = await initiatePayment(invoice.totalAmount, invoice.id)
      if (result.success) {
        await updatePaymentStatus(invoice.id, 'paid', {
          paymentId: result.paymentId,
          amount: result.amount
        })
        loadData() // refresh
      }
    } catch (error) {
      console.error('Payment error:', error)
    }
  }

  const columns = [
    { key: 'patientName', header: 'Patient', render: (i) => i.patientName },
    { key: 'doctorName', header: 'Doctor', render: (i) => i.doctorName },
    { key: 'date', header: 'Date', render: (i) => i.date },
    { key: 'totalAmount', header: 'Amount', render: (i) => `₹${i.totalAmount}` },
    {
      key: 'status',
      header: 'Status',
      render: (i) => (
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          i.status === 'paid' ? 'bg-green-100 text-green-800' :
          i.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
          'bg-red-100 text-red-800'
        }`}>
          {i.status?.toUpperCase()}
        </span>
      )
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (invoice) => (
        <div className="flex gap-2">
          <Button 
            size="sm"
            onClick={() => setSelectedInvoice(invoice)}
            disabled={invoice.status === 'paid'}
          >
            {invoice.status === 'paid' ? 'Paid' : 'Pay Now'}
          </Button>
        </div>
      )
    }
  ]

  if (loading) return <div className="flex justify-center py-20">Loading...</div>

  return (
    <div className="space-y-8">
      <AdminHeader 
        title="Billing Dashboard" 
        description="Manage invoices and payments"
      />

      {/* Revenue Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard 
          title="Total Revenue" 
          value={`₹${stats.totalRevenue || 0}`}
          icon={<FaRupeeSign />}
          color="green"
        />
        <DashboardCard 
          title="This Month" 
          value={`₹${stats.monthlyRevenue || 0}`}
          icon={<FaChartLine />}
          color="blue"
        />
        <DashboardCard 
          title="Pending Payments" 
          value={stats.pending || 0}
          icon={<FaCreditCard />}
          color="yellow"
        />
        <DashboardCard 
          title="Total Invoices" 
          value={stats.totalInvoices || 0}
          icon={<FaFileInvoice />}
          color="purple"
        />
      </div>

      {/* Invoices Table */}
      {invoices.length === 0 ? (
        <EmptyState 
          title="No invoices yet"
          description="Appointments will generate invoices automatically"
        />
      ) : (
        <AdminTable
          data={invoices}
          columns={columns}
          searchKeys={['patientName', 'doctorName']}
          pageSize={10}
        />
      )}
    </div>
  )
}

