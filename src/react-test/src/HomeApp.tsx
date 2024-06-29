import { useEffect, useState } from "react";

const ValueRow = ({ product }: { product: Product }) => {
  return (
    <tr>
      <td>{product.name}</td>
      <td>{product.price}</td>
    </tr>
  );
};

const ValueHeader = ({ valueHeader }: { valueHeader: string }) => {
  return (
    <tr>
      <td colSpan={2}>{valueHeader}</td>
    </tr>
  );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CategorySection = ({
  products,
  category,
}: {
  products: Array<Product>;
  category: string;
}) => {
  const productRows = products.map((product) => (
    <ValueRow key={product.name} product={product} />
  ));

  return (
    <>
      <ValueHeader valueHeader={category} />
      {productRows}
    </>
  );
};

interface Product {
  category: string;
  name: string;
  price: string;
  stocked: boolean;
}

const ProductsTable = ({ products }: { products: Array<Product> }) => {
  const groupProductsByCategory = (products: Array<Product>) => {
    const categories = new Map<string, Array<Product>>();
    products.forEach((product) => {
      const category = categories.get(product.category);
      if (category) {
        category.push(product);
      } else {
        categories.set(product.category, [product]);
      }
    });
    return categories;
  };

  const categories = groupProductsByCategory(products);

  const categoryRows = Array.from(categories).map(([category, products]) => (
    <CategorySection key={category} products={products} category={category} />
  ));

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{categoryRows}</tbody>
    </table>
  );
};

const products: Array<Product> = [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" },
];

const FilterProduct = ({
  input,
  onlyInStock,
  handleInputOnChange,
  handleCheckboxOnChange,
}: {
  input: string;
  onlyInStock: boolean;
  handleInputOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleCheckboxOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <form>
      <input
        type="text"
        placeholder="Filter Products..."
        value={input}
        onChange={handleInputOnChange}
      />
      <label>
        <input
          type="checkbox"
          checked={onlyInStock}
          onChange={handleCheckboxOnChange}
        />
        Only show products in stock
      </label>
    </form>
  );
};

const FilterProductsApp = () => {
  const [data, setData] = useState<Array<Product>>(products);
  const [input, setInput] = useState<string>("");
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);

  useEffect(() => {
    console.log("triggered");
    const filterData = () => {
      let filteredData = products.filter((product) => {
        if (onlyInStock && !product.stocked) {
          return false;
        }

        const newInput = input.toLowerCase();

        if (newInput && !product.name.toLowerCase().includes(newInput)) {
          return false;
        }
        return true;
      });

      setData(filteredData);
    };

    filterData();
  }, [onlyInStock, input]);

  const handleInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleCheckboxOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOnlyInStock(e.target.checked);
  };

  return (
    <div>
      <FilterProduct
        input={input}
        onlyInStock={onlyInStock}
        handleInputOnChange={handleInputOnChange}
        handleCheckboxOnChange={handleCheckboxOnChange}
      />
      <ProductsTable products={data} />
    </div>
  );
};

export default FilterProductsApp;
