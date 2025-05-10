export function Products({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <div className="flex flex-col gap-6 md:basis-2/3">
      <h1 className="text-3xl font-bold">{title}</h1>
      {children}
    </div>
  );
}

export function ProductItems({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {children}
    </div>
  );
}

export function ProductCard({
  children,
  name,
  category,
  price,
  images,
  isActive,
}: {
  children: React.ReactNode;
  name: string;
  category: string;
  price: string;
  images: {
    thumbnail: string;
    mobile: string;
    tablet: string;
    desktop: string;
  };
  isActive: boolean;
}) {
  return (
    <div className="flex flex-col">
      <picture className="relative mb-8">
        <source media="(min-width: 1024px)" srcSet={images.desktop}></source>
        <source media="(min-width: 640px)" srcSet={images.tablet}></source>
        <img
          className={
            isActive ? 'rounded-xl border-2 border-custom-red' : 'rounded-xl'
          }
          src={images.mobile}
          alt="production image"
        />
        <div className="absolute -bottom-6 left-[50%] flex w-full translate-x-[-50%] justify-center">
          {children}
        </div>
      </picture>
      <p className="text-custom-rose-500">{category}</p>
      <p className="font-semibold">{name}</p>
      <p className="font-semibold text-custom-red">${price}</p>
    </div>
  );
}
