import { assets } from "../assets/assets";

const OurPolicy = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700">
      <div>
        <img
          src={assets.exchange_icon}
          alt="policyIcon"
          className="w-12 m-auto mb-5"
        />
        <p className="font-semibold">Our Policy</p>
        <p className="text-gray-400">
          كسر حاجز الإحراج لدى 5 البعض وتوفير فرصة وحق الاختيار للأشياء التي
          .يحتاجونها
        </p>
      </div>
      <div>
        <img
          src={assets.quality_icon}
          alt="policyIcon"
          className="w-12 m-auto mb-5"
        />
        <p className="font-semibold">Our Policy</p>
        <p className="text-gray-400">
          كسر حاجز الإحراج لدى 5 البعض وتوفير فرصة وحق الاختيار للأشياء التي
          .يحتاجونها
        </p>
      </div>
      <div>
        <img
          src={assets.support_img}
          alt="policyIcon"
          className="w-12 m-auto mb-5"
        />
        <p className="font-semibold">Our Policy</p>
        <p className="text-gray-400">
          كسر حاجز الإحراج لدى 5 البعض وتوفير فرصة وحق الاختيار للأشياء التي
          .يحتاجونها
        </p>
      </div>
    </div>
  );
};

export default OurPolicy;
