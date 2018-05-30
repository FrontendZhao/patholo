var NavigationView = function (n, t, i) {
    function lt() {
        $("#Thumbnail").remove(),
        f = document.createElement("div"),
        f.id = "Thumbnail",
        f.style.width = t + u,
        f.style.height = i + u,
        f.style.top = 10 + u,
        f.style.left = 10 + u,
        SlideViewerSupport.canvas ? (y = document.createElement("canvas"), y.width = t, y.height = i, y.id = "cavView", f.appendChild(y), k = new Image, k.src = n, k.onload = function () {
            c.refresh(),
            c.imgLoaded = !0
        }) : (p = document.createElement("img"), p.id = "imgView", p.src = n, p.alt = "", f.appendChild(p),p.style.width = t + u, p.style.height = i + u),
        o = document.createElement("div"),
        o.id = "hLine",
        o.style.top = i / 2 + u,
        o.style.width = t + u,
        f.appendChild(o),
        e = document.createElement("div"),
        e.id = "vLine",
        e.style.left = t / 2 + u,
        e.style.height = i + u,
        f.appendChild(e),
        r = document.createElement("div"),
        r.id = "viewRect",
        r.style.top = (i - 50) / 2 + u,
        r.style.left = (t - 50) / 2 + u;
        //        r.className = "ViewRect";
        //        r.style.filter = "alpha(opacity = 50)";
        var s = $(r);
        $.support.touch ? (s.bind("touchstart", et), s.bind("touchmove", nt), s.bind("touchend", tt), $(f).bind("touchstart", ct)) : (s.mousedown(ut), s.mouseup(d), $(f).mouseleave(g), $(f).mousedown(it)),
        f.appendChild(r)
    }
    function ct(n) {
        var t = n.originalEvent;
        if (t.preventDefault(), s = t.targetTouches[0].pageX,
         h = t.targetTouches[0].pageY,
          o.style.top = parseFloat(h - w - v) + u,
          e.style.left = parseFloat(s - b - v) + u,
          r.style.top = parseFloat(h - w - parseFloat(r.style.height) / 2 - v) + u,
           r.style.left = parseFloat(s - b - parseFloat(r.style.width) / 2 - v) + u,
            c.onUserMove) {
            var a = parseFloat(r.style.left) + parseFloat(r.style.width) / 2,
            y = parseFloat(r.style.top) + parseFloat(r.style.height) / 2,
            i = a / (parseFloat(r.style.width) * l),
            f = y / (parseFloat(r.style.width) * l);
            c.onUserMove(i, f)
        }
        return n.stopPropagation(),
        !1
    }
    function et(n) {
        a = !0,
        n.stopPropagation();
        var t = n.originalEvent;
        t.preventDefault(),
        s = t.targetTouches[0].pageX,
        h = t.targetTouches[0].pageY
    }
    function tt(n) {
        n.stopPropagation();
        var t = n.originalEvent;
        t.preventDefault(),
        a = !1
    }
    function nt(n) {
        var t, f, i;
        if (n.stopPropagation(), t = n.originalEvent, t.preventDefault(), a && t.targetTouches.length == 1 && (f = s - t.targetTouches[0].pageX, i = h - t.targetTouches[0].pageY, s = t.targetTouches[0].pageX, h = t.targetTouches[0].pageY, r.style.top = parseFloat(r.style.top) - i + u, r.style.left = parseFloat(r.style.left) - f + u, o.style.top = parseFloat(o.style.top) - i + u, e.style.left = parseFloat(e.style.left) - f + u, c.onUserMove)) {
            var p = parseFloat(r.style.left) + parseFloat(r.clientWidth) / 2,
            w = parseFloat(r.style.top) + parseFloat(r.clientHeight) / 2,
            v = p / (parseFloat(r.style.width) * l),
            y = w / (parseFloat(r.style.width) * l);
            c.onUserMove(v, y)
        }
    }
    function d() {
        return a = !1,
        $(r).mousemove(null),
        !1
    }
    function g() {
        return a = !1,
        !1
    }
    function ut(n) {
        return n.stopPropagation(),
        a = !0,
        s = n.pageX,
        h = n.pageY,
        $(f).mousemove(ft),
        !1
    }
    function ft(n) {
        n.stopPropagation();
        var i = 0,
        t = 0,
        v = 0,
        f = 0;
        if (a) {
            if (v = n.pageX, f = n.pageY, i = v - s, t = f - h, s = v, h = f, t == 0 && i == 0) return !1;
            if (r.style.top = parseFloat(r.style.top) + t + u, r.style.left = parseFloat(r.style.left) + i + u, o.style.top = parseFloat(o.style.top) + t + u, e.style.left = parseFloat(e.style.left) + i + u, c.onUserMove) {
                var w = parseFloat(r.style.left) + parseFloat(r.style.width) / 2,
                b = parseFloat(r.style.top) + parseFloat(r.style.height) / 2,
                y = w / (parseFloat(r.style.width) * l),
                p = b / (parseFloat(r.style.width) * l);
                c.onUserMove(y, p)
            }
            return !1
        }
    }
    function it(n) {
        if (s = n.pageX, h = n.pageY, o.style.top = parseFloat(h - w - v) + u, e.style.left = parseFloat(s - b - v) + u, r.style.top = parseFloat(h - w - parseFloat(r.style.height) / 2 - v) + u, r.style.left = parseFloat(s - b - parseFloat(r.style.width) / 2 - v) + u, c.onUserMove) {
            var f = parseFloat(r.style.left) + parseFloat(r.style.width) / 2,
            a = parseFloat(r.style.top) + parseFloat(r.style.height) / 2,
            t = f / (parseFloat(r.style.width) * l),
            i = a / (parseFloat(r.style.width) * l);
            c.onUserMove(t, i)
        }
        return n.stopPropagation(),
        !1
    }
    function rt() {
        $(f).css({
            position: "relative",
            "z-index": "0",
            overflow: "hidden",
            border: "1px solid #319DCE"
        }),
        $(y).css({
            "z-index": "0",
            position: "absolute"
        }),
        $(p).css({
            "z-index": "0"
        }),
        $(o).css({
            height: "1px",
            "line-height": "1px",
            position: "absolute",
            left: "0px",
            "background-color": "#FF0000",
            "z-index": "0"
        }),
        $(e).css({
            width: "1px",
            "line-height": "1px",
            position: "absolute",
            top: "0px",
            "background-color": "#FF0000",
            "z-index": "0"
        }),
        $(r).css({
            border: "1px solid #FF0000",
            "background-color": "#FFFFFF",
            position: "absolute",
            width: "50px",
            height: "50px",
            cursor: "pointer",
            "z-index": "0",
            top: "0px",
            left: "0px",
            filter: "alpha(opacity=50)",
            opacity: "0.5"
        })
    }
    var c = this,
    a = !1,
    o, e, at = null,
    p = null,
    y = null,
    k = null,
    f = null,
    r = null,
    s, h, st = 25,
    ot = 25,
    b = 0,
    w = 0,
    u = "px",
    l, yt, vt, t, i, v = 1,
    ht;
    this.imgLoaded = !1,
    this.onUserMove,
    function () {
        lt(),
        rt(),
        c.elmt = f
    } (),
    this.isOnDragging = function () {
        return a
    },
    this.setVisibility = function (n) {
        n ? $(f).show() : $(f).hide()
    },
    this.refresh = function () {
        var n = y.getContext("2d");
        n.clearRect(0, 0, t, i),
        n.drawImage(k, 0, 0, t, i)
    },
    this.getCanvas = function () {
        return y
    },
    this.UpdateViewRect = function (n, i, f, s) {
        (l = n, ht = s, a) || (width = t / l, height = width / s,
         topX = t * i,
         topY = t * f, r.style.width = width + u,
         r.style.height = height + u,
          r.style.top = topY + u,
           r.style.left = topX + u, 
          o.style.top = height / 2 + topY + u, 
          e.style.left = width / 2 + topX + u)
        var vit = { topX: topX, topY: topY };
        return vit;
    },
    this.UpdateThumbnailOrigin = function (n, t) {
        b = n,
        w = t
    }
};
var ShapeCanvas = function (n) {
    function wt() {
        tt = !0
    }
    function dt() {
        pt(),
        u.showImageAnnotations()
    }
    function ii() {
        tt = !1
    }
    function at() {
        var t = n.viewport.getContainerSize();
        a.width = t.x,
        a.height = t.y,
        y.width = t.x,
        y.height = t.y,
        w.width = t.x,
        w.height = t.y,
        h != null && (it.resetContainerSize(t.x, t.y), ut.resetContainerSize(t.x, t.y), u.showImageAnnotations()),
        i.style.width = t.x + "px",
        i.style.height = t.y + "px"
    }
    function pt() {
        var r = n.viewport.getBounds(!0),
        i = n.viewport.getZoom(!0),
        t = n.viewport.getContainerSize();
        o = t.x * i / Number(h.Width);
        s = new SeadragonPoint(-1 * r.x * t.x * i, -1 * r.y * t.x * i)
    }
    function IEpt(h) {
        var r = n.viewport.getBounds(!0),
        i = n.viewport.getZoom(!0),
        t = n.viewport.getContainerSize();
        o = t.x * i / Number(h.Width);
        s = new SeadragonPoint(-1 * r.x * t.x * i, -1 * r.y * t.x * i)
    }
    function ti() {
        Measurement = {
            Length: i18n.t("Measurement.TxtLength"),
            Width: i18n.t("Measurement.TxtWidth"),
            Height: i18n.t("Measurement.TxtHeight"),
            Angle: i18n.t("Measurement.TxtAngle"),
            ArcLength: i18n.t("Measurement.TxtArcLength"),
            Area: i18n.t("Measurement.TxtArea"),
            Majorhalfaxis: i18n.t("Measurement.TxtMajorhalfaxis"),
            Minorhalfaxis: i18n.t("Measurement.TxtMinorhalfaxis"),
            Perimeter: i18n.t("Measurement.TxtPerimeter"),
            Radius: i18n.t("Measurement.TxtRadius"),
            Description: i18n.t("Measurement.TxtDescription"),
            Unit: i18n.t("Measurement.TxtUnit"),
            AreaUnit: i18n.t("Measurement.TxtAreaUnit"),
            Deg: i18n.t("Measurement.TxtDeg")
        },
        ShapeDefaultConfig.name = i18n.t("AnnotationsDialog.NewName");
        //ShapeDefaultConfig.description = SlideViewerStrings.getString("Annotations.Default.Description")
    }
    function k(n) {
        n.getContext("2d").clearRect(0, 0, n.width, n.height)
    }
    function g() {
        t != null && (t.isSelected = !1, t.measurement = !1),
        t = null,
        k(y)
    }
    function ct(n) {
        var i, t;
        if (r == null) return !1;
        for (i = !1, t = 0; t < r.length; t++) (r[t].isSelected || r[t].measurement) && (r[t].isSelected = !1, r[t].measurement = !1, i = !0);
        return n != null && (n.isSelected = !0),
        i
    }
    function ft(n) {
        var c, o, f;
        if (r == null) return !1;
        var s = !1,
        e = [],
        h = !1;
        if (t != null && (t.measurement = !1), t == null || t.isSelected || (g(), u.showImageAnnotations()), t != null && t.isHitMe(n)) {
            s = !0;
        }
        else if (u.isSelectedEnable || u.isShowInfo) for (f = 0; f < r.length; f++)
            c = r[f].isHitMyArea(n),
        c && (s = !0, r[f].isSelected = !1, e.push(r[f]), t == r[f] && (h = !0));
        else t != null && (t.isSelected = !1, g(), u.showImageAnnotations());
        if (e.length == 1 && t != e[0]) t = e[0],
        t.isSelected = !0;
        else if (!h && e.length > 0, !1) {
            for (f = 0; f < e.length; f++) f == 0 ? o = e[0] : o.cavRect.x < e[f].cavRect.x && o.cavRect.y < e[f].cavRect.y && o.cavRect.width > e[f].cavRect.width && o.cavRect.height > e[f].cavRect.height && (o = e[f]);
            t = o,
            t.isSelected = !0
        } else for (t == null && (t = e[0]), f = 0; f < e.length; f++) if (t == e[f]) {
            f < e.length - 1 ? (t.isSelected = !1, t = e[f + 1], t.isSelected = !0) : (t.isSelected = !1, t = e[0], t.isSelected = !0);
            break
        }
        if (t != null && t.isSelected == true) {
            t.measurement = !0;
            if (t.activeMove != ActiveMove.None) {
                if ($.support.touch) {
                    $(i).bind("touchmove", st)

                }
                else {
                    $(i).bind("mousemove", ot);
                    b = !0;
                    l = n
                }


            }
            else {
                if (!u.isSelectedEnable && u.isShowInfo && (t.isSelected == false)) {
                    g();
                    u.showImageAnnotations();
                }
                else {
                    return s
                }
            }

        }
                return t != null && (t.isSelected ? (t.measurement = !0, t.activeMove != ActiveMove.None ? ($.support.touch ? $(i).bind("touchmove", st) : $(i).bind("mousemove", ot), b = !0, l = n) : !u.isSelectedEnable && u.isShowInfo && (t.isSelected = !1)) : (g(), u.showImageAnnotations())),
                s
    }
    function ht(n) {
        return n.stopPropagation(),
        p && t != null ? (nt(), !1) : void 0
    }
    function ni(n) {
        var b = n.originalEvent,
        w, y, l;
        if (e = b.targetTouches[0].pageX,
         f = b.targetTouches[0].pageY,
         c = Seadragon.Utils.getElementPosition(a),
         e -= c.x, f -= c.y, v == null
         &&
         ft(new Seadragon.Point(e, f))
          &&
          (u.showImageAnnotations(), u.isSelectedEnable || t != null && t.activeMove != ActiveMove.None)) return !1;
        if (v != null) {
            if (t != null && !t.isEndDrawing) return e -= s.x,
            f -= s.y,
            !1;
            ct() && u.showImageAnnotations(),
            n.stopPropagation(),
            e -= s.x,
            f -= s.y,
            w = new Seadragon.Point(e / o, f / o),
            y = endPoint = w;
            switch (v) {
                case AnnotationType.Line:
                    l = new Line(i, y, endPoint);
                    break;
                case AnnotationType.Arrow:
                    l = new Arrow(i, y, endPoint);
                    break;
                case AnnotationType.Rectangle:
                    l = new Rectangle(i, y, endPoint);
                    break;
                case AnnotationType.Ellipse:
                    l = new Ellipse(i, y, endPoint);
                    break;
                case AnnotationType.Remark:
                    l = new Remark(i, y, endPoint);
                    break;
                case AnnotationType.Position:
                    l = new Position(i, y, endPoint);
                    break;
                case AnnotationType.CurveRounded:
                    l = new CurveRounded(i, y, endPoint);
                    break;
                case AnnotationType.Curve:
                    l = new Curve(i, y, endPoint);
                    break;
                case AnnotationType.Angle:
                    l = new Angle(i, y, endPoint);
                    break;
                case AnnotationType.Circle:
                    l = new Circle(i, y, endPoint);
                    break;
                case AnnotationType.CircleThreePoints:
                    l = new CircleThreePoints(i, y, endPoint);
                    break;
                case AnnotationType.Arc:
                    l = new Arc(i, y, endPoint);
                    break;
                case AnnotationType.Polygon:
                    l = new Polygon(i, y, endPoint)
            }
            return r.push(l),
            t = l,
            t.isSelected = !0,
            t.imageId = h.id,
            t.type = v,
            t.scale = o,
            t.guid = guidGenerator(),
            t.refresh(o, s),
            t.calibration = h.calibration,
            t.drawStart(w),
            p = !0,
            $(i).bind("touchmove", st),
            !1
        }
    }
    function gt(n) {
        if (b) return n.stopPropagation(),
        rt(),
        u.showImageAnnotations(),
        !1;
        if (p && t != null) {
            var i = new Seadragon.Point(e / o, f / o);
            return t.drawClick(i),
            t.isEndDrawing ? nt(i) : u.showImageAnnotations(),
            !1
        }
    }
    function st(n) {
        var i = n.originalEvent,
        h, r, a;
        if (i.preventDefault(), b) return e = i.targetTouches[0].pageX,
        f = i.targetTouches[0].pageY,
        e -= c.x,
        f -= c.y,
        (e != l.x || f != l.y) && (t.moveOffset = new Seadragon.Point(e - l.x, f - l.y), l.x = e, l.y = f, u.showImageAnnotations(), t.moveOffset.x = 0, t.moveOffset.y = 0),
        n.stopPropagation(),
        d(),
        !1;
        if (p && t != null) n.stopPropagation();
        else return;
        if (h = i.targetTouches[0].pageX, r = i.targetTouches[0].pageY, h -= c.x + s.x, r -= c.y + s.y, h != e || r != f) return e = h,
        f = r,
        a = new Seadragon.Point(e / o, f / o),
        t.drawMove(a),
        u.showImageAnnotations(),
        d(),
        !1
    }
    function isShow() {
        if (document.getElementById("MainUl").style.display == "block" || document.getElementById("RightUl").style.display == "block") {
            document.getElementById("MainUl").style.display = "none"
            document.getElementById("OtherUl").style.display = "none"
            document.getElementById("RightUl").style.display = "none"
        }
    }
    function ui(n) {

        if (document.getElementById("ysbl"))
            document.getElementById("ysbl").style.display = "none";
        if (document.getElementById("myCanvas"))
            document.getElementById("myCanvas").style.display = "none";
        if (isIElast() && n.button == 0 || n.button == 1) {
            isShow();
            if (e = n.pageX, f = n.pageY, c = Seadragon.Utils.getElementPosition(a), e -= c.x, f -= c.y, v == null && ft(new Seadragon.Point(e, f)) && (u.showImageAnnotations(), t != null && t.activeMove != ActiveMove.None)) return !1;

            if (v != null && (t == null || t.isEndDrawing)) {
                ct() && u.showImageAnnotations(),
            n.stopPropagation(),
            e, f;
                e -= s.x,
            f -= s.y;
                var w = new Seadragon.Point(e / o, f / o),
            y = endPoint = w,
            l;
            
                switch (v) {
                    case AnnotationType.Line:
                        l = new Line(i, y, endPoint);
                        break;
                    case AnnotationType.Arrow:
                        l = new Arrow(i, y, endPoint);
                        break;
                    case AnnotationType.Rectangle:
                        l = new Rectangle(i, y, endPoint);
                        break;
                    case AnnotationType.Ellipse:
                        l = new Ellipse(i, y, endPoint);
                        break;
                    case AnnotationType.Remark:
                        l = new Remark(i, y, endPoint);
                        break;
                    case AnnotationType.Position:
                        l = new Position(i, y, endPoint);
                        break;
                    case AnnotationType.CurveRounded:
                        l = new CurveRounded(i, y, endPoint);
                        break;
                    case AnnotationType.Curve:
                        l = new Curve(i, y, endPoint);
                        break;
                    case AnnotationType.Angle:
                        l = new Angle(i, y, endPoint);
                        break;
                    case AnnotationType.Circle:
                        l = new Circle(i, y, endPoint);
                        break;
                    case AnnotationType.CircleThreePoints:
                        l = new CircleThreePoints(i, y, endPoint);
                        break;
                    case AnnotationType.Arc:
                        l = new Arc(i, y, endPoint);
                        break;
                    case AnnotationType.Polygon:
                        l = new Polygon(i, y, endPoint)
                }
                return r.push(l),
            t = l,
            t.imageId = h.ID,
            t.type = v,
            t.scale = o,
            t.guid = guidGenerator(),
            t.refresh(o, s),
            t.calibration = h.calibration,
            t.drawStart(w),
            $(i).bind("mousemove", ot),
            p = !0,
                    t.isSelected = !0,
            !1
            }
        }
    }
    function ri(n) {
        if (b) return n.stopPropagation(),
        rt(),
        u.showImageAnnotations(),
        !1;
        if (p && t != null) {
            n.stopPropagation(),
            e = n.pageX,
            f = n.pageY,
            e -= c.x + s.x,
            f -= c.y + s.y;
            var i = new Seadragon.Point(e / o, f / o);
            return t.drawClick(i),
            t.isEndDrawing && nt(i),
            !1
        }
    }
    function nt(n) {
        t.cavScale = o,
        t.cavOffset = s,
        t.isEndDrawing = !0,
        t.measurement = !0,
        t.drawEnd(n),
        rt(),
        u.showImageAnnotations(),
        u.onShapeDrawEnd && u.onShapeDrawEnd()
    }
    function rt() {
        $(i).unbind("mousemove"),
        $(i).unbind("touchmove"),
        t.activeMove = ActiveMove.None,
        v = null,
        p = !1,
        b = !1
    }
    function ot(n) {
        var r, i, h;
        if (b) return e = n.pageX,
        f = n.pageY,
        e -= c.x,
        f -= c.y,
        (e != l.x || f != l.y) && (t.moveOffset = new Seadragon.Point(e - l.x, f - l.y), l.x = e, l.y = f, u.showImageAnnotations(), t.moveOffset.x = 0, t.moveOffset.y = 0),
        n.stopPropagation(),
        d(),
        !1;
        if (p && t != null) n.stopPropagation();
        else return;
        if (r = n.pageX, i = n.pageY, r -= c.x + s.x, i -= c.y + s.y, r != e || i != f) return e = r,
        f = i,
        h = new Seadragon.Point(e / o, f / o),
        t.drawMove(h),
        u.showImageAnnotations(),
        d(),
        !1
    }
    function bt(n, t) {
        return t.imageId = n.imageId,
        t.guid = n.guid,
        t.imageindex = n.imageindex,
        t.isAllShow = n.isAllShow,
        t.name = n.name,
        t.description = n.description,
        t.scale = n.scale,
        t.width = n.width,
        t.type = n.type,
        t.region = n.region,
        t.fontUnderLine = n.fontUnderLine,
        t.fontSize = n.fontSize,
        t.fontFamily = n.fontFamily,
        t.fontItalic = n.fontItalic,
        t.fontBold = n.fontBold,
        t.visible = n.visible,
        t.color = NumberToHex(n.color),
        t.measurement = n.measurement,
        t.radius = n.radius,
        t.arcLength = n.arcLength,
        t.angle = n.angle,
        t.points = et(n.points),
        t.calibration = h.calibration,
        t.isEndDrawing = !0,
        t
    }
    function kt(n, t) {
        return n.imageId = t.imageId,
        n.guid = t.guid == null ? guidGenerator() : t.guid,
        n.name = t.name,
        n.imageindex = t.imageindex,
        n.isAllShow = t.isAllShow,
        n.description = t.description,
        n.scale = t.scale,
        n.width = t.width,
        n.type = t.type,
        n.fontUnderLine = t.fontUnderLine,
        n.fontSize = t.fontSize,
        n.fontFamily = t.fontFamily,
        n.fontItalic = t.fontItalic,
        n.fontBold = t.fontBold,
        n.visible = t.visible,
        n.color = HexToNumber("#" + t.color),
        n.measurement = t.measurement = !1,
        n.radius = t.radius,
        n.arcLength = t.arcLength,
        n.angle = t.angle,
        n.points = et(t.points),
        n.region = new SeadragonRect(t.startPoint.x, t.startPoint.y, t.endPoint.x - t.startPoint.x, t.endPoint.y - t.startPoint.y),
        n
    }
    function et(n) {
        for (var i = [], t = 0; t < n.length; t++) i.push(new Point(n[t].x, n[t].y));
        return i
    }
    function d() {
        u.isShapeChanged = !0,
        u.onShapeChanged && u.onShapeChanged()
    }
    function lt(n) {
        vt = n
    }
    function IsSelected() {
        var isSelect;
        for (var i = 0; i < r.length; i++) {
            if (r[i].isSelected) {
                isSelect = !0;
                return isSelect;
            }
            else {
                isSelect = !1;
            }
        }
        return isSelect;
    }
    function Rmouse(event) {
        var e = event || window.event;
        var t = { 'x': e.clientX, 'y': e.clientY }
        var ul, oul, uw, uh, ouh, w, h;
        ul = $("#MainUl"); oul = $("#OtherUl"); rul = $("#RightUl");
        uw = ul.width(), uh = ul.height(), ouh = oul.height();
        w = document.body.clientWidth - uw, h = document.body.clientHeight - uh;
        if (IsSelected()) {

            rul[0].style.left = t.x + "px", rul[0].style.top = t.y + "px";
            $("#RightUl").show();
        }
        else {
            t.x < w && t.y < h - ouh ? (ul[0].style.left = t.x + "px", ul[0].style.top = t.y + "px", oul[0].style.left = (t.x + uw) + "px", oul[0].style.top = (t.y + uh - 70) + "px") :
            t.x > w - uw && t.y > h ? (ul[0].style.left = (t.x - uw) + "px", ul[0].style.top = (t.y - uh) + "px", oul[0].style.left = (t.x - uw - uw) + "px", oul[0].style.top = (t.y - ouh) + "px") :
            t.x > w ? (ul[0].style.left = (t.x - uw) + "px", ul[0].style.top = t.y + "px", oul[0].style.left = (t.x - uw - uw) + "px", oul[0].style.top = (t.y + uh - 70) + "px") :
            (ul[0].style.left = t.x + "px", ul[0].style.top = (t.y - uh) + "px", oul[0].style.left = (t.x + uw) + "px", oul[0].style.top = (t.y - ouh) + "px")
            $("#MainUl").show();
            $("#OtherUl").hide()
        }
        $(document).bind("contextmenu", function () {
            return false;
        });
        return false
    }
    function IE(n) {
        if (document.getElementById("MainUl").style.display == "block") {
            document.getElementById("MainUl").style.display = "none"
            document.getElementById("OtherUl").style.display = "none"
        }
    }
    var u = this,
    r = [],
    vt,
    h,
    a,
    y,
    w,
    yt,
    p = !1,
    b = !1,
    tt = !1,
    l,
    t,
    v,
    o = 1,
    s,
    c,
    i,
    e,
    f,
    it,
    inout,
    MinCellWidth = 200,
    divisionNum = 5,
    viewer = n,
    xs,
    MinlblV,
    ut;
    this.isShapeChanged = !1,
    this.onShapeChanged,
    this.onShapeDrawEnd,
    this.isSelectedEnable = !1,
    this.isShowInfo = !0,
    this.setOpenImage = function (t, i) { //t为数据集
        h = t,
        yt = i;
        var r = n.viewport.getContainerSize();   //获取图像大小
        it = new Grid(w, h.calibration, h.Width, h.Height, r.x, r.y),
        ut = new Ruler(w, h.calibration, r.x, r.y),
        pt()
    },
    this.createShapeCanvas = function () {
        if (!SlideViewerSupport.canvas) {
            a = document.createElement("canvas"),
        a.id = "shapeCanvas",
        a.style.position = "absolute",
        y = document.createElement("canvas"),
        y.id = "drawCanvas",
        y.style.position = "absolute",
        w = document.createElement("canvas"),
        w.id = "measureCanvas",
        w.style.position = "absolute",
        ShapeViewer.Canvas = a,
        ShapeViewer.Viewer = u,
        ShapeViewer.DrawCanvas = y,
        i = document.createElement("div"),
        i.id = "shapeContainer",
        i.style.position = "absolute",
        at(),
        ti(),
            g(),
        i.appendChild(a),
        i.appendChild(y),
        i.appendChild(w),
        n.drawer.elmt.appendChild(i);
            var t = $(i);
            $.support.touch ? (t.bind("touchstart", ni), t.bind("touchend", gt), t.bind("taphold", ht)) : ($("#slide").bind("mousedown", ui), t.bind("mousedown", ui), t.bind("mouseup", ri), t.bind("mouseleave", ri), t.dblclick(ht),
        t.bind("contextmenu", Rmouse), $("#slide").bind("contextmenu", Rmouse));
            $("#slide").bind("mousewheel", u.showrulers); t.bind("mousewheel", u.showrulers);
            n.addEventListener("animationstart", wt);
            n.addEventListener("animation", dt);
            n.addEventListener("animationfinish", ii);
            n.addEventListener("resize", at);
            return !1;
        }
        else {
            a = document.createElement("canvas"),
        a.id = "shapeCanvas",
        a.style.position = "absolute",
        y = document.createElement("canvas"),
        y.id = "drawCanvas",
        y.style.position = "absolute",
        w = document.createElement("canvas"),
        w.id = "measureCanvas",
        w.style.position = "absolute",
        ShapeViewer.Canvas = a,
        ShapeViewer.Viewer = u,
        ShapeViewer.DrawCanvas = y,
        i = document.createElement("div"),
        i.id = "shapeContainer",
        i.style.position = "absolute",
        at(),
        ti(),
        g(),
        i.appendChild(a),
        i.appendChild(y),
        i.appendChild(w),
        n.drawer.elmt.appendChild(i);
            var t = $(i);
            return $.support.touch ? (t.bind("touchstart", ni), t.bind("touchend", gt), t.bind("taphold", ht)) : (t.bind("mousedown", ui), t.bind("mouseup", ri), t.bind("mouseleave", ri), t.dblclick(ht),
        t.bind("contextmenu", Rmouse)),
        n.addEventListener("animationstart", wt),
        n.addEventListener("animation", dt),
        n.addEventListener("animationfinish", ii),
        n.addEventListener("resize", at),
        !0
        }
    },
    this.initImageAnnotationsShape = function (n) {
        var t, u;
        if (n != null) {
            for (this.clearShapeArray(), u = 0; u < n.length; u++) {
                startPoint = new SeadragonPoint(n[u].region.x, n[u].region.y),
                endPoint = new SeadragonPoint(startPoint.x + n[u].region.width, startPoint.y + n[u].region.height);
                switch (n[u].type) {
                    case AnnotationType.Line:
                        t = new Line(i, startPoint, endPoint);
                        break;
                    case AnnotationType.Arrow:
                        t = new Arrow(i, startPoint, endPoint);
                        break;
                    case AnnotationType.Rectangle:
                        t = new Rectangle(i, startPoint, endPoint);
                        break;
                    case AnnotationType.Ellipse:
                        t = new Ellipse(i, startPoint, endPoint);
                        break;
                    case AnnotationType.Remark:
                        t = new Remark(i, startPoint, endPoint);
                        break;
                    case AnnotationType.Position:
                        t = new Position(i, startPoint, endPoint);
                        break;
                    case AnnotationType.CurveRounded:
                        t = new CurveRounded(i, startPoint, endPoint, n[u].points, o, s);
                        break;
                    case AnnotationType.Curve:
                        t = new Curve(i, startPoint, endPoint, n[u].points, o, s);
                        break;
                    case AnnotationType.Angle:
                        t = new Angle(i, startPoint, endPoint);
                        break;
                    case AnnotationType.Circle:
                        t = new Circle(i, startPoint, endPoint);
                        break;
                    case AnnotationType.CircleThreePoints:
                        t = new CircleThreePoints(i, startPoint, endPoint);
                        break;
                    case AnnotationType.Arc:
                        t = new Arc(i, startPoint, endPoint);
                        break;
                    case AnnotationType.Polygon:
                        t = new Polygon(i, startPoint, endPoint);
                        break;
                    default:
                        t = null
                }
                t != null && r.push(bt(n[u], t))
            }
            lt(n)

        }
    },
    this.getAnnotation = function () {
        return r;
    },
    this.dirtyCanvas = function () {
        d()
    },
    this.resumeBackUpShapes = function () {
        for (var n = 0; n < r.length; n++) (r[n].type == AnnotationType.Remark || r[n].type == AnnotationType.Position) && ($(r[n].txtElmt).remove(), $(r[n].inpElmt).remove());
        u.initImageAnnotationsShape(vt),
        u.showImageAnnotations(),
        u.isShapeChanged = !1
    },
    this.setSelectedEnable = function (n) {
        var i, t;  //this.isSelectedEnable=!1;
        if (v = null, u.isSelectedEnable = n, i = !1, !n) {
            for (t = 0; t < r.length; t++) (r[t].isSelected || r[t].measurement) && (r[t].isSelected = r[t].measurement = !1, i = !0);
            i && u.showImageAnnotations()
        }
    },
    this.setShowInfoEnable = function (n) {
        if (u.isShowInfo = n, !n) for (var t = 0; t < r.length; t++) r[t].measurement && (r[t].measurement = !1, $(r[t].txtElmt).hide())
    },
    this.updateImageAnnotations = function (t) {
        function f(n) {
            n.success && (u.isShapeChanged = !1),
            t(n)
        }
        if (h != null && u.isShapeChanged) {
            h.annotations = [];
            for (var i = 0; i < r.length; i++)
                h.annotations.push(kt(new AnnotationInfo, r[i]));

            n.provider.updateAnnotations(yt, h.id, h.annotations, f);
            lt(h.annotations)
        }
    },
    this.finishDrawing = function () {
        nt()
    },
    this.getActiveShape = function (n) {   //获取标注具体内容
        n == null ? !0 : t = n;
        return t;
    },
    this.setActiveShape = function (n) {
        n.isSelected = !0,
        t = n
    },
    this.turnToShape = function () {
        var u, r;
        if (t != null && t.isSelected) {
            u = n.viewport.getContainerSize(),
            r = h.width * t.scale / u.x,
            n.viewport.zoomTo(r);
            var i = t.toImagePoint(t.movePoint),
            e = i.x / h.width,
            f = i.y / h.width;
            n.viewport.panTo(new Point(e, f))
        }
    },
    this.showMeasurement = function (n) {
        for (var i = 0, t = 0; t < r.length; t++) r[t].type != AnnotationType.Remark && r[t].type != AnnotationType.Position && (r[t].measurement = n, r[t].showMeasurement(), i++);
        i > 0 && d()
    },
    this.deleteAnnotation = function () {
        for (var i, f, n = 0; n < r.length; n++) if (t == r[n] || r[n].isSelected) {
            i = n,
            f = r[n];
            break
        }
        i != null && (r.splice(i, 1), u.showImageAnnotations(), $(f.txtElmt).remove(), $(f.inpElmt).remove(), g(), d())
    },
    this.showrulers = function () {
        var source = viewer.getCurrentImage();
        IEpt(source);
        u.ruler(o, s, source.calibration)
    }
    this.ruler = function (n, t, calibration) {
        var h, cm, cellCm, ot = n;
        var Param = 1 / ot, bl;
        if (Param <= 1) {
            bl = 1;
        }
        else if (Param > 1 && Param < 2) {
            bl = 1;
        }
        else {
            bl = Param - (Param % 2);
        }
        MinlblV = 100 * bl;
        if (MinlblV < 1000) {
            if (MinlblV % 5 != 0) {
                MinlblV = MinlblV + (MinlblV - MinlblV % 5);
            }
        }
        else {
            if (MinlblV % 5000 != 0) {
                if (MinlblV < 5000) {
                    MinlblV = 5000;
                }
                else {
                    MinlblV = MinlblV + (MinlblV / 5000 - MinlblV % 5000);
                }
            }
        }
        xs = MinlblV / (Param * calibration);
        this.CheckLimtRule(xs, MinlblV);
        this.UpRuleLayout(xs, MinlblV)

    }
    this.CheckLimtRule = function () {
        if (xs >= MinCellWidth + MinCellWidth / 2) {
            xs = xs / 2;
            MinlblV = MinlblV / 2;
            this.CheckLimtRule()
        }
        if (xs < 150) {
            xs = xs * 2;
            MinlblV = MinlblV * 2;
        }
    }

    this.UpRuleLayout = function () {
        var k, k1, un;
        if (MinlblV >= 1000) {
            k = Math.round(MinlblV / 5000 * 100) / 100
            un = "mm";
        }
        else {
            k = MinlblV / 5;
            un = "μm";
        }
        k1 = xs / 5;
        $("#slideRuler").css("width", xs + 5);
        $("#rulerHeight2").css("left", k1)
        $("#rulerHeight3").css("left", k1 * 2)
        $("#rulerHeight4").css("left", k1 * 3)
        $("#rulerHeight5").css("left", k1 * 4)
        $("#rulerHeight6").css("left", k1 * 5)

        $("#rulerNum1").text((k * 1))
        $("#rulerNum2").text((k * 2))
        $("#rulerNum3").text((k * 3))
        $("#rulerNum4").text((k * 4))
        $("#rulerNum5").text((k * 5) + un)

    }
    this.showImageAnnotations = function (n) {
        if (a != null && r != null) if (n == null && (n = !1), this.clearShapeCanvas(n), !tt && t != null && !n && (p || b)) t.refresh(o, s),
        t.draw();
        else {
            if (SlideViewerConfig.enableAnnotation != n) {
                for (var i = 0; i < r.length; i++) {
                    if (SlideViewerConfig.enableOne[0] != true) {
                        if (SlideViewerConfig.enableOne[1] == r[i].name) { }
                        else {
                            r[i].refresh(o, s), r[i].draw();
                        }
                    }
                    else {
                        r[i].refresh(o, s), r[i].draw();
                    }
                }
                SlideViewerConfig.showGrid() && it.draw(o, s),
                SlideViewerConfig.showRulers() && ut.draw(o, s),
                ut.draws(o, s);
            }
            else {
                if (SlideViewerConfig.enableAnnotation) for (var i = 0; i < r.length; i++) r[i].refresh(o, s),
                r[i].draw(),
                SlideViewerConfig.showGrid() && it.draw(o, s),
            SlideViewerConfig.showRulers() && ut.draw(o, s);
                ut.draws(o, s);
            }
        }
    },
    this.setDrawAnnotationType = function (n) {
        v = n
    },
    this.clearShapeCanvas = function (n) {
        if (n == null && (n = !1), n) {
            if (k(a), k(y), k(w), !SlideViewerConfig.enableAnnotation) for (var i = 0; i < r.length; i++) $(r[i].txtElmt).hide(),
            $(r[i].inpElmt).hide()
        } else !tt && t != null && (p || b) ? k(y) : (k(a), t != null && k(y), (SlideViewerConfig.showGrid() || SlideViewerConfig.showRulers()) && k(w))
    },
    this.clearShapeArray = function () {
        r = []
    }
    return u;
}
var ShapeViewer;
ShapeViewer = {
    Canvas: null,
    DrawCanvas: null,
    Viewer: null
};

