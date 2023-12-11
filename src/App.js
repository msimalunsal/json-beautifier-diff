import React, { useState } from 'react';
import jsondiffpatch from 'jsondiffpatch';
import './App.css';
import { RiEdit2Line } from 'react-icons/ri'; // Edit ikonunu temsil eden paketten bir icon örneği alındı


function App() {
	const [json1, setJson1] = useState('');
	const [json1header, setJson1Header] = useState('JSON 1');
	const [json2, setJson2] = useState('');
	const [json2header, setJson2Header] = useState('JSON 2');
	const [differences, setDifferences] = useState('');

	const beautifyJSON = (json) => {
		try {
			const parsed = JSON.parse(json);
			return JSON.stringify(parsed, null, 2);
		} catch (error) {
			return 'Invalid JSON';
		}
	};

	const compareJSON = () => {
		if (isValidJSON(json1) && isValidJSON(json2)) {
			const delta = jsondiffpatch.diff(JSON.parse(json1), JSON.parse(json2));
			const formattedDelta = jsondiffpatch.formatters.html.format(delta, JSON.parse(json1));
			setDifferences(formattedDelta);
		}
	};

	const isValidJSON = (jsonString) => {
		try {
			JSON.parse(jsonString);
			return true;
		} catch (error) {
			return false;
		}
	};

	const [isEditingJSON1Header, setIsEditingJSON1Header] = useState(false);
	const [isEditingJSON2Header, setIsEditingJSON2Header] = useState(false);

	const handleEditJSON1Header = () => {
		setIsEditingJSON1Header(true);
	};

	const handleSaveJSON1Header = () => {
		setIsEditingJSON1Header(false);
	};

	const handleEditJSON2Header = () => {
		setIsEditingJSON2Header(true);
	};

	const handleSaveJSON2Header = () => {
		setIsEditingJSON2Header(false);
	};

	return (
		<div className="App">
			<div className="header">
				<h1>JSON Beautify And Diff 👋</h1>
			</div>
			<div className="row">
				<div className="split left">
					<h2>
						{isEditingJSON1Header ? (
							<input
								type="text"
								value={json1header}
								onChange={(e) => setJson1Header(e.target.value)}
								onBlur={handleSaveJSON1Header}
								onKeyDown={(e) => {
									if (e.key === 'Enter') {
									  e.preventDefault();
									  handleSaveJSON1Header();
									}
								  }}
							/>
						) : (
							<>
								{json1header}
								<RiEdit2Line
									className="edit-icon"
									onClick={handleEditJSON1Header}
									style={{ cursor: 'pointer', marginLeft: '5px' }}
								/>
							</>
						)}
					</h2>
					<textarea value={json1} onChange={(e) => setJson1(e.target.value)}></textarea>
					<button className="beautify-json-button" onClick={(e) => setJson1(beautifyJSON(json1))}>Beautify JSON</button>
				</div>
				<div className="split right">
					<h2>
						{isEditingJSON2Header ? (
							<input
								type="text"
								value={json2header}
								onChange={(e) => setJson2Header(e.target.value)}
								onBlur={handleSaveJSON2Header}
								onKeyDown={(e) => {
									if (e.key === 'Enter') {
									  e.preventDefault();
									  handleSaveJSON2Header();
									}
								  }}
							/>
						) : (
							<>
								{json2header}
								<RiEdit2Line
									className="edit-icon"
									onClick={handleEditJSON2Header}
									style={{ cursor: 'pointer', marginLeft: '5px' }}
								/>
							</>
						)}
					</h2>
					<textarea value={json2} onChange={(e) => setJson2(e.target.value)}></textarea>
					<button className="beautify-json-button" onClick={(e) => setJson2(beautifyJSON(json2))}>Beautify JSON</button>
				</div>
			</div>
			<div className="row">
				<div className="differences">
					{differences && (
						<>
							<h2>Differences</h2>
							<div dangerouslySetInnerHTML={{ __html: differences }}></div>
						</>
					)}
				</div>
			</div>
		</div>
	);
}

export default App;
