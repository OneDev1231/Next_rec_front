import { usersService } from "@/services/users";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function AfterSignUpPage() {
  await usersService.createUser();
  revalidatePath("/", "page");
  redirect("/");
}