ClickResult = function () {
    this.isIn = !1,
    this.length = 0,
    this.activeMove,
    this.pIndex
};
Measurement = {},
AnnotationType = {
    NONE: "NONE",
    Line: "Line",  //直线
    Arrow: "Arrow",  //带箭头的直线
    Rectangle: "Rectangle",  //绘制矩形
    Ellipse: "Ellipse",  //绘制椭圆
    Remark: "Remark",  //绘制文本注释
    Position: "Position",  //标记位置
    CurveRounded: "RoundedCurve",  //绘制闭合曲线
    Curve: "Curve",  //绘制自由曲线FreeRoundedCurve 
    Angle: "Angle",  //三点画角度
    Circle: "Circle",  //绘制圆
    CircleThreePoints: "CircleThreePoints",  //三点画圆
    Arc: "Arc",  //3点画弧
    Polygon: "Polygon"  //绘制多边形
};
var Rect = function (n,t,i,r) {
            this.x = typeof n == "number" ? n : n * 1,
            this.y = typeof t == "number" ? t : t * 1,
            this.width = typeof i == "number" ? i : i * 1,
            this.height = typeof r == "number" ? r : r * 1
}
var ActiveMove;
ActiveMove = {
    None: "None",
    StartMove: "StartMove",
    EndMove: "EndMove",
    LeftTopMove: "LeftTopMove",
    RightTopMove: "RightTopMove",
    LeftBottomMove: "LeftBottomMove",
    RightBottomMove: "RightBottomMove",
    TopMiddleMove: "TopMiddleMove",
    BottomMiddleMove: "BottomMiddleMove",
    LeftMiddleMove: "LeftMiddleMove",
    RightMiddleMove: "RightMiddleMove",
    PointMove: "PointMove",
    ShapeMove: "ShapeMove"
};

