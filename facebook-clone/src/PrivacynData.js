import React from 'react';
import './Privacy.css';

function PrivacynData () {
	return (
		<div className="privacy">
			<div className="privacy__policy">
				<h2>Privacy Policy</h2>
				<p>
					Your data such as profile name, email, and .... is being collected directly from your facebook
					account.
				</p>
				<p>This data is purely used only for personalised usage when you intend to checkout this demo app.</p>
				<p>no right reserved - only for learning purposes!</p>
			</div>
			<div className="privacy__policy">
				<h2>To Delete your data with Us</h2>
				<p>
					Navigate to 'Settings' in your Facebook app.
				</p>
				<p>
					Click on 'Apps and Websites' inside the menu
				</p>
				<p>
					Select 'bfoaocke-clone' and scroll down and click on remove. For the second time in the dialog box to remove our access to your data.
				</p>
				<p>
					Thank you for using our app
				</p>
			</div>
		</div>
	);
}

export default PrivacynData;
