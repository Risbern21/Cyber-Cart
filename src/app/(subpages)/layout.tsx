export default function subPagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="px-5 sm:px-20 py-10">{children}</div>;
}
