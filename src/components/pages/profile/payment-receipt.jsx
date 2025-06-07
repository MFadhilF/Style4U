"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "../../ui/card.jsx"
import { Button } from "../../ui/button.jsx"
import { Badge } from "../../ui/badge.jsx"
import { Copy, Check, QrCode, Building2, CreditCard, Clock, CheckCircle } from "lucide-react"

// Interfaces PaymentMethod, PaymentReceiptProps removed

export default function PaymentReceipt({
  paymentMethod,
  totalAmount,
  orderId,
  onPaymentComplete,
}) {
  const [copied, setCopied] = useState(false)
  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60) // 24 hours in seconds
  const [paymentStatus, setPaymentStatus] = useState("pending") // Removed <"pending" | "completed">

  // Generate dummy data based on payment method
  const generatePaymentData = () => {
    switch (paymentMethod.type) {
      case "qris":
        return {
          qrCodeUrl: "/placeholder.svg?height=200&width=200&text=QR+Code",
          instructions: [
            "Buka aplikasi mobile banking atau e-wallet Anda",
            "Pilih menu scan QR atau QRIS",
            "Scan QR code di atas",
            "Periksa detail pembayaran",
            "Konfirmasi pembayaran",
          ],
        }
      case "va":
        return {
          vaNumber: `8808${Math.random().toString().slice(2, 12)}`,
          bankName: paymentMethod.bank?.toUpperCase() || "BCA",
          instructions: [
            "Login ke mobile banking atau ATM",
            "Pilih menu Transfer",
            "Pilih ke Virtual Account",
            "Masukkan nomor Virtual Account",
            "Masukkan nominal pembayaran",
            "Konfirmasi transaksi",
          ],
        }
      case "credit":
        return {
          instructions: ["Memproses pembayaran...", "Mohon tunggu konfirmasi dari bank", "Jangan tutup halaman ini"],
        }
      default:
        return {}
    }
  }

  const paymentData = generatePaymentData()

  const formatCurrency = (amount) => { // Removed number type
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const formatTime = (seconds) => { // Removed number type
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const copyToClipboard = (text) => { // Removed string type
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Countdown timer for VA
  useEffect(() => {
    if (paymentMethod.type === "va" && timeLeft > 0 && paymentStatus === "pending") { // Added paymentStatus check
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [timeLeft, paymentMethod.type, paymentStatus])

  // Simulate credit card processing
  useEffect(() => {
    if (paymentMethod.type === "credit" && paymentStatus === "pending") { // Added paymentStatus check
      const timer = setTimeout(() => {
        setPaymentStatus("completed")
        // onPaymentComplete(); // Optionally call this if payment completion automatically triggers next step
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [paymentMethod.type, paymentStatus /*, onPaymentComplete */])

  return (
    <div className="max-w-2xl space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {paymentStatus === "completed" ? "Pembayaran Berhasil!" : "Menunggu Pembayaran"}
        </h3>
        <p className="text-gray-600">Order ID: {orderId}</p>
      </div>

      {/* Payment Status */}
      <Card>
        <CardContent className="p-6 text-center">
          {paymentStatus === "completed" ? (
            <div className="space-y-4">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
              <div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Pembayaran Berhasil!</h4>
                <p className="text-gray-600">Terima kasih atas pembelian Anda</p>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Lunas
              </Badge>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-2xl font-bold text-[#c4d68a]">{formatCurrency(totalAmount)}</div>
              <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                Menunggu Pembayaran
              </Badge>
            </div>
          )}
        </CardContent>
      </Card>

      {/* QRIS Payment */}
      {paymentMethod.type === "qris" && paymentStatus === "pending" && (
        <Card>
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-2 mb-4">
                <QrCode className="w-6 h-6 text-blue-600" />
                <h4 className="text-lg font-semibold text-gray-900">Scan QR Code</h4>
              </div>

              <div className="bg-white p-4 rounded-lg border-2 border-dashed border-gray-300 inline-block">
                <img src={paymentData.qrCodeUrl || "/placeholder.svg"} alt="QR Code" className="w-48 h-48 mx-auto" />
              </div>

              <div className="bg-blue-50 p-4 rounded-lg text-left">
                <h5 className="font-semibold text-blue-900 mb-2">Cara Pembayaran:</h5>
                <ol className="text-sm text-blue-800 space-y-1">
                  {paymentData.instructions?.map((instruction, index) => (
                    <li key={index}>
                      {index + 1}. {instruction}
                    </li>
                  ))}
                </ol>
              </div>

              <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>QR Code berlaku selama 15 menit</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Virtual Account Payment */}
      {paymentMethod.type === "va" && paymentStatus === "pending" && (
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Building2 className="w-6 h-6 text-green-600" />
                <h4 className="text-lg font-semibold text-gray-900">Virtual Account {paymentData.bankName}</h4>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Nomor Virtual Account</p>
                    <p className="text-xl font-mono font-bold text-gray-900">{paymentData.vaNumber}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(paymentData.vaNumber || "")}
                    className="flex items-center gap-2"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copied ? "Tersalin" : "Salin"}
                  </Button>
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h5 className="font-semibold text-green-900 mb-2">Cara Pembayaran:</h5>
                <ol className="text-sm text-green-800 space-y-1">
                  {paymentData.instructions?.map((instruction, index) => (
                    <li key={index}>
                      {index + 1}. {instruction}
                    </li>
                  ))}
                </ol>
              </div>

              {timeLeft > 0 ? (
                <div className="bg-red-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-5 h-5 text-red-600" />
                    <span className="font-semibold text-red-900">Batas Waktu Pembayaran</span>
                  </div>
                  <div className="text-2xl font-mono font-bold text-red-600">{formatTime(timeLeft)}</div>
                  <p className="text-sm text-red-700 mt-1">
                    Setelah batas waktu berakhir, pesanan akan dibatalkan otomatis
                  </p>
                </div>
              ) : (
                 <div className="bg-gray-100 p-4 rounded-lg text-center">
                    <p className="font-semibold text-gray-700">Waktu pembayaran telah habis.</p>
                    <p className="text-sm text-gray-600">Silakan buat pesanan baru.</p>
                 </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Credit Card Processing */}
      {paymentMethod.type === "credit" && ( // No paymentStatus check needed here as it transforms internally
        <Card>
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-2 mb-4">
                <CreditCard className="w-6 h-6 text-purple-600" />
                <h4 className="text-lg font-semibold text-gray-900">
                  {paymentStatus === "pending" ? "Memproses Pembayaran" : "Pembayaran Diproses"}
                </h4>
              </div>

              {paymentStatus === "pending" ? (
                <div className="space-y-4">
                  <div className="animate-spin w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full mx-auto"></div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <ul className="text-sm text-purple-800 space-y-1">
                      {paymentData.instructions?.map((instruction, index) => (
                        <li key={index}>• {instruction}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                // This state (completed credit card) will show the main "Pembayaran Berhasil" card above.
                // So, this specific block for "credit card completed" can be simpler or rely on the top-level status.
                // For clarity, if we reach here and status is "completed", it means it just finished.
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-green-800">
                    Pembayaran Anda sedang diproses. Anda akan melihat status "Pembayaran Berhasil" di atas setelah selesai.
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="space-y-3 pt-4">
        {paymentStatus === "completed" && (
          <Button
            className="w-full bg-[#c4d68a] hover:bg-[#b5c77a] text-gray-800 font-medium"
            onClick={onPaymentComplete}
          >
            Lihat Status Pesanan
          </Button>
        )}

        <Button variant="outline" className="w-full" onClick={() => { /* typically navigation: router.push('/') */ }}>
          Kembali ke Beranda
        </Button>
      </div>
    </div>
  )
}