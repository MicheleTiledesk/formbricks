import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { HomeRedirect } from "./components";
import { PosthogClient } from "./PosthogClient";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/auth/login");
  }
  return (
    <>
      <PosthogClient />
      <HomeRedirect />
      <LoadingSpinner />
    </>
  );
}
