import dotenv from "dotenv";
import { Client } from "@notionhq/client";
import { NotionIdentificator } from "../types/notion";

dotenv.config()
const { 
    NOTION_TOKEN_SECRET,
    NOTION_DATABASE_ID  
} = process.env;

const notionDataBaseID: NotionIdentificator = NOTION_DATABASE_ID as string;
const notionClient = new Client({ auth: NOTION_TOKEN_SECRET });

export function archiveTask(pageId: NotionIdentificator) {
    return notionClient.pages.update({
        page_id: pageId,
        archived: true
    });
}

export function getTasks() {
    return notionClient.databases.query({
        database_id: notionDataBaseID,
        filter: {
            property: "Create at",
            date: {
                after: "2023-03-06",
            }
        }
    });
}