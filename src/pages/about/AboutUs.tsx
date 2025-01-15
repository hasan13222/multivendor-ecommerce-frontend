const AboutUs = () => {
  return (
    <>
      <div className="about_us container mx-auto px-3 py-8">
        <h2 className="font-bold text-3xl mb-2">About Ecohub</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center about_us">
          <div className="texts">
            <h3 className="text-xl font-semibold mt-2">Our Shop</h3>
            <p>
              Our Shop Welcome to Ecohub Multivendor Ecommerce, your premier
              destination for sustainable shopping! Founded with a vision of
              promoting eco-friendly lifestyles, Ecohub brings together a
              diverse community of sellers offering high-quality,
              environmentally conscious products across various categories.
            </p>
            <h3 className="text-xl font-semibold mt-2">Our Mission</h3>
            <p>
              our mission is to empower consumers to make sustainable choices by
              providing a platform that connects them with ethical and
              eco-friendly brands. We believe in creating a positive impact on
              the planet by making green shopping accessible, affordable, and
              convenient for everyone.
            </p>
          </div>
          <div className="group_img p-8">
            <img
              className="h-[300px] object-contain"
              src="/ecohub-shop.jpg"
              alt="about us"
            />
          </div>
        </div>
        <div className="about_btm">
          <h3 className="text-xl font-semibold mt-2">Our Products</h3>
          <p>
            We offer a wide range of eco-friendly products, including: Home
            Essentials: Reusable, biodegradable, and sustainably sourced
            household items. Fashion: Ethically made clothing, accessories, and
            footwear. Personal Care: Organic and cruelty-free beauty and
            skincare products. Tech Gadgets: Energy-efficient and sustainably
            manufactured electronics. Food & Beverages: Organic, non-GMO, and
            fair-trade options.
          </p>

          <h3 className="text-xl font-semibold mt-2">Our Promise</h3>
          <p>
            We are committed to providing an exceptional shopping experience
            that prioritizes quality, transparency, and sustainability. Our
            dedicated team works tirelessly to ensure that both buyers and
            sellers enjoy a seamless and trustworthy marketplace.
          </p>
          <h3 className="text-xl font-semibold mt-2">Our Vision</h3>
          <p>
            Ecohub envisions a future where sustainable shopping becomes the
            norm. We aim to build a thriving community of eco-conscious
            consumers and businesses working together to reduce environmental
            impact and create a healthier planet for future generations.
          </p>
          <h3 className="text-xl font-semibold mt-2">Our Store Location</h3>
          <p>15/2C, Heritage Home, East London, England</p>
          <h3 className="text-xl font-semibold mt-2">Our Contact Info</h3>
          <p>
            demo@mail.com
            <br />
            019524855455
          </p>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
