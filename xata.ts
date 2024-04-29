// Generated by Xata Codegen 0.29.0. Please do not edit.
import { buildClient } from "@xata.io/client";
import type {
  BaseClientOptions,
  SchemaInference,
  XataRecord,
} from "@xata.io/client";

const tables = [
  {
    name: "recc_lists",
    columns: [
      { name: "user_id", type: "string", defaultValue: "" },
      { name: "recc_items", type: "multiple" },
      { name: "prompt_text", type: "text" },
      { name: "title", type: "text" },
      { name: "request_id", type: "string" },
      { name: "user", type: "link", link: { table: "users" } },
      { name: "status", type: "string", defaultValue: "active" },
    ],
    revLinks: [
      { column: "recc_list", table: "recc_items" },
      { column: "recc_list", table: "recc_list_saves" },
    ],
  },
  {
    name: "recc_items",
    columns: [
      { name: "recc_list_id", type: "string", defaultValue: "" },
      { name: "title", type: "string" },
      { name: "description", type: "text" },
      { name: "image_url", type: "string" },
      { name: "category", type: "string" },
      { name: "link", type: "string" },
      { name: "recc_list", type: "link", link: { table: "recc_lists" } },
    ],
  },
  {
    name: "users",
    columns: [
      { name: "first_name", type: "string" },
      { name: "last_name", type: "string" },
      { name: "clerk_user_id", type: "string", unique: true },
      { name: "image_url", type: "string" },
      { name: "email", type: "string" },
    ],
    revLinks: [
      { column: "user", table: "recc_lists" },
      { column: "user", table: "recc_list_saves" },
      { column: "user", table: "requests" },
    ],
  },
  {
    name: "requests",
    columns: [
      { name: "user_id", type: "string" },
      { name: "recc_list_responses", type: "multiple" },
      { name: "prompt_text", type: "text" },
      { name: "title", type: "text" },
      { name: "status", type: "string", defaultValue: "active" },
      { name: "user", type: "link", link: { table: "users" } },
    ],
  },
  {
    name: "recc_list_saves",
    columns: [
      { name: "user_id", type: "string" },
      { name: "user", type: "link", link: { table: "users" } },
      { name: "recc_list_id", type: "string" },
      { name: "recc_list", type: "link", link: { table: "recc_lists" } },
    ],
  },
] as const;

export type SchemaTables = typeof tables;
export type InferredTypes = SchemaInference<SchemaTables>;

export type ReccLists = InferredTypes["recc_lists"];
export type ReccListsRecord = ReccLists & XataRecord;

export type ReccItems = InferredTypes["recc_items"];
export type ReccItemsRecord = ReccItems & XataRecord;

export type Users = InferredTypes["users"];
export type UsersRecord = Users & XataRecord;

export type Requests = InferredTypes["requests"];
export type RequestsRecord = Requests & XataRecord;

export type ReccListSaves = InferredTypes["recc_list_saves"];
export type ReccListSavesRecord = ReccListSaves & XataRecord;

export type DatabaseSchema = {
  recc_lists: ReccListsRecord;
  recc_items: ReccItemsRecord;
  users: UsersRecord;
  requests: RequestsRecord;
  recc_list_saves: ReccListSavesRecord;
};

const DatabaseClient = buildClient();

const defaultOptions = {
  databaseURL:
    "https://ross-campbell-ucsd-recc-s-workspace-5i2a8b.us-east-1.xata.sh/db/recc",
};

export class XataClient extends DatabaseClient<DatabaseSchema> {
  constructor(options?: BaseClientOptions) {
    super({ ...defaultOptions, ...options }, tables);
  }
}

let instance: XataClient | undefined = undefined;

export const getXataClient = () => {
  if (instance) return instance;

  instance = new XataClient();
  return instance;
};