var ShapeDefaultConfig;
ShapeDefaultConfig = {
    defaultColor: "0000ff",
    lineWidth: 2,
    thumbRadius: 5,
    thumbMoveRadius: 8,
    thumbHitRadius: 20,
    thumbHitMoveRadius: 40,
    name: "",
    description: ""
};

var Shape;
Shape = function (n, t, i) {
    this.startPoint = t,
        this.endPoint = i,
        this.rsPoint,
        this.rePoint,
        this.movePoint,
        this.calibration = 0,
        this.width = ShapeDefaultConfig.lineWidth,
        this.color = ShapeDefaultConfig.defaultColor,
        this.imageId,
        this.imageindex = '1',
        this.guid = null,
        this.name = ShapeDefaultConfig.name,
        this.description = ShapeDefaultConfig.description,
        this.scale = 1,
        this.type,
        this.region,
        this.fontUnderLine = !1,
        this.fontSize = 11,
        this.fontFamily = "Microsoft Sans Serif",
        this.fontItalic = !1,
        this.fontBold = !1,
        this.visible = !0,
        this.measurement = !1,
        this.radius = 0,
        this.arcLength = 0,
        this.angle = 0,
        this.points = [],
        this.isEndDrawing = !1,
        this.txtElmt,
        this.inpElmt,
        this.container = n,
        this.isSelected = !1,
        this.cavScale,
        this.cavOffset,
        this.moveOffset,
        this.activeMove = ActiveMove.None,
        this.isMeasurementChanged = !0,
        this.isDrawStart = !1,
        this.isAllShow = !0,
        this.cavRect
};
var n = Shape.prototype;
n.drawThumb = function (n) {
    if (n != null) {
        var t = this.getContext();
        t.beginPath(),
            t.lineWidth = 2,
            t.arc(n.x, n.y, ShapeDefaultConfig.thumbRadius, 0, Math.PI * 2, !1),
            t.fillStyle = "rgba(255, 255, 255, 0.6)",
            t.fill(),
            t.strokeStyle = "#666465",
            t.stroke()
    }
},
    n.drawMoveThumb = function (n) {
        if (n != null) {
            var t = this.getContext();
            t.beginPath(),
            t.lineWidth = 2,
            t.arc(n.x, n.y, ShapeDefaultConfig.thumbMoveRadius, 0, Math.PI * 2, !1),
            t.fillStyle = "rgba(255, 255, 255, 0.6)",
            t.fill(),
            t.strokeStyle = "#666465",
            t.stroke()
        }
    },
    n.getContext = function () {
        return this.isSelected ? ShapeViewer.DrawCanvas.getContext("2d") : ShapeViewer.Canvas.getContext("2d")
    },
    n.drawStart = function (n) {
        this.startPoint = n,
        this.endPoint = new Point(n.x, n.y),
        this.drawThumb(this.toCanvasPoint(n)),
        this.isDrawStart = !0
    },
    n.drawMove = function (n) {
        this.endPoint = n,
        this.isDrawStart = !1
    },
    n.drawClick = function (n) {
        n != null && (this.endPoint = n),
        this.startPoint.x != this.endPoint.x && this.startPoint.y != this.endPoint.y && (this.isEndDrawing = !0)
    },
    n.drawEnd = function () { },
    n.refresh = function (n, t) {
        this.cavScale = n,
        this.cavOffset = t
    },
    n.createElmt = function () {
        this.txtElmt == null && (this.txtElmt = document.createElement("div"), this.container.appendChild(this.txtElmt), registerMeasurementTxtCSS(this.txtElmt))
    },
