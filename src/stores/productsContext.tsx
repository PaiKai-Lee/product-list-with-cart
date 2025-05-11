import { createContext, useState } from 'react';

export type ProductType = {
  id: number;
  image: {
    thumbnail: string;
    mobile: string;
    tablet: string;
    desktop: string;
  };
  name: string;
  category: string;
  price: number;
};

type ProductDataType = Omit<ProductType, 'id'>;

type ProductsContextType = {
  products: ProductType[];
  setupProducts: () => Promise<void>;
  addProduct: (product: ProductType) => void;
  getProduct: (id: number) => ProductType | undefined;
};

export const ProductsContext = createContext<ProductsContextType | undefined>(
  undefined,
);

export const ProductsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [products, setProducts] = useState<ProductType[]>([]);

  function setupProducts() {
    return fetch('data.json')
      .then((res) => res.json())
      .then((data: ProductDataType[]) => {
        const list = data.map((item, idx) => ({ ...item, id: idx + 1 }));
        setProducts(list);
      })
      .catch((err) => console.error(err));
  }

  function addProduct(product: ProductType) {
    setProducts((prev) => [...prev, product]);
  }

  function getProduct(id: number) {
    return products.find((product) => product.id === id);
  }

  return (
    <ProductsContext.Provider
      value={{ products, setupProducts, addProduct, getProduct }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
