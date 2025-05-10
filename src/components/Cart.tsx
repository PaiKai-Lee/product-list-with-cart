export function Cart({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4 rounded-xl bg-white p-6 md:basis-1/3 md:self-start">
      {children}
    </div>
  );
}

export function CartTitle({
  cartItemsQuantity,
}: {
  cartItemsQuantity: number;
}) {
  return (
    <h1 className="text-2xl font-bold text-custom-red">
      Your Cart({cartItemsQuantity})
    </h1>
  );
}

export function CartEmpty({ icon }: { icon: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {icon}
      <p className="text-custom-rose-900">Your added items will appear here</p>
    </div>
  );
}

export function CartItem({
  removeIcon,
  removeHandler,
  itemTitle,
  quantity,
  price,
  sum,
}: {
  removeIcon: React.ReactNode;
  removeHandler: () => void;
  itemTitle: string;
  quantity: number;
  price: number | string;
  sum: number | string;
}) {
  return (
    <div className="flex w-full items-center justify-between border-b border-custom-rose-100 py-4">
      <div className="flex flex-col gap-1">
        <p className="font-semibold text-custom-rose-900">{itemTitle}</p>
        <div className="flex items-center gap-3 font-semibold">
          <p className="text-custom-red">{quantity}x</p>
          <p className="text-custom-rose-400">@ ${price}</p>
          <p className="text-custom-rose-500">${sum}</p>
        </div>
      </div>
      <div
        className="flex size-5 cursor-pointer items-center justify-center rounded-full border border-custom-rose-400 text-custom-rose-400 hover:bg-custom-rose-400 hover:text-white"
        onClick={removeHandler}
      >
        {removeIcon}
      </div>
    </div>
  );
}

export function CartOrderTotal({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-between pt-4">
      <p className="text-custom-rose-900">Order Total</p>
      <p className="text-2xl font-bold text-custom-rose-900">${children}</p>
    </div>
  );
}

export function CartMessage({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center gap-1 rounded-xl bg-custom-rose-50 py-4">
      {children}
    </div>
  );
}
