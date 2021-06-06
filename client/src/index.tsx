import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import AuthWrapper from "./components/AuthWrapper";
import WSWrapper from "./components/WSWrapper";
import App from "./App";

ReactDOM.render(
	<React.StrictMode>
		<AuthWrapper>
			<WSWrapper>
				<App />
			</WSWrapper>
		</AuthWrapper>
	</React.StrictMode>,
	document.getElementById("root")
);
