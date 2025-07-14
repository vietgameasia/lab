/**
 * This file was @generated using pocketbase-typegen
 */

import type PocketBase from "pocketbase"
import type { RecordService } from "pocketbase"

export enum Collections {
  Authorigins = "_authOrigins",
  Externalauths = "_externalAuths",
  Mfas = "_mfas",
  Otps = "_otps",
  Superusers = "_superusers",
  Benchmark = "benchmark",
  Brand = "brand",
  Chipset = "chipset",
  Cpu = "cpu",
  Environment = "environment",
  Gpu = "gpu",
  GpuVariants = "gpu_variants",
  Mainboard = "mainboard",
  Program = "program",
  RamCapacity = "ram_capacity",
  Resolution = "resolution",
  Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
  id: RecordIdString
  collectionId: string
  collectionName: Collections
  expand?: T
}

export type AuthSystemFields<T = never> = {
  email: string
  emailVisibility: boolean
  username: string
  verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type AuthoriginsRecord = {
  collectionRef: string
  created?: IsoDateString
  fingerprint: string
  id: string
  recordRef: string
  updated?: IsoDateString
}

export type ExternalauthsRecord = {
  collectionRef: string
  created?: IsoDateString
  id: string
  provider: string
  providerId: string
  recordRef: string
  updated?: IsoDateString
}

export type MfasRecord = {
  collectionRef: string
  created?: IsoDateString
  id: string
  method: string
  recordRef: string
  updated?: IsoDateString
}

export type OtpsRecord = {
  collectionRef: string
  created?: IsoDateString
  id: string
  password: string
  recordRef: string
  sentTo?: string
  updated?: IsoDateString
}

export type SuperusersRecord = {
  created?: IsoDateString
  email: string
  emailVisibility?: boolean
  id: string
  password: string
  tokenKey: string
  updated?: IsoDateString
  verified?: boolean
}

export type BenchmarkRecord = {
  average_fps?: number
  cpu_score?: number
  created?: IsoDateString
  disambiguation?: string
  environment: RecordIdString
  gpu_score?: number
  id: string
  low_fps?: number
  max_fps?: number
  min_fps?: number
  program: RecordIdString
  raytracing?: boolean
  resolution?: RecordIdString
  score?: number
  updated?: IsoDateString
}

export type BrandRecord = {
  created?: IsoDateString
  id: string
  logo?: string
  name?: string
  updated?: IsoDateString
}

export type ChipsetRecord = {
  brand?: RecordIdString
  created?: IsoDateString
  id: string
  name?: string
  updated?: IsoDateString
}

export type CpuRecord = {
  brand?: RecordIdString
  created?: IsoDateString
  id: string
  name?: string
  updated?: IsoDateString
}

export type EnvironmentRecord = {
  bios?: string
  cpu: RecordIdString
  cpuz?: string
  created?: IsoDateString
  driver?: string
  gpu_variant: RecordIdString
  gpuz?: string
  id: string
  mainboard: RecordIdString
  memory?: string
  operating_system?: string
  public?: boolean
  updated?: IsoDateString
}

export type GpuRecord = {
  brand?: RecordIdString
  created?: IsoDateString
  id: string
  name?: string
  updated?: IsoDateString
}

export type GpuVariantsRecord = {
  created?: IsoDateString
  gpu?: RecordIdString
  id: string
  manufacturer?: RecordIdString
  name?: string
  updated?: IsoDateString
}

export type MainboardRecord = {
  brand?: RecordIdString
  chipset?: RecordIdString
  created?: IsoDateString
  id: string
  name?: string
  updated?: IsoDateString
}

export type ProgramRecord = {
  created?: IsoDateString
  id: string
  name?: string
  updated?: IsoDateString
}

export type RamCapacityRecord = {
  capacity?: string
  created?: IsoDateString
  id: string
  updated?: IsoDateString
}

export type ResolutionRecord = {
  created?: IsoDateString
  id: string
  name?: string
  updated?: IsoDateString
}

export type UsersRecord = {
  avatar?: string
  created?: IsoDateString
  email: string
  emailVisibility?: boolean
  id: string
  name?: string
  password: string
  tokenKey: string
  updated?: IsoDateString
  verified?: boolean
}

// Response types include system fields and match responses from the PocketBase API
export type AuthoriginsResponse<Texpand = unknown> =
  Required<AuthoriginsRecord> & BaseSystemFields<Texpand>
export type ExternalauthsResponse<Texpand = unknown> =
  Required<ExternalauthsRecord> & BaseSystemFields<Texpand>
export type MfasResponse<Texpand = unknown> = Required<MfasRecord> &
  BaseSystemFields<Texpand>
export type OtpsResponse<Texpand = unknown> = Required<OtpsRecord> &
  BaseSystemFields<Texpand>
export type SuperusersResponse<Texpand = unknown> = Required<SuperusersRecord> &
  AuthSystemFields<Texpand>
export type BenchmarkResponse<Texpand = unknown> = Required<BenchmarkRecord> &
  BaseSystemFields<Texpand>
export type BrandResponse<Texpand = unknown> = Required<BrandRecord> &
  BaseSystemFields<Texpand>
export type ChipsetResponse<Texpand = unknown> = Required<ChipsetRecord> &
  BaseSystemFields<Texpand>
export type CpuResponse<Texpand = unknown> = Required<CpuRecord> &
  BaseSystemFields<Texpand>
export type EnvironmentResponse<Texpand = unknown> =
  Required<EnvironmentRecord> & BaseSystemFields<Texpand>
export type GpuResponse<Texpand = unknown> = Required<GpuRecord> &
  BaseSystemFields<Texpand>
export type GpuVariantsResponse<Texpand = unknown> =
  Required<GpuVariantsRecord> & BaseSystemFields<Texpand>
export type MainboardResponse<Texpand = unknown> = Required<MainboardRecord> &
  BaseSystemFields<Texpand>
export type ProgramResponse<Texpand = unknown> = Required<ProgramRecord> &
  BaseSystemFields<Texpand>
export type RamCapacityResponse<Texpand = unknown> =
  Required<RamCapacityRecord> & BaseSystemFields<Texpand>
export type ResolutionResponse<Texpand = unknown> = Required<ResolutionRecord> &
  BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> &
  AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
  _authOrigins: AuthoriginsRecord
  _externalAuths: ExternalauthsRecord
  _mfas: MfasRecord
  _otps: OtpsRecord
  _superusers: SuperusersRecord
  benchmark: BenchmarkRecord
  brand: BrandRecord
  chipset: ChipsetRecord
  cpu: CpuRecord
  environment: EnvironmentRecord
  gpu: GpuRecord
  gpu_variants: GpuVariantsRecord
  mainboard: MainboardRecord
  program: ProgramRecord
  ram_capacity: RamCapacityRecord
  resolution: ResolutionRecord
  users: UsersRecord
}

