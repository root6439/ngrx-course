import { User } from "../shared/models/user.model";
import { AuthState } from "./login/login-reducer";

export interface AppState {
    auth: AuthState
}