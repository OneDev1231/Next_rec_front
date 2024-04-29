import { currentUser } from "@clerk/nextjs";
import { getXataClient } from "../../xata";

const xata = getXataClient();

const createUser = async () => {
  const user = await currentUser();

  if (!user) {
    throw new Error("NO_USER");
  }

  const record = xata.db.users.create({
    id: user.id,
    first_name: user.firstName,
    last_name: user.lastName,
    clerk_user_id: user.id,
    image_url: user.imageUrl,
    email: user.emailAddresses[0].emailAddress,
  });

  return record;
}

export const usersService = { createUser }