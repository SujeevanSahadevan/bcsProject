import React from "react";
import { Helmet } from "react-helmet";

const Meta = ({ title, description, keywords }) => {
	return (
		<Helmet>
			<title>{title}</title>
			<meta name="description" content={description} />
			<meta name="keywords" content={keywords} />
		</Helmet>
	);
};

Meta.defaultProps = {
	title: "Welcome to EasyBuy",
	description: "Your best place to shop",
	keywords: "Elctronics,Gaming Consoles,Phones",
};

export default Meta;
