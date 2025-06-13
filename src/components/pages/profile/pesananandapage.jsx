import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, Plus, Minus } from "lucide-react";
import { Badge } from "../../ui/badge";
import { Separator } from "../../ui/separator";

const getStatusDisplay = (status) => {
  switch (status) {
    case "pending_payment":
      return {
        text: "Menunggu Pembayaran",
        color: "bg-yellow-100 text-yellow-800",
      };
    case "verifying_payment":
      return {
        text: "Menunggu Verifikasi",
        color: "bg-blue-100 text-blue-800",
      };
    case "processing":
      return { text: "Diproses", color: "bg-purple-100 text-purple-800" };
    case "shipped":
      return { text: "Dikirim", color: "bg-green-100 text-green-800" };
    case "completed":
      return { text: "Selesai", color: "bg-gray-100 text-gray-800" };
    case "cancelled":
      return { text: "Dibatalkan", color: "bg-red-100 text-red-800" };
    default:
      return { text: status, color: "bg-gray-200 text-gray-900" };
  }
};

export default function PesananAndaPage() {
  const [cartItems, setCartItems] = useState([]);
  const [ongoingOrders, setOngoingOrders] = useState([]);
  const [historyOrders, setHistoryOrders] = useState([]);
  const [selectedItems, setSelectedItems] = useState(() => {
    const savedItems = localStorage.getItem("selectedCartItems");
    return savedItems ? new Set(JSON.parse(savedItems)) : null;
  });

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);

  // Fungsi untuk mengambil HANYA data keranjang
  const fetchCartData = async () => {
    try {
      const token = localStorage.getItem("token");
      const id_user = localStorage.getItem("id_user");
      const headers = { Authorization: `Bearer ${token}` };

      const cartResponse = await axios.get(`http://localhost:3001/api/cart`, {
        headers,
      });

      const transformedCartItems = cartResponse.data.map((item) => ({
        id: `${item.id_produk}-${item.size}`,
        id_cart_item: item.id_cart_item,
        id_produk: item.id_produk,
        size: item.size,
        name: item.name,
        variant: `Ukuran : ${item.size}`,
        price: item.price,
        quantity: item.qty,
        image: `http://localhost:3001/uploads/${item.image}`,
      }));

      setCartItems(transformedCartItems);

      // Inisialisasi item terpilih jika ini adalah pemuatan pertama
      if (selectedItems === null) {
        const allItemIds = transformedCartItems.map((item) => item.id);
        setSelectedItems(new Set(allItemIds));
      }
    } catch (error) {
      console.error("Gagal mengambil data keranjang:", error);
    }
  };

  // Fungsi untuk mengambil HANYA data pesanan
  const fetchOrdersData = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };
      const ordersResponse = await axios.get(
        "http://localhost:3001/api/orders",
        { headers }
      );

      const allOrders = ordersResponse.data;
      const ongoing = allOrders.filter(
        (o) => o.order_status !== "completed" && o.order_status !== "cancelled"
      );
      const history = allOrders.filter(
        (o) => o.order_status === "completed" || o.order_status === "cancelled"
      );

      setOngoingOrders(ongoing);
      setHistoryOrders(history);
    } catch (error) {
      console.error("Gagal mengambil data pesanan:", error);
    }
  };

  // useEffect utama untuk memuat semua data saat halaman pertama kali dibuka
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const loadInitialData = async () => {
      setLoading(true);
      await Promise.all([fetchCartData(), fetchOrdersData()]);
      setLoading(false);
    };

    loadInitialData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Dependensi kosong agar hanya berjalan sekali saat mount

  // useEffect untuk menyimpan item terpilih ke localStorage
  useEffect(() => {
    if (selectedItems !== null) {
      localStorage.setItem(
        "selectedCartItems",
        JSON.stringify(Array.from(selectedItems))
      );
    }
  }, [selectedItems]);

  const handleUpdateQuantity = async (item, newQuantity) => {
    try {
      const id_user = localStorage.getItem("id_user");
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:3001/api/cart/${id_user}/update`,
        { id_produk: item.id_produk, size: item.size, quantity: newQuantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Cukup panggil fetchCartData, tidak perlu semua data
      await fetchCartData();
    } catch (error) {
      console.error("Gagal update kuantitas:", error);
    }
  };

  const handleRemoveItem = async (id_produk, size) => {
    if (!window.confirm(`Hapus item ini (Ukuran: ${size}) dari keranjang?`))
      return;
    try {
      const id_user = localStorage.getItem("id_user");
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3001/api/cart/${id_user}/remove`, {
        headers: { Authorization: `Bearer ${token}` },
        data: { id_produk, size },
      });
      // Cukup panggil fetchCartData, tidak perlu semua data
      await fetchCartData();
    } catch (error) {
      console.error("Gagal menghapus item:", error);
    }
  };

  const handleSelectItem = (itemId) => {
    setSelectedItems((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(itemId)) newSelected.delete(itemId);
      else newSelected.add(itemId);
      return newSelected;
    });
  };

  const handleCheckout = () => {
    if (selectedItems.size === 0) {
      alert("Pilih setidaknya satu produk untuk di-checkout.");
      return;
    }
    const itemsToCheckout = cartItems.filter((item) =>
      selectedItems.has(item.id)
    );
    navigate("/checkout", { state: { checkoutItems: itemsToCheckout } });
  };

  const handleCancelOrder = async (orderId) => {
    if (
      !window.confirm(
        "Apakah Anda yakin ingin membatalkan pesanan ini? Stok akan dikembalikan."
      )
    ) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3001/api/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Pesanan berhasil dibatalkan.");
      // Muat ulang data pesanan untuk menampilkan status terbaru
      await fetchOrdersData();
    } catch (error) {
      console.error("Gagal membatalkan pesanan:", error);
      alert(error.response?.data?.message || "Gagal membatalkan pesanan.");
    }
  };

  if (loading) {
    return (
      <main className="flex-1 p-8 text-center">Memuat data pesanan...</main>
    );
  }

  return (
    <main className="flex-1 p-8 ml-[260px]">
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={() => navigate("/productlistpage")}
          className="p-2 hover:bg-gray-200 rounded-full"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold text-gray-800">Pesanan Anda</h1>
      </div>

      <div className="space-y-12">
        {/* BAGIAN 1: KERANJANG BELANJA */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            Keranjang Belanja
          </h2>
          <div className="grid grid-cols-12 gap-4 text-sm font-semibold text-gray-500 mb-4 px-4 uppercase">
            <div className="col-span-1"></div>
            <div className="col-span-5">Produk</div>
            <div className="col-span-2 text-center">Harga Barang</div>
            <div className="col-span-2 text-center">Jumlah</div>
            <div className="col-span-2 text-center">Subtotal</div>
          </div>
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-12 gap-4 items-center py-4 border-b"
              >
                <div className="col-span-1 flex justify-center">
                  <input
                    type="checkbox"
                    checked={selectedItems?.has(item.id)}
                    onChange={() => handleSelectItem(item.id)}
                    className="h-4 w-4 rounded border-gray-300 text-lime-600 focus:ring-lime-500"
                  />
                </div>
                <div className="col-span-5 flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md bg-gray-100"
                  />
                  <div>
                    <p className="font-semibold text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.variant}</p>
                  </div>
                </div>
                <div className="col-span-2 text-center text-sm text-gray-700">
                  {formatCurrency(item.price)}
                </div>
                <div className="col-span-2 flex items-center justify-center gap-3">
                  <button
                    onClick={() =>
                      item.quantity > 1
                        ? handleUpdateQuantity(item, item.quantity - 1)
                        : handleRemoveItem(item.id_produk, item.size)
                    }
                    className="p-1 rounded-full hover:bg-gray-200 transition-colors"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="font-semibold text-gray-800">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() =>
                      handleUpdateQuantity(item, item.quantity + 1)
                    }
                    className="p-1 rounded-full hover:bg-gray-200 transition-colors"
                  >
                    <Plus size={14} />
                  </button>
                </div>
                <div className="col-span-2 text-center text-sm font-semibold text-gray-800">
                  {formatCurrency(item.price * item.quantity)}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 py-8">
              Keranjang Anda kosong.
            </p>
          )}
          {cartItems.length > 0 && (
            <div className="flex justify-end mt-6">
              <button
                onClick={handleCheckout}
                className="bg-[#754C1F] text-white px-8 py-2.5 rounded-md font-semibold hover:bg-[#6a441a] transition-colors"
              >
                Checkout
              </button>
            </div>
          )}
        </div>

        {/* BAGIAN 2: PESANAN DIPROSES */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            Pesanan Diproses
          </h2>
          {ongoingOrders.length > 0 ? (
            <div className="space-y-6">
              {ongoingOrders.map((order) => (
                <div key={order.id_order} className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3 flex-wrap gap-2">
                    <div>
                      <h3 className="font-bold text-gray-900">
                        Order #{order.order_code}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {new Date(order.order_date).toLocaleDateString(
                          "id-ID",
                          { year: "numeric", month: "long", day: "numeric" }
                        )}
                      </p>
                    </div>
                    <Badge
                      className={`${
                        getStatusDisplay(order.order_status).color
                      } px-3 py-1`}
                    >
                      {getStatusDisplay(order.order_status).text}
                    </Badge>
                  </div>
                  <Separator />
                  <div className="mt-3 space-y-3">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex gap-4">
                        <img
                          src={`http://localhost:3001/uploads/${item.product_image}`}
                          alt={item.product_name}
                          className="w-16 h-16 object-cover rounded-md bg-gray-100"
                        />
                        <div>
                          <p className="font-semibold text-gray-800">
                            {item.product_name}
                          </p>
                          <p className="text-sm text-gray-500">
                            Ukuran: {item.size}
                          </p>
                          <p className="text-sm text-gray-500">
                            {item.quantity} x{" "}
                            {formatCurrency(item.price_at_purchase)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  {order.order_status === "pending_payment" && (
                    <div className="mt-4 pt-4 border-t flex justify-end">
                      <button
                        onClick={() => handleCancelOrder(order.id_order)}
                        className="bg-red-600 text-white text-xs font-bold py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
                      >
                        Batalkan Pesanan
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-8">
              Tidak ada pesanan yang sedang diproses.
            </p>
          )}
        </div>

        {/* BAGIAN 3: RIWAYAT PESANAN */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            Riwayat Pesanan
          </h2>
          {historyOrders.length > 0 ? (
            <div className="space-y-6">
              {historyOrders.map((order) => (
                <div
                  key={order.id_order}
                  className="border rounded-lg p-4 opacity-80"
                >
                  <div className="flex justify-between items-center mb-3 flex-wrap gap-2">
                    <div>
                      <h3 className="font-bold text-gray-900">
                        Order #{order.order_code}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {new Date(order.order_date).toLocaleDateString(
                          "id-ID",
                          { year: "numeric", month: "long", day: "numeric" }
                        )}
                      </p>
                    </div>
                    <Badge
                      className={`${
                        getStatusDisplay(order.order_status).color
                      } px-3 py-1`}
                    >
                      {getStatusDisplay(order.order_status).text}
                    </Badge>
                  </div>
                  <Separator />
                  <div className="mt-3 space-y-3">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex gap-4">
                        <img
                          src={`http://localhost:3001/uploads/${item.product_image}`}
                          alt={item.product_name}
                          className="w-16 h-16 object-cover rounded-md bg-gray-100"
                        />
                        <div>
                          <p className="font-semibold text-gray-800">
                            {item.product_name}
                          </p>
                          <p className="text-sm text-gray-500">
                            Ukuran: {item.size}
                          </p>
                          <p className="text-sm text-gray-500">
                            {item.quantity} x{" "}
                            {formatCurrency(item.price_at_purchase)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-8">
              Belum ada riwayat pesanan.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
