
import { getServerSession } from "next-auth";
import { authOption } from "../../auth";
import WishlistClient from "../component/WishlistClient/WishlistClient ";

export default async function WishlistPage() {
  const session = await getServerSession(authOption);

  if (!session?.accessToken)
    return <div>Please login first</div>;

  const res = await fetch(
    "https://ecommerce.routemisr.com/api/v1/wishlist",
    {
      headers: { token: session.accessToken },
      cache: "no-store",
    }
  );

  const data = await res.json();
  const wishlist = res.ok ? data.data : [];

  return <WishlistClient initialWishlist={wishlist} />;
}
