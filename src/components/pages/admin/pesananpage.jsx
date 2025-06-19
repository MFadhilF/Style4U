import React, { useState, useEffect } from "react";
import apiClient from "../../../api/axios";
import { Check, X, Eye } from "lucide-react";

// Helper components untuk merapikan tampilan modal
const DetailField = ({ label, value }) => (
  <div>
    <label className="text-sm font-medium text-gray-600">{label}</label>
    <div className="w-full p-2 mt-1 bg-gray-100 border border-gray-300 rounded-md text-gray-800">
      {value || "-"}
    </div>
  </div>
);

const DetailTextarea = ({ label, value }) => (
  <div>
    <label className="text-sm font-medium text-gray-600">{label}</label>
    <div className="w-full p-2 mt-1 bg-gray-100 border border-gray-300 rounded-md text-gray-800 whitespace-pre-wrap min-h-[100px]">
      {value || "-"}
    </div>
  </div>
);

const PesananPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get("/api/admin/orders/pending");

      const transformedOrders = response.data.map((order) => {
        const formattedPaymentProof = order.payment_proof_image
          ? `${process.env.REACT_APP_API_BASE_URL}${order.payment_proof_image}`
          : null;

        const formattedItems = order.items.map((item) => ({
          ...item,
          image_url: item.image_url
            ? `${process.env.REACT_APP_API_BASE_URL}${item.image_url}`
            : null,
        }));

        return {
          ...order,
          items: formattedItems,
          payment_proof_image: formattedPaymentProof,
        };
      });

      setOrders(transformedOrders);
    } catch (err) {
      setError("Gagal mengambil data pesanan. Pastikan Anda adalah Admin.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const handleUpdateStatus = async (orderId, status) => {
    const statusText = status === "shipped" ? "dikirim" : "dibatalkan";
    if (
      !window.confirm(
        `Anda yakin ingin mengubah status pesanan ini menjadi "${statusText}"?`
      )
    ) {
      return;
    }
    try {
      await apiClient.put(`/api/admin/orders/${orderId}/status`, { status });
      alert(`Status pesanan berhasil diubah!`);
      fetchOrders();
    } catch (err) {
      alert("Gagal mengubah status pesanan.");
      console.error(err);
    }
  };

  const renderOrderDetailModal = () => {
    if (!isModalOpen || !selectedOrder) return null;

    const firstItem = selectedOrder.items[0];

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 overflow-y-auto">
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 overflow-y-auto">
          {/* Kartu Modal: Di sini perubahan utamanya */}
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl p-6 relative flex flex-col max-h-[90vh] my-auto">
            {" "}
            {/* Header Modal */}
            <div className="flex-shrink-0">
              {" "}
              {/* TAMBAHKAN: Wrapper untuk header */}
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
              >
                <X size={24} />
              </button>
              <h2 className="text-2xl font-bold mb-6 text-[#6e3f1c]">
                Detail Pesanan - {selectedOrder.order_code}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 overflow-y-auto pr-3">
              {" "}
              {/* Kolom Kiri */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">
                  Informasi Pembeli
                </h3>
                <DetailField
                  label="Nama Pembeli"
                  value={selectedOrder.user_name}
                />
                <DetailField
                  label="Email Pembeli"
                  value={selectedOrder.user_email}
                />
                <DetailTextarea
                  label="Alamat Pengiriman"
                  value={`${selectedOrder.alamat_lengkap}, ${selectedOrder.kota}, ${selectedOrder.provinsi} ${selectedOrder.kode_pos}`}
                />

                <h3 className="text-lg font-semibold border-b pb-2 pt-4">
                  Informasi Produk
                </h3>
                {/* Menggunakan map untuk menampilkan semua item jika ada lebih dari satu */}
                {selectedOrder.items.map((item, index) => (
                  <div key={index} className="border-t pt-4 mt-4">
                    <DetailField
                      label={`Nama Produk ${
                        selectedOrder.items.length > 1 ? `(${index + 1})` : ""
                      }`}
                      value={item.product_name}
                    />
                    <DetailField
                      label="Harga Produk"
                      value={`Rp ${item.price.toLocaleString("id-ID")}`}
                    />
                    <DetailField label="Ukuran Produk" value={item.size} />
                    <DetailField label="Grade Produk" value={item.grade} />
                    <DetailField
                      label="Kategori Produk"
                      value={item.category}
                    />
                    <DetailTextarea
                      label="Deskripsi Produk"
                      value={item.description}
                    />
                  </div>
                ))}
              </div>
              {/* Kolom Kanan */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">
                  Gambar & Bukti Pembayaran
                </h3>
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Gambar Produk
                  </label>
                  <div className="mt-1 p-2 border rounded-md flex justify-center bg-gray-50">
                    <img
                      src={selectedOrder.items[0].image_url}
                      alt={selectedOrder.items[0].product_name}
                      className="max-h-60 rounded"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Bukti Pembayaran
                  </label>
                  <div className="mt-1 p-2 border rounded-md flex justify-center bg-gray-50">
                    {selectedOrder.payment_proof_image ? (
                      <img
                        src={selectedOrder.payment_proof_image}
                        alt="Bukti Pembayaran"
                        className="max-h-60 rounded"
                      />
                    ) : (
                      <p className="text-gray-500 p-8">
                        Belum ada bukti pembayaran.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* Footer Modal */}
            <div className="flex justify-end mt-8 flex-shrink-0">
              {" "}
              {/* TAMBAHKAN: Wrapper untuk footer */}
              <button
                onClick={handleCloseModal}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-md"
              >
                Kembali
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render komponen utama
  if (loading)
    return (
      <div className="ml-16 md:ml-56 p-6 text-center">
        Memuat data pesanan...
      </div>
    );
  if (error)
    return (
      <div className="ml-16 md:ml-56 p-6 text-center text-red-500">{error}</div>
    );

  return (
    <div className="ml-16 md:ml-56 p-6">
      <h1 className="text-2xl font-bold mb-4 text-[#6e3f1c]">
        Manajemen Pesanan
      </h1>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full text-sm text-left border border-[#B08968] border-collapse">
          <thead className="bg-[#6e3f1c] text-white text-center divide-x divide-gray-400">
            <tr>
              <th className="py-3 px-4">Kode Pesanan</th>
              <th className="py-3 px-4">Nama Pembeli</th>
              <th className="py-3 px-4">Tanggal</th>
              <th className="py-3 px-4">Total</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr
                  key={order.id_order}
                  className="text-center hover:bg-gray-50"
                >
                  <td className="py-2 px-4 border border-[#B08968] font-mono text-xs">
                    {order.order_code}
                  </td>
                  <td className="py-2 px-4 border border-[#B08968]">
                    {order.user_name}
                  </td>
                  <td className="py-2 px-4 border border-[#B08968]">
                    {new Date(order.order_date).toLocaleDateString("id-ID", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </td>
                  <td className="py-2 px-4 border border-[#B08968]">
                    Rp {order.total_amount.toLocaleString("id-ID")}
                  </td>
                  <td className="py-2 px-4 border border-[#B08968]">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium text-white ${
                        order.order_status === "shipped"
                          ? "bg-green-500"
                          : order.order_status === "verifying_payment"
                          ? "bg-yellow-500"
                          : order.order_status === "cancelled"
                          ? "bg-red-500"
                          : "bg-gray-500"
                      }`}
                    >
                      {order.order_status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="py-2 px-4 flex gap-2 justify-center border border-[#B08968]">
                    <button
                      onClick={() => handleViewDetails(order)}
                      className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
                      title="Lihat Detail"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={() =>
                        handleUpdateStatus(order.id_order, "shipped")
                      }
                      className="bg-green-500 hover:bg-green-600 text-white p-2 rounded"
                      title="Setujui & Kirim"
                    >
                      <Check size={16} />
                    </button>
                    <button
                      onClick={() =>
                        handleUpdateStatus(order.id_order, "cancelled")
                      }
                      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded"
                      title="Tolak Pesanan"
                    >
                      <X size={16} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-8 text-gray-500">
                  Belum ada pesanan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Panggil fungsi untuk merender modal */}
      {renderOrderDetailModal()}
    </div>
  );
};

export default PesananPage;
