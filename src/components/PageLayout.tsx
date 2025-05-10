export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-custom-rose-50 font-hat-text">
      <main className="container mx-auto">{children}</main>
    </div>
  );
}