n.showMeasurement = function () {
    if (!this.isAllShow) {
        if (!this.measurement || !SlideViewerConfig.enableAnnotation) {
            $(this.txtElmt).hide();
            return
        }
    }
    this.isMeasurementChanged = !0;
    if (this.createElmt(), $(this.txtElmt).show(), this.isMeasurementChanged) {
	if(this.movePoint!=undefined)
	{
	registerPositionCSS(this.txtElmt, this.movePoint.x + ShapeDefaultConfig.thumbMoveRadius, this.movePoint.y + ShapeDefaultConfig.thumbMoveRadius);
	}
        var n = this.calcMeasurementInfo();
        n += isHasEnter(this.description) ? append("<table style='border-spacing:0px;'><tr>", "<td>" + Measurement.Description + "</td>" + replaceHtmlEnter("<td>" + this.description + "</td></tr></table>")) : appendLine(Measurement.Description, this.description),
            $(this.txtElmt).html(n),
            this.isMeasurementChanged = !1
    }

},
    n.calcMeasurementInfo = function () { },
    n.active = function () { },
    n.shapeMovePosition = function () { },
    n.isHitMe = function () { },
    n.isHitMyArea = function (n) {

        var r, i, u, f, t;
        return this.type == AnnotationType.Remark || this.type == AnnotationType.Position ? !1 : (this.rsPoint.x < this.rePoint.x ? (r = this.rsPoint.x, u = this.rePoint.x) : (r = this.rePoint.x, u = this.rsPoint.x), this.rsPoint.y < this.rePoint.y ? (i = this.rsPoint.y, f = this.rePoint.y) : (i = this.rePoint.y, f = this.rsPoint.y), t = this.width / 2, this.isSelected = r - t <= n.x && n.x <= u + t && i - t <= n.y && n.y <= f + t ? !0 : !1, this.cavRect = new Rect(r, i, u - r, f - i), this.isSelected)
    },
    n.resetPoint = function (n, t, i) {
        var r = new Point(n.x, n.y);
        return t && (r.x *= t, r.y *= t),
        i && (r.x += i.x, r.y += i.y),
        r
    },
    n.resetDefaultColor = function () {
        defaultColor = this.color
    },
    n.clickInThumb = function (n, t) {

        return clickInCircleResult(ShapeDefaultConfig.thumbHitRadius, t, n, this.width)
    },
    n.clickInMoveThumb = function (n, t) {

        return clickInCircleResult(ShapeDefaultConfig.thumbHitMoveRadius, t, n, this.width)
    },
    n.addClickResult = function (n, t, i, r, u) {
        var f = this.clickInThumb(t, i);
        f.isIn && (f.activeMove = r, f.pIndex = u, n.push(f))
    },
    n.setNearestMove = function (n) {
        var i, r, t;
        if (n.length <= 0) this.activeMove = ActiveMove.None;
        else if (n.length == 1) this.activeMove = n[0].activeMove,
        this.pIndex = n[0].pIndex;
        else {
            for (i = 0, r = 0, t = 0; t < n.length; t++) t == 0 ? r = n[t].length : n[t].length < r && (r = n[t].length, i = t);
            this.activeMove = n[i].activeMove,
            this.pIndex = n[i].pIndex
        }
    },
    n.resetActiveMovePoint = function (n, t, i) {
        if (i == null) {
            if (this.moveOffset == null) return;
            n.x += this.moveOffset.x,
            n.y += this.moveOffset.y
        } else n.x += i.x,
        n.y += i.y;
        t.x = (n.x - this.cavOffset.x) / this.cavScale,
        t.y = (n.y - this.cavOffset.y) / this.cavScale
    },
    n.resetStartPoint = function (n) {
        this.rsPoint = n,
        this.startPoint = this.toImagePoint(n)
    },
    n.resetEndPoint = function (n) {
        this.rePoint = n,
        this.endPoint = this.toImagePoint(n)
    },
    n.toImagePoint = function (n) {
        return new Point((n.x - this.cavOffset.x) / this.cavScale, (n.y - this.cavOffset.y) / this.cavScale)
    },
    n.toCanvasPoint = function (n) {
        return new Point(n.x * this.cavScale + this.cavOffset.x, n.y * this.cavScale + this.cavOffset.y)
    }

    var Line;
    Line = function (n, t, i) {
        Shape.apply(this, [n, t, i])
    },
    Line.prototype = new Shape;
    var n = Line.prototype;
    n.draw = function () {

        var n = this.getContext();
        n.beginPath(),
        this.rsPoint = this.resetPoint(this.startPoint, this.cavScale, this.cavOffset);
        this.rePoint = this.resetPoint(this.endPoint, this.cavScale, this.cavOffset);
        this.shapeMovePosition();
        this.movePoint = new Point((this.rsPoint.x + this.rePoint.x) / 2, (this.rsPoint.y + this.rePoint.y) / 2);
        n.moveTo(this.rsPoint.x, this.rsPoint.y);
        n.lineTo(this.rePoint.x, this.rePoint.y);
        n.lineWidth = this.width;
        if (this.color.indexOf('#') != -1) {
            this.color = this.color.replace('#', '');
        }
        n.strokeStyle = "#" + this.color;
        n.stroke();
        this.active();
        this.showMeasurement()
    },
    n.shapeMovePosition = function () {
        if (this.activeMove != ActiveMove.None) {
            switch (this.activeMove) {
                case ActiveMove.StartMove:
                    this.resetActiveMovePoint(this.rsPoint, this.startPoint);
                    break;
                case ActiveMove.EndMove:
                    this.resetActiveMovePoint(this.rePoint, this.endPoint);
                    break;
                case ActiveMove.ShapeMove:
                    this.resetActiveMovePoint(this.rsPoint, this.startPoint),
                this.resetActiveMovePoint(this.rePoint, this.endPoint)
            }
            this.activeMove != ActiveMove.ShapeMove && (this.isMeasurementChanged = !0)
        }
    },
    n.calcMeasurementInfo = function () {
        return appendLine(Measurement.Length, floatRound(CalcRadius(this.startPoint, this.endPoint) * this.calibration) + Measurement.Unit)
    },
    n.active = function () {
        if ((this.isEndDrawing || !this.isDrawStart) && this.isSelected) {
            this.drawThumb(this.rsPoint);
            this.drawThumb(this.rePoint);
            this.drawMoveThumb(this.movePoint);
        }
    },
    n.isHitMe = function (n) {
        if (this.isSelected) {
            var t = [];
            this.addClickResult(t, n, this.rePoint, ActiveMove.EndMove),
            this.addClickResult(t, n, this.rsPoint, ActiveMove.StartMove),
            this.addClickResult(t, n, this.movePoint, ActiveMove.ShapeMove),
            this.setNearestMove(t)
        }
        return this.activeMove != ActiveMove.None ? !0 : !1
    },
    n.isHitMyArea = function (n) {
        if (getQueryString("SwitchAnno") == "1") {
            return
        }
        if (this.activeMove == ActiveMove.None) {
            var t = clickOnLine(this.rsPoint, this.rePoint, n, this.width);

            this.isSelected = t;

            return t;

        }
        return !0
    }
    var Arrow;

    Arrow = function (n, t, i) {
        Line.apply(this, [n, t, i])
    },
    Arrow.prototype = new Line;
    var n = Arrow.prototype;
    n.draw = function () {
        var t = this.getContext(),
        o,
        r,
        i,
        n;
        if (t.beginPath(), this.rsPoint = this.resetPoint(this.startPoint, this.cavScale, this.cavOffset), this.rePoint = this.resetPoint(this.endPoint, this.cavScale, this.cavOffset), this.shapeMovePosition(), this.movePoint = new Point((this.rsPoint.x + this.rePoint.x) / 2, (this.rsPoint.y + this.rePoint.y) / 2), t.moveTo(this.rsPoint.x, this.rsPoint.y), t.lineTo(this.rePoint.x, this.rePoint.y), o = (this.rsPoint.y - this.rePoint.y) / (this.rsPoint.x - this.rePoint.x), n = new Point(this.width * 2, this.width * 3), this.rsPoint.x == this.rePoint.x) this.rsPoint.y < this.rePoint.y ? (r = new Point(this.rsPoint.x - n.x, this.rsPoint.y + n.y), i = new Point(this.rsPoint.x + n.x, this.rsPoint.y + n.y)) : (r = new Point(this.rsPoint.x - n.x, this.rsPoint.y - n.y), i = new Point(this.rsPoint.x + n.x, this.rsPoint.y - n.y));
        else if (this.rsPoint.y == this.rePoint.y) this.rsPoint.x < this.rePoint.x ? (r = new Point(this.rsPoint.x + n.y, this.rsPoint.y - n.x), i = new Point(this.rsPoint.x + n.y, this.rsPoint.y + n.x)) : (r = new Point(this.rsPoint.x - n.y, this.rsPoint.y - n.x), i = new Point(this.rsPoint.x - n.y, this.rsPoint.y + n.x));
        else {
            var e = Math.atan2(this.rsPoint.y - this.rePoint.y, this.rsPoint.x - this.rePoint.x),
            u = Math.atan2(n.x, n.y),
            f = Math.sqrt(n.x * n.x + n.y * n.y);
            r = new Point(this.rsPoint.x - f * Math.cos(e + u), this.rsPoint.y - f * Math.sin(e + u)),
            i = new Point(this.rsPoint.x - f * Math.cos(e - u), this.rsPoint.y - f * Math.sin(e - u))
        }
        if (this.color.indexOf('#') != -1) {
            this.color = this.color.replace('#', '');
        }
        t.moveTo(r.x, r.y),
        t.lineTo(this.rsPoint.x, this.rsPoint.y),
        t.lineTo(i.x, i.y),
        t.lineWidth = this.width,
        t.strokeStyle = "#" + this.color,
        t.stroke(),
        this.active(),
        this.showMeasurement()
    }
    var Rectangle;


    Rectangle = function (n, t, i) {
        Shape.apply(this, [n, t, i]),
        this.leftTopPoint,
        this.leftBottomPoint,
        this.rightTopPoint,
        this.rightBottomPoint,
        this.topMiddlePoint,
        this.bottomMiddlePoint,
        this.leftMiddlePoint,
        this.rightMiddlePoint
    },
    Rectangle.prototype = new Shape;
    var n = Rectangle.prototype;
    n.draw = function () {
        var i = this.getContext();
        i.beginPath(),
        this.rsPoint = this.resetPoint(this.startPoint, this.cavScale, this.cavOffset),
        this.rePoint = this.resetPoint(this.endPoint, this.cavScale, this.cavOffset),
        this.shapeMovePosition();
        var u = Math.abs(this.rePoint.x - this.rsPoint.x),
        r = Math.abs(this.rePoint.y - this.rsPoint.y),
        n = 0,
        t = 0;
        if (this.color.indexOf('#') != -1) {
            this.color = this.color.replace('#', '');
        }
        this.rePoint.x > this.rsPoint.x && this.rePoint.y > this.rsPoint.y ? (n = this.rsPoint.x, t = this.rsPoint.y) : this.rePoint.x > this.rsPoint.x && this.rePoint.y < this.rsPoint.y ? (n = this.rsPoint.x, t = this.rePoint.y) : this.rePoint.x < this.rsPoint.x && this.rePoint.y > this.rsPoint.y ? (n = this.rePoint.x, t = this.rsPoint.y) : this.rePoint.x < this.rsPoint.x && this.rePoint.y < this.rsPoint.y && (n = this.rePoint.x, t = this.rePoint.y),
        this.leftTopPoint = new Point(this.rsPoint.x, this.rsPoint.y),
        this.leftBottomPoint = new Point(this.rsPoint.x, this.rePoint.y),
        this.rightTopPoint = new Point(this.rePoint.x, this.rsPoint.y),
        this.rightBottomPoint = new Point(this.rePoint.x, this.rePoint.y),
        this.topMiddlePoint = new Point(n + u / 2, this.rsPoint.y),
        this.bottomMiddlePoint = new Point(n + u / 2, this.rePoint.y),
        this.leftMiddlePoint = new Point(this.rsPoint.x, t + r / 2),
        this.rightMiddlePoint = new Point(this.rePoint.x, t + r / 2),
        this.movePoint = new Point((this.rsPoint.x + this.rePoint.x) / 2, (this.rsPoint.y + this.rePoint.y) / 2),
        i.strokeStyle = "#" + this.color,
        i.lineWidth = this.width,
        i.strokeRect(n, t, u, r),
        i.stroke(),
        this.active(),
        this.showMeasurement()
    },
    n.calcMeasurementInfo = function () {
        var t = Math.abs(this.startPoint.x - this.endPoint.x),
        i = Math.abs(this.startPoint.y - this.endPoint.y),
        n = "";
        return n = appendLine(n, Measurement.Width + floatRound(t * this.calibration) + Measurement.Unit),
        n = appendLine(n, Measurement.Height + floatRound(i * this.calibration) + Measurement.Unit),
        n = appendLine(n, Measurement.Area + floatRound(t * this.calibration * i * this.calibration) + Measurement.AreaUnit),
        n = appendLine(n, Measurement.Perimeter + floatRound((2 * i + 2 * t) * this.calibration) + Measurement.Unit)
    },
    n.active = function () {
        if (getQueryString("SwitchAnno") == "1") {
            return
        }
        (this.isEndDrawing || !this.isDrawStart) && this.isSelected && (this.drawThumb(this.leftTopPoint), this.drawThumb(this.leftBottomPoint), this.drawThumb(this.rightTopPoint), this.drawThumb(this.rightBottomPoint), this.drawThumb(this.topMiddlePoint), this.drawThumb(this.bottomMiddlePoint), this.drawThumb(this.leftMiddlePoint), this.drawThumb(this.rightMiddlePoint), this.drawMoveThumb(this.movePoint))
    },
    n.shapeMovePosition = function () {
        if (this.activeMove != null && this.activeMove != ActiveMove.None && this.moveOffset != null) {
            var n;
            switch (this.activeMove) {
                case ActiveMove.LeftTopMove:
                    this.resetActiveMovePoint(this.rsPoint, this.startPoint);
                    break;
                case ActiveMove.RightTopMove:
                    n = new Point(0, this.moveOffset.y),
                this.resetActiveMovePoint(this.rsPoint, this.startPoint, n),
                n = new Point(this.moveOffset.x, 0),
                this.resetActiveMovePoint(this.rePoint, this.endPoint, n);
                    break;
                case ActiveMove.LeftBottomMove:
                    n = new Point(this.moveOffset.x, 0),
                this.resetActiveMovePoint(this.rsPoint, this.startPoint, n),
                n = new Point(0, this.moveOffset.y),
                this.resetActiveMovePoint(this.rePoint, this.endPoint, n);
                    break;
                case ActiveMove.RightBottomMove:
                    this.resetActiveMovePoint(this.rePoint, this.endPoint);
                    break;
                case ActiveMove.TopMiddleMove:
                    n = new Point(0, this.moveOffset.y),
                this.resetActiveMovePoint(this.rsPoint, this.startPoint, n);
                    break;
                case ActiveMove.BottomMiddleMove:
                    n = new Point(0, this.moveOffset.y),
                this.resetActiveMovePoint(this.rePoint, this.endPoint, n);
                    break;
                case ActiveMove.LeftMiddleMove:
                    n = new Point(this.moveOffset.x, 0),
                this.resetActiveMovePoint(this.rsPoint, this.startPoint, n);
                    break;
                case ActiveMove.RightMiddleMove:
                    n = new Point(this.moveOffset.x, 0),
                this.resetActiveMovePoint(this.rePoint, this.endPoint, n);
                    break;
                case ActiveMove.ShapeMove:
                    this.resetActiveMovePoint(this.rsPoint, this.startPoint),
                this.resetActiveMovePoint(this.rePoint, this.endPoint)
            }
            this.activeMove != ActiveMove.ShapeMove && (this.isMeasurementChanged = !0)
        }
    },
    n.getActiveMove = function (n) {
        var t = [];
        this.addClickResult(t, n, this.leftTopPoint, ActiveMove.LeftTopMove),
        this.addClickResult(t, n, this.leftBottomPoint, ActiveMove.LeftBottomMove),
        this.addClickResult(t, n, this.rightTopPoint, ActiveMove.RightTopMove),
        this.addClickResult(t, n, this.rightBottomPoint, ActiveMove.RightBottomMove),
        this.addClickResult(t, n, this.topMiddlePoint, ActiveMove.TopMiddleMove),
        this.addClickResult(t, n, this.bottomMiddlePoint, ActiveMove.BottomMiddleMove),
        this.addClickResult(t, n, this.leftMiddlePoint, ActiveMove.LeftMiddleMove),
        this.addClickResult(t, n, this.rightMiddlePoint, ActiveMove.RightMiddleMove),
        this.addClickResult(t, n, this.movePoint, ActiveMove.ShapeMove),
        this.setNearestMove(t);
        return
    },
    n.isHitMe = function (n) {

        return this.isSelected && this.getActiveMove(n),
        this.activeMove != ActiveMove.None ? !0 : !1;
        var t
    }
    var Remark;


    function i(n) {
        if (!ShapeViewer.Viewer.isSelectedEnable) return !0;
        var i = n.data.owner;
        return ShapeViewer.Viewer.setActiveShape(i),
        i.type == AnnotationType.Position ? (i.isSelected = !0, ShapeViewer.Viewer.showImageAnnotations()) : t(!0, i),
        n.stopPropagation(),
        !1
    }
    function tb(n, t) {
        if (n) replaceSize(t.inpElmt, t.txtElmt),
        $(t.txtElmt).hide(),
        $(t.inpElmt).show(),
        t.inpElmt.select(),
        t.isSelected = !0,
        t.active();
        else {
            $(t.txtElmt).show();
            var i = $(t.inpElmt).val();
            t.description != i && ShapeViewer.Viewer.dirtyCanvas(),
            $(t.txtElmt).html(replaceHtmlEnter(i)),
            $(t.inpElmt).hide(),
            t.description = i
        }
    }
    Remark = function (n, t, i) {
        Shape.apply(this, [n, t, i]),
        n != null && this.createElmt()
    },
    Remark.prototype = new Shape;
    var n = Remark.prototype;
    n.draw = function () {
        this.rsPoint = this.resetPoint(this.startPoint, this.cavScale, this.cavOffset),
        this.rePoint = this.resetPoint(this.endPoint, this.cavScale, this.cavOffset),
        this.setCSS(this.rsPoint.x, this.rsPoint.y),
        this.shapeMovePosition()
    },
    n.active = function () {

        this.isSelected && (this.movePoint = new Point(this.rsPoint.x + parseInt(this.inpElmt.style.width) / 2, this.rsPoint.y + parseInt(this.inpElmt.style.height) / 2), this.drawMoveThumb(this.rsPoint))
    },
    n.isHitMe = function (n) {
        this.isSelected = !0;
        if (this.isSelected) {
            var t = [];
            if (this.addClickResult(t, n, this.rsPoint, ActiveMove.ShapeMove), this.setNearestMove(t), this.activeMove == ActiveMove.ShapeMove) return !0
        }
        return !1
    },
    n.isHitMyArea = function (n) {
        if (getQueryString("SwitchAnno") == "1") {
            return
        }
        return this.isSelected = this.isHitMe(n)
    },
    n.shapeMovePosition = function () {

        this.activeMove != null && this.activeMove != ActiveMove.None && this.activeMove == ActiveMove.ShapeMove && (this.resetActiveMovePoint(this.rsPoint, this.startPoint), this.resetActiveMovePoint(this.rePoint, this.endPoint))
    },
    n.createElmt = function () {
        var n;
        this.txtElmt == null && (this.txtElmt = document.createElement("label"), this.container.appendChild(this.txtElmt), n = $(this.txtElmt), n.bind("mousedown", {
            owner: this
        },
        i), n.hide()),
        this.inpElmt == null && (this.inpElmt = document.createElement("textarea"), this.container.appendChild(this.inpElmt), n = $(this.inpElmt), n.hide(), n.mousedown(function (n) {
            n.stopPropagation()
        }))
    },
    n.setCSS = function (n, i) {
        //registerTxtCSS(this.txtElmt, n, i, this.fontSize, this.fontFamily, this.color, this.fontBold, this.fontItalic, this.fontUnderLine, this.description, !0, !0),
        //registerTxtCSS(this.inpElmt, n, i, this.fontSize, this.fontFamily, this.color, this.fontBold, this.fontItalic, this.fontUnderLine, this.description, !0, !1),
        tb(this.isSelected, this)
    },
    n.drawStart = function () { },
    n.drawClick = function () {
        this.isEndDrawing = !0
    }
    var Position;


    Position = function (n, t, i) {
        Remark.apply(this, [n, t, i])
    },
    Position.prototype = new Remark;
    var n = Position.prototype, img, x, y, url;
    n.draw = function (n) {
        var n = this.getContext();
        n.beginPath();
        this.rsPoint = this.resetPoint(this.startPoint, this.cavScale, this.cavOffset),
        this.rePoint = this.resetPoint(this.endPoint, this.cavScale, this.cavOffset),
        //this.drawPositionIcon(this.rsPoint),

        // n.clearRect(x, y, img.width, img.height);
        img = new Image();
        x = this.rsPoint.x - 28;
        y = this.rsPoint.y - 51;
        url = this.getUrl();
        img.src = url;
        this.shapeMovePosition();
        this.isEndDrawing = true;
        this.active();
        n.drawImage(img, x, y);



        //this.setCSS(this.rsPoint.x, this.rsPoint.y),


    },
    n.getUrl = function () {
        var url;

        switch (this.imageindex) {
            case "1":
                url = "image/pin_1.png";
                break;
            case "2":
                url = "image/pin_2.png";
                break;
            case "3":
                url = "image/pin_3.png";
                break;
            case "4":
                url = "image/pin_4.png";
                break;
            default:
                url = "image/pin_1.png";
                break;
        }
        SlideViewerConfig.PositionUrl = url;
        return url;
    }
    n.active = function () {
        ////        this.isDrawStart = false;
        ////        this.isEndDrawing = true;
        ////        this.isSelected = true;
        ////        this.drawThumb(this.rePoint);
        ////        this.drawThumb(this.rePoint);
        ////        this.drawMoveThumb(this.movePoint);
        (this.isEndDrawing || !this.isDrawStart) && this.isSelected && (this.drawThumb(this.rsPoint))
    },
    n.drawPositionIcon = function (n) {
        //        if (n != null) {
        var t = this.getContext()
        //                        i = 6.5;
        //                        t.beginPath(),
        //                        t.lineWidth = 2,
        //                        t.arc(n.x, n.y, i, 0, Math.PI * 2, !1),
        //                        t.fillStyle = "rgba(255, 255, 255, 0.6)",
        //                        t.fill(),
        //                        t.strokeStyle = "#666465",
        //                        t.stroke(),
        //                        t.beginPath(),
        //                        t.lineWidth = 3,
        //                        t.strokeStyle = "#cfb569",
        //                        t.moveTo(n.x, n.y),
        //                        t.lineTo(n.x, n.y - i * 2.8),
        //                        t.stroke(),
        //                        t.lineTo(n.x + i * 1.6, n.y - i - 2),
        //                        t.lineTo(n.x, n.y - i - 2),
        //                        t.fillStyle = "#dd4f37",
        //                        t.fill()

        //        }

    }
    var Ellipse;

    function ta(n, t, i, r, u) {
        var l = .5522848,
        o = r / 2 * l,
        s = u / 2 * l,
        c = t + r,
        h = i + u,
        e = t + r / 2,
        f = i + u / 2;
        n.beginPath(),
        n.moveTo(t, f),
        n.bezierCurveTo(t, f - s, e - o, i, e, i),
        n.bezierCurveTo(e + o, i, c, f - s, c, f),
        n.bezierCurveTo(c, f + s, e + o, h, e, h),
        n.bezierCurveTo(e - o, h, t, f + s, t, f),
        n.stroke()
    }
    Ellipse = function (n, t, i) {
        Rectangle.apply(this, [n, t, i])
    },
    Ellipse.prototype = new Rectangle;
    var n = Ellipse.prototype;
    n.draw = function () {
        var r = this.getContext();
        if (this.color.indexOf('#') != -1) {
            this.color = this.color.replace('#', '');
        }
        this.rsPoint = this.resetPoint(this.startPoint, this.cavScale, this.cavOffset),
        this.rePoint = this.resetPoint(this.endPoint, this.cavScale, this.cavOffset),
        this.shapeMovePosition();
        var u = Math.abs(this.rePoint.x - this.rsPoint.x),
        f = Math.abs(this.rePoint.y - this.rsPoint.y),
        n = 0,
        i = 0;
        this.rePoint.x > this.rsPoint.x
    && this.rePoint.y > this.rsPoint.y
     ? (n = this.rsPoint.x, i = this.rsPoint.y) : this.rePoint.x > this.rsPoint.x
     && this.rePoint.y < this.rsPoint.y ? (n = this.rsPoint.x, i = this.rePoint.y) :
      this.rePoint.x < this.rsPoint.x && this.rePoint.y > this.rsPoint.y ?
      (n = this.rePoint.x, i = this.rsPoint.y)
       : this.rePoint.x < this.rsPoint.x && this.rePoint.y < this.rsPoint.y && (n = this.rePoint.x, i = this.rePoint.y),
        this.leftTopPoint = new Point(this.rsPoint.x, this.rsPoint.y),
        this.leftBottomPoint = new Point(this.rsPoint.x, this.rePoint.y),
        this.rightTopPoint = new Point(this.rePoint.x, this.rsPoint.y),
        this.rightBottomPoint = new Point(this.rePoint.x, this.rePoint.y),
        this.topMiddlePoint = new Point(n + u / 2, this.rsPoint.y),
        this.bottomMiddlePoint = new Point(n + u / 2, this.rePoint.y),
        this.leftMiddlePoint = new Point(this.rsPoint.x, i + f / 2),
        this.rightMiddlePoint = new Point(this.rePoint.x, i + f / 2),
        this.movePoint = new Point((this.rsPoint.x + this.rePoint.x) / 2, (this.rsPoint.y + this.rePoint.y) / 2),
        r.lineWidth = this.width,
        r.strokeStyle = "#" + this.color,
        ta(r, n, i, u, f),
        this.active(),
        this.showMeasurement()
    },
    n.calcMeasurementInfo = function () {
        var f = Math.abs(this.startPoint.x - this.endPoint.x),
        e = Math.abs(this.startPoint.y - this.endPoint.y),
        r = f / 2 * this.calibration,
        i = e / 2 * this.calibration,
        n = Math.abs(r - i) / (r + i),
        u,
        t;
        return n = n * n,
        u = isNaN(n) ? 0 : Math.PI * (r + i) * (135168 - 85760 * n - 5568 * n * n + 3867 * n * n * n) / (135168 - 119552 * n + 22208 * n * n - 345 * n * n * n),
        t = "",
        t = appendLine(t, Measurement.Majorhalfaxis + floatRound(Math.max(r, i)) + Measurement.Unit),
        t = appendLine(t, Measurement.Minorhalfaxis + floatRound(Math.min(r, i)) + Measurement.Unit),
        t = appendLine(t, Measurement.Area + floatRound(Math.abs(Math.PI * f * this.calibration * e * this.calibration / 4)) + Measurement.AreaUnit),
        t = appendLine(t, Measurement.Perimeter + floatRound(u) + Measurement.Unit)
    },
    n.isHitMe = function (n) {
        return this.isSelected && this.getActiveMove(n),
        this.activeMove != ActiveMove.None ? !0 : !1;
        var t
    }
    var CurveRounded;


    function t(n, t, i, r) {
        for (var u, f, e, o = 0; o < t.length; o++) u = new Point(t[o].x, t[o].y),
        u = n.resetPoint(u, i, r),
        o == 0 ? (f = new Point(u.x, u.y), e = new Point(u.x, u.y)) : (f.x > u.x && (f.x = u.x), f.y > u.y && (f.y = u.y), e.x < u.x && (e.x = u.x), e.y < u.y && (e.y = u.y)),
        n.cavPoints.push(u);
        n.cavScale = i,
        n.cavOffset = r,
        n.resetStartPoint(f),
        n.resetEndPoint(e),
        n.initRect = new Rect(f.x, f.y, e.x - f.x, e.y - f.y)
    }
    CurveRounded = function (n, i, r, u, f, e) {
        Rectangle.apply(this, [n, i, r]);
        this.isClose = !0;
        this.pointCount = 0;
        this.cavPoints = [];
        this.tempPoints;
        this.initRect;
        if (u != null) {
            t(this, u, f, e)
        }
    },
    CurveRounded.prototype = new Rectangle;
    var n = CurveRounded.prototype;
    n.draw = function () {
        var i = this.getContext(),
        n,
        o,
        t;

        if (i.beginPath(), this.shapeMovePosition(), this.isEndDrawing) {
            this.activeMove == ActiveMove.None && (this.rsPoint = this.toCanvasPoint(this.startPoint), this.rePoint = this.toCanvasPoint(this.endPoint), this.resetStartPoint(this.rsPoint), this.resetEndPoint(this.rePoint));
            var f = this.rePoint.x - this.rsPoint.x,
            e = this.rePoint.y - this.rsPoint.y,
            r = this.rsPoint.x,
            u = this.rsPoint.y,
            s = (this.rePoint.x - this.rsPoint.x) / this.initRect.width,
            h = (this.rePoint.y - this.rsPoint.y) / this.initRect.height;
            for (this.tempPoints = [], t = 0; t < this.cavPoints.length; t++) n = new Point(this.cavPoints[t].x, this.cavPoints[t].y),
            n.x -= this.initRect.x,
            n.y -= this.initRect.y,
            n.x *= s,
            n.y *= h,
            n.x += r,
            n.y += u,
            this.tempPoints.push(n);
            for (this.points = [], t = 0; t < this.tempPoints.length; t++) n = this.tempPoints[t],
            this.points.push(new Point((n.x - this.cavOffset.x) / this.cavScale, (n.y - this.cavOffset.y) / this.cavScale)),
            t == 0 ? (i.moveTo(n.x, n.y), o = n) : t == this.tempPoints.length - 1 ? (i.lineTo(n.x, n.y), this.isClose && i.lineTo(o.x, o.y)) : i.lineTo(n.x, n.y);
            this.leftTopPoint = new Point(r, u),
            this.leftBottomPoint = new Point(r, u + e),
            this.rightTopPoint = new Point(r + f, u),
            this.rightBottomPoint = new Point(r + f, u + e),
            this.topMiddlePoint = new Point(r + f / 2, u),
            this.bottomMiddlePoint = new Point(r + f / 2, u + e),
            this.leftMiddlePoint = new Point(r, u + e / 2),
            this.rightMiddlePoint = new Point(r + f, u + e / 2),
            this.movePoint = new Point((this.rsPoint.x + this.rePoint.x) / 2, (this.rsPoint.y + this.rePoint.y) / 2)
        } else for (t = 0; t < this.points.length; t++) n = this.resetPoint(this.points[t], this.cavScale, this.cavOffset),
        t == 0 ? i.moveTo(n.x, n.y) : i.lineTo(n.x, n.y);
        i.lineWidth = this.width;
        if (this.color.indexOf('#') != -1) {
            this.color = this.color.replace('#', '');
        };
        i.strokeStyle = "#" + this.color;
        i.stroke();
        this.active();
        this.showMeasurement()
    },
    n.calcMeasurementInfo = function () {
        var t = CalcLengthClosed(this.points) * this.calibration,
        i = CalcArea(this.points) * this.calibration * this.calibration,
        n = "";
        return n = appendLine(n, Measurement.Area + floatRound(i) + Measurement.AreaUnit),
        n = appendLine(n, Measurement.Perimeter + floatRound(t) + Measurement.Unit)
    },
    n.isHitMe = function (n) {
        var i, r, t;
        return this.isSelected && this.getActiveMove(n),
        this.activeMove != ActiveMove.None ? !0 : !1
    },
    n.drawStart = function (n) {
        this.points.push(n),
        this.startPoint = this.endPoint = n
    },
    n.drawMove = function (n) {
        this.pointCount++,
        this.pointCount == 4 && (this.pointCount = 0, this.points.push(n), this.endPoint = n)
    },
    n.drawEnd = function () {
        t(this, this.points, this.cavScale, this.cavOffset)
    }
    var Curve;


    Curve = function (n, t, i, r, u, f) {
        CurveRounded.apply(this, [n, t, i, r, u, f]),
        this.isClose = !1
    },
