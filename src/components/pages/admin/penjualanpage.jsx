import React, { useState, useEffect } from "react";
import apiClient from "../../../api/axios";
import { X } from "lucide-react";

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

const PenjualanPage = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchSales = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get("/api/admin/orders");
      setSales(response.data);
    } catch (err) {
      setError("Gagal mengambil riwayat penjualan.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSales();
  }, []);

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  // Fungsi untuk merender JSX dari modal
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
                  <DetailField label="Grade Produk" value={item.grade} />
                  <DetailField label="Kategori Produk" value={item.category} />
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
                    src={`${process.env.REACT_APP_IMAGE_BASE_URL}/uploads/${selectedOrder.items[0].image_url}`}
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
                      src={`${process.env.REACT_APP_IMAGE_BASE_URL}${selectedOrder.payment_proof_image}`}
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

  if (loading)
    return (
      <div className="ml-16 md:ml-56 p-6 text-center">
        Memuat riwayat penjualan...
      </div>
    );
  if (error)
    return (
      <div className="ml-16 md:ml-56 p-6 text-center text-red-500">{error}</div>
    );

  return (
    <div className="ml-16 md:ml-56 p-6">
      <h1 className="text-2xl font-bold mb-4 text-[#6e3f1c]">
        Riwayat Penjualan
      </h1>
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg border border-gray-200">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-[#6e3f1c] text-white text-center">
            <tr>
              <th className="py-3 px-4 font-semibold uppercase tracking-wider">
                Kode Pesanan
              </th>
              <th className="py-3 px-4 font-semibold uppercase tracking-wider">
                Nama Pembeli
              </th>
              <th className="py-3 px-4 font-semibold uppercase tracking-wider">
                Tanggal
              </th>
              <th className="py-3 px-4 font-semibold uppercase tracking-wider">
                Total
              </th>
              <th className="py-3 px-4 font-semibold uppercase tracking-wider">
                Detail
              </th>
              <th className="py-3 px-4 font-semibold uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sales.length > 0 ? (
              sales.map((sale) => (
                <tr
                  key={sale.id_order}
                  className="hover:bg-gray-50 text-center"
                >
                  <td className="py-3 px-4 text-gray-700 border border-[#B08968] font-mono text-xs">
                    {sale.order_code}
                  </td>
                  <td className="py-3 px-4 text-gray-700 border border-[#B08968]">
                    {sale.user_name}
                  </td>
                  <td className="py-3 px-4 text-gray-700 border border-[#B08968]">
                    {new Date(sale.order_date).toLocaleDateString("id-ID", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </td>
                  <td className="py-3 px-4 text-gray-700 border border-[#B08968]">
                    Rp {sale.total_amount.toLocaleString("id-ID")}
                  </td>
                  <td className="py-3 px-4 text-center border border-[#B08968]">
                    <button
                      onClick={() => handleViewDetails(sale)}
                      className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md shadow-sm hover:shadow-md transition-all"
                    >
                      {/* <Eye size={16} /> */} Selengkapnya
                    </button>
                  </td>
                  <td className="py-3 px-4 text-center border border-[#B08968]">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium text-white shadow-sm ${
                        sale.order_status === "shipped" ||
                        sale.order_status === "completed"
                          ? "bg-green-500"
                          : sale.order_status === "verifying_payment" ||
                            sale.order_status === "processing"
                          ? "bg-yellow-500"
                          : sale.order_status === "cancelled"
                          ? "bg-red-500"
                          : "bg-gray-500"
                      }`}
                    >
                      {sale.order_status.replace("_", " ")}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-10 text-gray-500">
                  Tidak ada data penjualan saat ini.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {renderOrderDetailModal()}
    </div>
  );
};

export default PenjualanPage;
