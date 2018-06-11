/**======================================================================*/
/** If window is Undefined*/
window !== 'undefined' ? '' : ( window = this );
( function ( global, factory ) {
	if ( typeof ( module ) === "object" && typeof ( module.exports ) === "object" ) {
		module.exports = global.document ? factory( global, true ) :
			function ( w ) {
				if ( !w.document ) {
					throw new Error( "Sow.Framework.js requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}
	/** Pass this if window is not defined yet*/
}( typeof ( window ) !== 'undefined' ? '' : this, function ( _window, noGlobal ) {
	'use strict';
	window !== 'undefined' ? '' : ( window = _window, _window = undefined );
	/** [String Format ]*/
	//String.format('{0} is dead, but {1} is alive! {0} {2}', 'ASP', 'ASP.NET');
	( typeof ( String.format ) === 'function' ? undefined : String.format = function ( format ) {
		var args = Array.prototype.slice.call( arguments, 1 );
		return format.replace( /{(\d+)}/g, function ( match, number ) {
			return typeof args[number] != 'undefined'
				? args[number]
				: match
				;
		} );
	} );
	/** [/String Format ]*/
	/** [Object Extend]*/
	( typeof ( Object.extend ) === 'function' ? undefined : ( Object.extend = function ( destination, source, copy ) {
		if ( copy ) {
			for ( let property in source )
				destination[property] = source[property];
			return destination;
		}
		for ( let property in source )
			Object.defineProperty( destination, property, Object.getOwnPropertyDescriptor( source, property ) );
		return destination;
	} ) );
	/** [/Object Extend]*/
	/** [Object clone]*/
	( typeof ( Object.clone ) === 'function' ? undefined : ( Object.clone = function ( object ) {
		return this.extend( {}, object );
	} ) );
	/** [/Object clone]*/
	/** [Object nullify]*/
	( typeof ( Object.nullify ) === 'function' ? undefined : ( Object.nullify = function ( obj ) {
		for ( let p in obj ) {
			obj[p] === undefined || obj[p] === "" ? obj[p] = null : undefined;
		}
		return obj;
	} ) );
	/** [/Object nullify]*/
	/** [Function Extend]*/
	( typeof ( Function.extend ) === 'function' ? undefined : Function.prototype.extend = function ( obj ) {
		if ( typeof ( this ) !== 'function' ) {
			console.warn( typeof ( this ) );
		}
		if ( obj === null || typeof ( obj ) !== 'object' ) {
			return this;
		}
		if ( !( obj instanceof {}.constructor ) ) {
			return this;
		}
		Object.extend( this, obj );
		return this;
	} );
	/** [/Function Extend]*/
	( typeof ( Array.prototype.indexOf ) === "function" ? undefined : ( Array.prototype.indexOf = function ( d, e ) {
		var a;
		if ( null == this ) throw new TypeError( '"this" is null or not defined' );
		var c = Object( this ),
			b = c.length >>> 0;
		if ( 0 === b ) return -1;
		a = +e || 0;
		Infinity === Math.abs( a ) && ( a = 0 );
		if ( a >= b ) return -1;
		for ( a = Math.max( 0 <= a ? a : b - Math.abs( a ), 0 ); a < b; ) {
			if ( a in c && c[a] === d ) return a;
			a++
		}
		return -1
	} ) );
	( typeof ( Array.prototype.where ) === "function" ? undefined : Array.prototype.where = function ( cb ) {
		if ( null == this ) throw new TypeError( '"this" is null or not defined' );
		let c = Object( this ),
			b = c.length >>> 0, i = 0;
		if ( b <= 0 ) return this;
		let flag = true;
		let out = [];
		do {
			if ( cb( c[i] ) ) {
				out.push( c[i] );
			}
			i++;
		} while ( i < b );
		return out;
	} );
	( typeof ( String.prototype.in ) === "function" ? undefined : ( String.prototype.in = function () {
		if ( ( arguments[0] instanceof [].constructor ) ) {
			return arguments[0].indexOf( this.toString() ) < 0 ? false : true;
		}
		return Array.prototype.slice.call( arguments, 0 ).indexOf( this.toString() ) < 0 ? false : true;
	} ) );
	( typeof ( Number.prototype.in ) === "function" ? undefined : ( Number.prototype.in = function () {
		var val = this.toString(); val = parseInt( val );
		if ( isNaN( val ) ) { return false; }
		if ( ( arguments[0] instanceof [].constructor ) ) {
			return arguments[0].indexOf( val ) < 0 ? false : true;
		}
		return Array.prototype.slice.call( arguments, 0 ).indexOf( val ) < 0 ? false : true;
	} ) );
	( typeof ( Element.prototype.removeAttribute ) === "function" ? undefined : ( Element.prototype.removeAttribute = function ( internalKey ) {
		this[internalKey] = null;
	} ) );
	( typeof ( Element.prototype.setAttribute ) === "function" ? undefined : ( Element.prototype.setAttribute = function ( internalKey ) {
		this[internalKey] = value;
	} ) );
	/** [Element] **/
	/** [Element.remove()] **/
	if ( typeof ( Element.prototype.remove ) !== 'function' ) {
		Element.prototype.remove = function () {
			if ( this.parentElement === null ) {
				console.log( 'Invalid parent element...!' );
				return this;
			}
			this.parentElement.removeChild( this );
			return this;
		}
		NodeList.prototype.remove = HTMLCollection.prototype.remove = function () {
			var i = this.length;
			typeof ( i ) !== 'number' ? ( i = 0 ) : ( i = i - 1 );
			while ( i-- ) {
				!( this[i] && this[i].parentElement ) ? '' : this[i].parentElement.removeChild( this[i] )
			}
			return this;
		}
	};
	/** [/Element.remove()] **/
	/** [Element.getAttributes] **/
	( typeof ( Element.prototype.getAttributes ) === "function" ? undefined : ( Element.prototype.getAttributes = function ( attrname ) {
		if ( !attrname ) return undefined;
		if ( typeof ( this.attributes ) !== 'object' ) return undefined;
		for ( let i = 0, ilen = this.attributes.length ; i < ilen; i++ ) {
			if ( this.attributes[i].name !== attrname ) {
				continue;
			}
			return this.attributes[i].value;
		}
		return undefined;
	} ) );
	/** [/Element.getAttributes] **/
	/** [String.prototype.repeat] **/
	( typeof ( String.prototype.repeat ) === "function" ? undefined : ( String.prototype.repeat = function ( count ) {
		if ( count < 1 ) return '';
		var result = '', pattern = this.valueOf();
		while ( count > 1 ) {
			if ( count & 1 ) result += pattern;
			count >>= 1, pattern += pattern;
		}
		return result + pattern;
	} ) );
	/** [String.prototype.repeat] **/
	/** [/Element] **/
	window.Sow = function () {
		/*Export Function*/
		return {
			define: function define( name, fun ) {
				/*if ( fun === null || typeof ( fun ) === 'undefined' )
					throw new Error( 'Invalid Function/Object defined in Sow.define instead of function. Args- ' + typeof ( fun ) );*/
				try {
					let obj = this.export( name ), exports;
					exports = typeof ( fun ) !== 'function' ? ( typeof ( fun ) === 'object' ? fun : {} ) : fun.call( this );
					fun = undefined;
					if ( !this.isPlainObject( obj ) )
						throw new Error( 'Invalid object define in Sow.define...! Object type ' + typeof ( obj ) + ';' );
					if ( !this.isPlainObject( exports ) )
						throw new Error( 'Invalid object define in Sow.define...! Exports type ' + typeof ( exports ) + ';' );
					let proto = false;
					for ( let propertyName in exports ) {
						/** Maybe we should check the prototype chain here? The current usage*/
						/** pattern is always using an object literal so we only care about own*/
						/** properties.*/
						let propertyDescriptor = Object.getOwnPropertyDescriptor( exports, propertyName );
						if ( !propertyDescriptor ) { proto = true; break; }
						Object.defineProperty( obj, propertyName, propertyDescriptor );
					}
					if ( !proto ) return this;
					let prototype = Object.getPrototypeOf( exports );
					for ( let propertyName in prototype ) {
						/** Maybe we should check the prototype chain here? The current usage*/
						/** pattern is always using an object literal so we only care about own*/
						/** properties.*/
						let propertyDescriptor = Object.getOwnPropertyDescriptor( prototype, propertyName );
						if ( propertyDescriptor ) { Object.defineProperty( obj, propertyName, propertyDescriptor ); }
					}
					return this;
				} catch ( ex ) {
					throw new Error( ex.message );
				}
				return this;
			},
			export: function ( name, obj, objectToExportTo ) {
				if ( typeof ( name ) !== 'string' )
					throw new Error( 'Invalid export name define in Sow.export...! name type ' + typeof ( name ) + ';' );
				let parts = name.split( '.' ), cur, isCheck;
				isCheck = typeof ( obj ) === 'boolean' ? true : typeof ( obj ) === 'object' ? 'obj' : false;
				cur = objectToExportTo || window;
				for ( let part; parts.length && ( part = parts.shift() ); ) {
					if ( !parts.length && isCheck === 'obj' ) {
						/** last part and we have an object; use it*/
						cur[part] = obj; continue;
					}
					if ( part in cur ) {
						cur = cur[part]; continue;
					}
					if ( isCheck ) { return false; }
					cur = cur[part] = {};
				}
				return cur;
			},
			isError: function ( obj ) {
				/// <summary>Checks whether the specified value is a Error Exception Object.</summary>
				/// <param name="value">Value to check.</param>
				/// <returns type="Boolean">true if the value is a Error Exception Object; false otherwise.</returns>
				return Object.prototype.toString.call( obj ) === "[object Error]";
			},
			isArrayLike: function ( obj ) {
				/// <summary>Checks whether the specified value is an array object.</summary>
				/// <param name="value">Value to check.</param>
				/// <returns type="Boolean">true if the value is an array object; false otherwise.</returns>
				if ( obj === null || obj === undefined ) return false;
				let result = Object.prototype.toString.call( obj );
				return result === "[object NodeList]" || result === "[object Array]" ? true : false;
			},
			isPlainObject: function ( obj ) {
				/// <summary>Tests whether a value is an object.</summary>
				/// <param name="value">Value to test.</param>
				/// <returns type="Boolean">True is the value is an object; false otherwise.</returns>
				//return typeof value === "object";
				if ( obj === null || obj === undefined ) return false;
				return obj === null ? false : typeof ( obj ) !== 'object' ? false : !obj instanceof {}.constructor ? false : true;
			},
			isDate: function () {
				/// <summary>Checks whether the specified value is a Date object.</summary>
				/// <param name="value">Value to check.</param>
				/// <returns type="Boolean">true if the value is a Date object; false otherwise.</returns>
				return Object.prototype.toString.call( value ) === "[object Date]";
			},
			JSON: function ( str ) {
				/// <summary>Parse JSON Object whether the specified value is a JSON object.</summary>
				if ( str === null ) return [];
				if ( this.isArrayLike( str ) || this.isPlainObject( str ) )
					return str;
				try {
					return JSON.parse( str );
				} catch ( e ) {
					console.log( e.message );
				}
				return [];
			},

		}
	}();
	//Sow.hook("run").add(function(a){ console.log(a); });
	//Sow.hook("run").fire(1);
	Sow.define( 'Sow', function () {
		var _event = {};
		return {
			hook: function ( name, schema ) {
				if ( typeof ( name ) === 'undefined' )
					throw new Error( "Hook Name required for assign hook!!!" );

				return {
					hook: function ( a, b ) {
						name = a; typeof ( b ) !== 'undefined' ? schema = b : undefined;
						return this;
					},
					add: function ( fn ) {
						if ( typeof ( fn ) !== 'function' )
							throw new Error( "Function object required for assign hook!!!" );
						if ( schema ) {
							if ( !_event[schema] )
								_event[schema] = {};
							if ( !_event[schema][name] )
								_event[schema][name] = [];
							_event[schema][name].push( fn );
							return this;
						}
						if ( !_event[name] ) {
							_event[name] = [];
							_event[name].push( fn );
							return this;
						}
						_event[name].push( fn );
						return this;
					},
					fire: function () {
						let ev;
						if ( schema ) {
							if ( !_event[schema] ) return this;
							if ( !_event[schema][name] ) {
								return this;
							}
							ev = _event[schema][name];
						} else {
							if ( !_event[name] )
								return this;
							ev = _event[name];
						}
						let len = ev.length - 1, arg;
						if ( arguments.length > 1 ) {
							arg = Array.prototype.slice.call( arguments );
						}
						else {
							arg = arguments[0];
							if ( arg === null || !( arg instanceof [].constructor ) || typeof ( arg ) !== 'object' ) {
								arg = [];
							}
						}
						do {
							let copy = len;
							Sow.async( function () {
								ev[copy].apply( this, arg ); return;
							}, 0 );
						} while ( len-- );
						return this;
					}
				};
			}.extend( {
				remove: function ( name, schema ) {
					if ( arguments.length <= 0 )
						throw new Error( "Name or Schema required to remove Hook" );

					if ( typeof ( schema ) !== 'undefined' ) {
						if ( _event[schema] ) {
							delete _event[schema];
						}
						return this;
					}
					if ( _event[schema] ) {
						delete _event[schema];
					}
					return this;
				}
			} )
		};
	} ).define( 'Sow', function () {
		var _worker_ = {
			Create: {
				Class: function Class() {
					var describe, fields, i, len, names, constructor, hasConstructor, ancestor, descriptor, prototype;
					if ( arguments.length > 1 ) {
						fields = {};
						for ( i = 0, len = arguments.length; i < len; i++ ) {
							this.extend( fields, ( typeof ( arguments[i] ) === 'function' ? arguments[i].call( this ) : arguments[i] ) );
						}
					} else {
						typeof ( arguments[0] ) === 'function' ? ( fields = arguments[0].call( this ) ) : ( fields = arguments[0] );
					}
					hasConstructor = true;
					names = Object.keys( fields );
					constructor = names.indexOf( "constructor" ) >= 0 ? fields.constructor :
						( hasConstructor = false, function () { } );
					ancestor = fields.extends || Object;
					describe = Object.getOwnPropertyDescriptor;
					descriptor = names.reduce( function ( descriptor, key ) {
						descriptor[key] = describe( fields, key );
						return descriptor;
					}, {} );
					prototype = Object.create( ancestor.prototype, descriptor );
					constructor.prototype = prototype;
					hasConstructor === false ? undefined : prototype.constructor = constructor;
					fields = i = len = names = hasConstructor = ancestor = descriptor = prototype = describe = undefined;
					return constructor;
				},
				extend: function ( destination, source ) {
					var property;
					if ( !( destination instanceof {}.constructor ) || !( source instanceof {}.constructor ) ) {
						if ( typeof ( destination ) !== 'function' || !( source instanceof {}.constructor ) )
							throw new Error( 'Invalid Object type define in Sow.Assembler.Create.extend...! \r\n Destination type ' + typeof destination + '; \r\n Source type ' + typeof source + ';' );
					}
					typeof ( destination ) === 'function' ? ( destination = destination.call( this ) ) : undefined;
					typeof ( source ) === 'function' ? ( source = source.call( this ) ) : undefined;
					return Object.extend( destination, source );
				},
				aggregate: function aggregate() {
					var fields;
					if ( arguments.length <= 1 ) {
						return typeof ( arguments[0] ) === 'function' ? ( fields = arguments[0].call( this ), fields ) : ( fields = arguments[0], fields );
					}
					fields = {};
					for ( let i = 0, len = arguments.length; i < len; i++ ) {
						this.extend( fields, arguments[i] );
						//this.extend( fields, ( typeof ( arguments[i] ) === 'function' ? arguments[i].call( this ) : arguments[i] ) );
					}
					return fields;
				},
				Closure: function () {
					try {
						if ( arguments.length <= 1 ) {
							typeof ( arguments[0] ) === 'function' ? arguments[0].call( this ) : console.warn( 'Invalid function define in Sow.Assembler.closure...! \r\n Function type ' + typeof ( arguments[0] ) );
							return this;
						}
						for ( i = 0, len = arguments.length; i < len; i++ ) {
							typeof ( arguments[i] ) === 'function' ? arguments[i].call( this ) : console.log( 'Invalid function define in Sow.Assembler.closure...! \r\n Function type ' + typeof ( arguments[i] ) );
						}
						return this;
					} catch ( ex ) {
						console.log( ex.message );
						return this;
					}
				}
			}
		};
		return {
			Assembler: _worker_.Create.aggregate( function () {
				let fnc = this.Class( _worker_ );/** _worker_.class(_worker_);*/
				fnc.extend( _worker_ ); _worker_ = undefined;
				return fnc;
			} )
		};
	} ).define( 'Sow', function () {
			// Moduler
			'use strict'
			var _MODULE_, _REGISTRY_, CREATE;
			CREATE = ( new this.Assembler() ).Create;
			_MODULE_ = CREATE.aggregate( function () {
				var Global = {
					settings: {
						path: undefined,
						isClass: true
					}
				};
				return {
					blueprint: this.aggregate( function () {
						var publicModule = {
							export: {

							},
							require: function ( x, y ) {
								if ( typeof ( publicModule.export[x] ) !== 'object' )
									return {};

								if ( typeof ( y ) === 'string' ) {

									if ( typeof ( publicModule.export[x][y] ) === 'function' )
										return publicModule.export[x][y]();

									return {};
								}
								let out = {};
								for ( let o in publicModule.export[x] ) {

									if ( o === '___REMOVE___' || o === '___EXTEND___' ) continue;

									if ( typeof ( publicModule.export[x][o] ) !== 'function' ) continue;

									let obj = publicModule.export[x][o]();

									if ( typeof ( obj ) === 'function' ) {
										out[obj.name] = obj;
										continue;
									}

									Object.extend( out, obj );
								}
								return out;
							}
						};
						return {
							exportNamespace: function ( namespaceName ) {
								return publicModule.require( namespaceName );
							},
							unloadNamespace: function ( namespaceName ) {
								if ( typeof ( publicModule.export[namespaceName] ) !== 'object' )
									throw new Error( String.format( "Invalid Namespace defined =>{0}; Please at first use Namespace then unloadNamespace.", namespaceName ) );
								if ( typeof ( publicModule.export[namespaceName]['___REMOVE___'] ) === 'function' )
									publicModule.export[namespaceName]['___REMOVE___']( namespaceName );
								delete publicModule.export[namespaceName];
								return this;
							},
							reRegisterNamespace: function ( namespace, modules, entry ) {
								if ( typeof ( publicModule.export[namespace] ) !== 'object' )
									throw new Error( String.format( "Invalid Namespace defined =>{0}; Please at first Use Namespace then reRegisterNamespace.", namespace ) );
								if ( typeof ( publicModule.export[namespace]['___REMOVE___'] ) !== 'function' )
									throw new Error( String.format( "Unable to remove Namespace =>{0}.", namespace ) );
								if ( typeof ( publicModule.export[namespace]['___EXTEND___'] ) !== 'function' )
									throw new Error( String.format( "This Namespace =>{0} not supported reRegisterNamespace method.", namespace ) );
								publicModule.export[namespace]['___REMOVE___']( namespace, true );
								publicModule.export[namespace]['___EXTEND___']( function () {
									this.prepare( namespace, modules, entry, false, true );
								}, true );
								return this;
							},
							extendNamespace: function ( destinationNamespace, namespace, modules, entry ) {
								if ( typeof ( publicModule.export[destinationNamespace] ) !== 'object' )
									throw new Error( String.format( "Invalid Namespace defined =>{0}; Please at first use Namespace then reRegisterNamespace.", destinationNamespace ) );
								if ( typeof ( publicModule.export[destinationNamespace]['___EXTEND___'] ) !== 'function' )
									throw new Error( String.format( "This Namespace =>{0} not supported extend method.", destinationNamespace ) );
								if ( typeof ( publicModule.export[namespace] ) === 'object' ) {
									if ( typeof ( publicModule.export[namespace]['___REMOVE___'] ) === 'function' )
										publicModule.export[namespace]['___REMOVE___']( namespace );
								}
								publicModule.export[destinationNamespace]['___EXTEND___']( function () {
									this.extend( destinationNamespace, modules, entry, false );
								} );
								return this;
							},
							initialize: this.aggregate( function () {
								var Initialize = {
									private: function () {
										var __module = {
											export: {
												private: {
													require: function ( name, key ) {
														return function ( x, y ) {

															try {

																let id = __module.export.private[name][key].entry[x];

																if ( id !== undefined ) {
																	return __module.export.private[name][id].method;
																}

																return publicModule.require( x, y );

															} catch ( e ) {
																console.log( e.message );
																return {};
															}
														}
													}
												},
												public: {},
											},
										};
										return {
											module: {
												bingtransmit: function ( name, key, modules, isExport, extend ) {
													let isPrivate, isClass;

													isPrivate = modules[1].private;

													isPrivate ? undefined : typeof ( modules[1].public ) === 'boolean' && modules[1].public !== false ? isPrivate = false : isPrivate = true;

													if ( extend.isExtend ) {

														if ( !( __module.export.private[name][extend.ext_key] instanceof {}.constructor ) )
															throw new Error( String.format( 'Invalid extend entry==> `{0}` defined in Namespace ===> `{1}`..!', key, name ) );

														Object.extend( __module.export.private[name][extend.ext_key].method, modules[0].call(
															__module.export.private[name][extend.ext_key].method,
                                                        /** Require*/__module.export.private.require( name, extend.ext_key ),
															this, { object: undefined }
														) );

													} else {

														__module.export.private[name][key] = {
															entry: {},
															method: {}
														};

														__module.export.private[name][key].method = modules[0].call(
															__module.export.private[name][key].method,
															/** Require*/__module.export.private.require( name, key ),
															this, { object: undefined }
														);
													}

													isClass = modules[1].class;

													for ( let property in modules[1] ) {
														if ( property === 'private' || property === 'class' || property === "isExtend" || property === "ext_key" ) {
															continue;
														}
														if ( !extend.isExtend ) {
															__module.export.private[name][key].entry[property] = modules[1][property];
															continue;
														}
														__module.export.private[name][extend.ext_key].entry[property] = modules[1][property];

														/**if ( !( __module.export.private[name][extend.ext_key].entry[property] instanceof {}.constructor ) )
															__module.export.private[name][extend.ext_key].entry[property] = {};
	    
														Object.extend( __module.export.private[name][extend.ext_key].entry[property], modules[1][property] );*/
													}
													if ( !isPrivate ) {

														if ( typeof ( publicModule.export[name][modules[1].owner] ) === 'function' )
															throw new Error( String.format( "This owner already exists. Owner=>{0}; Please try another name.", modules[1].owner ) );
														if ( extend.isExtend ) {
															publicModule.export[name][modules[1].owner] = function () {
																return __module.export.private[name][extend.ext_key].method;
															};
														} else {
															publicModule.export[name][modules[1].owner] = function () {
																return __module.export.private[name][key].method;
															};
														}

													}
													modules = undefined;
													if ( isPrivate ) {
														return {};
													}
													if ( isClass ) {
														return extend.isExtend ? __module.export.private[name][extend.ext_key].method : __module.export.private[name][key].method;
													}
													if ( isExport ) {
														return extend.isExtend ? __module.export.private[name][extend.ext_key].method : __module.export.private[name][key].method;
													}
													return {};
												},
												extend: function ( name, modules, entry ) {
													if ( !( __module.export.private[name] instanceof {}.constructor ) )
														throw new Error( String.format( 'No such Namespace ===> `{0}`..!', name ) );
													this.prepare( name, modules, entry, false, false );

													return this;
												},
												int: function ( name ) {
													if ( __module.export.private[name] )
														throw new Error( String.format( 'This Namespace===> {0} already exists..!', name ) );

													publicModule.export[name] = {};
													__module.export.private[name] = {};
													return this;
												},
												prepare: function ( name, modules, entry, isExport, doInt ) {
													doInt === undefined ? doInt = true : undefined;
													if ( doInt === true ) {
														this.int( name );
													}
													let i, len, property, fields, support, ep;
													var out = {};
													support = new Sow.Assembler().Create;
													len = entry.length; ep = [];
													let isExtend = false, key, extend = {};
													for ( i = 0; i < len; i++ ) {

														key = entry[i];

														if ( !( modules[key] instanceof [].constructor ) )
															throw new Error( String.format( 'No such module defined for entry==> `{0}` in Namespace ===> `{1}`..!', key, name ) );

														isExtend = modules[key][1].isExtend === false || modules[key][1].isExtend === undefined ? false : true;

														if ( ep.indexOf( key ) > -1 )
															throw new Error( String.format( 'Duplicate entry==> `{0}` defined in Namespace ===> `{1}`..!', key, name ) );

														extend = {
															isExtend: false
														};
														ep.push( key );

														if ( isExtend ) {
															extend = {
																ext_key: modules[key][1].ext_key,
																isExtend: true
															};
															if ( !extend.ext_key )
																throw new Error( String.format( 'Invalid ext entry==> `{0}` defined in Namespace ===> `{1}`..!', extend.ext_key, name ) );
															if ( doInt === true ) {
																if ( ep.indexOf( extend.ext_key ) <= -1 )
																	throw new Error( String.format( 'Invalid extend entry==> `{0}` defined in Namespace ===> `{1}`..!', key, name ) );
															}
														}
														fields = this.bingtransmit.call( support, name, key, modules[key], isExport, extend );

														if ( !isExport ) continue;

														for ( property in fields )
															out[property] = fields[property];
													}
													ep = len = property = fields = modules = entry = support = isExport = undefined;
													if ( !doInt ) return this;
													/**[Extend Module remove function]*/
													out['___REMOVE___'] = function ( inst ) {
														if ( typeof ( __module.export.private[name] ) === 'object' ) {
															delete __module.export.private[name];
														}
														if ( typeof ( __module.export.public[name] ) === 'object' ) {
															delete __module.export.public[name];
														}
														if ( !inst )
															inst = name;

														out = name = undefined;
														/**[Remove from global object.]*/
														for ( var i in this ) {
															this[i] = function postMortem() {
																throw new Error( 'This method cannot be called because this `' + inst + '` has been destroyed ! :\/' );
															};
														}
														return this;
													};
													var that = this;
													publicModule.export[name]['___REMOVE___'] = function ( inst, partial ) {
														if ( !partial === true ) {
															that = undefined;
														}
														out['___REMOVE___']( inst );
														return this;
													};

													publicModule.export[name]['___EXTEND___'] = function ( ecb, removeInst ) {
														typeof ( ecb ) === "function" ? ecb.call( that ) : undefined;
														if ( removeInst === true ) that = undefined;
														return this;
													};
													if ( !isExport )
														return;
													return out;
												}
											}
										}
									}
								};
								return function ( settings, modules, cache, entry, isExport ) {
									if ( arguments.length < 4 )
										throw new Error( 'Invalid Namespace defined..!' );

									if ( !settings instanceof {}.constructor || !modules instanceof {}.constructor ||
										!cache instanceof {}.constructor ||
										!entry instanceof [].constructor )
										throw new Error( 'Invalid Namespace defined!' );

									if ( !entry instanceof [].constructor )
										throw new Error( 'Invalid Namespace Entry defined..! \r\n Entry type ' + typeof entry );

									let property, module_settings = {};

									for ( property in Global.settings ) {
										module_settings[property] = ( settings[property] !== undefined ? ( settings[property] ) : ( Global.settings[property] ) );
									}

									if ( module_settings.isClass ) {
										return new Sow.Assembler().Create.Class( Initialize.private().module.prepare( module_settings.path, modules, entry, isExport ) );
									}

									if ( isExport ) {
										return Initialize.private().module.prepare( module_settings.path, modules, entry, isExport );
									}

									Initialize.private().module.prepare( module_settings.path, modules, entry, isExport );
									return;
								}
							} )
						};
					} )
				}
			} );
			_REGISTRY_ = CREATE.aggregate( function () {
				var _MODULE_Bucket = {};
				return {
					add: function ( settings, module ) {
						var xlen = arguments.length;
						if ( xlen < 4 )
							throw new Error( 'Invalid Namespace defined!!!' );

						if ( !arguments[0]/**settings*/ instanceof {}.constructor ||
							!arguments[1]/**modules*/ instanceof {}.constructor ||
							!arguments[2]/**cache*/ instanceof {}.constructor ||
							!arguments[3]/**entry*/ instanceof [].constructor
						)
							throw new Error( 'Invalid Namespace define!' );

						if ( !arguments[3] instanceof [].constructor )
							throw new Error( 'Invalid Namespace Entry define..! \r\n Entry type ' + typeof ( arguments[3] ) );

						if ( !arguments[0].path )
							throw new Error( 'Invalid Namespace path..' );

						if ( typeof ( _MODULE_Bucket[arguments[0].path] ) === 'function' )
							throw new Error( 'Namespace exist..' );

						var public_module = [];

						for ( var x = 0; x < xlen; x++ ) {
							public_module.push( arguments[x] );
						}
						public_module.push( true );
						_MODULE_Bucket[public_module[0].path] = function () {
							return public_module;
						};
						return this;
					},
					getModule: function ( isExport, /**[settings]*/a, /**[modules]*/b ) {
						var public_module, xlen;
						public_module = [];
						xlen = b.length;
						public_module.push( a ); a = undefined;
						for ( var x = 0; x < xlen; x++ ) {
							public_module.push( b[x] );
						}
						public_module.push( isExport/**[Notify that We want to export! :)]*/ ); b = undefined;
						return public_module;
					},
					function: function () {
						var xlen = arguments.length;

						if ( xlen < 3 || xlen > 3 )
							throw new Error( 'Invalid Namespace define !' );

						if ( !arguments[0]/**settings*/ instanceof {}.constructor || typeof ( arguments[1] )/**modules*/ !== 'function' || typeof ( arguments[2] )/**modules*/ !== 'boolean' )
							throw new Error( 'Invalid Namespace define!' );

						if ( !arguments[0].path && arguments[2] === false )
							throw new Error( 'Invalid Namespace Name..' );

						if ( arguments[2] === true ) {

							if ( typeof ( _MODULE_Bucket[arguments[0].path] ) !== 'object' )
								throw new Error( String.format( 'This Namespace==> `{0}` doesn\'t exist.. You should not extend ==> `{0}` Namespace .', arguments[0].path ) );

							if ( _MODULE_Bucket[arguments[0].path].initialize === true )
								throw new Error( String.format( 'You should not extend Namespace==> `{0}` after Initialize..', arguments[0].path ) );

							if ( !( _MODULE_Bucket[arguments[0].path].module instanceof [].constructor ) )
								throw new Error( String.format( 'This Namespace==> `{0}` is Static.. You should not extend ==> `{0}` Namespace .', arguments[0].path ) );

							_MODULE_Bucket[arguments[0].path].module.push( arguments[1] );

							return this;

						}

						if ( typeof ( _MODULE_Bucket[arguments[0].path] ) === 'function' )
							throw new Error( String.format( 'This Namespace==> `{0}` already exists..', arguments[0].path ) );

						//INITIALIZE
						_MODULE_Bucket[arguments[0].path] = {
							initialize: false,
							settings: arguments[0],
							module: []
						};

						_MODULE_Bucket[arguments[0].path].module.push( arguments[1] );

						return this;
					},
					remove: function ( name ) {
						if ( _MODULE_Bucket[name] ) {
							_MODULE_Bucket[name] = undefined;
							delete _MODULE_Bucket[name];
						}
						return this;
					},
					initializeModule: function ( name ) {
						if ( _MODULE_Bucket[name].module.length <= 1 ) {
							return _MODULE_Bucket[name].module[0].call( Sow );
						}
						// In-case Extend Namespace
						let modules = {}, cache = {}, entry = [];

						for ( let i = 0, l = _MODULE_Bucket[name].module.length; i < l; i++ ) {

							if ( typeof ( _MODULE_Bucket[name].module[i] ) !== 'function' )
								throw new Error( String.format( 'Invalid method defined in Namespace==> `{0}`...', name ) );

							let m = _MODULE_Bucket[name].module[i].call( Sow );

							if ( !( m instanceof [].constructor ) )
								throw new Error( String.format( 'Invalid Namespace==> `{0}` Entry defined..', name ) );

							if ( !( m[0] instanceof {}.constructor ) )
								throw new Error( String.format( 'Invalid Namespace==> `{0}` module defined..', name ) );

							if ( !( m[1] instanceof {}.constructor ) )
								throw new Error( String.format( 'Invalid Namespace==> `{0}` cache defined..', name ) );

							if ( !( m[2] instanceof [].constructor ) )
								throw new Error( String.format( 'Invalid Namespace==> `{0}` entry defined..', name ) );
							//Object.extend( modules, m[0] );//module

							for ( let mo in m[0] ) {

								if ( !( m[0][mo] instanceof [].constructor ) )
									throw new Error( String.format( 'Invalid Namespace==> `{0}` module defined..', name ) );

								if ( modules[mo] )
									throw new Error( String.format( 'This module ==>{0} already exists in Namespace==> `{1}`..', mo, name ) );
								modules[mo] = m[0][mo];
							}
							//Object.extend( cache, m[1] );//cache
							for ( let co in m[1] ) {
								if ( cache[co] )
									throw new Error( String.format( 'This cache ==>{0} already exists in Namespace==> `{1}`..', co, name ) );
								if ( !modules[co] )
									throw new Error( String.format( 'This cache ==>{0} doesn\'t exist in Namespace==> `{1}`..', co, name ) );

								cache[co] = m[1][co];
							}
							//entry
							for ( let j = 0, jl = m[2].length; j < jl; j++ ) {
								let key = m[2][j];
								if ( !modules[key] )
									throw new Error( String.format( 'This entry ==>{0} doesn\'t exist in Namespace==> `{1}`..', key, name ) );

								if ( entry.indexOf( key ) > -1 )
									throw new Error( String.format( 'This entry ==>{0} aleready exist in Namespace==> `{1}`..', key, name ) );

								entry.push( key );
							}
						}
						///let module = [modules, cache, entry];
						//modules = cache = entry = undefined;
						return [modules, cache, entry];
					},
					reRegisterNamespace: function ( s ) {
						let modules = this.export( s.namespace, s.isExport, true );
						if ( s.isExtend ) {
							_MODULE_.blueprint.extendNamespace( s.extNamespace, s.namespace, modules[1], modules[3] );
							return;
						}
						_MODULE_.blueprint.reRegisterNamespace( s.namespace, modules[1], modules[3] );
						return this;
					},
					export: function ( name, isExport, isReRegister ) {

						if ( typeof ( name ) !== 'string' )
							throw new Error( String.format( 'This Namespace==> `{0}` doesn\'t exist...', name ) );

						if ( typeof ( _MODULE_Bucket[name] ) !== 'function' ) {

							if ( typeof ( _MODULE_Bucket[name] ) !== 'object' )
								throw new Error( String.format( 'This Namespace==> `{0}` doesn\'t exist..', name ) );

							if ( !( _MODULE_Bucket[name].module instanceof [].constructor ) )
								throw new Error( String.format( 'This Namespace==> `{0}` doesn\'t exist..', name ) );

							if ( isReRegister )
								return this.getModule( isExport, _MODULE_Bucket[name].settings, this.initializeModule( name ) );

							return _MODULE_.blueprint.initialize.apply( { Object: undefined },
								Array.prototype.slice.call( this.getModule( isExport, _MODULE_Bucket[name].settings, this.initializeModule( name ) ) )
							);
						}
						return _MODULE_.blueprint.initialize.apply( { Object: undefined }, Array.prototype.slice.call( _MODULE_Bucket[name].call( this ) ) );
						//return _MODULE_.blueprint.initialize.apply({ Object: undefined }, Array.prototype.slice.call(_MODULE_Bucket[name].call(this)));
					}
				}
			} );
			//registerNamespace();
			//usingNamespace();
			//exportNamespace();
			// V2
			// Create On Feb 21, 2018
			return CREATE.aggregate( function () {
				CREATE = undefined;
				var Namespace = {};
				return {
					registerNamespace: function ( namespaceName, modules ) {
						if ( typeof ( namespaceName ) !== 'string' )
							throw new Error( "Namespace Name string type required... :(" );
						this.define( namespaceName, {} );
						let extend = false; let child;

						if ( typeof ( Namespace[namespaceName] ) === 'string' ) {
							child = namespaceName; extend = true;
							namespaceName = Namespace[child];
						}
						if ( extend === true ) {
							if ( typeof ( Namespace[namespaceName] ) !== 'object' )
								throw new Error( String.format( 'This Parent Namespace==> `{0}` and Child ==> {1} doesn\'t exist..', namespaceName, child ) );

							if ( Namespace[namespaceName].isInitialize === true )
								throw new Error( String.format( 'You should not extend Prent Namespace==> `{0}` and Child ==> {1} after Initialize..', namespaceName, child ) );

							_REGISTRY_.function( { path: namespaceName, isClass: false }, modules, extend )
								.function( { path: child, isClass: false }, modules, false );
							return this;
						}
						if ( typeof ( Namespace[namespaceName] ) === 'object' )
							throw new Error( String.format( "This Namespace==> `{0}` already exists. You may extend this namespace or try another!!! :)", namespaceName ) );

						if ( typeof ( modules ) !== 'function' )
							throw new Error( "Module Function type required... :(" );

						Namespace[namespaceName] = {
							register: true,
							isInitialize: false,
							unload: false,
							use: 0,
							export: 0
						};
						_REGISTRY_.function( { path: namespaceName, isClass: false }, modules, extend );
						return this;
					},
					mapNamespace: function ( parent, child ) {
						if ( typeof ( parent ) !== 'string' )
							throw new Error( "Parent Namespace required!!!" );

						if ( typeof ( Namespace[parent] ) !== 'object' )
							throw new Error( String.format( 'This parent Namespace==> `{0}` doesn\'t exist.. Child Namespace', parent ) );

						let isArray = false;
						if ( typeof ( child ) !== 'string' ) {
							if ( !( child instanceof [].constructor ) )
								throw new Error( "Child Namespace required !!!" );
							isArray = true;
						}
						if ( !isArray )
							if ( typeof ( Namespace[child] ) === 'object' )
								console.log( String.format( "This Child Namespace==> `{0}` already exists. We are trying to extend ==>{1}==>{2}!!! :)", child, child, parent ) );


						if ( !isArray ) {
							Namespace[child] = parent;
							return this;
						}
						for ( let i = 0, l = child.length; i < l; i++ ) {
							if ( typeof ( Namespace[child[i]] ) === 'object' )
								console.log( String.format( "This Child Namespace==> `{0}` already exists. We are trying to extend ==>{1}==>{2}!!! :)", child[i], child[i], parent ) );

							Namespace[child[i]] = parent;
						}
						return this;
					},
					namespaceExists: function ( namespaceName ) {
						if ( typeof ( namespaceName ) !== 'string' )
							throw new Error( "Parent Namespace required!!!" );
						if ( typeof ( Namespace[namespaceName] ) !== 'object' )
							return false;
						return true;
					},
					reRegisterNamespace: function ( namespaceName ) {
						let isExtended = false; let extNamespace;
						if ( typeof ( Namespace[namespaceName] ) === 'string' ) {
							extNamespace = Namespace[namespaceName]; isExtended = true;
						}
						_REGISTRY_.reRegisterNamespace( {
							isExtend: isExtended,
							isExport: true,
							extNamespace: extNamespace,
							namespace: namespaceName
						} );
						return this;
					},
					removeRegistry: function ( namespaceName ) {
						_REGISTRY_.remove( namespaceName );
						return this;
					},
					usingNamespace: function ( namespaceName, removeRegistry ) {
						let isExtended = false; let child;
						if ( typeof ( Namespace[namespaceName] ) === 'string' ) {
							child = namespaceName; isExtended = true;
							namespaceName = Namespace[namespaceName];
						}
						if ( typeof ( Namespace[namespaceName] ) !== 'object' ) {
							return this;//REMOVE
						}
						if ( typeof ( Namespace[namespaceName] ) !== 'object' )
							throw new Error( String.format( "This Namespace==> `{0}` is not registerd yet!!! :(", ( isExtended ? child : namespaceName ) ) );

						if ( Namespace[namespaceName].unload === true )
							throw new Error( String.format( "This Namespace==> `{0}` already unloaded!!! :)", ( isExtended ? child : namespaceName ) ) );

						Namespace[namespaceName].use++;

						if ( Namespace[namespaceName].isInitialize ) {
							console.log( String.format( "This Namespace==> `{0}` used total ==> {1}!!! :)", ( isExtended ? child : namespaceName ), Namespace[namespaceName].use ) );
							return this;
						}
						_REGISTRY_.export( namespaceName, false );
						Namespace[namespaceName].isInitialize = true;

						if ( removeRegistry === true )
							_REGISTRY_.remove( namespaceName );

						return this;
					},
					exportNamespace: function ( namespaceName ) {
						let isExtended = false; let child;
						if ( typeof ( Namespace[namespaceName] ) === 'string' ) {
							child = namespaceName; isExtended = true;
							namespaceName = Namespace[namespaceName];
						}

						if ( typeof ( Namespace[namespaceName] ) !== 'object' )
							throw new Error( String.format( "This Namespace==> `{0}` is not registerd yet!!! :(", ( isExtended ? child : namespaceName ) ) );

						if ( Namespace[namespaceName].unload === true )
							throw new Error( String.format( "This Namespace==> `{0}` already unloaded!!! :)", ( isExtended ? child : namespaceName ) ) );

						if ( !Namespace[namespaceName].isInitialize )
							this.usingNamespace( namespaceName );

						Namespace[namespaceName].export++;
						console.log( String.format( "This Namespace==> `{0}` exported total ==> {1}!!! :)", ( isExtended ? child : namespaceName ), Namespace[namespaceName].export ) );

						return _MODULE_.blueprint.exportNamespace( namespaceName );
					},
					unloadNamespace: function ( namespaceName ) {
						if ( typeof ( Namespace[namespaceName] ) !== 'object' )
							throw new Error( String.format( "This Namespace==> `{0}` is not registerd yet!!! :(", namespaceName ) );

						if ( Namespace[namespaceName].unload === true ) {
							console.log( String.format( "This Namespace==> `{0}` already unloaded!!! :)", namespaceName ) );
							return this;
						}
						Namespace[namespaceName].unload = true;
						try {
							_MODULE_.blueprint.unloadNamespace( namespaceName );
						} catch ( e ) {
							console.log( e.message );
						}
						return this;
					}
				};
			} );
		} )
		.define( 'Sow', function () {
			return {
				Run: function () {
					typeof ( arguments[0] ) === 'function' ? arguments[0].call( this ) : undefined;
					return this;
				},
				onRouterChange: function ( event ) {
					console.log( event );
				}
			};
		} ).define( 'Sow.Static', function () {
			var definePoperty = function ( value ) {
				return {
					enumerable: true,
					writable: false,
					configurable: true,
					value: value
				};
			};
			return {
				all: function ( obj ) {
					if ( !( typeof ( obj ) === 'object' || obj instanceof {}.constructor ) )
						throw new Error( "Invalid object defined..." );
					for ( let p in obj ) {
						this.define( obj, p, obj[p] );
					}
					return obj;
				},
				define: function ( obj, poperty, value ) {
					return !( typeof ( obj ) === 'object' || obj instanceof {}.constructor ) ? this
						: ( Object.defineProperty( obj, poperty, definePoperty( value ) ), this );
				},
				change: function ( obj, property, value ) {
					let descriptor;
					return !( typeof ( obj ) !== 'object' || obj instanceof {}.constructor ) ? typeof ( obj )
						: ( descriptor = Object.getOwnPropertyDescriptor( obj, property ), !( typeof ( obj ) !== 'object' || descriptor instanceof {}.constructor ) ? this : ( descriptor.value = value, Object.defineProperty( obj, property, descriptor ), this ) );
				}
			};
		} ).define( 'Sow', function () {
			var private_worker = {
				initiate: function ( t ) {
					if ( !( 'Promise' in window ) ) {
						return {
							then: function ( resolve ) {
								setTimeout( resolve, t );
							},
							catch: function ( fn ) { }
						};
					}
					return new window.Promise( function ( resolve ) {
						setTimeout( resolve, t ); return;
					} );
				},
				await: function ( func, delay, args ) {
					return private_worker.initiate( delay ).then( function () {
						func.apply( Sow, Array.prototype.slice.call( args ) );
						return;
					}, function ( s ) {
						console.log( s );
					} ).catch( function ( reason ) {
						console.log( 'Error Message: ' + reason.message + '\r\nHandle rejected promise (' + reason.stack + ') here.' );
					} );
				},
				async: function ( func, delay, args ) {
					if ( typeof ( func ) !== 'function' )
						throw new Error( 'Invalid instance defined instead of Function in executeAsync...! \r\n func type ' + typeof (func) );

					typeof ( delay ) !== 'number' ? ( delay = 0 ) : delay < 0 ? ( delay = 0 ) : '';
					if ( !args ) {
						if ( this.browser.Promise.support ) {
							private_worker.initiate( delay ).then( function () {
								func.call( Sow ); return;
							}, function ( s ) {
								console.log( s );
							} ).catch( function ( reason ) {
								console.log( 'Error Message: ' + reason.message + '\r\nHandle rejected promise (' + reason.stack + ') here.' );
							} );
						} else {
							setTimeout( func, delay );
						}
						return this;
					}
					if ( args !== null && typeof ( args ) === 'object' ) {
						if ( this.browser.Promise.support ) {
							private_worker.initiate( delay ).then( function () {
								if ( typeof ( args[0] ) !== 'object' ) {
									func.apply( Sow, args );
									return;
								}
								func.apply( args[0], Array.prototype.slice.call( args, 1 ) ); return;
							}, function ( s ) {
								console.warn( s );
							} ).catch( function ( reason ) {
								console.log( 'Error Message: ' + reason.message + '\r\nHandle rejected promise (' + reason.stack + ') here.' );
							} );
							return this;
						}
						setTimeout( function () {
							if ( typeof ( args[0] ) !== 'object' ) {
								func.apply( Sow, args );
								return this;
							}
							func.apply( args[0], Array.prototype.slice.call( args, 1 ) ); return;
						}, delay );
						return this;
					}
					throw new Error( 'Invalid argument defined Arguments type ' + typeof ( args ) + '; ' );
				}
			};
			return {
				async: private_worker.async,
				await: private_worker.await
			};
		} ).define( 'Sow', function () {
			function isMobile() {
				/** Whether we are using a Mobile or not. */
				let a = navigator.userAgent || navigator.vendor || window.opera;
				if ( /android|avantgo|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test( a ) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|e\-|e\/|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|xda(\-|2|g)|yas\-|your|zeto|zte\-/i.test( a.substr( 0, 4 ) ) ) {
					return true;
				}
				return false;
			};
			return {
				/** Define Operating System*/
				OS:/** Whether we are using a Mobile or not. */
				isMobile()
					? 'Mobile'
					/** Whether this is on the Windows platform or not. */
					: ( /Win/.test( navigator.platform ) )
						? 'Windows'
						/** Whether we are using a Mac or not. */
						: ( /Mac/.test( navigator.platform ) )
							? 'Mac'
							/** Whether this is on ChromeOS. */
							: ( /CrOS/.test( navigator.userAgent ) )
								? 'ChromeOS'
								/** Whether this is on vanilla Linux. */
								: ( /Linux/.test( navigator.userAgent ) )
									? 'Linux'
									/** Whether this is on Android. */
									: ( /Android/.test( navigator.userAgent ) )
										? 'Android'
										: undefined
			};
		} ).define( 'Sow.Device', function () {
			/** Export*/
			return {
				/** Define Device*/
				isTouchDevice: "ontouchstart" in window,
				deviceType: function () {
					let a = navigator.userAgent.match( /iPhone|iPod|iPad/i );
					return a ? a[0] : "other"
				}.apply( this )
			};
		} ).define( 'Sow.browser.blob', function () {
			if ( !( 'Blob' in window ) || Blob.toString().indexOf( "[native code]" ) <= -1 ) {
				// We're screwed, blob constructor unsupported entirely
				return {
					support: false
				};
			}
			return {
				support: true
			};
		} ).define( 'Sow.browser.Promise', function () {
			return {
				support: ( 'Promise' in window ) ? Promise.toString().indexOf( "[native code]" ) >= -1 : false
			}
		} )
		/** Define Sow.dom*/
		.define( 'Sow.dom', function () {
			/** Dom Export*/
			let dom = {
				/** Is High Density*/
				isHighDensity: function () {
					return window.matchMedia && ( window.matchMedia( "only screen and (min-resolution: 124dpi), only screen and (min-resolution: 1.3dppx), only screen and (min-resolution: 48.8dpcm)" ).matches || window.matchMedia( "only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (min-device-pixel-ratio: 1.3)" ).matches ) || window.devicePixelRatio && window.devicePixelRatio > 1.3;
				}(),
				/** Is Retina*/
				isRetina: function () {
					return ( window.matchMedia && ( window.matchMedia( "only screen and (min-resolution: 192dpi), only screen and (min-resolution: 2dppx), only screen and (min-resolution: 75.6dpcm)" ).matches || window.matchMedia( "only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (-o-min-device-pixel-ratio: 2/1), only screen and (min--moz-device-pixel-ratio: 2), only screen and (min-device-pixel-ratio: 2)" ).matches ) || window.devicePixelRatio && window.devicePixelRatio > 2 ) && /(iPad|iPhone|iPod)/g.test( navigator.userAgent );
				}(),
				/** Is Smart Phone*/
				isSmartPhone: function () {
					return window.matchMedia && window.matchMedia( " only screen and (min-device-width : 320px) and (max-device-width : 480px)" ).matches || /(iPhone|iPod)/g.test( navigator.userAgent );
				}(),
				/** Is Tablet*/
				isTablet: function () {
					return window.matchMedia && window.matchMedia( " only screen and (min-device-width : 768px) and (max-device-width : 1024px)" ).matches || /(iPhone|iPod)/g.test( navigator.userAgent );
				}()
			};
			/** Is Desktop*/
			dom.isDesktop = function () {
				return !( this.isTablet || this.isSmartPhone )
			}.call( dom );

			/** Export*/
			return dom;
		} ).define( 'Sow.browser', function () {
			let a = window, b = document, e, f, rt2, len,
				browser = {
					dom: function () {
						let dom = {}; b.getElementById ? 1 : !1, dom && ( ( b.importNode ? 0 : 1 ) || ( dom = 2 ), ( b.normalizeDocument ? 0 : 1 ) || ( dom = 3 ) )
						return dom;
					}(),
					compatibility: {
						lineClamp: function () {
							return "undefined" !== typeof ( b.createElement( "div" ).style.webkitLineClamp )
						}(),
						cssTransforms: function () {
							for ( let a = b.createElement( "div" ),
								c = ["transformProperty", "WebkitTransform", "MozTransform", "OTransform", "msTransform"],
								d = 0, len = c.length; d < len; d++ )
								if ( "undefined" !== typeof ( a.style[c[d]] ) ) return !0;
							return !1
						}()
					},
					/** Browser Worker Thread*/
					workerThread: {
						/** Is Browser Support Worker Thread*/
						support: ( 'Worker' in window ) ? Worker.toString().indexOf( "[native code]" ) >= -1 : false
					},
					/** Define Browser Type*/
					type:/** Whether we are using a IE Browser or not. */
					typeof ( window.attachEvent ) === 'function' && !( Object.prototype.toString.call( window.opera ) == '[object Opera]' )
						? 'IE'
						/** Whether we are using a Opera Browser or not. */
						: ( Object.prototype.toString.call( window.opera ) == '[object Opera]' || navigator.userAgent.indexOf( 'Opera Mini' ) > -1 )
							? 'Opera'
							/** Whether we are using a WebKit Type Browser or not. */
							: ( navigator.userAgent.indexOf( 'AppleWebKit/' ) > -1 )
								? 'WebKit'
								/** Whether we are using a Gecko Type Browser or not. */
								: ( navigator.userAgent.indexOf( 'Gecko' ) > -1 && navigator.userAgent.indexOf( 'KHTML' ) === -1 )
									? 'Gecko'
									/** Whether we are using a Apple Browser or not. */
									: ( /Apple.*Mobile/.test( navigator.userAgent ) )
										? 'MobileSafari'
										: undefined
				};
			rt2 = {
				info: function () {
					let chrome, firefox, ie, _opera, safari, webkit;
					_opera = a.opera ? 9 : !1;
					if ( _opera && ( ( navigator.geolocation ? 0 : 1 ) || ( _opera = 10 ), ( a.opera.version ? 0 : 1 ) || ( _opera = parseFloat( a.opera.version() ) ) ), ie = function () { return navigator.userAgent.match( /Trident/ ) && /rv:11.0/i.test( navigator.userAgent ) ? 11 : "object" != typeof b.all || _opera ? !1 : "CSS1Compat" != b.compatMode ? 6 : a.XMLHttpRequest ? Object.defineProperty ? "object" != typeof DOMImplementation || "function" != typeof DOMImplementation.prototype.createDocument ? 8 : a.msMatchMedia ? 10 : 9 : 7 : 6 }(), webkit = ( a.openDatabase ? !0 : !1 ) && !_opera, chrome = webkit && a.chrome ? !0 : !1, safari = webkit && !chrome, safari && ( ( b.compareDocumentPosition ? 0 : 1 ) || ( safari = 4 ), ( navigator.registerContentHandler ? 0 : 1 ) || ( safari = 5 ), ( a.matchMedia ? 0 : 1 ) || ( safari = 6 ) ), firefox = !!navigator.userAgent.match( /firefox/i ), firefox ) {
						try {
							"function" == typeof ( b.createElement( "canvas" ).getContext ) && ( firefox = 1.5 )
						} catch ( d ) { }

						"object" == typeof ( a.globalStorage ) && ( firefox = 2 ), ( b.elementFromPoint ? 0 : 1 ) || ( firefox = 3 ), ( b.querySelector ? 0 : 1 ) || ( firefox = 3.5 ), ( b.getElementsByTagName( "head" )[0].mozMatchesSelector ? 0 : 1 ) || ( firefox = 3.6 ), ( a.Uint8Array ? 0 : 1 ) || ( firefox = 4 ), ( Function.prototype.isGenerator ? 0 : 1 ) || ( firefox = 5 ), ( a.matchMedia ? 0 : 1 ) || ( firefox = 6 ), ( a.FileReader && a.FileReader.prototype.readAsArrayBuffer ? 0 : 1 ) || ( firefox = 7 ), ( b.head && b.head.insertAdjacentHTML ? 0 : 1 ) || ( firefox = 8 )
					}
					chrome ? this.chrome = chrome : '' || firefox ? this.firefox = firefox : '' || ie ? this.ie = ie : '' || _opera ? this.opera = _opera : '' || webkit ? this.webkit = webkit : '' || safari ? this.safari = safari : '';
					return { chrome: chrome, firefox: firefox, ie: ie, opera: _opera, webkit: webkit, safari: safari }
				}.call( browser )
			};
			a = undefined; b = undefined;
			for ( e = ["firefox", "webkit", "chrome", "safari", "khtml", "ie", "opera"], len = e.length, f = 0; f < len; f++ ) {
				if ( browser[e[f]] !== false && browser[e[f]] ) {
					! function ( x, y ) {
						x[y + "Upto"] = function ( a ) {
							return this[x] && ( "number" != typeof ( this[x] ) || this[x] <= a )
						}, x[y + "Atleast"] = function ( a ) {
							return this[x] && ( "number" != typeof ( this[x] ) || this[x] >= a )
						}
					}( browser, e[f] );
					break;
				}
			};
			e = undefined;
			/** Define Browser Version*/
			browser.version = function ( x ) {
				let ua; ua = navigator.userAgent;
				return this.type === 'Gecko' ? /** Whether this browser type is Gecko*/function ( a, b ) {
					let rv = -1, re = new RegExp( "rv:([0-9]{1,}[\.0-9]{0,})" );
					re.exec( ua ) !== null ? rv = parseFloat( RegExp.$1 ) : '';
					if ( b.firefox !== false && ua.indexOf( 'Firefox/' ) > 0 ) { a.name = 'Firefox'; return rv; }
					if ( b.ie !== false && ua.indexOf( 'Trident/' ) > 0 ) {/** IE > 10*/a.name = 'IE'; return rv; }
					return rv;
				}( this, x ) : this.type === 'WebKit' ?/** Whether this browser type is WebKit*/ function ( a, b ) {
					let rv = -1, re;
					if ( b.opera ) { re = ua.match( /Opera|OPR\/([0-9]+)\./ ); return re ? ( rv = parseInt( re[1], 10 ), a.name = 'Opera', rv ) : ''; }
					if ( b.chrome ) { re = ua.match( /Chrom(e|ium)\/([0-9]+)\./ ); return re ? ( rv = parseInt( re[2], 10 ), a.name = 'Chrome', rv ) : rv; }
					if ( b.safari ) { re = /AppleWebKit\/([\d.]+)/.exec( navigator.userAgent ); return re ? ( rv = parseFloat( re[1] ), a.name = 'Safari', rv ) : rv; }
					return rv;
				}( this, x ) : this.type === 'IE' ?/** Whether this browser type is IE (IE version < 9)*/ function ( a, b ) {
					let rv = -1, re;
					if ( b.ie ) { re = new RegExp( "MSIE ([0-9]{1,}[\.0-9]{0,})" ); return re.exec( ua ) !== null ? ( rv = parseFloat( RegExp.$1 ), a.name = 'IE', rv ) : rv; }
					return rv;
				}( this, x ) : this.type === 'Opera' ?/** Whether this browser type is Opera*/ function ( a, b ) {
					let rv = -1, re;
					if ( b.opera ) { try { rv = navigator.userAgent.match( /Version\/([1-9]+\.[0-9]{2})/ )[1]; a.name = 'Opera'; return rv; } catch ( ex ) { return rv; } }
				}( this, x ) : /** Undefined browser type define*/ -1;
			}.call( browser, rt2.info );
			/** Whether this browser version is support or not*/
			browser.support = function ( options ) {
				if ( typeof ( options ) !== 'object' )
					throw new Error("Invalid options defined instead of Object instance!!!");

				let shiftObj = Object.clone( options ); options = {};
				let fn = function (i, key) {
					for ( let j in shiftObj[i] ) {
						if ( !j ) continue;
						let keys = j;
						keys = keys.toLowerCase();
						options[key][keys] = shiftObj[i][j];
					}
				};
				for ( let i in shiftObj ) {
					if ( !i ) continue;
					let key = i; key = key.toLowerCase();
					options[key] = {};
					typeof ( shiftObj[i] ) === 'object' ? fn( i, key ) : undefined;
				};
				shiftObj = fn = undefined;
				let OS = Sow.OS ? ( Sow.OS ).toLowerCase() : undefined;
				let bn = this.name ? ( this.name ).toLowerCase() : '';
				this.required_version = options[OS][bn] ? options[OS][bn] : this.version;
				return !OS ? function () {
					return false;
				}() : !bn ? function () {
					return false;
				}() : function () {
					let msg = 'This application will not work properly in this browser. Please update your browser. Current browser information- ' + 'Name :' + this.name + '; Version: ' + this.version + '; Type: ' + this.type + '; OS :' + Sow.OS + '. Required virsion minimum ' + this.required_version + '.';
					return options[OS] && !options[OS][bn] ? ( this.support = true, { status: true } ) : this.version >= options[OS][bn] ? ( this.support = true, { status: true } ) : ( this.support = false, { status: false, msg: msg } );
				}.call( this/** Function inheritance*/ );
			};
			/** Export*/
			return function () {
				let s = browser; browser = rt2 = undefined;
				return s;
			}();
		} ).define( "Sow", function () {
			return {
				Data: (new this.Assembler() ).Create.Class( {
					export: function () {
						var Data = { map: {} };
						return {
							set: function ( mom, child, value ) {
								if ( mom && typeof ( mom ) === 'string' && child && typeof ( child ) === 'string' && value !== undefined ) {
									!Data.map[mom] ? ( Data.map[mom] = {} ) : undefined;
									!Data.map[mom][child] ? ( Data.map[mom][child] = {} ) : undefined;
									Data.map[mom][child] = value;
									return this;
								}
								if ( typeof (mom) === 'string' ) {
									let reset;
									!Data.map[mom] ? ( reset = false ) : ( reset = Data.map[mom] );
									if ( !reset ) {
										Data.map[mom] = child;
										return this;
									}
									if ( typeof ( child ) !== 'object' ) {
										Data.map[mom] = child;
										return this;
									}
									if ( typeof ( reset ) !== 'object' )
										throw new Error("Error defined!!! Should Fix!!!");

									for ( let i in child ) {
										reset[i] = child[i];
									}
									Data.map[mom] = reset; return this;
								}
								if ( typeof ( mom ) === 'string' )
									throw new Error( "Invalid instance defined instead of Object!!!" );

								for ( let i in mom ) Data.map[i] = mom[i];
								return this;
							},
							get: function ( mom, child, deep, deeper ) {
								if ( !mom ) { return Data.map; }
								if ( typeof mom === 'string' && !child ) {
									return Data.map[mom];
								}
								if ( mom !== undefined && child !== undefined && deep !== undefined && deeper !== undefined ) {
									return !Data.map[mom] ? undefined : !Data.map[mom][child] ? undefined : !Data.map[mom][child][deep] ? undefined : Data.map[mom][child][deep][deeper];
								}
								if ( typeof ( mom ) === 'object' && ( mom instanceof [].constructor ) ) {
									let out = {}; i = mom.length;
									while ( i-- ) {
										out[mom[i]] = Data.map[mom[i]];
									}
									return out;
								}
								if ( typeof ( child ) === 'object' && ( child instanceof [].constructor ) && mom && typeof mom === 'string' ) {
									if ( !Data.map[mom] ) { return Data.map; }
									let out = {}; i = child.length;
									while ( i-- ) {
										out[child[i]] = Data.map[mom[child[i]]];
									}
									return out;
								}
								return !child ? Data.map[mom] : mom && child ? ( !Data.map[mom] ? {} : Data.map[mom][child] ) : {};

							},
							push: function ( mom, child, value ) {
								if ( !mom || !child ) { return this; }
								if ( mom && child && value ) {
									!Data.map[mom] ? ( Data.map[mom] = {} ) : '';
									!Data.map[mom][child] ? ( Data.map[mom][child] = [] ) : '';
									Data.map[mom][child].push( value );
									return this;
								}
								if ( mom && child ) {
									!Data.map[mom] ? ( Data.map[mom] = [] ) : '';
									Data.map[mom].push( child );
									return this;
								}
							},
							clean: function () {
								Data.map = {}; return this;
							},
							clear: function ( name ) {
								Data.map[name] = {}; return this;
							}
						}
					}
				} )
			};
		} ).define( 'Sow.Task', function () {
			var _cb = function ( cb ) {
				return typeof ( cb ) !== 'function' ? function ( status ) {
					return;
				} : cb;
			};
			return ( new this.Assembler() ).Create.aggregate( function () {
				return {
					Await: this.aggregate( function () {

						var _await_worker = {
							StartNew: function ( wait ) {
								var _worker_ = {
									PARALLEL: function () {
										let C, maxInterVal; C = 0, maxInterVal = wait; /**(500x5ms)*/;
										let TASK = {};
										return {
											response: function ( name, type ) {
												TASK[name] = type;
												return this;
											},
											task: {
												set: function ( name, type ) {
													TASK[name] = type;
													return this;
												}
											},
											is: {
												complete: function ( callback ) {
													let result; console.log( C );
													C++;
													if ( C > maxInterVal ) {
														/** Prevent never-ending Intermission*/
														console.log( C ); C = 0; TASK = {};
														callback.call( _await_worker, 'ERROR', 'An error occurred, while we are annoying to load report definition. Please try again.' );
														return;
													}
													result = this.canExecute();
													if ( result === false ) {
														Sow.async(/**[Function]**/this.complete, /**[Delay]**/5, [/**[Instance]**/this, /**[Arguments]**/callback] );
														return;
													}
													if ( !result === 'ERROR' ) {
														if ( typeof ( callback ) !== 'function' ) {
															console.log( 'processor@isLoaded Callback is undefined in checkQuery...' );
															return;
														}
														Sow.async(/**[Function]**/callback, /**[Delay]**/0, [/**[Instance]**/{ Object: undefined }, /**[Arguments]**/'ERROR', 'An error occurred, while we are annoying to load report definition. Please try again.'] );
														return;
													}
													C = 0, TASK = {};
													if ( typeof ( callback ) !== 'function' ) {
														console.log( 'processor@isLoaded Callback is undefined in checkQuery...' );
														return;
													}
													Sow.async(/**[Function]**/callback, /**[Delay]**/0, [/**[Instance]**/{ Object: undefined }, /**[Arguments]**/'SUCCESS'] );
													return;
												},
												canExecute: function () {
													for ( let i in TASK ) {
														if ( TASK[i] === false ) {
															return false;
														}
														if ( TASK[i] === 'ERROR' ) {
															return 'ERROR';
														}
													}
													return true;
												},
											}
										}
									}()
								}
								return {
									execute: function ( fnc, task_number, cb ) {
										Sow.async( fnc.call( _await_worker, cb, task_number ), 5 );
										return this;
									},
									set: function ( task_number ) {
										_worker_.PARALLEL.task.set( task_number, false ); return this;
									},
									response: function ( task_number ) {
										_worker_.PARALLEL.response( task_number, true ); return this;
									},
									isComplete: function ( totaljob, cb ) {
										let what;
										what = _worker_.PARALLEL.is.canExecute();
										if ( what === true ) {
											cb.call( this, 'SUCCESS', totaljob ); return this;
										}
										if ( what === 'ERROR' ) {
											cb.call( this, 'ERROR', totaljob ); return this;
										}
										_worker_.PARALLEL.is.complete( function ( status ) {
											cb.call( this, 'SUCCESS', totaljob ); return;
										} );
										return this;
									}
								}
							},
							For: function ( parallelJob, len, action, wait, callback ) {
								return {
									execute: function () {
										Sow.async( function () {
											let _TASK_ = _await_worker.StartNew( wait );
											for ( var i = 0; i < parallelJob; i++ ) {
												_TASK_.set( i ).execute( function ( cb, task ) {
													for ( let x = parseInt( len * task / parallelJob ), _len = parseInt( len * ( task + 1 ) / parallelJob ); x < _len; x++ ) {
														action.call( this, x, task );
													}
													cb.call( this, task ); return;
												}, i, function ( task_num ) {
													if ( task_num !== ( parallelJob - 1 ) ) {
														_TASK_.response( task_num ); return;
													}
													_TASK_.response( task_num ).isComplete( parallelJob, callback );
													return;
												} );
											}
										}, 10 );
										return;
									}
								}
							},
							Job: function ( p_task, wait, instance, callback ) {
								return {
									execute: function () {
										Sow.async( function () {
											let task, parallelJob, _TASK_;
											task = [];
											for ( let x = 0, xlen = p_task.length; x < xlen; x++ ) {
												( typeof p_task[x] !== 'function' ?
													( console.warn( typeof ( p_task[x] ) + '\r\n type TASK not allowed on Parallel Job;' ) )
													: ( task.push( p_task[x] ) ) );
											}
											p_task = undefined;
											_TASK_ = _await_worker.StartNew( wait );
											for ( let i = 0, parallelJob = task.length; i < parallelJob; i++ ) {
												_TASK_.set( i ).execute( function ( cb, job_num ) {
													task[i].call( instance, function () {
														cb.call( this, job_num ); return;
													} );
													return;
												}, i, function ( task_num ) {
													if ( task_num !== ( parallelJob - 1 ) ) {
														_TASK_.response( task_num ); return;
													}
													_TASK_.response( task_num ).isComplete( parallelJob, callback );
													task = wait = instance = callback = undefined;
													return;
												} );
											}
											return;
										}, 0 );
										return;
									}
								}
							}
						}
						return {
							parallel: {
								For: function ( parallelJob, len ) {
									let action, callback, wait;
									return {
										wait: function ( _time ) {
											wait = _time;
											return this;
										},
										action: function ( _action ) {
											action = _action;
											return this;
										},
										afterComplete: function ( _callback ) {
											callback = _callback;
											return this;
										},
										For: function ( _parallelJob, _len ) {
											parallelJob = _parallelJob, len = _len;
											return this;
										},
										start: function () {
											_await_worker.For( parallelJob, len, _cb( action ),
												( typeof ( wait ) !== 'number' ? 500 : wait ), _cb( callback ) ).execute();
											parallelJob = len = action = callback = wait = undefined;
											return this;
										}
									}
								},
								job: function ( task ) {
									let callback, wait, _instance;
									return {
										with: function ( instance ) {
											_instance = instance;
											return this;
										},
										wait: function ( _time ) {
											wait = _time;
											return this;
										},
										afterComplete: function ( _callback ) {
											callback = _callback;
											return this;
										},
										start: function () {
											_await_worker.Job( task, wait, ( typeof ( _instance ) !== 'object' ? {} : _instance ),
												_cb( callback ) )
												.execute();
											callback = wait = _instance = undefined;
											return this;
										},
										job: function ( _task ) {
											task = _task;
											return this;
										}
									}
								}
							}
						}
					} ),
					parallel: this.aggregate( function () {
						var _TASK_ = {
							StartNew: function ( fnc, task_number ) {
								Sow.async( fnc.call( _TASK_, task_number ), 10 );
								return this;
							},
							For: function ( parallelJob, len, action ) {
								return {
									execute: function () {
										Sow.async( function () {
											for ( var i = 0; i < parallelJob; i++ ) {
												_TASK_.StartNew( function ( task ) {
													for ( let x = parseInt( len * task / parallelJob ), _len = parseInt( len * ( task + 1 ) / parallelJob ); x < _len; x++ ) {
														action.call( this, x, task );
													}
													return;
												}, i );
											}
											return;
										}, 10 );
										return;
									}
								}
							},
							Job: function ( task, instance ) {
								return {
									execute: function () {
										Sow.async( function () {
											let job; job = task.length;
											_TASK_.For( 10, job, function ( i ) {
												_TASK_.StartNew( function ( job_num ) {
													typeof task[i] !== 'function' ? console.log( typeof ( task[i] ) + '\r\nTask Num-' + job_num ) : task[i].call( instance, job_num );
													return;
												}, i );
												return;
											} ).execute();
											return;
										}, 10 );
										return;
									}
								}
							}
						}
						return {
							For: function ( parallelJob, len ) {
								let action;
								return {
									action: function ( _action ) {
										action = _action;
										return this;
									},
									For: function ( _parallelJob, _len ) {
										parallelJob = _parallelJob, len = _len;
										return this;
									},
									start: function () {
										_TASK_.For( parallelJob, len, _cb( action ) ).execute();
										parallelJob = len = action = undefined;
										return this;
									}
								}
							},
							job: function ( task ) {
								var _instance;
								return {
									with: function ( instance ) {
										_instance = instance;
										return this;
									},
									start: function () {
										_TASK_.Job( task, ( typeof ( _instance ) !== 'object' ? {} : _instance ) ).execute();
										task = _instance = undefined;
										return this;
									},
									job: function ( _task ) {
										task = _task;
										return this;
									}
								}
							}
						}
					} ),
					Async: this.aggregate( function () {
						var _ASYNC_WORKER = {
							For: function ( start, len, max, delay, action, afterComplete ) {
								action = _cb( action ); afterComplete = _cb( afterComplete );
								let request_object = {
									action: action,
									afterComplete: afterComplete
								};
								action = afterComplete = undefined;
								if ( typeof max !== 'number' ) {
									return {
										execute: function () {
											Sow.async( function () {
												for ( var i = start; i < len; i++ ) {
													request_object.action( i );
												}
												request_object.afterComplete( 'SUCCESS' );
												return;
											}, 0 );
											return;
										}
									}
								}
								return {
									execute: function () {
										let _MAX_ = max;
										Sow.async( function () {
											var _do = {
												task: function ( s ) {
													for ( let i = s; i < len; i++ ) {
														if ( i >= _MAX_ ) {
															_MAX_ += max;
															Sow.async( function () {
																_do.task( i ); return;
															}, delay );
															return;
														}
														request_object.action( i );
													}
													request_object.afterComplete( 'SUCCESS' ); request_object = undefined;
													return;
												}
											}
											_do.task( start );
											return;
										}, 0 );
										return;
									}
								}
							}
						}
						return {
							For: function () {
								let start, len, max, action, afterComplete, hasError, delay;
								/**INITIALIZE*/
								return {
									/**MAX STACK BUNDLE LENGTH*/
									maxStack: function ( _max ) {
										max = typeof ( _max ) !== 'number' ? undefined : _max;
										return this;
									},
									/**EACH STACK BUNDLE DELAY*/
									stackDelay: function ( _delay ) {
										delay = _delay;
										return this;
									},
									/**LOOP LENGTH*/
									length: function ( _len ) {
										if ( typeof ( _len ) !== 'number' ) {
											console.log( 'Invalid For Length define in webcontrol.instance.Task.Async.For..! \r\n Length type ' + typeof ( _len ) + ';' );
											return;
										}
										len = _len; return this;
									},
									/**EACH INCREMENT*/
									action: function ( _action ) {
										action = _cb( _action );
										return this;
									},
									/**AFTER COMPLETE*/
									afterComplete: function ( _callback ) {
										afterComplete = _cb( _callback );
										return this;
									},
									/**START FROM INCREMENT & EXECUTE*/
									start: function ( _start ) {
										start = typeof _start !== 'number' ? 0 : _start;
										if ( typeof ( len ) !== 'number' ) {
											console.log( 'Invalid For Length define in webcontrol.instance.Task.Async.For..! \r\n Length type ' + typeof _len + '; \r\n Caller is `' + arguments.callee.caller.name + '`\r\n..' + arguments.callee.caller.toString() );
											return;
										}
										delay = typeof ( delay ) !== 'number' ? 0 : delay;
										_ASYNC_WORKER.For( start, len, max, delay, action, afterComplete ).execute();
										start = len = max = action = afterComplete = delay = undefined;
										return this;
									},
									/**RE-INITIALIZE*/
									For: function () {
										start = len = max = action = afterComplete = hasError = delay = undefined;
										return this;
									},
								}
							}
						}
					} ),
					instance: function () {
						var t_info = {

						};
						return {
							register: function ( name ) {
								t_info[name] = false;
								return this;
							},
							complete: function ( name ) {
								t_info[name] = true;
								return this;
							},
							start: function () {

								return this;
							},
							exit: function ( t ) {
								for ( var i in t_info ) {
									if ( t_info[i] === false ) {
										return false;
									}
								}
								t_info = {};
								if ( t === false ) {
									return true;
								}
								return true;
							}
						};
					},
					sequential: this.aggregate( function () {
						return {
							initialize: function () {
								let _TASK_ = [], isFirst = true;
								return {
									create: function ( fn, d ) {
										_TASK_.push( function ( cb, inst ) {
											Sow.async( function ( wi ) {
												typeof ( fn ) === 'function' ? fn.call( wi ) : '';
												wi = undefined;
												typeof ( cb ) === 'function' ? cb.call( inst ) : '';
												inst = undefined;
												return;
											}, ( typeof d !== 'number' ? 0 : d ), [this] );
										} );
										return this;
									},
									execute: function ( cb, inst ) {
										let task = _TASK_.shift();
										isFirst ? ( isFirst = false, typeof inst !== 'object' ? inst = {
											result: function ( s ) {
												console.warn( s );
											}
										} : undefined ) : ( undefined );
										if ( typeof task !== 'function' ) {
											this.execute( cb, inst );
											return;
										}
										task.call( inst, function () {
											if ( _TASK_.length > 0 ) {
												this.execute( cb, inst );
												return;
											}
											typeof ( cb ) !== 'function' ? '' : cb.call( inst, "SUCCESS" );
											inst = cb = _TASK_ = isFirst = undefined;
											return;
										}, this );
										task = undefined;
										return this;
									}
								};
							}
						};
					} )
				}
			} )
		} );

	try {
		if ( 'DOMParser' in window ) {
			// WebKit returns null on unsupported types
			if ( ( new DOMParser() ).parseFromString( "", "text/html" ) ) {
				// text/html parsing is natively supported
			}
		} else {
			throw new Error( "DomParser Not Supported" );
		}
		
	} catch ( ex ) {
		console.log( ex.message );
		Sow.define( '', function () {
			var proto, nativeParse;
			if ( typeof ( window.DOMParser ) === 'function' ) {
				proto = DOMParser.prototyp;
				nativeParse = proto.parseFromString;
				if ( typeof ( nativeParse ) !== 'function' ) {
					nativeParse = function ( markup, type ) {
						throw new Error( 'Not Supported! :(' );
					}
				}
			} else {
				nativeParse = function ( markup, type ) {
					throw new Error( 'Not Supported! :(' );
				}
			};
			return {
				DOMParser: ( new this.Assembler() ).Create.Class( function () {
					return {
						constructor: function () {
							/**[Constructor Body]*/
						},
						parseFromString: function ( markup, type ) {
							if ( /^\s*text\/html\s*(?:;|$)/i.test( type ) ) {
								var
									doc = document.implementation.createHTMLDocument( "" )
									;
								if ( markup.toLowerCase().indexOf( '<!doctype' ) > -1 ) {
									doc.documentElement.innerHTML = markup;
								}
								else {
									doc.body.innerHTML = markup;
								}
								return doc;
							} else {
								return nativeParse.apply( this, arguments );
							}
						}
					}
				} )
			};
		} );
	};
} ) );
