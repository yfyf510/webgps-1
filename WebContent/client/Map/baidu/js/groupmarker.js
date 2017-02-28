﻿(function(){   
	ua = navigator.userAgent.toLowerCase(),   
	check = function(r){   
		return r.test(ua);   
	},
	isOpera = check(/opera/),
	isIE = !isOpera && check(/msie/),   
	isIE7 = isIE && check(/msie 7/),   
	isIE8 = isIE && check(/msie 8/),
	isIE6 = isIE && check(/msie 6/)
})()
GroupMarker.prototype = new BMap.Overlay();//new google.maps.OverlayView();


//获取聚合的图片 hw2016-4-9
function getIconType(count)
{
	var image = 0;
	if(count < 100)
	{
		image = 0;
	}
	else if(count >= 100 && count < 200)
	{
		image = 2;
	}
	else
	{
		image = 3;
	}
	
	return image;
} 
function getIconWidth(count)
{
	var iconWidth = 53;
	var iconType = getIconType(count);
	if(0 == iconType)
	{
		iconWidth = 53;
	}
	else if(1 == iconType)
	{
		iconWidth = 53;
	}
	else if(2 == iconType)
	{
		iconWidth = 66;
	}
	else if(3 == iconType)
	{
		iconWidth = 78;
	}
	else
	{
		iconWidth = 90;
	}
	
	return iconWidth;
};

function getIconHeight(count)
{
	var iconHeight = 53;
	var iconType = getIconType(count);
	if(0 == iconType)
	{
		iconHeight = 52;
	}
	else if(1 == iconType)
	{
		iconHeight = 52;
	}
	else if(2 == iconType)
	{
		iconHeight = 65;
	}
	else if(3 == iconType)
	{
		iconHeight = 77;
	}
	else
	{
		iconHeight = 89;
	}

	return iconHeight;
};

function getGroupIcon(count){
	var image = null;
	var iconType = getIconType(count);
	if(0 == iconType)
	{
		image = GFRAME.imagePath + "group/" + "m0.png";
	}
	else if(1 == iconType)
	{
		image = GFRAME.imagePath + "group/" + "m1.png";
	}
	else if(2 == iconType)
	{
		image = GFRAME.imagePath + "group/" + "m2.png";
	}
	else if(3 == iconType)
	{
		image = GFRAME.imagePath + "group/" + "m3.png";
	}
	else
	{
		image = GFRAME.imagePath + "group/" + "m4.png";
	}

	return image;
};

