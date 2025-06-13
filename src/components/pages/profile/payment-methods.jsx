"use client";

import { useState } from "react";
import { Card, CardContent } from "../../ui/card.jsx";
import { Button } from "../../ui/button.jsx";
import { Building2, ChevronRight } from "lucide-react";

export default function PaymentMethods({ onContinue, onPaymentMethodChange }) {
  const [selectedBank, setSelectedBank] = useState("");

  const banks = [
    { code: "bca", name: "Bank Central Asia (BCA)", account: "1234567890" },
    { code: "mandiri", name: "Bank Mandiri", account: "9876543210" },
    { code: "bni", name: "Bank Negara Indonesia (BNI)", account: "5555666677" },
    { code: "bri", name: "Bank Rakyat Indonesia (BRI)", account: "1111222233" },
  ];

  const handleContinue = () => {
    if (!selectedBank) {
      alert("Silakan pilih bank tujuan terlebih dahulu.");
      return;
    }
    // Kirim data bank yang dipilih ke parent
    if (onPaymentMethodChange) {
      onPaymentMethodChange({
        type: "bank_transfer",
        bank: selectedBank,
      });
    }
    onContinue();
  };

  return (
    <div className="max-w-2xl space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Metode Pembayaran</h3>

      {/* Bank Transfer Method */}
      <Card className="ring-2 ring-[#c4d68a] border-[#c4d68a] bg-[#c4d68a]/5">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Transfer Bank</h4>
                <p className="text-sm text-gray-600">
                  Transfer ke rekening toko dan upload bukti
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-green-600">Manual</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bank Selection */}
      <Card>
        <CardContent className="p-6">
          <h4 className="font-semibold text-gray-900 mb-4">
            Pilih Bank Tujuan Transfer
          </h4>
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
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-medium text-gray-900">{bank.name}</h5>
                      <p className="text-sm text-gray-600">
                        No. Rekening: {bank.account}
                      </p>
                      <p className="text-sm text-gray-600">
                        a.n. Style4U Store
                      </p>
                    </div>
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

      {/* Tombol Lanjutkan */}
      <Button
        className="w-full bg-[#c4d68a] hover:bg-[#b5c77a] text-gray-800 font-medium"
        disabled={!selectedBank}
        onClick={handleContinue}
      >
        Lanjutkan ke Ringkasan Pesanan
      </Button>
    </div>
  );
}
