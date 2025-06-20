import React, { ChangeEvent, Component } from "react";
import { LoginForm } from "./LoginForm";
import './AccountManager.css'; 

type AccountManagerProps = {
  user: string, 
  doLogoutCallback : () => void 
  doAddAccountCallback : (username: string, account: any) => void
  doAddAccountsDisplayCallback : (assign: boolean) => void
  doLoginCallback : (account: string) => void
  accounts: Array<string>,
  subaccounts: Array<string>,
  error: boolean,
  error_message: string,
  add_accounts: boolean
};

type AccountManagerState = {
  accounts : Array<string>,
  subaccounts : Array<string>,
  username: string, 
  password: string,
  show_subaccounts: boolean,
};

export class AccountManager extends Component<AccountManagerProps, AccountManagerState> {

  constructor(props: AccountManagerProps) {
    super(props);
    this.state = {
      accounts: this.props.accounts,
      subaccounts: this.props.subaccounts,
      username: this.props.user,
      password: "testPass123",
      show_subaccounts: false,
    };
  }

  componentDidUpdate(prevProps: AccountManagerProps) {
    if (prevProps.accounts !== this.props.accounts || prevProps.subaccounts !== this.props.subaccounts) {
      this.setState({ accounts: [...this.props.accounts], subaccounts: [...this.props.subaccounts] });
    }
  }

  render = (): JSX.Element => {
    const accounts : Array <JSX.Element> = [];
    if(this.state.show_subaccounts) {
      for(const account of this.state.subaccounts) {
        accounts.push(<p onClick={() => {this.props.doLoginCallback(account)}} 
                        className="account-entry" key={account}> {account} </p>);
      }
    } else {
      for(const account of this.state.accounts) {
        accounts.push(<p onClick={() => {this.props.doLoginCallback(account)}} 
                        className="account-entry" key={account}> {account} </p>);
      }
    }
    return (
      <div className="account-manager-container"> 
        <h1 className="header">Welcome, {this.props.user}</h1>
        
        <div className="accounts-section"> 
          <h2 className="accounts-title">Accounts:</h2> 
          {accounts}
        </div>
        
        {this.props.add_accounts && this.renderAddAccounts()}

        <div className="action-button-row">
          {!this.props.add_accounts && (
            <button className="action-button" onClick={this.onAddAccountClick}>Add Account</button>
          )}

          <button
            className="action-button"
            onClick={
              this.state.show_subaccounts
                ? this.doHandleShowSubAccountsClick
                : this.doHandleHideSubAccountsClick
            }
          >
            {this.state.show_subaccounts ? "Hide All Subaccounts" : "Show Subaccounts"}
          </button>

          <button className="action-button" onClick={this.doLogoutClick}>Log Out</button>
        </div>

      </div>
    );
  };

  renderAddAccounts = () : JSX.Element => {
    return (
      <div className="add-account-form">
        <LoginForm
          username={this.state.username}
          password={this.state.password}
          error={this.props.error}
          error_message={this.props.error_message}
          onUsernameChange={this.doUsernameChange}
          onPasswordChange={this.doPasswordChange}
          onSubmitClick={this.doHandleAddAccountClick}
          submitLabel="Register Account"
        />
        <button className="cancel-button" onClick={this.onAddAccountCancelClick}>Cancel</button>
      </div>
    );
  }

  onAddAccountClick = () : void => {
    this.props.doAddAccountsDisplayCallback(true);
  }

  onAddAccountCancelClick = () : void => {
    this.props.doAddAccountsDisplayCallback(false);
  }

  doLogoutClick = () : void => {
    this.props.doLogoutCallback();
  }

  doUsernameChange = (evt : ChangeEvent<HTMLInputElement>) : void => { 
    this.setState({username: evt.target.value});
  }

  doPasswordChange = (evt : ChangeEvent<HTMLInputElement>) : void => { 
    this.setState({password: evt.target.value});
  }

  doHandleAddAccountClick = () : void => {
    this.props.doAddAccountCallback(this.props.user, {
      username: this.state.username,
      password: this.state.password
    });
  }

  doHandleHideSubAccountsClick = () : void => {
    this.setState({show_subaccounts: true});
  }

  doHandleShowSubAccountsClick = () : void => {
    this.setState({show_subaccounts: false});
  }
}
