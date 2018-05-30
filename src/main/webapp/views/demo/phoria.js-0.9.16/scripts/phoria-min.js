glMatrix.setMatrixArrayType(Array);
vec3.fromXYZ = function(xyz) {
	var out = new Array(3);
	out[0] = xyz.x;
	out[1] = xyz.y;
	out[2] = xyz.z;
	return out
};
vec3.toXYZ = function(vec) {
	return {
		x : vec[0],
		y : vec[1],
		z : vec[2]
	}
};
vec4.fromXYZ = function(xyz, w) {
	var out = new Array(4);
	out[0] = xyz.x;
	out[1] = xyz.y;
	out[2] = xyz.z;
	out[3] = w;
	return out
};
mat4.fromYPR = function(yaw, pitch, roll) {
	var out = new Array(16);
	var angles0 = Math.sin(roll), angles1 = Math.cos(roll), angles2 = Math
			.sin(pitch), angles3 = Math.cos(pitch), angles4 = Math.sin(yaw), angles5 = Math
			.cos(yaw);
	out[0] = angles5 * angles1;
	out[4] = -(angles5 * angles0);
	out[8] = angles4;
	out[1] = (angles2 * angles4 * angles1) + (angles3 * angles0);
	out[5] = (angles3 * angles1) - (angles2 * angles4 * angles0);
	out[9] = -(angles2 * angles5);
	out[2] = (angles2 * angles0) - (angles3 * angles4 * angles1);
	out[6] = (angles2 * angles1) + (angles3 * angles4 * angles0);
	out[10] = angles3 * angles5;
	out[3] = 0;
	out[7] = 0;
	out[11] = 0;
	out[12] = 0;
	out[13] = 0;
	out[14] = 0;
	out[15] = 1;
	return out
};
quat.fromYPR = function(yaw, pitch, roll) {
	var num9 = roll * 0.5;
	var num6 = Math.sin(num9);
	var num5 = Math.cos(num9);
	var num8 = pitch * 0.5;
	var num4 = Math.sin(num8);
	var num3 = Math.cos(num8);
	var num7 = yaw * 0.5;
	var num2 = Math.sin(num7);
	var num = Math.cos(num7);
	var out = new Array(4);
	out[0] = ((num * num4) * num5) + ((num2 * num3) * num6);
	out[1] = ((num2 * num3) * num5) - ((num * num4) * num6);
	out[2] = ((num * num3) * num6) - ((num2 * num4) * num5);
	out[3] = ((num * num3) * num5) + ((num2 * num4) * num6);
	return out
};
if (typeof Phoria === "undefined" || !Phoria) {
	var Phoria = {};
	Phoria.RADIANS = Math.PI / 180;
	Phoria.TWOPI = Math.PI * 2;
	Phoria.ONEOPI = 1 / Math.PI;
	Phoria.PIO2 = Math.PI / 2;
	Phoria.PIO4 = Math.PI / 4;
	Phoria.EPSILON = 0.000001
}
(function() {
	Phoria.Util = {};
	Phoria.Util.extend = function extend(subc, superc, overrides) {
		var F = function() {
		}, i;
		F.prototype = superc.prototype;
		subc.prototype = new F();
		subc.prototype.constructor = subc;
		subc.superclass = superc.prototype;
		if (superc.prototype.constructor == Object.prototype.constructor) {
			superc.prototype.constructor = superc
		}
		if (overrides) {
			for (i in overrides) {
				if (overrides.hasOwnProperty(i)) {
					subc.prototype[i] = overrides[i]
				}
			}
		}
	};
	Phoria.Util.augment = function augment(r, s) {
		for (var p in s.prototype) {
			if (typeof r.prototype[p] === "undefined") {
				r.prototype[p] = s.prototype[p]
			}
		}
	};
	Phoria.Util.merge = function merge(target, src) {
		var array = Array.isArray(src), dst = array && [] || {};
		if (array) {
			target = target || [];
			dst = dst.concat(target);
			src.forEach(function(e, i) {
						if (typeof e === "object") {
							dst[i] = Phoria.Util.merge(target[i], e)
						} else {
							dst[i] = e
						}
					})
		} else {
			if (target && typeof target === "object") {
				Object.keys(target).forEach(function(key) {
							dst[key] = target[key]
						})
			}
			Object.keys(src).forEach(function(key) {
						if (typeof src[key] !== "object" || !src[key]) {
							dst[key] = src[key]
						} else {
							if (!target || !target[key]) {
								dst[key] = src[key]
							} else {
								dst[key] = Phoria.Util.merge(target[key],
										src[key])
							}
						}
					})
		}
		return dst
	};
	Phoria.Util.combine = function combine(target, src) {
		var array = Array.isArray(src) && Array.isArray(target);
		if (array) {
			if (target.length < src.length) {
				target.length = src.length
			}
			src.forEach(function(e, i) {
						if (typeof e === "object") {
							target[i] = target[i] || {};
							Phoria.Util.combine(target[i], e)
						} else {
							target[i] = e
						}
					})
		} else {
			Object.keys(src).forEach(function(key) {
				if (typeof src[key] !== "object" || !src[key]) {
					target[key] = src[key]
				} else {
					target[key] = target[key]
							|| (Array.isArray(src[key]) ? [] : {});
					Phoria.Util.combine(target[key], src[key])
				}
			})
		}
	};
	Phoria.Util.clone = function clone(src) {
		var n = null, dst = {};
		for (var p in src) {
			n = src[p];
			if (Array.isArray(n)) {
				dst[p] = [].concat(n)
			} else {
				dst[p] = n
			}
		}
		return dst
	};
	Phoria.Util.isIdentity = function isIdentity(mat) {
		return (mat[0] === 1 && mat[1] === 0 && mat[2] === 0 && mat[3] === 0
				&& mat[4] === 0 && mat[5] === 1 && mat[6] === 0 && mat[7] === 0
				&& mat[8] === 0 && mat[9] === 0 && mat[10] === 1
				&& mat[11] === 0 && mat[12] === 0 && mat[13] === 0
				&& mat[14] === 0 && mat[15] === 1)
	};
	Phoria.Util.calcNormalVector = function calcNormalVector(x1, y1, z1, x2,
			y2, z2) {
		var v = vec4.fromValues((y1 * z2) - (z1 * y2),
				-((z2 * x1) - (x2 * z1)), (x1 * y2) - (y1 * x2), 0);
		return vec3.normalize(v, v)
	};
	Phoria.Util.thetaTo = function thetaTo(v1, v2) {
		return Math
				.acos(vec3.dot(v1, v2)
						/ (Math.sqrt(v1[0] * v1[0] + v1[1] * v1[1] + v1[2]
								* v1[2]) * Math.sqrt(v2[0] * v2[0] + v2[1]
								* v2[1] + v2[2] * v2[2])))
	};
	Phoria.Util.averagePolyVertex = function averagePolyVertex(vertices,
			worldcoords) {
		for (var i = 0, avx = 0, avy = 0, avz = 0; i < vertices.length; i++) {
			avx += worldcoords[vertices[i]][0];
			avy += worldcoords[vertices[i]][1];
			avz += worldcoords[vertices[i]][2]
		}
		return vec3.fromValues(avx / vertices.length, avy / vertices.length,
				avz / vertices.length)
	};
	Phoria.Util.averageObjectZ = function averageObjectZ(coords) {
		var av = 0;
		for (var i = 0; i < coords.length; i++) {
			av += coords[i][3]
		}
		return av / coords.length
	};
	Phoria.Util.populateBuffer = function populateBuffer(len, fnFactory) {
		var array = new Array(len);
		for (var i = 0; i < len; i++) {
			array[i] = fnFactory(i)
		}
		return array
	};
	Phoria.Util.sortPolygons = function sortPolygons(polygons, worldcoords) {
		for (var i = 0, verts; i < polygons.length; i++) {
			verts = polygons[i].vertices;
			if (verts.length === 3) {
				polygons[i]._avz = (worldcoords[verts[0]][2]
						+ worldcoords[verts[1]][2] + worldcoords[verts[2]][2])
						* 0.333333
			} else {
				polygons[i]._avz = (worldcoords[verts[0]][2]
						+ worldcoords[verts[1]][2] + worldcoords[verts[2]][2] + worldcoords[verts[3]][2])
						* 0.25
			}
		}
		polygons.sort(function sortPolygonsZ(f1, f2) {
					return (f1._avz < f2._avz ? -1 : 1)
				})
	};
	Phoria.Util.sortEdges = function sortEdges(edges, coords) {
		for (var i = 0; i < edges.length; i++) {
			edges[i]._avz = (coords[edges[i].a][2] + coords[edges[i].b][2])
					* 0.5
		}
		edges.sort(function sortEdgesZ(f1, f2) {
					return (f1._avz < f2._avz ? -1 : 1)
				})
	};
	Phoria.Util.sortPoints = function sortPoints(coords, worldcoords) {
		var quickSort = function qSort(c, a, start, end) {
			if (start < end) {
				var pivotIndex = (start + end) >> 1, pivotValue = a[pivotIndex][2], pivotIndexNew = start;
				var tmp = a[pivotIndex];
				a[pivotIndex] = a[end];
				a[end] = tmp;
				tmp = c[pivotIndex];
				c[pivotIndex] = c[end];
				c[end] = tmp;
				for (var i = start; i < end; i++) {
					if (a[i][2] > pivotValue) {
						tmp = c[i];
						c[i] = c[pivotIndexNew];
						c[pivotIndexNew] = tmp;
						tmp = a[i];
						a[i] = a[pivotIndexNew];
						a[pivotIndexNew] = tmp;
						pivotIndexNew++
					}
				}
				tmp = c[pivotIndexNew];
				c[pivotIndexNew] = c[end];
				c[end] = tmp;
				tmp = a[pivotIndexNew];
				a[pivotIndexNew] = a[end];
				a[end] = tmp;
				qSort(c, a, start, pivotIndexNew - 1);
				qSort(c, a, pivotIndexNew + 1, end)
			}
		};
		quickSort(worldcoords, coords, 0, coords.length - 1)
	};
	Phoria.Util.generateTesselatedPlane = function generateTesselatedPlane(
			vsegs, hsegs, level, scale, generateUVs) {
		var points = [], edges = [], polys = [], hinc = scale / hsegs, vinc = scale
				/ vsegs, c = 0;
		for (var i = 0, x, y = scale / 2; i <= vsegs; i++) {
			x = -scale / 2;
			for (var j = 0; j <= hsegs; j++) {
				points.push({
							x : x,
							y : 0,
							z : y
						});
				if (j !== 0) {
					edges.push({
								a : c,
								b : c - 1
							})
				}
				if (i !== 0) {
					edges.push({
								a : c,
								b : c - hsegs - 1
							})
				}
				if (i !== 0 && j !== 0) {
					var p = {
						vertices : [c - hsegs - 1, c, c - 1, c - hsegs - 2]
					};
					if (generateUVs) {
						var uvs = [(1 / hsegs) * j, (1 / vsegs) * (i - 1),
								(1 / hsegs) * j, (1 / vsegs) * i,
								(1 / hsegs) * (j - 1), (1 / vsegs) * i,
								(1 / hsegs) * (j - 1), (1 / vsegs) * (i - 1)];
						p.uvs = uvs
					}
					polys.push(p)
				}
				x += hinc;
				c++
			}
			y -= vinc
		}
		return {
			points : points,
			edges : edges,
			polygons : polys
		}
	};
	Phoria.Util.generateUnitCube = function generateUnitCube(scale) {
		var s = scale || 5;
		return {
			points : [{
						x : -1 * s,
						y : 1 * s,
						z : -1 * s
					}, {
						x : 1 * s,
						y : 1 * s,
						z : -1 * s
					}, {
						x : 1 * s,
						y : -1 * s,
						z : -1 * s
					}, {
						x : -1 * s,
						y : -1 * s,
						z : -1 * s
					}, {
						x : -1 * s,
						y : 1 * s,
						z : 1 * s
					}, {
						x : 1 * s,
						y : 1 * s,
						z : 1 * s
					}, {
						x : 1 * s,
						y : -1 * s,
						z : 1 * s
					}, {
						x : -1 * s,
						y : -1 * s,
						z : 1 * s
					}],
			edges : [],
			polygons : []
		}
	};
	Phoria.Util.generatePyramid = function generatePyramid(scale) {
		var s = scale || 1;
		return {
			points : [{
						x : -1 * s,
						y : 200,
						z : -1 * s
					}, {
						x : -1 * s,
						y : 200,
						z : 1 * s
					}, {
						x : 1 * s,
						y : 200,
						z : 1 * s
					}, {
						x : 1 * s,
						y : 200,
						z : -1 * s
					}, {
						x : 0,
						y : 200,
						z : 0
					}],
			edges : [],
			polygons : [{
						vertices : [0, 1, 4]
					}, {
						vertices : [1, 2, 4]
					}, {
						vertices : [2, 3, 4]
					}, {
						vertices : [3, 0, 4]
					}, {
						vertices : [3, 2, 1, 0]
					}]
		}
	};
	Phoria.Util.generateIcosahedron = function generateIcosahedron(scale) {
		var s = scale || 1;
		var t = (1 + Math.sqrt(5)) / 2, tau = (t / Math.sqrt(1 + t * t)) * s, one = (1 / Math
				.sqrt(1 + t * t))
				* s;
		return {
			points : [{
						x : tau,
						y : one,
						z : 0
					}, {
						x : -tau,
						y : one,
						z : 0
					}, {
						x : -tau,
						y : -one,
						z : 0
					}, {
						x : tau,
						y : -one,
						z : 0
					}, {
						x : one,
						y : 0,
						z : tau
					}, {
						x : one,
						y : 0,
						z : -tau
					}, {
						x : -one,
						y : 0,
						z : -tau
					}, {
						x : -one,
						y : 0,
						z : tau
					}, {
						x : 0,
						y : tau,
						z : one
					}, {
						x : 0,
						y : -tau,
						z : one
					}, {
						x : 0,
						y : -tau,
						z : -one
					}, {
						x : 0,
						y : tau,
						z : -one
					}],
			edges : [{
						a : 4,
						b : 8
					}, {
						a : 8,
						b : 7
					}, {
						a : 7,
						b : 4
					}, {
						a : 7,
						b : 9
					}, {
						a : 9,
						b : 4
					}, {
						a : 5,
						b : 6
					}, {
						a : 6,
						b : 11
					}, {
						a : 11,
						b : 5
					}, {
						a : 5,
						b : 10
					}, {
						a : 10,
						b : 6
					}, {
						a : 0,
						b : 4
					}, {
						a : 4,
						b : 3
					}, {
						a : 3,
						b : 0
					}, {
						a : 3,
						b : 5
					}, {
						a : 5,
						b : 0
					}, {
						a : 2,
						b : 7
					}, {
						a : 7,
						b : 1
					}, {
						a : 1,
						b : 2
					}, {
						a : 1,
						b : 6
					}, {
						a : 6,
						b : 2
					}, {
						a : 8,
						b : 0
					}, {
						a : 0,
						b : 11
					}, {
						a : 11,
						b : 8
					}, {
						a : 11,
						b : 1
					}, {
						a : 1,
						b : 8
					}, {
						a : 9,
						b : 10
					}, {
						a : 10,
						b : 3
					}, {
						a : 3,
						b : 9
					}, {
						a : 9,
						b : 2
					}, {
						a : 2,
						b : 10
					}],
			polygons : [{
						vertices : [4, 8, 7]
					}, {
						vertices : [4, 7, 9]
					}, {
						vertices : [5, 6, 11]
					}, {
						vertices : [5, 10, 6]
					}, {
						vertices : [0, 4, 3]
					}, {
						vertices : [0, 3, 5]
					}, {
						vertices : [2, 7, 1]
					}, {
						vertices : [2, 1, 6]
					}, {
						vertices : [8, 0, 11]
					}, {
						vertices : [8, 11, 1]
					}, {
						vertices : [9, 10, 3]
					}, {
						vertices : [9, 2, 10]
					}, {
						vertices : [8, 4, 0]
					}, {
						vertices : [11, 0, 5]
					}, {
						vertices : [4, 9, 3]
					}, {
						vertices : [5, 3, 10]
					}, {
						vertices : [7, 8, 1]
					}, {
						vertices : [6, 1, 11]
					}, {
						vertices : [7, 2, 9]
					}, {
						vertices : [6, 10, 2]
					}]
		}
	};
	Phoria.Util.subdivide = function subdivide(v, p) {
		var vertices = [], polys = [];
		var fnNormalize = function(vn) {
			var len = vn.x * vn.x + vn.y * vn.y + vn.z * vn.z;
			len = 1 / Math.sqrt(len);
			vn.x *= len;
			vn.y *= len;
			vn.z *= len
		};
		var fnSubDivide = function(v1, v2, v3) {
			var v12 = {
				x : 0,
				y : 0,
				z : 0
			}, v23 = {
				x : 0,
				y : 0,
				z : 0
			}, v31 = {
				x : 0,
				y : 0,
				z : 0
			};
			v12.x = v1.x + v2.x;
			v12.y = v1.y + v2.y;
			v12.z = v1.z + v2.z;
			v23.x = v2.x + v3.x;
			v23.y = v2.y + v3.y;
			v23.z = v2.z + v3.z;
			v31.x = v3.x + v1.x;
			v31.y = v3.y + v1.y;
			v31.z = v3.z + v1.z;
			fnNormalize(v12);
			fnNormalize(v23);
			fnNormalize(v31);
			var pn = vertices.length;
			vertices.push(v1, v2, v3, v12, v23, v31);
			polys.push({
						vertices : [pn + 0, pn + 3, pn + 5]
					});
			polys.push({
						vertices : [pn + 1, pn + 4, pn + 3]
					});
			polys.push({
						vertices : [pn + 2, pn + 5, pn + 4]
					});
			polys.push({
						vertices : [pn + 3, pn + 4, pn + 5]
					})
		};
		for (var i = 0, vs; i < p.length; i++) {
			vs = p[i].vertices;
			if (vs.length === 3) {
				fnSubDivide.call(this, v[vs[0]], v[vs[1]], v[vs[2]])
			} else {
				if (vs.length === 4) {
					fnSubDivide.call(this, v[vs[0]], v[vs[1]], v[vs[2]]);
					fnSubDivide.call(this, v[vs[2]], v[vs[3]], v[vs[0]])
				}
			}
		}
		return {
			points : vertices,
			polygons : polys
		}
	};
	Phoria.Util.generateCylinder = function generateCylinder(radius, length,
			strips) {
		var points = [], polygons = [], edges = [];
		var inc = 2 * Math.PI / strips;
		for (var s = 0, offset = 0; s <= strips; s++) {
			points.push({
						x : Math.cos(offset) * radius,
						z : Math.sin(offset) * radius,
						y : length / 2
					});
			points.push({
						x : Math.cos(offset) * radius,
						z : Math.sin(offset) * radius,
						y : -length / 2
					});
			offset += inc;
			if (s !== 0) {
				polygons.push({
							vertices : [s * 2 - 2, s * 2, s * 2 + 1, s * 2 - 1]
						});
				edges.push({
							a : s * 2,
							b : s * 2 - 2
						}, {
							a : s * 2 - 2,
							b : s * 2 - 1
						}, {
							a : s * 2 + 1,
							b : s * 2 - 1
						});
				if (s === strips - 1) {
					var vs = [];
					for (var i = strips; i >= 0; i--) {
						vs.push(i * 2)
					}
					polygons.push({
								vertices : vs
							});
					vs = [];
					for (var i = 0; i < strips; i++) {
						vs.push(i * 2 + 1)
					}
					polygons.push({
								vertices : vs
							})
				}
			}
		}
		return {
			points : points,
			edges : edges,
			polygons : polygons
		}
	};
	Phoria.Util.generateCuboid = function generateCuboid(desc) {
		var scalex = desc.scalex || 1, scaley = desc.scaley || 1, scalez = desc.scalez
				|| 1, offsetx = desc.offsetx || 0, offsety = desc.offsety || 0, offsetz = desc.offsetz
				|| 0;
		return {
			points : [{
						x : -1 * scalex,
						y : 1 * scaley,
						z : -1 * scalez
					}, {
						x : 1 * scalex,
						y : 1 * scaley,
						z : -1 * scalez
					}, {
						x : 1 * scalex,
						y : -1 * scaley,
						z : -1 * scalez
					}, {
						x : -1 * scalex,
						y : -1 * scaley,
						z : -1 * scalez
					}, {
						x : -1 * scalex,
						y : 1 * scaley,
						z : 1 * scalez
					}, {
						x : 1 * scalex,
						y : 1 * scaley,
						z : 1 * scalez
					}, {
						x : 1 * scalex,
						y : -1 * scaley,
						z : 1 * scalez
					}, {
						x : -1 * scalex,
						y : -1 * scaley,
						z : 1 * scalez
					}],
			edges : [{
						a : 0,
						b : 1
					}, {
						a : 1,
						b : 2
					}, {
						a : 2,
						b : 3
					}, {
						a : 3,
						b : 0
					}, {
						a : 4,
						b : 5
					}, {
						a : 5,
						b : 6
					}, {
						a : 6,
						b : 7
					}, {
						a : 7,
						b : 4
					}, {
						a : 0,
						b : 4
					}, {
						a : 1,
						b : 5
					}, {
						a : 2,
						b : 6
					}, {
						a : 3,
						b : 7
					}],
			polygons : [{
						vertices : [0, 1, 2, 3]
					}, {
						vertices : [0, 4, 5, 1]
					}, {
						vertices : [1, 5, 6, 2]
					}, {
						vertices : [2, 6, 7, 3]
					}, {
						vertices : [4, 0, 3, 7]
					}, {
						vertices : [5, 4, 7, 6]
					}]
		}
	};
	Phoria.Util.generateSphere = function generateSphere(scale, lats, longs,
			generateUVs) {
		var points = [], edges = [], polys = [], uvs = [];
		for (var latNumber = 0; latNumber <= lats; ++latNumber) {
			for (var longNumber = 0; longNumber <= longs; ++longNumber) {
				var theta = latNumber * Math.PI / lats;
				var phi = longNumber * 2 * Math.PI / longs;
				var sinTheta = Math.sin(theta);
				var sinPhi = Math.sin(phi);
				var cosTheta = Math.cos(theta);
				var cosPhi = Math.cos(phi);
				var x = cosPhi * sinTheta;
				var y = cosTheta;
				var z = sinPhi * sinTheta;
				if (generateUVs) {
					var u = longNumber / longs;
					var v = latNumber / lats;
					uvs.push({
								u : u,
								v : v
							})
				}
				points.push({
							x : scale * x,
							y : scale * y,
							z : scale * z
						})
			}
		}
		for (var latNumber = 0; latNumber < lats; ++latNumber) {
			for (var longNumber = 0; longNumber < longs; ++longNumber) {
				var first = (latNumber * (longs + 1)) + longNumber;
				var second = first + longs + 1;
				if (latNumber === 0) {
					var p = {
						vertices : [first + 1, second + 1, second]
					};
					if (generateUVs) {
						p.uvs = [uvs[first + 1].u, uvs[first + 1].v,
								uvs[second + 1].u, uvs[second + 1].v,
								uvs[second].u, uvs[second].v]
					}
					polys.push(p);
					edges.push({
								a : first,
								b : second
							})
				} else {
					if (latNumber === lats - 1) {
						var p = {
							vertices : [first + 1, second, first]
						};
						if (generateUVs) {
							p.uvs = [uvs[first + 1].u, uvs[first + 1].v,
									uvs[second].u, uvs[second].v, uvs[first].u,
									uvs[first].v]
						}
						polys.push(p);
						edges.push({
									a : first,
									b : second
								})
					} else {
						var p = {
							vertices : [first + 1, second + 1, second, first]
						};
						if (generateUVs) {
							p.uvs = [uvs[first + 1].u, uvs[first + 1].v,
									uvs[second + 1].u, uvs[second + 1].v,
									uvs[second].u, uvs[second].v, uvs[first].u,
									uvs[first].v]
						}
						polys.push(p);
						edges.push({
									a : first,
									b : second
								});
						edges.push({
									a : second,
									b : second + 1
								})
					}
				}
			}
		}
		return {
			points : points,
			edges : edges,
			polygons : polys
		}
	};
	Phoria.Util.generateRadialGradientBitmap = function generateRadialGradientBitmap(
			size, innerColour, outerColour) {
		var buffer = document.createElement("canvas"), width = size << 1;
		buffer.width = buffer.height = width;
		var ctx = buffer.getContext("2d"), radgrad = ctx.createRadialGradient(
				size, size, size >> 1, size, size, size);
		radgrad.addColorStop(0, innerColour);
		radgrad.addColorStop(1, outerColour);
		ctx.fillStyle = radgrad;
		ctx.fillRect(0, 0, width, width);
		var img = new Image();
		img.src = buffer.toDataURL("image/png");
		return img
	};
	Phoria.Util.request = function request(config) {
		var req = new XMLHttpRequest();
		var data = config.data || "";
		if (config.responseContentType && req.overrideMimeType) {
			req.overrideMimeType(config.responseContentType)
		}
		req.open(config.method ? config.method : "GET", config.url);
		if (config.requestContentType) {
			req.setRequestHeader("Accept", config.requestContentType)
		}
		req.onreadystatechange = function() {
			if (req.readyState === 4) {
				if (req.status === 200) {
					if (config.fnSuccess) {
						config.fnSuccess.call(this, req.responseText,
								req.status)
					}
				} else {
					if (config.fnFailure) {
						config.fnFailure.call(this, req.responseText,
								req.status)
					} else {
						alert(req.status + "\n\n" + req.responseText)
					}
				}
			}
		};
		try {
			if (config.method === "POST" || config.method === "PUT") {
				req.send(data)
			} else {
				req.send(null)
			}
		} catch (e) {
			alert(e.message)
		}
	};
	Phoria.Util.importGeometryWavefront = function importGeometryWavefront(
			config) {
		var vertex = [], faces = [], uvs = [];
		var re = /\s+/;
		var scale = config.scale || 1;
		var minx, miny, minz, maxx, maxy, maxz;
		minx = miny = minz = maxx = maxy = maxz = 0;
		Phoria.Util.request({
			url : config.url,
			fnSuccess : function(data) {
				var lines = data.split("\n");
				for (var i = 0; i < lines.length; i++) {
					var line = lines[i].split(re);
					switch (line[0]) {
						case "v" :
							var x = parseFloat(line[1]) * scale, y = parseFloat(line[2])
									* scale, z = parseFloat(line[3]) * scale;
							vertex.push({
										x : x,
										y : y,
										z : z
									});
							if (x < minx) {
								minx = x
							} else {
								if (x > maxx) {
									maxx = x
								}
							}
							if (y < miny) {
								miny = y
							} else {
								if (y > maxy) {
									maxy = y
								}
							}
							if (z < minz) {
								minz = z
							} else {
								if (z > maxz) {
									maxz = z
								}
							}
							break;
						case "vt" :
							var u = parseFloat(line[1]), v = parseFloat(line[2]);
							uvs.push([u, v]);
							break;
						case "f" :
							line.splice(0, 1);
							var vertices = [], uvcoords = [];
							for (var j = 0, vindex, vps; j < line.length; j++) {
								vindex = line[config.reorder ? line.length - j
										- 1 : j];
								if (vindex.length !== 0) {
									vps = vindex.split("/");
									vertices.push(parseInt(vps[0]) - 1);
									if (vps.length > 1
											&& vindex.indexOf("//") === -1) {
										var uv = parseInt(vps[1]) - 1;
										if (uvs.length > uv) {
											uvcoords.push(uvs[uv][0],
													uvs[uv][1])
										}
									}
								}
							}
							var poly = {
								vertices : vertices
							};
							faces.push(poly);
							if (uvcoords.length !== 0) {
								poly.uvs = uvcoords
							}
							break
					}
				}
				if (config.center) {
					var cdispx = (minx + maxx) / 2, cdispy = (miny + maxy) / 2, cdispz = (minz + maxz)
							/ 2;
					for (var i = 0; i < vertex.length; i++) {
						vertex[i].x -= cdispx;
						vertex[i].y -= cdispy;
						vertex[i].z -= cdispz
					}
				}
				if (config.scaleTo) {
					var sizex = maxx - minx, sizey = maxy - miny, sizez = maxz
							- minz;
					var scalefactor = 0;
					if (sizey > sizex) {
						if (sizez > sizey) {
							scalefactor = 1 / (sizez / config.scaleTo)
						} else {
							scalefactor = 1 / (sizey / config.scaleTo)
						}
					} else {
						if (sizez > sizex) {
							scalefactor = 1 / (sizez / config.scaleTo)
						} else {
							scalefactor = 1 / (sizex / config.scaleTo)
						}
					}
					for (var i = 0; i < vertex.length; i++) {
						vertex[i].x *= scalefactor;
						vertex[i].y *= scalefactor;
						vertex[i].z *= scalefactor
					}
				}
				if (config.fnSuccess) {
					config.fnSuccess.call(this, {
								points : vertex,
								polygons : faces
							})
				}
			},
			fnFailure : function(error) {
				if (config.fnFailure) {
					config.fnFailure.call(this, error)
				}
			}
		})
	};
	Phoria.Util.calculatePolarFromPlanar = function calculatePolarFromPlanar(
			planar) {
		var point = new vec3.create();
		point[0] = vec3.length(planar);
		point[1] = Math.acos(planar[2] / point[0]);
		if (planar[0] !== 0) {
			if (planar[0] > 0) {
				point[2] = Math.atan(planar[1] / planar[0])
			} else {
				point[2] = Math.PI + Math.atan(planar[1] / planar[0])
			}
		} else {
			if (planar[1] > 0) {
				point[2] = Math.PI / 2
			} else {
				point[2] = Math.PI * 3 / 2
			}
		}
		return point
	};
	Phoria.Util.calculatePlanarFromPolar = function calculatePlanarFromPolar(
			polar) {
		return new vec3.fromValues(Math.round(polar[0] * Math.sin(polar[1])
						* Math.cos(polar[2]) * 100)
						/ 100, Math.round(polar[0] * Math.sin(polar[1])
						* Math.sin(polar[2]) * 100)
						/ 100, Math.round(polar[0] * Math.cos(polar[1]) * 100)
						/ 100)
	};
	Phoria.Util.planeLineIntersection = function planeLineIntersection(
			planeNormal, planePoint, lineVector, linePoint) {
		var dotProduct = vec3.dot(lineVector, planeNormal);
		if (dotProduct !== 0) {
			var pointVector = new vec3.create();
			vec3.subtract(pointVector, planePoint, linePoint);
			var lineScalar = vec3.dot(planeNormal, pointVector) / dotProduct;
			var intersection = vec3.create();
			vec3.scaleAndAdd(intersection, linePoint, lineVector, lineScalar);
			return intersection
		} else {
			return null
		}
	};
	Phoria.Util.intersectionInsidePolygon = function intersectionInsidePolygon(
			polygon, points, intersection) {
		var absNormal = vec3.fromValues(Math.abs(polygon._worldnormal[0]), Math
						.abs(polygon._worldnormal[1]), Math
						.abs(polygon._worldnormal[2]));
		var numIntersects = 0;
		var testVector = vec2.fromValues(1, 1);
		for (var l = 0; l < polygon.vertices.length; l++) {
			var point1, point2, intersection2D;
			if (absNormal[2] >= absNormal[0] && absNormal[2] >= absNormal[1]) {
				point1 = vec2.fromValues(points[polygon.vertices[l]][0],
						points[polygon.vertices[l]][1]);
				point2;
				if (l < polygon.vertices.length - 1) {
					point2 = vec2.fromValues(
							points[polygon.vertices[l + 1]][0],
							points[polygon.vertices[l + 1]][1])
				} else {
					point2 = vec2.fromValues(points[polygon.vertices[0]][0],
							points[polygon.vertices[0]][1])
				}
				intersection2D = vec2.fromValues(intersection[0],
						intersection[1])
			} else {
				if (absNormal[1] > absNormal[0]) {
					point1 = vec2.fromValues(points[polygon.vertices[l]][2],
							points[polygon.vertices[l]][0]);
					point2;
					if (l < polygon.vertices.length - 1) {
						point2 = vec2.fromValues(
								points[polygon.vertices[l + 1]][2],
								points[polygon.vertices[l + 1]][0])
					} else {
						point2 = vec2.fromValues(
								points[polygon.vertices[0]][2],
								points[polygon.vertices[0]][0])
					}
					intersection2D = vec2.fromValues(intersection[2],
							intersection[0])
				} else {
					point1 = vec2.fromValues(points[polygon.vertices[l]][1],
							points[polygon.vertices[l]][2]);
					point2;
					if (l < polygon.vertices.length - 1) {
						point2 = vec2.fromValues(
								points[polygon.vertices[l + 1]][1],
								points[polygon.vertices[l + 1]][2])
					} else {
						point2 = vec2.fromValues(
								points[polygon.vertices[0]][1],
								points[polygon.vertices[0]][2])
					}
					intersection2D = vec2.fromValues(intersection[1],
							intersection[2])
				}
			}
			if (Phoria.Util.sectionLineIntersect2D(point1, point2,
					intersection2D, testVector)) {
				numIntersects++
			}
		}
		return (numIntersects % 2 === 1)
	};
	Phoria.Util.sectionLineIntersect2D = function sectionLineIntersect2D(p1,
			p2, p, v) {
		var s = vec2.create();
		vec2.subtract(s, p2, p1);
		var svCross = vec3.create();
		vec2.cross(svCross, s, v);
		if (svCross[2] === 0) {
			return false
		}
		var t = (p[0] * v[1] - p[1] * v[0] - p1[0] * v[1] + p1[1] * v[0])
				/ svCross[2];
		var u;
		if (v[0] !== 0) {
			u = (p1[0] + t * s[0] - p[0]) / v[0]
		} else {
			u = (p1[1] + t * s[1] - p[1]) / v[1]
		}
		var ip = vec2.create();
		vec2.scaleAndAdd(ip, p1, s, t);
		var doesIntersect = {
			x : false,
			y : false
		};
		if (u >= 0) {
			if (p1[0] > p2[0]) {
				if (ip[0] <= p1[0] && ip[0] >= p2[0]) {
					doesIntersect.x = true
				}
			} else {
				if (ip[0] >= p1[0] && ip[0] <= p2[0]) {
					doesIntersect.x = true
				}
			}
			if (p1[1] > p2[1]) {
				if (ip[1] <= p1[1] && ip[1] >= p2[1]) {
					doesIntersect.y = true
				}
			} else {
				if (ip[1] >= p1[1] && ip[1] <= p2[1]) {
					doesIntersect.y = true
				}
			}
		}
		return (doesIntersect.x && doesIntersect.y)
	}
})();
(function() {
	Phoria.Preloader = function() {
		this.images = [];
		return this
	};
	Phoria.Preloader.prototype = {
		images : null,
		callback : null,
		counter : 0,
		addImage : function addImage(img, url) {
			var me = this;
			img.url = url;
			img.onload = function() {
				me.counter++;
				if (me.counter === me.images.length) {
					me.callback.call(me)
				}
			};
			this.images.push(img)
		},
		onLoadCallback : function onLoadCallback(fn) {
			this.counter = 0;
			this.callback = fn;
			for (var i = 0, j = this.images.length; i < j; i++) {
				this.images[i].src = this.images[i].url
			}
		}
	}
})();
(function() {
	Phoria.Scene = function() {
		this.camera = {
			up : {
				x : 0,
				y : 1,
				z : 0
			},
			lookat : {
				x : 0,
				y : 0,
				z : 0
			},
			position : {
				x : 0,
				y : 0,
				z : -10
			}
		};
		this.perspective = {
			fov : 35,
			aspect : 1,
			near : 1,
			far : 10000
		};
		this.viewport = {
			x : 0,
			y : 0,
			width : 1024,
			height : 1024
		};
		this.graph = [];
		this.triggerHandlers = [];
		return this
	};
	Phoria.Scene.create = function(desc) {
		var s = new Phoria.Scene();
		if (desc.camera) {
			s.camera = Phoria.Util.merge(s.camera, desc.camera)
		}
		if (desc.perspective) {
			s.perspective = Phoria.Util.merge(s.perspective, desc.perspective)
		}
		if (desc.viewport) {
			s.viewport = Phoria.Util.merge(s.viewport, desc.viewport)
		}
		if (desc.graph) {
			s.graph = desc.graph
		}
		if (desc.onCamera) {
			s.onCamera(desc.onCamera)
		}
		return s
	};
	Phoria.Scene.createFromJSON = function(json) {
		var scene = null;
		var jscene = JSON.parse(json);
		if (jscene) {
			if (jscene.graph) {
				var fnProcessEntities = function(entities) {
					for (var i = 0, e; i < entities.length; i++) {
						e = entities[i];
						for (var p in e) {
							if (e.hasOwnProperty(p)) {
								if (p.indexOf("on") === 0
										&& (e[p] instanceof string || e[p] instanceof Array)) {
									try {
									} catch (error) {
										console
												.log("Failed to convert expected event handler to function: "
														+ p + "=" + e[p]);
										throw error
									}
								}
								if (p === "children" && e[p] instanceof Array) {
									fnProcessEntities(e[p])
								}
							}
						}
					}
				};
				fnProcessEntities(jscene.graph)
			}
		}
		return scene
	};
	Phoria.Scene.toJSON = function(scene) {
		for (var p in scene) {
			if (scene.hasOwnProperty(p) && p.indexOf("_") === 0) {
				delete scene[p]
			}
		}
		if (scene.graph) {
			var fnProcessEntities = function(entities) {
				for (var i = 0, e; i < entities.length; i++) {
					e = entities[i];
					for (var p in e) {
						if (e.hasOwnProperty(p)) {
							if (p.indexOf("on") === 0 && e[p] instanceof Array) {
								e[p] = e[p].toString()
							}
							if (p.indexOf("_") === 0) {
								delete e[p]
							}
							switch (p) {
								case "textures" :
									delete e[p];
									break;
								case "children" :
									if (e[p] instanceof Array) {
										fnProcessEntities(e[p])
									}
									break
							}
						}
					}
				}
			};
			fnProcessEntities(scene.graph)
		}
		return JSON.stringify(scene)
	};
	Phoria.Scene.prototype = {
		camera : null,
		perspective : null,
		graph : null,
		viewport : null,
		renderlist : null,
		lights : null,
		triggerHandlers : null,
		onCameraHandlers : null,
		_entities : null,
		_lastTime : 0,
		_cameraPosition : null,
		_perspectiveScale : 0,
		findEntity : function findEntity(id) {
			return this._entities[id]
		},
		onCamera : function onCamera(fn) {
			if (this.onCameraHandlers === null) {
				this.onCameraHandlers = []
			}
			this.onCameraHandlers = this.onCameraHandlers.concat(fn)
		},
		modelView : function modelView() {
			var now = Date.now(), time = (now - this._lastTime) / 1000;
			this._lastTime = now;
			var vpx = this.viewport.x, vpy = this.viewport.y, vpw = this.viewport.width
					* 0.5, vph = this.viewport.height * 0.5;
			this._cameraPosition = vec4.fromValues(this.camera.position.x,
					this.camera.position.y, this.camera.position.z, 0);
			var camera = mat4.create(), cameraLookat = vec4.fromValues(
					this.camera.lookat.x, this.camera.lookat.y,
					this.camera.lookat.z, 0), cameraUp = vec4.fromValues(
					this.camera.up.x, this.camera.up.y, this.camera.up.z, 0);
			if (this.onCameraHandlers !== null) {
				for (var h = 0; h < this.onCameraHandlers.length; h++) {
					this.onCameraHandlers[h].call(this, this._cameraPosition,
							cameraLookat, cameraUp)
				}
			}
			mat4.lookAt(camera, this._cameraPosition, cameraLookat, cameraUp);
			var perspective = mat4.create();
			mat4.perspective(perspective, -this.perspective.fov
							* Phoria.RADIANS, this.perspective.aspect,
					this.perspective.near, this.perspective.far);
			this._perspectiveScale = (256 - this.perspective.fov) / 16;
			var renderlist = [], lights = [], entityById = {};
			var fnProcessEntities = function processEntities(entities,
					matParent) {
				for (var n = 0, obj, len, isIdentity; n < entities.length; n++) {
					obj = entities[n];
					if (obj.disabled) {
						continue
					}
					if (obj.id) {
						entityById[obj.id] = obj
					}
					if (obj.onBeforeSceneHandlers !== null) {
						for (var h = 0; h < obj.onBeforeSceneHandlers.length; h++) {
							obj.onBeforeSceneHandlers[h].call(obj, this, time)
						}
					}
					var matLocal = obj.matrix;
					if (matParent) {
						matLocal = matLocal ? mat4.multiply(mat4.create(),
								matLocal, matParent) : matParent
					}
					if (obj.onSceneHandlers !== null) {
						for (var h = 0; h < obj.onSceneHandlers.length; h++) {
							obj.onSceneHandlers[h].call(obj, this, matLocal,
									time)
						}
					}
					if (obj instanceof Phoria.BaseLight) {
						lights.push(obj)
					} else {
						if (obj instanceof Phoria.Entity) {
							len = obj.points.length;
							obj.initCoordinateBuffers();
							var objClip = 0, clipOffset = 0;
							if (obj.style.drawmode === "point") {
								if (obj.style.linescale === 0) {
									clipOffset = obj.style.linewidth * 0.5
								} else {
									clipOffset = (obj.style.linewidth * obj.style.linescale)
											/ this._perspectiveScale * 0.5
								}
							}
							for (var v = 0, verts, vec, w, avz = 0; v < len; v++) {
								verts = obj.points[v];
								vec = vec4.set(obj._worldcoords[v], verts.x,
										verts.y, verts.z, 1);
								if (matLocal) {
									vec4.transformMat4(obj._worldcoords[v],
											vec, matLocal)
								}
								vec4.transformMat4(obj._cameracoords[v],
										obj._worldcoords[v], camera);
								vec4.transformMat4(obj._coords[v],
										obj._cameracoords[v], perspective);
								vec = obj._coords[v];
								w = vec[3];
								if (w === 0) {
									w = Phoria.EPSILON
								}
								objClip += (obj._clip[v] = (vec[0] > w
										+ clipOffset
										|| vec[0] < -w - clipOffset
										|| vec[1] > w + clipOffset
										|| vec[1] < -w - clipOffset
										|| vec[2] > w || vec[2] < -w) ? 1 : 0);
								vec[0] /= w;
								vec[1] /= w;
								vec[0] = vpw * vec[0] + vpx + vpw;
								vec[1] = vph * vec[1] + vpy + vph;
								avz += vec[2]
							}
							obj._averagez = len > 1 ? avz / len : avz;
							if (objClip !== len) {
								switch (obj.style.geometrysortmode) {
									default :
									case "automatic" :
									case "sorted" :
										if (obj.style.geometrysortmode === "sorted"
												|| obj.style.drawmode === "solid"
												|| obj.style.shademode === "lightsource") {
											switch (obj.style.drawmode) {
												case "solid" :
													Phoria.Util.sortPolygons(
															obj.polygons,
															obj._cameracoords);
													break;
												case "wireframe" :
													Phoria.Util.sortEdges(
															obj.edges,
															obj._cameracoords);
													break;
												case "point" :
													Phoria.Util.sortPoints(
															obj._coords,
															obj._worldcoords);
													break
											}
										}
										break
								}
								if (obj.style.drawmode === "solid"
										&& obj.polygons.length !== 0) {
									var matNormals = mat4
											.invert(mat4.create(), matLocal
															? matLocal
															: mat4.create());
									mat4.transpose(matNormals, matNormals);
									switch (obj.style.shademode) {
										case "lightsource" :
											for (var i = 0, normal, wnormal; i < obj.polygons.length; i++) {
												if (!obj.polygons[i]._worldnormal) {
													obj.polygons[i]._worldnormal = vec4
															.create()
												}
												normal = obj.polygons[i].normal;
												wnormal = obj.polygons[i]._worldnormal;
												vec3.transformMat4(wnormal,
														normal, matNormals);
												vec3
														.normalize(wnormal,
																wnormal)
											}
											break
									}
								}
								renderlist.push(obj)
							}
						}
					}
					if (obj.children && obj.children.length !== 0) {
						fnProcessEntities.call(this, obj.children, matLocal)
					}
				}
			};
			fnProcessEntities.call(this, this.graph, null);
			this.renderlist = renderlist;
			this.lights = lights;
			this._entities = entityById;
			for (var t = 0, len = this.triggerHandlers.length; t < len; t++) {
				if (this.triggerHandlers[t].trigger.call(this,
						this._cameraPosition, cameraLookat, cameraUp)) {
					this.triggerHandlers.splice(t, 1);
					len--
				}
			}
		}
	}
})();
(function() {
	Phoria.BaseEntity = function() {
		this.matrix = mat4.create();
		this.children = [];
		return this
	};
	Phoria.BaseEntity.create = function create(desc, e) {
		if (!e) {
			e = new Phoria.BaseEntity()
		}
		if (desc.id) {
			e.id = desc.id
		}
		if (desc.matrix) {
			e.matrix = desc.matrix
		}
		if (desc.children) {
			e.children = desc.children
		}
		if (desc.onBeforeScene) {
			e.onBeforeScene(desc.onBeforeScene)
		}
		if (desc.onScene) {
			e.onScene(desc.onScene)
		}
		if (desc.disabled !== undefined) {
			e.disabled = desc.disabled
		}
		return e
	};
	Phoria.BaseEntity.prototype = {
		id : null,
		children : null,
		matrix : null,
		disabled : false,
		onBeforeSceneHandlers : null,
		onSceneHandlers : null,
		onBeforeScene : function onBeforeScene(fn) {
			if (this.onBeforeSceneHandlers === null) {
				this.onBeforeSceneHandlers = []
			}
			this.onBeforeSceneHandlers = this.onBeforeSceneHandlers.concat(fn)
		},
		onScene : function onScene(fn) {
			if (this.onSceneHandlers === null) {
				this.onSceneHandlers = []
			}
			this.onSceneHandlers = this.onSceneHandlers.concat(fn)
		},
		identity : function identity() {
			mat4.identity(this.matrix);
			return this
		},
		invert : function invert() {
			mat4.invert(this.matrix, this.matrix);
			return this
		},
		multiply : function multiply(m) {
			mat4.multiply(this.matrix, this.matrix, m);
			return this
		},
		scale : function scale(vec) {
			mat4.scale(this.matrix, this.matrix, vec);
			return this
		},
		scaleN : function scale(n) {
			mat4.scale(this.matrix, this.matrix, vec3.fromValues(n, n, n));
			return this
		},
		rotate : function rotate(rad, axis) {
			mat4.rotate(this.matrix, this.matrix, rad, axis);
			return this
		},
		rotateX : function rotateX(rad) {
			mat4.rotateX(this.matrix, this.matrix, rad);
			return this
		},
		rotateY : function rotateY(rad) {
			mat4.rotateY(this.matrix, this.matrix, rad);
			return this
		},
		rotateZ : function rotateZ(rad) {
			mat4.rotateZ(this.matrix, this.matrix, rad);
			return this
		},
		rotateYPR : function rotateYPR(yaw, pitch, roll) {
			var m = mat4.fromYPR(yaw, pitch, roll);
			mat4.multiply(this.matrix, this.matrix, m)
		},
		translate : function translate(vec) {
			mat4.translate(this.matrix, this.matrix, vec);
			return this
		},
		translateX : function translateX(n) {
			mat4.translate(this.matrix, this.matrix, vec3.fromValues(n, 0, 0));
			return this
		},
		translateY : function translateY(n) {
			mat4.translate(this.matrix, this.matrix, vec3.fromValues(0, n, 0));
			return this
		},
		translateZ : function translateZ(n) {
			mat4.translate(this.matrix, this.matrix, vec3.fromValues(0, 0, n));
			return this
		},
		determinant : function determinant() {
			return mat4.determinant(this.matrix)
		},
		transpose : function transpose() {
			mat4.transpose(this.matrix, this.matrix);
			return this
		}
	}
})();
Phoria.CLIP_ARRAY_TYPE = (typeof Uint32Array !== "undefined")
		? Uint32Array
		: Array;
