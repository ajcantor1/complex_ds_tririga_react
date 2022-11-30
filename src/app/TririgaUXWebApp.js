import React from "react";
import { createPortal } from "react-dom";
import { Route, Switch } from "react-router-dom";
import {CurrentUserPage, AllBuildingsPage, AssetsReviewPage } from "../pages";
import { Routes } from "../utils";
import { LoadingServices, MessageServices } from "../services";
import ShowAppMessages from "./ShowAppMessages";

const cssBase = "tririgaUXWebApp";

export default class TririgaUXWebApp extends React.PureComponent {
  componentDidMount() {
    MessageServices.addSubscriber(this.onMessageChange);
    LoadingServices.addSubscriber(this.onLoadingChange);
  }

  state = {
    message: null,
    loading: false,
  };

  render() {
    const { loading, message } = this.state;
    return (
      <div className={cssBase}>
        <Switch>
          <Route path={Routes.CURRENT_USER}>
            <CurrentUserPage />
          </Route>
          <Route exact path={Routes.BUILDINGS}>
            <AllBuildingsPage />
          </Route>
          <Route path="/assetsreview/:id">
            <AssetsReviewPage />
          </Route>
        </Switch>
      </div>
    );
  }

  onLoadingChange = (loading) => {
    this.setState({ loading });
  };

  onMessageChange = (message) => {
    this.setState({ message });
  };

  clearMessage = () => {
    MessageServices.clearMessage();
  };
}
