import { readUsers, writeUsers } from "@/lib/userStore";

export async function POST(req: Request) {
  const body = await req.json();
  const users = readUsers();

  const exists = users.find((u: any) => u.username === body.username);
  if (exists) {
    return Response.json({ message: "Username exists" }, { status: 409 });
  }

  const newUser = {
    id: users.length ? users[users.length - 1].id + 1 : 1,
    status: "active",
    ...body,
  };

  users.push(newUser);
  writeUsers(users);

  return Response.json(newUser, { status: 201 });
}
