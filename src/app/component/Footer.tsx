import Link from "next/link";

export default function Footer() {
  return (
    <footer className="shadow bg-gray-100 p-2 text-gray-600">
      <div className="max-w-7xl mx-auto py-1 grid grid-cols-1 md:grid-cols-5 gap-8">
        
       
        <div className="md:col-span-1">
          <div className="flex items-center mb-4">
            <div className="bg-black text-white w-8 h-8 flex items-center justify-center font-bold mr-2">
              S
            </div>
            <span className="text-lg font-semibold text-gray-800">
              ShopMart
            </span>
          </div>
          <p className="text-sm mb-4">
            Your one-stop destination for the latest technology, fashion,
            and lifestyle products.
          </p>
          <ul className="text-sm space-y-2">
            <li>📍 123 Shop Street, October City</li>
            <li>📞 (+20) 01093333333</li>
            <li>✉️ support@shopmart.com</li>
          </ul>
        </div>

                <div>
          <h3 className="font-semibold text-gray-800 mb-4">SHOP</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="#">Electronics</Link></li>
            <li><Link href="#">Fashion</Link></li>
            <li><Link href="#">Home & Garden</Link></li>
            <li><Link href="#">Sports</Link></li>
            <li><Link href="#">Deals</Link></li>
          </ul>
        </div>

       
        <div>
          <h3 className="font-semibold text-gray-800 mb-4">
            CUSTOMER SERVICE
          </h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="#">Contact Us</Link></li>
            <li><Link href="#">Help Center</Link></li>
            <li><Link href="#">Track Your Order</Link></li>
            <li><Link href="#">Returns & Exchanges</Link></li>
            <li><Link href="#">Size Guide</Link></li>
          </ul>
        </div>

        
        <div>
          <h3 className="font-semibold text-gray-800 mb-4">ABOUT</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="#">About ShopMart</Link></li>
            <li><Link href="#">Careers</Link></li>
            <li><Link href="#">Press</Link></li>
            <li><Link href="#">Investor Relations</Link></li>
            <li><Link href="#">Sustainability</Link></li>
          </ul>
        </div>

    
        <div>
          <h3 className="font-semibold text-gray-800 mb-4">POLICIES</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="#">Privacy Policy</Link></li>
            <li><Link href="#">Terms of Service</Link></li>
            <li><Link href="#">Cookie Policy</Link></li>
            <li><Link href="#">Shipping Policy</Link></li>
            <li><Link href="#">Refund Policy</Link></li>
          </ul>
        </div>
      </div>

     
      <div className="border-t border-gray-200 text-center py-4 text-sm">
        © 2026 ShopMart. All rights reserved.
      </div>
    </footer>
  );
}