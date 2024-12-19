import { auth } from "@/auth";
import { AuthScreen } from "@/features/auth/components/auth-screen";

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    return <AuthScreen />;
  }

  return <>{children}</>;
}