function GroupMarker(opts) {
    this.isVisible = false;
    this.ICON_WIDTH = getIconWidth(opts.text);
    this.ICON_HEIGHT = getIconHeight(opts.text);
    this.map_ = opts.map;
    this.latlng_ = opts.position;
  //  if ((typeof opts.icon) != "undefined") {
   		this.icon_ = getGroupIcon(opts.text);
  //	} else {
  //		this.icon_ = null;
 // 	}
    this.text_ = opts.text || "";
    this.beforeNormalPopupText_ = null;
    this.showpop = opts.showpop || false;
    this.isInitialize = false;
    var agt = navigator.userAgent.toLowerCase();
    var is_ie_ = ((agt.indexOf("msie") != -1) && (agt.indexOf("opera") == -1));
    var yPos = 0;
    this.popupImgSrc_ = GFRAME.imagePath + "marker.png";
    this.popupTbl = {};
    this.popupTbl.leftTop = {
        "left": 0,
        "top": yPos,
        "width": 19,
        "height": 7
    };
    this.popupTbl.leftTopFill = {
        "left": 16,
        "top": 3,
        "width": 4,
        "height": 4
    };
    this.popupTbl.rightTop = {
        "left": 19,
        "top": yPos,
        "width": 10,
        "height": 7
    };
    this.popupTbl.rightTopImg = {
        "left": -125,
        "top": 0,
        "width": 10,
        "height": 7
    };
    this.popupTbl.centerTopFill = {
        "left": 19,
        "top": yPos,
        "width": 0,
        "height": 7
    };
    yPos += this.popupTbl.leftTop.height;
    this.popupTbl.leftBody = {
        "left": 11,
        "top": yPos,
        "width": 8,
        "height": 0
    };
    this.popupTbl.centerBodyFill = {
        "left": 19,
        "top": yPos,
        "width": 40,
        "height": 15
    };
    this.popupTbl.rightBody = {
        "left": 19,
        "top": yPos,
        "width": 9,
        "height": 0
    };
    this.popupTbl.leftBottom = {
        "left": 0,
        "top": yPos,
        "width": 20,
        "height": 21
    };
    this.popupTbl.leftBottomImg = {
        "left": 0,
        "top": -13,
        "width": 20,
        "height": 21
    };
    this.popupTbl.leftBottomFill = {
        "left": 16,
        "top": 0,
        "width": 4,
        "height": 6
    };
    this.popupTbl.rightBottom = {
        "left": 19,
        "top": yPos,
        "width": 10,
        "height": 7
    };
    this.popupTbl.rightBottomImg = {
        "left": -125,
        "top": -13,
        "width": 10,
        "height": 7
    };
    this.popupTbl.centerBottomFill = {
        "left": 19,
        "top": (yPos + (is_ie_ ? -1: 0)),
        "width": 0,
        "height": (6 + (is_ie_ ? 1: 0))
    };
    if(document.getElementById('dummyTextNode')) {
			this.dummyTextNode = document.getElementById('dummyTextNode');
		}
		else{
			var dummyTextNode = document.createElement("div");
			dummyTextNode.id = 'dummyTextNode';
			dummyTextNode.style.display = 'none';
			//google地图
			//this.map_.getDiv().appendChild(dummyTextNode);
			//百度地图
			this.map_.getContainer().appendChild(dummyTextNode);
			this.dummyTextNode = dummyTextNode;
			dummyTextNode =null;
		}
    this.setMap(this.map_);
};

//GroupMarker.prototype.onAdd = function() {
GroupMarker.prototype.initialize = function(map) {
    var spanContainer = document.createElement("span");
    this.container_ = document.createElement("div");
    this.iconContainer = document.createElement("img");
    this.iconContainer.style.width = this.ICON_WIDTH + "px";
    this.iconContainer.style.height = this.ICON_HEIGHT + "px";
    this.iconContainer.style.position = "absolute";
    this.container_.style.position = "absolute";
    
    if (this.icon_ != null) {
    		this.iconContainer.src = this.icon_;
  	} else {
  		this.iconContainer.style.visibility = "hidden";
  	}
  	if (!this.showpop) this.container_.style.visibility = "hidden";
    this.makeNormalPopup_();
    this.isInitialize = true;
    
    spanContainer.appendChild(this.iconContainer);
    spanContainer.appendChild(this.container_);
    var panes = this.map_.getPanes();
    panes.floatShadow.appendChild(spanContainer);
    return spanContainer;
};

GroupMarker.prototype.setMap = function(nativeMap){
	if(nativeMap==null)
		this.map_.removeOverlay(this);
	else{
		nativeMap.addOverlay(this);
	}
};

GroupMarker.prototype.draw = function() {
    this.redrawNormalPopup_(this.text_);
};

//GroupMarker.prototype.onRemove = function() {
//	if (this.container_) {
//    this.container_.parentNode.removeChild(this.container_);
//  }
//  if (this.iconContainer) {
//    this.iconContainer.parentNode.removeChild(this.iconContainer);
//  }
//};

