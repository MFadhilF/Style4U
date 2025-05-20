import RightSidebar from "../components/layouts/rightsidebar.jsx";
import Wishlist from "../components/pages/profile/wishlist.jsx";

export default function Profile() {
  return (
    <>
      <RightSidebar />
      <main className="p-6"></main>
      <Wishlist />
    </>
  );
}
