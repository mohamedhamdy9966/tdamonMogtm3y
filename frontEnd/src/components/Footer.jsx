import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
          <img src={assets.logo1} className="mb-5 w-32 rounded-full" alt="logo" />
          <p className="w-full md:w-2/3 text-gray-600">
            تثقيف المجتمع من خلال 4 تقديم ورش عمل وندوات لتعزيز المعرفة حول
            كيفية تقديم المساعدة بطرق .فعالة
          </p>
        </div>
        <div>
            <p className="text-xl font-medium mb-5">Company</p>
            <ul className="flex flex-col gap-1 text-gray-600">
                <li>Home</li>
                <li>About Us</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>
            </ul>
        </div>
        <div>
            <p className="text-xl font-medium mb-5">Get In Touch</p>
            <ul className="flex flex-col gap-1 text-gray-600">
                <li>+201210758645</li>
                <li>tdamon@gmail.com</li>
            </ul>
        </div>
      </div>
      <div>
        <hr/>
        <p className="py-5 text-sm text-center">copyright 2024</p>
      </div>
    </div>
  );
};

export default Footer;
