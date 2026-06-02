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
                    className="border rounded-2xl p-4 flex justify-between items-center"
                  >

                    <div>

                      <h3 className="font-semibold">
                        {item.testName}
                      </h3>

                      <p className="text-blue-600 font-medium">
                        ₹{item.price}
                      </p>

                    </div>

                    <button
                      onClick={() =>
                        removeFromCart(
                          item._id
                        )
                      }
                    >
                      <Trash2
                        size={18}
                      />
                    </button>

                  </div>
                )
              )}

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