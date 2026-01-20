import ProductCard from "./ProductCard";

const FeaturedProducts = ({ products = [] }) => {
  return (
    <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products?.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default FeaturedProducts;
