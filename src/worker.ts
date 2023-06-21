import { Taplo } from "@taplo/lib";
import { runAsWorker } from "synckit";

let taplo: Taplo | null = null;

runAsWorker(async (code: string) => {
  if (!taplo) {
    taplo = await Taplo.initialize();
  }

  return taplo.format(code);
});
