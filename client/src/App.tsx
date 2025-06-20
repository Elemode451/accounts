import React, { ChangeEvent, Component } from 'react';
import { AccountManager } from './AccountManager';
import { LoginForm } from './LoginForm';
import "./App.css";
import { PAGE, REGISTER, ERROR_MESSAGE, SITE_INFO, WELCOME, LOGIN, ACCOUNT_MANAGER, DEFAULT_PASSWORD, DEFAULT_USERNAME, isRecord, REGISTER_TEXT, LOGIN_TEXT } from './utils';

type AppProps = {};  // no props

type AppState = {
  page: PAGE,
  username: string, 
  password: string,
  error: boolean,
  error_message: string
  add_accounts: boolean,
  accounts: Array<string>
  subaccounts: Array<string>
};



/** Top-level component that displays the entire UI. */
export class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    this.state = {
      page: REGISTER,
      username: DEFAULT_USERNAME,
      password: DEFAULT_PASSWORD,
      error: false,
      error_message: ERROR_MESSAGE,
      add_accounts: false,
      accounts: [],
      subaccounts: []
    }
  }
 

render = (): JSX.Element => {
  const { page } = this.state;

  return (
    <div className="app-container">
      {page.kind === "login" && (
        <div className="login-stack">
          <div className="form-wrapper">
            <h1 className="title">{WELCOME}</h1>
            <LoginForm
              username={this.state.username}
              password={this.state.password}
              error={this.state.error}
              error_message={this.state.error_message}
              onUsernameChange={this.doUsernameChange}
              onPasswordChange={this.doPasswordChange}
              onSubmitClick={this.doLoginClick}
              submitLabel="Log In"
              renderExtras={() => (
                <button className="switch-button" onClick={this.doRegistrationFlowClick}>
                  New User? Register Here
                </button>
              )}
            />
          </div>

          <div className="external-textbox">
            <div className="static-note">
              {SITE_INFO}
            </div>
          </div>
        </div>
      )}

      {page.kind === "register" && (
        <div className="login-stack">
          <div className="form-wrapper">
            <h1 className="title">{WELCOME}</h1>
            <LoginForm
              username={this.state.username}
              password={this.state.password}
              error={this.state.error}
              error_message={this.state.error_message}
              onUsernameChange={this.doUsernameChange}
              onPasswordChange={this.doPasswordChange}
              onSubmitClick={this.doRegistrationClick}
              submitLabel="Register"
              renderExtras={() => (
                <button className="switch-button" onClick={this.doLoginFlowClick}>
                  {LOGIN_TEXT}
                </button>
              )}
            />
          </div>

          <div className="external-textbox">
            <div className="static-note">
              {SITE_INFO}
            </div>
          </div>
        </div>
      )}

      {page.kind === "account-manager" && (
        <div className="manager-wrapper">
          <AccountManager
            user={this.state.username}
            doLogoutCallback={this.doLogoutCallback}
            doAddAccountCallback={this.doAddAccountCallback}
            doLoginCallback={this.doAccountInformationFetch}
            accounts={this.state.accounts}
            subaccounts={this.state.subaccounts}
            error={this.state.error}
            error_message={this.state.error_message}
            add_accounts={this.state.add_accounts}
            doAddAccountsDisplayCallback={this.doAddAccountsCallback}
          />
        </div>
      )}
    </div>
  );
};


  renderLogin = () : JSX.Element => {
    return <div>
      <p> Username: <input value={this.state.username} onChange={this.doUsernameChange} />  </p>  
      <p> Password: <input value={this.state.password} onChange={this.doPasswordChange} />  </p>  
      <button onClick={this.doLoginClick}> Log In </button>
      <button onClick={this.doRegistrationFlowClick}>  </button>
      {this.state.error ? <p className="error-message"> {this.state.error_message} </p> : <div/>}
    </div>
  };
  
  renderRegister = () : JSX.Element => {
    return <div>
      <p> Username: <input value={this.state.username} onChange={this.doUsernameChange} />  </p>  
      <p> Password: <input value={this.state.password} onChange={this.doPasswordChange} />  </p>  
      <button onClick={this.doRegistrationClick}> Register </button>
      <button onClick={this.doLoginFlowClick}> {REGISTER_TEXT}</button>
      {this.state.error ? <p> {this.state.error_message}</p> : <div/>}
    </div>
  };

  doUsernameChange = (evt : ChangeEvent<HTMLInputElement>) : void => { 
    this.setState({username: evt.target.value, error: false});
  }

  doRegistrationFlowClick = () : void => { 
    this.setState({page: REGISTER, error: false});
  }
  
  doLoginFlowClick = () : void => { 
    this.setState({page: LOGIN, error: false});
  }

  doLogoutCallback = () : void => { 
    this.setState({page: LOGIN, error: false});
  }

  doPasswordChange = (evt : ChangeEvent<HTMLInputElement>) : void => { 
    this.setState({password: evt.target.value, error: false});
  }

  doRegistrationClick = () : void => {
      const args = {user: this.state.username, password: this.state.password};
      fetch("/api/register", {method: "POST", body: JSON.stringify(args), headers: {"Content-Type": "application/json"}})
        .then(this.doRegistrationResp)
        .catch(() => this.doRegistrationError("Failed to connect and save.")); 
  }

  doLoginClick = () : void => {
      const args = {user: this.state.username, password: this.state.password};
      fetch("/api/login", {method: "POST", body: JSON.stringify(args), headers: {"Content-Type": "application/json"}})
        .then(this.doLoginResp)
        .catch(() => this.doRegistrationError("Failed to connect and save.")); 
  }

  doAddAccountCallback = (username: string, account: {username: string, password: string}) : void => {
      const addArgs = {user: username, account: {user: account.username, password: account.password}};
      fetch("/api/addAccount", {method: "POST", body: JSON.stringify(addArgs), headers: {"Content-Type": "application/json"}})
        .then(this.doAddAccountsResp)
        .catch(() => this.doRegistrationError("Failed to connect and save.")); 
  }

  doRegistrationError = (msg: string, ex?: unknown): void => {
    console.error(`failed to register/login: ${msg}`)
    if (ex instanceof Error)
      throw ex;
    this.setState({error: true, error_message: msg});
  };

  doRegistrationResp = (res: Response): void => {
    if (res.status === 200) {
      this.setState({page: ACCOUNT_MANAGER(this.state.username)});
    } else if (res.status === 400) {
      const p = res.text()
      p.then(this.doRegistrationError);
      p.catch((ex) => this.doRegistrationError('400 response is not text', ex));
    } else {
      this.doRegistrationError(`bad status code: ${res.status}`);
    }
  };

  doLoginResp = (res: Response): void => {
    if (res.status === 200) {
      this.doAccountInformationFetch(this.state.username);
    } else if (res.status === 400) {
      const p = res.text()
      p.then(this.doRegistrationError);
      p.catch((ex) => this.doRegistrationError('400 response is not text', ex));
    } else {
      this.doRegistrationError(`bad status code: ${res.status}`);
    }
  };

  doAddAccountsResp = (res: Response): void => {
    if (res.status === 200) {
      this.doAccountInformationFetch(this.state.username);
    } else if (res.status === 400) {
      const p = res.text()
      p.then(this.doRegistrationError);
      p.catch((ex) => this.doRegistrationError('400 response is not text', ex));
    } else {
      this.doRegistrationError(`bad status code: ${res.status}`);
    }
  };

  doAddAccountsCallback = (assign: boolean) : void => {
    this.setState({add_accounts: assign});
  } 

  doAccountInformationFetch = (username: string): void => {
    console.log("doing account deep info fetch!");
    fetch("/api/deepUserInfo?user=" + encodeURIComponent(username))
      .then(this.doInfoSubacctsResp)
      .catch(() => this.doInfoSubacctsError("Failed to connect and save."));

    console.log("doing account info fetch!");
    fetch("/api/userInfo?user=" + encodeURIComponent(username))
      .then(this.doInfoResp)
      .catch(() => this.doInfoError("Failed to connect and save."));

  }


  doInfoResp = (res: Response): void => {
    if (res.status === 200) {
      const p = res.json();
      p.then(this.doInfoJson);
      p.catch(() => this.doInfoError("Malformed response"));
    } else if (res.status === 400) {
      const p = res.text()
      p.then(this.doRegistrationError);
      p.catch((ex) => this.doRegistrationError('400 response is not text', ex));
    } else {
      this.doRegistrationError(`bad status code: ${res.status}`);
    }
  };

  doInfoJson = (data: unknown) => {
    // validate it’s an object
    if (!isRecord(data)) {
      this.doInfoError("response is not in expected form (not an object)");
      return;
    }
    

    // destructure with fallback
    const user = (data as Record<string, any>).user;
    const rawAccounts = (data as Record<string, any>).accounts;

    if (typeof user !== "string") {
      this.doInfoError("response is not in expected form (missing fields)" + JSON.stringify(rawAccounts));
      return;
    }

    // try parsing the accounts string
    console.log(JSON.stringify(rawAccounts));
    let accounts: unknown;
    try {
      accounts = typeof rawAccounts === "string" ? JSON.parse(rawAccounts) : rawAccounts;
      if (!Array.isArray(accounts)) throw new Error("not an array");
    } catch (e) {
      this.doInfoError("response is not in expected form (invalid accounts)");
      return;
    }

    this.setState({
      error: false,
      username: user,
      add_accounts: false,
      accounts: accounts,
      page: ACCOUNT_MANAGER(this.state.username)
    });

  }

  doInfoError = (msg: string, ex?: unknown): void => {
    console.error(`failed to register/login: ${msg}`)
    if (ex instanceof Error)
      throw ex;
    this.setState({error: true, error_message: msg});
  };


  doInfoSubacctsResp = (res: Response): void => {
    if (res.status === 200) {
      const p = res.json();
      p.then(this.doInfoSubacctsJson);
      p.catch(() => this.doInfoError("Malformed response"));
    } else if (res.status === 400) {
      const p = res.text()
      p.then(this.doRegistrationError);
      p.catch((ex) => this.doRegistrationError('400 response is not text', ex));
    } else {
      this.doRegistrationError(`bad status code: ${res.status}`);
    }
  };

  doInfoSubacctsJson = (data: unknown) => {
    // validate it’s an object
    if (!isRecord(data)) {
      this.doInfoError("response is not in expected form (not an object)");
      return;
    }
    

    // destructure with fallback
    const user = (data as Record<string, any>).user;
    const rawAccounts = (data as Record<string, any>).accounts;

    if (typeof user !== "string") {
      this.doInfoSubacctsError("response is not in expected form (missing fields)" + JSON.stringify(rawAccounts));
      return;
    }


    // try parsing the accounts string
    console.log(JSON.stringify(rawAccounts));
    let accounts: unknown;
    try {
      accounts = typeof rawAccounts === "string" ? JSON.parse(rawAccounts) : rawAccounts;
      if (!Array.isArray(accounts)) throw new Error("not an array");
    } catch (e) {
      this.doInfoSubacctsError("response is not in expected form (invalid accounts)");
      return;
    }

    this.setState({
      error: false,
      add_accounts: false,
      subaccounts: accounts,
    });

  }

  doInfoSubacctsError = (msg: string, ex?: unknown): void => {
    console.error(`failed to register/login: ${msg}`)
    if (ex instanceof Error)
      throw ex;
    this.setState({error: true, error_message: msg});
  };



}

