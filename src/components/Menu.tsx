import React, { ReactNode } from "react";
import styled from "@emotion/styled";
import { isMobile } from "../helpers/isMobile";
import { mobileMaxWidth, tabletMaxWidth } from "../breakpoints";

const Container = styled("div")`
  width: 0;
  height: 0;
  top: 0;
  left: 0;
  position: absolute;
`;

const Backdrop = styled("div")`
  width: 100vw;
  height: 100vh;
  background-color: black;
  opacity: 0;
  visibility: hidden;
  transition: all .4s;
`;

const Navigation = styled("div")`
  position: fixed;
  top: 0;
  left: 0;
  width: 80%;
  min-width: 300px;
  max-width: 350px;
  height: 100vh;
  background: var(--theme-color);
  color: white;
  font-size: 16px;
  transform: translateX(-100%);
  padding-top: 60px;
  transition: transform .4s;
  user-select: none;
  overflow-y: auto;

  @media (min-width: ${mobileMaxWidth}px) {
    position: absolute;
    top: 50px;
    left: 0;
    width: 300px;
    transform: translateX(0);
    background-color: transparent;
    color: black;
    height: calc(100vh - 50px);

    & h1 {
      margin-left: 10px;
    }
  }

  @media (min-width: ${tabletMaxWidth}px) {
    left: calc(50vw - ${tabletMaxWidth}px / 2 + 10px);
  }
`;

const Toggle = styled("div")`
  font-size: 50px;
  width: 1em;
  height: 1em;
  position: absolute;
  top: 0;
  left: 0;
  cursor: pointer;
  transition: all .4s;

  @media (min-width: ${mobileMaxWidth}px) {
    display: none;
  }
`;

const Line = styled("div")`
  position: absolute;
  background: white;
  width: .64em;
  height: 3px;
  left: .18em;
  transition: all .4s;

  &:first-of-type{
    top: .22em;
  }

  &:nth-of-type(2) {
    top: .468em;
  }

  &:last-of-type{
    top: .71em;
  }
`;

export interface MenuProps {
  children: ReactNode;
}

export default class Menu extends React.Component<
  MenuProps,
  {}
