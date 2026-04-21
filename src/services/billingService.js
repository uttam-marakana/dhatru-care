import { collection, addDoc, getDocs, updateDoc, doc, serverTimestamp, query, where, orderBy } from 'firebase/firestore'
import { db } from '../firebase'

// Razorpay mock - replace with real integration
const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY

/* --- INVOICES ----------- */
const invoicesRef = collection(db, 'invoices')

export const createInvoice = async (appointmentData) => {
  const invoiceData = {
    appointmentId: appointmentData.id,
    patientId: appointmentData.patientId || null,
    patientName: appointmentData.patientName,
    doctorName: appointmentData.doctorName,
    department: appointmentData.departmentName,
    date: appointmentData.date,
    time: appointmentData.time,
    appointmentFee: appointmentData.appointmentFee,
    packageFee: appointmentData.packageFee || 0,
    totalAmount: appointmentData.totalAmount,
    status: 'pending', // pending, paid, failed, refunded
    paymentMethod: null,
    razorpayPaymentId: null,
    createdAt: serverTimestamp(),
    tenantId: appointmentData.tenantId,
  }

  const invoiceRef = await addDoc(invoicesRef, invoiceData)
  return { id: invoiceRef.id, ...invoiceData }
}

export const getInvoices = async (filters = {}) => {
  const q = query(
    invoicesRef,
    orderBy('createdAt', 'desc')
  )
  
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}

export const getInvoiceByAppointmentId = async (appointmentId) => {
  const q = query(
    invoicesRef,
    where('appointmentId', '==', appointmentId),
    limit(1)
  )
  
  const snap = await getDocs(q)
  return snap.docs[0] ? { id: snap.docs[0].id, ...snap.docs[0].data() } : null
}

export const updatePaymentStatus = async (invoiceId, status, paymentDetails = {}) => {
  return updateDoc(doc(db, 'invoices', invoiceId), {
    status,
    paymentMethod: paymentDetails.method || 'razorpay',
    razorpayPaymentId: paymentDetails.paymentId,
    updatedAt: serverTimestamp(),
    ...paymentDetails
  })
}

/* --- RAZORPAY MOCK ----------- */
export const initiatePayment = async (amount, invoiceId) => {
  // Mock - replace with real Razorpay
  console.log(`Processing ₹${amount} payment for invoice ${invoiceId}`)
  
  // Simulate payment success/failure
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        paymentId: `mock_${Date.now()}`,
        amount: amount * 100, // paise
      })
    }, 2000)
  })
}

/* --- REVENUE ANALYTICS ----------- */
export const getRevenueStats = async () => {
  const invoices = await getInvoices()
  const paid = invoices.filter(i => i.status === 'paid')
  
  const totalRevenue = paid.reduce((sum, i) => sum + i.totalAmount, 0)
  const monthly = paid.filter(i => 
    new Date(i.createdAt?.toDate()).getMonth() === new Date().getMonth()
  )

  return {
    totalInvoices: invoices.length,
    paidInvoices: paid.length,
    totalRevenue,
    monthlyRevenue: monthly.reduce((sum, i) => sum + i.totalAmount, 0),
    pending: invoices.filter(i => i.status === 'pending').length,
  }
}

export default {
  createInvoice,
  getInvoices,
  getInvoiceByAppointmentId,
  updatePaymentStatus,
  initiatePayment,
  getRevenueStats,
}

