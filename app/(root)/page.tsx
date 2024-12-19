import { getWorkspace } from "@/features/workspace/actions/get-workspace";
import { HomeClient } from "./home-client";
import { redirect } from "next/navigation";

const Home = async () => {
  const workspace = await getWorkspace();
  if (workspace) {
    redirect(`/workspace/${workspace.id}`);
  }
  return <HomeClient />;
};

export default Home;
