import { RegisteredDaily } from './index';

export class RegisteredDaylies {

    private _registeredDaylies: RegisteredDaily[] = [];

    add(registeredDaily: RegisteredDaily): void {
        this._registeredDaylies.push(registeredDaily);
    }

    toArray(): RegisteredDaily[] {
        return ([] as RegisteredDaily[]).concat(this._registeredDaylies);
    }
}