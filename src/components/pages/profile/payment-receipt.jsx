import { useState } from "react";
import { Card, CardContent } from "../../ui/card";
import { Button } from "../../ui/button.jsx";
import { Badge } from "../../ui/badge.jsx";
import {
  Building2,
  Clock,
  AlertCircle,
  Copy,
  Check,
  Upload,
  ImageIcon,
} from "lucide-react";

export default function PaymentReceipt({
  paymentMethod,
  totalAmount,
  orderId,
  onPaymentComplete,
  transferProof,
  previewUrl,
  onFileUpload,
  onFileRemove,
}) {
  const [copied, setCopied] = useState(false);
  const [paymentStatus] = useState("pending"); // In real app, this would be managed by backend

  const banks = [
    { code: "bca", name: "Bank Central Asia (BCA)", account: "1234567890" },
    { code: "mandiri", name: "Bank Mandiri", account: "9876543210" },
    { code: "bni", name: "Bank Negara Indonesia (BNI)", account: "5555666677" },
    { code: "bri", name: "Bank Rakyat Indonesia (BRI)", account: "1111222233" },
  ];

  const selectedBank = banks.find((b) => b.code === paymentMethod.bank);

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // const handlePaymentComplete = async () => {
  //   if (!transferProof) {
  //     alert("Silakan upload bukti transfer terlebih dahulu.");
  //     return;
  //   }

  //   const token = localStorage.getItem("token"); // Ambil token
  //   const formData = new FormData();
  //   formData.append("transferProof", transferProof); // 'transferProof' harus sama dengan di backend

  //   try {
  //     const response = await axios.put(
  //       `http://localhost:3001/api/orders/${orderId}/payment`, // orderId didapat dari props
  //       formData,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     console.log("Upload berhasil:", response.data);
  //     alert(
  //       "Bukti pembayaran berhasil diupload! Pesanan Anda sedang diverifikasi."
  //     );
  //     if (onPaymentComplete) {
  //       onPaymentComplete();
  //     }
  //   } catch (error) {
  //     console.error("Gagal upload bukti pembayaran:", error);
  //     alert("Gagal mengupload bukti pembayaran. Silakan coba lagi.");
  //   }
  // };

  return (
    <div className="max-w-2xl space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Selesaikan Pembayaran Anda
        </h3>
        <p className="text-gray-600">Order ID: {orderId}</p>
      </div>

      {/* Payment Status */}
      <Card>
        <CardContent className="p-6 text-center">
          <div className="space-y-4">
            <AlertCircle className="w-16 h-16 text-yellow-500 mx-auto" />
            <div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">
                Menunggu Pembayaran
              </h4>
              <p className="text-gray-600">
                Silakan transfer ke rekening di bawah ini
              </p>
            </div>
            <div className="text-2xl font-bold text-[#c4d68a]">
              {formatCurrency(totalAmount)}
            </div>
            <Badge
              variant="secondary"
              className="bg-yellow-100 text-yellow-800"
            >
              Menunggu Transfer
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Bank Transfer Details */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Building2 className="w-6 h-6 text-green-600" />
              <h4 className="text-lg font-semibold text-gray-900">
                Transfer ke {selectedBank?.name}
              </h4>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg space-y-3">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Nomor Rekening</p>
                  <p className="text-xl font-mono font-bold text-gray-900">
                    {selectedBank?.account}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(selectedBank?.account || "")}
                  className="flex items-center gap-2"
                >
                  {copied ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                  {copied ? "Tersalin" : "Salin"}
                </Button>
              </div>

              <div>
                <p className="text-sm text-gray-600">Atas Nama</p>
                <p className="font-semibold text-gray-900">Style4U Store</p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Jumlah Transfer</p>
                <p className="font-semibold text-gray-900 text-lg">
                  {formatCurrency(totalAmount)}
                </p>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h5 className="font-semibold text-blue-900 mb-2">
                Cara Transfer:
              </h5>
              <ol className="text-sm text-blue-800 space-y-1">
                <li>1. Buka aplikasi mobile banking atau datang ke ATM</li>
                <li>2. Pilih menu Transfer ke Bank {selectedBank?.name}</li>
                <li>3. Masukkan nomor rekening: {selectedBank?.account}</li>
                <li>4. Masukkan jumlah: {formatCurrency(totalAmount)}</li>
                <li>5. Pastikan nama penerima: Style4U Store</li>
                <li>6. Konfirmasi dan selesaikan transfer</li>
                <li>7. Screenshot bukti transfer sudah diupload</li>
              </ol>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-yellow-600" />
                <span className="font-semibold text-yellow-900">
                  Status Pesanan
                </span>
              </div>
              <p className="text-sm text-yellow-800">
                ✅ Bukti transfer telah diupload
                <br />⏳ Menunggu verifikasi pembayaran (1x24 jam)
                <br />
                📦 Pesanan akan diproses setelah pembayaran dikonfirmasi
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upload Bukti Transfer */}
      <Card>
        <CardContent className="p-6">
          <h4 className="font-semibold text-gray-900 mb-4">
            Upload Bukti Transfer
          </h4>
          {!transferProof ? (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#c4d68a]">
              <input
                type="file"
                accept="image/*"
                onChange={onFileUpload}
                className="hidden"
                id="transfer-proof"
              />
              <label htmlFor="transfer-proof" className="cursor-pointer">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">Klik untuk upload</p>
                <p className="text-sm text-gray-500">
                  JPG, PNG, JPEG (Max 5MB)
                </p>
              </label>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <ImageIcon className="w-8 h-8 text-green-600" />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">
                    {transferProof.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    {(transferProof.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <Button variant="outline" size="sm" onClick={onFileRemove}>
                  Hapus
                </Button>
              </div>
              {previewUrl && (
                <div className="border rounded-lg p-4">
                  <p className="text-sm font-medium text-gray-900 mb-2">
                    Preview:
                  </p>
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="max-w-full h-auto max-h-64 rounded-lg"
                  />
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Important Notes */}
      <Card>
        <CardContent className="p-6">
          <h4 className="font-semibold text-gray-900 mb-3">Catatan Penting:</h4>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>
              • Transfer harus dilakukan dalam 24 jam, jika tidak pesanan akan
              dibatalkan
            </li>
            <li>• Pastikan jumlah transfer sesuai dengan total pembayaran</li>
            <li>
              • Bukti transfer akan diverifikasi dalam 1x24 jam pada hari kerja
            </li>
            <li>
              • Anda akan mendapat notifikasi email setelah pembayaran
              dikonfirmasi
            </li>
            <li>• Simpan Order ID untuk melacak status pesanan</li>
          </ul>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button
          className="w-full bg-[#c4d68a] hover:bg-[#b5c77a] text-gray-800 font-medium"
          onClick={onPaymentComplete} // Tombol ini sekarang memicu proses akhir
          disabled={!transferProof} // Tombol disable jika bukti transfer belum ada
        >
          Saya Sudah Selesai Membayar
        </Button>
        <Button variant="outline" className="w-full">
          Kembali ke Beranda
        </Button>
      </div>
    </div>
  );
}
