import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="bg-gray-50 text-gray-800 py-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 mb-10 text-sm container mx-auto px-5">
        {/* Logo and Description */}
        <div>
          <img
            src={assets.logo1}
            className="mb-5 w-32 rounded-full"
            alt="Logo"
          />
          <p className="w-full md:w-2/3 text-gray-600 leading-relaxed">
            تثقيف المجتمع من خلال تقديم ورش عمل وندوات لتعزيز المعرفة حول كيفية
            تقديم المساعدة بطرق فعالة.
          </p>
        </div>

        {/* Company Links */}
        <div>
          <p className="text-xl font-medium mb-5">Company</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>
              <a href="/" className="hover:text-gray-800">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-gray-800">
                About Us
              </a>
            </li>
            <li>
              <a href="/delivery" className="hover:text-gray-800">
                Delivery
              </a>
            </li>
            <li>
              <a href="/privacy-policy" className="hover:text-gray-800">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Information */}
        <div>
          <p className="text-xl font-medium mb-5">Get In Touch</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>
              <a href="tel:+201210758645" className="hover:text-gray-800">
                +20 121 075 8645
              </a>
            </li>
            <li>
              <a href="mailto:tdamon@gmail.com" className="hover:text-gray-800">
                tdamon@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-300">
        <p className="py-5 text-sm text-center">
          &copy; {new Date().getFullYear()} All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
