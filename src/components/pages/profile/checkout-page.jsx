"use client"

import { useState } from "react"
import { ArrowLeft, Package, User, Heart, Truck, MapPin } from "lucide-react"
// Menggunakan alias path jika sudah dikonfigurasi dan berfungsi dengan benar
import { Card, CardContent } from "../../ui/card.jsx" // Ganti ke path relatif jika alias belum berfungsi
import { Button } from "../../ui/button.jsx"  // Ganti ke path relatif jika alias belum berfungsi
// Komponen lokal Anda di dalam folder yang sama
import AddAddressModal from "./add-address-modal.jsx"
import PaymentMethods from "./payment-methods.jsx"
import OrderSummary from "./order-summary.jsx"
import PaymentReceipt from "./payment-receipt.jsx"

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState("shipping")
  const [isAddAddressModalOpen, setIsAddAddressModalOpen] = useState(false)
  const [addresses, setAddresses] = useState([
    {
      id: "1",
      label: "Sumbul Markambul",
      fullName: "Sumbul Markambul",
      phoneNumber: "08123456789",
      address: "Jalan Sudirman No.56, Jambung Kalon",
      city: "Surabaya",
      province: "Jawa Timur",
      postalCode: "22341",
      isDefault: true,
    },
  ])
  const [selectedAddressId, setSelectedAddressId] = useState("1")
  const [selectedShippingMethod, setSelectedShippingMethod] = useState("standard")
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState({ type: "qris" })
  const [orderId] = useState(`ORD-${Date.now()}`)

  const orderItems = [
    { id: "1", name: "Kemeja Casual Pria", price: 299000, quantity: 1 },
    { id: "2", name: "Celana Jeans Slim Fit", price: 450000, quantity: 1 },
    { id: "3", name: "Sepatu Sneakers", price: 650000, quantity: 1 },
  ]
  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shippingCost = selectedShippingMethod === "express" ? 25000 : 0
  const totalAmount = subtotal + shippingCost

  const handleAddAddress = (newAddressData) => {
    const newAddress = {
      id: Date.now().toString(),
      ...newAddressData,
    }
    if (newAddressData.isDefault) {
      setAddresses((prev) => prev.map((addr) => ({ ...addr, isDefault: false })))
      setSelectedAddressId(newAddress.id)
    }
    setAddresses((prev) => [...prev, newAddress])
  }

  const selectedAddress = addresses.find((addr) => addr.id === selectedAddressId)

  const getStepNumber = (step) => {
    switch (step) {
      case "shipping": return 1
      case "payment": return 2
      case "summary": return 3
      case "receipt": return 3
      default: return 1
    }
  }

  const isStepCompleted = (step) => {
    const stepNumber = getStepNumber(step)
    const currentStepNumber = getStepNumber(currentStep)
    return stepNumber < currentStepNumber
  }

  const isStepActive = (step) => {
    return step === currentStep || (step === "summary" && currentStep === "receipt")
  }

  return (
    <div className="flex min-h-screen bg-gray-50"> {/* Kontainer Utama Flex */}
      {/* 1. Sidebar */}
      <div className="w-64 bg-[#c4d68a] p-6 flex-shrink-0 space-y-8"> {/* Lebar tetap, warna, padding, cegah penyusutan */}
        {/* Logo */}
        <div>
          <div className="flex items-center gap-2">
            {/* Ganti dengan komponen logo Anda jika ada */}
            <div className="w-8 h-8 bg-amber-600 rounded-md flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-sm"></div>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-800">Style4U</h1>
              <p className="text-xs text-gray-600">THRIFTING</p>
            </div>
          </div>
        </div>

        {/* Navigasi Menu */}
        <nav className="space-y-4">
          <a href="#" className="flex items-center gap-3 text-gray-700 hover:text-gray-900 cursor-pointer p-2 rounded-lg hover:bg-white/30 transition-colors">
            <User className="w-5 h-5" />
            <span>Data Pribadi</span>
          </a>
          <a href="#" className="flex items-center gap-3 text-gray-900 font-medium cursor-pointer bg-white/50 rounded-lg p-2 transition-colors"> {/* Item aktif */}
            <Package className="w-5 h-5" />
            <span>Pesanan Anda</span>
          </a>
          <a href="#" className="flex items-center gap-3 text-gray-700 hover:text-gray-900 cursor-pointer p-2 rounded-lg hover:bg-white/30 transition-colors">
            <Heart className="w-5 h-5" />
            <span>Wishlist</span>
          </a>
        </nav>
      </div>

      {/* 2. Konten Utama */}
      <div className="flex-1 p-8 overflow-y-auto"> {/* Mengisi sisa ruang & bisa di-scroll */}
        {/* Header */}
        <div className="mb-8 flex items-center gap-3"> {/* Menggunakan flex untuk mensejajarkan tombol dan judul */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              if (currentStep === "payment") setCurrentStep("shipping")
              else if (currentStep === "summary") setCurrentStep("payment")
              else if (currentStep === "receipt") setCurrentStep("summary")
            }}
          >
            <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </Button>
          <h2 className="text-2xl font-bold text-gray-900">
            {currentStep === "receipt" ? "Pembayaran" : "Pesanan Anda"}
          </h2>
        </div>

        {/* Progress Steps - only show for non-receipt steps */}
        {currentStep !== "receipt" && (
          <div className="mb-8">
            <div className="flex items-center justify-between max-w-md">
              {/* Step 1 - Shipping */}
              <div className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    isStepCompleted("shipping")
                      ? "bg-green-500 text-white"
                      : isStepActive("shipping")
                        ? "bg-black text-white"
                        : "bg-gray-300 text-gray-600"
                  }`}
                >
                  1
                </div>
                <span
                  className={`ml-2 text-sm ${isStepActive("shipping") ? "font-medium text-gray-900" : "text-gray-600"}`}
                >
                  Pengiriman
                </span>
              </div>

              {/* Connector */}
              <div className={`flex-1 h-px mx-4 ${isStepCompleted("payment") || isStepActive("payment") || isStepActive("summary") ? "bg-green-500" : "bg-gray-300"}`}></div>

              {/* Step 2 - Payment */}
              <div className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    isStepCompleted("payment")
                      ? "bg-green-500 text-white"
                      : isStepActive("payment")
                        ? "bg-black text-white"
                        : "bg-gray-300 text-gray-600"
                  }`}
                >
                  2
                </div>
                <span
                  className={`ml-2 text-sm ${isStepActive("payment") ? "font-medium text-gray-900" : "text-gray-600"}`}
                >
                  Metode Pembayaran
                </span>
              </div>

              {/* Connector */}
              <div className={`flex-1 h-px mx-4 ${isStepCompleted("summary") || isStepActive("summary") ? "bg-green-500" : "bg-gray-300"}`}></div>

              {/* Step 3 - Summary */}
              <div className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    isStepCompleted("summary")
                      ? "bg-green-500 text-white"
                      : isStepActive("summary")
                        ? "bg-black text-white"
                        : "bg-gray-300 text-gray-600"
                  }`}
                >
                  3
                </div>
                <span
                  className={`ml-2 text-sm ${isStepActive("summary") ? "font-medium text-gray-900" : "text-gray-600"}`}
                >
                  Ringkasan
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Step Content */}
        {currentStep === "shipping" && (
          <div className="max-w-2xl space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Pilih Alamat Pengiriman</h3>
            <div className="space-y-3">
              {addresses.map((address) => (
                <Card
                  key={address.id}
                  className={`cursor-pointer transition-all ${
                    selectedAddressId === address.id
                      ? "ring-2 ring-[#c4d68a] border-[#c4d68a]"
                      : "hover:border-gray-300"
                  }`}
                  onClick={() => setSelectedAddressId(address.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold text-gray-900">{address.label}</h4>
                          {address.isDefault && (
                            <span className="px-2 py-1 bg-[#c4d68a] text-xs font-medium text-gray-800 rounded">
                              Utama
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{address.fullName}</p>
                        <p className="text-sm text-gray-600 mb-1">{address.phoneNumber}</p>
                        <p className="text-sm text-gray-600">
                          {address.address}, {address.city}, {address.province} {address.postalCode}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Button
              variant="outline"
              className="w-full border-dashed border-2 border-gray-300 hover:border-[#c4d68a] hover:bg-[#c4d68a]/10 text-gray-700 hover:text-gray-800"
              onClick={() => setIsAddAddressModalOpen(true)}
            >
              <MapPin className="w-4 h-4 mr-2" />
              Tambah alamat baru
            </Button>
            {selectedAddress && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Pilih Metode Pengiriman</h3>
                <div className="space-y-3">
                  <Card
                    className={`cursor-pointer transition-all ${
                      selectedShippingMethod === "standard"
                        ? "ring-2 ring-[#c4d68a] border-[#c4d68a] bg-[#c4d68a]/5"
                        : "hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedShippingMethod("standard")}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="border-2 border-gray-300 rounded-lg p-2 flex flex-col items-center min-w-[60px]">
                            <Truck className="w-5 h-5 text-gray-600 mb-1" />
                            <span className="text-xs font-medium text-gray-600 text-center leading-tight">
                              STANDARD
                            </span>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">Standard Shipping</h4>
                            <p className="text-sm text-gray-600">Estimasi 3-5 hari kerja</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">Gratis</p>
                          <p className="text-xs text-gray-500">Min. pembelian Rp 100.000</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card
                    className={`cursor-pointer transition-all ${
                      selectedShippingMethod === "express"
                        ? "ring-2 ring-[#c4d68a] border-[#c4d68a] bg-[#c4d68a]/5"
                        : "hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedShippingMethod("express")}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="border-2 border-gray-300 rounded-lg p-2 flex flex-col items-center min-w-[60px]">
                            <Truck className="w-5 h-5 text-orange-600 mb-1" />
                            <span className="text-xs font-medium text-orange-600 text-center leading-tight">
                              EXPRESS
                            </span>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">Express Shipping</h4>
                            <p className="text-sm text-gray-600">Estimasi 1-2 hari kerja</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">Rp 25.000</p>
                          <p className="text-xs text-gray-500">Pengiriman cepat</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
            <Button
              className="w-full bg-[#c4d68a] hover:bg-[#b5c77a] text-gray-800 font-medium"
              disabled={!selectedAddress}
              onClick={() => setCurrentStep("payment")}
            >
              Lanjutkan ke Metode Pembayaran
            </Button>
          </div>
        )}

        {currentStep === "payment" && <PaymentMethods onContinue={() => setCurrentStep("summary")} />}

        {currentStep === "summary" && selectedAddress && (
          <OrderSummary
            address={selectedAddress}
            shippingMethod={selectedShippingMethod}
            paymentMethod={selectedPaymentMethod}
            onProceedToPayment={() => setCurrentStep("receipt")}
          />
        )}

        {currentStep === "receipt" && (
          <PaymentReceipt
            paymentMethod={selectedPaymentMethod}
            totalAmount={totalAmount}
            orderId={orderId}
            onPaymentComplete={() => {
              console.log("Payment completed for order:", orderId)
            }}
          />
        )}
      </div>

      {/* Add Address Modal */}
      <AddAddressModal
        isOpen={isAddAddressModalOpen}
        onClose={() => setIsAddAddressModalOpen(false)}
        onAddAddress={handleAddAddress}
      />
    </div>
  )
}