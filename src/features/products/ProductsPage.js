import { ProductCard } from "../../components/ProductCard/ProductCard";
import "./ProductsPage.css";


function ProductsPage({ products }) {
  console.log('ProductsPage products:', products)
  return (
    <div>
      <h1>전체 상품</h1>
      <section className="product-list">
        {products.map((p) => (
          <div key={p.id}>
            <ProductCard product={p} />
          </div>
        ))}
      </section>
    </div>
  );
}
export default ProductsPage;
