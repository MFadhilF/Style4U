"use client"

import { useState } from "react"
// Menggunakan alias path jika sudah dikonfigurasi
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../ui/dialog.jsx"
import { Button } from "../../ui/button.jsx"
import { Input } from "../../ui/input.jsx"
import { Label } from "../../ui/label.jsx"
import { Textarea } from "../../ui/textarea.jsx"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select.jsx"
import { Checkbox } from "../../ui/checkbox.jsx"

export default function AddAddressModal({ isOpen, onClose, onAddAddress }) {
  const [formData, setFormData] = useState({
    label: "",
    fullName: "",
    phoneNumber: "",
    address: "",
    city: "",
    province: "",
    postalCode: "",
    isDefault: false,
  })

  const provinces = [
    "DKI Jakarta", "Jawa Barat", "Jawa Tengah", "Jawa Timur", "Banten",
    "Yogyakarta", "Bali", "Sumatera Utara", "Sumatera Barat", "Sumatera Selatan",
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    onAddAddress(formData)
    setFormData({
      label: "", fullName: "", phoneNumber: "", address: "",
      city: "", province: "", postalCode: "", isDefault: false,
    })
    onClose()
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto"> {/* Pastikan tidak ada style di sini yang membuat overlay transparan */}
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Tambah Alamat Baru</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-4"> {/* Tambahkan pt-4 jika perlu jarak dari header */}
          {/* Address Label */}
          <div className="space-y-2">
            <Label htmlFor="label">Label Alamat</Label>
            <Input
              id="label"
              placeholder="Contoh: Rumah, Kantor, Kos"
              value={formData.label}
              onChange={(e) => handleInputChange("label", e.target.value)}
              required
            />
          </div>

          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="fullName">Nama Lengkap</Label>
            <Input
              id="fullName"
              placeholder="Masukkan nama lengkap"
              value={formData.fullName}
              onChange={(e) => handleInputChange("fullName", e.target.value)}
              required
            />
          </div>

          {/* Phone Number */}
          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Nomor Telepon</Label>
            <Input
              id="phoneNumber"
              type="tel" // Lebih baik menggunakan type="tel"
              placeholder="Contoh: 08123456789"
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
              required
            />
          </div>

          {/* Address */}
          <div className="space-y-2">
            <Label htmlFor="address">Alamat Lengkap</Label>
            <Textarea
              id="address"
              placeholder="Masukkan alamat lengkap (nama jalan, nomor rumah, RT/RW, kelurahan, kecamatan)"
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              rows={3}
              required
            />
          </div>

          {/* City */}
          <div className="space-y-2">
            <Label htmlFor="city">Kota/Kabupaten</Label>
            <Input
              id="city"
              placeholder="Contoh: Surabaya"
              value={formData.city}
              onChange={(e) => handleInputChange("city", e.target.value)}
              required
            />
          </div>

          {/* Province */}
          <div className="space-y-2">
            <Label htmlFor="province">Provinsi</Label>
            <Select value={formData.province} onValueChange={(value) => handleInputChange("province", value)} required>
              <SelectTrigger>
                <SelectValue placeholder="Pilih provinsi" />
              </SelectTrigger>
              <SelectContent>
                {provinces.map((province) => (
                  <SelectItem key={province} value={province}>
                    {province}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Postal Code */}
          <div className="space-y-2">
            <Label htmlFor="postalCode">Kode Pos</Label>
            <Input
              id="postalCode"
              placeholder="Contoh: 60123"
              value={formData.postalCode}
              onChange={(e) => handleInputChange("postalCode", e.target.value)}
              required
            />
          </div>

          {/* Default Address Checkbox */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="isDefault"
              checked={formData.isDefault}
              onCheckedChange={(checked) => handleInputChange("isDefault", Boolean(checked))} // Pastikan boolean
            />
            <Label htmlFor="isDefault" className="text-sm font-medium"> {/* Tambahkan font-medium jika mau */}
              Jadikan sebagai alamat utama
            </Label>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-6"> {/* justify-end untuk tombol ke kanan, pt-6 untuk jarak */}
            <Button type="button" variant="outline" onClick={onClose}>
              Batal
            </Button>
            <Button type="submit" className="bg-[#c4d68a] hover:bg-[#b5c77a] text-gray-800">
              Simpan Alamat
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}