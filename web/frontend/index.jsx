/* import ReactDOM from "react-dom";

import App from "./App";
import { initI18n } from "./utils/i18nUtils";

// Ensure that locales are loaded before rendering the app
initI18n().then(() => {
  ReactDOM.render(<App />, document.getElementById("app"));
}); */
import App from "./App";
import { initI18n } from "./utils/i18nUtils";
import { createRoot } from 'react-dom/client';
const container = document.getElementById('app');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
initI18n().then(() => {
  root.render(<App/>);
});
