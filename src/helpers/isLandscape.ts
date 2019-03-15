import { mobileMaxWidth } from "../breakpoints";

export function isLandscape() {
  return (
    window.innerWidth < mobileMaxWidth
    && window.innerWidth > window.innerHeight
  );
}
