import React, { useState, useEffect } from "react";
import axios from "axios";
import { Eye, X } from "lucide-react";

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

const Dashboard = () => {
  const [latestOrders, setLatestOrders] = useState([]);
  const [stats, setStats] = useState({
    productCount: 0,
    orderCount: 0,
    monthlyRevenue: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const [statsRes, ordersRes] = await Promise.all([
          axios.get("http://localhost:3001/api/admin/dashboard/stats", config),
          axios.get("http://localhost:3001/api/admin/orders", config),
        ]);

        setStats(statsRes.data);
        setLatestOrders(ordersRes.data.slice(0, 5));
      } catch (err) {
        setError(
          "Gagal mengambil data dashboard. Pastikan server backend berjalan."
        );
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const renderOrderDetailModal = () => {
    if (!isModalOpen || !selectedOrder) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 overflow-y-auto">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl p-6 relative flex flex-col max-h-[90vh] my-auto">
          <div className="flex-shrink-0">
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
              {selectedOrder.items.map((item, index) => (
                <div
                  key={index}
                  className="border-t pt-4 mt-4 first:border-t-0 first:pt-0 first:mt-0"
                >
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
                    src={`http://localhost:3001/uploads/${selectedOrder.items[0].image_url}`}
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
                      src={`http://localhost:3001${selectedOrder.payment_proof_image}`}
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
          <div className="flex justify-end mt-8 flex-shrink-0">
            <button
              onClick={handleCloseModal}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-md"
            >
              Kembali
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="ml-16 md:ml-56 p-6">
      {/* Cards Statistik */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-[#f3d8bd] text-[#6e3f1c] rounded-lg p-4 shadow-md">
          <p className="text-sm">Penghasilan Bulan Ini</p>
          <h2 className="text-2xl font-semibold mt-2">
            {loading
              ? "..."
              : `Rp ${stats.monthlyRevenue.toLocaleString("id-ID")}`}
          </h2>
        </div>
        <div className="bg-[#a1673f] text-white rounded-lg p-4 shadow-md">
          <p className="text-sm">Total Pesanan</p>
          <h2 className="text-2xl font-semibold mt-2">
            {loading ? "..." : `${stats.orderCount} Pesanan`}
          </h2>
        </div>
        <div className="bg-[#f3d8bd] text-[#6e3f1c] rounded-lg p-4 shadow-md">
          <p className="text-sm">Jumlah Produk Tersedia</p>
          <h2 className="text-2xl font-semibold mt-2">
            {loading ? "..." : `${stats.productCount} Produk`}
          </h2>
        </div>
      </div>

      {/* Tabel Pesanan Terbaru */}
      <h2 className="text-xl font-bold mb-4 text-[#6e3f1c]">Pesanan Terbaru</h2>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full text-sm text-left border-collapse">
          <thead className="bg-[#6e3f1c] text-white text-center">
            <tr>
              <th className="py-2 px-4">Kode Pesanan</th>
              <th className="py-2 px-4">Nama Pembeli</th>
              <th className="py-2 px-4">Tanggal</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Detail</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center p-4">
                  Memuat pesanan...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="5" className="text-center p-4 text-red-500">
                  {error}
                </td>
              </tr>
            ) : latestOrders.length > 0 ? (
              latestOrders.map((order) => (
                <tr
                  key={order.id_order}
                  className="border-t text-center hover:bg-gray-50"
                >
                  <td className="py-2 px-4 border border-[#B08968] font-mono text-xs">
                    {order.order_code}
                  </td>
                  <td className="py-2 px-4 border border-[#B08968]">
                    {order.user_name}
                  </td>
                  <td className="py-2 px-4 border border-[#B08968]">
                    {new Date(order.order_date).toLocaleDateString("id-ID")}
                  </td>
                  <td className="py-2 px-4 border border-[#B08968]">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium text-white shadow-sm ${
                        order.order_status === "shipped" ||
                        order.order_status === "completed"
                          ? "bg-green-500"
                          : order.order_status === "verifying_payment" ||
                            order.order_status === "processing"
                          ? "bg-yellow-500"
                          : order.order_status === "cancelled"
                          ? "bg-red-500"
                          : "bg-gray-500"
                      }`}
                    >
                      {order.order_status.replace(/_/g, " ")}
                    </span>
                  </td>
                  <td className="py-2 px-4 border border-[#B08968] text-center">
                    <button
                      onClick={() => handleViewDetails(order)}
                      className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md"
                    >
                      {" "}
                      Selengkapnya
                      {/* <Eye size={16} /> */}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-4">
                  Tidak ada pesanan terbaru.
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

export default Dashboard;
