import React from "react";

const HighlightText = ({ text, gradient }) => {
	return (
		<span className={`font-bold ${gradient} text-transparent bg-clip-text`}>
			{text}
		</span>
	);
};

export default HighlightText;
