import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";

const CartTotal = () => {
  const { currency = "$", delivery_fee = 0, getCartAmount } = useContext(ShopContext);

  // Ensure getCartAmount returns a valid number
  const cartAmount = typeof getCartAmount === "function" ? getCartAmount() : 0;
  const formattedCurrency = (amount) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency || "USD",
    }).format(amount);

  return (
    <div className="w-full">
      <div className="text-2xl">
        <Title text1={"Cart"} text2={"Total"} />
      </div>
      <div className="flex flex-col gap-2 mt-2 text-sm">
        {/* Subtotal */}
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>{formattedCurrency(cartAmount)}</p>
        </div>
        <hr />
        
        {/* Shipping Fee */}
        <div className="flex justify-between">
          <p>Shipping Fee</p>
          <p>{formattedCurrency(delivery_fee)}</p>
        </div>
        <hr />
        
        {/* Total */}
        <div className="flex justify-between text-lg font-bold">
          <b>Total</b>
          <p>
            {formattedCurrency(cartAmount === 0 ? 0 : cartAmount + delivery_fee)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
