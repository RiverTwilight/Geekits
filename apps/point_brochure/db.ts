import Dexie, { Table } from "dexie";
import { ITaskItem } from "./ITaskItem";

export const db = new Dexie("Brochure");
db.version(1).stores({ tasks: "++id", rewards: "++id" });

// db.on("populate", populate);

// export function resetDatabase() {
// 	return db.transaction("rw", db.tasks, async () => {
// 		await Promise.all(db.tables.map((table) => table.clear()));
// 		await populate();
// 	});
// }
