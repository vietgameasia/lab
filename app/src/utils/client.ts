import type { TypedPocketBase } from "@/types/pb"
import PocketBase from "pocketbase"

export const pb = new PocketBase(
  import.meta.env.VITE_POCKETBASE_URL
) as TypedPocketBase
