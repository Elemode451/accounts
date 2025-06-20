import React, { ChangeEvent } from 'react';

type LoginFormProps = {
  username: string,
  password: string,
  error: boolean,
  error_message: string,
  onUsernameChange: (evt: ChangeEvent<HTMLInputElement>) => void,
  onPasswordChange: (evt: ChangeEvent<HTMLInputElement>) => void,
  onSubmitClick: () => void,
  submitLabel?: string,
  renderExtras?: () => JSX.Element 
};

export const LoginForm = ({
  username,
  password,
  error,
  error_message,
  onUsernameChange,
  onPasswordChange,
  onSubmitClick,
  submitLabel = "Submit",
  renderExtras
}: LoginFormProps): JSX.Element => {

  return (
    <div>
      <p>Username: <input value={username} onChange={onUsernameChange} /></p>
      <p>Password: <input value={password} onChange={onPasswordChange} /></p>
      <div className="action-button-row">

        <button onClick={onSubmitClick}>{submitLabel}</button>

        {renderExtras ? renderExtras() : null}
      </div>
      {error ? <p className="error-message" >{error_message}</p> : <div />}
    </div>
  );
};
