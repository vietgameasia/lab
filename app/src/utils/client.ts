import type { TypedPocketBase } from "@/types/pb"
import PocketBase from "pocketbase"

export const pb = new PocketBase("http://127.0.0.1:8090") as TypedPocketBase
