import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@formbricks/lib/authOptions";
import { IS_FORMBRICKS_CLOUD } from "@formbricks/lib/constants";
import { getFirstEnvironmentByUserId } from "@formbricks/lib/environment/service";
import { getProductByEnvironmentId } from "@formbricks/lib/product/service";
import { getUser } from "@formbricks/lib/user/service";
import { Onboarding } from "@formbricks/ui/Onboarding";

export default async function OnboardingPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/auth/login");
  }
  const userId = session?.user.id;
  const environment = await getFirstEnvironmentByUserId(userId);

  if (session.user.onboardingCompleted) {
    redirect("/");
  }

  if (!environment) {
    throw new Error("No environment found for user");
  }

  const user = await getUser(userId);
  const product = await getProductByEnvironmentId(environment?.id!);

  if (!environment || !user || !product) {
    throw new Error("Failed to get environment, user, or product");
  }

  return <Onboarding isFormbricksCloud={IS_FORMBRICKS_CLOUD} />;
}
