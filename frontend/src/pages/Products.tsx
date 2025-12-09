import { ProductCard } from "@/modules/product/components/ProductCard";
import { ProductForm } from "@/modules/product/components/ProductsForm";
import { useProducts } from "@/modules/product/hooks/useProducts";


export function Products() {
    const { data, setData, isLoading } = useProducts();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!data) {
    return <div>No data available</div>;
  }
  return (
    <div className="space-y-6">

        <h2 className="text-2xl font-bold text-gray-800">Product Catalog</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((p) => (
          <ProductCard key={p.ProductID} p={p} data={data} setData={setData} />
        ))}
      </div>
        <ProductForm data={data} setData={setData} />
    </div>
  );
}