(function() {
	Phoria.Entity = function() {
		Phoria.Entity.superclass.constructor.call(this);
		this.points = [];
		this.edges = [];
		this.polygons = [];
		this.textures = [];
		this.style = Phoria.Entity.createStyle();
		return this
	};
	Phoria.Entity.create = function create(desc, e) {
		if (!e) {
			e = new Phoria.Entity()
		}
		Phoria.BaseEntity.create(desc, e);
		if (desc.points) {
			e.points = desc.points
		}
		if (desc.polygons) {
			e.polygons = desc.polygons
		}
		if (desc.edges) {
			e.edges = desc.edges
		}
		if (desc.style) {
			Phoria.Util.combine(e.style, desc.style)
		}
		if (desc.onRender) {
			e.onRender(desc.onRender)
		}
		e.generatePolygonNormals();
		return e
	};
	Phoria.Entity.createStyle = function createStyle(s) {
		var style = {
			color : [128, 128, 128],
			diffuse : 1,
			specular : 0,
			drawmode : "solid",
			shademode : "lightsource",
			fillmode : "inflate",
			objectsortmode : "sorted",
			geometrysortmode : "automatic",
			linewidth : 1,
			linescale : 0,
			opacity : 1,
			doublesided : false
		};
		if (s) {
			Phoria.Util.combine(style, s)
		}
		return style
	};
	Phoria.Util.extend(Phoria.Entity, Phoria.BaseEntity, {
		points : null,
		edges : null,
		polygons : null,
		style : null,
		textures : null,
		onRenderHandlers : null,
		_worldcoords : null,
		_cameracoords : null,
		_coords : null,
		_clip : null,
		_averagez : 0,
		_sorted : true,
		onRender : function onRender(fn) {
			if (this.onRenderHandlers === null) {
				this.onRenderHandlers = []
			}
			this.onRenderHandlers = this.onRenderHandlers.concat(fn)
		},
		generatePolygonNormals : function generatePolygonNormals() {
			if (this.polygons) {
				var points = this.points, polygons = this.polygons;
				for (var i = 0, vertices, x1, y1, z1, x2, y2, z2; i < polygons.length; i++) {
					vertices = polygons[i].vertices;
					x1 = points[vertices[1]].x - points[vertices[0]].x;
					y1 = points[vertices[1]].y - points[vertices[0]].y;
					z1 = points[vertices[1]].z - points[vertices[0]].z;
					x2 = points[vertices[2]].x - points[vertices[0]].x;
					y2 = points[vertices[2]].y - points[vertices[0]].y;
					z2 = points[vertices[2]].z - points[vertices[0]].z;
					polygons[i].normal = Phoria.Util.calcNormalVector(x1, y1,
							z1, x2, y2, z2)
				}
			}
		},
		initCoordinateBuffers : function initCoordinateBuffers() {
			var len = this.points.length;
			if (this._worldcoords === null || this._worldcoords.length < len) {
				this._worldcoords = new Array(len);
				for (var i = 0; i < len; i++) {
					this._worldcoords[i] = vec4.create()
				}
			}
			if (this._cameracoords === null || this._cameracoords.length < len) {
				this._cameracoords = new Array(len);
				for (var i = 0; i < len; i++) {
					this._cameracoords[i] = vec4.create()
				}
			}
			if (this._coords === null || this._coords.length < len) {
				this._coords = new Array(len);
				for (var i = 0; i < len; i++) {
					this._coords[i] = vec4.create()
				}
			}
			if (this._clip === null || this._clip.length < len) {
				this._clip = new Phoria.CLIP_ARRAY_TYPE(len)
			}
		},
		getScreenBounds : function getScreenBounds() {
			var minx = 10000, miny = 10000, maxx = -10000, maxy = -10000;
			for (var i = 0, p; i < this._coords.length; i++) {
				p = this._coords[i];
				if (p[0] < minx) {
					minx = p[0]
				}
				if (p[0] > maxx) {
					maxx = p[0]
				}
				if (p[1] < miny) {
					miny = p[1]
				}
				if (p[1] > maxy) {
					maxy = p[1]
				}
			}
			return {
				minx : minx,
				miny : miny,
				maxx : maxx,
				maxy : maxy
			}
		},
		getWorldBounds : function getWorldBounds() {
			var minx = 10000, miny = 10000, minz = 10000, maxx = -10000, maxy = -10000, maxz = -10000;
			for (var i = 0, p; i < this._worldcoords.length; i++) {
				p = this._worldcoords[i];
				if (p[0] < minx) {
					minx = p[0]
				}
				if (p[0] > maxx) {
					maxx = p[0]
				}
				if (p[1] < miny) {
					miny = p[1]
				}
				if (p[1] > maxy) {
					maxy = p[1]
				}
				if (p[2] < minz) {
					minz = p[2]
				}
				if (p[2] > maxz) {
					maxz = p[2]
				}
			}
			return {
				minx : minx,
				miny : miny,
				maxx : maxx,
				maxy : maxy,
				minz : minz,
				maxz : maxz
			}
		}
	});
	Phoria.Entity.debug = function debug(entity, config) {
		var id = "Phoria.Debug" + (entity.id ? (" " + entity.id) : "");
		var debugEntity = null;
		for (var i = 0; i < entity.children.length; i++) {
			if (entity.children[i].id === id) {
				debugEntity = entity.children[i];
				break
			}
		}
		if (debugEntity === null) {
			debugEntity = new Phoria.Entity();
			debugEntity.id = id;
			debugEntity.points = [{
						x : 0,
						y : 0,
						z : 0
					}];
			debugEntity.style = {
				drawmode : "point",
				shademode : "callback",
				geometrysortmode : "none",
				objectsortmode : "front"
			};
			debugEntity.config = {};
			debugEntity.onRender(function(ctx, x, y) {
						ctx.fillStyle = "#333";
						ctx.font = "14pt Helvetica";
						var textPos = y;
						if (this.config.showId) {
							ctx
									.fillText(
											entity.id
													? entity.id
													: "unknown - set Entity 'id' property",
											x, textPos);
							textPos += 16
						}
						if (this.config.showPosition) {
							var p = entity.worldposition
									? entity.worldposition
									: debugEntity._worldcoords[0];
							ctx
									.fillText("{x:" + p[0].toFixed(2) + ", y:"
													+ p[1].toFixed(2) + ", z:"
													+ p[2].toFixed(2) + "}", x,
											textPos)
						}
					});
			entity.children.push(debugEntity);
			var fnCreateAxis = function(letter, vector, color) {
				var axisEntity = new Phoria.Entity();
				axisEntity.points = [{
							x : 0,
							y : 0,
							z : 0
						}, {
							x : 2 * vector[0],
							y : 2 * vector[1],
							z : 2 * vector[2]
						}];
				axisEntity.edges = [{
							a : 0,
							b : 1
						}];
				axisEntity.style = {
					drawmode : "wireframe",
					shademode : "plain",
					geometrysortmode : "none",
					objectsortmode : "front",
					linewidth : 2,
					color : color
				};
				axisEntity.disabled = true;
				return axisEntity
			};
			debugEntity.children.push(fnCreateAxis("X", vec3
							.fromValues(1, 0, 0), [255, 0, 0]));
			debugEntity.children.push(fnCreateAxis("Y", vec3
							.fromValues(0, 1, 0), [0, 255, 0]));
			debugEntity.children.push(fnCreateAxis("Z", vec3
							.fromValues(0, 0, 1), [0, 0, 255]))
		}
		Phoria.Util.combine(debugEntity.config, config);
		for (var i = 0; i < debugEntity.children.length; i++) {
			debugEntity.children[i].disabled = !debugEntity.config.showAxis
		}
	}
})();
(function() {
	Phoria.PositionalAspect = {};
	Phoria.PositionalAspect.prototype = {
		position : null,
		worldposition : null,
		updatePosition : function updatePosition(matLocal) {
			var vec = vec4.fromXYZ(this.position, 1);
			vec4.transformMat4(vec, vec, matLocal);
			this.worldposition = vec
		}
	}
})();
(function() {
	Phoria.PhysicsEntity = function() {
		Phoria.PhysicsEntity.superclass.constructor.call(this);
		this.velocity = {
			x : 0,
			y : 0,
			z : 0
		};
		this.position = {
			x : 0,
			y : 0,
			z : 0
		};
		this._force = {
			x : 0,
			y : 0,
			z : 0
		};
		this._acceleration = null;
		this.gravity = true;
		this.onBeforeScene(this.applyPhysics);
		this.onScene(this.transformToScene);
		return this
	};
	Phoria.PhysicsEntity.create = function create(desc) {
		var e = new Phoria.PhysicsEntity();
		Phoria.Entity.create(desc, e);
		if (desc.velocity) {
			e.velocity = desc.velocity
		}
		if (desc.position) {
			e.position = desc.position
		}
		if (desc.force) {
			e._force = desc.force
		}
		if (desc.gravity !== undefined) {
			e.gravity = desc.gravity
		}
		return e
	};
	Phoria.Util.extend(Phoria.PhysicsEntity, Phoria.Entity, {
				velocity : null,
				gravity : false,
				_force : null,
				_acceleration : null,
				impulse : function impulse(f) {
					this._acceleration = f
				},
				force : function force(f) {
					this._force = f
				},
				applyPhysics : function applyPhysics(scene) {
					var time = 1000 / 60 / 1000;
					var tt = time * time;
					if (this._acceleration) {
						this.velocity.x += (this._acceleration.x * tt);
						this.velocity.y += (this._acceleration.y * tt);
						this.velocity.z += (this._acceleration.z * tt);
						this._acceleration = null
					}
					if (this._force) {
						this.velocity.x += (this._force.x * tt);
						this.velocity.y += (this._force.y * tt);
						this.velocity.z += (this._force.z * tt)
					}
					if (this.gravity) {
						this.velocity.x += (Phoria.PhysicsEntity.GRAVITY.x * tt);
						this.velocity.y += (Phoria.PhysicsEntity.GRAVITY.y * tt);
						this.velocity.z += (Phoria.PhysicsEntity.GRAVITY.z * tt)
					}
					this.translate(vec3.fromXYZ(this.velocity))
				},
				transformToScene : function transformToScene(scene, matLocal) {
					this.updatePosition(matLocal)
				}
			});
	Phoria.Util.augment(Phoria.PhysicsEntity, Phoria.PositionalAspect)
})();
Phoria.PhysicsEntity.GRAVITY = {
	x : 0,
	y : -9.8,
	z : 0
};
(function() {
	Phoria.EmitterEntity = function() {
		Phoria.EmitterEntity.superclass.constructor.call(this);
		this.position = {
			x : 0,
			y : 0,
			z : 0
		};
		this.positionRnd = {
			x : 0,
			y : 0,
			z : 0
		};
		this.velocity = {
			x : 0,
			y : 1,
			z : 0
		};
		this.velocityRnd = {
			x : 0,
			y : 0,
			z : 0
		};
		this.maximum = 1000;
		this.gravity = true;
		var style = Phoria.Entity.createStyle();
		style.drawmode = "point";
		style.shademode = "plain";
		style.geometrysortmode = "none";
		style.linewidth = 5;
		style.linescale = 2;
		this.style = style;
		this.textures = [];
		this._lastEmitTime = Date.now();
		this.onScene(this.emitParticles);
		return this
	};
	Phoria.EmitterEntity.create = function create(desc) {
		var e = new Phoria.EmitterEntity();
		Phoria.BaseEntity.create(desc, e);
		if (desc.position) {
			e.position = desc.position
		}
		if (desc.positionRnd) {
			e.positionRnd = desc.positionRnd
		}
		if (desc.rate) {
			e.rate = desc.rate
		}
		if (desc.maximum) {
			e.maximum = desc.maximum
		}
		if (desc.velocity) {
			e.velocity = desc.velocity
		}
		if (desc.velocityRnd) {
			e.velocityRnd = desc.velocityRnd
		}
		if (desc.lifetime) {
			e.lifetime = desc.lifetime
		}
		if (desc.lifetimeRnd) {
			e.lifetimeRnd = desc.lifetimeRnd
		}
		if (desc.gravity !== undefined) {
			e.gravity = desc.gravity
		}
		if (desc.style) {
			Phoria.Util.combine(e.style, desc.style)
		}
		if (desc.onParticle) {
			e.onParticle(desc.onParticle)
		}
		return e
	};
	Phoria.Util.extend(Phoria.EmitterEntity, Phoria.BaseEntity, {
		style : null,
		rate : 0,
		maximum : 0,
		velocity : null,
		velocityRnd : null,
		lifetime : 0,
		lifetimeRnd : 0,
		gravity : false,
		_lastEmitTime : 0,
		onParticleHandlers : null,
		onParticle : function onParticle(fn) {
			if (this.onParticleHandlers === null) {
				this.onParticleHandlers = []
			}
			this.onParticleHandlers = this.onParticleHandlers.concat(fn)
		},
		emitParticles : function emitParticles(scene, matLocal, time) {
			this.updatePosition(matLocal);
			var now = Date.now();
			for (var i = 0, p; i < this.children.length; i++) {
				p = this.children[i];
				if (p._gravetime && now > p._gravetime) {
					this.children.splice(i, 1)
				}
			}
			var since = now - this._lastEmitTime;
			var count = Math.floor((this.rate / 1000) * since);
			if (count > 0) {
				for (var c = 0; c < count
						&& (this.maximum === 0 || this.children.length < this.maximum); c++) {
					var pos = {
						x : this.position.x,
						y : this.position.y,
						z : this.position.z
					};
					pos.x += (Math.random() * this.positionRnd.x)
							- (this.positionRnd.x * 0.5);
					pos.y += (Math.random() * this.positionRnd.y)
							- (this.positionRnd.y * 0.5);
					pos.z += (Math.random() * this.positionRnd.z)
							- (this.positionRnd.z * 0.5);
					var vel = {
						x : this.velocity.x,
						y : this.velocity.y,
						z : this.velocity.z
					};
					vel.x += (Math.random() * this.velocityRnd.x)
							- (this.velocityRnd.x * 0.5);
					vel.y += (Math.random() * this.velocityRnd.y)
							- (this.velocityRnd.y * 0.5);
					vel.z += (Math.random() * this.velocityRnd.z)
							- (this.velocityRnd.z * 0.5);
					var particle = new Phoria.PhysicsEntity();
					particle.position = pos;
					particle.points = [pos];
					particle.velocity = vel;
					particle.gravity = this.gravity;
					particle.style = this.style;
					particle.textures = this.textures;
					if (this.lifetime !== 0) {
						particle._gravetime = Math.floor(now + this.lifetime
								+ (this.lifetimeRnd * Math.random())
								- this.lifetimeRnd * 0.5)
					}
					if (this.onParticleHandlers !== null) {
						for (var h = 0; h < this.onParticleHandlers.length; h++) {
							this.onParticleHandlers[h].call(this, particle)
						}
					}
					this.children.push(particle)
				}
				this._lastEmitTime = now
			}
		}
	});
	Phoria.Util.augment(Phoria.EmitterEntity, Phoria.PositionalAspect)
})();
(function() {
	Phoria.BaseLight = function() {
		Phoria.BaseLight.superclass.constructor.call(this);
		this.color = [1, 1, 1];
		this.intensity = 1;
		return this
	};
	Phoria.Util.extend(Phoria.BaseLight, Phoria.BaseEntity, {
				color : null,
				intensity : 0
			})
})();
(function() {
	Phoria.DistantLight = function() {
		Phoria.DistantLight.superclass.constructor.call(this);
		this.direction = {
			x : 0,
			y : 0,
			z : 1
		};
		this.onScene(this.transformToScene);
		return this
	};
	Phoria.DistantLight.create = function create(desc) {
		var e = new Phoria.DistantLight();
		Phoria.BaseEntity.create(desc, e);
		if (desc.color) {
			e.color = desc.color
		}
		if (desc.intensity) {
			e.intensity = desc.intensity
		}
		if (desc.direction) {
			e.direction = vec3.toXYZ(vec3.normalize(e.direction, vec3
							.fromXYZ(desc.direction)))
		}
		return e
	};
	Phoria.Util.extend(Phoria.DistantLight, Phoria.BaseLight, {
				direction : null,
				worlddirection : null,
				transformToScene : function transformToScene() {
					this.worlddirection = vec3.fromValues(-this.direction.x,
							-this.direction.y, -this.direction.z)
				}
			})
})();
(function() {
	Phoria.PointLight = function() {
		Phoria.PointLight.superclass.constructor.call(this);
		this.position = {
			x : 0,
			y : 0,
			z : -1
		};
		this.attenuation = 0.1;
		this.attenuationFactor = "linear";
		this.onScene(this.transformToScene);
		return this
	};
	Phoria.PointLight.create = function create(desc) {
		var e = new Phoria.PointLight();
		Phoria.BaseEntity.create(desc, e);
		if (desc.color) {
			e.color = desc.color
		}
		if (desc.intensity) {
			e.intensity = desc.intensity
		}
		if (desc.position) {
			e.position = desc.position
		}
		if (desc.attenuation) {
			e.attenuation = desc.attenuation
		}
		if (desc.attenuationFactor) {
			e.attenuationFactor = desc.attenuationFactor
		}
		return e
	};
	Phoria.Util.extend(Phoria.PointLight, Phoria.BaseLight, {
				attenuation : 0,
				attenuationFactor : null,
				transformToScene : function transformToScene(scene, matLocal,
						time) {
					this.updatePosition(matLocal)
				}
			});
	Phoria.Util.augment(Phoria.PointLight, Phoria.PositionalAspect)
})();
(function() {
	Phoria.Renderer = function() {
	};
	Phoria.Renderer.prototype = {
		sort : true,
		sortObjects : function sortObjects(scene) {
			if (this.sort) {
				for (var n = 0, obj; n < scene.renderlist.length; n++) {
					obj = scene.renderlist[n];
					switch (obj.style.objectsortmode) {
						case "sorted" :
							break;
						case "front" :
							obj._averagez = Number.MIN_VALUE;
							break;
						case "back" :
						default :
							obj._averagez = Number.MAX_VALUE;
							break
					}
				}
				scene.renderlist.sort(function sortObjectsZ(a, b) {
							return (a._averagez < b._averagez ? 1 : -1)
						})
			}
		},
		calcNormalBrightness : function calcNormalBrightness(position, normal,
				scene, obj) {
			var rgb = [0, 0, 0], lights = scene.lights;
			for (var e = 0, light, brightness; e < lights.length; e++) {
				light = lights[e];
				if (light instanceof Phoria.DistantLight) {
					var dotVP = vec3.dot(normal, light.worlddirection);
					if (dotVP <= 0) {
						continue
					}
					brightness = dotVP * light.intensity * obj.style.diffuse
				} else {
					if (light instanceof Phoria.PointLight) {
						var vecToLight = vec3.subtract(vec3.create(), position,
								light.worldposition), distance = vec3
								.length(vecToLight), attenuation;
						vec3.normalize(vecToLight, vecToLight);
						var dotVP = vec3.dot(normal, vec3.negate(vecToLight,
										vecToLight));
						if (dotVP <= 0) {
							continue
						}
						switch (light.attenuationFactor) {
							default :
							case "none" :
								attenuation = light.attenuation;
								break;
							case "linear" :
								attenuation = light.attenuation * distance;
								break;
							case "squared" :
								attenuation = light.attenuation * distance
										* distance;
								break
						}
						if (obj.style.specular !== 0) {
							var halfV = vec3.add(vec3.create(), vecToLight,
									scene._cameraPosition), dotHV = vec3.dot(
									normal, vec3.normalize(halfV, halfV)), pf = Math
									.pow(dotHV, obj.style.specular)
									* light.intensity / attenuation;
							rgb[0] += pf * light.color[0];
							rgb[1] += pf * light.color[1];
							rgb[2] += pf * light.color[2]
						}
						brightness = obj.style.diffuse * dotVP
								* light.intensity / attenuation
					}
				}
				rgb[0] += brightness * light.color[0];
				rgb[1] += brightness * light.color[1];
				rgb[2] += brightness * light.color[2]
			}
			return rgb
		},
		calcPositionBrightness : function calcPositionBrightness(position,
				lights) {
			var rgb = [0, 0, 0];
			for (var e = 0, light, brightness; e < lights.length; e++) {
				light = lights[e];
				if (light instanceof Phoria.DistantLight) {
					brightness = light.intensity
				} else {
					if (light instanceof Phoria.PointLight) {
						var vecToLight = vec3.subtract(vec3.create(), position,
								light.worldposition), distance = vec3
								.length(vecToLight), attenuation;
						vec3.normalize(vecToLight, vecToLight);
						switch (light.attenuationFactor) {
							case "linear" :
								attenuation = light.attenuation * distance;
								break;
							case "squared" :
								attenuation = light.attenuation * distance
										* distance;
								break;
							default :
							case "none" :
								attenuation = light.attenuation;
								break
						}
						brightness = light.intensity / (attenuation * 2)
					}
				}
				rgb[0] += brightness * light.color[0];
				rgb[1] += brightness * light.color[1];
				rgb[2] += brightness * light.color[2]
			}
			return rgb
		},
		inflatePolygon : function inflatePolygon(vertices, coords, pixels) {
			pixels = pixels || 0.5;
			var inflatedVertices = new Array(vertices.length);
			for (var i = 0; i < vertices.length; i++) {
				inflatedVertices[i] = [coords[vertices[i]][0],
						coords[vertices[i]][1]]
			}
			for (var i = 0, j = vertices.length, k, x1, y1, x2, y2, dx, dy, len; i < j; i++) {
				k = (i < j - 1) ? (i + 1) : 0;
				x1 = inflatedVertices[i][0];
				y1 = inflatedVertices[i][1];
				x2 = inflatedVertices[k][0];
				y2 = inflatedVertices[k][1];
				var x = x2 - x1, y = y2 - y1, det = x * x + y * y, idet;
				if (det === 0) {
					det === Phoria.EPSILON
				}
				idet = pixels / Math.sqrt(det);
				x *= idet;
				y *= idet;
				inflatedVertices[i][0] -= x;
				inflatedVertices[i][1] -= y;
				inflatedVertices[k][0] += x;
				inflatedVertices[k][1] += y
			}
			return inflatedVertices
		},
		inflatePolygonFull : function inflatePolygonFull(vertices, coords,
				pixels) {
			pixels = pixels || 0.5;
			var pedges = [], inflatedVertices = new Array(vertices.length);
			for (var i = 0, j = vertices.length, x1, y1, x2, y2, dx, dy, len; i < j; i++) {
				x1 = coords[vertices[i]][0];
				y1 = coords[vertices[i]][1];
				if (i < j - 1) {
					x2 = coords[vertices[i + 1]][0];
					y2 = coords[vertices[i + 1]][1]
				} else {
					x2 = coords[vertices[0]][0];
					y2 = coords[vertices[0]][1]
				}
				dx = y2 - y1;
				dy = -(x2 - x1);
				len = Math.sqrt(dx * dx + dy * dy);
				dx /= len;
				dy /= len;
				dx *= pixels;
				dy *= pixels;
				pedges.push({
							x : x1 + dx,
							y : y1 + dy
						});
				pedges.push({
							x : x2 + dx,
							y : y2 + dy
						})
			}
			for (var i = 0, j = vertices.length, vec; i < j; i++) {
				if (i === 0) {
					vec = this.intersection(pedges[(j - 1) * 2], pedges[(j - 1)
									* 2 + 1], pedges[0], pedges[1])
				} else {
					vec = this.intersection(pedges[(i - 1) * 2], pedges[(i - 1)
									* 2 + 1], pedges[i * 2], pedges[i * 2 + 1])
				}
				if (Math.abs(vec[0] - coords[vertices[i]][0]) > 1.5
						|| Math.abs(vec[1] - coords[vertices[i]][1]) > 1.5) {
					vec[0] = coords[vertices[i]][0];
					vec[1] = coords[vertices[i]][1]
				}
				inflatedVertices[i] = vec
			}
			return inflatedVertices
		},
		intersection : function intersection(line0v0, line0v1, line1v0, line1v1) {
			var a1 = line0v1.x - line0v0.x, b1 = line1v0.x - line1v1.x, c1 = line1v0.x
					- line0v0.x, a2 = line0v1.y - line0v0.y, b2 = line1v0.y
					- line1v1.y, c2 = line1v0.y - line0v0.y, t = (b1 * c2 - b2
					* c1)
					/ (a2 * b1 - a1 * b2);
			return [line0v0.x + t * (line0v1.x - line0v0.x),
					line0v0.y + t * (line0v1.y - line0v0.y)]
		}
	}
})();
(function() {
	Phoria.CanvasRenderer = function(canvas) {
		Phoria.CanvasRenderer.superclass.constructor.call(this);
		this.canvas = canvas;
		this.ctx = canvas.getContext("2d");
		return this
	};
	Phoria.Util.extend(Phoria.CanvasRenderer, Phoria.Renderer, {
		canvas : null,
		ctx : null,
		render : function render(scene, fnClear) {
			this.sortObjects(scene);
			var ctx = this.ctx;
			if (!fnClear) {
				ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
			} else {
				fnClear.call(this, ctx)
			}
			for (var n = 0, obj; n < scene.renderlist.length; n++) {
				obj = scene.renderlist[n];
				ctx.save();
				if (obj.style.compositeOperation) {
					ctx.globalCompositeOperation = obj.style.compositeOperation
				}
				switch (obj.style.drawmode) {
					case "solid" :
						if (obj.style.fillmode === "fillstroke"
								|| obj.style.fillmode === "hiddenline") {
							ctx.lineWidth = 1
						}
						for (var i = 0; i < obj.polygons.length; i++) {
							this
									.renderPolygon(ctx, obj, scene,
											obj.polygons[i])
						}
						break;
					case "wireframe" :
						ctx.lineWidth = obj.style.linewidth;
						ctx.globalAlpha = obj.style.opacity;
						if (obj.style.shademode === "plain") {
							ctx.strokeStyle = "rgb(" + obj.style.color[0] + ","
									+ obj.style.color[1] + ","
									+ obj.style.color[2] + ")";
							ctx.beginPath();
							for (var i = 0; i < obj.edges.length; i++) {
								this.renderEdge(ctx, obj, scene, obj.edges[i])
							}
							ctx.closePath();
							ctx.stroke()
						} else {
							for (var i = 0; i < obj.edges.length; i++) {
								this.renderEdge(ctx, obj, scene, obj.edges[i])
							}
						}
						break;
					case "point" :
						if (obj.style.shademode === "sprite"
								&& obj.style.sprite !== undefined) {
							if (!obj.textures) {
								throw new Error("Entity has shademode 'sprite' but no textures defined on parent emitter.")
							}
							if (obj.style.sprite > obj.textures.length - 1) {
								throw new Error("Entity has shademode 'sprite' index but references missing texture on parent emitter.")
							}
						}
						ctx.globalAlpha = obj.style.opacity;
						var coords = obj._coords;
						if (obj.style.shademode === "plain") {
							ctx.fillStyle = "rgb(" + obj.style.color[0] + ","
									+ obj.style.color[1] + ","
									+ obj.style.color[2] + ")"
						}
						for (var i = 0; i < coords.length; i++) {
							this.renderPoint(ctx, obj, scene, coords[i], i)
						}
				}
				ctx.restore()
			}
		},
		renderPoint : function renderPoint(ctx, obj, scene, coord, index) {
			if (obj._clip[index]) {
				return
			}
			var w = obj.style.linewidth;
			if (obj.style.linescale !== 0) {
				w = (obj.style.linewidth * obj.style.linescale * scene._perspectiveScale)
						/ obj._coords[index][3]
			}
			switch (obj.style.shademode) {
				case "plain" :
					ctx.beginPath();
					ctx.arc(coord[0], coord[1], w, 0, Phoria.TWOPI, true);
					ctx.closePath();
					ctx.fill();
					break;
				case "sprite" :
					if (obj.style.sprite !== undefined) {
						ctx.drawImage(obj.textures[obj.style.sprite], coord[0]
										- w, coord[1] - w, w + w, w + w)
					}
					break;
				case "callback" :
					if (obj.onRenderHandlers !== null) {
						for (var h = 0; h < obj.onRenderHandlers.length; h++) {
							obj.onRenderHandlers[h].call(obj, ctx, coord[0],
									coord[1], w)
						}
					}
					break;
				case "lightsource" :
					var rgb = this.calcPositionBrightness(
							obj._worldcoords[index], scene.lights);
					ctx.fillStyle = "rgb("
							+ Math.min(Math.ceil(rgb[0] * obj.style.color[0]),
									255)
							+ ","
							+ Math.min(Math.ceil(rgb[1] * obj.style.color[1]),
									255)
							+ ","
							+ Math.min(Math.ceil(rgb[2] * obj.style.color[2]),
									255) + ")";
					ctx.beginPath();
					ctx.arc(coord[0], coord[1], w, 0, Phoria.TWOPI, true);
					ctx.closePath();
					ctx.fill();
					break
			}
		},
		renderEdge : function renderEdge(ctx, obj, scene, edge) {
			if (obj._clip[edge.a] & obj._clip[edge.b]) {
				return
			}
			var coords = obj._coords;
			if (obj.style.linescale !== 0) {
				ctx.lineWidth = ((obj.style.linewidth * obj.style.linescale) / ((obj._coords[edge.a][3] + obj._coords[edge.b][3]) * 0.5))
						* scene._perspectiveScale
			}
			if (obj.style.shademode === "lightsource") {
				var edgea = obj._worldcoords[edge.a], edgeb = obj._worldcoords[edge.b], position = vec3
						.fromValues((edgea[0] + edgeb[0]) * 0.5,
								(edgea[1] + edgeb[1]) * 0.5,
								(edgea[2] + edgeb[2]) * 0.5);
				var rgb = this.calcPositionBrightness(position, scene.lights);
				ctx.beginPath();
				ctx.strokeStyle = "rgb("
						+ Math.min(Math.ceil(rgb[0] * obj.style.color[0]), 255)
						+ ","
						+ Math.min(Math.ceil(rgb[1] * obj.style.color[1]), 255)
						+ ","
						+ Math.min(Math.ceil(rgb[2] * obj.style.color[2]), 255)
						+ ")";
				ctx.moveTo(coords[edge.a][0], coords[edge.a][1]);
				ctx.lineTo(coords[edge.b][0], coords[edge.b][1]);
				ctx.closePath();
				ctx.stroke()
			} else {
				ctx.moveTo(coords[edge.a][0], coords[edge.a][1]);
				ctx.lineTo(coords[edge.b][0], coords[edge.b][1])
			}
		},
		renderPolygon : function renderPolygon(ctx, obj, scene, poly) {
			var coords = obj._coords, clip = obj._clip, vertices = poly.vertices, color = poly.color
					? poly.color
					: obj.style.color, fillStyle = null, rgb, emit = 0, opacity = (poly.opacity
					? poly.opacity
					: obj.style.opacity);
			var clippoly = 1;
			for (var i = 0; i < vertices.length; i++) {
				clippoly &= clip[vertices[i]]
			}
			if (clippoly) {
				return
			}
			if (!obj.style.doublesided
					&& ((coords[vertices[0]][0] * coords[vertices[1]][1] - coords[vertices[1]][0]
							* coords[vertices[0]][1])
							+ (coords[vertices[1]][0] * coords[vertices[2]][1] - coords[vertices[2]][0]
									* coords[vertices[1]][1])
							+ (coords[vertices[2]][0] * coords[vertices[0]][1] - coords[vertices[0]][0]
									* coords[vertices[2]][1]) < 0)) {
				return
			}
			switch (obj.style.shademode) {
				case "plain" :
					if (obj.style.texture === undefined
							&& poly.texture === undefined) {
						fillStyle = color[0] + "," + color[1] + "," + color[2]
					}
					break;
				case "lightsource" :
					rgb = this.calcNormalBrightness(Phoria.Util
									.averagePolyVertex(vertices,
											obj._worldcoords),
							poly._worldnormal, scene, obj);
					if (poly.emit || obj.style.emit) {
						emit = poly.emit ? poly.emit : obj.style.emit
					}
					fillStyle = Math.min(Math.ceil(rgb[0] * color[0] + color[0]
									* emit), 255)
							+ ","
							+ Math.min(Math.ceil(rgb[1] * color[1] + color[1]
											* emit), 255)
							+ ","
							+ Math.min(Math.ceil(rgb[2] * color[2] + color[1]
											* emit), 255);
					break
			}
			ctx.save();
			if (obj.style.texture !== undefined || poly.texture !== undefined) {
				var bitmap = obj.textures[poly.texture !== undefined
						? poly.texture
						: obj.style.texture], tx0, ty0, tx1, ty1, tx2, ty2;
				var fRenderTriangle = function(vs, sx0, sy0, sx1, sy1, sx2, sy2) {
					var x0 = vs[0][0], y0 = vs[0][1], x1 = vs[1][0], y1 = vs[1][1], x2 = vs[2][0], y2 = vs[2][1];
					ctx.beginPath();
					ctx.moveTo(x0, y0);
					ctx.lineTo(x1, y1);
					ctx.lineTo(x2, y2);
					ctx.closePath();
					ctx.clip();
					var denom = denom = 1
							/ (sx0 * (sy2 - sy1) - sx1 * sy2 + sx2 * sy1 + (sx1 - sx2)
									* sy0);
					var m11 = -(sy0 * (x2 - x1) - sy1 * x2 + sy2 * x1 + (sy1 - sy2)
							* x0)
							* denom, m12 = (sy1 * y2 + sy0 * (y1 - y2) - sy2
							* y1 + (sy2 - sy1) * y0)
							* denom, m21 = (sx0 * (x2 - x1) - sx1 * x2 + sx2
							* x1 + (sx1 - sx2) * x0)
							* denom, m22 = -(sx1 * y2 + sx0 * (y1 - y2) - sx2
							* y1 + (sx2 - sx1) * y0)
							* denom, dx = (sx0 * (sy2 * x1 - sy1 * x2) + sy0
							* (sx1 * x2 - sx2 * x1) + (sx2 * sy1 - sx1 * sy2)
							* x0)
							* denom, dy = (sx0 * (sy2 * y1 - sy1 * y2) + sy0
							* (sx1 * y2 - sx2 * y1) + (sx2 * sy1 - sx1 * sy2)
							* y0)
							* denom;
					ctx.transform(m11, m12, m21, m22, dx, dy);
					ctx.globalAlpha = opacity;
					ctx.drawImage(bitmap, 0, 0)
				};
				if (fillStyle !== null) {
					var alpha = rgb[0] * 0.3 + rgb[1] * 0.6 + rgb[2] * 0.1;
					if (alpha > 1) {
						alpha = 1
					}
					ctx.fillStyle = "rgba(" + fillStyle + ","
							+ (1 - alpha).toFixed(3) + ")"
				}
				if (vertices.length === 3) {
					tx0 = 0, ty0 = 0, tx1 = bitmap.width, ty1 = 0, tx2 = bitmap.width, ty2 = bitmap.height;
					if (poly.uvs !== undefined) {
						tx0 = bitmap.width * poly.uvs[0];
						ty0 = bitmap.height * poly.uvs[1];
						tx1 = bitmap.width * poly.uvs[2];
						ty1 = bitmap.height * poly.uvs[3];
						tx2 = bitmap.width * poly.uvs[4];
						ty2 = bitmap.height * poly.uvs[5]
					}
					var inflatedVertices = this.inflatePolygon(vertices,
							coords, 0.5);
					fRenderTriangle.call(this, inflatedVertices, tx0, ty0, tx1,
							ty1, tx2, ty2);
					if (fillStyle !== null) {
						ctx.fill()
					}
				} else {
					if (vertices.length === 4) {
						tx0 = 0, ty0 = 0, tx1 = bitmap.width, ty1 = 0, tx2 = bitmap.width, ty2 = bitmap.height;
						if (poly.uvs !== undefined) {
							tx0 = bitmap.width * poly.uvs[0];
							ty0 = bitmap.height * poly.uvs[1];
							tx1 = bitmap.width * poly.uvs[2];
							ty1 = bitmap.height * poly.uvs[3];
							tx2 = bitmap.width * poly.uvs[4];
							ty2 = bitmap.height * poly.uvs[5]
						}
						ctx.save();
						var inflatedVertices = this.inflatePolygon(vertices
										.slice(0, 3), coords, 0.5);
						fRenderTriangle.call(this, inflatedVertices, tx0, ty0,
								tx1, ty1, tx2, ty2);
						ctx.restore();
						tx0 = bitmap.width, ty0 = bitmap.height, tx1 = 0, ty1 = bitmap.height, tx2 = 0, ty2 = 0;
						if (poly.uvs !== undefined) {
							tx0 = bitmap.width * poly.uvs[4];
							ty0 = bitmap.height * poly.uvs[5];
							tx1 = bitmap.width * poly.uvs[6];
							ty1 = bitmap.height * poly.uvs[7];
							tx2 = bitmap.width * poly.uvs[0];
							ty2 = bitmap.height * poly.uvs[1]
						}
						ctx.save();
						var v = new Array(3);
						v[0] = vertices[2];
						v[1] = vertices[3];
						v[2] = vertices[0];
						inflatedVertices = this.inflatePolygon(v, coords, 0.5);
						fRenderTriangle.call(this, inflatedVertices, tx0, ty0,
								tx1, ty1, tx2, ty2);
						ctx.restore();
						if (fillStyle !== null) {
							inflatedVertices = this.inflatePolygon(vertices,
									coords, 0.75);
							ctx.beginPath();
							ctx.moveTo(inflatedVertices[0][0],
									inflatedVertices[0][1]);
							for (var i = 1, j = inflatedVertices.length; i < j; i++) {
								ctx.lineTo(inflatedVertices[i][0],
										inflatedVertices[i][1])
							}
							ctx.closePath();
							ctx.globalAlpha = opacity;
							ctx.fill()
						}
					}
				}
			} else {
				if (obj.style.fillmode === "inflate") {
					var inflatedVertices = this.inflatePolygon(vertices,
							coords, 0.5);
					ctx.beginPath();
					ctx.moveTo(inflatedVertices[0][0], inflatedVertices[0][1]);
					for (var i = 1, j = vertices.length; i < j; i++) {
						ctx.lineTo(inflatedVertices[i][0],
								inflatedVertices[i][1])
					}
					ctx.closePath()
				} else {
					ctx.beginPath();
					ctx.moveTo(coords[vertices[0]][0], coords[vertices[0]][1]);
					for (var i = 1; i < vertices.length; i++) {
						ctx.lineTo(coords[vertices[i]][0],
								coords[vertices[i]][1])
					}
					ctx.closePath()
				}
				fillStyle = "rgba(" + fillStyle + "," + opacity + ")";
				switch (obj.style.fillmode) {
					case "fill" :
						ctx.fillStyle = fillStyle;
						ctx.fill();
						break;
					case "filltwice" :
						ctx.fillStyle = fillStyle;
						ctx.fill();
						ctx.fill();
						break;
					case "inflate" :
						ctx.fillStyle = fillStyle;
						ctx.fill();
						break;
					case "fillstroke" :
						ctx.fillStyle = fillStyle;
						ctx.fill();
						ctx.strokeStyle = fillStyle;
						ctx.stroke();
						break;
					case "hiddenline" :
						ctx.strokeStyle = fillStyle;
						ctx.stroke();
						break
				}
			}
			ctx.restore()
		}
	})
})();
(function() {
	Phoria.SoftwareRenderer = function(canvas) {
		Phoria.SoftwareRenderer.superclass.constructor.call(this);
		this.canvas = canvas;
		this.ctx = canvas.getContext("2d");
		this._imagedata = this.ctx.getImageData(0, 0, this.canvas.width,
				this.canvas.height);
		this._data = this._imagedata.data;
		return this
	};
	Phoria.Util.extend(Phoria.SoftwareRenderer, Phoria.Renderer, {
		canvas : null,
		ctx : null,
		_imagedata : null,
		_data : null,
		render : function render(scene) {
			this.sortObjects(scene);
			this.clearCanvasRect(0, 0, this.canvas.width, this.canvas.height);
			for (var n = 0, obj; n < scene.renderlist.length; n++) {
				obj = scene.renderlist[n];
				switch (obj.style.drawmode) {
					case "solid" :
						var rendercount = 0;
						for (var i = 0; i < obj.polygons.length; i++) {
							if (this.renderPolygon(null, obj, scene,
									obj.polygons[i])) {
								rendercount++
							}
						}
						break
				}
			}
			this.ctx.putImageData(this._imagedata, 0, 0, 0, 0,
					this.canvas.width, this.canvas.height)
		},
		clearCanvasRect : function clearCanvasRect(xmin, ymin, xmax, ymax) {
			var offset = (xmin + ymin * this.canvas.width - 1) * 4 + 3, linestep = (this.canvas.width - (xmax - xmin))
					* 4, data = this._data;
			for (var y = ymin; y < ymax; y++) {
				for (var x = xmin; x < xmax; x++) {
					data[offset += 4] = 0
				}
				offset += linestep
			}
		},
		renderPolygon : function renderPolygon(ctx, obj, scene, poly) {
			var coords = obj._coords, clip = obj._clip, vertices = poly.vertices, color = poly.color
					? poly.color
					: obj.style.color;
			var clippoly = 1;
			for (var i = 0; i < vertices.length; i++) {
				clippoly &= clip[vertices[i]]
			}
			if (clippoly) {
				return false
			}
			if (!obj.style.doublesided
					&& ((coords[vertices[0]][0] * coords[vertices[1]][1] - coords[vertices[1]][0]
							* coords[vertices[0]][1])
							+ (coords[vertices[1]][0] * coords[vertices[2]][1] - coords[vertices[2]][0]
									* coords[vertices[1]][1])
							+ (coords[vertices[2]][0] * coords[vertices[0]][1] - coords[vertices[0]][0]
									* coords[vertices[2]][1]) < 0)) {
				return
			}
			var rgb;
			switch (obj.style.shademode) {
				case "plain" :
					rgb = new Array(3);
					rgb[0] = color[0];
					rgb[1] = color[1];
					rgb[2] = color[2];
					break;
				case "lightsource" :
					rgb = this.calcNormalBrightness(Phoria.Util
									.averagePolyVertex(vertices,
											obj._worldcoords),
							poly._worldnormal, scene, obj);
					rgb[0] = Math.ceil(Math.min(rgb[0] * color[0], 255));
					rgb[1] = Math.ceil(Math.min(rgb[1] * color[1], 255));
					rgb[2] = Math.ceil(Math.min(rgb[2] * color[2], 255));
					break
			}
			this.drawTriangle(coords[vertices[2]][0], coords[vertices[2]][1],
					coords[vertices[1]][0], coords[vertices[1]][1],
					coords[vertices[0]][0], coords[vertices[0]][1], rgb[0],
					rgb[1], rgb[2]);
			if (vertices.length === 4) {
				this.drawTriangle(coords[vertices[0]][0],
						coords[vertices[0]][1], coords[vertices[3]][0],
						coords[vertices[3]][1], coords[vertices[2]][0],
						coords[vertices[2]][1], rgb[0], rgb[1], rgb[2])
			}
			return true
		},
		drawTriangle : function drawTriangle(x1, y1, x2, y2, x3, y3, r, g, b) {
			var x1 = Math.round(16 * x1), x2 = Math.round(16 * x2), x3 = Math
					.round(16 * x3), y1 = Math.round(16 * y1), y2 = Math
					.round(16 * y2), y3 = Math.round(16 * y3);
			var dx12 = x1 - x2, dx23 = x2 - x3, dx31 = x3 - x1, dy12 = y1 - y2, dy23 = y2
					- y3, dy31 = y3 - y1;
			var fdx12 = dx12 << 4, fdx23 = dx23 << 4, fdx31 = dx31 << 4, fdy12 = dy12 << 4, fdy23 = dy23 << 4, fdy31 = dy31 << 4;
			var canvasWidth = this.canvas.width, canvasHeight = this.canvas.height, data = this._data;
			var xmin = Math.max((Math.min(x1, x2, x3) + 15) >> 4, 0), xmax = Math
					.min((Math.max(x1, x2, x3) + 15) >> 4, canvasWidth), ymin = Math
					.max((Math.min(y1, y2, y3) + 15) >> 4, 0), ymax = Math.min(
					(Math.max(y1, y2, y3) + 15) >> 4, canvasHeight);
			if (xmax <= xmin || ymax <= ymin) {
				return
			}
			var c1 = dy12 * x1 - dx12 * y1, c2 = dy23 * x2 - dx23 * y2, c3 = dy31
					* x3 - dx31 * y3;
			if (dy12 < 0 || (dy12 == 0 && dx12 > 0)) {
				c1++
			}
			if (dy23 < 0 || (dy23 == 0 && dx23 > 0)) {
				c2++
			}
			if (dy31 < 0 || (dy31 == 0 && dx31 > 0)) {
				c3++
			}
			var cy1 = c1 + dx12 * (ymin << 4) - dy12 * (xmin << 4), cy2 = c2
					+ dx23 * (ymin << 4) - dy23 * (xmin << 4), cy3 = c3 + dx31
					* (ymin << 4) - dy31 * (xmin << 4), cx1, cx2, cx3;
			for (var y = ymin, x, offset; y < ymax; y++) {
				cx1 = cy1;
				cx2 = cy2;
				cx3 = cy3;
				for (x = xmin; x < xmax; x++) {
					if (cx1 > 0 && cx2 > 0 && cx3 > 0) {
						offset = (x + y * canvasWidth) << 2;
						data[offset] = r;
						data[offset + 1] = g;
						data[offset + 2] = b;
						data[offset + 3] = 255
					}
					cx1 -= fdy12;
					cx2 -= fdy23;
					cx3 -= fdy31
				}
				cy1 += fdx12;
				cy2 += fdx23;
				cy3 += fdx31
			}
		}
	})
})();
(function() {
	Phoria.View = {};
	Phoria.View.events = {};
	Phoria.View.addMouseEvents = function addMouseEvents(el, fnOnClick) {
		if (el.id) {
			var mouse = {
				velocityH : 0,
				velocityLastH : 0,
				positionX : 0,
				clickPositionX : 0,
				velocityV : 0,
				velocityLastV : 0,
				positionY : 0,
				clickPositionY : 0
			};
			Phoria.View.events[el.id] = mouse;
			mouse.onMouseMove = function onMouseMove(evt) {
				mouse.positionX = evt.clientX;
				mouse.velocityH = mouse.velocityLastH
						+ (mouse.positionX - mouse.clickPositionX) * 0.5;
				mouse.positionY = evt.clientY;
				mouse.velocityV = mouse.velocityLastV
						+ (mouse.positionY - mouse.clickPositionY) * 0.5
			};
			mouse.onMouseUp = function onMouseUp(evt) {
				el.removeEventListener("mousemove", mouse.onMouseMove, false)
			};
			mouse.onMouseOut = function onMouseOut(evt) {
				el.removeEventListener("mousemove", mouse.onMouseMove, false)
			};
			mouse.onMouseDown = function onMouseDown(evt) {
				evt.preventDefault();
				el.addEventListener("mousemove", mouse.onMouseMove, false);
				mouse.clickPositionX = evt.clientX;
				mouse.velocityLastH = mouse.velocityH;
				mouse.clickPositionY = evt.clientY;
				mouse.velocityLastV = mouse.velocityV
			};
			el.addEventListener("mousedown", mouse.onMouseDown, false);
			el.addEventListener("mouseup", mouse.onMouseUp, false);
			el.addEventListener("mouseout", mouse.onMouseOut, false);
			if (fnOnClick) {
				el.addEventListener("click", fnOnClick, false)
			}
			return mouse
		}
	};
	Phoria.View.removeMouseEvents = function removeMouseEvents(el, fnOnClick) {
		if (el.id) {
			var mouse = Phoria.View.events[el.id];
			if (mouse) {
				el.removeEventListener("mousemove", mouse.onMouseMove, false);
				el.removeEventListener("mousedown", mouse.onMouseDown, false);
				el.removeEventListener("mouseup", mouse.onMouseUp, false);
				el.removeEventListener("mouseout", mouse.onMouseOut, false);
				if (fnOnClick) {
					el.removeEventListener("click", fnOnClick, false)
				}
				Phoria.View.events[el.id] = null
			}
		}
	};
	Phoria.View.getMouse = function getMouse(el) {
		return Phoria.View.events[el.id]
	};
	Phoria.View.calculateClickPointAndVector = function calculateClickPointAndVector(
			scene, mousex, mousey) {
		var camLookAt = vec3.fromValues(scene.camera.lookat.x,
				scene.camera.lookat.y, scene.camera.lookat.z);
		var camOff = vec3.subtract(vec3.create(), scene._cameraPosition,
				camLookAt);
		var pixelsPerUnit = (scene.viewport.height / 2)
				/ (vec3.length(camOff) * Math
						.tan((scene.perspective.fov / 180 * Math.PI) / 2));
		var dif = vec2.fromValues(mousex - (scene.viewport.width / 2), mousey
						- (scene.viewport.height / 2));
		vec2.subtract(dif, dif, new vec2.fromValues(8, 8));
		var units = vec2.create();
		vec2.scale(units, dif, 1 / pixelsPerUnit);
		var upVector = vec3.fromValues(scene.camera.up.x, scene.camera.up.y,
				scene.camera.up.z);
		var normalVectorSide = vec3.create();
		vec3.cross(normalVectorSide, camOff, upVector);
		vec3.normalize(normalVectorSide, normalVectorSide);
		var clickPoint = vec3.scaleAndAdd(vec3.create(), camLookAt,
				normalVectorSide, units[0]);
		var normalVectorUp = vec3.create();
		vec3.cross(normalVectorUp, normalVectorSide, camOff);
		vec3.normalize(normalVectorUp, normalVectorUp);
		vec3.scale(normalVectorUp, normalVectorUp, units[1]);
		vec3.subtract(clickPoint, clickPoint, normalVectorUp);
		var camVector = vec3.add(vec3.create(), camLookAt, camOff);
		return {
			clickPoint : clickPoint,
			clickVector : vec3.subtract(vec3.create(), clickPoint, camVector)
		}
	};
	Phoria.View.getIntersectedObjects = function getIntersectedObjects(scene,
			clickPoint, clickVector) {
		var intersections = [], obj, polygonNormal, polygonPoint, polygonCoords, polygonPlaneIntersection, pointVector;
		var objects = scene.renderlist;
		for (var n = 0, obj; n < objects.length; n++) {
			obj = objects[n];
			if (obj.style.drawmode !== "solid") {
				continue
			}
			for (var m = 0; m < obj.polygons.length; m++) {
				polygonNormal = vec3.clone(obj.polygons[m]._worldnormal);
				polygonPoint = vec3
						.clone(obj._worldcoords[obj.polygons[m].vertices[0]]);
				polygonPlaneIntersection = Phoria.Util.planeLineIntersection(
						polygonNormal, polygonPoint, clickVector, clickPoint);
				if (polygonPlaneIntersection !== null) {
					if (Phoria.Util.intersectionInsidePolygon(obj.polygons[m],
							obj._worldcoords, polygonPlaneIntersection)) {
						var returnObject = {
							entity : obj,
							polygonIndex : m,
							intersectionPoint : polygonPlaneIntersection
						};
						intersections.push(returnObject)
					}
				}
			}
		}
		for (var i = 0; i < intersections.length; i++) {
			intersections[i].distance = vec3.distance(scene._cameraPosition,
					intersections[i].intersectionPoint)
		}
		for (var i = 0; i < intersections.length - 1; i++) {
			for (var j = i + 1, keepVal; j < intersections.length; j++) {
				if (intersections[i].distance >= intersections[j].distance) {
					keepVal = intersections[j];
					intersections[j] = intersections[i];
					intersections[i] = keepVal
				}
			}
		}
		return intersections
	}
})();