function CalcCenterX(n, t, i, r, u, f) {
    return ((n * n + t * t) * (r - f) - (i * i + r * r) * (r - f) - (i * i + r * r) * (t - r) + (u * u + f * f) * (t - r)) / (2 * ((n - i) * (r - f) - (i - u) * (t - r)))
}
function CalcCenterY(n, t, i, r, u, f) {
    var o = CalcCenterX(n, t, i, r, u, f);
    return (i * i + r * r - (u * u + f * f) - 2 * o * (i - u)) / (2 * (r - f))
}
function CalcCenterPoint(n, t, i) {
    var u = CalcCenterX(n.x, n.y, t.x, t.y, i.x, i.y),
    r = CalcCenterY(n.x, n.y, t.x, t.y, i.x, i.y);
    return new Point(u, r)
}
function CalcRadius(n, t) {   //n 开始的x,y 结束的X,Y
    return Math.sqrt((t.x - n.x) * (t.x - n.x) + (t.y - n.y) * (t.y - n.y))
}
function AngleDegreeS(n, t, i, r, u, f) {
    var o = Math.atan2(t - r, n - i),
    s = Math.atan2(f - r, u - i),
    e = (s - o) / Math.PI * 180;
    return e < 0 ? 360 + e : e
}
function AngleRadianS(n, t, i, r, u, f) {
    var o = Math.atan2(t - r, n - i),
    e = Math.atan2(f - r, u - i);
    return e - o
}
function AngleRadian(n, t, i) {
    return AngleRadianS(n.x, n.y, t.x, t.y, i.x, i.y)
}
function Radian(n, t) {
    return Math.atan2(n.y - t.y, n.x - t.x)
}
function AngleDegree(n, t, i) {
    return AngleDegreeS(n.x, n.y, t.x, t.y, i.x, i.y)
}
function AngleArcPointS(n, t, i, r, u) {
    var f = Math.atan2(r - t, i - n),
    o = Math.sin(f) * u,
    e = Math.cos(f) * u;
    return new Point(n + e, t + o)
}
function AngleArcPoint(n, t, i) {
    return AngleArcPointS(n.x, n.y, t.x, t.y, i)
}
function IsLargeArc(n) {
    var t = n < 0 ? 2 * Math.PI + n : n;
    return t < .5 * Math.PI || t > 1.5 * Math.PI
}
function IsCounterClockwise(n) {
    var t = n < 0 ? 2 * Math.PI + n : n;
    return t > 0 && t < Math.PI
}
function CalcArea(n) {
    for (var u = n.length, r, i = 0, t = 0; t < u; t++) r = (t + 1) % u,
    i += n[t].x * n[r].y,
    i -= n[t].y * n[r].x;
    return i /= 2,
    Math.abs(i)
}
function CalcLength(n) {
    var u, i, r, t;
    if (n == null || (u = n.length, u < 2)) return 0;
    for (i = 0, r = 0, t = 1; t < u; t++) i += LineLength(n[r], n[t]),
    r = t;
    return i
}
function CalcLengthClosed(n) {
    var t, i;
    return n == null ? 0 : (t = n.length, t < 2) ? 0 : n[0] != n[t - 1] ? (n.push(n[0]), i = CalcLength(n), n.splice(n.length - 1, 1), i) : CalcLength(n)
}
function TriangleArea(n, t, i) {
    var f = LineLength(n, t),
    e = LineLength(n, i),
    r = LineLength(t, i),
    u;
    return f + e <= r || e + r <= f || r + f <= e ? 0 : (u = (f + e + r) / 2, Math.sqrt(Math.Abs(u * (u - f) * (u - e) * (u - r))))
}
function LineLength(n, t) {
    var r = t.x - n.x,
    i = t.y - n.y;
    return Math.sqrt(r * r + i * i)
}
function RadianOfTwoLine(n, t, i) {
    var u = Math.atan2(t.y - n.y, t.x - n.x),
    r = Math.atan2(i.y - n.y, i.x - n.x);
    return r - u
}
function HexToNumber(n) {
    return parseInt(n.replace("#", "0xFF"))
}
function NumberToHex(n) {
    a = n >> 24 & 255,
    r = n >> 16 & 255,
    g = n >> 8 & 255,
    b = n & 255;
    var t = "rgb(" + r + "," + g + "," + b + ")";
    return colorHex(t)
}
function colorHex(n) {
    var r = n,
    o, f, i, u, e, t;
    if (/^(rgb|RGB)/.test(r)) {
        for (o = r.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(","), f = "#", t = 0; t < o.length; t++) i = Number(o[t]).toString(16),
        i === "0" ? i += i : i.length == 1 && (i = "0" + i),
        f += i;
        return f.length !== 7 && (f = r),
        f
    }
    if (reg.test(r)) {
        if (u = r.replace(/#/, "").split(""), u.length === 6) return r;
        if (u.length === 3) {
            for (e = "#", t = 0; t < u.length; t += 1) e += u[t] + u[t];
            return e
        }
    } else return r
}
function colorRgb(n) {
    var i = n.toLowerCase(),
    u,
    r,
    t;
    if (i && reg.test(i)) {
        if (i.length === 4) {
            for (u = "#", t = 1; t < 4; t += 1) u += i.slice(t, t + 1).concat(i.slice(t, t + 1));
            i = u
        }
        for (r = [], t = 1; t < 7; t += 2) r.push(parseInt("0x" + i.slice(t, t + 2)));
        return "RGB(" + r.join(",") + ")"
    }
    return i
}
//function registerTxtCSS(n, t, i, r, u, f, e, o, s, h, c, l) {
//    $elmt = $(n),
//    $elmt.css({
//        left: t + "px",
//        top: i + "px",
//        "font-size": r + "px",
//        "font-family": u,
//        color: f,
//        position: "absolute",
//        padding: "5px",
//        float: "left",
//        "border-radius": "4px",
//        "-moz-border-radius": "4px",
//        "-webkit-border-radius": "4px"
//    }),
//    e && $elmt.css({
//        "font-weight": "bold"
//    }),
//    o && $elmt.css({
//        "font-style": "italic"
//    }),
//    s && $elmt.css({
//        "text-decoration": "underline"
//    }),
//    c && $elmt.css({
//        "background-color": "#F7F8FA",
//        border: "1px solid #A3AEB9"
//    }),
//    l && ($elmt.css({
//        filter: "alpha(opacity=80)",
//        opacity: "0.8",
//        display: "block"
//    }), h = replaceHtmlEnter(h)),
//    $elmt.html(h)
//}
function registerMeasurementTxtCSS(n) {
    $elmt = $(n),
    $elmt.css({
        "font-size": "12px",
        "background-color": "#F7F8FA",
        border: "1px solid #A3AEB9",
        color: "#000000",
        "font-family": "Microsoft Sans Serif,Arial, Helvetica, sans-serif,\u5b8b\u4f53",
        filter: "alpha(opacity=80)",
        opacity: "0.8",
        position: "absolute",
        padding: "4px",
        "border-radius": "4px",
        "-moz-border-radius": "4px",
        "-webkit-border-radius": "4px"
    })
}
function floatRound(n) {
    return Math.round(n * 100) / 100
}
function replaceHtmlEnter(n) {
    return n = n.replaceAll("\n", enter)
}
function isHasEnter(n) {
    for (var i = !1, t = 0; t < n.length; t++) if (n[t] == "\n") {
        i = !0;
        break
    }
    return i
}
function replaceSize(n, t) {
    var r = $(t).width(),
    i = $(t).height();
    r < 200 && (r = 200),
    i < 100 && (i = 100),
    $(n).width(r),
    $(n).height(i)
}
function appendLine(n, t) {
    return n += t + enter
}
function append(n, t) {
    return n += t
}
function registerPositionCSS(n, t, i) {
    $elmt = $(n),
    $elmt.css({
        left: t + "px",
        top: i + "px"
    })
}
function GetOffsetWidth(n) {
    return n /= 2,
    n < 10 && (n = 10),
    n
}
function clickOnLine(n, t, i, r) {
    var o, s, e, u, f;
    return (r = GetOffsetWidth(r), n.x > t.x ? (o = t.x, s = n.x) : (o = n.x, s = t.x), n.y > t.y ? (e = t.y, u = n.y) : (e = n.y, u = t.y), i.x < o - r || i.x > s + r || i.y < e - r || i.y > u + r) ? !1 : (f = pointToLineLength(n, t, i), f == null) ? !1 : f < r
}
function pointToLineLength(n, t, i) {
    var u = n.y - t.y,
    r = t.x - n.x,
    f = (n.x - r) * n.y - n.x * (n.y + u);
    return u == 0 && r == 0 ? null : Math.abs(u * i.x + r * i.y + f) / Math.sqrt(u * u + r * r)
}
function clickOnEllipse(n, t, i, r, u) {
    var e;
    if (u = GetOffsetWidth(u), i.x - n - u > r.x || r.x > i.x + n + u || i.y - t - u > r.y || r.y > i.y + t + u) return !1;
    var s = (r.x - i.x) / n,
    o = 1 / s,
    f = Math.sqrt(o * o - 1) / o;
    return isNaN(f) && (f = 0),
    (r.y < i.y && f > 0 || r.y > i.y && f < 0) && (f = -f),
    e = i.y + t * f,
    e - u <= r.y && r.y <= e + u ? !0 : !1
}
function clickInCircle(n, t, i, r) {
    r = GetOffsetWidth(r);
    var u = CalcRadius(t, i);
    return u <= n + r
}
function clickInCircleResult(n, t, i, r) {
    r = GetOffsetWidth(r);
    var f = CalcRadius(t, i),
    u = new ClickResult;
    return u.isIn = f <= n + r,
    u.length = f,
    u
}
function clickOnCircle(n, t, i, r) {
    r = GetOffsetWidth(r);
    var u = CalcRadius(t, i);
    return n - r < u && u < n + r
}
function clickOnArc(n, t, i, r, u, f, e) {
    e = GetOffsetWidth(e);
    var s = LineLength(t, i),
    o = Radian(i, t);
    return n - e > s || s > n + e ? !1 : Math.abs(r - u) < Math.PI ? f ? Math.min(r, u) > o || o > Math.max(r, u) : Math.min(r, u) < o && o < Math.max(r, u) : f ? Math.min(r, u) < o && o < Math.max(r, u) : Math.min(r, u) > o || o > Math.max(r, u)
}
function clickInArc(n, t, i, r, u, f, e) {
    e = GetOffsetWidth(e);
    var s = LineLength(t, i),
    o = Radian(i, t);
    return s > n + e ? !1 : Math.abs(r - u) < Math.PI ? f ? Math.min(r, u) > o || o > Math.max(r, u) : Math.min(r, u) < o && o < Math.max(r, u) : f ? Math.min(r, u) < o && o < Math.max(r, u) : Math.min(r, u) > o || o > Math.max(r, u)
}
function guidGenerator() {
    var n = function () {
        return ((1 + Math.random()) * 65536 | 0).toString(16).substring(1)
    };
    return n() + n() + "-" + n() + "-" + n() + "-" + n() + "-" + n() + n() + n()
}
var reg, enter;
(function () {
    var n = window.CanvasRenderingContext2D && CanvasRenderingContext2D.prototype;
    n && n.lineTo && (n.dashedLine = function (n, t, i, r, u) {
        var v = function (n, t) {
            return n <= t
        },
        w = function (n, t) {
            return n >= t
        },
        p = function (n, t) {
            return Math.min(n, t)
        },
        y = function (n, t) {
            return Math.max(n, t)
        },
        s = {
            thereYet: w,
            cap: p
        },
        o = {
            thereYet: w,
            cap: p
        },
        h,
        a;
        t - r > 0 && (o.thereYet = v, o.cap = y),
        n - i > 0 && (s.thereYet = v, s.cap = y),
        this.moveTo(n, t);
        for (var e = n, f = t, c = 0, l = !0; !(s.thereYet(e, i) && o.thereYet(f, r)); ) h = Math.atan2(r - t, i - n),
        a = u[c],
        e = s.cap(i, e + Math.cos(h) * a),
        f = o.cap(r, f + Math.sin(h) * a),
        l ? this.lineTo(e, f) : this.moveTo(e, f),
        c = (c + 1) % u.length,
        l = !l
    })
})(),
reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/,
enter = "<br/>",
String.prototype.replaceAll = function (n, t) {
    return this.replace(new RegExp(n, "gm"), t)
};
var SlideViewerConfig;
(function () {
    function n(n, i, r) {
        if (i === undefined) {
            if (t[n] === undefined) {
                var u = $.cookie(n);
                t[n] = u ? u === "on" : r === !0
            }
            return t[n]
        }
        t[n] = i,
        i ? $.cookie(n, "on", {
            expires: 7
        }) : $.cookie(n, "off", {
            expires: 7
        })
    }
    function i(n) {
        n ? (SlideViewerConfig.enableImageAdjustment = !1, SlideViewerConfig.enableAnnotation = !1, SeadragonConfig.animationTime = 0, SeadragonConfig.blendTime = 0, SeadragonConfig.immediateRender = !0) : (SlideViewerConfig.enableImageAdjustment = !0, SlideViewerConfig.enableAnnotation = !0, SeadragonConfig.animationTime = 1, SeadragonConfig.blendTime = .5, SeadragonConfig.immediateRender = !1)
    }
    if (!SlideViewerConfig) {
        var t = {};
        SlideViewerConfig = {
        slidelists:0,
            enableImageAdjustment: !0,
            enableAnnotation: !0,
            enableOne:[!0,""],
            language: "auto",
            exitConfirm: !0,
            autoShowAnnoDialog: !0,
            showOption: !0,
            showRuler:!1,
            PositionUrl:"1",
            showNavMap: function (t) {
                return n("shownavmap", t, !0)
            },
            compactBrowsing: function (t) {
                return t !== undefined && i(t),
                n("compactbrowsing", t)
            },
            showRulers: function (t) {
                return n("showrulers", t)
            },
            showGrid: function (t) {
                return n("showgrid", t)
            },
            showLabel: function (t) {
                return n("showlabel", t)
            }
        },
        SeadragonConfig.debugMode = !1,
        SeadragonConfig.autoHideControls = !1,
        SeadragonConfig.maxZoomPixelRatio = 2,
        SeadragonConfig.imageLoaderLimit = 4,
        SeadragonConfig.zoomPerClick = 1,
        i(SlideViewerConfig.compactBrowsing())
    }
})();
var SlideViewerSupport;
(function () {
    var t, n, i;
    SlideViewerSupport || ($.extend($.support, {
        orientation: "orientation" in window && "onorientationchange" in window,
        touch: "ontouchend" in document
    }), SlideViewerSupport = {
        imageAdjustment: !1,
        canvas: !1,
        isAndroid: !1
    },
    t = !!document.createElement("canvas").getContext, SlideViewerSupport.canvas = t, n = SeadragonUtils.getBrowser(), t && n != SeadragonBrowser.IE && n != SeadragonBrowser.UNKNOWN && (SlideViewerSupport.imageAdjustment = !0), i = navigator.userAgent.toLowerCase(), SlideViewerSupport.isAndroid = i.indexOf("android") > -1)
})();
var OpenSlideResult = function () {
    this.error,
    this.resultCode = -1,
    this.webSiteUrl,
    this.slide
},
AnnotationResult = function () {
    this.error,
    this.resultCode = -1,
    this.webSiteUrl,
    this.annotations = []
},
ReadImageAdjustmentResult = function () {
    this.error,
    this.resultCode = -1,
    this.webSiteUrl,
    this.adjustment
},
UpdateResult = function () {
    this.error,
    this.success = !1
},
SlideInfo = function () {
    this.id = 0,
    this.guid = "",
    this.barcode = "",
    this.name = "unknown",
    this.baseImage = new SlideImage,
    this.ROIs = []
},
ROI = function () {
    this.id = -1,
    this.scanObjective = 0,
    this.x = 0,
    this.y = 0,
    this.width = 0,
    this.height = 0,
    this.hasImage = !1,
    this.image
},
SlideImage = function () {
    this.id,
    this.scanObjective,
    this.calibration = -1,
    this.width = 0,
    this.height = 0,
    this.tileSize = 256,
    this.annotations = [],
    this.hasAnnotations = !1,
    this.imageAdjustment,
    this.tierCount = 1,
    this.tierSpacing = 0
},
AnnotationInfo = function () {
    this.imageId,
    this.imageindex,
    this.isAllShow,
    this.guid,
    this.name,
    this.description,
    this.scale,
    this.width,
    this.type,
    this.region,
    this.fontUnderLine,
    this.fontSize,
    this.fontFamily,
    this.fontItalic,
    this.fontBold,
    this.visible,
    this.color,
    this.measurement,
    this.radius,
    this.arcLength,
    this.angle,
    this.points = []
},
ImageAdjustment;
(function () {
    ImageAdjustment = function () {
        this.gamma = 1,
        this.contrastMin = 0,
        this.contrastMax = 255,
        this.contrast=1,
        this.red = 1,
        this.green = 1,
        this.blue = 1,
        this.Brightness=1,
        this.saturation = 0,
        this.sharpness = 0
    },
    ImageAdjustment.prototype.isChanged = function () {
        return !this.isDefaultColorChannel() || !this.isDefaultContrast() || !this.isDefaultGamma() || !this.isDefaultSaturation() || !this.isDefaultSharpness()
    },
    ImageAdjustment.prototype.isDefaultGamma = function () {
        return this.gamma == 1
    },
    ImageAdjustment.prototype.isDefaultContrast = function () {
        return this.contrastMin == 0 && this.contrastMax == 255
    },
    ImageAdjustment.prototype.isDefaultColorChannel = function () {
        return this.red == 1 && this.green == 1 && this.blue == 1&&this.Brightness==1&&this.contrast==1
    },
    ImageAdjustment.prototype.isDefaultSaturation = function () {
        return this.saturation == 0
    },
    ImageAdjustment.prototype.isDefaultSharpness = function () {
        return this.sharpness == 0
    },
    ImageAdjustment.prototype.clone = function () {
        var n = new ImageAdjustment;
        return n.gamma = this.gamma,
        n.contrastMin = this.contrastMin,
        n.contrastMax = this.contrastMax,
        n.red = this.red,
        n.green = this.green,
        n.blue = this.blue,
        n.saturation = this.saturation,
        n.sharpness = this.sharpness,
        n
    },
    ImageAdjustment.prototype.reset = function () {
        this.gamma = 1,
        this.contrastMin = 0,
        this.contrastMax = 255,
        this.red = 1,
        this.green = 1,
        this.blue = 1,
        this.saturation = 0,
        this.sharpness = 0
    },
    ImageAdjustment.prototype.isEquals = function (n) {
        return n ? this.gamma == n.gamma && this.contrastMin == n.contrastMin && this.contrastMax == n.contrastMax && this.red == n.red && this.green == n.green && this.blue == n.blue && this.saturation == n.saturation && this.sharpness == n.sharpness : !1
    }
})();
var SlideViewerStrings;
(function () {
    function t() {
        var t = SlideViewerConfig.language,
        i;
        return n[t] ? n[t] : ((t === undefined || t === null || t === "" || t === "auto") && (t = window.navigator.userLanguage || window.navigator.language), i = t.split("-"), t = i[0], n[t] || (t = "en"), SlideViewerConfig.language = t, n[t])
    }
    if (!SlideViewerStrings) {
        SlideViewerStrings = {};
        var n = {
            en: {
                Buttons: {
                    Annotation: "Annotations",
                    ImageAdjustment: "Adjust Image",
                    Options: "Options",
                    Edit: "Edit",
                    Delete: "Delete",
                    AnnotationList: "List",
                    Back: "Back",
                    Ok: "Ok",
                    Cancel: "Cancel",
                    Yes: "Yes",
                    No: "No",
                    Reset: "Reset",
                    Finish: "Finish",
                    Save: "Save",
                    On: "On",
                    Off: "Off",
                    AutoShow: "Show Automatically",
                    apply:"apply",
                    compare:"compare"
                },
                Labels: {
                    AnnotationType: "Annotations:"
                },
                Tooltips: {
                    BtnBackToBase: "Back to base image",
                    BtnHome: "Fit to view window",
                    ZoomIn: "Zoom In",
                    ZoomOut: "Zoom Out"
                },
                Messages: {
                    SaveSuccess: "Save Successfully.",
                    SaveFailed: "Save Failed.",
                    ExitConfirm: "The slide's data has been changed, do you want to exit without saving ?",
                    SaveAdjustmentSuccess: "Save image adjustment successfully.",
                    SaveAdjustmentFailed: "Save image adjustment failed.",
                    SaveAnnotationSuccess: "Save annotations successfully.",
                    SaveAnnotationFailed: "Save annotations failed."
                },
                ImageAdjustments: {
                    Title: "Adjust Image",
                    Gamma: "Gamma",
                    Factor: "Factor",
                    MinInput: "Min Input",
                    MaxInput: "MaxInput",
                    Contrast: "Contrast",
                    Channels: "Color",
                    Red: "Red",
                    Green: "Green",
                    Blue: "Blue",
                    AllChannels: "All Channels",
                    SS: "Sharpness & Saturation",
                    Saturation: "Saturation",
                    Sharpness: "Sharpness"
                },
                Annotations: {
                    Draw: {
                        Line: "Draw Line",
                        Arrow: "Draw Arrow",
                        Rectangle: "Draw Rectangle",
                        Ellipse: "Draw Ellipse",
                        Remark: "Add Remark",
                        Position: "Add Position",
                        CurveRounded: "Draw Closed Curve",
                        Curve: "Draw Curve",
                        Angle: "Draw Angle by 3 Points",
                        Circle: "Draw Circle",
                        CircleThreePoints: "Draw Circle by 3 points",
                        Arc: "Draw Arc by 3 points",
                        Polygon: "Draw Polygon"
                    },
                    Dialog: {
                        Title: "Edit Annotation",
                        LineWidth: "Line Width:",
                        Name: "Name:",
                        Description: "Description:",
                        Color: "Color:"
                    },
                    Measurement: {
                        TxtLength: "Length:",
                        TxtWidth: "Width:",
                        TxtHeight: "Height:",
                        TxtAngle: "Angle:",
                        TxtArcLength: "Arc Length:",
                        TxtArea: "Area:",
                        TxtMajorhalfaxis: "Major half axis:",
                        TxtMinorhalfaxis: "Minor half axis:",
                        TxtPerimeter: "Perimeter:",
                        TxtRadius: "Radius:",
                        TxtDescription: "Description:",
                        TxtUnit: " um",
                        TxtAreaUnit: " squm",
                        TxtDeg: " Deg"
                    },
                    Default: {
                        Name: "New Annotation",
                        Description: "Description"
                    },
                    AskSave: {
                        Title: "Save Annotations",
                        Message: "Annotations have been changed, do you want to save ?"
                    }
                },
                Options: {
                    Title: "Options",
                    NavMap: "Nav Map:",
                    Compact: "Compact:",
                    Ruler: "Ruler:",
                    Grid: "Grid:",
                    Label: "Label:"
                },
                Compact: {
                    Title: "Compact Browsing",
                    Message: "This function is disabled in compact browsing. You can go to [Options] to turn it off."
                },
                NotSupported: {
                    Title: "Not Supported",
                    Message: 'It seems this function is not supported well on your browser. Please use the latest <a href="https://www.google.com/chrome" target="_blank">Chrome</a>, <a href="http://www.mozillaonline.com/" target="_blank">Firefox</a> or <a href="http://www.apple.com/safari/" target="_blank">Safari</a> for a better browsing experience.'
                }
            },
            zh: {
                Buttons: {
                    Annotation: "\u6807\u6ce8",
                    ImageAdjustment: "\u56fe\u50cf\u8c03\u8282",
                    Options: "\u9009\u9879",
                    Edit: "\u7f16\u8f91",
                    Delete: "\u5220\u9664",
                    AnnotationList: "\u6807\u6ce8\u5217\u8868",
                    Back: "\u8fd4\u56de",
                    Ok: "\u786e\u5b9a",
                    Cancel: "\u53d6\u6d88",
                    Yes: "\u662f",
                    No: "\u5426",
                    Reset: "\u91cd\u7f6e",
                    Finish: "\u5b8c\u6210",
                    Save: "\u4fdd\u5b58",
                    On: "\u5f00",
                    Off: "\u5173",
                    AutoShow: "\u81ea\u52a8\u663e\u793a\u003a",
                    apply:"\u5e94\u7528",
                    compare:"\u6bd4\u8f83"
                },
                Labels: {
                    AnnotationType: "\u6807\u6ce8\u7c7b\u578b\uff1a"
                },
                Tooltips: {
                    BtnBackToBase: "\u8fd4\u56de\u9996\u9875",
                    BtnHome: "\u81ea\u9002\u5e94\u7a97\u53e3",
                    ZoomIn: "\u653e\u5927",
                    ZoomOut: "\u7f29\u5c0f"
                },
                Messages: {
                    SaveSuccess: "\u4fdd\u5b58\u6210\u529f\u3002",
                    SaveFailed: "\u4fdd\u5b58\u5931\u8d25\uff01",
                    ExitConfirm: "\u5207\u7247\u7684\u6570\u636e\u5df2\u7ecf\u6539\u53d8\uff0c\u662f\u5426\u76f4\u63a5\u9000\u51fa\uff1f",
                    SaveAdjustmentSuccess: "\u56fe\u50cf\u8c03\u8282\u4fdd\u5b58\u6210\u529f\u3002",
                    SaveAdjustmentFailed: "\u56fe\u50cf\u8c03\u8282\u4fdd\u5b58\u5931\u8d25\u3002",
                    SaveAnnotationSuccess: "\u6807\u6ce8\u4fdd\u5b58\u6210\u529f\u3002",
                    SaveAnnotationFailed: "\u6807\u6ce8\u4fdd\u5b58\u5931\u8d25\u3002"
                },
                ImageAdjustments: {
                    Title: "\u8c03\u8282\u56fe\u50cf",
                    Gamma: "\u4f3d\u9a6c\u56e0\u5b50",
                    Factor: "\u4f3d\u9a6c\u56e0\u5b50",
                    Contrast: "\u5bf9\u6bd4\u5ea6",
                    MinInput: "\u6700\u5c0f\u503c",
                    MaxInput: "\u6700\u5927\u503c",
                    Channels: "\u989c\u8272\u901a\u9053",
                    Red: "\u7ea2",
                    Green: "\u7eff",
                    Blue: "\u84dd",
                    AllChannels: "\u6240\u6709\u901a\u9053",
                    SS: "\u9510\u5ea6\u548c\u9971\u548c\u5ea6",
                    Saturation: "\u9971\u548c\u5ea6",
                    Sharpness: "\u9510\u5ea6",
                    Brightness:"\u4eae\u5ea6",
                    Contrast:"\u5bf9\u6bd4\u5ea6"

                },
                Annotations: {
                    Draw: {
                        Line: "\u76f4\u7ebf",            //\u7ed8\u5236\u76f4\u7ebf
                        Arrow: "\u7bad\u5934",
                        Rectangle: "\u77e9\u5f62",
                        Ellipse: "\u692d\u5706",
                        Remark: "\u6587\u672c\u6ce8\u91ca",
                        Position: "\u6807\u8bb0",
                        CurveRounded: "\u7ed8\u5236\u95ed\u5408\u66f2\u7ebf",
                        Curve: "\u66f2\u7ebf",
                        Angle: "\u4e09\u70b9\u753b\u89d2\u5ea6",
                        Circle: "\u7ed8\u5236\u5706",
                        CircleThreePoints: "\u4e09\u70b9\u753b\u5706",
                        Arc: "\u4e09\u70b9\u753b\u5f27",
                        Polygon: "\u7ed8\u5236\u591a\u8fb9\u5f62"
                    },
                    Dialog: {
                        Title: "\u7f16\u8f91\u6807\u6ce8",
                        LineWidth: "\u7ebf\u6761\u5bbd\u5ea6\uff1a",
                        Name: "\u540d\u79f0\uff1a",
                        Description: "\u63cf\u8ff0\uff1a",
                        Color: "\u989c\u8272\uff1a"
                    },
                    Measurement: {
                        TxtLength: "\u957f\u5ea6\uff1a",
                        TxtWidth: "\u5bbd\uff1a",
                        TxtHeight: "\u9ad8\uff1a",
                        TxtAngle: "\u89d2\u5ea6\uff1a",
                        TxtArcLength: "\u5f27\u957f\uff1a",
                        TxtArea: "\u9762\u79ef\uff1a",
                        TxtMajorhalfaxis: "\u957f\u534a\u8f74\uff1a",
                        TxtMinorhalfaxis: "\u77ed\u534a\u8f74\uff1a",
                        TxtPerimeter: "\u5468\u957f\uff1a",
                        TxtRadius: "\u534a\u5f84\uff1a",
                        TxtDescription: "\u63cf\u8ff0\uff1a",
                        TxtUnit: " \u5fae\u7c73",
                        TxtAreaUnit: " \u5e73\u65b9\u5fae\u7c73",
                        TxtDeg: " \u5ea6"
                    },
                    Default: {
                        Name: "\u65b0\u6807\u6ce8",
                        Description: "\u8bf7\u8f93\u5165"
                    },
                    AskSave: {
                        Title: "\u4fdd\u5b58\u6807\u6ce8",
                        Message: "\u6807\u6ce8\u5df2\u7ecf\u6539\u53d8\uff0c\u662f\u5426\u4fdd\u5b58\uff1f"
                    }
                },
                Options: {
                    Title: "\u9009\u9879",
                    NavMap: "\u5bfc\u822a\u56fe\uff1a",
                    Compact: "\u7cbe\u7b80\u6a21\u5f0f\uff1a",
                    Ruler: "\u6807\u5c3a\uff1a",
                    Grid: "\u7f51\u683c\uff1a",
                    Label: "\u6807\u7b7e\uff1a"
                },
                Compact: {
                    Title: "\u7cbe\u7b80\u6a21\u5f0f",
                    Message: "\u7cbe\u7b80\u6a21\u5f0f\u4e0b\u8be5\u529f\u80fd\u662f\u5173\u95ed\u7684\u3002\u60a8\u53ef\u4ee5\u5230 \u3010\u9009\u9879\u3011 \u5173\u95ed\u7cbe\u7b80\u6a21\u5f0f\u3002"
                },
                NotSupported: {
                    Title: "\u4e0d\u652f\u6301",
                    Message: '\u60a8\u7684\u6d4f\u89c8\u5668\u8fd8\u4e0d\u80fd\u5f88\u597d\u7684\u652f\u6301\u6b64\u529f\u80fd\uff0c\u8bf7\u4f7f\u7528\u6700\u65b0\u7684 <a href="https://www.google.com/chrome" target="_blank">Chrome</a>, <a href="http://www.mozillaonline.com/" target="_blank">Firefox</a> \u6216 <a href="http://www.apple.com/safari/" target="_blank">Safari</a> \u6d4f\u89c8\u5668\u4ee5\u83b7\u5f97\u66f4\u597d\u7684\u4f53\u9a8c\u3002'
                },
                MainMenu:{
                ScreenShot:"\u622a\u56fe",
                ShotList:"\u622a\u56fe\u5217\u8868",
                Others:"\u5176\u4ed6",
                Abouts:"\u5173\u4e8e",
                NavMap:"\u5bfc\u822a\u56fe",
                Tag:"\u6807\u7b7e",
                Ruler:"\u6bd4\u4f8b\u5c3a",
                CaseInfo:"\u75c5\u4f8b\u4fe1\u606f",
                AnnotationOption:"\u6ce8\u91ca\u7ba1\u7406",
                ImageInfo:"\u56fe\u50cf\u4fe1\u606f"
                }
            }
        };
        SlideViewerStrings.getString = function (n) {
            for (var f = n.split("."), i = t(), u, r = 0; r < f.length; r++) i = i[f[r]] || {};
            return typeof i != "string" && (i = ""),
            u = arguments,
            i.replace(/\{\d+\}/g,
            function (n) {
                var t = parseInt(n.match(/\d+/)) + 1;
                return t < u.length ? u[t] : ""
            })
        }
//        SlideViewerStrings.getSwitchCut=function(name)
//        {
//        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
//        var r = window.location.search.substr(1).match(reg);
//        if (r != null)
//        return unescape(r[2]);
//        return null;
//        }
    }
})();
SlideResult = function () {
    this.Address, this.Width, this.Height, this.Rate, this.ID, this.KfbioPath, this.FileNum, this.KfbAddress, this.TileSize, this.FileSize, this.ConsultID, this.UserID, this.CaseNo
}
var SlideLiYProvider;
(function () {
    SlideLiYProvider = function () {
        var e, WebServerPath, TileUrl;
        function isPInt(str) {
    var g = /^[1-9]*[1-9][0-9]*$/;
    return g.test(str);
}
        function v(result, status) {
            i = new SlideResult;
           if(result.responseText=="1")
           {
             window.location.href="Error.htm";
           }

            if (status == 'success') {

                    var SlideInfo = result.responseText.split('|');
                    i.KfbioPath = SlideInfo[9];
                    i.Width = SlideInfo[1];
                    i.Height = SlideInfo[2];
                    i.Rate = SlideInfo[3];
                    i.ID = SlideInfo[0];
                    var filemaxlength = Math.max(SlideInfo[1], SlideInfo[2]);
              
                  
                    var FileNum =isPInt(Math.log(filemaxlength) / Math.log(2)) == true ? parseInt(Math.log(filemaxlength) / Math.log(2)) : parseInt(Math.log(filemaxlength) / Math.log(2)) + 1;
                    i.FileNum = FileNum;
                    i.KfbAddress = "";
                  
                    i.TileSize = SlideInfo[4];
                    i.FileSize = SlideInfo[7];
                    i.ScanTime = SlideInfo[5];
                    i.SpeedTime = SlideInfo[6];
                    i.ScanMac = SlideInfo[8];
                    i.KfbioPath=SlideInfo[9];
                    i.ConsultID = "";
                   if (SlideInfo[10] == ""||SlideInfo[10]=="0"){
					  if( SlideInfo[3]=="20"){
					    i.calibration = "0.5";
						}
                    else
                        i.calibration = "0.2439";
					}
					else
					{
					i.calibration=SlideInfo[10]
					}
                    
                    i.UserID = getcookie("UserID");
                    i.CaseNo = getQueryString("caseno");

                    var SlideGroup = "";
                    for (var j = 11; j < SlideInfo.length; j++) {
                        if (SlideInfo[j] != "")
                            SlideGroup += SlideInfo[j] + "|";

                    }
				
                    if (SlideGroup.length > 0) {
                        SlideGroup = SlideGroup.substr(0, SlideGroup.length - 1);
                    }
                   // SlideBind(SlideGroup);
                   if(document.getElementById("SlideTb"))
                   {
                         if($("#SlideTb tr").length==0)
                         {
                         SlideList(SlideGroup);
                         }
                     }
                if (typeof e == "function")  //e=rrBack
                {
                    e(i);
                }
            }

        };
        function getcookie(name) {
            var cookie_start = document.cookie.indexOf(name);
            var cookie_end = document.cookie.indexOf(";", cookie_start);
            return cookie_start == -1 ? '' : unescape(document.cookie.substring(cookie_start + name.length + 1, (cookie_end > cookie_start ? cookie_end : document.cookie.length)));
        }
        function TagBind(id) {
    

          var ProxyIP=getQueryString("ProxyIP");
           var SlidePath=getQueryString("SlidePath");
          if(ProxyIP!="")
          ProxyIP="&ProxyIP="+ProxyIP;
    
            if(isPInt(id.toLowerCase())==true)
             {
            url = "../LabelHandler.ashx?ID=" + id+ProxyIP;   //url
            }
            else
            {
             
            url = "../LabelHandler.ashx?kfbpath=" + id+ProxyIP;   //url
            
            }
			if(document.getElementById("labelImage"))
            document.getElementById("labelImage").src = url;
            document.getElementById("img_label").src=url;
        }

        function SlideBind(SeaViewer) {
            var Slidelists = SeaViewer.split("|");
            var ThumnailUrl, LabelUrl;
            var ClickourTouch = "";
            if (Slidelists.length == 1) {
               if(document.getElementById("SlideLists"))
                document.getElementById("SlideLists").style.display = "none";
                if(document.getElementById("slides"))
                document.getElementById("slides").style.display = "none";
//                if (document.getElementById("ShotLists") != null) {
//                    document.getElementById("ShotLists").style.bottom = "55px";
//                 
//                    if(document.getElementById("jtlb"))
//                       document.getElementById("jtlb").style.bottom = "265px"; 
//                            if(document.getElementById("shot"))
//                    document.getElementById("shot").style.bottom = "55px";
//                }
            }
            else {
                 if(document.getElementById("SlideLists"))
                {
                document.getElementById("SlideLists").style.display = "inline";
                }
                if(  document.getElementById("slides"))
                {
                document.getElementById("slides").style.display = "inline";
                }
//                if (document.getElementById("ShotLists"))
//                    document.getElementById("ShotLists").style.bottom = "280px";
//                if (document.getElementById("jtlb"))
//                    document.getElementById("jtlb").style.bottom = "490px";
//                if (document.getElementById("shot"))
//                    document.getElementById("shot").style.bottom = "280px";
            }
            for (var i = 0; i < Slidelists.length; i++) {
            var path="";
             path = Slidelists[i].replace(new RegExp(/(\\)/g), '\\\\');
                if (isMobile() == true) {
                    ClickourTouch = "href=\"JavaScript:void(0)\" ontouchstart=\"Frms('" +path + "') \"";
                } else {
                    ClickourTouch = "onclick=\"Frms('" + path+ "') \"";
                }
                 var ProxyIP=getQueryString("ProxyIP");
            if(ProxyIP!="")
            {
                ProxyIP="&ProxyIP="+ProxyIP;
                }
                if(Slidelists[i].toLowerCase().indexOf('kfb')==-1)
                   ThumnailUrl = "../ThumnailHandler.ashx?ID=" + Slidelists[i]+ProxyIP;
                else
                    ThumnailUrl = "../ThumnailHandler.ashx?kfbpath=" + Slidelists[i]+ProxyIP;
                div = "<li class=\"dataItem-img\"><a " + ClickourTouch + " ><img style=\"width:62px;height:30%;margin-top:35px\" src=\"" + ThumnailUrl + "\"  /></a></li>";
                $("#SlideUl").append(div);
            }
        };
        function GetWebServerPath() {
        
     
           
            WebServerPath = "../OpenSlideHandler.ashx";
            TileUrl = "../StreamHandler.ashx";
        };
        this.GetImageInfo = function (SlideId, i)   //i=rrBack
        {
            GetWebServerPath();
            e = typeof i == "function" ? i : null;
             var SlideIDs="";
            var Case_No="";
             SlideIDs = getQueryString("SlideID");
             Case_No = getQueryString("caseno");
          
            if (Case_No != ""&&Case_No!=null) {
                Case_No = "&CaseNo=" + Case_No;
            }
            if (SlideIDs != ""&&SlideIDs!=null) {
                SlideIDs = "&SlideID=" + SlideIDs;
            }
            var ProxyIP=getQueryString("ProxyIP");
            if(ProxyIP!="")
               ProxyIP="&ProxyIP="+ProxyIP;

            var SlidePath=getQueryString("SlidePath");
            if(SlidePath!="")
              SlidePath="&SlidePath="+escape(SlidePath);

            var Kfbpath=getQueryString("kfbpath");
             if(Kfbpath!="")
              Kfbpath="&kfbpath="+escape(Kfbpath);

             var UncToken=getQueryString("UncToken");
             if(UncToken!="")
              UncToken="&UncToken="+escape(UncToken);

             if(SlideId!=undefined&&SlideId.toString().indexOf('.kfb')!=-1)
           {
            Kfbpath="&kfbpath="+escape(SlideId);
           }
              
            var u = WebServerPath + "?type=kfbio" + Case_No + SlideIDs+ProxyIP+SlidePath+Kfbpath+UncToken;
            $.ajax({
                type: "POST",
                url: u,
                data: "",
                cache: false,
                 async: true,
                dataType: "text",
                complete:v

            });

        };
          
        this.getTileUrl = function (slideKey, level, PositionX, PositionY, FileNum, ID, TileSize, gamma, contrast, light, r, g, b,KfbioPath) {

        var url=TileUrl+"?SlideID=" +ID+"&kfbpath="+KfbioPath+"&Zoom="+slideKey+"&FileNum="+ FileNum+"&level="+level+"&PositionX="+PositionX+"&PositionY="+ PositionY+"&TileSize="+TileSize+"&gamma="+gamma+"&contrast="+contrast+"&light="+light+"&rgbR="+ r+"&rgbG="+g+"&rgbB="+b
       var UncToken=getQueryString("UncToken");
             if(UncToken!="")
             {
                 UncToken="&UncToken="+escape(UncToken); 
                 url=url+UncToken;
             }
        var ProxyIP=getQueryString("ProxyIP");
        if(ProxyIP!="")
          url=url+"&ProxyIP="+ProxyIP;
    
          return url;
        };
      var u;
        this.updateAnnotations=function(n, a, r, f)
        {
         if(getQueryString("SwitchShowAnno")=="1")
        {
         return;
        }
         u = typeof f == "function" ? f : null;
        var para={"data":JSON.stringify(r),"kfbpath":i.KfbioPath,"ZJSlideID":getQueryString("ZJSlideID"),"SlideID":getQueryString("SlideID")};
         $.ajax({
                type: "POST",
                url: "../UpdateAnnotationsHandler.ashx",
                data: para,
                cache: false,
                 async: true,
                 dataType: "text",
                success:function(ret){
          
               
                 var k = new UpdateResult;
                 if( ret == "1")
                 {
                 k.success =true;
                
                 }
                 else
                 {
                 k.error=ret;
                 }
                  typeof u == "function" && u(k)
               
                }

            });

        
        
        };
     var backfun;
        this.getAnnotation=function(n, r, u)
        {  if(getQueryString("SwitchShowAnno")=="1")
        {
        return;
        }

            backfun= typeof u == "function" ? u : null;
         var para={"kfbpath":i.KfbioPath,"ZJSlideID":getQueryString("ZJSlideID"),"SlideID":getQueryString("SlideID")};
         $.ajax({
                type: "POST",
                url: "../GetAnnotationsHandler.ashx",
                data: para,
                cache: false,
                 async: true,
                 dataType: "text",
                success:function(ret){
               // var e = new AnnotationResult;
           
                u.annotations = JSON.parse(ret)
                typeof backfun == "function" && backfun(u)
                }

            });
        };
        this.getThumbnailUrl = function (slideKey, FileNum, ID, TileSize, gamma, contrast, light, r, g, b,KfbioPath) {
      
            var url=TileUrl+"?SlideID=" +ID+"&kfbpath="+KfbioPath+"&Zoom="+slideKey+"&FileNum="+ FileNum+"&level=8&PositionX=0&PositionY=0&TileSize="+TileSize+"&gamma="+gamma+"&contrast="+contrast+"&light="+light+"&rgbR="+ r+"&rgbG="+g+"&rgbB="+b;
           var UncToken=getQueryString("UncToken");
             if(UncToken!="")
             {
                 UncToken="&UncToken="+escape(UncToken); 
                 url=url+UncToken;
             }
            var ProxyIP=getQueryString("ProxyIP");
            if(ProxyIP!="")
                 url=url+"&ProxyIP="+ProxyIP;   
                 
            return url;
      
        };
        this.getLabelUrl = function (ID, KfbioPath) {
            var url="../LabelHandler.ashx?SlideID=" +ID+"&kfbpath="+KfbioPath;
            var UncToken=getQueryString("UncToken");
             if(UncToken!="")
             {
                 UncToken="&UncToken="+escape(UncToken); 
                 url=url+UncToken;
             }
            var ProxyIP=getQueryString("ProxyIP");
            if(ProxyIP!="")
                 url=url+"&ProxyIP="+ProxyIP;   
                 
            return url;
        };
         this.getPreviewUrl = function (ID, KfbioPath) {
            var url="../PreviewHandler.ashx?SlideID=" +ID+"&kfbpath="+KfbioPath;

              var UncToken=getQueryString("UncToken");
             if(UncToken!="")
             {
                 UncToken="&UncToken="+escape(UncToken); 
                 url=url+UncToken;
             }


            var ProxyIP=getQueryString("ProxyIP");
            if(ProxyIP!="")
                 url=url+"&ProxyIP="+ProxyIP;  
                 
                 
            return url;
        };
    }
})();
var SeadragonLiYTileSource = function (width, height, tileSize, tileOverlap, tileFormat, slideKey, FileNum, ID, Provider, gamma, contrast, light, r, g, b, kfbioPath) {

    SeadragonTileSource.apply(this, [width, height, tileSize, tileOverlap]);
    this.fileFormat = tileFormat;
    this.tileFormat = tileFormat;


    this.getTileUrl = function (level, x, y, gamma, contrast, light, r, g, b) {
        return Provider.getTileUrl(slideKey, level, x, y, FileNum, ID, tileSize, gamma, contrast, light, r, g, b, kfbioPath);
    };
};
var SeadragonLiYViewer = function (n, t) {
    function lt(SlideId) {
        function rrBack(n) {

            OpenImage(n);
            r = n;

        }
        i.provider = new SlideLiYProvider,
        i.provider.GetImageInfo(SlideId, rrBack);
    }
    function OpenImage(n) {
        var source = new SeadragonLiYTileSource(Number(n.Width), Number(n.Height), Number(n.TileSize), 0, ".jpg", n.Rate, n.FileNum, n.ID, i.provider, 1.5, 1, 0, 0, 0, 0, String(n.KfbioPath));
        i.openTileSource(source)
    }
    var w;
    SeadragonViewer.apply(this, [n]);
    //        ShapeCanvas.apply(this, arguments);
    var i = this,
    ct, f, r, kt, e, h, y, v, u, c, RectPoint, NavWH, s = 0,
    t, a, o, bt = [], label;
    f = document.createElement("div");
    f.id = "Thumbnail";
    //    u = i;

    this.provider,
    function () {

        if (i.addEventListener("open", Open), i.addEventListener("animation", Animation), $.support.touch) {
            //i.setMouseNavEnabled(!1);
            var t = $("#" + n);
            t.bind("touchstart", touchstart),
                        t.bind("touchmove", touchmove),
                        t.bind("touchend", touchend),
                        t.bind("gesturestart", gesturestart),
                        t.bind("gesturechange", gesturechange);

        }

        window.onorientationchange = function () {
            //setTimeout(scrollTo, 0, 0, 0);
            UpdateView();
        }
        window.onresize = function () {
            UpdateView();
        }
        IsAndroid(),
        //CreateSliderPanel(),
        CreateViewerToolbar(),

        CreateMenu();
        if (isIElast()) {
            var hammertime = new Hammer(document.getElementById(n));
            //if (SlideViewerSupport.isAndroid) {
                hammertime.get('pinch').set({ enable: true });
           // }
            // hammertime.on("doubletap", function (ev) { alert(2) });
            hammertime.on("pinch", function (ev) {

                t;
                t = w * ev.scale;

                if (i.viewport && t <= i.viewport.getMinZoom()) {
                    t = i.viewport.getMinZoom()
                }
                if (i.viewport && t >= i.viewport.getMaxZoom()) {
                    t = i.viewport.getMaxZoom()
                }
                i.viewport.zoomTo(t);

            });
            hammertime.on("pinchstart", function (ev) {

                w = i.viewport.getZoom(!0);


            });
        }


    } ();
    function UpdateView() {
        //        var n = $("#container_toolbar").height() || 45;
        //        var n = $("#container_toolbar").height()
        $("#container").height($(window).height());
        //        $("#container_viewer").height($("#container").height() - n);
        $("#container_viewer").height($(window).height());
    }
    function Open() {

        //                pt();
        ShowImageProcess();
        ShowLabel();
        //                 b();
        ShowNavMap();
        // ShowLabel();
        at();
        isIElast() ? null : u.showrulers();
        Changeselect();
        hideLoading();

        //        wt()
    }

    function pt() {
        i.provider.getSlidePermission(f.id,
        function (n) {
            s = n,
            (s & 2) > 0 && u && u.isShapeChanged && t.tbMain.setSaveButton(!0)
        })
    }
    function wt() {
        if (r && r.tierCount > 1) {
            var n = Math.floor(r.tierCount / 2),
            i = -n,
            t = r.tierCount - n - 1;
            o.setData(i, t, 0, 1),
            o.show()
        } else o.hide()
    }
    function b() {
        var e, u;
        if (i.drawer.clearOverlays(), r.id < 0 && f.ROIs.length > 0) for (e = f.baseImage.height / f.baseImage.width, u = 0; u < f.ROIs.length; u++) {
            var t = f.ROIs[u],
            h = t.x / f.baseImage.width,
            c = t.y / f.baseImage.height * e,
            l = t.width / f.baseImage.width,
            o = t.height / f.baseImage.height * e,
            n = document.createElement("div"),
            s = document.createTextNode(t.scanObjective + "x");
            n.appendChild(s),
            n.style.backgroundColor = t.hasImage ? "#006400" : "#A0A000",
            n.style.opacity = .4,
            n.style.filter = "alpha(opacity=40)",
            $(n).dblclick(t, nt),
            $(n).hover(function () {
                this.style.border = "medium solid Blue"
            },
            function () {
                this.style.border = ""
            }),
            i.drawer.addOverlay(n, new Seadragon.Rect(h, c, l, o))
        }
    }
    function ShowImageProcess() {
        a = new ImageProcessing(i),
        a.start()
    }
    function at() {
        function n(n) {

            r.hasAnnotations = !0,
            r.annotations = n.annotations,
            u.initImageAnnotationsShape(n.annotations),
            u.showImageAnnotations()
        } (u || (u = new ShapeCanvas(i)), u.createShapeCanvas()) && (u.onShapeDrawEnd = function () {
            t.tbAnnotation.resetAnnotationButtons();
            //            t.resetAnnotationButtons(),
            SlideViewerConfig.autoShowAnnoDialog && t.tbAnnotation.showAnnotationDialog();  //t.Ashow()
        },
        u.onShapeChanged = function () {
            (s & 2) > 0 && t.tbAnnotation.setSaveButton(!0)
        },
        u.setOpenImage(r, f.id), SlideViewerConfig.enableAnnotation && !r.hasAnnotations ? (u.clearShapeArray(), i.provider.getAnnotation(f.id, r.ID, n)) : (u.initImageAnnotationsShape(r.annotations), u.showImageAnnotations()))
    }
    function ShowLabel() {
        if (isMoblie2() == true && getQueryString("ZJSlideID") == "") {
            $("#div_label").css("display", "none");
            return;
        }
        if (r) {
            var cwidth = 100;
            var cwidthcw = 250;
            var cwidthcwh = 90;
            var cheight = 100;
            var cwidth2 = 150;
            var winwidth = $(window).width();
            if (winwidth <= 400) {
                cwidth2 = 0;
                cwidthcw = 100;
            }
            if (getQueryString("ZJSlideID") != "") {
                cwidth2 = 0;
                cwidthcw = 100;
            }
            var KfbioPath = r.KfbioPath;
            if (getQueryString("kfbpath") != "") {
                KfbioPath = escape(getQueryString("kfbpath"));
            }



            var url = i.provider.getLabelUrl(r.ID, KfbioPath);

            var Previewurl = i.provider.getPreviewUrl(r.ID, KfbioPath);




            if (document.getElementById("labelImage"))
                document.getElementById("labelImage").src = url;
            if (document.getElementById("img_pre")) {
                document.getElementById("img_pre").src = Previewurl;
            }


            if (document.getElementById("img_label")) {

                if (KfbioPath.indexOf('.tif') != -1 || KfbioPath.indexOf('.ndpi') != -1 || KfbioPath.indexOf('.bif') != -1) {
                    document.getElementById("img_label").style.display = "none";
                    document.getElementById("img_label").style.width = "0px";
                    document.getElementById("img_pre").style.width = 250 + "px";
                    document.getElementById("img_pre").style.height = 100 + "px";
                    document.getElementById("div_label_sw").style.right = cwidthcw + "px";
                    $("#div_label_img_sw").height(cheight);

                }
                else {
                    document.getElementById("img_label").src = url;
                    document.getElementById("img_label").style.width = cwidth + "px";
                    document.getElementById("img_label").style.height = cheight + "px";
                    document.getElementById("div_label_sw").style.right = cwidthcw + 5 + "px";
                    document.getElementById("img_pre").style.width = cwidth2 + "px";
                    document.getElementById("img_pre").style.height = cheight + "px";
                    $("#div_label_img_sw").height(cheight);
                }
            }
        }
    }
    function ShowNavMap(n) {
        var cwidth = 200;
        var winwidth = $(window).width();
        if (winwidth <= 400) {
            cwidth = 100;
        }
        if (winwidth <= 600 && winwidth > 400) {
            cwidth = 150;
        }
        var t, n, u;
        r && (Number(r.Width) > Number(r.Height) ? (t = cwidth, n = Math.floor(t * r.Height / r.Width), NavWH = { Width: t, Height: n }) : (n = cwidth, t = Math.floor(n * r.Width / r.Height), NavWH = { Width: t, Height: n }),
         u = i.provider.getThumbnailUrl(r.Rate, r.FileNum, r.ID, r.TileSize, 1, 1, 0, 0, 0, 0, r.KfbioPath),
         e = new NavigationView(u, t, n),
         e.onUserMove = function (n, t) {
             i.viewport && i.viewport.panTo(new SeadragonPoint(n, t))
         },
         e.setVisibility(SlideViewerConfig.showRulers()),
        e.setVisibility(SlideViewerConfig.showNavMap()), i.addControl(e.elmt, Seadragon.ControlAnchor.TOP_LEFT), Animation())
    }
    function Animation() {
        var u, n;
        if (i.viewport) {
            var f = i.viewport.getZoom(!0),
            o = i.viewport.getContainerSize(),
            t = i.viewport.getBounds(),
            s = i.viewport.getAspectRatio();
            c = o.x * f / r.Width,
            u = {
                viewportWidth: f,
                containerSize: o,
                bounds: t,
                aspectRatio: s,
                scale: c
            },
            i.trigger("viewportchanged", u),
            RectPoint = e.UpdateViewRect(i.viewport.getZoom(), t.x, t.y, s),
            e && (e.UpdateViewRect(i.viewport.getZoom(), t.x, t.y, s), n = Seadragon.Utils.getElementPosition(e.elmt), e.isOnDragging() || e.UpdateThumbnailOrigin(n.x, n.y))
        }

    }
    function touchstart(n) {
        var t = n.originalEvent;
        y = t.targetTouches[0].clientX,
        v = t.targetTouches[0].clientY
    }
    function touchmove(n) {
        var t = n.originalEvent,
        f, e, r, u;
        t.preventDefault(),
        i.viewport && t.targetTouches.length == 1
        &&
        (f = y - t.targetTouches[0].clientX,
         e = v - t.targetTouches[0].clientY,
         y = t.targetTouches[0].clientX,
          v = t.targetTouches[0].clientY,
           r = new SeadragonPoint(f, e),
            u = i.viewport.deltaPointsFromPixels(r), i.viewport.panBy(u))
    }
    function touchend() { }
    function gesturestart() {
        w = i.viewport.getZoom(!0)
    }

    function gesturechange(n) {
        var r = n.originalEvent,
        t;
        r.preventDefault();
        t = w * r.scale;

        if (i.viewport && t <= i.viewport.getMinZoom()) {
            t = i.viewport.getMinZoom()
        }
        if (i.viewport && t >= i.viewport.getMaxZoom()) {
            t = i.viewport.getMaxZoom()
        }
        i.viewport.zoomTo(t)
    }
    function IsAndroid() {
        //SlideViewerSupport.isAndroid && (i.addControl(new ZoomPanel(i).elmt, Seadragon.ControlAnchor.BOTTOM_RIGHT), i.addControl(new MainButton(i).elmt, Seadragon.ControlAnchor.BOTTOM_RIGHT))
    }
    function CreateSliderPanel() {
        o = new SliderPanel(1, 100, 1, 10),
        i.addControl(o.elmt, Seadragon.ControlAnchor.BOTTOM_RIGHT),
        o.change(function () {
            var u = Math.floor(r.tierCount / 2);
            i.source.tierIndex = u + o.val(),
            i.drawer.reset(),
            i.drawer.update()
        })
    }

    function isMoblie() {
        var sUserAgent = navigator.userAgent.toLowerCase();
        var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
        var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
        var bIsMidp = sUserAgent.match(/midp/i) == "midp";
        var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
        var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
        var bIsAndroid = sUserAgent.match(/android/i) == "android";
        var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
        var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
        if ((bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM)) {
            return true
        }
        else {
            return false;
        }
    }
    function isMoblie2() {
        var sUserAgent = navigator.userAgent.toLowerCase();
        var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
        var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
        var bIsMidp = sUserAgent.match(/midp/i) == "midp";
        var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
        var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
        var bIsAndroid = sUserAgent.match(/android/i) == "android";
        var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
        var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
        if ((bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM)) {
            return true
        }
        else {
            return false;
        }
    }
    function CreateMenu() {
        i.addControl(new AnnotationMenu(i).elmt, Seadragon.ControlAnchor.NONE);

        i.addControl(new ZoomBotton(i).elmt, Seadragon.ControlAnchor.NONE)
        i.addControl(new ShotLists(i).elmt, Seadragon.ControlAnchor.BOTTOM_LEFT);
        if (getQueryString("SwitchCut") == "1") {

            i.addControl(new BtnShot(i).elmt, Seadragon.ControlAnchor.TOP_RIGHT);

        }

        //  i.addControl(new xxBotton(i).elmt, Seadragon.ControlAnchor.NONE)  
      

    }

    function CreateViewerToolbar() {
        t = new ViewerToolbar(i, t)//i=this t//tool-ID
    }
    this.getShapeCanvas = function () {
        return u;
    },
    this.getRectPoint = function () {
        return RectPoint;
    },
    this.getNav = function () {
        return NavWH;
    },
    this.getNavMap = function () {
        return e
    },
    this.getSlideLabel = function () {
        return h
    },
    this.getCurrentImage = function () {
        return r
    },
    this.getCurrentSlide = function () {
        return f
    },
    this.canWrite = function () {
        return (s & 2) > 0
    },
    this.getScale = function () {
        return c
    },
    this.getImageProcessing = function () {
        return a
    },
    this.openli = function (n) {
        // ct = ot(n),
        lt(n)
    },
    this.zoomToObj = function (n) {
        var f = n / r.Rate * r.Width,    //该倍率下的切片宽度
        u = i.viewport.getContainerSize(),   //窗口宽高
        ui = i.getShapeCanvas(),   //ShanpeCanvas
        t = f / u.x;    //切片宽度与窗口宽度的比值
        isIElast() ? null : SlideViewerConfig.showRuler == !1 ? null : ui.showrulers()
        i.viewport.zoomTo(t)
    },
    this.dataChanged = function () {   //return !1
        if (u) return u.isShapeChanged
    },
    this.saveAnnotations = function () {    //保存注释是否成功
        u && u.updateImageAnnotations(function (n) {
            if (n.success) {
                $('#xtooldiv').popover('show');
                setTimeout(function () { $('#xtooldiv').popover('hide'); }, 3000);
            }
            //n.success ? i.showMessage(SlideViewerStrings.getString("Messages.SaveAnnotationSuccess")) : i.showMessage(SlideViewerStrings.getString("Messages.SaveAnnotationFailed"))
        })
    },
    this.resumeAnnotations = function () {
        u && (u.resumeBackUpShapes(), t.tbAnnotation.setSaveButton(!1))
    },
    this.update = function () {
        u && (u.clearShapeCanvas(!0), u.showImageAnnotations(!0)),
        i.drawer.update(),
        e.refresh()
    },
    this.showMessage = function (n, t) {
        var r, u, e, f;
        t == null && (t = 1500),
        r = $("<div class='ui-loader ui-overlay-shadow ui-body-e ui-corner-all'><h1>" + n + "</h1></div>"),
        r.appendTo("body"),
        u = i.viewport == null ? new Seadragon.Point($(window).width(), $(window).height()) : i.viewport.getContainerSize(),
        e = (u.x - r.width()) / 2 + "px",
        f = (u.y - r.height()) / 2 + "px",
        r.css({
            top: f,
            left: e,
            filter: "alpha(opacity=90)",
            opacity: "0.9",
            position: "absolute",
            display: "block",
            "padding-left": "12px",
            "padding-right": "12px"
        }),
        r.delay(t).fadeOut(400,
        function () {
            $(this).remove()
        })
    },
    this.openImage = function (n) {
        OpenImage(n)
    }
}

var AnnotationDialog = function (n) {
    function h() {
        var height = 430;
        if ($(window).height() < height) {
            height = $(window).height();
        }
        var width = 450;
        if ($(window).width() < width) {
            width = $(window).width();
        }
        t = $(s),

        t.attr("title", i18n.t("AnnotationsDialog.Title")),
        t.appendTo($("body")).dialog({
            open: f,
            autoOpen: !1,
            resizable: !1,
            modal: !0,
            width: width,
            height: height,
            buttons: [{
                text: i18n.t("AnnotationsDialog.Ok"),
                click: function () {
                    o(),
                    r.showImageAnnotations(),
                    $(this).dialog("close")
                }
            },
            {
                text: i18n.t("AnnotationsDialog.Cancel"),
                click: function () {
                    i = r.getActiveShape();
                    r.deleteAnnotation();
                    //del()
                    $(this).dialog("close")
                }
            }],
            close: function (event, ui) {

            }
        }), $('#picker').colpick({
            layout: 'hex',
            submit: 0,
            colorScheme: 'dark',
            onChange: function (hsb, hex, rgb, el, bySetColor) {
                $(el).css('border-color', '#' + hex);
//                $("#Picker").css('border-color', '#' + hex);
                // Fill the text box just if the color was set using the picker, and not the colpickSetColor function.
                if (!bySetColor) $(el).val(hex);
            }
        }).keyup(function () {
            $(this).colpickSetColor(this.value)
        });

        //        $("#colorpicker", t).farbtastic("#color"),
        //        u = $.farbtastic("#colorpicker")
    }
    function f() {
        r = n.getShapeCanvas(),
        i = r.getActiveShape(),
        $(i).attr("viewer", n),
        isDisabled();
        e()
    }

    function isDisabled() {
        var input = $('input[name="identity"]');
        var t = r.getActiveShape();
        for (var i = 0; i < input.length; i++) {
            if (t.type != "Position")
                input[i].disabled = true;
            else
                input[i].disabled = false;
        }
    }
    function e() {
        var Anno = r.getAnnotation();
        var name;
        for (var j = 0; j < Anno.length; j++) {
            name = i18n.t("Tool." + i.type + "") + "" + (Anno.length) + "";
        }
        $("#chkAutoShow", t).attr("checked", SlideViewerConfig.autoShowAnnoDialog);
        $("#lineWidth", t).val(i.width);
        $("#picker", t).val(i.color);
        $("#annoName", t).val(name);
      
        $("#annoDesc", t).val(i.description);
    }
    function del() {
        var obj = document.getElementById("AnnoName"); var index = obj.selectedIndex; obj.options.remove(index) && anno.pop(index)
    }
    function o() {
        ShapeDefaultConfig.defaultColor = $("#picker", t).val(),
        ShapeDefaultConfig.lineWidth = $("#lineWidth", t).val(),
        i && (i.width = ShapeDefaultConfig.lineWidth, i.color = ShapeDefaultConfig.defaultColor, i.name = $("#annoName", t).val(), i.description = $("#annoDesc", t).val(), r.dirtyCanvas(), i.imageindex = $('input[name="identity"]:checked').val())
        if ($("#chkAutoShow", t)[0].checked) {
            i.isAllShow = !0;
        }
        else {
            i.isAllShow = !1;
        }
		i.isSelected=false;

    }
    var c = "#annotationDialog",
    t, u, r, i, s = '<div id="annotationDialog"     \t data-role="dialog" \t\t data-overlay-theme="e"          class="ui-dialog-topright"> \t\t<div data-role="content" data-theme="c"> \t\t\t<div data-role="fieldcontain"> \t\t\t\t<label for="lineWidth" class="ui-item-label" >' + i18n.t("AnnotationsDialog.LineWidth") + '</label> \t\t\t\t<select id="lineWidth" class="ui-item-field" > \t\t\t\t\t<option value="1">1</option> \t\t\t\t\t<option value="2">2</option> \t\t\t\t\t<option value="5" selected="selected">5</option> \t\t\t\t\t<option value="10">10</option> \t\t\t\t\t<option value="20">20</option> \t\t\t\t</select> \t\t\t</div> \t\t\t<div data-role="fieldcontain"> \t\t\t\t<label for="annoName" class="ui-item-label" >' + i18n.t("AnnotationsDialog.Name") + '</label> \t\t\t\t<input type="text" id="annoName" class="ui-item-field" /> \t\t\t</div> \t\t\t<div data-role="fieldcontain"> \t\t\t\t<label for="annoDesc" class="ui-item-label" > ' + i18n.t("AnnotationsDialog.Description") + '</label> \t\t\t\t<textarea id="annoDesc" class="ui-item-field" rows="2"></textarea> \t\t\t</div> \t\t\t<div data-role="fieldcontain" id="Color"> \t\t\t\t<label for="color" class="ui-item-label" >' + i18n.t('AnnotationsDialog.Color') + '</label> \t\t\t\t<input type="text" id="picker" /> \t\t\t\t</div>             <div data-role="fieldcontain">         <label for="chkAutoShow" data-inline="true"  style="width:27%">' + i18n.t('AnnotationsDialog.AutoShow') + '</label><input type="checkbox" id="chkAutoShow"/>             </div> <div data-role="fieldcontain"><table><tr><td style="width:30%"><label>' + i18n.t('AnnotationsDialog.PositionIcon') + '</label></td><td><input type="radio" name="identity" value="1"  checked="checked"/><img src="image/pin_1.png"  alt=""></td><td><input type="radio" name="identity" value="2"/><img src="image/pin_2.png"></td><td><input type="radio" name="identity" value="3"/><img src="image/pin_3.png"  alt=""></td><td><input type="radio" name="identity" value="4"/><img src="image/pin_4.png"  alt=""></td></tr></table></div>\t\t</div> \t</div>';
    (function () {
        h()
    })(),
    this.show = function () {
        t.dialog("open")
    }
};
var AnnotationSaveDialog = function (n) {
    function u() {
        t = $(r),
        $("[data-lang]", t).html(function () {
            return SlideViewerStrings.getString($(this).attr("data-lang"))
        }),
        t.attr("title", SlideViewerStrings.getString("Annotations.AskSave.Title")),
        t.appendTo($("body")).dialog({
            autoOpen: !1,
            resizable: !1,
            modal: !0,
            buttons: [{
                text: SlideViewerStrings.getString("Buttons.Yes"),
                click: function () {
                    n.saveAnnotations(),
                    $(this).dialog("close"),
                    i.closeDialog && i.closeDialog()
                }
            },
            {
                text: SlideViewerStrings.getString("Buttons.No"),
                click: function () {
                    n.resumeAnnotations(),
                    $(this).dialog("close"),
                    i.closeDialog && i.closeDialog()
                }
            }]
        })
    }
    var t, f = "#annotationSaveDialog",
    i = this,
    r = '<div id="annotationSaveDialog" data-role="dialog"> \t\t<div data-role="content" data-theme="c" data-mini="true"> \t\t\t<p data-lang="Annotations.AskSave.Message">Annotations have been changed, do you want to save?</p> \t\t</div> \t</div>';
    (function () {
        u()
    })(),
    this.closeDialog,
    this.show = function () {
        t.dialog("open")
    }
};
var anno = [];
var OptionsDialog = function (n) {
    function o() {
        t = $(s),
        $("[data-lang]", t).html(function () {
            return SlideViewerStrings.getString($(this).attr("data-lang"))
        }),
        t.attr("title", SlideViewerStrings.getString("Options.Title")),
        $(".option-item-radio", t).buttonset(),
        SlideViewerSupport.canvas || $("[data-show='canvas']", t).hide(),
        t.appendTo($("body")).dialog({
            open: h,
            autoOpen: !1,
            resizable: !1,
            modal: !0,
            buttons: [{
                text: SlideViewerStrings.getString("Buttons.Ok"),
                click: function () {
                    var h = $(f + "on", t).attr("checked") === "checked",
                    c,
                    l,
                    s,
                    o;
                    SlideViewerConfig.showNavMap(h),
                    c = $(e + "on", t).attr("checked") === "checked",
                    SlideViewerConfig.compactBrowsing(c),
                    l = $(i + "on", t).attr("checked") === "checked",
                    SlideViewerConfig.showRulers(l),
                    s = $(r + "on", t).attr("checked") === "checked",
                    SlideViewerConfig.showGrid(s),
                    o = $(u + "on", t).attr("checked") === "checked",
                    SlideViewerConfig.showLabel(o),
                    n.getSlideLabel().setVisibility(o),
                    n.getNavMap().setVisibility(h),
                    n.update(),
                    $(this).dialog("close")
                }
            },
            {
                text: SlideViewerStrings.getString("Buttons.Cancel"),
                click: function () {
                    $(this).dialog("close")
                }
            }]
        })
    }
    function h() {
        var n = SlideViewerConfig.showNavMap();
        n ? $(f + "on", t).attr("checked", "checked").button("refresh") : $(f + "off", t).attr("checked", "checked").button("refresh"),
        n = SlideViewerConfig.compactBrowsing(),
        n ? $(e + "on", t).attr("checked", "checked").button("refresh") : $(e + "off", t).attr("checked", "checked").button("refresh"),
        n = SlideViewerConfig.showRulers(),
        n ? $(i + "on", t).attr("checked", "checked").button("refresh") : $(i + "off", t).attr("checked", "checked").button("refresh"),
        n = SlideViewerConfig.showGrid(),
        n ? $(r + "on", t).attr("checked", "checked").button("refresh") : $(r + "off", t).attr("checked", "checked").button("refresh"),
        n = SlideViewerConfig.showLabel(),
        n ? $(u + "on", t).attr("checked", "checked").button("refresh") : $(u + "off", t).attr("checked", "checked").button("refresh")
    }
    var c = "#optionsDialog",
    t, f = "#flip-navmap-",
    e = "#flip-compact-",
    i = "#flip-ruler-",
    r = "#flip-grid-",
    u = "#flip-label-",
    s = '<div id="optionsDialog" title="Options" data-role="dialog">         <div data-role="fieldcontain" class="option-item">             <label for="flip-navmap" class="option-item-label" data-lang="Options.NavMap">                 Nav Map:</label>             <div id="flip-navmap" class="option-item-radio">                 <input type="radio" id="flip-navmap-on" name="navmap" value="on" />                 <label for="flip-navmap-on" data-lang="Buttons.On">On</label>                 <input type="radio" id="flip-navmap-off" name="navmap" checked="checked" value="off" />                 <label for="flip-navmap-off" data-lang="Buttons.Off">Off</label>             </div>         </div>         <div data-role="fieldcontain" class="option-item">             <label for="flip-label" class="option-item-label" data-lang="Options.Label">Label:</label>             <div id="flip-label" class="option-item-radio">                 <input type="radio" id="flip-label-on" name="label" value="on"/>                 <label for="flip-label-on" data-lang="Buttons.On">On</label>                 <input type="radio" id="flip-label-off" name="label" value="off" />                 <label for="flip-label-off" data-lang="Buttons.Off">Off</label>             </div>         </div>         <div data-role="fieldcontain" class="option-item">             <label for="flip-compact" class="option-item-label" data-lang="Options.Compact">Compact:</label>             <div id="flip-compact" class="option-item-radio">                 <input type="radio" id="flip-compact-on" name="compact" value="on"/>                 <label for="flip-compact-on" data-lang="Buttons.On">On</label>                 <input type="radio" id="flip-compact-off" name="compact" value="off" />                 <label for="flip-compact-off" data-lang="Buttons.Off">Off</label>             </div>         </div>         <div data-role="fieldcontain" class="option-item" data-show="canvas">             <label for="flip-ruler" class="option-item-label" data-lang="Options.Ruler">Ruler:</label>             <div id="flip-ruler" class="option-item-radio">                 <input type="radio" id="flip-ruler-on" name="ruler" value="on" />                 <label for="flip-ruler-on" data-lang="Buttons.On">On</label>                 <input type="radio" id="flip-ruler-off" name="ruler" value="off" />                 <label for="flip-ruler-off" data-lang="Buttons.Off">Off</label>             </div>         </div>         <div data-role="fieldcontain" class="option-item" data-show="canvas">             <label for="flip-grid" class="option-item-label" data-lang="Options.Grid">Grid:</label>             <div id="flip-grid" class="option-item-radio">                 <input type="radio" id="flip-grid-on" name="grid" value="on" />                 <label for="flip-grid-on" data-lang="Buttons.On">On</label>                 <input type="radio" id="flip-grid-off" name="grid" value="off" />                 <label for="flip-grid-off" data-lang="Buttons.Off">Off</label>             </div>         </div>     </div>';
    (function () {
        o()
    })(),
    this.show = function () {
        t.dialog("open")
    }
};
var NotSupportedDialog = function () {
    function i() {
        n = $(t),
        $("[data-lang]", n).html(function () {
            return SlideViewerStrings.getString($(this).attr("data-lang"))
        }),
        n.attr("title", SlideViewerStrings.getString("NotSupported.Title")),
        n.appendTo($("body")).dialog({
            autoOpen: !1,
            resizable: !1,
            modal: !0,
            width: 500,
            buttons: [{
                text: SlideViewerStrings.getString("Buttons.Ok"),
                click: function () {
                    $(this).dialog("close")
                }
            }]
        })
    }
    var r = "#notSupportedDialog",
    n, t = '<div id="notSupportedDialog" data-role="dialog" class="ui-dialog-topright"> \t\t<div data-role="content" data-theme="c" data-mini="true">             <p data-lang="NotSupported.Message">It seems this function is not supported well on your browser.                Please use the latest <a href="https://www.google.com/chrome" target="_blank">Chrome</a>,                <a href="http://www.mozillaonline.com/" target="_blank">Firefox</a> or                <a href="http://www.apple.com/safari/" target="_blank">Safari</a> for a better browsing experience.</p> \t\t</div>     </div>';
    (function () {
        i()
    })(),
    this.show = function () {
        n.dialog("open")
    }
},
CompactDialog = function () {
    function i() {
        n = $(t),
        $("[data-lang]", n).html(function () {
            return SlideViewerStrings.getString($(this).attr("data-lang"))
        }),
        n.attr("title", SlideViewerStrings.getString("Compact.Title")),
        n.appendTo($("body")).dialog({
            autoOpen: !1,
            resizable: !1,
            modal: !0,
            width: 500,
            buttons: [{
                text: SlideViewerStrings.getString("Buttons.Ok"),
                click: function () {
                    $(this).dialog("close")
                }
            }]
        })
    }
    var r = "#compactDialog",
    n, t = '<div id="compactDialog" data-role="dialog" class="ui-dialog-topright"> \t\t<div data-role="content" data-theme="c" data-mini="true"> \t\t\t<p data-lang="Compact.Message">You are now in compact browsing. You can go to [Options] to turn it off.</p> \t\t</div> \t</div>';
    (function () {
        i()
    })(),
    this.show = function () {
        n.dialog("open")
    }
};
var SlideInfo = function (SeaViewer) {
    function h() {
        t = $(s);
        t.appendTo($("body")).dialog({
            open: f,
            autoOpen: !1,
            resizable: !1,
            modal: !0,
            width: "520",
            height: "550"
        })
    }
    function f() {
        c = SeaViewer.getShapeCanvas();
    }
    var r = "slideDialog",
t, c, img, s = '<div id="slideDialog"     \t data-role="dialog" \t\t data-overlay-theme="e"          title="' + i18n.t("ImageInfoDialog.Title") + '"          class="ui-dialog-topright"> \t\t<div data-role="content" data-theme="b"> \t\t\t<div data-role="fieldcontain"> \t\t\t\t<label class="ui-item-label" >' + i18n.t("ImageInfoDialog.FileName") + '</label>\t\t\t <label  id="filename"></label> \t\t\t</div> \t\t\t<div data-role="fieldcontain"> \t\t\t\t<label  class="ui-item-label" >' + i18n.t("ImageInfoDialog.FileSize") + '</label> \t\t\t\t<label id="filesize" ></label> \t\t\t</div> \t\t\t<div data-role="fieldcontain"> \t\t\t\t<label  class="ui-item-label" >' + i18n.t('ImageInfoDialog.Imagepixels') + '</label> \t\t\t\t<label id="imgpixel" ></label>  \t\t\t</div> \t\t\t<div data-role="fieldcontain" > \t\t\t\t<label  class="ui-item-label" >' + i18n.t('ImageInfoDialog.ScanRate') + '</label> \t\t\t\t <label id="multiple" ></label> \t\t\t\t</div>    <div data-role="fieldcontain"> \t\t\t\t<label class="ui-item-label" >' + i18n.t('ImageInfoDialog.ScanDate') + '</label>\t\t\t <label  id="ScanTime"></label> \t\t\t</div><div data-role="fieldcontain"> \t\t\t\t<label  class="ui-item-label" >' + i18n.t("ImageInfoDialog.ScanTime") + '</label>\t\t\t <label  id="SpeedTime"></label> \t\t\t</div>  <div data-role="fieldcontain"> \t\t\t\t<label class="ui-item-label" >' + i18n.t('ImageInfoDialog.ScanMachine') + '</label>\t\t\t <lablel id="ScanMac"></label> \t\t\t</div>\t\t <div data-role="fieldcontain"> \t\t\t\t<label  class="ui-item-label" >' + i18n.t("ImageInfoDialog.Preview") + '</label>\t\t\t   </br><img id="labelImg" style="width:180px;height:180px"/><img id="slideImg" style=" height:180px;width:280px" />\t\t\t</div>\t  </div> \t</div>';

    (function () {
        h();
    })(),
    this.show = function () {

        t.dialog("open");
    },
    this.text = function () {

        var host = window.location.host;
        var herf = window.location.href;
        var file = herf.split('/')
        var context = SeaViewer.getCurrentImage();
        var filesize = context.FileSize + "MB"

        var url = "../LabelHandler.ashx?kfbpath=" + context.KfbioPath;
        var filename = context.KfbioPath.substring(context.KfbioPath.lastIndexOf("\\") + 1);
        var a = document.getElementById("filesize");
        document.getElementById("filesize").innerText = filesize;
        document.getElementById("filename").innerText = filename;
        document.getElementById("imgpixel").innerText = "" + context.Width + "Pixel×" + context.Height + "Pixel";
        document.getElementById("multiple").innerText = "" + context.Rate + "×";
        document.getElementById("ScanTime").innerText = "" + context.ScanTime + "";
        document.getElementById("SpeedTime").innerText = "" + context.SpeedTime + "";
        document.getElementById("ScanMac").innerText = "" + context.ScanMac + "";
       
        $("#labelImg").attr("src", url);
        //  $("#labelImg").css("display", "none");
        url = "../PreviewHandler.ashx?kfbpath=" + context.KfbioPath;
        $("#slideImg").attr("src", url);
        if (context.KfbioPath.indexOf(".tif") != -1 || context.KfbioPath.indexOf(".ndpi") != -1 || context.KfbioPath.indexOf(".bif") != -1) {
            $("#labelImg").css("display", "none");
            $("#slideImg").css("width", "480px");
        }
    }
};
var AnnotationOption = function (n) {
    function h() {
        var height = 620;
        if ($(window).height() < height) {
            height = $(window).height();
        }
        var width = 450;
        if ($(window).width() < width) {
            width = $(window).width();
        }
        t = $(s),
//        $("[data-lang]", t).html(function () {
//            return SlideViewerStrings.getString($(this).attr("data-lang"))
//        }),
        //t.attr("title", SlideViewerStrings.getString("Annotations.Dialog.Title")),
        t.appendTo($("body")).dialog({
            open: f,
            autoOpen: !1,
            resizable: !1,
            modal: !0,
            width: width,
            height: height,
            buttons: [{
                text: i18n.t('AnnotationsDialog.Ok'), //SlideViewerStrings.getString("Buttons.Ok"),
                click: function () {
                    o(),
                    r.showImageAnnotations()
                    $(this).dialog("close")
                }
            },
            {
                text: i18n.t('AnnotationsDialog.Cancel'),
                click: function () {

                    $(this).dialog("close")
                }
            }],
            close: function (event, ui) {
                r.isSelectedEnable = !0;
                var obj = document.getElementById("AnnoName"); var index = obj.selectedIndex;
                obj.options.remove(index), $("#linewidth").val("5"), $("#Picker").val(null), $("#annoname").val(""), $("#annodesc").val(""), $("#Measurement").html("")
            }
        })
        , $('#Picker').colpick({
            layout: 'hex',
            submit: 0,
            colorScheme: 'dark',
            onChange: function (hsb, hex, rgb, el, bySetColor) {
                $(el).css('border-color', '#' + hex);
                // Fill the text box just if the color was set using the picker, and not the colpickSetColor function.
                if (!bySetColor) $(el).val(hex);
            }
        }).keyup(function () {
            $(this).colpickSetColor(this.value)
        });

    }
    function f() {

        r = n.getShapeCanvas();

        anno = Anno;
        select();

    }
    function openChoose() {

        r = n.getShapeCanvas();
        i = r.getActiveShape();
        //        var text = a.options[a.selectedIndex].text;
        //        for (var j = 0; j < Anno.length; j++) {
        //            if (Anno[j].isSelected) {
        //                i = Anno[j];
        //                a.value = j;
        //                break;
        //            }

        //        }

        isDisabled(i);
        r.setSelectedEnable(!1);
        r.getActiveShape(i);
        $("#linewidth").val(i.width);
        $("#Picker").val(i.color);
        var index = Number(Anno.indexOf(i));
        $("#AnnoName").val(index);
        $("#annoname").val(i.name);
        $("#annodesc").val(i.description);
        $("#Measurement").html($(i.txtElmt).html().split(i18n.t('Measurement.TxtDescription'))[0]);
        i.isAllShow ? $("#chkautoShow")[0].checked = true : $("#chkautoShow")[0].checked = false;
        i.isSelected = true;
        r.showImageAnnotations();
    }
    function o() {

        i = r.getActiveShape();
        i.imageindex = $('input[name="identitys"]:checked').val();
        $("#chkautoShow", t).attr("checked") === "checked" ? i.txtElmt.style.display = "block" : null;
        i.width = $("#linewidth").val();
        i.color = $("#Picker").val();
        i.name = $("#annoname").val();
        i.description = $("#annodesc").val();
        i.isMeasurementChanged = !0, r.dirtyCanvas();
        if ($("#chkautoShow", t)[0].checked) {
            i.isAllShow = !0;
        }
        else {
            i.isAllShow = !1;
        }
    }

    function hide() {
        $("#ahide").bind("click", function () {
            SlideViewerConfig.enableAnnotation == true ? SlideViewerConfig.enableAnnotation = false : SlideViewerConfig.enableAnnotation = true;
            if (SlideViewerConfig.enableAnnotation) {
                document.getElementById("ahide").src = "image/qT_hidd.png";
                document.getElementById("hide").src = "image/T_hidd.png";
            }
            else {
                document.getElementById("ahide").src = "image/qT_hidd1.png";
                document.getElementById("hide").src = "image/T_hidd1.png";
            }
            r.showImageAnnotations(SlideViewerConfig.enableAnnotation);
        });
        $("#delete").bind("click", function () {
            var obj = document.getElementById("AnnoName"); var index = obj.selectedIndex;
            i = r.getActiveShape();
            Anno = r.getAnnotation();
            i != null && (r.deleteAnnotation(), obj.options.remove(index), /*anno.pop(index),*/$("#linewidth").val("2"), $("#Picker").val(null), $("#annoname").val(""), $("#annodesc").val(""), $("#Measurement").html(""));
            if (Anno.length > 0) {
                i = Anno[0];
                r.setSelectedEnable(!1);
                r.getActiveShape(i);
                $("#linewidth").val(i.width);
                $("#Picker").val(i.color);
				$("#Picker").css('border-color', '#' +i.color);
                $("#annoname").val(i.name);
                i.isAllShow ? $("#chkautoShow")[0].checked = true : $("#chkautoShow")[0].checked = false;

                $("#annodesc").val(i.description);
			 var txtMea=$(i.txtElmt).html();
					if(txtMea!=null)
					{
					txtMea=$(i.txtElmt).html().split("描述")[0];
					}
            $("#Measurement").html(txtMea);
                i.isSelected = true;
                r.showImageAnnotations();
            }


        });

        $("#hide").bind("click", function () {
            var a = document.getElementById("ahide");
            if (document.getElementById("ahide").nameProp == "qT_hidd1.png")
            { }
            else {
                i = r.getActiveShape();
                SlideViewerConfig.enableOne[0] == true ? SlideViewerConfig.enableOne[0] = false : SlideViewerConfig.enableOne[0] = true;
                if (i != null) {
                    if (SlideViewerConfig.enableOne[0]) {
                        document.getElementById("hide").src = "image/T_hidd.png";
                    }
                    else {
                        document.getElementById("hide").src = "image/T_hidd1.png";
                    }
                    (SlideViewerConfig.enableOne[1] = i.name, r.showImageAnnotations(SlideViewerConfig.enableOne))
                }
            }
        });
        $("#AnnoName").bind("change", function () {

            r = n.getShapeCanvas();
            var index = $("#AnnoName").val();
            // var r = i.viewer.getShapeCanvas();
            var Anno = r.getAnnotation();
            i = Anno[index];
			isDisabled(i);
            r.setSelectedEnable(!1);
            r.getActiveShape(i);
            $("#linewidth").val(i.width);
            $("#Picker").val(i.color);
			$("#Picker").css('border-color', '#' +i.color);
            $("#annoname").val(i.name);
            i.isAllShow ? $("#chkautoShow")[0].checked = true : $("#chkautoShow")[0].checked = false;

            $("#annodesc").val(i.description);
								var txtMea=$(i.txtElmt).html();
					if(txtMea!=null)
					{
					txtMea=$(i.txtElmt).html().split("描述")[0];
					}
            $("#Measurement").html(txtMea);
            i.isSelected = true;
            r.showImageAnnotations();

        })
    }


    function select() {

        var td = $("#AnnoName", t);
        Anno = r.getAnnotation();
        var data = r.getActiveShape();
if(data==undefined)
{
data=Anno[0];
}
        $("#Picker").val(data.color);
        $("#Picker").css('border-color', '#' +data.color);
        var input = $('input[name="identitys"]');
data.isAllShow ? $("#chkautoShow")[0].checked = true : $("#chkautoShow")[0].checked = false;
        if (data != null && data.imageindex != undefined && data.imageindex != null) {
            for (var i = 0; i < input.length; i++) {
                if (data.imageindex == input[i].value)
                    input[i].checked = true;
            }
        }
        $("#AnnoName").html("");

        for (var i = 0; i < Anno.length; i++) {
            var op = '<option  value="' + i + '"  >' + Anno[i].name + '</option>';
            td.append(op);
        }
    }
    function choose() {
        var a = document.getElementById("AnnoName");
var r=n.getShapeCanvas();
			if(anno==undefined)
			{

       
			anno = r.getAnnotation();
			}
        if (a.options.length > 0) {
            var text = a.options[a.selectedIndex].text;
            for (var j = 0; j < anno.length; j++) {
                if (anno[j].name == text) {
                    i = anno[j];
                    isDisabled(i);
                    r.setSelectedEnable(!1);
                    r.getActiveShape(i);
					var txtMea=$(i.txtElmt).html();
					if(txtMea!=null)
					{
					txtMea=$(i.txtElmt).html().split("描述")[0];
					}
                    i && $("#linewidth").val(i.width), $("#Picker").val(i.color), $("#annoname").val(i.name), $("#annodesc").val(i.description), $("#Measurement").html(txtMea),
    i.isSelected = true, r.showImageAnnotations();
                }
            }
        }
    }
    function isDisabled(t) {
        var input = $('input[name="identitys"]');
        for (var i = 0; i < input.length; i++) {
            if (t.type != "Position")
                input[i].disabled = "disabled";
            else
                input[i].disabled = "";
        }
    }
    var c = "#annotationoption", ct = 0, Anno,
    t, u, r, i, s = '<div id="annotationoption"     \t data-role="dialog" \t\t data-overlay-theme="e"          title="' + i18n.t("AnnotationsDialog.Title") + '"          class="ui-dialog-topright"> \t\t<div data-role="content" data-theme="c"> \t\t\t<div data-role="fieldcontain">\t\t\t <label class="ui-item-label" >' + i18n.t("AnnotationsDialog.Name") + '</label>\t\t\t\t<select id="AnnoName" class="ui-item-field"  ></select>\t\t\t\t</div>\t\t\t\t<div data-role="fieldcontain">\t\t\t<label style="margin-left:10px">' + i18n.t("AnnotationsDialog.Delete") + ' </label><img style="width:32px;height:32px;margin-right:10px;" src="image/sc.png" id="delete"/>\t\t\t\t<label > ' + i18n.t("AnnotationsDialog.Hidden") + ' </label><img src="image/T_hidd.png" id="hide" style="margin-right:10px"/>\t\t\t\t<label > ' + i18n.t("AnnotationsDialog.AllHidden") + ' </label><img src="image/qT_hidd.png"  style="margin-right:0px" id="ahide"/>\t\t\t\t\t  </div>  <div data-role="fieldcontain"> \t\t\t\t<label for="lineWidth" class="ui-item-label" >' + i18n.t("AnnotationsDialog.LineWidth") + '</label> \t\t\t\t<select id="linewidth" class="ui-item-field" > \t\t\t\t\t<option value="1">1</option> \t\t\t\t\t<option value="2">2</option> \t\t\t\t\t<option value="5" selected="selected">5</option> \t\t\t\t\t<option value="10">10</option> \t\t\t\t\t<option value="20">20</option> \t\t\t\t</select> \t\t\t</div> \t\t\t<div data-role="fieldcontain"> \t\t\t\t<label for="annoName" class="ui-item-label" >' + i18n.t("AnnotationsDialog.Name") + '</label> \t\t\t\t<input type="text" id="annoname" class="ui-item-field" /> \t\t\t</div> \t\t\t<div data-role="fieldcontain"> \t\t\t\t<label for="annoDesc" class="ui-item-label" >' + i18n.t("AnnotationsDialog.Description") + '</label> \t\t\t\t<textarea id="annodesc" class="ui-item-field" rows="2"></textarea> \t\t\t</div> \t\t\t<div data-role="fieldcontain" id="color"> \t\t\t\t<label for="color" class="ui-item-label" >' + i18n.t("AnnotationsDialog.Color") + '</label> \t\t\t\t<input type="text" id="Picker"  /> \t\t\t\t</div>             <div data-role="fieldcontain">       <label for="chkAutoShow" data-inline="true" >' + i18n.t('AnnotationsDialog.AutoShow') + '</label>     <input type="checkbox" id="chkautoShow"/>        </div><div data-role="fieldcontain"><table><tr><td style="width:30%"><label>' + i18n.t('AnnotationsDialog.PositionIcon') + '</label></td><td><input type="radio" name="identitys" value="1"  checked="checked"/><img src="image/pin_1.png"  alt=""></td><td><input type="radio" name="identitys" value="2"/><img src="image/pin_2.png"></td><td><input type="radio" name="identitys" value="3" /><img src="image/pin_3.png"  alt=""></td><td><input type="radio" name="identitys" value="4"/><img src="image/pin_4.png"  alt=""></td></tr></table></div>     <div data-role="fieldcontain" ><div class="ui-item-label" style="height:120px;line-height:120px;display:block;overflow:hidden;float:left;font-weight:bold">' + i18n.t('AnnotationsDialog.Measurement') + '</div><div   id="Measurement" style="padding:5px 0;;overflow:hidden;float:left;display:inline"></label><div></div>       \t\t</div> \t</div>';
    if ($(window).width() <= 400) {
        s = '<div id="annotationoption"     \t data-role="dialog" \t\t data-overlay-theme="e"          title="' + i18n.t("AnnotationsDialog.Title") + '"          class="ui-dialog-topright"> \t\t<div data-role="content" data-theme="c"> \t\t\t<div data-role="fieldcontain">\t\t\t <label class="ui-item-label">' + i18n.t("AnnotationsDialog.Name") + '</label>\t\t\t\t<select id="AnnoName" class="ui-item-field"  ></select>\t\t\t\t</div>\t\t\t\t<div data-role="fieldcontain">\t\t\t<label style="margin-left:10px">&nbsp;&nbsp;&nbsp;&nbsp;</label><img style="width:32px;height:32px;margin-right:10px;" src="image/sc.png" id="delete"/>\t\t\t\t<label >&nbsp;&nbsp;&nbsp;&nbsp;</label><img src="image/T_hidd.png" id="hide" style="margin-right:10px"/>\t\t\t\t<label >&nbsp;&nbsp;&nbsp;&nbsp;</label><img src="image/qT_hidd.png"  style="margin-right:0px" id="ahide"/>\t\t\t\t\t  </div>  <div data-role="fieldcontain"> \t\t\t\t<label for="lineWidth" class="ui-item-label" >' + i18n.t("AnnotationsDialog.LineWidth") + '</label> \t\t\t\t<select id="linewidth" class="ui-item-field" > \t\t\t\t\t<option value="1">1</option> \t\t\t\t\t<option value="2">2</option> \t\t\t\t\t<option value="5" selected="selected">5</option> \t\t\t\t\t<option value="10">10</option> \t\t\t\t\t<option value="20">20</option> \t\t\t\t</select> \t\t\t</div> \t\t\t<div data-role="fieldcontain"> \t\t\t\t<label for="annoName" class="ui-item-label" >' + i18n.t("AnnotationsDialog.Name") + '</label> \t\t\t\t<input type="text" id="annoname" class="ui-item-field" /> \t\t\t</div> \t\t\t<div data-role="fieldcontain"> \t\t\t\t<label for="annoDesc" class="ui-item-label" >' + i18n.t("AnnotationsDialog.Description") + '</label> \t\t\t\t<textarea id="annodesc" class="ui-item-field" rows="2"></textarea> \t\t\t</div> \t\t\t<div data-role="fieldcontain" id="color"> \t\t\t\t<label for="color" class="ui-item-label" >' + i18n.t("AnnotationsDialog.Color") + '</label> \t\t\t\t<input type="text" id="Picker"  /> \t\t\t\t</div>             <div data-role="fieldcontain">       <label for="chkAutoShow" data-inline="true" >' + i18n.t("AnnotationsDialog.AutoShow") + ' </label>     <input type="checkbox" id="chkautoShow"/>        </div><div data-role="fieldcontain"><table><tr><td style="width:30%"><label>' + i18n.t("AnnotationsDialog.PositionIcon") + '</label></td><td><input type="radio" name="identitys" value="1"  checked="checked"/><img src="image/pin_1.png"  alt=""></td><td><input type="radio" name="identitys" value="2"/><img src="image/pin_2.png"></td><td><input type="radio" name="identitys" value="3" /><img src="image/pin_3.png"  alt=""></td><td><input type="radio" name="identitys" value="4"/><img src="image/pin_4.png"  alt=""></td></tr></table></div>     <div data-role="fieldcontain" ><div class="ui-item-label" style="height:120px;line-height:120px;display:block;overflow:hidden;float:left;font-weight:bold"> ' + i18n.t("AnnotationsDialog.Measurement") + '</div><div   id="Measurement" style="padding:5px 0;;overflow:hidden;float:left;display:inline"></label><div></div>       \t\t</div> \t</div>';
    }
    (function () {
        h()
        hide()
    })(),
    this.show = function () {
        t.dialog("open")
        choose();
    }
    this.showEdit = function () {
        t.dialog("open");
        openChoose();
    }

};
var SlideCase = function (n) {
    function h() {
        t = $(s),

        t.attr("title", i18n.t("CaseInfoDialog.Title")),
        t.appendTo($("body")).dialog({
            open: loadText,
            autoOpen: !1,
            resizable: !1,
            modal: !0,
            width: "500",
            minHeight: "500"
            //            buttons: [{
            //                text: SlideViewerStrings.getString("Buttons.Ok"),
            //                click: function () {
            //                    $(this).dialog("close")
            //                }
            //            },
            //            {
            //                text: SlideViewerStrings.getString("Buttons.Cancel"),
            //                click: function () {

            //                    $(this).dialog("close")
            //                }
            //            }]
        });
    };
    function loadText() {
        r = n.getCurrentImage();
        var url = "../CasesHandler.ashx?ID=" + r.ID + "";
        $.ajax({
            type: "POST",
            url: url,
            cache: false,
            //            contentType: 'text/xml; charset="utf-8"',
            dataType: 'text',
            success: function (v) {
                document.getElementById("test").innerHTML = v;
            }

        });
    }
    var c = "#slidecase",
    t, u, r, i, s = '<div id="slidecase" ><textarea id="test" style="width:465px;height:410px;border:0;resize: none;" readonly="true"  ></textarea></div>';
    (function () {
        h();
    })(),
    this.show = function () {
        t.dialog("open")
    }
};
var ShotList = function (n) {
    function h() {
        t = $(div),
        $("[data-lang]", t).html(function () {
            return SlideViewerStrings.getString($(this).attr("data-lang"))
        }),
        t.attr("title", "截图列表"),
        t.appendTo($("body")).dialog({
            open: ShotList,
            autoOpen: !1,
            resizable: !1,
            modal: !1,
            width: "440",
            height: "600"
        });
    };
    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    }
    function getcookie(name) {
        var cookie_start = document.cookie.indexOf(name);
        var cookie_end = document.cookie.indexOf(";", cookie_start);
        return cookie_start == -1 ? '' : unescape(document.cookie.substring(cookie_start + name.length + 1, (cookie_end > cookie_start ? cookie_end : document.cookie.length)));
    }
    function ShotList() {
        r = n.getCurrentImage();
        data = r.ID
        var uid = getcookie("UserID"), ConsultID = getQueryString("ConsultID");
        uid = r.UserID;
        url = "http://" + host + "/K-RMCS.Web/SlideViewer/HTML5/ShotList.ashx";
        var obj;
        $.ajax({
            type: 'get',
            url: url,
            data: 'ID=' + data + '&UserID=' + uid + '&ram=' + Math.random() * 10000 + 1,
            success: function (response) {
                obj = eval("(" + response + ")");
                document.getElementById("ShotList").innerHTML = "";
                document.getElementById("ShotList").innerHTML = obj.div;
                var Shot = $("#ShotLists");
                Shot[0].innerHTML = "";
                Shot[0].innerHTML = obj.Sdiv;

            },
            Error: function (ex) {
                alert(ex);
            }
        });
    }
    var id = "#ShotList", host = window.location.host, data,
t, u, r, i, div = '<div id="ShotList"></div>', url;
    (function () {
        h();
    })(),
    this.show = function () {
        ShotList()
        t.dialog("open");
    }
}
var Demo = function (n) {
    function t() {
        var it, ttt;
        i = $(div),
        i.attr("title", i18n.t('ImageAdjustDialog.Title')),
        $(a, i).slider({
            min: 0,
            max: 300,
            value: gb(gamma),
            step: 1,
            slide: function (n, r) {
                gamma = g(r.value);
                $(a + "Value").html(gamma);
            },
            change: function () {
                if (gamma != ga) {
                    OpenImg();
                    ga = gamma;
                }

            }
        }),
           $(b, i).slider({
               min: 0,
               max: 100,
               value: 50,
               slide: function (n, r) {
                   contrast = con(r.value);
                   var num = Math.round((r.value / 100).toFixed(2).toString() * 200)
                   $(b + "Value").html(num + "%");
               },
               change: function () {
                   if (contrast != co) {
                       OpenImg();
                       co = contrast;
                   }
               }
           }),
            $(w, i).slider({
                min: 0,
                max: 100,
                value: 50,
                slide: function (n, r) {
                    light = rgb(r.value);
                    var num = Math.round((r.value / 100).toFixed(2).toString() * 200)
                    $(w + "Value").html(num + "%");
                },
                change: function () {
                    if (light != li) {
                        OpenImg();
                        li = light;
                    }

                }
            }),
        $(rgb_r, i).slider({
            min: 0,
            max: 100,
            value: 50,
            slide: function (n, r) {
                rgbR = rgb(r.value);
                var num = Math.round((r.value / 100).toFixed(2).toString() * 200)
                $(rgb_r + "Value").html(num + "%");
            },
            change: function () {
                if (rgbR != rr) {
                    rr = rgbR;
                    OpenImg();

                }
            }
        }),
        $(rgb_g, i).slider({
            min: 0,
            max: 100,
            value: 50,
            slide: function (n, r) {
                rgbG = rgb(r.value);
                var num = Math.round((r.value / 100).toFixed(2).toString() * 200)
                $(rgb_g + "Value").html(num + "%");
            },
            change: function () {
                if (rgbG != rg) {
                    OpenImg();
                    rg = rgbG;
                }
            }
        }),
        $(rgb_b, i).slider({
            min: 0,
            max: 100,
            value: 50,
            slide: function (n, r) {
                rgbB = rgb(r.value);
                var num = Math.round((r.value / 100).toFixed(2).toString() * 200)
                $(rgb_b + "Value").html(num + "%");
            },
            change: function () {
                if (rgbB != rbb) {
                    OpenImg();
                    rbb = rgbB;
                }
            }
        }),
        i.appendTo($("body")).dialog({
            open: tt,
            autoOpen: !1,
            resizable: !1,
            width: "500",
            modal: !1,
            buttons: [{
                text: i18n.t('ImageAdjustDialog.Compare'),
                mousedown: function () {
                    if (gamma != Color.gamma || contrast != Color.contrast || light != Color.light || rgbR != Color.rgbR || rgbG != Color.rgbG || rgbB != Color.rgbB) {
                        Compare.gamma = gamma, Compare.contrast = contrast, Compare.light = light, Compare.rgbR = rgbR, Compare.rgbG = rgbG, Compare.rgbB = rgbB;
                        gamma = Color.gamma, contrast = Color.contrast, light = Color.light, rgbR = Color.rgbR, rgbG = Color.rgbG, rgbB = Color.rgbB;
                        Num();
                    }
                },
                click: function () {
                    if (gamma != Compare.gamma || contrast != Compare.contrast || light != Compare.light || rgbR != Compare.rgbR || rgbG != Compare.rgbG || rgbB != Compare.rgbB) {
                        gamma = Compare.gamma, contrast = Compare.contrast, light = Compare.light, rgbR = Compare.rgbR, rgbG = Compare.rgbG, rgbB = Compare.rgbB;
                        Num();
                    }
                }
            },
              {
                  text: i18n.t('ImageAdjustDialog.Reset'),
                  click: function () {
                      if (gamma != webconfig.Gamma || contrast != webconfig.Contrast || light != webconfig.Light || rgbR != webconfig.RgbR || rgbG != webconfig.RgbG || rgbB != webconfig.RgbB) {
                          gamma = webconfig.Gamma, contrast = webconfig.Contrast, light = webconfig.Light, rgbR = webconfig.RgbR, rgbG = webconfig.RgbG, rgbB = webconfig.RgbB;
                          Num();
                      }
                  }
              },
            {
                text: i18n.t('ImageAdjustDialog.Apply'),
                click: function () {
                    Compare.gamma = gamma, Compare.contrast = contrast, Compare.light = light, Compare.rgbR = rgbR, Compare.rgbG = rgbG, Compare.rgbB = rgbB;
                    SetCookie("gamma", gamma); SetCookie("contrast", contrast); SetCookie("light", light); SetCookie("rgbR", rgbR); SetCookie("rgbG", rgbG); SetCookie("rgbB", rgbB);
                    $(this).dialog("close")
                }
            },
            {
                text: i18n.t('ImageAdjustDialog.Cancel'),
                click: function () {
                    if (gamma != Color.gamma || contrast != Color.contrast || light != Color.light || rgbR != Color.rgbR || rgbG != Color.rgbG || rgbB != Color.rgbB) {
                        gamma = Color.gamma, contrast = Color.contrast, light = Color.light, rgbR = Color.rgbR, rgbG = Color.rgbG, rgbB = Color.rgbB;
                        Num();
                        $(this).dialog("close")
                    }
                    else {
                        $(this).dialog("close")
                    }
                }
            }]
        })
    }
    function tt() {
        r = n.getCurrentImage()
        Num();
        NowRGB();
    }
    function OpenImg() {
        n.drawer.UpdateUrl(gamma, contrast, light, rgbR, rgbG, rgbB)
        n.drawer.reset();
        n.drawer.update()
    }
    function rgb(n) {
        var t = 0;
        return t = (.02 * n) - 1,
    t
    }
    function g(n) {
        var t = 2;
        return t = (0.5 + (n * .01)).toFixed(2),
        t
    }
    function con(n) {
        var t = 1;
        return t = n * .02,
        t
    }
    function gb(n) {
        var t
        return t = (n - 0.5) / .01,
    t
    }
    function rb(n) {
        var t = 50;
        return t = (n + 1) / .02,
    t
    }
    function cb(n) {
        var t = 50;
        return t = n / .02,
    t
    }
    function NowRGB() {
        return Color = { gamma: gamma, contrast: contrast, light: light, rgbR: rgbR, rgbG: rgbG, rgbB: rgbB };   //打开图像调节时的图像数据
    }
    function SetCookie(name, value) {
        var Days = 30; //此 cookie 将被保存 30 天
        var exp = new Date();
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
    }

    function Num() {
        var g = gb(gamma),
         c = cb(contrast);
        var n;
        $(a, i).slider({ value: g }),
        $(a + "Value").html(gamma),
        $(b, i).slider({ value: c }),
        $(b + "Value").html(Math.round((c / 100) * 200) + "%"),
        n = rb(light),
        $(w, i).slider({ value: n }),
        $(w + "Value").html(Math.round((n / 100) * 200) + "%"),
        n = rb(rgbR),
        $(rgb_r, i).slider({ value: n }),
        $(rgb_r + "Value").html(Math.round((n / 100) * 200) + "%"),
        n = rb(rgbG),
        $(rgb_g, i).slider({ value: n }),
        $(rgb_g + "Value").html(Math.round((n / 100) * 200) + "%"),
        n = rb(rgbB),
        $(rgb_b, i).slider({ value: n }),
        $(rgb_b + "Value").html(Math.round((n / 100) * 200) + "%");
    }

    var config = getGamma(),webconfig=getWebGamma(), gamma = config.Gamma, contrast = config.Contrast, light = config.Light, rgbR = config.RgbR, rgbG = config.RgbG, rgbB = config.RgbB, i, ga = config.Gamma, co = config.Contrast, li = config.Light, rr = config.RgbR, rg = config.RgbG, rbb = config.RgbB;
    var id = "#demo", v, Color, Compare = { gamma: config.Gamma, contrast: config.Contrast, light: config.Light, rgbR: config.RgbR, rgbG: config.RgbG, rgbB: config.RgbB }, //初始的图像数据
    a = "#gamma",
    rgb_r = "#red",
    rgb_g = "#green",
    rgb_b = "#blue",
    b = "#min",
    w = "#max",
     div = '<div id="demo" > \t\t<fieldset> \t\t\t\t<legend >' + i18n.t("ImageAdjustDialog.Gamma") + '</legend> \t\t\t\t<div data-role="fieldcontain"> \t\t\t\t\t<table class="adjustment-table" ><tr><td class="adjust-td-text" ><label class="adjustment-slider-text" for="gamma" >' + i18n.t("ImageAdjustDialog.Gamma") + '</label></td> \t\t\t\t\t<td  class="adjustment-td-slider"><div id="gamma" class="adjustment-slider" data-role="slider"></div></td>\t\t\t\t\t<td class="adjustment-td-value" ><label id="gammaValue" class="adjustment-slider-value">1</label></td></tr></table> \t\t\t\t</div> \t\t</fieldset> \t\t<fieldset> \t\t\t<legend>' + i18n.t("ImageAdjustDialog.SS") + '</legend> \t\t\t<div data-role="fieldcontain"> \t\t\t\t<table class="adjustment-table"><tr><td class="adjust-td-text"><label class="adjustment-slider-text" for="min" >' + i18n.t("ImageAdjustDialog.Contrast") + '</label></td> \t\t\t\t<td class="adjustment-td-slider"><div id="min" class="adjustment-slider" data-role="slider"></div></td> \t\t\t\t<td class="adjustment-td-value"><label id="minValue" class="adjustment-slider-value">100%</label></td></tr></table> \t\t\t</div> \t\t\t<div data-role="fieldcontain"> \t\t\t\t<table class="adjustment-table"><tr><td class="adjust-td-text"><label class="adjustment-slider-text" for="max" >' + i18n.t("ImageAdjustDialog.Brightness") + '</label></td> \t\t\t\t<td class="adjustment-td-slider"><div id="max" class="adjustment-slider" data-role="slider"></div></td> \t\t\t\t<td class="adjustment-td-value"><label id="maxValue" class="adjustment-slider-value">100%</label></td></tr></table> \t\t\t</div> \t\t</fieldset> \t\t<fieldset> \t\t\t<legend >' + i18n.t('ImageAdjustDialog.Channels') + '</legend> \t\t\t<div data-role="fieldcontain"> \t\t\t\t<table class="adjustment-table"><tr><td class="adjust-td-text"><label class="adjustment-slider-text" for="red" >' + i18n.t("ImageAdjustDialog.Red") + '</label></td> \t\t\t\t<td class="adjustment-td-slider"><div id="red" class="adjustment-slider" data-role="slider"></div></td> \t\t\t\t<td class="adjustment-td-value"><label id="redValue" class="adjustment-slider-value">50%</label></td></tr></table> \t\t\t</div> \t\t\t<div data-role="fieldcontain"> \t\t\t\t<table class="adjustment-table"><tr><td class="adjust-td-text"><label class="adjustment-slider-text" for="green">' + i18n.t("ImageAdjustDialog.Green") + '</label></td> \t\t\t\t<td class="adjustment-td-slider"><div id="green" class="adjustment-slider" data-role="slider"></div></td> \t\t\t\t<td class="adjustment-td-value"><label id="greenValue" class="adjustment-slider-value">1</label></td></tr></table> \t\t\t</div> \t\t\t<div data-role="fieldcontain"> \t\t\t\t<table class="adjustment-table"><tr><td class="adjust-td-text"><label class="adjustment-slider-text" for="blue" >' + i18n.t("ImageAdjustDialog.Blue") + '</label></td> \t\t\t\t<td class="adjustment-td-slider"><div id="blue" class="adjustment-slider" data-role="slider"></div></td> \t\t\t\t<td class="adjustment-td-value"><label id="blueValue" class="adjustment-slider-value">1</label></td></tr></table> \t\t\t</div> \t\t\t \t\t\ \t\t</fieldset> \t</div>';
    (function () {
        t();
    })(),
    this.show = function () {
        i.dialog("open");
    }
    this.Nows = function () {
        OpenImg();
    }
},
WebVersion = function (n) {
    function h() {
        t = $(div),
        t.appendTo($("body")).dialog({
            open: f,
            autoOpen: !1,
            resizable: !1,
            modal: !0,
            width: "600",
            height: "400"
        });
    };
    function f() {
        var a = $(".ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix");
        $(".ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").hide();
    }
    var t, ver = getVer(), div = '<div id="Version" ><fieldset><div style="position:relative" ><img style="margin-top:15%" src="image/web.png" alt=""><img src="image/Sca_1.jpg" alt=""  style="width:300px;height:250px;float:right;margin-right:10px"/><label style="position:absolute;bottom:-100px;left:50px">Version ' + ver + '</label></div></fieldset><fieldset><div class="bj-jb"  style="margin-top:10px;height:60px;background-image:url(image/bjd.png);position:relative" ><img style="height:42px;width:115px;margin:15px;" src="image/logo4.png"  alt="" /><label style="position:absolute;top:15px;right:10px;font-size:small;font-weight:normal;font-color:gray">宁波江丰生物 科技因你而生</label><label style="position:absolute; bottom:2px;right:10px;font-size:small;font-weight:normal;font-color:gray">ⓒCopyright 2013-2014 KFBIO. All Rights Reserved</label></div></fieldset></div>';
    (function () {
        h();
    })(),
this.show = function () {
    t.dialog("open");
}
}
var SliderPanel = function (n, t, i) {
    function e() {
        u.elmt = document.createElement("div"),
        $(u.elmt).addClass("ui-corner-all ui-dialog-content slider-panel-contain").hide(),
        f = $('<label for="slider3D" class="slider-panel-text">0</label>'),
        r = $('<div id="slider3D" class="slider-panel-slider"></div>').slider({
            min: n,
            max: t,
            setp: i,
            slide: function (n, t) {
                f.html(t.value.toString())
            }
        }),
        $(u.elmt).append(f).append(r)
    }
    var u = this,
    r, f;
    this.elmt,
    function () {
        e()
    } (),
    this.setData = function (n, t, i, u) {
        r.slider("option", "min", n),
        r.slider("option", "max", t),
        r.slider("option", "step", u || 1),
        r.slider("value", i || 0)
    },
    this.change = function (n) {
        r.bind("slidechange", n)
    },
    this.val = function () {
        return parseInt(r.slider("value"))
    },
    this.show = function () {
        $(u.elmt).show()
    },
    this.hide = function () {
        $(u.elmt).hide()
    }
};
var Toolbar = function () {
    function t() {
        n.addClass("toolbar"),
        n.append("<table><tr></tr></table>")
    }
    this.elmt = document.createElement("div");
    var n = $(this.elmt);
    (function () {
        t()
    })(),
    this.addToolstrip = function (t) {
        var i = n.find("tr");
        i.append(t.elmt)
    },
    this.hide = function () {
        n.hide()
    },
    this.show = function () {
        n.show()
    }
},
Toolstrip = function (n, t) { //n 为百分比 t为对齐方式
    function u() {
        var r = i;
        r.addClass("toolstrip"),
        t && r.css("text-align", t),
        n && r.css("width", n)
    }
    var f = this,
    i, r;
    this.elmt = document.createElement("td"),
    i = $(this.elmt),
    r = [],
    function () {
        u()
    } (),
    this.addItem = function (n) {
        i.append(n.elmt),
        n.toolstrip = f,
        r.push(n)
    }
},
ToolButton = function (n, t, i, r, u) {
    function e() {
        var e = f,
        o;
        i && e.bind("click", r, i),
        t ? (e.addClass("ui-btn ui-btn-up-a ui-btn-inline ui-btn-corner-all ui-shadow toolbutton-jqm"), e.append("<span class='ui-btn-inner ui-btn-corner-all'><span class='ui-btn-text'></span></span>"), e.find(".ui-btn-text").text(t)) : (e.addClass("toolbutton"), o = document.createElement("span"), $(o).addClass("toolbutton-inner toolbtn-icon-" + n), e.append(o)),
        u && e.attr("title", u)
    }
    this.elmt = document.createElement("a"),
    this.data = r;
    var f = $(this.elmt);
    (function () {
        e()
    })(),
    this.hide = function () {
        f.hide()
    },
    this.show = function () {
        f.css("display", "")
    },
    this.setSelected = function (i) {
        if (!t) {
            var r = "toolbtn-icon-" + n + "-selected";
            i ? f.find(".toolbutton-inner").addClass(r) : f.find(".toolbutton-inner").removeClass(r)
        }
    }
},
ToolLabel = function (n, t) {
    function r() {
        var r = i;
        r.addClass("toollabel"),
        t && r.css("width", t),
        r.text(n)
    }
    this.elmt = document.createElement("span");
    var i = $(this.elmt);
    (function () {
        r()
    })(),
    this.setText = function (n) {
        i.text(n)
    }
},
MainToolbar = function (n) {
    function ut() {
        i.onback && i.onback()
    }
    function it() {
        n.viewport && n.viewport.goHome()
    }
    function tt(t) {
        n && n.zoomToObj(t.data.obj)
    }
    function a() {
        //var i = n.getCurrentSlide(),
        t;
        //        i && f.setText(i.name),
        t = n.getCurrentImage(),
        t && g(t.Rate)
    }
    function l() {   //倍率
        var i = n.getCurrentImage(),
        t = n.getScale();
        i && t && h.setText((i.Rate * t).toFixed(2) + "x")
    }
    function rt() {
        SlideViewerSupport.canvas ? SlideViewerConfig.compactBrowsing() ? e.show() : i.onShowAnnotationToobar && i.onShowAnnotationToobar() : o.show()
    }
    function IniDialog() {
        b = new ImageAdjustmentDialog(n),
        c = new OptionsDialog(n),
        e = new CompactDialog,
        o = new NotSupportedDialog
    }
    function IniToolstrip() {
        var n = new Toolstrip("80%", "left"),
        i,
        l;
        for (t.addToolstrip(n), r = new ToolButton("back", null, ut, null, SlideViewerStrings.getString("Tooltips.BtnBackToBase")), r.hide(), n.addItem(r), y = new ToolButton("home", null, it, null, SlideViewerStrings.getString("Tooltips.BtnHome")), n.addItem(y), i = 0; i < u.length; i++) l = new ToolButton(u[i].toString() + "x", null, tt, {
            obj: u[i]
        }),
        l.hide(),
        s.push(l),
        n.addItem(l);
        n = new Toolstrip("20%", "center"),
        t.addToolstrip(n),
        f = new ToolLabel("", "10%"),
        n.addItem(f),
        h = new ToolLabel("", "90%"),
        n.addItem(h)

        //        SlideViewerConfig.enableImageAdjustment && (v = new ToolButton(null, SlideViewerStrings.getString("Buttons.ImageAdjustment"),
        //        function () {
        //            SlideViewerConfig.compactBrowsing() ? e.show() : SlideViewerSupport.imageAdjustment ? b.show() : o.show()
        //        }), n.addItem(v));
        //        SlideViewerConfig.enableAnnotation && (p = new ToolButton(null, SlideViewerStrings.getString("Buttons.Annotation"), rt, null), n.addItem(p)),
        //        SlideViewerConfig.showOption && (w = new ToolButton(null, SlideViewerStrings.getString("Buttons.Options"),
        //        function () {
        //            c.show();
        //        }), n.addItem(w))
    }
    function IniOpen() {
        n.isOpen() && (a(), l()),
        n.addEventListener("open", a),
        n.addEventListener("animation", l)
    }
    function g(n) {
        for (var t = 0; t < u.length; t++) u[t] > n ? s[t].hide() : s[t].show()
    }
    var t = new Toolbar,
    u = [2, 4, 10, 20, 40],
    s = [],
    r,
    y,
    v,
    p,
    w,
    f,
    h,
    i = this,
    b,
    c,
    e,
    o;
    this.elmt = t.elmt,      //div
    this.onShowAnnotationToobar,
    this.onShowAdjustImage,
    this.onback,
    function () {
        //        IniDialog(),
        IniToolstrip(),
        IniOpen();
    } (),
    this.show = function () {
        t && t.show()
    },
    function SlideSize() {
        i.addControl(new BottomPanel(i).elmt, Seadragon.ControlAnchor.BOTTOM_RIGHT)
    },
    this.hide = function () {
        t && t.hide()
    },
    this.setBackButton = function (n) {
        n ? r.show() : r.hide()
    }
},
AnnotationToolbar = function (n) {
    function i(i) {
        for (var r, e, ti = 0; ti < t.length; ti++) if (r = t[ti], e = r.data == i.data, r.setSelected(e), e) {
            f.hide();
            switch (i.data.type) {
                case "hand":
                    n.getShapeCanvas().setSelectedEnable(!1);
                    break;
                case "select":
                    n.getShapeCanvas().setSelectedEnable(!0);
                    break;
                default:
                    //                    r.data.type == AnnotationType.Polygon && f.show(),
                    //                    n.getShapeCanvas().setDrawAnnotationType(r.data.type)

                    n.showMessage(SlideViewerStrings.getString("Annotations.Draw." + r.data.type));
                    //                    n.getShapeCanvas().setDrawAnnotationType(r.data.type);
                    n.getShapeCanvas().setDrawAnnotationType(eval("AnnotationType." + i.data.type));
            }
        }
    }
    function l() {
        var t = n.getShapeCanvas();
        t.setSelectedEnable(!1),
        o.resetAnnotationButtons(),
        o.onback && o.onback(),
        t.isShapeChanged && n.canWrite() && s.show()
    }
    function c() {
        e = new AnnotationDialog(n),
        s = new AnnotationSaveDialog(n);
    }
    function h() {
        var s = new Toolstrip("150px", "left"),
        h,
        o;
        r.addToolstrip(s),
        h = new ToolLabel(SlideViewerStrings.getString("Labels.AnnotationType")),
        s.addItem(h),
        s = new Toolstrip("60%", "left"),
        r.addToolstrip(s),
        o = new ToolButton("hand", null, i, {
            type: "hand"
        }),
        s.addItem(o),
        t.push(o),
        o = new ToolButton("selectanno", null, i, {
            type: "select"
        }),
        s.addItem(o),
        t.push(o),
        o = new ToolButton("line", null, i, {
            type: AnnotationType.Line,
            text: SlideViewerStrings.getString("Annotations.Draw.Line")
        }),
        s.addItem(o),
        t.push(o),
        o = new ToolButton("arrow", null, i, {
            type: AnnotationType.Arrow,
            text: SlideViewerStrings.getString("Annotations.Draw.Arrow")
        }),
        s.addItem(o),
        t.push(o),
        o = new ToolButton("rect", null, i, {
            type: AnnotationType.Rectangle,
            text: SlideViewerStrings.getString("Annotations.Draw.Rectangle")
        }),
        s.addItem(o),
        t.push(o),
        o = new ToolButton("ellipse", null, i, {
            type: AnnotationType.Ellipse,
            text: SlideViewerStrings.getString("Annotations.Draw.Ellipse")
        }),
        s.addItem(o),
        t.push(o),
        o = new ToolButton("angle", null, i, {
            type: AnnotationType.Angle,
            text: SlideViewerStrings.getString("Annotations.Draw.Angle")
        }),
        s.addItem(o),
        t.push(o),
        o = new ToolButton("arc", null, i, {
            type: AnnotationType.Arc,
            text: SlideViewerStrings.getString("Annotations.Draw.Arc")
        }),
        s.addItem(o),
        t.push(o),
        o = new ToolButton("circle3", null, i, {
            type: AnnotationType.CircleThreePoints,
            text: SlideViewerStrings.getString("Annotations.Draw.CircleThreePoints")
        }),
        s.addItem(o),
        t.push(o),
        o = new ToolButton("polygon", null, i, {
            type: AnnotationType.Polygon,
            text: SlideViewerStrings.getString("Annotations.Draw.Polygon")
        }),
        s.addItem(o),
        t.push(o),
        o = new ToolButton("position", null, i, {
            type: AnnotationType.Position,
            text: SlideViewerStrings.getString("Annotations.Draw.Position")
        }),
        s.addItem(o),
        t.push(o),
        s = new Toolstrip("40%", "right"),
        r.addToolstrip(s),
        f = new ToolButton(null, SlideViewerStrings.getString("Buttons.Finish"),
        function () {
            n.getShapeCanvas().finishDrawing()
        }),
        f.hide(),
        s.addItem(f),
        u = new ToolButton(null, SlideViewerStrings.getString("Buttons.Save"),
        function () {
            n.saveAnnotations(),
            u.hide()
        }),
        u.hide(),
        s.addItem(u),
        o = new ToolButton(null, SlideViewerStrings.getString("Buttons.Edit"),
        function () {
            e.show()
        }),
        s.addItem(o),
        o = new ToolButton(null, SlideViewerStrings.getString("Buttons.Delete"),
        function () {
            n.getShapeCanvas().deleteAnnotation()
        }),
        s.addItem(o),
        o = new ToolButton(null, SlideViewerStrings.getString("Buttons.Back"), l),
        s.addItem(o)
    }
    var r = new Toolbar,
    t = [],
    f,
    u,
    o = this,
    e,
    s;
    this.elmt = r.elmt,
    this.onback,
    function () {
        c();
        h();
    } (),
    this.show = function () {
        r && r.show()
    },
    this.hide = function () {
        r && r.hide()
    },
    this.setSaveButton = function (n) {
        n ? u.show() : u.hide()
    },
    this.resetAnnotationButtons = function () {
        for (var n = 0; n < t.length; n++) t[n].setSelected(!1);
        f.hide()
    },
    this.showAnnotationDialog = function () {
        e && e.show()
    }
},
ViewerToolbar = function (n, t) {
    function r() {
        i.tbAnnotation.hide(),
        i.tbMain.hide(),
        i.tbMain.onShowAnnotationToobar = function () {
            i.tbAnnotation.show(),
            i.tbMain.hide()
        },
        n.addEventListener("open",
        function () {
            var t = n.getCurrentImage();
            i.tbMain.setBackButton(t.id >= 0)
        }),
        i.tbMain.onback = function () {
            n.openImage()
        },
        i.tbAnnotation.onback = function () {
            i.tbMain.show(),
            i.tbAnnotation.hide()
        },
        i.elmt.appendChild(i.tbMain.elmt),
        i.elmt.appendChild(i.tbAnnotation.elmt)
    }
    this.elmt = document.getElementById(t); //div tool
    var i = this;
    this.tbMain = new MainToolbar(n), //主要工具栏
    this.tbAnnotation = new AnnotationToolbar(n), //注释工具栏
    function () {
        r()
    } ()
};
var ZoomPanel = function (n) {
    function i() {
        var u = $.support.touch ? "touchstart" : "click",
        f = $('<a class="zoom-button zoom-button-in zoom-icon-in" title="' + SlideViewerStrings.getString("Tooltips.ZoomIn") + '"><span></span></a>'),
        i;
        f.bind(u,
        function () {
            n.viewport && (n.viewport.zoomBy(t / 1), n.viewport.applyConstraints(), e.stopPropagation && e.stopPropagation())
        }),
        i = $('<a class="zoom-button zoom-button-out zoom-icon-out" title="' + SlideViewerStrings.getString("Tooltips.ZoomOut") + '"><span></span></a>'),
        i.bind(u,
        function () {
            n.viewport && (n.viewport.zoomBy(1 / t), n.viewport.applyConstraints(), e.stopPropagation && e.stopPropagation())
        }),
        $(r.elmt).addClass("zoom-panel").append(f).append(i)
    }
    var r = this,
    t;
    this.elmt = document.createElement("div"),
    t = 2,
    function () {
        i()
    } ()
};
var ZoomBotton = function (n) {
    function bl() {
        var i = n.getCurrentImage(),
        t = n.getScale();
        i && t && $("#xbl").html((i.Rate * t).toFixed(2))
        var d = (i.Rate * t).toFixed(2);
        Number(d) > Number(i.Rate) ? $("#xbl").css('color', 'red') : $("#xbl").css('color', 'black');
    }
    function a() {
        //        var i = n.getCurrentSlide(),
        t;
        //                i && f.setText(i.name),
        t = n.getCurrentImage(),
        t && g(t.Rate)
    }
    function ScaleBotton(fun, param) {
        u = $.support.touch ? "touchstart" : "click";
        var x = $('<a class="toolbutton" style=" margin-top:-9px"></a>');
        var type = '';
        if (param != "home") {
            type = "x";
        }
        var sp = $('<span class="toolbutton-inner toolbtn-icon-' + param + type + '" ></span>');
        x.append(sp);

        x.bind(u, param, fun)
        return x;
    }

    function gohome() {
        n.viewport && n.viewport.goHome()
    }
    function zoomTo(t) {
        n && n.zoomToObj(t.data)
    }
    var NavBar = document.createElement("div");
    $(NavBar).addClass("NavBar_zoomControlContainer");



    var NavBar_zoom = document.createElement("div");
    $(NavBar_zoom).addClass("NavBar_zoomDrop");
    $(NavBar_zoom).css('position', 'absolute');
    $(NavBar_zoom).css('display', 'block');

    var home = ScaleBotton(gohome, 'home');
    var Scale2 = ScaleBotton(zoomTo, '2');
    var Scale4 = ScaleBotton(zoomTo, '4');
    var Scale10 = ScaleBotton(zoomTo, '10');
    var Scale20 = ScaleBotton(zoomTo, '20');
    var Scale40 = ScaleBotton(zoomTo, '40');
    var spp = $('<div  id="xbl" href="#" style="font-size:14px;margin-top:10px;font-weight:bold;text-align:center;border: 1px dashed blue;" >0.00</div>');
    $(NavBar_zoom).append(spp);
    $(NavBar_zoom).append(home);
    $(NavBar_zoom).append(Scale2);
    $(NavBar_zoom).append(Scale4);
    $(NavBar_zoom).append(Scale10);
    $(NavBar_zoom).append(Scale20);
    $(NavBar_zoom).append(Scale40);
    $(NavBar).append(NavBar_zoom);

    var r = this;
    var t;
    var xt = 2;
    this.elmt = document.createElement("div");
    $(r.elmt).css("position", "absolute");
    if (ScaleBarTop != "#")
        $(r.elmt).css("top", ScaleBarTop + "px");
    if (ScaleBarRight != "#")
        $(r.elmt).css("right", ScaleBarRight + "px");
    if (ScaleBarBottom != "#")
        $(r.elmt).css("bottom", ScaleBarBottom + "px");
    if (ScaleBarLeft != "#")
        $(r.elmt).css("left", ScaleBarLeft + "px");

    u = $.support.touch ? "touchstart" : "click";

    var zoomIn = $('<a  class="NavBar_button NavBar_toolButton NavBar_zoomIn" href="#" uici="NB.ZC.ZoomIn"></a>');
    zoomIn.bind(u, function () {

        n.viewport && (n.viewport.zoomBy(xt / 1), n.viewport.applyConstraints())
    })
    var zoomOut = $('<a  class="NavBar_button NavBar_toolButton NavBar_zoomOut" href="#" uici="NB.ZC.ZoomOut"></a>');
    zoomOut.bind(u, function () {
        n.viewport && (n.viewport.zoomBy(1 / xt), n.viewport.applyConstraints())
    })
    var umove = $.support.touch ? "touchmove" : "mousemove";
    zoomIn.bind(umove, function () {

        $(".NavBar_zoomDrop").css("display", "block");
    })
    zoomOut.bind(umove, function () {

        $(".NavBar_zoomDrop").css("display", "block");
    })
    $(NavBar).append(zoomIn);

    $(NavBar).append(zoomOut);


    $(r.elmt).append(NavBar),
     function () {
         n.isOpen() && bl(),
        n.addEventListener("open", a),
        n.addEventListener("animation", bl)
     } ()
}

var NavBotton = function (n) {
    var u = $.support.touch ? "touchstart" : "click",
        f = $('<span><img id="navimg" src="images/navshow.png" width="20px" style="cursor:pointer" ></span>');
    f.bind(u,
        function () {
            e = n.getNavMap();
            if ($(e.elmt).css("display") == "block") {
                e.setVisibility(0);
                $("#navimg").attr("src", "images/navhidden.png");
            }
            else {
                $("#navimg").attr("src", "images/navshow.png");
                e.setVisibility(!0);
            };
        });
    var r = this;
    this.elmt = document.createElement("div");
    $(r.elmt).css("position", "absolute");
    $(r.elmt).css("top", "2px");
    $(r.elmt).css("left", "0px");

    $(r.elmt).append(f);

}
var BottomPanel = function (n) {
    function i() {
        var u = $.support.touch ? "touchstart" : "click",
        f = $('<a ><span><img src="images/Nav.png"></span></a>');
        f.bind(u,
        function () {
            e = n.getNavMap();
            if ($(e.elmt).css("display") == "block") {
                e.setVisibility(0);
            }
            else {
                e.setVisibility(!0);
            };
        });
        SlideSize = $('<div style="position:absolute;right:5px;bottom:7px"><img style="width:80px;height:82px;" src="image/bk_1.png" /><label id="bl"></label></div>');
        //        SlideSize = $('<input type="text" id="bl" readonly="readonly" />');
        SlideSize.bind("mouseover", function () {
            allx.style.display = "block";
            $("#myCanvas").show();
        });
        if (isMobile() == true) {
            SlideSize.bind(u, function () {
                if (allx.style.display == "none") {
                    allx.style.display = "block";
                    $("#myCanvas").show();
                }
                else {
                    allx.style.display = "none";
                    $("#myCanvas").hide();
                }
            });
        }
        allx = document.createElement("div");

        allx.style.position = "absolute";
        allx.style.display = "none";
        allx.id = "ysbl";
        var o;
        o = new multiple(tt, blu[0]);
        $(allx).append(o);
        o = new multiple(tt, blu[1]);
        $(allx).append(o);
        o = new multiple(tt, blu[2]);
        $(allx).append(o);
        o = new multiple(tt, blu[3]);
        $(allx).append(o);
        o = new multiple(tt, blu[4]);
        $(allx).append(o);
        o = new multiple(tt, blu[5]);
        $(allx).append(o);
        $(r.elmt).append(SlideSize, allx);
        multiple = "hide";
    }
    function multiple(fun, arry) {
        var isIE6 = !!window.ActiveXObject && !window.XMLHttpRequest;
        var x, image, right, bottom, u = $.support.touch ? "touchstart" : "click";
        if (isIE6 == true) {    //IE6 true 
            arry == "40" ? (image = "image/bei4040.png", right = "150px", bottom = "0px") : arry == "20" ? (image = "image/bei2020.png", right = "155px", bottom = "55px") : arry == "10" ? (image = "image/bei1010.png", right = "140px", bottom = "105px") : arry == "4" ? (image = "image/bei444.png", right = "95px", bottom = "135px") : arry == "2" ? (image = "image/bei222.png", right = "45px", bottom = "145px") : (image = "image/bei111.png", right = "-5px", bottom = "125px");
            x = $('<a class="multipleHide"><span><img src="' + image + '" style="right:' + right + ';bottom:' + bottom + '" class="multiple"></span></a>');
        }
        else {
            arry == "40" ? (image = "image/bei40.png", right = "150px", bottom = "0px") : arry == "20" ? (image = "image/bei20.png", right = "155px", bottom = "55px") : arry == "10" ? (image = "image/bei10.png", right = "140px", bottom = "105px") : arry == "4" ? (image = "image/bei4.png", right = "95px", bottom = "135px") : arry == "2" ? (image = "image/bei2.png", right = "45px", bottom = "145px") : (image = "image/bei1.png", right = "-5px", bottom = "125px");
            x = $('<a class="multipleHide"><span><img src="' + image + '" style="right:' + right + ';bottom:' + bottom + '" class="multiple"></span></a>');
        }
        fun & x.bind(u, arry, fun)
        return x;
    }
    function bl() {
        var i = n.getCurrentImage(),
        t = n.getScale();
        i && t && $("#bl").html((i.Rate * t).toFixed(2) + "X")
        var d = (i.Rate * t).toFixed(2);
        Number(d) > Number(i.Rate) ? $("#bl").css('color', 'red') : $("#bl").css('color', 'black');
    }
    function a() {
        //        var i = n.getCurrentSlide(),
        t;
        //                i && f.setText(i.name),
        t = n.getCurrentImage(),
        t && g(t.Rate)
    }
    function tt(t) {
        n && n.zoomToObj(t.data)
    }
    function imageOp() {
        n.isOpen() && bl(),
        n.addEventListener("open", a),
        n.addEventListener("animation", bl)
    }
    var blu = [40, 20, 10, 4, 2, 1];
    var r = this, e;
    this.elmt = document.createElement("div"),
     canvas = $('<canvas id="myCanvas"  style="display:none;width:400px;height:200px;position:absolute;bottom:-10px;right:0px;border-color:#3A5FCD"></canvas>');
    $(r.elmt).append(canvas),
    function () {
        i()
        imageOp()
    } ()
};
var AnnotationMenu = function (SeaViewer) {
    function it(i) {
        for (var r, e, u = 0; u < t.length; u++) if (r = t[u], e = r.data == i.data, e) {
            $(ul).hide();
            $(oul).hide();
            switch (i.data.type) {
                case "hand":
                    SeaViewer.getShapeCanvas().setSelectedEnable(!1);
                    break;
                case "select":
                    SeaViewer.getShapeCanvas().setSelectedEnable(!0);
                    break;
                default:
                    SeaViewer.getShapeCanvas().setSelectedEnable(!0);
                    //SeaViewer.showMessage(SlideViewerStrings.getString("Annotations.Draw." + r.data.type));
                    SeaViewer.getShapeCanvas().setDrawAnnotationType(eval("AnnotationType." + i.data.type));
            }
        }
    }

    show = function () {
        var o;

        if (isIElast()) {

            if (getQueryString("SwitchAnno") != "1") {
                o = new LiButton("Line", null, it, {
                    type: AnnotationType.Line,
                    text: i18n.t("Tool.Line")
                }, "zx")
                t.push(o);
                o = new LiButton("Arrow", null, it, {
                    type: AnnotationType.Arrow,
                    text: i18n.t("Tool.Arrow")
                }, "jt")
                t.push(o);
                o = new LiButton("Rectangle", null, it, {
                    type: AnnotationType.Rectangle,
                    text: i18n.t("Tool.Rectangle")
                }, "jx")
                t.push(o);
                o = new LiButton("Ellipse", null, it, {
                    type: AnnotationType.Ellipse,
                    text: i18n.t("Tool.Ellipse")
                }, "ty")
                t.push(o);
                o = new LiButton("Curve", null, it, {
                    type: AnnotationType.Curve,
                    text: i18n.t("Tool.Curve")
                }, "pen")
                t.push(o);
                o = new LiButton("Position", null, it, {
                    type: AnnotationType.Position,
                    text: i18n.t("Tool.Position")
                }, "pin")
                t.push(o);
                o = new LiButton(null, null, null, null, null)
            }
        }
        o = new LiButton("ImageAdjust", null, imageAdjust, {
            text: i18n.t("Tool.Adjustments")
        }, "adjust");

        if (getQueryString("SwitchExport") == "1") {
            o = new LiButton("ImageAdjust2", null, outImage, {
                text: i18n.t("Tool.ImageOut")
            }, "outImage");
        }

        if (isIElast()) {
            o = new LiButton(null, null, null, null, null)
        }
        o = new LiButton("other", null, ii, {
            text: i18n.t("Tool.Others")
        }, "other")

        //        o = new LiButton("language", null, ii, {
        //            text: i18n.t("Language.Language")
        //        }, "language")
        //        new LiButton("languagezh", "language", ii, {
        //            text: "中文"
        //        }, "language")
        //        new LiButton("languageen", "language", ii, {
        //            text: "English"
        //        }, "language")

        o = new LiButton("about", null, ShowVer, {
            text: i18n.t("Tool.Abous")
        }, "about")
        new LiButton("NavMap", "other", NavMap, {
            text: i18n.t("Tool.Navigation")
        }, "nav");
        //        new LiButton("Tag", "other", Label, {
        //            text: SlideViewerStrings.getString("MainMenu.Tag")
        //        }, "label");
        //        new LiButton("Ruler", "other", Ruler, {
        //            text: SlideViewerStrings.getString("MainMenu.Ruler")
        //        }, "rule");
        new LiButton("CaseInfo", "other", scase, {
            text: i18n.t("Tool.Case")
        }, "caseinfo");
        if (isIElast()) {
            if (getQueryString("SwitchAnno") != "1") {
                new LiButton("Edit", "other", Option, {
                    text: i18n.t("Tool.AnnotationOption")
                }, "edit");
            }
        }

        new LiButton("ImageInfo", "other", info, {
            text: i18n.t("Tool.ImageInfo")
        }, "ImageInfo");


        new LiButton("ZEdit", "right", ShowEdit, {
            text: i18n.t("index.edit")
        }, "Edit");
        new LiButton("Clear", "right", delAnnotation, {
            text: i18n.t("index.delete")
        }, "sc");
        var sUserAgent = navigator.userAgent.toLowerCase();
        var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
        var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
        var bIsMidp = sUserAgent.match(/midp/i) == "midp";
        var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
        var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
        var bIsAndroid = sUserAgent.match(/android/i) == "android";
        var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
        var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
        if (!(bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM)) {
            $(div.elmt).append(ul, oul, rul);
        }
        else {
           
        }
     

    };
  
    function IniDialog() {

        //        b = new ImageAdjustmentDialog(SeaViewer);
        slideinfo = new SlideInfo(SeaViewer);
        annotation = new AnnotationOption(SeaViewer);
        slidecase = new SlideCase(SeaViewer);
        //        ShotList = new ShotList(SeaViewer);
        demo = new Demo(SeaViewer);
        ver = new WebVersion(SeaViewer);

    }
    SeaI = SeaViewer;
    var b, slideinfo, annotation, slidecase, demo, rul, ver;
    var div = this, e, s,
    t = [];
    this.elmt = document.createElement("div"),
    this.elmt.id = "MSlide",
     $(this.elmt).css("position", "absolute"),
    ul = document.createElement("ul"),
    oul = document.createElement("ul"),
    rul = document.createElement("ul"),
    rul.id = "RightUl"
    ul.id = "MainUl",
    oul.id = "OtherUl",
    function () {
        show();
        //        otherDiv();
        IniDialog();
    } ();
    $(rul).addClass("dropdown-menu");
    $(ul).addClass("dropdown-menu");
    $(oul).addClass("dropdown-menu");
    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null)
            return unescape(r[2]);
        return null;
    }
    function imageAdjust() {
        s
        demo.show(),
      hide();
    }
    function newGuid() {
        var guid = "";
        for (var i = 1; i <= 32; i++) {
            var n = Math.floor(Math.random() * 16.0).toString(16);
            guid += n;
            if ((i == 8) || (i == 12) || (i == 16) || (i == 20))
                guid += "-";
        }
        return guid;
    }
    function outImage() {
        var CurrentImage = SeaViewer.getCurrentImage();
        var WindowHeight = document.body.clientHeight;
        var WindowWidth = document.body.clientWidth;
        var n = SeaViewer.getScale();
        var Nav = SeaViewer.getNav();
        var NavWidth = Nav.Width;
        var NavHeight = Nav.Height;
        var rect = SeaViewer.getRectPoint();
        var Xzoom = (CurrentImage.Rate * n).toFixed(2);
        var rectX = (((CurrentImage.Width / CurrentImage.Rate) * Xzoom) / NavWidth) * rect.topX;
        var rectY = (((CurrentImage.Height / CurrentImage.Rate) * Xzoom) / NavHeight) * rect.topY;
        var WebServerPath;


        WebServerPath = "../OuPutImgHandler.ashx";
        var data = "?CaseNo=" + CurrentImage.CaseNo + "&Left=" + rectX + "&Top=" + rectY + "&Width=" + CurrentImage.Width + "&Height=" + CurrentImage.Height + "&ViewWidth=" + WindowWidth + "&ViewHeight=" + WindowHeight + ""
        + "&scale=" + Xzoom + "&SlideID=" + CurrentImage.ID + "&Slidezoom=" + CurrentImage.Rate + "&TileSize=" + CurrentImage.TileSize + "&kfbpath=" + CurrentImage.KfbioPath;
        var save_link = document.createElement('a');
        save_link.id = "slideout";
        save_link.href = WebServerPath + data;
        save_link.download = newGuid(); // "slide";
        if (navigator.appName != "Microsoft Internet Explorer") {
            var event = document.createEvent('MouseEvents');
            event.initEvent('click', false, true);
            save_link.dispatchEvent(event);
        } else {
            save_link.setAttribute('display', 'none');
            save_link.setAttribute('target', '_blank');
            document.getElementById("body").appendChild(save_link);
            document.getElementById("slideout").click();
            $("#slideout").remove();
        }
        // window.open(WebServerPath + data);
        hide();
    }

    function delAnnotation() {
        var u = SeaViewer.getShapeCanvas();
        u.deleteAnnotation();
        hide();

    }
    function ShowVer() {
        ver.show();
        hide();
    }





    function Delete() {

    }
    function Close() {
        var canvas = document.getElementById("drawCanvas");
        var context = canvas.getContext("2d");
        context.clear();
    }
    function ShotShow() {
        ShotList.show();
        hide();
        hideLoading();
    }
    function ii() {
        $(oul).show();
    }
    function Ruler() {
        $("#slideRuler").toggle();
        document.getElementById("slideRuler").style.display == "none" ? SlideViewerConfig.showRuler = !1 : SlideViewerConfig.showRuler = !0;
        hide()
    }
    function ShowEdit() {
        annotation.showEdit();
        hide();
    }
    function NavMap() {
        e = SeaViewer.getNavMap();
        if ($(e.elmt).css("display") == "block") {
            e.setVisibility(0);
        }
        else {
            e.setVisibility(!0);
        };
        hide()
    }
    function Option() {
        annotation.show();
        hide()
    }
    function info() {
        slideinfo.show();
        slideinfo.text();
        hide()
    }
    function scase() {
        slidecase.show();
        hide()
    }
    function hide() {
        $(ul).hide();
        $(oul).hide();
        $(rul).hide();
    }
    function Label() {
        if ($("#label").css("display") == "block") {
            $("#label").hide();
        } else {
            //            var url, r;
            //            r = SeaViewer.getCurrentImage();
            //            url = "../LabelHandler.ashx?ID=" + r.ID;
            //            $("#labelImgnone").attr('id') == "labelImgnone" ? ($("#labelImgnone").attr('src', url), $("#labelImgnone").attr('id', 'labelImg')) : !0;
            $("#label").show();
        };
        $(oul).hide();
        $(ul).hide();
    }


    function LiButton(name, t, fun, data, img) {
        function event() {
            fun ? $(li).bind(u, data, fun) : !0;
            if (isIElast()) {
                url = "image/" + img + ".png";
                sj = "image/sj.png";
            }
            else {
                url = "image/" + img + ".gif";
                sj = "image/sj.gif";
            }
            t ? t == "right" ? ($(li).append("<img src='" + url + "' style='width:35px;height:35px'><a tabindex='-1' style='background:transparent;color:white'>" + data.text + "</a>"), $(rul).append(li)) : ($(li).append("<img src='" + url + "' style='width:35px;height:35px'><a tabindex='-1' style='background:transparent;color:white'>" + data.text + "</a>"), $(oul).append(li)) : name ? name == "other" ? ($(li).append("<img src='" + sj + "' style='float:right'><img src='" + url + "' style='width:35px;height:35px;'><a tabindex='-1' style='background:transparent;color:white' >" + data.text + "</a>"), $(ul).append(li)) : ($(li).append("<img  src='" + url + "' style='width:35px;height:35px;'><a tabindex='-1' style='background:transparent;color:white'>" + data.text + "</a>"), $(ul).append(li), $(li).bind("mouseover", isHide)) : ($(li).addClass("divider"), $(ul).append(li));

        }
        function isHide() {
            $(oul).hide();
        }
        li = document.createElement("li");
        var url, sj;
        if (name == "other") {
            u = "mouseover";
        }
        else {
            u = $.support.touch ? "touchstart" : "click";
        }
        this.data = data,
        function () {
            if (getQueryString("SwitchAnno") != "1") {

                if (img == "zx")
                    $("#img_zx").bind(u, data, fun)
                if (img == "jx")
                    $("#img_jx").bind(u, data, fun)
                if (img == "jt")
                    $("#img_jt").bind(u, data, fun)
                if (img == "ty")
                    $("#img_ty").bind(u, data, fun)
                if (img == "pen")
                    $("#img_pen").bind(u, data, fun)
                if (img == "pin")
                    $("#img_pin").bind(u, data, fun)
                if (img == "sc")
                    $("#btn_delete").bind(u, data, fun)
                if (img == "Edit")
                    $("#btn_edit").bind(u, data, fun)
            }
            if (img == "adjust")
                $("#img_process").bind(u, data, fun)
            if (img == "ImageInfo")
                $("#img_info").bind(u, data, fun)


            event();
        } ();
    };
};

