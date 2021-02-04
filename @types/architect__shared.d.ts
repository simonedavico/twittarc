declare module "@architect/shared/ensureAuth" {
  import type { HttpHandler } from "@architect/functions";

  const ensureAuth: HttpHandler;

  export default ensureAuth;
}
