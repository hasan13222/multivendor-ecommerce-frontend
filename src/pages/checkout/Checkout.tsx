import CheckoutForm from "../../components/form/CheckoutForm";

const Checkout = () => {
  return (
    <>
      <div className="products container mx-auto px-3 py-8">
        <h2 className="font-semibold text-3xl mb-5">Checkout</h2>
        <CheckoutForm />
      </div>
    </>
  );
};

export default Checkout;
