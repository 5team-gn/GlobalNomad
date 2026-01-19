export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gray-50 items-center justify-center">
      {children}
    </div>
  );
}