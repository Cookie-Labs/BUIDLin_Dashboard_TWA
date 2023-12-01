export default function TwaLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto min-h-[100vh] max-w-[100vw] sm:min-h-[100vh] sm:max-w-[576px]">
      {children}
    </div>
  );
}