GroupMarker.prototype.makeNormalPopup_ = function() {
    this.leftTop_ = this.makeImgDiv_(this.popupImgSrc_, this.popupTbl.leftTop);
    this.leftTop_.appendChild(this.fillDiv_(this.popupTbl.leftTopFill));
    this.container_.appendChild(this.leftTop_);
    this.leftBody_ = this.fillDiv_(this.popupTbl.leftBody);
    this.leftBody_.style.borderWidth = "0 0 0 1px";
    this.leftBody_.style.borderStyle = "none none none solid";
    this.leftBody_.style.borderColor = "#000000";
    this.container_.appendChild(this.leftBody_);
    this.leftBottom_ = this.makeImgDiv_(this.popupImgSrc_, this.popupTbl.leftBottomImg);
    this.leftBottom_.style.left = this.popupTbl.leftBottom.left + "px";
    this.leftBottom_.style.top = this.popupTbl.leftBottom.top + "px";
    this.leftBottom_.style.width = this.popupTbl.leftBottom.width + "px";
    this.leftBottom_.style.height = this.popupTbl.leftBottom.height + "px";
    this.leftBottom_.appendChild(this.fillDiv_(this.popupTbl.leftBottomFill));
    this.container_.appendChild(this.leftBottom_);
    this.bodyContainer_ = document.createElement("div");
    this.bodyContainer_.style.position = "absolute";
    this.bodyContainer_.style.backgroundColor = "#FFF";
    this.bodyContainer_.style.overflow = "hidden";
    this.bodyContainer_.style.left = this.popupTbl.centerBodyFill.left + "px";
    this.bodyContainer_.style.top = this.popupTbl.centerBodyFill.top + "px";
    this.bodyContainer_.style.width = this.popupTbl.centerBodyFill.width + "px";
    this.bodyContainer_.style.height = this.popupTbl.centerBodyFill.height + "px";
    this.container_.appendChild(this.bodyContainer_);
    this.rightTop_ = this.makeImgDiv_(this.popupImgSrc_, this.popupTbl.rightTopImg);
    this.rightTop_.style.left = this.popupTbl.rightTop.left + "px";
    this.rightTop_.style.top = this.popupTbl.rightTop.top + "px";
    this.rightTop_.style.width = this.popupTbl.rightTop.width + "px";
    this.rightTop_.style.height = this.popupTbl.rightTop.height + "px";
    this.container_.appendChild(this.rightTop_);
    this.rightBottom_ = this.makeImgDiv_(this.popupImgSrc_, this.popupTbl.rightBottomImg);
    this.rightBottom_.style.left = this.popupTbl.rightBottom.left + "px";
    this.rightBottom_.style.top = this.popupTbl.rightBottom.top + "px";
    this.rightBottom_.style.width = this.popupTbl.rightBottom.width + "px";
    this.rightBottom_.style.height = this.popupTbl.rightBottom.height + "px";
    this.container_.appendChild(this.rightBottom_);
    this.rightBody_ = this.fillDiv_(this.popupTbl.rightBody);
    this.rightBody_.style.borderWidth = "0 1px 0 0";
    this.rightBody_.style.borderStyle = "none solid none none";
    this.rightBody_.style.borderColor = "#000000";
    this.container_.appendChild(this.rightBody_);
    this.centerBottom_ = this.fillDiv_(this.popupTbl.centerBottomFill);
    this.centerBottom_.style.borderWidth = "0 0 1px 0";
    this.centerBottom_.style.borderStyle = "none none solid none";
    this.centerBottom_.style.borderColor = "#000000";
    this.container_.appendChild(this.centerBottom_);
    this.centerTop_ = this.fillDiv_(this.popupTbl.centerTopFill);
    this.centerTop_.style.borderColor = "#000000";
    this.centerTop_.style.borderWidth = "1px 0 0 0";
    this.centerTop_.style.borderStyle = "solid none none none";
    this.container_.appendChild(this.centerTop_);
};
GroupMarker.prototype.redrawNormalPopup_ = function(text) {
	if(!this.isInitialize){
		return;
	}
    	if (this.beforeNormalPopupText_ != text) {
        while (true) {
        	if (this.bodyContainer_.firstChild != null) {
            this.bodyContainer_.removeChild(this.bodyContainer_.firstChild);
          } else {
          	break;
          }
        }
        this.bodyContainer_.innerHTML = text;
        if (this.isIE_() == false && this.bodyContainer_.hasChildNodes) {
            if (this.bodyContainer_.firstChild.nodeType == 1) {
                this.bodyContainer_.firstChild.style.margin = 0;
            }
        }
        var offsetBorder = this.isIE_() ? 2: 0;
        var cSize = this.getHtmlSize_(text);
        var rightX = this.popupTbl.leftTop.width + cSize.width;
        this.leftBottom_.style.top = (cSize.height + this.popupTbl.leftBody.top) + "px";
        this.leftBody_.style.height = cSize.height + "px";
        this.bodyContainer_.style.width = cSize.width + "px";
        this.bodyContainer_.style.height = cSize.height + "px";
        this.bodyContainer_.style.top = this.popupTbl.leftBody.top;
        this.rightTop_.style.left = rightX + "px";
        this.rightBottom_.style.left = this.rightTop_.style.left;
        this.rightBottom_.style.top = this.leftBottom_.style.top;
        this.rightBody_.style.left = rightX + "px";
        this.rightBody_.style.height = this.leftBody_.style.height;
        this.centerBottom_.style.top = this.leftBottom_.style.top;
        this.centerBottom_.style.width = cSize.width + "px";
        this.centerTop_.style.width = cSize.width + "px";
        this.size_ = {
            "width": (rightX + this.popupTbl.rightTop.width),
            "height": (cSize.height + this.popupTbl.leftTop.height + this.popupTbl.leftBottom.height)
        };
        this.container_.style.width = this.size_.width + "px";
        this.container_.style.height = this.size_.height + "px";
    }
    this.setPosition(this.latlng_);
    this.beforeNormalPopupText_ = text;
};
GroupMarker.prototype.setPosition = function(latlng) {
//  var pxPos = this.getProjection().fromLatLngToDivPixel(latlng);
  var pxPos = this.map_.pointToOverlayPixel(latlng);
  if (this.container_) {
	  this.container_.style.left = pxPos.x + "px";
	  if (this.size_.height != null) {
	  	this.container_.style.top = (pxPos.y - this.size_.height) + "px";
	  } else {
	  	this.container_.style.top = pxPos.y + "px";
	  }
  }
  if (this.iconContainer) {
    this.iconContainer.style.left = (pxPos.x - this.ICON_WIDTH / 2) + "px";
    this.iconContainer.style.top = (pxPos.y - this.ICON_HEIGHT / 2) + "px";
  }
};

