import { auth } from "@/auth";
import { AuthScreen } from "@/features/auth/components/auth-screen";

const Home = async () => {
  const user = await auth();
  console.log("current session: ", user);
  return <AuthScreen user={user} />;
};

export default Home;
