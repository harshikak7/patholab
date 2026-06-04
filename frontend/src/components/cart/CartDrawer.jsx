import { X, Trash2 } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
const CartDrawer = ({ open, setOpen }) => {

  const {
    cartItems,
    removeFromCart,
  } = useCart();

  const total =
    cartItems.reduce(
      (sum, item) =>
        sum + item.price,
      0
    );

    const navigate=useNavigate()
  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/40 z-99">

          <div className="absolute right-0 top-0 h-full w-105 bg-white shadow-2xl p-6 overflow-y-auto">

            {/* HEADER */}

            <div className="flex items-center justify-between">

              <h2 className="text-2xl font-bold">
                Cart ({cartItems.length})
              </h2>

              <button
                onClick={() =>
                  setOpen(false)
                }
              >
                <X size={24} />
              </button>

            </div>

            {/* ITEMS */}

            <div className="mt-8 space-y-4">

              {cartItems.map(
                (item) => (
                  <div
  key={item._id}
  className="bg-gray-50 rounded-3xl p-5 flex justify-between items-start"
>
  <div>
    <h3 className="font-semibold text-lg">
      {item.testName}
    </h3>

    {/* <p className="text-sm text-gray-500 mt-1">
      Reports in {item.reportTime}
    </p> */}

    <p className="text-blue-600 font-semibold mt-3">
      ₹{item.price}
    </p>
  </div>

  <button
    onClick={() =>
      removeFromCart(item._id)
    }
    className="text-gray-400 hover:text-red-500 transition"
  >
    <Trash2 size={20} />
  </button>
</div>
                )
              )}

            </div>
              
              <div className="mt-6">
  <button
    onClick={() => {
      setOpen(false);
      navigate("/book-test");
    }}
    className="w-full border-2 border-dashed border-blue-200 rounded-2xl py-4 text-blue-600 font-medium hover:bg-blue-50 transition"
  >
    + Add More Tests
  </button>
</div>
            {/* FOOTER */}

            <div className="absolute bottom-0 left-0 w-full border-t bg-white p-6">

              <div className="flex justify-between font-bold text-lg">

                <span>Total</span>

                <span>
                  ₹{total}
                </span>

              </div>

              <button onClick={()=>{
                sessionStorage.setItem(
      "cartBooking",
      JSON.stringify(cartItems)
    );

    setOpen(false);

    navigate("/booking/cart");

                }}
                className="mt-4 w-full bg-blue-500 text-white py-4 rounded-full"
              >
                Proceed
              </button>

            </div>

          </div>

        </div>
      )}
    </>
  );
};

export default CartDrawer;