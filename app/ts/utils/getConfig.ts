import { ConfigurationService } from "../services/ConfigurationService";

let configurationService = new ConfigurationService();

let captcha: any;

configurationService.listAll()
    .then(res => {
        return res.json()
    })
    .then(res => {
        captcha = res.recaptcha;
        return res.captcha;
    })
    .catch(err => {
        console.log(err);
    });


export function getCaptchaConfig() {
    return captcha
}