var SlideRuler = function (SeaViewer) {
    var ruler = this
    this.elmt = document.createElement("div");
    ruler.elmt.style.position = "absolute";
    isIElast() ? div = $("<div id='slideRuler'  style='position:absolute;left:20px;bottom:20px;display:inline'><hr  style='border:0;background-color:black;height:5px;color:black;'/><div  id='rulerHeight1' style='left: 0px; width: 5px; height: 15px; bottom: 6px; position: absolute; background-color: black;'><label   style='position: absolute;top:10px;color:black'>0</label></div><div id='rulerHeight2' style='left: 70px; width: 5px; height: 15px; bottom: 6px; position: absolute; background-color: black;'><label  id='rulerNum1' style='position: absolute;top:10px;color:black'>1</label></div><div id='rulerHeight3' style='left: 135px; width: 5px; height: 15px; bottom: 6px; position: absolute; background-color: black;'><label id='rulerNum2' style='position: absolute;top:10px;color:black'>2</label></div><div id='rulerHeight4' style='left: 200px; width: 5px; height: 15px; bottom: 6px; position: absolute; background-color: black;'><label id='rulerNum3' style='position: absolute;top:10px;color:black'>3</label></div><div id='rulerHeight5' style='left: 265px; width: 5px; height: 15px; bottom: 6px; position: absolute; background-color: black;'><label id='rulerNum4' style='position: absolute;top:10px;color:black'>4</label></div><div id='rulerHeight6' style='left: 325px; width: 5px; height: 15px; bottom: 6px; position: absolute; background-color: black;'><label id='rulerNum5' style='position: absolute;top:10px;color:black'>5</label></div></div>") :
    div = $("<div id='slideRuler'  style='position:absolute;left:60px;bottom:20px;display:inline'><hr  style='border:0;background-color:black;height:5px;color:black'/><div  id='rulerHeight1' style='left: 0px; width: 5px; height: 15px; bottom: 14px; position: absolute; background-color: black;'><label   style='position: absolute;top:15px;left:-2px'>0</label></div><div id='rulerHeight2' style='left: 70px; width: 5px; height: 15px; bottom: 14px; position: absolute; background-color: black;'><label  id='rulerNum1' style='position: absolute;top:15px;left:-2px'>1</label></div><div id='rulerHeight3' style='left: 135px; width: 5px; height: 15px; bottom: 14px; position: absolute; background-color: black;'><label id='rulerNum2' style='position: absolute;top:15px;left:-2px'>2</label></div><div id='rulerHeight4' style='left: 200px; width: 5px; height: 15px; bottom: 14px; position: absolute; background-color: black;'><label id='rulerNum3' style='position: absolute;top:15px;left:-2px'>3</label></div><div id='rulerHeight5' style='left: 265px; width: 5px; height: 15px; bottom: 14px; position: absolute; background-color: black;'><label id='rulerNum4' style='position: absolute;top:15px;left:-2px'>4</label></div><div id='rulerHeight6' style='left: 325px; width: 5px; height: 15px; bottom: 14px; position: absolute; background-color: black;'><label id='rulerNum5' style='position: absolute;top:15px;left:-2px'>5</label></div></div>")
    $(ruler.elmt).append(div);
};
var SlideTag = function (SeaViewer) {
    var host = window.location.host;
    var herf = window.location.href;
    var file = herf.split('/')
    var id = getQueryString("SlideID");
    var rdiv = this;
    this.elmt = document.createElement("div");
    var adiv = document.createElement("div"), tag, url, r;
    adiv.style.display = "block";
    adiv.style.position = "absolute";
    adiv.id = "label"
    //url = "http://" + host + "/K-RMCS.SlideViewer/Viewer/LabelHandler.ashx?ID=" + id;   //url
    adiv.style.left = "25px"; adiv.style.top = "25px";
    tag = $('<a><span><img id=\"labelImage\"  alt=""  style="width:180px;height:180px"/></span></a>');
    $(adiv).append(tag);
    $(rdiv.elmt).append(adiv);
};
var MainButton = function (seaViewer) {
    function i() {
        var u = $.support.touch ? "touchstart" : "click",
        f = $('<a class="zoom-button toolbtn-icon-in toolbtn-icon-menu" title="菜单"><span></span></a>'),
        i;
        f.bind(u,
        function () {
            var ul = document.getElementById("MainUl"), oul = document.getElementById("OtherUl");
            $("#MainUl").toggle();
            ul.style.left = (w * 0.75) + "px"; ul.style.top = (h * 0.75) + "px";

        }),
        $(r.elmt).addClass("panel-menu").append(f)
    }
    var r = this,
    t, h = document.body.clientHeight, w = document.body.clientWidth;
    this.elmt = document.createElement("div"),
    function () {
        i()
    } ()
};

