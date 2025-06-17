import { Card, CardContent } from "../../ui/card.jsx";
import { Button } from "../../ui/button.jsx";
import { Separator } from "../../ui/separator.jsx";
import { MapPin, Truck, Building2 } from "lucide-react";

export default function OrderSummary({
  address,
  shippingMethod,
  paymentMethod,
  onContinue,
  orderItems = [],
  subtotal = 0,
  shippingCost = 0,
}) {
  const total = subtotal + shippingCost;
  const formatCurrency = (amount) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);

  const getPaymentMethodDisplay = () => {
    const banks = [
      { code: "bca", name: "Bank Central Asia (BCA)", account: "1234567890" },
      { code: "mandiri", name: "Bank Mandiri", account: "9876543210" },
      {
        code: "bni",
        name: "Bank Negara Indonesia (BNI)",
        account: "5555666677",
      },
      {
        code: "bri",
        name: "Bank Rakyat Indonesia (BRI)",
        account: "1111222233",
      },
    ];
    const selectedBankInfo = banks.find((b) => b.code === paymentMethod.bank);
    return {
      icon: <Building2 className="w-5 h-5 text-green-600" />,
      name: "Transfer Bank",
      detail: selectedBankInfo
        ? `${selectedBankInfo.name} - ${selectedBankInfo.account}`
        : "Transfer Manual",
    };
  };

  const paymentDisplay = getPaymentMethodDisplay();

  return (
    <div className="max-w-2xl space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Ringkasan Pesanan</h3>

      {/* Order Items */}
      <Card>
        <CardContent className="p-6">
          <h4 className="font-semibold text-gray-900 mb-4">
            Pesanan Anda ({orderItems.length} item)
          </h4>
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
                  {/* Gunakan 'item.size' jika ada, atau 'item.variant' */}
                  {(item.variant || item.size) && (
                    <p className="text-sm text-gray-600">
                      {item.variant || `Ukuran: ${item.size}`}
                    </p>
                  )}
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-gray-600">
                      Qty: {item.quantity}
                    </span>
                    <span className="font-semibold text-gray-900">
                      {formatCurrency(item.price)}
                    </span>
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
              <h4 className="font-semibold text-gray-900 mb-2">
                Alamat Pengiriman
              </h4>
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
              <h4 className="font-semibold text-gray-900 mb-2">
                Metode Pengiriman
              </h4>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-900">
                    {shippingMethod === "standard"
                      ? "Standard Shipping"
                      : "Express Shipping"}
                  </p>
                  <p className="text-sm text-gray-600">
                    {shippingMethod === "standard"
                      ? "Estimasi 3-5 hari kerja"
                      : "Estimasi 1-2 hari kerja"}
                  </p>
                </div>
                <span className="font-semibold text-gray-900">
                  {shippingMethod === "standard"
                    ? "Gratis"
                    : formatCurrency(25000)}
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
              <h4 className="font-semibold text-gray-900 mb-2">
                Metode Pembayaran
              </h4>
              <div>
                <p className="font-medium text-gray-900">
                  {paymentDisplay.name}
                </p>
                <p className="text-sm text-gray-600">{paymentDisplay.detail}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Order Total */}
      <Card>
        <CardContent className="p-6">
          <h4 className="font-semibold text-gray-900 mb-4">
            Rincian Pembayaran
          </h4>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">
                Subtotal ({orderItems.length} item)
              </span>
              <span className="text-gray-900">{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Ongkos Kirim</span>
              <span className="text-gray-900">
                {shippingCost === 0 ? "Gratis" : formatCurrency(shippingCost)}
              </span>
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
        onClick={onContinue}
      >
        Lanjutkan ke Pembayaran
      </Button>
    </div>
  );
}
