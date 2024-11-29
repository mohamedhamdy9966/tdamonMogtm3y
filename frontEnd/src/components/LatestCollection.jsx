import { useContext, useMemo } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);

  const latestProducts = useMemo(
    () =>
      products.slice(0, 10).map((item) => ({
        ...item,
        image: Array.isArray(item.image) ? item.image : ["default-image.jpg"],
      })),
    [products]
  );

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={"Latest"} text2={"Collection"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          حملة لمساعدة بعضنا البعض في ظل الظروف الاقتصادية التي نمر بها من خلال
          تطبيق تُعرض عليه سلع استهلاكية مثل الملابس وغيرها بمبالغ رمزية وبطرق
          مبتكرة ومستدامة. تعتمد الحملة على تطوير تطبيق يجمع السلع، سواء
          المستعملة بحالة جيدة أو الجديدة من المتبرعين والبرندات المصرية، ويتم
          عرضها للبيع بمبالغ رمزية على المنصة.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {latestProducts.map((item) => (
          <ProductItem
            key={item._id}
            id={item._id}
            image={item.image}
            name={item.name || "Unnamed Product"}
            price={item.price || "N/A"}
          />
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;
