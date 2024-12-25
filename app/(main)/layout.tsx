import { auth } from "@/auth";
import { AuthScreen } from "@/features/auth/components/auth-screen";
import { getWorkspace } from "@/features/workspace/actions/get-workspace";
import { redirect } from "next/navigation";

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  console.log(auth);
  if (!session) {
    return <AuthScreen />;
  } else {
    const workspace = await getWorkspace();
    if (workspace) {
      redirect(`/workspace/${workspace.id}`);
    }
  }
  console.log(session);

  return <>{children}</>;
}
