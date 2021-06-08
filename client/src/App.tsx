import React from "react";
import "./App.scss";
import Header from "./components/Header";
import CodeGetter from './components/CodeGetter';

function App() {
	return (
		<div className="App">
			<Header />
			<main>
				<CodeGetter />
			</main>
		</div>
	);
}

export default App;
