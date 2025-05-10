import { useEffect, useState } from 'react';
import {
  Cart,
  CartEmpty,
  CartItem,
  CartMessage,
  CartOrderTotal,
  CartTitle,
} from './components/Cart';
import PageLayout from './components/PageLayout';
import { ProductCard, ProductItems, Products } from './components/Products';
import Button from './components/Button';
import {
  AddToCartIcon,
  IncrementQuantityIcon,
  DecrementQuantityIcon,
  RemoveFromCartIcon,
  CarbonNeutralIcon,
  EmptyCartIcon,
} from './components/Icons';
import { useCart } from './stores/cartContext';
import { useProductions } from './stores/productsContext';
import { Modal } from './components/Modal';
import {
  OrderConfirmed,
  OrderConfirmedItem,
  OrderConfirmTotal,
} from './components/OrderConfirmed';
import { useUi } from './stores/uiContext';

function App() {
  const {
    items: cartItems,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    getQuantity,
    getTotalResult,
    resetCart,
  } = useCart();

  const { openModal, closeModal } = useUi();
  const { products: productions, setupProducts } = useProductions();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log('init fetch');
    setIsLoading(true);
    setupProducts().finally(() => setIsLoading(false));
  }, []);

  function onOrderConfirmed() {
    resetCart();
    closeModal();
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <PageLayout>
      <Modal className="items-end md:items-center">
        <OrderConfirmed onOrderConfirmed={onOrderConfirmed}>
          {cartItems.map((item) => {
            const product = productions.find((p) => p.id === item.id);
            if (!product) {
              return null;
            }
            return (
              <OrderConfirmedItem
                key={item.id}
                image={product.image.thumbnail}
                name={product.name}
                quantity={item.quantity}
                price={product.price.toFixed(2)}
                sum={(product.price * item.quantity).toFixed(2)}
              />
            );
          })}
          <OrderConfirmTotal>
            {getTotalResult().totalPrice.toFixed(2)}
          </OrderConfirmTotal>
        </OrderConfirmed>
      </Modal>
      <div className="flex flex-col gap-4 p-6 md:flex-row md:p-10">
        <Products title="Desserts">
          <ProductItems>
            {productions.map((item) => (
              <ProductCard
                key={item.id}
                name={item.name}
                category={item.category}
                price={item.price.toFixed(2)}
                images={item.image}
                isActive={
                  getQuantity(item.id) !== undefined &&
                  (getQuantity(item.id) as number) > 0
                }
              >
                {!getQuantity(item.id) || getQuantity(item.id) === 0 ? (
                  <Button
                    className="min-w-[60%] border-custom-rose-400 bg-custom-rose-50 text-custom-rose-900"
                    onClick={() => addToCart(item.id, item.price)}
                  >
                    <AddToCartIcon />
                    Add to Cart
                  </Button>
                ) : (
                  <Button className="min-w-[60%] justify-between">
                    <span
                      className="flex size-5 items-center justify-center rounded-full border border-white hover:bg-custom-rose-50 hover:text-custom-red"
                      onClick={() => decreaseQuantity(item.id)}
                    >
                      <DecrementQuantityIcon />
                    </span>
                    {getQuantity(item.id)}
                    <span
                      className="flex size-5 items-center justify-center rounded-full border border-white hover:bg-custom-rose-50 hover:text-custom-red"
                      onClick={() => increaseQuantity(item.id)}
                    >
                      <IncrementQuantityIcon />
                    </span>
                  </Button>
                )}
              </ProductCard>
            ))}
          </ProductItems>
        </Products>
        <Cart>
          <CartTitle cartItemsQuantity={getTotalResult().totalQuantity} />
          {cartItems.length === 0 ? (
            <CartEmpty icon={<EmptyCartIcon />} />
          ) : (
            <>
              <div>
                {cartItems.map((item) => {
                  const product = productions.find((p) => p.id === item.id);
                  if (!product) {
                    return null;
                  }
                  return (
                    <CartItem
                      key={item.id}
                      itemTitle={product.name}
                      quantity={item.quantity}
                      price={product.price.toFixed(2)}
                      sum={(product.price * item.quantity).toFixed(2)}
                      removeIcon={<RemoveFromCartIcon />}
                      removeHandler={() => removeFromCart(item.id)}
                    />
                  );
                })}
              </div>
              <CartOrderTotal>
                {getTotalResult().totalPrice.toFixed(2)}
              </CartOrderTotal>
              <CartMessage>
                <CarbonNeutralIcon />
                <p>
                  This is a <strong>carbon-neutral</strong> delivery
                </p>
              </CartMessage>
              <Button className="mt-2 w-full py-3" onClick={openModal}>
                Confirm Order
              </Button>
            </>
          )}
        </Cart>
      </div>
    </PageLayout>
  );
}

export default App;
