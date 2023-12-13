import React from 'react';

import './App.css';
import { ZoomMtg } from '@zoomus/websdk';

ZoomMtg.setZoomJSLib('https://source.zoom.us/2.18.2/lib', '/av');

ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();
// loads language files, also passes any error messages to the ui
ZoomMtg.i18n.load('en-US');
ZoomMtg.i18n.reload('en-US');

function App() {
	var authEndpoint = 'http://localhost:4000';
	var sdkKey = 'r6GILtlSMOT4JZiP2bYw';
	var meetingNumber = '81759712532';
	var passWord = 'VsV1Gr';
	var role = 0;
	var userName = 'hashem';
	var userEmail = '';
	var registrantToken = '';
	var zakToken = '';
	var leaveUrl = 'http://localhost:3000';

	async function getSignature(e) {
		e.preventDefault();

		await fetch(authEndpoint, {
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
		document.getElementById('zmmtg-root').style.display = 'block';

		ZoomMtg.init({
			leaveUrl: leaveUrl,
			success: (success) => {
				console.log(success);

				ZoomMtg.join({
					signature: signature,
					sdkKey: sdkKey,
					meetingNumber: meetingNumber,
					passWord: passWord,
					userName: userName,
					userEmail: userEmail,
					tk: registrantToken,
					zak: zakToken,
					success: (success) => {
						console.log(success);
					},
					error: (error) => {
						console.log(error);
					}
				});
			},
			error: (error) => {
				console.log(error);
			}
		});
	}

	return (
		<div className="App">
			<main>
				<h1>Zoom Meeting SDK Sample React</h1>

				<button onClick={getSignature}>Join Meeting</button>
			</main>
		</div>
	);
}

export default App;
