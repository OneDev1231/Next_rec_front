import { ReccListsRecord, ReccItemsRecord } from "@/xata";

export type ReccCreator = {
  first_name: string;
  last_name: string;
  image_url: string;
};

export interface FilledOutRecc extends ReccListsRecord {
  creator: ReccCreator;
  reccItems: ReccItemsRecord[];
}

export interface FilledOutRequest extends ReccListsRecord {
  creator: ReccCreator;
  reccListResponses?: FilledOutRecc[];
}
