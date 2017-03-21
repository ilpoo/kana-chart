'use strict';
import React from "react";

export default class Menu extends React.Component{
  mobile = false;
  swiping = false;
  open = false;
  navWidth = 0;
  navPosition = 0;
  minPosition = 0;
  maxPosition = 0;
  touchStart = 0;
  fastSwipe = true;
  fastSwipeDetector = null;

  handleSwipeStart = e => {
    if(e.touches.length === 1 && this.mobile){
      if(
        ( this.open && e.touches.item(0).clientX > this.navWidth) ||
        (!this.open && e.touches.item(0).clientX <= 20)
      ){
        this.swiping = true;
        this.refs.backdrop.style.transition = 
        this.refs.toggle.style.transition = 
        this.refs.nav.style.transition = 
        this.refs.line1.style.transition = 
        this.refs.line3.style.transition = 'initial';
        this.fastSwipeDetector = setTimeout(()=>{
          this.fastSwipe = false;
        },1000);
      }
    }
  }

  handleSwipeMove = e => {
    if(this.swiping){
      this.setNavPosition(Math.min(0, e.touches.item(0).clientX - this.navWidth));
    }
  }

  handleSwipeEnd = e => {
    if(this.swiping){
      clearTimeout(this.fastSwipeDetector);
      this.swiping = false;
      this.refs.backdrop.style.transition = 
      this.refs.toggle.style.transition = 
      this.refs.nav.style.transition = 
      this.refs.line1.style.transition = 
      this.refs.line3.style.transition = '';
      if     (this.fastSwipe && !this.open && this.navPosition*-1/this.navWidth < .9) this.openMenu();
      else if(this.fastSwipe && this.open && this.navPosition*-1/this.navWidth > .1) this.closeMenu();
      else if(this.navPosition*-1/this.navWidth < .5) this.openMenu();
      else this.closeMenu();
      this.fastSwipe = true;
    }
  }

  setNavPosition = position => {
    this.navPosition = position;
    const percentage = 1 - (this.maxPosition - position) / (this.maxPosition - this.minPosition);
    const transition={
      visibility: percentage > 0 ? 'visible' : 'hidden'
      opacity: .4 * percentage,
      position: position === -this.navWidth ? "-100%" : `${position}px`,
      rotate: -180 * percentage,
      rotate2: 45 * percentage,
      translateX: 33 * percentage,
      translateY: 100 * percentage,
      scaleX: .3 * percentage,
    }
    this.refs.nav.style.transform = `translateX(${transition.position})`;
    this.refs.backdrop.style.visibility = transition.visibility;
    this.refs.backdrop.style.opacity = transition.opacity;
    this.refs.toggle.style.transform = `rotate(${transition.rotate}deg)`;
    this.refs.line1.style.transform = `rotate(${transition.rotate2}deg) translate(${transition.translateX}%, ${-transition.translateY}%) scaleX(${1-(transition.scaleX)})`;
    this.refs.line3.style.transform = `rotate(${-transition.rotate2}deg) translate(${transition.translateX}%, ${transition.translateY}%) scaleX(${1-(transition.scaleX)})`;
  }

  openMenu = () => {
    this.open = true;
    this.setNavPosition(0);
  }

  closeMenu = () => {
    this.open = false;
    this.setNavPosition(-this.navWidth);
  }

  toggleMenu = () => {
    this.open ? this.closeMenu() : this.openMenu();
  }

  isMobile = () => {
    return window.innerWidth < 800;
  }

  resizeHandler = () => {
    const mobile = this.isMobile();
    if(!mobile && this.mobile){
      this.refs.toggle.style.transition = 
      this.refs.toggle.style.transform = 
      this.refs.nav.style.transition = 
      this.refs.line1.style.transition = 
      this.refs.line1.style.transform = 
      this.refs.line3.style.transition =
      this.refs.line3.style.transform =
      this.refs.nav.style.transform = 
      this.refs.backdrop.style.display = 
      this.refs.backdrop.style.transition = 
      this.refs.backdrop.style.opacity =  '';
    }
    this.mobile = mobile;
  }

  componentDidMount(){
    this.mobile = this.isMobile();
    this.navWidth = this.refs.nav.getBoundingClientRect().width;
    this.navPosition = -this.navWidth;
    this.minPosition = -this.navWidth;

    this.refs.backdrop.addEventListener('click', this.toggleMenu);
    this.refs.toggle.addEventListener('click', this.toggleMenu);
    window.addEventListener('resize', this.resizeHandler);
    window.addEventListener('touchstart', this.handleSwipeStart);
    window.addEventListener('touchmove', this.handleSwipeMove);
    window.addEventListener('touchend', this.handleSwipeEnd);
  }

  render(){
    return (
      <div class="react-swipe-menu" ref="container">
        <div class="react-swipe-menu-backdrop" ref="backdrop"></div>
        <nav class="react-swipe-menu-navigation" ref="nav">
         {this.props.children}
        </nav>
        <div class="react-swipe-menu-toggle" ref="toggle">
          <div class="react-swipe-menu-line" ref="line1"></div>
          <div class="react-swipe-menu-line" ref="line2"></div>
          <div class="react-swipe-menu-line" ref="line3"></div>
        </div>
      </div>
    );
  }
}
