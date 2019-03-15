import { mobileMaxWidth } from "../breakpoints";

export function isMobile() {
  return window.innerWidth < mobileMaxWidth;
}
