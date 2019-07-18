import { AuthenticateService } from "../services/AuthenticateService";

export class AuthenticateController {

    private email: HTMLInputElement;
    private password: HTMLInputElement;

    private emailRec: HTMLInputElement;

    constructor() {
        this.email = <HTMLInputElement>document.getElementById('email');
        this.password = <HTMLInputElement>document.getElementById('password');
    }

    authenticate(event: Event) {
        event.preventDefault();

        const authenticateService = new AuthenticateService();
        authenticateService.authenticate(this.email.value.toString(), this.password.value.toString())
            .catch(res => res.json())
            .then((res: any) => {
                if (res.erro) {
                    //  this.messageView.update(res.erro)
                }
            });
    }

    resetPassword(event: Event) {
        event.preventDefault();

        const authenticateService = new AuthenticateService();
        authenticateService.resetPassword(this.emailRec.value.toString())
            .then(res => {
                console.log('status', res.status)
                // 200, 201, 202, 203...
                if (Math.floor(res.status / 100) === 2) {
                    res.json()
                        .then(() => {
                            // document.getElementById('recoveryModal-close').click();
                            // this.messageView.update('Foi enviado um email para você, siga as instruções contidas nele para continuar.<br>Por favor verificar a seção de <i>spam</i>.');
                        })
                        .catch(error => {
                            console.error(error);
                        })
                } else {
                    res.json()
                        .then((erres) => {
                            // this.messageView.update(erres.erro);
                        })
                }
            })
    }

    logout(event: Event) {
        event.preventDefault();

        const authenticateService = new AuthenticateService();
        authenticateService.logout().then(res => {
            if (res.status == 400) alert("Houve um erro ao Deslogar");
            if (res.status == 200) {
                localStorage.removeItem("tkn");
                localStorage.removeItem("email");
                localStorage.removeItem("isAdmin");
                localStorage.removeItem("id");
                window.location.href = 'index.html';
            }
        }).catch(error => {
            console.log("error: ", error);
            return error;
        });
    }
}