GroupMarker.prototype.setIcon = function(icon) {
	if(this.icon_!=icon){
			if (this.iconContainer !=null && typeof this.iconContainer != "undefined") {
        		this.iconContainer.src = icon;
        	}
			this.icon_ = icon;
		}
};

GroupMarker.prototype.isNull = function(value) {
    if (!value && value != 0 || value == undefined || value == "" || value == null || typeof value == "undefined") {
        return true;
    }
    return false;
};
GroupMarker.prototype.getHtmlSize_ = function(html) {
  var size = {};
//  var dummyTextNode = document.createElement("span");
//  this.map_.getContainer().appendChild(dummyTextNode);
	this.dummyTextNode.innerHTML = html;
	this.dummyTextNode.style.display = '';
	size.width = this.dummyTextNode.offsetWidth;
	size.height = this.dummyTextNode.offsetHeight;
	this.dummyTextNode.style.display = 'none';
	//var lines = html.toString().split(/\n/i), totalSize = new google.maps.Size(1, 1);
  var lines = html.toString().split(/\n/i), totalSize = new BMap.Size(1, 1);
  for (var i = 0; i < lines.length; i++) {
      totalSize.width += size.width;
      totalSize.height += size.height;
  }
//  this.map_.getContainer().removeChild(dummyTextNode);
	return totalSize;
};
/*
GroupMarker.prototype.getHtmlSize_ = function(html) {
    var mapContainer = this.map_.getDiv();
    var onlineHTMLsize_ = function(text) {
        var dummyTextNode = document.createElement("span");
        dummyTextNode.innerHTML = text;
        dummyTextNode.style.display = "inline";
        mapContainer.appendChild(dummyTextNode);
        var size = {};
        size.width = dummyTextNode.offsetWidth;
        size.height = dummyTextNode.offsetHeight;
        mapContainer.removeChild(dummyTextNode);
        return size;
    };
    
    var ret;
    var lines = html.split(/\n/i);
//  var totalSize = new google.maps.Size(1, 1);
    var totalSize = new BMap.Size(1, 1);
    for (var i = 0; i < lines.length; i++) {
        ret = onlineHTMLsize_(lines[i]);
        totalSize.width += ret.width;
        totalSize.height += ret.height;
    }
    
    if (isIE) {
    	if (isIE6 || isIE7) {
    	} else {
    		totalSize.height+=14;
	   	}
    }  
//	if(isIE8){
//		totalSize.height+=14;
//	}
	totalSize.width += 10;
	totalSize.height += 8;
    return totalSize;
};*/

