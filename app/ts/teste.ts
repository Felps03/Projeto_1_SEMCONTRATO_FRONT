import { DailyNoteController } from "./controllers/DailyNoteController";
import { DailyNote } from "./models/index";

let dc = new DailyNoteController();

let data = dc.listAllDailies();