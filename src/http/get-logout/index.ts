import arc from "@architect/functions";

export async function logout() {
  return {
    statusCode: 302,
    session: {},
    location: "/",
  };
}

export const handler = arc.http.async(logout);