function SaveImgs() {
    if (Shotcount >= configshotcount) {
        alert("截图只能截图" + configshotcount + "张！")
        return;
    }
    SeaViewer = SeaI;
    showLoading();
    var CurrentImage = SeaViewer.getCurrentImage();
    var WindowHeight = document.body.clientHeight;
    var WindowWidth = document.body.clientWidth;
    var n = SeaViewer.getScale();
    var Nav = SeaViewer.getNav();
    var NavWidth = Nav.Width;
    var NavHeight = Nav.Height;
    var rect = SeaViewer.getRectPoint();
    var Xzoom = (CurrentImage.Rate * n).toFixed(2);
    var rectX = (((CurrentImage.Width / CurrentImage.Rate) * Xzoom) / NavWidth) * rect.topX;
    var rectY = (((CurrentImage.Height / CurrentImage.Rate) * Xzoom) / NavHeight) * rect.topY;
    var WebServerPath;
    var host = window.location.host;
    var ProxyIP = getQueryString("ProxyIP");
    if (ProxyIP != "")
        ProxyIP = "&ProxyIP=" + ProxyIP;
    var UserIdentity = getQueryString("UserIdentity");
    if (UserIdentity != "")
        UserIdentity = "&UserIdentity=" + escape(UserIdentity);
    var ZJSlideID = getQueryString("ZJSlideID");
    if (ZJSlideID != "")
        ZJSlideID = "&ZJSlideID=" + ZJSlideID;
    var shotpara = "";
    if (shotwidth != "0" && shotheight != "0") {
        shotpara = "&ShotWidth=" + shotwidth + "&ShotHeight=" + shotheight;
    }
   
    WebServerPath = "../CaptureImgHandler.ashx";
    var data = "CaseNo=" + CurrentImage.CaseNo + "&Left=" + rectX + "&Top=" + rectY + "&Width=" + CurrentImage.Width + "&Height=" + CurrentImage.Height + "&ViewWidth=" + WindowWidth + "&ViewHeight=" + WindowHeight + ""
        + "&scale=" + Xzoom + "&SlideID=" + CurrentImage.ID + "&Slidezoom=" + CurrentImage.Rate + "&TileSize=" + CurrentImage.TileSize + "&kfbpath=" + CurrentImage.KfbioPath + ProxyIP + UserIdentity + ZJSlideID + shotpara;
    $.ajax({
        type: "POST",
        url: WebServerPath,
        data: data,
        cache: false,
        //            contentType: 'text/xml; charset="utf-8"',
        dataType: 'text',
        success: function (v) {
            Ajax(CurrentImage);
            hideLoading();
            window.parent.postMessage("[ShotSuccess]" + v, '*');
        }
        //complete: Ajax(CurrentImage)
    });
}
var Shotcount = 0;
function Ajax(a) {
    var host = window.location.host;
    var CaseNo;

    WebServerPath = "../ShotListHandler.ashx";
    if (uploadurl != "")
        WebServerPath =uploadurl+"/ShotListHandler.ashx";

    var CaseNo = getQueryString("caseno");
    if (CaseNo != "")
        CaseNo = "&CaseNo=" + CaseNo;
    var Kfbpath = getQueryString("kfbpath");
    if (Kfbpath != "")
        Kfbpath = "&kfbpath=" + escape(Kfbpath);
    var UserIdentity = getQueryString("UserIdentity");
    if (UserIdentity != "")
        UserIdentity = "&UserIdentity=" + escape(UserIdentity);
    var ZJSlideID = getQueryString("ZJSlideID");
    if (ZJSlideID != "")
        ZJSlideID = "&ZJSlideID=" + ZJSlideID;
    var div = "";
    $.ajax({
        url: WebServerPath,
        dataType: 'text',
        type: 'POST',
        cache: false,
        data: CaseNo + Kfbpath + UserIdentity + ZJSlideID,
        success: function (v) {
            $("#newshot").html("");
            var ShotPath = "";
            var Path = v.split("|");
            Shotcount = Path.length - 1;
            for (var i = 0; i < Path.length; i++) {
                if (Path[i] != "" && Path[i] != undefined) {

                    ShotPath = "../ScreenShot/" + Path[i] + "?ram=" + Math.random(0, 9999);
                    if (uploadurl != "")
                        ShotPath = uploadurl + "/ScreenShot/" + Path[i] + "?ram=" + Math.random(0, 9999); ;
                    //                    div += "<a style=\"display:inline-block;width:60px;height:50px;text-align:center\">";
                    div += "<div style=\"width:60px;height:50px;float:left;margin:2px\" ><div  style=\"position: absolute;\"><img src=\"" + ShotPath + "\"  style=\"width:60px;height:50px;\"></div>";
                    if (getQueryString("SwitchCut") == 1) {
                        div += "<div style=\"position: absolute;cursor:pointer; margin-left:40px\" title=\"" + i18n.t("Capture.Delete") + "\"><img src=\"image/shotdelete.png\" width=\"20px\"  onclick=\"DelAjax('" + Path[i] + "')\"/></div>";
                    }
                    div += "<div style=\"position: absolute;font-weight:bold\">" + (i + 1) + "</div>";
                    //  div += "<div><button style=\"background:url('image/shotdelete.png');border:none; width:32px; height:32px\"  onclick=\"DelAjax('" + Path[i] + "')\"></button></div></div>";
                    div += "</div>";
                }

            }

            if (Path == "") {
//                if (getQueryString("SwitchAnno") == "1") {
//                    $("#one").css("display", "none");
//                    $("#xtooldiv").css("display", "none");
//                }
                div += "<div style=\"margin-top:40px; margin-left:25px\">" + i18n.t("Capture.NoCapture") + "</div>";

            }
            else {
//                var cwidth = 190; ;
//                if (getQueryString("SwitchCut") != "1") {
//                    $("#li_shot").remove();
//                    cwidth = 160;
//                }
//                if (getQueryString("SwitchAnno") == "1") {
//                    $("#li_anno").remove();
//                    cwidth = 160;
//                }


              //  $("#one").css("display", "");
                //$("#xtooldiv").css("display", "");
               // $("#xtooldiv").css("left", cwidth+"px");
            }
            //$("#ShotLists")[0].innerHTML = div;

            $("#newshot").html(div);
        }
    });
}

