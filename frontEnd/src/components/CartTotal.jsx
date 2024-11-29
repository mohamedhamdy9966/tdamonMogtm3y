import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);

  return (
    <div className="w-full">
      <div className="text-2xl">
        <Title text1={"Cart"} text2={"Total"} />
      </div>
      <div className="flex flex-col gap-2 mt-2 text-sm">
        {/* Subtotal */}
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>{currency}{getCartAmount()}.00</p>
        </div>
        <hr />
        
        {/* Shipping Fee */}
        <div className="flex justify-between">
          <p>Shipping Fee</p>
          <p>{currency}{delivery_fee}</p>
        </div>
        <hr />
        
        {/* Total */}
        <div className="flex justify-between text-lg font-bold">
          <b>Total</b>
          <p>
            {currency} {getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee }
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