Curve.prototype = new CurveRounded;
    var n = Curve.prototype;
    n.calcMeasurementInfo = function () {
        var t = CalcLength(this.points) * this.calibration;
        return appendLine(Measurement.Perimeter, floatRound(t) + Measurement.Unit)
    }
    var Size = function (n, t) {
        this.width = n,
    this.height = t
    };
    var Orientation = {
        Vertical: 0,
        Horizontal: 1
    };
    var Measure = function (n, t) {
        self = this,
    this.canvas = n,
    this.calibration = t,
    this.cellWidth = 800,
    this.CellWidth = 2500,
    this.minCellWidth = 48,
    this.MinCellWidth = 200,
    this.maxCellWidth = 156,
    this.MaxCellWidth = 260,
    this.xs,
    this.MinlblV,
    this.isAllShow = true,
    this.k,
    this.k1,
    this.un,
    this.cavScale,
    this.cavOffset,
    this.autoAdjustCellWidth = !0,
    this.location = new Point(0, 0),
    this.defaultPadding = 20,
    this.containerSize,
    this.width = 1,
    this.color = "#363736",
    this.getContext = function () {
        return this.canvas.getContext("2d")
    },
    this.refresh = function (n, t) {
        this.cavScale = n,
        this.cavOffset = t
    },
    this.resetContainerSize = function (n, t) {
        this.containerSize = new Size(n, t)
    },
    this.draw = function () { }
};
var Point;
(function () {
    Point = function (n, t) {
        this.x = typeof n == "number" ? n : n * 1,
        this.y = typeof t == "number" ? t : t * 1
    }
})();
Grid = function (n, t, i, r, u, f) {
    Measure.apply(this, [n, t]),
    this.imgSize = new Size(i, r),
    this.containerSize = new Size(u, f),
    this.displayRect = new Rect,
    this.draw = function (n, t) {
        var r, i, f, u;
        if (this.refresh(n, t), r = this.cellWidth * this.cavScale / this.calibration, this.autoAdjustCellWidth) {
            if (r < this.minCellWidth) {
                this.cellWidth *= 2,
                this.draw(n, t);
                return
            }
            if (r > this.maxCellWidth) {
                this.cellWidth /= 2,
                this.draw(n, t);
                return
            }
        }
        if (SlideViewerConfig.showRulers() || (this.defaultPadding = 0), this.displayRect.x = this.cavOffset.x, this.displayRect.y = this.cavOffset.y, this.displayRect.width = this.imgSize.width * this.cavScale, this.displayRect.height = this.imgSize.height * this.cavScale, !(this.displayRect.width < r) && !(this.displayRect.width.height < r)) {
            i = this.getContext(),
            i.beginPath();
            var f, u, o = this.location.x + this.defaultPadding,
            e = this.location.y + this.defaultPadding,
            t = new Point(o + this.cavOffset.x, e + this.cavOffset.y),
            h = t.x % r - o,
            s = t.y % r - e,
            l = Math.min(this.containerSize.width, this.displayRect.width),
            c = Math.min(this.containerSize.height, this.displayRect.height);
            if (this.containerSize.width < this.displayRect.width && this.containerSize.height < this.displayRect.height) {
                for (f = h; f < this.containerSize.width; f += r) i.moveTo(f, e),
                i.lineTo(f, this.containerSize.height);
                for (u = s; u < this.containerSize.height; u += r) i.moveTo(o, u),
                i.lineTo(this.containerSize.width, u)
            } else {
                for (f = this.displayRect.x; f < this.displayRect.width + this.displayRect.x; f += r) i.moveTo(f, this.displayRect.y),
                i.lineTo(f, this.displayRect.y + this.displayRect.height);
                for (u = this.displayRect.y; u < this.displayRect.height + this.displayRect.y; u += r) i.moveTo(this.displayRect.x, u),
                i.lineTo(this.displayRect.x + this.displayRect.width, u)
            }
            i.lineWidth = this.width,
            i.strokeStyle = "Grey",
            i.stroke()
        }
    }
};
var Ruler = function (n, t, i, r) {
    Measure.apply(this, [n, t]),
    this.divisionMark = 5,
    this.divisionMajorMark = this.defaultPadding,
    this.divisionNum = 5,
    this.containerSize = new Size(i, r),
    this.zeroPoint,
    this.draw = function (n, t) {
        var o, f, e;
        if (this.refresh(n, t), o = this.cellWidth * this.cavScale / this.calibration, this.autoAdjustCellWidth) {
            if (o < this.minCellWidth) {
                this.cellWidth *= 2,
                this.draw(n, t);
                return
            }
            if (o > this.maxCellWidth) {
                this.cellWidth /= 2,
                this.draw(n, t);
                return
            }
        }
        this.zeroPoint = new Point(this.cavOffset.x, this.cavOffset.y);
        var h = o / this.divisionNum,
        s = 0,
        i = this.getContext();
        i.beginPath(),
                i.fillStyle = "#ffffff",
        i.fillRect(this.location.x, this.location.y, this.containerSize.width, this.divisionMajorMark),
        i.fillRect(this.location.x, this.location.y, this.divisionMajorMark, this.containerSize.height),
        i.font = "12px Microsoft Sans Serif,\u5b8b\u4f53",
                i.fillStyle = this.color;
        var r = this.location.x + this.divisionMajorMark,
        u = this.location.y + this.divisionMajorMark,
        t = new Point(r + this.cavOffset.x, u + this.cavOffset.y),
        l = t.x % o - r,
        c = t.y % o - u;
        for (i.moveTo(r, u), i.lineTo(this.location.x + this.containerSize.width, u), f = l; f < this.containerSize.width; f += h) {
            if (f < r) {
                s++;
                continue
            }
            s % this.divisionNum == 0 ? (i.moveTo(f, u), i.lineTo(f, u - this.divisionMajorMark), i.fillText(floatRound((f - this.zeroPoint.x) * this.cellWidth / o), f + 2, u / 1.5)) : (i.moveTo(f, u), i.lineTo(f, u - this.divisionMark)),
            s++
        }
        for (i.moveTo(r, u), i.lineTo(r, this.location.y + this.containerSize.height), s = 0, e = c; e < this.containerSize.height; e += h) {
            if (e < u) {
                s++;
                continue
            }
            s % this.divisionNum == 0 ? (i.moveTo(r, e), i.lineTo(r - this.divisionMajorMark, e), i.rotate(Math.PI * 3 / 2), str = floatRound((e - this.zeroPoint.y) * this.cellWidth / o).toString(), i.fillText(str, -(e + str.length * 8), r / 1.5), i.rotate(Math.PI / 2)) : (i.moveTo(r, e), i.lineTo(r - this.divisionMark, e)),
            s++
        }
        i.lineWidth = this.width,
        i.strokeStyle = this.color,
        i.stroke()
    }

    this.draws = function (n, t) {
        this.refresh(n, t);
        var h, cm, cellCm;
        var Param = 1 / this.cavScale, a;
        if (Param <= 1) {
            a = 1;
        }
        else if (Param > 1 && Param < 2) {
            a = 1;
        }
        else {
            a = Param - (Param % 2);
        }
        this.MinlblV = 100 * a;
        if (this.MinlblV < 1000) {
            if (this.MinlblV % 5 != 0) {
                this.MinlblV = this.MinlblV + (this.MinlblV - this.MinlblV % 5);
            }
        }
        else {
            if (this.MinlblV % 5000 != 0) {
                if (this.MinlblV < 5000) {
                    this.MinlblV = 5000;
                }
                else {
                    this.MinlblV = this.MinlblV + (this.MinlblV / 5000 - this.MinlblV % 5000);
                }
            }
        }
        this.xs = this.MinlblV / (Param * this.calibration);
        this.CheckLimtRule(this.xs, this.MinlblV);
        this.UpRuleLayout(this.xs, this.MinlblV)
        
        //        if (this.refresh(n, t), o = this.CellWidth * this.cavScale / this.calibration, this.autoAdjustCellWidth) {
        //            if (o < this.MinCellWidth) {
        //                this.CellWidth *= 2,
        //                this.draws(n, t);
        //                return
        //            }
        //            if (o > this.MaxCellWidth) {
        //                this.CellWidth /= 2,
        //                this.draws(n, t);
        //                return
        //            }
        //        }

        //        h = (o) / this.divisionNum
        //        $("#rulerHeight2").css("left", h + 5)
        //        $("#rulerHeight3").css("left", (h + 5) * 2)
        //        $("#rulerHeight4").css("left", (h + 5) * 3)
        //        $("#rulerHeight5").css("left", (h + 5) * 4)
        //        $("#rulerHeight6").css("left", (h + 5) * 5)
        //        cellCm = (this.CellWidth / 5000);
        //        $("#rulerNum1").text(cellCm * 1)
        //        $("#rulerNum2").text(cellCm * 2)
        //        $("#rulerNum3").text(cellCm * 3)
        //        $("#rulerNum4").text(cellCm * 4)
        //        $("#rulerNum5").text(cellCm * 5)
    }
    this.CheckLimtRule = function () {
        if (this.xs>= this.MinCellWidth + this.MinCellWidth / 2) {
            this.xs = this.xs / 2;
            this.MinlblV = this.MinlblV / 2;
            this.CheckLimtRule()
        }
        if (this.xs < 150) {
            this.xs =this.xs * 2;
            this.MinlblV = this.MinlblV * 2;
        }
    }
    this.UpRuleLayout = function () {
        var k, k1, un;
        if (this.MinlblV >= 1000) {
            k = Math.round(this.MinlblV / 5000*100)/100
            un = "mm";
        }
        else {
            k = this.MinlblV / 5;
            un = "μm";
        }
        k1 = this.xs / 5;
        $("#slideRuler").css("width", this.xs+5);
                $("#rulerHeight2").css("left", k1)
                $("#rulerHeight3").css("left", k1*2)
                $("#rulerHeight4").css("left", k1*3)
                $("#rulerHeight5").css("left", k1*4)
                $("#rulerHeight6").css("left", k1*5)

        $("#rulerNum1").text((k * 1))
        $("#rulerNum2").text((k * 2))
        $("#rulerNum3").text((k * 3))
        $("#rulerNum4").text((k * 4))
        $("#rulerNum5").text((k * 5) + un)
    }
};

var SlideLabel = function (n) {
    function u() {
        var f = document.createElement("div"),
        u;
        t = $(f),
        t.css({
            top: "25px",
            right: "10px"
        }),
        u = document.createElement("img"),
        u.src = n,
        u.alt = "",
        u.onerror = function () {
            r = !1,
            i.setVisibility(!1)
        },
        $(u).css({
            border: "1px solid #319DCE"
        }),
        t.append($(u)),
        i.elmt = f
    }
    var i = this,
    t, r = !0;
    i.elmt = null,
    function () {
        u()
    } (),
    this.setVisibility = function (n) {
        r && n ? t.show() : t.hide()
    }
};
