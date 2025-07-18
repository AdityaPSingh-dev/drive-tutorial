import { db } from "~/server/db";
import {
  files as fileSchema,
  folders as folderSchema,
} from "~/server/db/schema";
import DriveContents from "../../drive-content";
import z from "zod";
import { eq } from "drizzle-orm";
export default async function GoogleDriveClone(props: {
  params: Promise<{ folderId: string }>;
}) {
  const params = await props.params;
  const parsedFolderId = parseInt(params.folderId);
  if (isNaN(parsedFolderId)) {
    return <div>Invalid folder ID</div>;
  }
  console.log(params.folderId);
  const files = await db
    .select()
    .from(fileSchema)
    .where(eq(fileSchema.parent, parsedFolderId));
  const fodlers = await db
    .select()
    .from(folderSchema)
    .where(eq(folderSchema.id, parsedFolderId));
  return <DriveContents files={files} folders={fodlers} />;
}
