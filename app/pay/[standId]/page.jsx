import { redirect } from "next/navigation";

export default function PayRedirect({ params }) {
  const standId = Array.isArray(params?.standId)
    ? params.standId[0]
    : params?.standId;

  if (!standId || typeof standId !== "string") {
    redirect("/stand/undefined");
  }

  redirect(`/stand/${standId}`);
}
