import Button from './Button';
import { OrderConfirmationIcon } from './Icons';

export function OrderConfirmed({
  children,
  onOrderConfirmed,
}: {
  children: React.ReactNode;
  onOrderConfirmed: () => void;
}) {
  return (
    <div className="w-full rounded-t-xl bg-white p-6 md:max-w-[35%] md:rounded-xl">
      <OrderConfirmationIcon />
      <p className="mt-4 flex flex-col text-4xl font-bold text-custom-rose-900 md:flex-row md:gap-2">
        <span>Order</span>
        <span>Confirmed</span>
      </p>
      <p className="mt-2 text-custom-rose-500">We hope you enjoy your food!</p>
      <div className="mt-6 rounded-lg bg-custom-rose-50 p-6">{children}</div>
      <Button className="mt-4 w-full py-3" onClick={onOrderConfirmed}>
        Start New Order
      </Button>
    </div>
  );
}

export function OrderConfirmedItem({
  image,
  name,
  quantity,
  price,
  sum,
}: {
  image: string;
  name: string;
  quantity: number;
  price: string;
  sum: string;
}) {
  return (
    <div className="flex w-full items-center justify-between border-b border-custom-rose-100 pb-4 not-last:mb-4">
      <div className="flex gap-4">
        <img src={image} className="w-14" alt="dessert image" />
        <div className="flex flex-col justify-between">
          <p className="line-clamp-1 font-semibold text-custom-rose-900">
            {name}
          </p>
          <div className="flex gap-3">
            <p className="font-semibold text-custom-red">{quantity}x</p>
            <p className="text-custom-rose-400">@ ${price}</p>
          </div>
        </div>
      </div>
      <p className="font-semibold text-custom-rose-900">${sum}</p>
    </div>
  );
}

export function OrderConfirmTotal({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between pt-4">
      <p className="text-sm text-custom-rose-900">Order Total</p>
      <p className="text-2xl font-bold text-custom-rose-900">{children}</p>
    </div>
  );
}
