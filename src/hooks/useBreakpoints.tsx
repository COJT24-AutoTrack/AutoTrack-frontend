import { useMediaQuery } from "react-responsive";
import { breakpoints } from "@/styles/breakpoints";

export const usePCQuery = (): boolean =>
	useMediaQuery({ minWidth: parseInt(breakpoints.PC) });

export const useSPQuery = (): boolean =>
	useMediaQuery({ maxWidth: parseInt(breakpoints.SP) });
