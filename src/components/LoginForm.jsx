import React from "react";
import Login, { Render } from "react-login-page";
import Logo from "react-login-page/logo";

const Demo = () => {
  return (
    <Login>
      <Render>
        {({ fields, buttons, blocks, $$index }) => {
          return (
            <div className="mx-auto my-4 max-w-md rounded-md border-2 border-solid border-black bg-gray-600">
              <div className="flex flex-col justify-center p-10">
                <header className="m-4 flex justify-center">
                  {blocks.logo} {blocks.title}
                </header>
                <div className="m-4 flex justify-center">
                  <label>{fields.username}</label>
                </div>
                <div className="flex justify-center">
                  <label>{fields.password}</label>
                </div>
                <div className="m-4 flex justify-center">
                  {buttons.submit}
                  {buttons.reset}
                </div>
              </div>
            </div>
          );
        }}
      </Render>
      <Login.Block keyname="logo" tagName="span">
        <Logo />
      </Login.Block>
      <Login.Block keyname="title" tagName="span">
        Login
      </Login.Block>
      <Login.Input
        keyname="username"
        placeholder="Please enter username"
        className="rounded-md border border-solid border-black"
      />
      <Login.Input
        keyname="password"
        placeholder="Please enter password"
        className="rounded-md border border-solid border-black"
      />
      <Login.Button
        keyname="submit"
        type="submit"
        className="m-2 w-20 rounded-md border-2 border-solid border-black bg-slate-100"
      >
        Submit
      </Login.Button>
      <Login.Button
        keyname="reset"
        type="reset"
        className="m-2 w-20 rounded-md border-2 border-solid border-black bg-slate-100"
      >
        Reset
      </Login.Button>
    </Login>
  );
};
export default Demo;
