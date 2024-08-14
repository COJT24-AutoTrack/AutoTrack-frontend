export const breakpoints = {
	SP: "599px",
	SPandTB: "1023px",
	TBandPC: "600px",
	PC: "1024px",
};

export const media = {
	SP: `@media (max-width: ${breakpoints.SP})`,
	SPandTB: `@media (max-width: ${breakpoints.SPandTB})`,
	TBandPC: `@media (min-width: ${breakpoints.TBandPC})`,
	PC: `@media (min-width: ${breakpoints.PC})`,
};
