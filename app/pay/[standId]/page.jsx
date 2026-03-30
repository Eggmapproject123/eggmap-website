import { redirect } from "next/navigation";

export default async function PayRedirect({ params }) {
  const resolvedParams = await params;
  const standId = Array.isArray(resolvedParams?.standId)
    ? resolvedParams.standId[0]
    : resolvedParams?.standId;

  if (!standId || typeof standId !== "string") {
    redirect("/stand/undefined");
  }

  redirect(`/stand/${standId}`);
}