function DelAjax(a) {
    var host = window.location.host;
    WebServerPath = "../DeleteShotHandler.ashx?localpath=" + a + "";
    if (uploadurl != "")
        WebServerPath =uploadurl+ "/DeleteShotHandler.ashx?localpath=" + a + "";
    $.ajax({
        url: WebServerPath,
        dataType: 'text',
        type: 'POST',
        cache: false,
        success: function (v) {
            Ajax(v);
        }
    });
}

var ShotLists = function (seaViewer) {
    function i2() {



        div += "<div id=\"ShotLists\" style=\"position:absolute;left:10px;bottom:280px;width:300px;height:250px;max-height:250px;overflow:auto;overflow-y:auto;-webkit-overflow-y:auto;-webkit-overflow-scrolling:touch;border:2px solid #D7D2D2;/*background-color:white*/\">"
        div += "</div>";
        //div += "<span style=\"position:absolute;bottom:500px;left 5px;width:75px\">截图列表</span>";
        div += "<img id=\"jtlb\" src=\"image/jtlbss.png\" style=\"position:absolute;bottom:490px;left:-10px;width:75px\">";
        div += "<div id=\"shot\" style=\"position:absolute;left:310px;bottom:280px;background:white;border:2px solid #D7D2D2;border-left-width:0px\" onmouseover=\"MoveOver(this)\"  onmouseout=\"MoveOut(this)\" onclick=\"ck(this)\" ><img id=\"ShotImg\" style=\"width:21px;height:246px\" src=\"img/la_no.png\" /></div>"
        $(r.elmt).append(div);
        Ajax(seaViewer);
    }
    function i() {
//        var div = '<div style="position:absolute;left:0px;bottom:2px;border:min-width:0px;max-width:140px;height:100px;">'
//        + '<div id="ShotLists" style="position:absolute;height:100px;min-width:122px;max-width:140px;background:white;overflow-y:hidden;-webkit-overflow-y:hidden;border: 1px solid rgb(49, 157, 206)"> </div> '
//        + '<div id=\"shot\" style="border: 1px solid rgb(49, 157, 206);position:absolute; margin-left:120px"  onclick=\"ShowShotImg(this)\" ><img id=\"ShotImg\" src=\"img/la_no.png\" style="height:100px" /></div>'
//        + '<div  style="position:absolute;width:20px; height:20px;cursor: pointer;margin-left:120px" title="上" onclick="scrollup()" id="divscrollup" ></div>'
//        + '<div  style="position:absolute; margin-top:80px;width:20px; height:20px;cursor: pointer;margin-left:120px" title="下" onclick="scrolldown()" id="divscrolldown" >'
//        + '</div><div>';
//        $(r.elmt).append(div);
        Ajax(seaViewer);
    }
    var r = this, div = "";
    this.elmt = document.createElement("div"),
        function () {
            i()
        } ()
};

