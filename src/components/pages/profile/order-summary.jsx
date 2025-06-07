"use client"

import { Card, CardContent } from "../../ui/card.jsx"
import { Button } from "../../ui/button.jsx"
import { Separator } from "../../ui/separator.jsx"
import { MapPin, Truck, CreditCard, QrCode, Building2 } from "lucide-react"

// Interfaces OrderItem, Address, PaymentMethod, OrderSummaryProps removed

export default function OrderSummary({
  address,
  shippingMethod,
  paymentMethod,
  onProceedToPayment,
}) {
  // Dummy order items
  const orderItems = [ // Removed OrderItem[] type
    {
      id: "1",
      name: "Kemeja Casual Pria",
      image: "/placeholder.svg?height=80&width=80",
      price: 299000,
      quantity: 1,
      variant: "Biru, Size L",
    },
    {
      id: "2",
      name: "Celana Jeans Slim Fit",
      image: "/placeholder.svg?height=80&width=80",
      price: 450000,
      quantity: 1,
      variant: "Hitam, Size 32",
    },
    {
      id: "3",
      name: "Sepatu Sneakers",
      image: "/placeholder.svg?height=80&width=80",
      price: 650000,
      quantity: 1,
      variant: "Putih, Size 42",
    },
  ]

  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shippingCost = shippingMethod === "express" ? 25000 : 0
  const total = subtotal + shippingCost

  const formatCurrency = (amount) => { // Removed number type
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const getPaymentMethodDisplay = () => {
    switch (paymentMethod.type) {
      case "qris":
        return {
          icon: <QrCode className="w-5 h-5 text-blue-600" />,
          name: "QRIS",
          detail: "Pembayaran dengan QR Code",
        }
      case "va":
        return {
          icon: <Building2 className="w-5 h-5 text-green-600" />,
          name: "Virtual Account",
          detail: paymentMethod.bank ? `Bank ${paymentMethod.bank.toUpperCase()}` : "Bank Transfer",
        }
      case "credit":
        return {
          icon: <CreditCard className="w-5 h-5 text-purple-600" />,
          name: "Kartu Kredit/Debit",
          detail: paymentMethod.cardLast4 ? `****${paymentMethod.cardLast4}` : "Kartu Kredit",
        }
      default:
        return {
          icon: <CreditCard className="w-5 h-5" />,
          name: "Metode Pembayaran",
          detail: "",
        }
    }
  }

  const paymentDisplay = getPaymentMethodDisplay()

  return (
    <div className="max-w-2xl space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Ringkasan Pesanan</h3>

      {/* Order Items */}
      <Card>
        <CardContent className="p-6">
          <h4 className="font-semibold text-gray-900 mb-4">Pesanan Anda ({orderItems.length} item)</h4>
          <div className="space-y-4">
            {orderItems.map((item) => (
              <div key={item.id} className="flex gap-4">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg bg-gray-100"
                />
                <div className="flex-1">
                  <h5 className="font-medium text-gray-900">{item.name}</h5>
                  {item.variant && <p className="text-sm text-gray-600">{item.variant}</p>}
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-gray-600">Qty: {item.quantity}</span>
                    <span className="font-semibold text-gray-900">{formatCurrency(item.price)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Address */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-gray-600 mt-1" />
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 mb-2">Alamat Pengiriman</h4>
              <div className="text-sm text-gray-600">
                <p className="font-medium text-gray-900">{address.fullName}</p>
                <p>{address.phoneNumber}</p>
                <p>{address.address}</p>
                <p>
                  {address.city}, {address.province} {address.postalCode}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Shipping Method */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <Truck className="w-5 h-5 text-gray-600 mt-1" />
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 mb-2">Metode Pengiriman</h4>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-900">
                    {shippingMethod === "standard" ? "Standard Shipping" : "Express Shipping"}
                  </p>
                  <p className="text-sm text-gray-600">
                    {shippingMethod === "standard" ? "Estimasi 3-5 hari kerja" : "Estimasi 1-2 hari kerja"}
                  </p>
                </div>
                <span className="font-semibold text-gray-900">
                  {shippingMethod === "standard" ? "Gratis" : formatCurrency(25000)}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Method */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            {paymentDisplay.icon}
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 mb-2">Metode Pembayaran</h4>
              <div>
                <p className="font-medium text-gray-900">{paymentDisplay.name}</p>
                <p className="text-sm text-gray-600">{paymentDisplay.detail}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Order Total */}
      <Card>
        <CardContent className="p-6">
          <h4 className="font-semibold text-gray-900 mb-4">Rincian Pembayaran</h4>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal ({orderItems.length} item)</span>
              <span className="text-gray-900">{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Ongkos Kirim</span>
              <span className="text-gray-900">{shippingCost === 0 ? "Gratis" : formatCurrency(shippingCost)}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span className="text-[#c4d68a]">{formatCurrency(total)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Proceed Button */}
      <Button
        className="w-full bg-[#c4d68a] hover:bg-[#b5c77a] text-gray-800 font-medium py-3"
        onClick={onProceedToPayment}
      >
        Bayar Sekarang - {formatCurrency(total)}
      </Button>
    </div>
  )
}