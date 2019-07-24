const url = new URLSearchParams(location.search);
const url_ask_id = url.get('id');

import { HelpCenterController } from "./controllers/HelpCenterController";
import { getUser } from "./utils/userData";
import { Post } from "./models/Post";
























if (!localStorage.getItem('tkn')) document.getElementById('user-main').innerHTML = `<a href="index.html" class="menu-item"><h5><strong>Login</strong></h5></a>`;