import React from 'react';
import './App.css';
import ZoomMtgEmbedded from '@zoomus/websdk/embedded';

function App() {
	const client = ZoomMtgEmbedded.createClient();

	var authEndpoint = 'http://localhost:4000';
	var sdkKey = 'r6GILtlSMOT4JZiP2bYw';
	var meetingNumber = '81759712532';
	var passWord = 'VsV1Gr';
	var role = 0;
	var userName = 'hashem';
	var userEmail = '';
	var registrantToken = '';
	var zakToken = '';

	function getSignature(e) {
		e.preventDefault();

		fetch(authEndpoint, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				meetingNumber: meetingNumber,
				role: role
			})
		})
			.then((res) => res.json())
			.then((response) => {
				startMeeting(response.signature);
			})
			.catch((error) => {
				console.error(error);
			});
	}

	function startMeeting(signature) {
		let meetingSDKElement = document.getElementById('meetingSDKElement');

		client
			.init({
				zoomAppRoot: meetingSDKElement,
				language: 'en-US',
				customize: {
					sharing: {
						popper: {
							disableDraggable: true
						}
					},
					video: {
						isResizable: false,
						popper: {
							disableDraggable: true
						}
					}
				}
			})
			.then(() => {
				client
					.join({
						signature: signature,
						sdkKey: sdkKey,
						meetingNumber: meetingNumber,
						password: passWord,
						userName: userName,
						userEmail: userEmail,
						tk: registrantToken,
						zak: zakToken
					})
					.then(() => {
						console.log('joined succesfully');
					})
					.catch((error) => {
						console.log(error);
					});
			})
			.catch((error) => {
				console.log(error);
			});
	}

	return (
		<div className="App">
			<main
				style={{
					height: '1000px',
					width: '100%',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					flexWrap: 'wrap'
				}}
			>
				<h1 style={{ width: '100%' }}>Zoom Meeting SDK Sample React</h1>

				{/* For Component View */}
				<div
					id="meetingSDKElement"
					style={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						flexWrap: 'wrap',
						maxHeight: '100vh',
						minHeight: '100vh',
						width: '100%'
					}}
				>
					{/* Zoom Meeting SDK Component View Rendered Here */}
				</div>

				<button onClick={getSignature}>Join Meeting</button>
			</main>
		</div>
	);
}

export default App;
