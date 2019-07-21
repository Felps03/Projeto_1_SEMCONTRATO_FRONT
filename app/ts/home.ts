import { HomeController } from './controllers/HomeController'
import { UserService } from './services/UserService'
import { HelpCenterController } from './controllers/HelpCenterController'
import { DailyNoteController } from './controllers/DailyNoteController'
import { getUser } from './utils/userData'
import { AuthenticateController } from './controllers/AuthenticateController'

let userData = getUser()
let homeController = new HomeController()

window.addEventListener(
    'load',
    homeController.listLastHelp.bind(homeController)
)
window.addEventListener(
    'load',
    homeController.listDailyDate.bind(homeController)
)
