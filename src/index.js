/* eslint-disable no-unused-vars */
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import {
  standardTririgaLogin,
  fetchTriAppConfig,
  getAuthCheckerForCurrentApp,
} from "@tririga/tririga-react-components";
import { TririgaUXWebApp, AppErrorHandlers } from "./app";
import { createAppModel } from "./model";
import { UnauthorizedPage } from "./pages";
import { AppMsg } from "./utils";
import "./index.scss";
import * as serviceWorker from "./serviceWorker";

async function initApp() {
  const appConfig = await fetchTriAppConfig();
  const currentUser = await standardTririgaLogin();
  if (currentUser != null) {
    const authChecker = await getAuthCheckerForCurrentApp();
    if (authChecker.hasMinimumAppPermission()) {
      renderApp(currentUser, appConfig);
    } else {
      renderUnauthorizedAccess(currentUser);
    }
  }
}

async function renderUnauthorizedAccess(currentUser) {
  const rootElement = document.getElementById("root");
  rootElement.dir = currentUser.userDirection;
  await AppMsg.initMessages(currentUser.languageId);
  ReactDOM.render(<UnauthorizedPage />, rootElement);
}

async function renderApp(currentUser, appConfig) {
  const rootElement = document.getElementById("root");
  rootElement.dir = currentUser.userDirection;
  createAppModel(AppErrorHandlers.handleModelErrors);
  await AppMsg.initMessages(currentUser.languageId);
  ReactDOM.render(
    <BrowserRouter basename={appConfig.appPath}>
      <TririgaUXWebApp />
    </BrowserRouter>,
    rootElement
  );
  serviceWorker.register();
}

initApp();
