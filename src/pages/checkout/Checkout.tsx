import CheckoutForm from "../../components/form/CheckoutForm";

const Checkout = () => {
  return (
    <>
      <div className="products container mx-auto px-3 py-8">
        <h2 className="font-semibold text-3xl mb-5">Checkout</h2>
        <div className="grid grid-cols-2 items-center">
                <div className="col-span-2 sm:col-span-1">
                <CheckoutForm />
                </div>
                <div className="col-span-2 sm:col-span-1 max-h-[700px]">
                 <img className="object-contain" src="/checkout.svg" alt="login" />
                </div>
            </div>
        
      </div>
    </>
  );
};

export default Checkout;
