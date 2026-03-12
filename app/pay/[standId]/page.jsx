import { redirect } from "next/navigation";

export default function PayRedirect({ params }) {
  redirect(`/stand/${params.standId}`);
}
