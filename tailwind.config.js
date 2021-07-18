// tailwind.config.js
const {
	colors,
	borderRadius,
	maxWidth,
	width,
	scale,
	height,
	minWidth,
	maxHeight,
} = require("tailwindcss/defaultTheme");

module.exports = {
	theme: {
		extend: {
			colors: {
				teal: {
					...colors.teal,
					300: "#45E2E2",
					500: "#2BCACA",
					700: "#20B1B1",
				},
				pink: {
					...colors.pink,
					300: "#FF9DC0",
					500: "#FF7CAB",
					700: "#EF6093",
				},
				orange: {
					...colors.orange,
					500: "#F5B100",
				},
				bgGray: {
					100: "#F1F8FF",
					200: "#E2ECF9",
					300: "#D1DDEA",
					400: "#C7D3E0",
					500: "#BEC7D2",
					900: "#B3BECC",
				},
				textGray: {
					100: "#94A4B7",
					200: "#798594",
					300: "#626D7B",
					400: "#48607C",
					500: "#35475C",
					700: "#212D3B",
				},
				warning: {
					500: "#FFF4DA",
				},
				twitter: {
					500: "#1DA1F2",
				},
			},
			borderRadius: {
				...borderRadius,
				xl: "1rem",
			},
			maxWidth: {
				...maxWidth,
				xs: "16rem",
				xxs: "12rem",
			},
			minWidth: {
				...minWidth,
				1: "0.25rem",
				2: "0.5rem",
				3: "0.75rem",
				4: "1rem",
				6: "1.5rem",
				8: "2rem",
				10: "2.5rem",
				12: "3rem",
				16: "4rem",
				20: "5rem",
				24: "6rem",
				28: "7rem",
				32: "8rem",
				36: "9rem",
				40: "10rem",
				44: "11rem",
				48: "12rem",
				52: "13rem",
				56: "14rem",
				60: "15rem",
				64: "16rem",
				72: "18rem",
				80: "20rem",
				96: "24rem",
			},
			width: {
				...width,
				"w-max": "max-content",
			},
			height: {
				...height,
				72: "18rem",
				80: "20rem",
				96: "24rem",
			},
			maxHeight: { ...maxHeight },
			boxShadow: {
				r: "0.5px 0px 0.5px 0px rgba(0, 0, 0, 0.25)",
			},
			cursor: {
				help: "help",
			},
			opacity: {
				10: "0.1",
				22: "0.22",
			},
			scale: {
				...scale,
				102: "1.02",
			},
		},
	},
	variants: {},
	plugins: [],
};
