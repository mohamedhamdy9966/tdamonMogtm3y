import { useContext, useMemo } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const BestSeller = () => {
  const { products } = useContext(ShopContext);

  const bestSeller = useMemo(() => {
    // Ensure products is an array before filtering
    if (!Array.isArray(products)) return [];
    return products.filter((item) => item.bestseller).slice(0, 5);
  }, [products]);

  return (
    <div className="my-10">
      <div className="text-center text-3xl py-8">
        <Title text1="Best" text2="Sellers" />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          نهدف من خلال تطبيقنا وحملتنا إلى تقديم الدعم للأفراد والعائلات في ظل
          الظروف الاقتصادية الصعبة التي نعيشها، من خلال توفير موارد فعّالة
          ومعلومات تساعد على تخفيف الأعباء وتعزيز روح التعاون والتكاتف، ليكون
          المجتمع يدًا واحدة في مواجهة التحديات
        </p>
      </div>
      {bestSeller.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
          {bestSeller.map((item) => (
            <ProductItem
              key={item._id}
              id={item._id}
              name={item.name}
              image={item.image?.[0] || "default-image.jpg"}
              price={item.price ?? "N/A"}
            />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-8">
          <p>No BestSellers Available</p>
        </div>
      )}
    </div>
  );
};

export default BestSeller;