var SlideLists = function (seaViewer) {
    function i() {

        div += "<div id=\"SlideLists\" style=\"position:absolute;left:10px;bottom:100px;width:270px;height:125px;max-height:125px;overflow:hidden;overflow-y:auto;-webkit-overflow-y:auto;-webkit-overflow-scrolling:touch;border: 2px solid rgb(215, 210, 210);\" ><ul id=\"SlideUl\" style=\"margin:0px;padding:0px\">"
        div += "</ul></div><div id=\"slides\" style=\"position:absolute;left:280px;bottom:100px;background-color:white;border: 2px solid rgb(215, 210, 210);border-left-width:0px;\" onmouseover=\"MoveOver(this)\"  onmouseout=\"MoveOut(this)\" onclick=\"ck(this)\"><img id=\"SlideImg\" style=\"width:12px;height:121px\" src=\"img/la_no.png\" /></div>";
        $(r.elmt).append(div);
    }
    var r = this, div = "";
    this.elmt = document.createElement("div"),
    function () {
        i()
    } ()
}

function SaveHyImgs() {

    SeaViewer = SeaI;
    showLoading();
    var CurrentImage = SeaViewer.getCurrentImage();
    var WindowHeight = document.body.clientHeight;
    var WindowWidth = document.body.clientWidth;
    var n = SeaViewer.getScale();
    var Nav = SeaViewer.getNav();
    var NavWidth = Nav.Width;
    var NavHeight = Nav.Height;
    var rect = SeaViewer.getRectPoint();
    var Xzoom = (CurrentImage.Rate * n).toFixed(2);
    var rectX = (((CurrentImage.Width / CurrentImage.Rate) * Xzoom) / NavWidth) * rect.topX;
    var rectY = (((CurrentImage.Height / CurrentImage.Rate) * Xzoom) / NavHeight) * rect.topY;
    var WebServerPath;
    var host = window.location.host;
    var ProxyIP = getQueryString("ProxyIP");
    if (ProxyIP != "")
        ProxyIP = "&ProxyIP=" + ProxyIP;
    var UserIdentity = getQueryString("UserIdentity");
    if (UserIdentity != "")
        UserIdentity = "&UserIdentity=" + escape(UserIdentity);
    var ZJSlideID = getQueryString("ZJSlideID");
    if (ZJSlideID != "")
        ZJSlideID = "&ZJSlideID=" + ZJSlideID;
    var shotpara = "";
   var shotwidth=0,shotheight=0
    if (shotwidth != "0" && shotheight != "0") {
        shotpara = "&ShotWidth=" + shotwidth + "&ShotHeight=" + shotheight;
    }
   
    WebServerPath = "../CaptureImgHandler.ashx";
    var data = "CaseNo=" + CurrentImage.CaseNo + "&Left=" + rectX + "&Top=" + rectY + "&Width=" + CurrentImage.Width + "&Height=" + CurrentImage.Height + "&ViewWidth=" + WindowWidth + "&ViewHeight=" + WindowHeight + ""
        + "&scale=" + Xzoom + "&SlideID=" + CurrentImage.ID + "&Slidezoom=" + CurrentImage.Rate + "&TileSize=" + CurrentImage.TileSize + "&kfbpath=" + CurrentImage.KfbioPath + ProxyIP + UserIdentity + ZJSlideID + shotpara;
    $.ajax({
        type: "POST",
        url: WebServerPath,
        data: data,
        cache: false,
        //            contentType: 'text/xml; charset="utf-8"',
        dataType: 'text',
        success: function (v) {
            GetHyShotList();
            hideLoading();
           
        }
        //complete: Ajax(CurrentImage)
    });
}