export type CollectionResponses = {
  _authOrigins: AuthoriginsResponse
  _externalAuths: ExternalauthsResponse
  _mfas: MfasResponse
  _otps: OtpsResponse
  _superusers: SuperusersResponse
  benchmark: BenchmarkResponse
  brand: BrandResponse
  chipset: ChipsetResponse
  cpu: CpuResponse
  environment: EnvironmentResponse
  gpu: GpuResponse
  gpu_variants: GpuVariantsResponse
  mainboard: MainboardResponse
  program: ProgramResponse
  ram_capacity: RamCapacityResponse
  resolution: ResolutionResponse
  users: UsersResponse
}

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
  collection(idOrName: "_authOrigins"): RecordService<AuthoriginsResponse>
  collection(idOrName: "_externalAuths"): RecordService<ExternalauthsResponse>
  collection(idOrName: "_mfas"): RecordService<MfasResponse>
  collection(idOrName: "_otps"): RecordService<OtpsResponse>
  collection(idOrName: "_superusers"): RecordService<SuperusersResponse>
  collection(idOrName: "benchmark"): RecordService<BenchmarkResponse>
  collection(idOrName: "brand"): RecordService<BrandResponse>
  collection(idOrName: "chipset"): RecordService<ChipsetResponse>
  collection(idOrName: "cpu"): RecordService<CpuResponse>
  collection(idOrName: "environment"): RecordService<EnvironmentResponse>
  collection(idOrName: "gpu"): RecordService<GpuResponse>
  collection(idOrName: "gpu_variants"): RecordService<GpuVariantsResponse>
  collection(idOrName: "mainboard"): RecordService<MainboardResponse>
  collection(idOrName: "program"): RecordService<ProgramResponse>
  collection(idOrName: "ram_capacity"): RecordService<RamCapacityResponse>
  collection(idOrName: "resolution"): RecordService<ResolutionResponse>
  collection(idOrName: "users"): RecordService<UsersResponse>
}
