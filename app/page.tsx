import { auth } from "@/auth";
import { AuthScreen } from "@/features/auth/components/auth-screen";
import { UserButton } from "@/features/auth/components/user-button";

const Home = async () => {
  const session = await auth();
  console.log("current session: ", session);
  if (!session) {
    return <AuthScreen session={session} />;
  }

  return (
    <>
      <div className=" flex ml-2">
        <UserButton user={session?.user} />
      </div>
    </>
  );
};

export default Home;
