import { createHash } from "crypto";
import { decimalToBase62 } from "./decimalToBase62.js";

export default async function generateUrlShortCode(long_url) {
  const shortUrlMd5Hash = createHash("md5").update(long_url).digest("hex");
  const shortUrlMd5DecimalHash = BigInt("0x" + shortUrlMd5Hash).toString(10);
  const shortUrlBase62Code = decimalToBase62(Number(shortUrlMd5DecimalHash));
  return shortUrlBase62Code;
}
