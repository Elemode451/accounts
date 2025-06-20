export const WELCOME: string = "Welcome to Accounts.com!";

export const LOGIN = {kind: "login"} as const;
export const REGISTER = {kind: "register"} as const;
export const ACCOUNT_MANAGER = (user: string) : PAGE => {
  return {kind: "account-manager", user: user};
}

export type PAGE = {kind: "login"} | {kind: "register"} | {kind: "account-manager", user: string}

export const ERROR_MESSAGE = "An error has occured.";
export const SITE_INFO = "Create accounts like a TITAN of accounts. Just keep creating man.";

export const DEFAULT_USERNAME = "TEST_USER";
export const DEFAULT_PASSWORD = "password"

export const isRecord = (val: unknown): val is Record<string, unknown> => {
    return val !== null && typeof val === "object";
};

export const LOGIN_TEXT = "Existing User? Login Here";
export const REGISTER_TEXT = "New User? Register Here";