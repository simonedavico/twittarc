import arc from "@architect/functions";

/**
 * GET /logout
 *
 * Clears the session and redirects to homepage
 */
async function logout() {
  return {
    statusCode: 302,
    session: {},
    location: "/",
  };
}

export const handler = arc.http.async(logout);
