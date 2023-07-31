-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Items" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "checked" BOOLEAN NOT NULL DEFAULT false,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "deleter" TEXT,
    "deletedDate" DATETIME,
    "roomId" INTEGER NOT NULL,
    CONSTRAINT "Items_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Items" ("checked", "deleted", "deletedDate", "deleter", "id", "name", "roomId") SELECT "checked", "deleted", "deletedDate", "deleter", "id", "name", "roomId" FROM "Items";
DROP TABLE "Items";
ALTER TABLE "new_Items" RENAME TO "Items";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
