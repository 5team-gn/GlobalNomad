export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex bg-gray-50 min-h-screen items-center justify-center">
      {children}
    </div>
  );
}