﻿function VeryNativeScrollbar() {
  this.DIV = document.createElement('DIV');
  this.DIV.className = 'ht_virtual_scroller';
  this.DIV.style.display = 'none';
  this.DIV.style.position = 'fixed';
  this.DIV.style.background = 'yellow'; //debug
  this.systemScrollbarSize = null;
  this.positionable = null;

  this.innerDIV = document.createElement('DIV');

  this.DIV.appendChild(this.innerDIV);
  document.body.appendChild(this.DIV);

  this.DIV.addEventListener('scroll', this.onScroll.bind(this));
}

VeryNativeScrollbar.prototype.onScroll = function () {
  if (this.callback) {
    this.callback();
  }
};

VeryNativeScrollbar.prototype.setTop = function (value) {
  this.DIV.style.display = 'block';
  this.DIV.style.top = value + 'px';
};

VeryNativeScrollbar.prototype.setLeft = function (value) {
  this.DIV.style.display = 'block';
  this.DIV.style.left = value + 'px';
};

VeryNativeScrollbar.prototype.setWidth = function (value) {
  this.width = value;
  this.DIV.style.width = value + 'px';
  this.positionable = 'width';
  this.DIV.style.overflowX = 'scroll';
  this.DIV.style.overflowY = 'hidden';
  this.DIV.style.height = this.getScrollbarSize('height') + 'px';
};

VeryNativeScrollbar.prototype.setHeight = function (value) {
  this.height = value;
  this.DIV.style.height = value + 'px';
  this.positionable = 'height';
  this.DIV.style.overflowX = 'hidden';
  this.DIV.style.overflowY = 'scroll';
  this.DIV.style.width = this.getScrollbarSize('width') + 'px';
};

VeryNativeScrollbar.prototype.setScrolledWidth = function (value) {
  this.scrolledWidth = value;
  this.innerDIV.style.width = value + 'px';
  this.innerDIV.style.height = '1px';
};

VeryNativeScrollbar.prototype.setScrolledHeight = function (value) {
  this.scrolledHeight = value;
  this.innerDIV.style.height = value + 'px';
  this.innerDIV.style.width = '1px';
};

VeryNativeScrollbar.prototype.setPositionPx = function (value) {
  switch (this.positionable) {
    case 'width':
      this.DIV.scrollLeft = value;
      break;
    case 'height':
      this.DIV.scrollTop = value;
      break;
  }
};

VeryNativeScrollbar.prototype.getPositionPx = function () {
  if (this.positionable === 'width') {
    return this.DIV.scrollLeft;
  }
  else {
    return this.DIV.scrollTop;
  }
};

VeryNativeScrollbar.prototype.setPositionFactor = function (value) {
  switch (this.positionable) {
    case 'width':
      this.DIV.scrollLeft = this.scrolledWidth * value;
      break;
    case 'height':
      this.DIV.scrollTop = this.scrolledHeight * value;
      break;
  }
};

VeryNativeScrollbar.prototype.getPositionFactor = function () {
  if (this.positionable === 'width') {
    return this.DIV.scrollLeft / this.scrolledWidth;
  }
  else {
    return this.DIV.scrollTop / this.scrolledHeight;
  }
};

VeryNativeScrollbar.prototype.uppercaseFirst = function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
};

VeryNativeScrollbar.prototype.getScrollbarSize = function (prop) {
  if (this.systemScrollbarSize === null) {
    this.DIV.style[prop] = '30px'; //temporarily won't harm, will be overwritten where getScrollbarSize is used
    this.systemScrollbarSize = this.DIV['offset' + this.uppercaseFirst(prop)] - this.DIV['client' + this.uppercaseFirst(prop)];
  }
  return this.systemScrollbarSize;
};