GroupMarker.prototype.makeImgDiv_ = function(imgSrc, params) {
    var imgDiv = document.createElement("div");
    imgDiv.style.position = "absolute";
    imgDiv.style.overflow = "hidden";
    if (params.width) {
        imgDiv.style.width = params.width + "px";
    }
    if (params.height) {
        imgDiv.style.height = params.height + "px";
    }
    var img = null;
    if (this.isIE_() == false) {
        img = new Image();
        img.src = imgSrc;

    } else {
        img = document.createElement("div");
        if (params.width) {
            img.style.width = params.width + "px";

        }
        if (params.height) {
            img.style.height = params.height + "px";
        }
    }
    img.style.position = "relative";
    img.style.left = params.left + "px";
    img.style.top = params.top + "px";
    img.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + imgSrc + "')";
    imgDiv.appendChild(img);
    return imgDiv;

};
GroupMarker.prototype.fillDiv_ = function(params) {
    var bgDiv = document.createElement("div");
    bgDiv.style.position = "absolute";
    bgDiv.style.backgroundColor = "#FFF";
    bgDiv.style.fontSize = "1px";
    bgDiv.style.lineHeight = "1px";
    bgDiv.style.overflow = "hidden";
    bgDiv.style.left = params.left + "px";
    bgDiv.style.top = params.top + "px";
    bgDiv.style.width = params.width + "px";
    bgDiv.style.height = params.height + "px";
    return bgDiv;
};
GroupMarker.prototype.isIE_ = function() {
    return (navigator.userAgent.toLowerCase().indexOf('msie') != -1) ? true: false;
};
GroupMarker.prototype.hide = function() {
    if (this.container_) {
        this.container_.style.visibility = "hidden";
    }
	GFRAME.isLastClickMap = true;
    this.isVisible = false;
};
GroupMarker.prototype.show = function() {
    if (this.container_) {
    	this.redrawNormalPopup_(this.text_);
        this.container_.style.visibility = "visible";
    }
	GFRAME.LastPopVehicleName = GFRAME.openPopMarkerVehicle;
	GFRAME.isLastClickMap = false;
    this.isVisible = true;
};
GroupMarker.prototype.toggle = function() {
    if (this.container_) {
        if (this.container_.style.visibility == "hidden") {
            this.show();
        } else {
            this.hide();
        }
    }
};
GroupMarker.prototype.update = function(obj) {
    if ((typeof obj.icon) != "undefined") {
    	this.setIcon(obj.icon);
    }
    if ((typeof obj.position) != "undefined") {
        this.latlng_ = obj.position;
        this.setPosition(this.latlng_);
    }
    if ((typeof obj.text) != "undefined") {
        this.text_ = obj.text;
        if (this.isInitialize && this.isVisible) {
        	this.redrawNormalPopup_(obj.text);
      	}
    }
};
GroupMarker.prototype.setZIndex = function(index) {
	if (this.container_) {
    this.container_.style.zIndex = index;
  }
  if (this.iconContainer) {
    this.iconContainer.style.zIndex = index;
  }
};
GroupMarker.prototype.latlng = function() {
    return this.latlng_;
}
GroupMarker.prototype.hideMarker = function(){
	if (this.container_) {
		this.container_.style.visibility = "hidden";
	}
	if (this.iconContainer) {
    this.iconContainer.style.visibility = "hidden";
  }
};
GroupMarker.prototype.showMarker = function(){
	if (this.container_) {
		this.container_.style.visibility = "visible";
    this.iconContainer.style.visibility = "visible";
  }
};
