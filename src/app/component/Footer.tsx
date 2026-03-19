import Link from "next/link";

export default function Footer() {
  return (
    <footer className="shadow bg-gray-100 dark:bg-black text-gray-600 dark:text-gray-300 transition-colors duration-300 p-2">
      <div className="max-w-7xl mx-auto py-1 grid grid-cols-1 md:grid-cols-5 gap-8">

        {/* Logo & Info */}
        <div className="md:col-span-1">
          <div className="flex items-center mb-4">
            <div className="bg-black text-white dark:bg-white dark:text-black w-8 h-8 flex items-center justify-center font-bold mr-2 transition-colors duration-300">
              S
            </div>
            <span className="text-lg font-semibold text-gray-800 dark:text-gray-100 transition-colors duration-300">
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

        {/* SHOP */}
        <div>
          <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-4 transition-colors duration-300">SHOP</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="#" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">Electronics</Link></li>
            <li><Link href="#" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">Fashion</Link></li>
            <li><Link href="#" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">Home & Garden</Link></li>
            <li><Link href="#" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">Sports</Link></li>
            <li><Link href="#" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">Deals</Link></li>
          </ul>
        </div>

        {/* CUSTOMER SERVICE */}
        <div>
          <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-4 transition-colors duration-300">
            CUSTOMER SERVICE
          </h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="#" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">Contact Us</Link></li>
            <li><Link href="#" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">Help Center</Link></li>
            <li><Link href="#" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">Track Your Order</Link></li>
            <li><Link href="#" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">Returns & Exchanges</Link></li>
            <li><Link href="#" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">Size Guide</Link></li>
          </ul>
        </div>

        {/* ABOUT */}
        <div>
          <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-4 transition-colors duration-300">ABOUT</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="#" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">About ShopMart</Link></li>
            <li><Link href="#" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">Careers</Link></li>
            <li><Link href="#" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">Press</Link></li>
            <li><Link href="#" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">Investor Relations</Link></li>
            <li><Link href="#" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">Sustainability</Link></li>
          </ul>
        </div>

        {/* POLICIES */}
        <div>
          <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-4 transition-colors duration-300">POLICIES</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="#" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">Privacy Policy</Link></li>
            <li><Link href="#" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">Terms of Service</Link></li>
            <li><Link href="#" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">Cookie Policy</Link></li>
            <li><Link href="#" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">Shipping Policy</Link></li>
            <li><Link href="#" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">Refund Policy</Link></li>
          </ul>
        </div>

      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-200 dark:border-gray-700 text-center py-4 text-sm transition-colors duration-300">
        © 2026 ShopMart. All rights reserved.
      </div>
    </footer>
  );
}