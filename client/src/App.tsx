import React from "react";
import "./App.scss";
import Header from "./components/Header";

function App() {
	return (
		<div className="App">
			<Header />
			<main>
				<a
					className="App-link"
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer"
				>
					Learn React
				</a>
			</main>
		</div>
	);
}

export default App;
