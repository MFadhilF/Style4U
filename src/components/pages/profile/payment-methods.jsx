"use client"

import { useState } from "react"
import { Card, CardContent } from "../../ui/card.jsx"
import { Button } from "../../ui/button.jsx"
import { Input } from "../../ui/input.jsx"
import { Label } from "../../ui/label.jsx"
import { QrCode, Building2, CreditCard, ChevronRight } from "lucide-react"

// interface PaymentMethodsProps removed

export default function PaymentMethods({ onContinue }) {
  const [selectedMethod, setSelectedMethod] = useState(null) // Removed type <"qris" | "va" | "credit" | null>
  const [selectedBank, setSelectedBank] = useState("")
  const [cardData, setCardData] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  })

  const banks = [
    { code: "bca", name: "Bank Central Asia (BCA)" },
    { code: "mandiri", name: "Bank Mandiri" },
    { code: "bni", name: "Bank Negara Indonesia (BNI)" },
    { code: "bri", name: "Bank Rakyat Indonesia (BRI)" },
    { code: "cimb", name: "CIMB Niaga" },
    { code: "permata", name: "Bank Permata" },
  ]

  const handleCardInputChange = (field, value) => { // Removed string types
    setCardData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const formatCardNumber = (value) => { // Removed string type
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(" ")
    } else {
      return v
    }
  }

  const formatExpiry = (value) => { // Removed string type
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4)
    }
    return v
  }

  return (
    <div className="max-w-2xl space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Pilih Metode Pembayaran</h3>

      <div className="space-y-4">
        {/* QRIS Payment */}
        <Card
          className={`cursor-pointer transition-all ${
            selectedMethod === "qris"
              ? "ring-2 ring-[#c4d68a] border-[#c4d68a] bg-[#c4d68a]/5"
              : "hover:border-gray-300"
          }`}
          onClick={() => setSelectedMethod("qris")}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <QrCode className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">QRIS</h4>
                  <p className="text-sm text-gray-600">Bayar dengan scan QR code</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-green-600">Instan</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Virtual Account */}
        <Card
          className={`cursor-pointer transition-all ${
            selectedMethod === "va" ? "ring-2 ring-[#c4d68a] border-[#c4d68a] bg-[#c4d68a]/5" : "hover:border-gray-300"
          }`}
          onClick={() => setSelectedMethod("va")}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Virtual Account</h4>
                  <p className="text-sm text-gray-600">Transfer bank dengan nomor VA</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-blue-600">24 Jam</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Credit Card */}
        <Card
          className={`cursor-pointer transition-all ${
            selectedMethod === "credit"
              ? "ring-2 ring-[#c4d68a] border-[#c4d68a] bg-[#c4d68a]/5"
              : "hover:border-gray-300"
          }`}
          onClick={() => setSelectedMethod("credit")}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Kartu Kredit/Debit</h4>
                  <p className="text-sm text-gray-600">Visa, Mastercard, JCB</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-purple-600">Instan</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Method Details */}
      {selectedMethod === "va" && (
        <Card>
          <CardContent className="p-6">
            <h4 className="font-semibold text-gray-900 mb-4">Pilih Bank untuk Virtual Account</h4>
            <div className="space-y-3">
              {banks.map((bank) => (
                <Card
                  key={bank.code}
                  className={`cursor-pointer transition-all ${
                    selectedBank === bank.code
                      ? "ring-2 ring-[#c4d68a] border-[#c4d68a] bg-[#c4d68a]/5"
                      : "hover:border-gray-300"
                  }`}
                  onClick={() => setSelectedBank(bank.code)}
                >
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900">{bank.name}</span>
                      {selectedBank === bank.code && (
                        <div className="w-4 h-4 bg-[#c4d68a] rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {selectedMethod === "credit" && (
        <Card>
          <CardContent className="p-6">
            <h4 className="font-semibold text-gray-900 mb-4">Informasi Kartu</h4>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cardNumber">Nomor Kartu</Label>
                <Input
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={cardData.number}
                  onChange={(e) => handleCardInputChange("number", formatCardNumber(e.target.value))}
                  maxLength={19}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cardName">Nama Pemegang Kartu</Label>
                <Input
                  id="cardName"
                  placeholder="Nama sesuai kartu"
                  value={cardData.name}
                  onChange={(e) => handleCardInputChange("name", e.target.value.toUpperCase())}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry">Tanggal Kadaluarsa</Label>
                  <Input
                    id="expiry"
                    placeholder="MM/YY"
                    value={cardData.expiry}
                    onChange={(e) => handleCardInputChange("expiry", formatExpiry(e.target.value))}
                    maxLength={5}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    placeholder="123"
                    value={cardData.cvv}
                    onChange={(e) => handleCardInputChange("cvv", e.target.value.replace(/\D/g, ""))}
                    maxLength={4}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {selectedMethod === "qris" && (
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <QrCode className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Pembayaran QRIS</h4>
              <p className="text-sm text-gray-600 mb-4">
                QR Code akan ditampilkan setelah Anda melanjutkan ke halaman pembayaran
              </p>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Cara pembayaran:</strong>
                  <br />
                  1. Buka aplikasi mobile banking atau e-wallet
                  <br />
                  2. Pilih menu scan QR atau QRIS
                  <br />
                  3. Scan QR code yang ditampilkan
                  <br />
                  4. Konfirmasi pembayaran
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Continue Button */}
      <Button
        className="w-full bg-[#c4d68a] hover:bg-[#b5c77a] text-gray-800 font-medium"
        disabled={
          !selectedMethod ||
          (selectedMethod === "va" && !selectedBank) ||
          (selectedMethod === "credit" && (!cardData.number || !cardData.name || !cardData.expiry || !cardData.cvv))
        }
        onClick={onContinue}
      >
        Lanjutkan ke Ringkasan Pesanan
      </Button>
    </div>
  )
}