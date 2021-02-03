import tiny from "tiny-json-http";
import test from "tape";
import sandbox from "@architect/sandbox";

// use the first spec as before hook, as tape does not have them
test("sandbox.start", async (t) => {
  console.log("start");
  t.plan(1);
  await sandbox.start();
  t.ok(true, "sandbox started on http://localhost:3333");
});

test("get /", async (t) => {
  t.plan(1);
  const result = await tiny.get({ url: "http://localhost:3333" });
  t.ok(result, "got 200 OK");
});

// use the last spec as after hook, as tape does not have them
test("sandbox.end", async (t) => {
  t.plan(1);
  await sandbox.end();
  t.ok(true, "sandbox ended");
});
