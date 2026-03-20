// Stáhne počet podpisů a posledních N podepisujících z Action Network API
// Spouštěno z GitHub Actions, výstup zapisuje do src/data/signatures.json

import { readFileSync, writeFileSync } from "fs";

const apiKey = process.env.AN_API_KEY;
if (!apiKey) {
  console.error("Chybí AN_API_KEY");
  process.exit(1);
}

const headers = { "OSDI-API-Token": apiKey };

const config = JSON.parse(readFileSync("src/config/petition.json", "utf8"));
const { endpoint_id: formId, type = "petition" } = config.action_network;

const path = type === "petition" ? "petitions" : "forms";
const submissionsPath = type === "petition" ? "signatures" : "submissions";

const res = await fetch(
  `https://actionnetwork.org/api/v2/${path}/${formId}/${submissionsPath}/?per_page=25&page=1`,
  { headers }
);

if (!res.ok) {
  console.error(`AN API error: ${res.status} ${await res.text()}`);
  process.exit(1);
}

const data = await res.json();
const count = data.total_records ?? 0;

const embeddedKey = type === "petition" ? "osdi:signatures" : "osdi:submissions";
const submissions = data._embedded?.[embeddedKey] ?? [];

// Dotáhnout data každé osoby paralelně
const personUrls = submissions
  .map((s) => s._links?.["osdi:person"]?.href)
  .filter(Boolean);

const people = await Promise.all(
  personUrls.map((url) => fetch(url, { headers }).then((r) => r.json()))
);

const signers = people
  .map((person) => {
    const firstName = person.given_name ?? "";
    const lastName = person.family_name ?? "";
    const city =
      person.postal_addresses?.find((a) => a.primary)?.locality ??
      person.postal_addresses?.[0]?.locality ??
      "";
    if (!firstName) return null;
    return {
      name: lastName ? `${firstName} ${lastName[0]}.` : firstName,
      city,
    };
  })
  .filter(Boolean);

writeFileSync(
  "src/data/signatures.json",
  JSON.stringify({ count, signers }, null, 2)
);

console.log(`Uloženo: ${count} podpisů, ${signers.length} podepisujících`);