function getcookie(name) {
    var cookie_start = document.cookie.indexOf(name);
    var cookie_end = document.cookie.indexOf(";", cookie_start);
    return cookie_start == -1 ? '' : unescape(document.cookie.substring(cookie_start + name.length + 1, (cookie_end > cookie_start ? cookie_end : document.cookie.length)));
}
var BtnShot = function (SeaViewer) {
    var r = this, div = "";
    this.elmt = document.createElement("div");
    div += "<div style=\"position:absolute;right:10px;top:260px\" ><button class=\" btn btn-primary \" style=\"width:60px;color:white; padding:2px\" id=\"shotinput\" onclick=\"SaveImgs()\">" + i18n.t("Capture.Capture") + "</button></div>";
    $(r.elmt).append(div);
}
SeadragonLiYViewer.createViewer = function (n) {
        function f() {
            var n = $(u).height() || 45;
            $(r).height($(window).height()),
                        $(t).height($(r).height())

            //$(r).height($(window).height());
        }
        //        function e(n) {
        //            if (SlideViewerConfig.exitConfirm && i && i.dataChanged() && i.canWrite()) {
        //                var t = n || window.event;
        //                return n && (n.returnValue = SlideViewerStrings.getString("Messages.ExitConfirm")),
        //                SlideViewerStrings.getString("Messages.ExitConfirm")
        //            }
        //        }
        var r = document.getElementById(n),
        u = document.createElement("div"),
        t,
        i;
        u.id = n + "_toolbar",
        t = document.createElement("div"),
        t.id = n + "_viewer", //
        r.appendChild(u),
        r.appendChild(t),
        f();
        //        document.getElementById(t.id).addEventListener('touchstart', function (e) { e.preventDefault(); }, false);

        // $(window).resize(f).on("beforeunload", e);
        return i = new SeadragonLiYViewer(t.id, u.id);
    }
