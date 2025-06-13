import React from "react";
import RightSidebar from "../components/layouts/rightsidebar.jsx";
import PesananAndaPage from "../components/pages/profile/pesananandapage.jsx";

export default function ProfileOrders() {
  return (
    <div className="flex bg-gray-50 min-h-screen">
      <RightSidebar />
      <PesananAndaPage />
    </div>
  );
}
