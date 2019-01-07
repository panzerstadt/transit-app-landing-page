import React, { Component } from "react";

const styles = {
  page: {
    height: "100vh",
    width: "100vw",
    margin: "0 auto",
    overflow: "hidden"
  },
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000",
    margin: "0 auto",
    padding: 10,
    height: "100%"
  },
  input: {
    color: "white",
    width: 240,
    height: 31,
    margin: "0 auto",
    outline: "none",
    borderStyle: "solid",
    borderWidth: "0 0 1px 0",
    borderColor: "white",
    backgroundColor: "transparent",
    font: "15px menlo"
  },
  button: {
    margin: 10,
    height: 30,
    width: 242,
    outline: "none",
    borderStyle: "none",
    // borderWidth: "0 0 1px 0",
    // borderColor: "white",
    backgroundColor: "white",
    color: "black",
    font: "15px menlo"
  },
  error: {
    height: 30,
    width: 240,
    font: "15px menlo",
    color: "red"
  }
};

export default class LoginPage extends Component {
  state = {
    username: "",
    password: "",
    error: "",
    ACCOUNTS: {},
    AUTHENTICATED: true
  };
  handleUsernameChange = this.handleUsernameChange.bind(this);
  handlePasswordChange = this.handlePasswordChange.bind(this);
  handleSubmit = this.handleSubmit.bind(this);

  componentDidMount() {
    console.log("loading user database");
    try {
      const acc = require("../hidden/hidden.json");
      this.setState({ ACCOUNTS: acc });
    } catch (err) {
      console.log("ERROR: " + err);
      console.log("setting up default username and passwords");
      const acc = {
        authenticated_accounts: [
          {
            username: "admin",
            password: "admin1928"
          },
          {
            username: "DANTOKYO",
            password: "DanTokyo12345"
          }
        ]
      };
      this.setState({ ACCOUNTS: acc });
    }
  }

  handleUsernameChange(e) {
    // hidden text here
    this.setState({ username: e.target.value });
  }

  handlePasswordChange(e) {
    // hidden text here
    this.setState({ password: e.target.value });
  }

  handleSubmit(e) {
    // form defaults
    e.preventDefault();

    // blank inputs
    if (this.state.password.length === 0 || this.state.username.length === 0) {
      if (
        this.state.password.length === 0 &&
        this.state.username.length === 0
      ) {
        return this.setState({ error: "please fill in username and password" });
      } else {
        return this.state.password.length === 0
          ? this.setState({ error: "password required" })
          : this.setState({ error: "username required" });
      }
    }

    // handle authentication here
    console.log("checking accounts");
    const loaded_accounts = this.state.ACCOUNTS.authenticated_accounts;
    const pw = this.state.password;
    const usr = this.state.username;
    const chk = loaded_accounts.filter(acc => {
      return usr === acc.username && pw === acc.password;
    });

    if (chk.length > 0) {
      console.log(chk[0].username + " authenticated.");
      if (this.props.accountDetail) {
        this.props.accountDetail(chk[0].username);
      }
      if (this.props.isAuthenticated) {
        // send true back to parent
        return this.props.isAuthenticated(true);
      }

      return this.setState({ AUTHENTICATED: true });
    } else {
      return this.setState({ error: "username or password invalid." });
    }
  }

  render() {
    // TODO: do a 4-digit pincode version
    if (this.props.pincode === true) {
      return (
        <div>
          <p>pincode version here</p>
        </div>
      );
    } else {
      // full local login version
      return (
        <div style={styles.page}>
          <form style={styles.root} onSubmit={this.handleSubmit}>
            <input
              style={styles.input}
              type="text"
              placeholder="username"
              value={this.state.username}
              onChange={this.handleUsernameChange}
            />
            <input
              style={styles.input}
              type="password"
              placeholder="password"
              value={this.state.password}
              onChange={this.handlePasswordChange}
            />

            <input style={styles.button} type="submit" value="Login" />
            <span style={styles.error}>{this.state.error}</span>
          </form>
        </div>
      );
    }
  }
}
