import { useState, useEffect, Fragment } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Truck } from "lucide-react";
import axios from "axios";
import { Card, CardContent } from "../../ui/card.jsx";
import { Button } from "../../ui/button.jsx";
import AddAddressModal from "./addressmodal.jsx";
import PaymentMethods from "./payment-methods.jsx";
import OrderSummary from "./order-summary.jsx";
import PaymentReceipt from "./payment-receipt.jsx";
import RightSidebar from "../../layouts/rightsidebar.jsx";

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState("shipping");
  const [isAddAddressModalOpen, setIsAddAddressModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const [orderItems, setOrderItems] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [loadingAddresses, setLoadingAddresses] = useState(true);

  const [transferProof, setTransferProof] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [selectedShippingMethod, setSelectedShippingMethod] =
    useState("standard");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState({
    type: "qris",
  });

  const getUserId = () => localStorage.getItem("id_user");
  const getToken = () => localStorage.getItem("token");

  const fetchAddresses = async () => {
    const token = getToken();
    const id_user = getUserId();
    if (!token || !id_user) {
      navigate("/login");
      return;
    }
    try {
      setLoadingAddresses(true);
      const response = await axios.get(
        `http://localhost:3001/api/addresses/${id_user}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const mappedAddresses = response.data.map((addr) => ({
        id: addr.id_address,
        label: addr.label_alamat,
        fullName: addr.receiver_name || "Nama Penerima",
        phoneNumber: addr.phone_number || "No. Telepon",
        address: addr.alamat_lengkap,
        city: addr.kota,
        province: addr.provinsi,
        postalCode: addr.kode_pos,
        isDefault: addr.is_utama === 1,
      }));
      setAddresses(mappedAddresses);
      if (mappedAddresses.length > 0) {
        const defaultAddress = mappedAddresses.find((addr) => addr.isDefault);
        setSelectedAddressId(
          defaultAddress ? defaultAddress.id : mappedAddresses[0].id
        );
      }
    } catch (error) {
      console.error("Gagal mengambil data alamat:", error);
    } finally {
      setLoadingAddresses(false);
    }
  };

  useEffect(() => {
    if (
      !location.state?.checkoutItems ||
      location.state.checkoutItems.length === 0
    ) {
      console.warn("Tidak ada item untuk di-checkout. Mengarahkan kembali...");
      navigate("/profile/orders");
      return;
    }
    setOrderItems(location.state.checkoutItems);
    fetchAddresses();
  }, []);

  const handleAddAddress = async (newAddressData) => {
    const token = getToken();
    const id_user = getUserId();

    const payload = {
      label_alamat: newAddressData.label_alamat,
      alamat_lengkap: newAddressData.alamat_lengkap,
      provinsi: newAddressData.provinsi,
      kota: newAddressData.kota,
      kode_pos: newAddressData.kode_pos,
      is_utama: newAddressData.is_utama,
    };

    try {
      await axios.post(
        `http://localhost:3001/api/addresses/${id_user}`,
        payload, // Kirim payload yang sudah benar
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setIsAddAddressModalOpen(false);
      await fetchAddresses();
    } catch (error) {
      console.error("Gagal menambah alamat:", error);
      alert("Gagal menyimpan alamat baru. Silakan coba lagi.");
    }
  };

  const subtotal = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shippingCost = selectedShippingMethod === "express" ? 25000 : 0;
  const totalAmount = subtotal + shippingCost;
  const selectedAddress = addresses.find(
    (addr) => addr.id === selectedAddressId
  );

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Please upload an image file");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
        return;
      }
      setTransferProof(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const removeFile = () => {
    setTransferProof(null);
    setPreviewUrl("");
  };

  const stepConfig = {
    shipping: { number: 1, label: "Pengiriman" },
    payment: { number: 2, label: "Metode Pembayaran" },
    summary: { number: 3, label: "Ringkasan" },
    receipt: { number: 3, label: "Pembayaran" },
  };

  // --- FUNGSI HELPER YANG HILANG, DITAMBAHKAN KEMBALI ---
  const getStepNumber = (step) =>
    stepConfig[step] ? stepConfig[step].number : 1;

  const handleCreateOrder = async () => {
    const token = getToken();
    const orderId = `ORD-${Date.now()}`;
    const payload = {
      orderCode: orderId,
      id_address: selectedAddressId,
      subtotal: subtotal,
      shipping_cost: shippingCost,
      total_amount: totalAmount,
      shipping_method: selectedShippingMethod,
      payment_method: selectedPaymentMethod.type,
      payment_details: { bank_code: selectedPaymentMethod.bank },
      items: orderItems.map((item) => ({
        id_cart_item: item.id_cart_item,
        id_produk: item.id_produk,
        size:
          item.size ||
          (item.variant ? item.variant.split(" : ")[1] : undefined),
        quantity: item.quantity,
        price: item.price,
      })),
    };
    try {
      const response = await axios.post(
        "http://localhost:3001/api/orders",
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Gagal membuat pesanan:", error);
      alert(
        "Terjadi kesalahan saat membuat pesanan. Stok mungkin tidak cukup."
      );
      return null;
    }
  };

  const handleFinalConfirm = async () => {
    if (!transferProof) {
      alert("Silakan upload bukti transfer terlebih dahulu.");
      return;
    }
    const newOrder = await handleCreateOrder();
    if (!newOrder || !newOrder.orderCode) {
      return;
    }
    const token = getToken();
    const formData = new FormData();
    formData.append("transferProof", transferProof);
    try {
      await axios.put(
        `http://localhost:3001/api/orders/${newOrder.orderCode}/payment`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(
        "Bukti pembayaran berhasil diupload! Pesanan Anda sedang diverifikasi."
      );
      navigate("/profile/orders");
    } catch (error) {
      console.error(
        "Gagal upload bukti pembayaran setelah order dibuat:",
        error
      );
      alert(
        "Pesanan Anda telah dibuat, namun gagal mengupload bukti pembayaran. Anda bisa menguploadnya lagi di halaman 'Pesanan Anda'."
      );
      navigate("/profile/orders");
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case "shipping":
        return (
          <div className="max-w-2xl space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Pilih Alamat Pengiriman
            </h3>
            {loadingAddresses ? (
              <p>Memuat alamat...</p>
            ) : addresses.length > 0 ? (
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
                            <h4 className="font-semibold text-gray-900">
                              {address.label}
                            </h4>
                            {address.isDefault && (
                              <span className="px-2 py-1 bg-[#c4d68a] text-xs font-medium text-gray-800 rounded">
                                Utama
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mb-1">
                            {address.fullName}
                          </p>
                          <p className="text-sm text-gray-600 mb-1">
                            {address.phoneNumber}
                          </p>
                          <p className="text-sm text-gray-600">
                            {address.address}, {address.city},{" "}
                            {address.province} {address.postalCode}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">
                Anda belum memiliki alamat.
              </p>
            )}
            <Button
              variant="outline"
              className="w-full border-dashed border-2"
              onClick={() => setIsAddAddressModalOpen(true)}
            >
              <MapPin className="w-4 h-4 mr-2" /> Tambah alamat baru
            </Button>
            {selectedAddress && (
              <div className="space-y-4 pt-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Pilih Metode Pengiriman
                </h3>
                <div className="space-y-3">
                  <Card
                    className={`cursor-pointer transition-all ${
                      selectedShippingMethod === "standard"
                        ? "ring-2 ring-[#c4d68a] border-[#c4d68a] bg-[#c4d68a]/5"
                        : "hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedShippingMethod("standard")}
                  >
                    <CardContent className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Truck className="w-6 h-6 text-gray-600" />
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            Standard Shipping
                          </h4>
                          <p className="text-sm text-gray-600">
                            Estimasi 3-5 hari kerja
                          </p>
                        </div>
                      </div>
                      <p className="font-semibold text-gray-900">Gratis</p>
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
                    <CardContent className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Truck className="w-6 h-6 text-orange-600" />
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            Express Shipping
                          </h4>
                          <p className="text-sm text-gray-600">
                            Estimasi 1-2 hari kerja
                          </p>
                        </div>
                      </div>
                      <p className="font-semibold text-gray-900">Rp 25.000</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
            <Button
              className="w-full bg-[#c4d68a] hover:bg-[#b5c77a] text-gray-800 font-medium"
              disabled={!selectedAddress || loadingAddresses}
              onClick={() => setCurrentStep("payment")}
            >
              Lanjutkan ke Metode Pembayaran
            </Button>
          </div>
        );

      case "payment":
        return (
          <PaymentMethods
            onContinue={() => setCurrentStep("summary")}
            onPaymentMethodChange={setSelectedPaymentMethod}
          />
        );

      case "summary":
        if (!selectedAddress) {
          return (
            <div className="text-center p-8">
              <p className="text-red-600">Alamat belum dipilih.</p>
              <Button
                className="mt-4"
                onClick={() => setCurrentStep("shipping")}
              >
                Kembali ke Pengiriman
              </Button>
            </div>
          );
        }
        return (
          <OrderSummary
            address={selectedAddress}
            shippingMethod={selectedShippingMethod}
            paymentMethod={selectedPaymentMethod}
            onContinue={() => setCurrentStep("receipt")}
            orderItems={orderItems}
            shippingCost={shippingCost}
            subtotal={subtotal}
          />
        );

      case "receipt":
        return (
          <PaymentReceipt
            paymentMethod={selectedPaymentMethod}
            totalAmount={totalAmount}
            orderId={"(Akan dibuat setelah konfirmasi)"}
            transferProof={transferProof}
            previewUrl={previewUrl}
            onFileUpload={handleFileUpload}
            onFileRemove={removeFile}
            onPaymentComplete={handleFinalConfirm}
          />
        );

      default:
        return null;
    }
  };

  if (!orderItems.length) {
    return (
      <div className="flex min-h-screen bg-gray-50 justify-center items-center">
        Memuat Checkout...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <RightSidebar />
      <div className="flex-1 p-8 ml-64">
        <div className="mb-8">
          <Button
            variant="ghost"
            size="icon"
            className="mb-4"
            onClick={() => {
              if (currentStep === "payment") setCurrentStep("shipping");
              else if (currentStep === "summary") setCurrentStep("payment");
              else if (currentStep === "receipt") setCurrentStep("summary");
              else navigate(-1);
            }}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h2 className="text-2xl font-bold text-gray-900">
            {stepConfig[currentStep]?.label || "Checkout"}
          </h2>
        </div>

        {currentStep !== "receipt" && (
          <div className="mb-8">
            <div className="flex items-center justify-between max-w-md">
              {Object.entries(stepConfig)
                .filter(([key]) => key !== "receipt")
                .map(([key, { number, label }], index, arr) => (
                  <Fragment key={key}>
                    <div className="flex items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                          getStepNumber(currentStep) > number
                            ? "bg-green-500 text-white"
                            : currentStep === key
                            ? "bg-black text-white"
                            : "bg-gray-300 text-gray-600"
                        }`}
                      >
                        {number}
                      </div>
                      <span
                        className={`ml-2 text-sm ${
                          currentStep === key
                            ? "font-medium text-gray-900"
                            : "text-gray-600"
                        }`}
                      >
                        {label}
                      </span>
                    </div>
                    {index < arr.length - 1 && (
                      <div
                        className={`flex-1 h-px mx-4 ${
                          getStepNumber(currentStep) > number + 1
                            ? "bg-green-500"
                            : "bg-gray-300"
                        }`}
                      ></div>
                    )}
                  </Fragment>
                ))}
            </div>
          </div>
        )}

        {renderStepContent()}
      </div>
      <AddAddressModal
        isOpen={isAddAddressModalOpen}
        onClose={() => setIsAddAddressModalOpen(false)}
        onSave={handleAddAddress}
      />
    </div>
  );
}