> {
  mobile = false;
  swiping = false;
  open = false;
  navWidth = 0;
  navPosition = 0;
  minPosition = 0;
  maxPosition = 0;
  touchStart = 0;
  fastSwipe = true;
  fastSwipeDetector = setTimeout(() => {}, 0);

  container = React.createRef<HTMLDivElement>();
  nav = React.createRef<HTMLDivElement>();
  backdrop = React.createRef<HTMLDivElement>();
  toggle = React.createRef<HTMLDivElement>();
  line1 = React.createRef<HTMLDivElement>();
  line2 = React.createRef<HTMLDivElement>();
  line3 = React.createRef<HTMLDivElement>();

  private handleSwipeStart = (
    e: TouchEvent,
  ) => {
    if (e.touches.length === 1 && this.mobile) {
      if (
        ( this.open && e.touches.item(0)!.clientX > this.navWidth) ||
        (!this.open && e.touches.item(0)!.clientX <= 20)
      ) {
        this.swiping = true;
        this.backdrop.current!.style.transition =
          this.toggle.current!.style.transition =
          this.nav.current!.style.transition =
          this.line1.current!.style.transition =
          this.line3.current!.style.transition = "initial";
        this.fastSwipeDetector = setTimeout(() => {
          this.fastSwipe = false;
        }, 1000);
      }
    }
  }

  private handleSwipeMove = (
    e: TouchEvent,
  ) => {
    if (this.swiping) {
      this.setNavPosition(
        Math.min(0, e.touches.item(0)!.clientX - this.navWidth),
      );
    }
  }

  private handleSwipeEnd = () => {
    if (this.swiping) {
      clearTimeout(this.fastSwipeDetector);
      this.swiping = false;
      this.backdrop.current!.style.transition =
      this.toggle.current!.style.transition =
      this.nav.current!.style.transition =
      this.line1.current!.style.transition =
      this.line3.current!.style.transition = '';

      const menuOpenness = this.navPosition * -1 / this.navWidth;
      if (
        this.fastSwipe &&
        !this.open &&
        menuOpenness < .9
      ) {
        this.openMenu();
      }
      else if (
        this.fastSwipe &&
        this.open &&
        menuOpenness > .1
      ) {
        this.closeMenu();
      }
      else if (
        menuOpenness < .5
      ) {
        this.openMenu();
      }
      else {
        this.closeMenu();
      }

      this.fastSwipe = true;
    }
  }

  private setNavPosition = (
    position: number,
  ) => {
    this.navPosition = position;
    const percentage = 1 - (this.maxPosition - position) / (this.maxPosition - this.minPosition);
    const transition = {
      visibility: percentage > 0 ? "visible" : "hidden",
      opacity: .4 * percentage,
      position: position === -this.navWidth ? "-100%" : `${position}px`,
      rotate: -180 * percentage,
      rotate2: 45 * percentage,
      translateX: 33 * percentage,
      translateY: 100 * percentage,
      scaleX: .3 * percentage,
    }
    this.nav.current!.style.transform = `translateX(${transition.position})`;
    this.backdrop.current!.style.visibility = transition.visibility;
    this.backdrop.current!.style.opacity = transition.opacity.toString();
    this.toggle.current!.style.transform = `rotate(${transition.rotate}deg)`;
    this.line1.current!.style.transform = `rotate(${transition.rotate2}deg) translate(${transition.translateX}%, ${-transition.translateY}%) scaleX(${1-(transition.scaleX)})`;
    this.line3.current!.style.transform = `rotate(${-transition.rotate2}deg) translate(${transition.translateX}%, ${transition.translateY}%) scaleX(${1-(transition.scaleX)})`;
  }

  private openMenu = () => {
    this.open = true;
    this.setNavPosition(0);
  }

  private closeMenu = () => {
    this.open = false;
    this.setNavPosition(-this.navWidth);
  }

  private toggleMenu = () => {
    this.open ? this.closeMenu() : this.openMenu();
  }

  private resizeHandler = () => {
    const mobile = isMobile();
    if (!mobile && this.mobile) {
      this.toggle.current!.style.transition =
      this.toggle.current!.style.transform =
      this.nav.current!.style.transition =
      this.line1.current!.style.transition =
      this.line1.current!.style.transform =
      this.line3.current!.style.transition =
      this.line3.current!.style.transform =
      this.nav.current!.style.transform =
      this.backdrop.current!.style.display =
      this.backdrop.current!.style.transition =
      this.backdrop.current!.style.opacity =  '';
    }
    this.mobile = mobile;
  }

  componentDidMount() {
    this.mobile = isMobile();
    this.navWidth = this.nav.current!.getBoundingClientRect().width;
    this.navPosition = -this.navWidth;
    this.minPosition = -this.navWidth;

    this.backdrop.current!.addEventListener("click", this.toggleMenu);
    this.toggle.current!.addEventListener("click", this.toggleMenu);
    window.addEventListener("resize", this.resizeHandler);
    window.addEventListener("touchstart", this.handleSwipeStart, { passive: true });
    window.addEventListener("touchmove", this.handleSwipeMove, { passive: true });
    window.addEventListener("touchend", this.handleSwipeEnd, { passive: true });
  }

  render() {
    return (
      <Container ref = {this.container}>
        <Backdrop ref = {this.backdrop}/>
        <Navigation ref = {this.nav}>
          {this.props.children}
        </Navigation>
        <Toggle ref = {this.toggle}>
          <Line ref = {this.line1}/>
          <Line ref = {this.line2}/>
          <Line ref = {this.line3}/>
        </Toggle>
      </Container>
    );
  }
}
