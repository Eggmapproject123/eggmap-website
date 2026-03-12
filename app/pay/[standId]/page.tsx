import { redirect } from "next/navigation";

export default function PayRedirect({ params }: { params: { standId: string } }) {
  redirect(`/stand/${params.standId}`);
}
