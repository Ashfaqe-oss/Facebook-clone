import React from 'react';
import './Widgets.css';

function Widgets() {
	return (
		<div className="widgets">
			<iframe
				title="widget"
				src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Ffacebook&tabs=timeline&width=250px&height=600px&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=383498646207530"
				width="255px"
				height="600px"
				style={{ border: 'none', overflow: 'hidden' }}
				scrolling="no"
				frameBorder="0"
				allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
			/>
		</div>
	);
}

export default Widgets;
// https://www.facebook.com/plugins/page/php?href=https%3A%2F%2Fwww.facebook.com%2FCleverProgrammerr%2F&tabs=timeline&width=340&height=1500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId
//https://graph.facebook.com/v9.0/oembed_page?url=https%3A%2F%2Fwww.facebook.com%2FCDC&access_token=383498646207530|69a67fac9b70814d6e4c8eda97b20e9d
