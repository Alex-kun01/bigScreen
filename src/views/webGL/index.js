import Vue from 'vue'
let _this = new Vue()

function webgl (domId){
    let THREE = _this.$Three


    THREE.MapControls = function ( object, domElement ) {

        this.object = object;
    
        this.domElement = ( domElement !== undefined ) ? domElement : document;
    
        // Set to false to disable this control
        this.enabled = true;
    
        // "target" sets the location of focus, where the object orbits around
        this.target = new THREE.Vector3();
    
        // How far you can dolly in and out ( PerspectiveCamera only )
        this.minDistance = 0;
        this.maxDistance = Infinity;
    
        // How far you can zoom in and out ( OrthographicCamera only )
        this.minZoom = 0;
        this.maxZoom = Infinity;
    
        // How far you can orbit vertically, upper and lower limits.
        // Range is 0 to Math.PI radians.
        this.minPolarAngle = 0; // radians
        this.maxPolarAngle = Math.PI; // radians
    
        // How far you can orbit horizontally, upper and lower limits.
        // If set, must be a sub-interval of the interval [ - Math.PI, Math.PI ].
        this.minAzimuthAngle = - Infinity; // radians
        this.maxAzimuthAngle = Infinity; // radians
    
        // Set to true to enable damping (inertia)
        // If damping is enabled, you must call controls.update() in your animation loop
        this.enableDamping = false;
        this.dampingFactor = 0.25;
    
        // This option actually enables dollying in and out; left as "zoom" for backwards compatibility.
        // Set to false to disable zooming
        this.enableZoom = true;
        this.zoomSpeed = 1.0;
    
        // Set to false to disable rotating
        this.enableRotate = true;
        this.rotateSpeed = 1.0;
    
        // Set to false to disable panning
        this.enablePan = true;
        this.panSpeed = 1.0;
        this.screenSpacePanning = false; // if true, pan in screen-space
        this.keyPanSpeed = 7.0;	// pixels moved per arrow key push
    
        // Set to true to automatically rotate around the target
        // If auto-rotate is enabled, you must call controls.update() in your animation loop
        this.autoRotate = false;
        this.autoRotateSpeed = 2.0; // 30 seconds per round when fps is 60
    
        // Set to false to disable use of the keys
        this.enableKeys = true;
    
        // The four arrow keys
        this.keys = { LEFT: 37, UP: 38, RIGHT: 39, BOTTOM: 40 };
    
        // Mouse buttons
        this.mouseButtons = { LEFT: THREE.MOUSE.LEFT, MIDDLE: THREE.MOUSE.MIDDLE, RIGHT: THREE.MOUSE.RIGHT };
    
        // for reset
        this.target0 = this.target.clone();
        this.position0 = this.object.position.clone();
        this.zoom0 = this.object.zoom;
    
        //
        // public methods
        //
    
        this.getPolarAngle = function () {
    
            return spherical.phi;
    
        };
    
        this.getAzimuthalAngle = function () {
    
            return spherical.theta;
    
        };
    
        this.saveState = function () {
    
            scope.target0.copy( scope.target );
            scope.position0.copy( scope.object.position );
            scope.zoom0 = scope.object.zoom;
    
        };
    
        this.reset = function () {
    
            scope.target.copy( scope.target0 );
            scope.object.position.copy( scope.position0 );
            scope.object.zoom = scope.zoom0;
    
            scope.object.updateProjectionMatrix();
            scope.dispatchEvent( changeEvent );
    
            scope.update();
    
            state = STATE.NONE;
    
        };
        this.checkEdge = function(camera){
            var min_x = -2400, max_x = 2400, min_z = -2400, max_z = 2400;
            var reset_x = false, reset_z = false;
            var half_height = camera.position.y * Math.tan( ( camera.fov / 2 ) * Math.PI / 180.0 );
            var half_width = half_height * camera.aspect;
            var left = camera.position.x - half_width;
            var right = camera.position.x + half_width;
            var top = camera.position.z - half_height;
            var bottom = camera.position.z + half_height;
    
            //
            if(left < min_x){
                reset_x = min_x + half_width;
    
            }else if(right > max_x){
                reset_x = max_x - half_width;
            }
            if(top < min_z){
                reset_z = min_z + half_height;
    
            }else if(bottom > max_x){
                reset_z = max_z - half_height;
            }
            //
            if(reset_x !== false){
                camera.position.x = reset_x;
            }
            if(reset_z !== false){
                camera.position.z = reset_z;
            }
            return camera.position;
        };
        // this method is exposed, but perhaps it would be better if we can make it private...
        this.update = function () {
    
            var offset = new THREE.Vector3();
    
            // so camera.up is the orbit axis
            var quat = new THREE.Quaternion().setFromUnitVectors( object.up, new THREE.Vector3( 0, 1, 0 ) );
            var quatInverse = quat.clone().inverse();
    
            var lastPosition = new THREE.Vector3();
            var lastQuaternion = new THREE.Quaternion();
    
            return function update() {
    
                var point = this.checkEdge(scope.object);
    
                scope.target.x = point.x;
                scope.target.z = point.z;
                scope.object.position.x = point.x;
                scope.object.position.z = point.z;
    
                var position = scope.object.position;
    
                offset.copy( position ).sub( scope.target );
    
                // rotate offset to "y-axis-is-up" space
                offset.applyQuaternion( quat );
    
                // angle from z-axis around y-axis
                spherical.setFromVector3( offset );
    
                if ( scope.autoRotate && state === STATE.NONE ) {
    
                    rotateLeft( getAutoRotationAngle() );
    
                }
    
                spherical.theta += sphericalDelta.theta;
                spherical.phi += sphericalDelta.phi;
    
                // restrict theta to be between desired limits
                spherical.theta = Math.max( scope.minAzimuthAngle, Math.min( scope.maxAzimuthAngle, spherical.theta ) );
    
                // restrict phi to be between desired limits
                spherical.phi = Math.max( scope.minPolarAngle, Math.min( scope.maxPolarAngle, spherical.phi ) );
    
                spherical.makeSafe();
    
    
                spherical.radius *= scale;
    
                // restrict radius to be between desired limits
                spherical.radius = Math.max( scope.minDistance, Math.min( scope.maxDistance, spherical.radius ) );
    
                // move target to panned location
                scope.target.add( panOffset );
    
                offset.setFromSpherical( spherical );
    
                // rotate offset back to "camera-up-vector-is-up" space
                offset.applyQuaternion( quatInverse );
    
                position.copy( scope.target ).add( offset );
    
                scope.object.lookAt( scope.target );
    
                if ( scope.enableDamping === true ) {
    
                    sphericalDelta.theta *= ( 1 - scope.dampingFactor );
                    sphericalDelta.phi *= ( 1 - scope.dampingFactor );
    
                    panOffset.multiplyScalar( 1 - scope.dampingFactor );
    
                } else {
    
                    sphericalDelta.set( 0, 0, 0 );
    
                    panOffset.set( 0, 0, 0 );
    
                }
    
                scale = 1;
    
                // update condition is:
                // min(camera displacement, camera rotation in radians)^2 > EPS
                // using small-angle approximation cos(x/2) = 1 - x^2 / 8
    
                if ( zoomChanged ||
                    lastPosition.distanceToSquared( scope.object.position ) > EPS ||
                    8 * ( 1 - lastQuaternion.dot( scope.object.quaternion ) ) > EPS ) {
    
                    scope.dispatchEvent( changeEvent );
    
                    lastPosition.copy( scope.object.position );
                    lastQuaternion.copy( scope.object.quaternion );
                    zoomChanged = false;
    
                    return true;
    
                }
    
                return false;
    
            };
    
        }();
    
        this.dispose = function () {
    
            scope.domElement.removeEventListener( 'contextmenu', onContextMenu, false );
            scope.domElement.removeEventListener( 'mousedown', onMouseDown, false );
            scope.domElement.removeEventListener( 'wheel', onMouseWheel, false );
    
            scope.domElement.removeEventListener( 'touchstart', onTouchStart, false );
            scope.domElement.removeEventListener( 'touchend', onTouchEnd, false );
            scope.domElement.removeEventListener( 'touchmove', onTouchMove, false );
    
            document.removeEventListener( 'mousemove', onMouseMove, false );
            document.removeEventListener( 'mouseup', onMouseUp, false );
    
            window.removeEventListener( 'keydown', onKeyDown, false );
    
            //scope.dispatchEvent( { type: 'dispose' } ); // should this be added here?
    
        };
    
        //
        // internals
        //
    
        var scope = this;
    
        var changeEvent = { type: 'change' };
        var startEvent = { type: 'start' };
        var endEvent = { type: 'end' };
    
        var STATE = {
            NONE: 0,
            ROTATE_UP: 1,
            ROTATE_LEFT: 2,
            ROTATE: 3, // ROTATE_UP | ROTATE_LEFT
            DOLLY: 4,
            DOLLY_ROTATE: 7, // ROTATE | DOLLY
            PAN: 8,
            DOLLY_PAN: 12, // DOLLY | PAN
        };
    
        var state = STATE.NONE;
    
        var EPS = 0.000001;
    
        // current position in spherical coordinates
        var spherical = new THREE.Spherical();
        var sphericalDelta = new THREE.Spherical();
    
        var scale = 1;
        var panOffset = new THREE.Vector3();
        var zoomChanged = false;
    
        var rotateStart = new THREE.Vector2();
        var rotateStart2 = new THREE.Vector2();
        var rotateEnd = new THREE.Vector2();
        var rotateEnd2 = new THREE.Vector2();
        var rotateDelta = new THREE.Vector2();
        var rotateDelta2 = new THREE.Vector2();
        var rotateDeltaStartFingers = new THREE.Vector2();
        var rotateDeltaEndFingers = new THREE.Vector2();
    
        var panStart = new THREE.Vector2();
        var panEnd = new THREE.Vector2();
        var panDelta = new THREE.Vector2();
    
        var dollyStart = new THREE.Vector2();
        var dollyEnd = new THREE.Vector2();
        var dollyDelta = new THREE.Vector2();
    
        function getAutoRotationAngle() {
    
            return 2 * Math.PI / 60 / 60 * scope.autoRotateSpeed;
    
        }
    
        function getZoomScale() {
    
            return Math.pow( 0.95, scope.zoomSpeed );
    
        }
    
        function rotateLeft( angle ) {
    
            sphericalDelta.theta -= angle;
    
        }
    
        function rotateUp( angle ) {
    
            sphericalDelta.phi -= angle;
    
        }
    
        var panLeft = function () {
    
            var v = new THREE.Vector3();
    
            return function panLeft( distance, objectMatrix ) {
    
                v.setFromMatrixColumn( objectMatrix, 0 ); // get X column of objectMatrix
                v.multiplyScalar( - distance );
    
                panOffset.add( v );
    
            };
    
        }();
    
        var panUp = function () {
    
            var v = new THREE.Vector3();
    
            return function panUp( distance, objectMatrix ) {
    
                if ( scope.screenSpacePanning === true ) {
    
                    v.setFromMatrixColumn( objectMatrix, 1 );
    
                } else {
    
                    v.setFromMatrixColumn( objectMatrix, 0 );
                    v.crossVectors( scope.object.up, v );
    
                }
    
                v.multiplyScalar( distance );
    
                panOffset.add( v );
    
            };
    
        }();
    
        // deltaX and deltaY are in pixels; right and down are positive
        var pan = function () {
    
            var offset = new THREE.Vector3();
    
            return function pan( deltaX, deltaY ) {
    
                var element = scope.domElement === document ? scope.domElement.body : scope.domElement;
    
                if ( scope.object.isPerspectiveCamera ) {
    
                    // perspective
                    var position = scope.object.position;
                    offset.copy( position ).sub( scope.target );
                    var targetDistance = offset.length();
    
                    // half of the fov is center to top of screen
                    targetDistance *= Math.tan( ( scope.object.fov / 2 ) * Math.PI / 180.0 );
    
                    // we use only clientHeight here so aspect ratio does not distort speed
                    panLeft( 2 * deltaX * targetDistance / element.clientHeight, scope.object.matrix );
                    panUp( 2 * deltaY * targetDistance / element.clientHeight, scope.object.matrix );
    
                } else if ( scope.object.isOrthographicCamera ) {
    
                    // orthographic
                    panLeft( deltaX * ( scope.object.right - scope.object.left ) / scope.object.zoom / element.clientWidth, scope.object.matrix );
                    panUp( deltaY * ( scope.object.top - scope.object.bottom ) / scope.object.zoom / element.clientHeight, scope.object.matrix );
    
                } else {
    
                    // camera neither orthographic nor perspective
                    console.warn( 'WARNING: MapControls.js encountered an unknown camera type - pan disabled.' );
                    scope.enablePan = false;
    
                }
    
            };
    
        }();
    
        function dollyIn( dollyScale ) {
    
            if ( scope.object.isPerspectiveCamera ) {
    
                scale /= dollyScale;
    
            } else if ( scope.object.isOrthographicCamera ) {
    
                scope.object.zoom = Math.max( scope.minZoom, Math.min( scope.maxZoom, scope.object.zoom * dollyScale ) );
                scope.object.updateProjectionMatrix();
                zoomChanged = true;
    
            } else {
    
                console.warn( 'WARNING: MapControls.js encountered an unknown camera type - dolly/zoom disabled.' );
                scope.enableZoom = false;
    
            }
    
        }
    
        function dollyOut( dollyScale ) {
    
            if ( scope.object.isPerspectiveCamera ) {
    
                scale *= dollyScale;
    
            } else if ( scope.object.isOrthographicCamera ) {
    
                scope.object.zoom = Math.max( scope.minZoom, Math.min( scope.maxZoom, scope.object.zoom / dollyScale ) );
                scope.object.updateProjectionMatrix();
                zoomChanged = true;
    
            } else {
    
                console.warn( 'WARNING: MapControls.js encountered an unknown camera type - dolly/zoom disabled.' );
                scope.enableZoom = false;
    
            }
    
        }
    
        //
        // event callbacks - update the object state
        //
    
        function handleMouseDownRotate( event ) {
    
            //console.log( 'handleMouseDownRotate' );
    
            rotateStart.set( event.clientX, event.clientY );
    
        }
    
        function handleMouseDownDolly( event ) {
    
            //console.log( 'handleMouseDownDolly' );
    
            dollyStart.set( event.clientX, event.clientY );
    
        }
    
        function handleMouseDownPan( event ) {
    
            //console.log( 'handleMouseDownPan' );
    
            panStart.set( event.clientX, event.clientY );
    
        }
    
        function handleMouseMoveRotate( event ) {
    
            //console.log( 'handleMouseMoveRotate' );
    
            rotateEnd.set( event.clientX, event.clientY );
    
            rotateDelta.subVectors( rotateEnd, rotateStart ).multiplyScalar( scope.rotateSpeed );
    
            var element = scope.domElement === document ? scope.domElement.body : scope.domElement;
    
            rotateLeft( 2 * Math.PI * rotateDelta.x / element.clientHeight ); // yes, height
    
            rotateUp( 2 * Math.PI * rotateDelta.y / element.clientHeight );
    
            rotateStart.copy( rotateEnd );
    
            scope.update();
    
        }
    
        function handleMouseMoveDolly( event ) {
    
            //console.log( 'handleMouseMoveDolly' );
    
            dollyEnd.set( event.clientX, event.clientY );
    
            dollyDelta.subVectors( dollyEnd, dollyStart );
    
            if ( dollyDelta.y > 0 ) {
    
                dollyIn( getZoomScale() );
    
            } else if ( dollyDelta.y < 0 ) {
    
                dollyOut( getZoomScale() );
    
            }
    
            dollyStart.copy( dollyEnd );
    
            scope.update();
    
        }
    
        function handleMouseMovePan( event ) {
            //console.log( 'handleMouseMovePan' );
            panEnd.set( event.clientX, event.clientY );
            panDelta.subVectors( panEnd, panStart ).multiplyScalar( scope.panSpeed );
            pan( panDelta.x, panDelta.y );
            panStart.copy( panEnd );
            scope.update();
        }
    
        function handleMouseUp( event ) {
    
            // console.log( 'handleMouseUp' );
    
        }
    
        function handleMouseWheel( event ) {
    
            // console.log( 'handleMouseWheel' );
    
            if ( event.deltaY < 0 ) {
    
                dollyOut( getZoomScale() );
    
            } else if ( event.deltaY > 0 ) {
    
                dollyIn( getZoomScale() );
    
            }
    
            scope.update();
    
        }
    
        function handleKeyDown( event ) {
    
            //console.log( 'handleKeyDown' );
    
            switch ( event.keyCode ) {
    
                case scope.keys.UP:
                    pan( 0, scope.keyPanSpeed );
                    scope.update();
                    break;
    
                case scope.keys.BOTTOM:
                    pan( 0, - scope.keyPanSpeed );
                    scope.update();
                    break;
    
                case scope.keys.LEFT:
                    pan( scope.keyPanSpeed, 0 );
                    scope.update();
                    break;
    
                case scope.keys.RIGHT:
                    pan( - scope.keyPanSpeed, 0 );
                    scope.update();
                    break;
    
            }
    
        }
    
        function handleTouchStartRotate( event ) {
    
            // console.log( 'handleTouchStartRotate' );
    
            // First finger
            rotateStart.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );
    
            // Second finger
            rotateStart2.set( event.touches[ 1 ].pageX, event.touches[ 1 ].pageY );
    
        }
    
        function handleTouchStartDolly( event ) {
    
            if ( scope.enableZoom ) {
    
                // console.log( 'handleTouchStartDolly' );
    
                var dx = event.touches[ 0 ].pageX - event.touches[ 1 ].pageX;
                var dy = event.touches[ 0 ].pageY - event.touches[ 1 ].pageY;
    
                var distance = Math.sqrt( dx * dx + dy * dy );
    
                dollyStart.set( 0, distance );
    
            }
    
        }
    
        function handleTouchStartPan( event ) {
    
            if ( scope.enablePan ) {
    
                // console.log( 'handleTouchStartPan' );
    
                panStart.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );
    
            }
    
        }
    
        function handleTouchMoveRotate( event ) {
    
            if ( scope.enableRotate === false ) return;
            if ( ( state & STATE.ROTATE ) === 0 ) return;
    
            // First finger
            rotateEnd.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );
    
            // Second finger
            rotateEnd2.set( event.touches[ 1 ].pageX, event.touches[ 1 ].pageY );
    
            rotateDelta.subVectors( rotateEnd, rotateStart );
            rotateDelta2.subVectors( rotateEnd2, rotateStart2 );
            rotateDeltaStartFingers.subVectors( rotateStart2, rotateStart );
            rotateDeltaEndFingers.subVectors( rotateEnd2, rotateEnd );
    
            if ( isRotateUp() ) {
    
                var element = scope.domElement === document ? scope.domElement.body : scope.domElement;
    
                // rotating up and down along whole screen attempts to go 360, but limited to 180
                rotateUp( 2 * Math.PI * rotateDelta.y / element.clientHeight );
    
                // Start rotateUp ==> disable all movement to prevent flickering
                state = STATE.ROTATE_UP;
    
            } else if ( ( state & STATE.ROTATE_LEFT ) !== 0 ) {
    
                rotateLeft( ( rotateDeltaStartFingers.angle() - rotateDeltaEndFingers.angle() ) * scope.rotateSpeed );
    
            }
    
            rotateStart.copy( rotateEnd );
            rotateStart2.copy( rotateEnd2 );
    
        }
    
        function isRotateUp() {
    
            // At start, does the two fingers are aligned horizontally
            if ( ! isHorizontal( rotateDeltaStartFingers ) ) {
    
                return false;
    
            }
    
            // At end, does the two fingers are aligned horizontally
            if ( ! isHorizontal( rotateDeltaEndFingers ) ) {
    
                return false;
    
            }
    
            // does the first finger moved vertically between start and end
            if ( ! isVertical( rotateDelta ) ) {
    
                return false;
    
            }
    
            // does the second finger moved vertically between start and end
            if ( ! isVertical( rotateDelta2 ) ) {
    
                return false;
    
            }
    
            // Does the two finger moved in the same direction (prevent moving one finger vertically up while the other goes down)
            return rotateDelta.dot( rotateDelta2 ) > 0;
    
        }
    
        var isHorizontal = function () {
    
            var precision = Math.sin( Math.PI / 6 );
    
            return function isHorizontal( vector ) {
    
                return Math.abs( Math.sin( vector.angle() ) ) < precision;
    
            };
    
        }();
    
        var isVertical = function () {
    
            var precision = Math.cos( Math.PI / 2 - Math.PI / 6 );
    
            return function isVertical( vector ) {
    
                return Math.abs( Math.cos( vector.angle() ) ) < precision;
    
            };
    
        }();
    
        function handleTouchMoveDolly( event ) {
    
            if ( scope.enableZoom === false ) return;
            if ( ( state & STATE.DOLLY ) === 0 ) return;
    
            // console.log( 'handleTouchMoveDolly' );
    
            var dx = event.touches[ 0 ].pageX - event.touches[ 1 ].pageX;
            var dy = event.touches[ 0 ].pageY - event.touches[ 1 ].pageY;
    
            var distance = Math.sqrt( dx * dx + dy * dy );
    
            dollyEnd.set( 0, distance );
    
            dollyDelta.set( 0, Math.pow( dollyEnd.y / dollyStart.y, scope.zoomSpeed ) );
    
            dollyIn( dollyDelta.y );
    
            dollyStart.copy( dollyEnd );
    
        }
    
        function handleTouchMovePan( event ) {
    
            if ( scope.enablePan === false ) return;
            if ( ( state & STATE.PAN ) === 0 ) return;
    
            // console.log( 'handleTouchMovePan' );
    
            panEnd.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );
    
            panDelta.subVectors( panEnd, panStart ).multiplyScalar( scope.panSpeed );
    
            pan( panDelta.x, panDelta.y );
    
            panStart.copy( panEnd );
    
        }
    
        function handleTouchEnd( event ) {
    
            //console.log( 'handleTouchEnd' );
    
        }
    
        //
        // event handlers - FSM: listen for events and reset state
        //
    
        function onMouseDown( event ) {
    
            if ( scope.enabled === false ) return;
    
            event.preventDefault();
    
            switch ( event.button ) {
    
                case scope.mouseButtons.LEFT:
    
                    if ( event.ctrlKey || event.metaKey || event.shiftKey ) {
    
                        if ( scope.enableRotate === false ) return;
    
                        handleMouseDownRotate( event );
    
                        state = STATE.ROTATE;
    
                    } else {
    
                        if ( scope.enablePan === false ) return;
    
                        handleMouseDownPan( event );
    
                        state = STATE.PAN;
    
                    }
    
                    break;
    
                case scope.mouseButtons.MIDDLE:
    
                    if ( scope.enableZoom === false ) return;
    
                    handleMouseDownDolly( event );
    
                    state = STATE.DOLLY;
    
                    break;
    
                case scope.mouseButtons.RIGHT:
    
                    if ( scope.enableRotate === false ) return;
    
                    handleMouseDownRotate( event );
    
                    state = STATE.ROTATE;
    
                    break;
    
            }
    
            if ( state !== STATE.NONE ) {
    
                document.addEventListener( 'mousemove', onMouseMove, false );
                document.addEventListener( 'mouseup', onMouseUp, false );
    
                scope.dispatchEvent( startEvent );
    
            }
    
        }
    
        function onMouseMove( event ) {
    
            if ( scope.enabled === false ) return;
    
            event.preventDefault();
    
            switch ( state ) {
    
                case STATE.ROTATE:
    
                    if ( scope.enableRotate === false ) return;
    
                    handleMouseMoveRotate( event );
    
                    break;
    
                case STATE.DOLLY:
    
                    if ( scope.enableZoom === false ) return;
    
                    handleMouseMoveDolly( event );
    
                    break;
    
                case STATE.PAN:
    
                    if ( scope.enablePan === false ) return;
    
                    handleMouseMovePan( event );
    
                    break;
    
            }
    
        }
    
        function onMouseUp( event ) {
    
            if ( scope.enabled === false ) return;
    
            handleMouseUp( event );
    
            document.removeEventListener( 'mousemove', onMouseMove, false );
            document.removeEventListener( 'mouseup', onMouseUp, false );
    
            scope.dispatchEvent( endEvent );
    
            state = STATE.NONE;
    
        }
    
        function onMouseWheel( event ) {
    
            if ( scope.enabled === false || scope.enableZoom === false || ( state !== STATE.NONE && state !== STATE.ROTATE ) ) return;
    
            event.preventDefault();
            event.stopPropagation();
    
            scope.dispatchEvent( startEvent );
    
            handleMouseWheel( event );
    
            scope.dispatchEvent( endEvent );
    
        }
    
        function onKeyDown( event ) {
    
            if ( scope.enabled === false || scope.enableKeys === false || scope.enablePan === false ) return;
    
            handleKeyDown( event );
    
        }
    
        function onTouchStart( event ) {
    
            if ( scope.enabled === false ) return;
    
            event.preventDefault();
    
            switch ( event.touches.length ) {
    
                case 1:	// one-fingered touch: pan
    
                    if ( scope.enablePan === false ) return;
    
                    handleTouchStartPan( event );
    
                    state = STATE.PAN;
    
                    break;
    
                case 2:	// two-fingered touch: rotate-dolly
    
                    if ( scope.enableZoom === false && scope.enableRotate === false ) return;
    
                    handleTouchStartRotate( event );
                    handleTouchStartDolly( event );
    
                    state = STATE.DOLLY_ROTATE;
    
                    break;
    
                default:
    
                    state = STATE.NONE;
    
            }
    
            if ( state !== STATE.NONE ) {
    
                scope.dispatchEvent( startEvent );
    
            }
    
        }
    
        function onTouchMove( event ) {
    
            if ( scope.enabled === false ) return;
    
            event.preventDefault();
            event.stopPropagation();
    
            switch ( event.touches.length ) {
    
                case 1: // one-fingered touch: pan
    
                    if ( scope.enablePan === false ) return;
                    if ( state !== STATE.PAN ) return; // is this needed?
    
                    handleTouchMovePan( event );
    
                    scope.update();
    
                    break;
    
                case 2: // two-fingered touch: rotate-dolly
    
                    if ( scope.enableZoom === false && scope.enableRotate === false ) return;
                    if ( ( state & STATE.DOLLY_ROTATE ) === 0 ) return; // is this needed?
    
                    handleTouchMoveRotate( event );
                    handleTouchMoveDolly( event );
    
                    scope.update();
    
                    break;
    
                default:
    
                    state = STATE.NONE;
    
            }
    
        }
    
        function onTouchEnd( event ) {
    
            if ( scope.enabled === false ) return;
    
            handleTouchEnd( event );
    
            scope.dispatchEvent( endEvent );
    
            state = STATE.NONE;
    
        }
    
        function onContextMenu( event ) {
    
            if ( scope.enabled === false ) return;
    
            event.preventDefault();
    
        }
    
        //
    
        scope.domElement.addEventListener( 'contextmenu', onContextMenu, false );
    
        scope.domElement.addEventListener( 'mousedown', onMouseDown, false );
        scope.domElement.addEventListener( 'wheel', onMouseWheel, false );
    
        scope.domElement.addEventListener( 'touchstart', onTouchStart, false );
        scope.domElement.addEventListener( 'touchend', onTouchEnd, false );
        scope.domElement.addEventListener( 'touchmove', onTouchMove, false );
    
        window.addEventListener( 'keydown', onKeyDown, false );
    
        // force an update at start
    
        this.update();
    
    };
    
    THREE.MapControls.prototype = Object.create( THREE.EventDispatcher.prototype );
    THREE.MapControls.prototype.constructor = THREE.MapControls;
    
    Object.defineProperties( THREE.MapControls.prototype, {
    
        center: {
    
            get: function () {
    
                console.warn( 'THREE.MapControls: .center has been renamed to .target' );
                return this.target;
    
            }
    
        },
    
        // backward compatibility
    
        noZoom: {
    
            get: function () {
    
                console.warn( 'THREE.MapControls: .noZoom has been deprecated. Use .enableZoom instead.' );
                return ! this.enableZoom;
    
            },
    
            set: function ( value ) {
    
                console.warn( 'THREE.MapControls: .noZoom has been deprecated. Use .enableZoom instead.' );
                this.enableZoom = ! value;
    
            }
    
        },
    
        noRotate: {
    
            get: function () {
    
                console.warn( 'THREE.MapControls: .noRotate has been deprecated. Use .enableRotate instead.' );
                return ! this.enableRotate;
    
            },
    
            set: function ( value ) {
    
                console.warn( 'THREE.MapControls: .noRotate has been deprecated. Use .enableRotate instead.' );
                this.enableRotate = ! value;
    
            }
    
        },
    
        noPan: {
    
            get: function () {
    
                console.warn( 'THREE.MapControls: .noPan has been deprecated. Use .enablePan instead.' );
                return ! this.enablePan;
    
            },
    
            set: function ( value ) {
    
                console.warn( 'THREE.MapControls: .noPan has been deprecated. Use .enablePan instead.' );
                this.enablePan = ! value;
    
            }
    
        },
    
        noKeys: {
    
            get: function () {
    
                console.warn( 'THREE.MapControls: .noKeys has been deprecated. Use .enableKeys instead.' );
                return ! this.enableKeys;
    
            },
    
            set: function ( value ) {
    
                console.warn( 'THREE.MapControls: .noKeys has been deprecated. Use .enableKeys instead.' );
                this.enableKeys = ! value;
    
            }
    
        },
    
        staticMoving: {
    
            get: function () {
    
                console.warn( 'THREE.MapControls: .staticMoving has been deprecated. Use .enableDamping instead.' );
                return ! this.enableDamping;
    
            },
    
            set: function ( value ) {
    
                console.warn( 'THREE.MapControls: .staticMoving has been deprecated. Use .enableDamping instead.' );
                this.enableDamping = ! value;
    
            }
    
        },
    
        dynamicDampingFactor: {
    
            get: function () {
    
                console.warn( 'THREE.MapControls: .dynamicDampingFactor has been renamed. Use .dampingFactor instead.' );
                return this.dampingFactor;
    
            },
    
            set: function ( value ) {
    
                console.warn( 'THREE.MapControls: .dynamicDampingFactor has been renamed. Use .dampingFactor instead.' );
                this.dampingFactor = value;
    
            }
    
        }
    
    } );

//地图
// if ( WEBGL.isWebGLAvailable() === false ) {
//     document.getElementById("mapGL").appendChild( WEBGL.getWebGLErrorMessage() );
// }

var camera, controls, scene, renderer;
var mesh, line,mesh1, line1,mesh2, line2,mesh3, line3,mesh4, line4;
var group = [];

var lastObj = false, curObj = false;
var m_width= 1920;
var m_height= 1080;
var meshName='';//获取点击小区的名字
var geometry = new THREE.Geometry();
var geometry1 = new THREE.Geometry();
var geometry2 = new THREE.Geometry();
var geometry3 = new THREE.Geometry();
var geometry4 = new THREE.Geometry();
geometry.vertices.push(
    new THREE.Vector3(-602, 1, -435),
    new THREE.Vector3(-403, 1, -469),
    new THREE.Vector3(-323, 1, -300),
    new THREE.Vector3(-321, 1, -230),
    new THREE.Vector3(-507, 1, -154),
    new THREE.Vector3(-507, 1, -228),
    new THREE.Vector3(-604, 1, -366)
);
geometry.faces.push(
    new THREE.Face3(0, 2, 1),
    new THREE.Face3(0, 5, 2),
    new THREE.Face3(2, 4, 3),
    new THREE.Face3(2, 5, 4),
    new THREE.Face3(0, 4, 5),
    new THREE.Face3(0, 6, 4)
);
geometry.computeBoundingSphere();
geometry1.vertices.push(
    new THREE.Vector3(-874, 1, -395),
    new THREE.Vector3(-676, 1, -428),
    new THREE.Vector3(-567, 1, -212),
    new THREE.Vector3(-565, 1, -163),
    new THREE.Vector3(-774, 1, -89),
    new THREE.Vector3(-771, 1, -161),
    new THREE.Vector3(-879, 1, -332)
);
geometry1.faces.push(
    new THREE.Face3(0, 2, 1),
    new THREE.Face3(0, 5, 2),
    new THREE.Face3(2, 4, 3),
    new THREE.Face3(2, 5, 4),
    new THREE.Face3(0, 4, 5),
    new THREE.Face3(0, 6, 4)
);
geometry1.computeBoundingSphere();
geometry2.vertices.push(
    new THREE.Vector3(-111, 1, -373),
    new THREE.Vector3(217, 1, -445),
    new THREE.Vector3(268, 1, -331),
    new THREE.Vector3(273, 1, -254),
    new THREE.Vector3(-56, 1, -170),
    new THREE.Vector3(-47, 1, -221),
    new THREE.Vector3(-114, 1, -295)
);
geometry2.faces.push(
    new THREE.Face3(0, 2, 1),
    new THREE.Face3(0, 5, 2),
    new THREE.Face3(2, 4, 3),
    new THREE.Face3(2, 5, 4),
    new THREE.Face3(0, 4, 5),
    new THREE.Face3(0, 6, 4)
);
geometry2.computeBoundingSphere();
geometry3.vertices.push(
    new THREE.Vector3(-335, 1, 51),
    new THREE.Vector3(-95, 1, -43),
    new THREE.Vector3(155, 1, 185),
    new THREE.Vector3(166, 1, 252),
    new THREE.Vector3(-112, 1, 354),
    new THREE.Vector3(-79, 1, 299),
    new THREE.Vector3(-336, 1, 105)
);
geometry3.faces.push(
    new THREE.Face3(0, 2, 1),
    new THREE.Face3(0, 5, 2),
    new THREE.Face3(2, 4, 3),
    new THREE.Face3(2, 5, 4),
    new THREE.Face3(0, 4, 5),
    new THREE.Face3(0, 6, 4)
);
geometry3.computeBoundingSphere();
geometry4.vertices.push(
    new THREE.Vector3(-779, 1, -844),
    new THREE.Vector3(-501, 1, -915),
    new THREE.Vector3(-316, 1, -557),
    new THREE.Vector3(-317, 1, -487),
    new THREE.Vector3(-629, 1, -434),
    new THREE.Vector3(-633, 1, -511),
    new THREE.Vector3(-787, 1, -785)
);
geometry4.faces.push(
    new THREE.Face3(0, 2, 1),
    new THREE.Face3(0, 5, 2),
    new THREE.Face3(2, 4, 3),
    new THREE.Face3(2, 5, 4),
    new THREE.Face3(0, 4, 5),
    new THREE.Face3(0, 6, 4)
);
geometry4.computeBoundingSphere();
init();
animate();

function initLight(){
    var light = new THREE.AmbientLight( 0xffffff );
    scene.add( light );
}
function init() {
    // scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    // renderer
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.shadowMap.enabled = true;
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( m_width, m_height );
    document.getElementById(domId).appendChild( renderer.domElement );
    // camera
    //camera = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, 1, 13800 );
    camera = new THREE.PerspectiveCamera(45, m_width / m_height, 1, 4000);
    // camera.position.set( 0, 4000, 0);
    camera.lookAt(scene.position);
    scene.add( camera );
    // floor
    var textureLoader = new THREE.TextureLoader();
    var planeGeometry = new THREE.PlaneBufferGeometry(4800, 4800, 1, 1);
    var planeMaterial = new THREE.MeshLambertMaterial( {
        map: textureLoader.load( require("../../assets/images/a.jpg") )
    });
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 0;
    plane.position.y = 0;
    plane.position.z = 0;
    plane.receiveShadow = true;
    scene.add(plane);
    // mesh
    var material = new THREE.MeshLambertMaterial( {
        color: 0x2EA9DF,
        transparent: true,
        opacity: 0
    });
    var material1 = new THREE.MeshLambertMaterial( {
        color: 0x2EA9DF,
        transparent: true,
        opacity: 0
    });
    var material2 = new THREE.MeshLambertMaterial( {
        color: 0x2EA9DF,
        transparent: true,
        opacity: 0
    });
    var material3 = new THREE.MeshLambertMaterial( {
        color: 0x2EA9DF,
        transparent: true,
        opacity: 0
    });
    var material4 = new THREE.MeshLambertMaterial( {
        color: 0x2EA9DF,
        transparent: true,
        opacity: 0
    });
    mesh = new THREE.Mesh( geometry, material );
    mesh.position.x = 0;
    mesh.position.y = 0;
    mesh.position.z = 0;
    mesh.name = 'mesh0';
    mesh.centerX=-464;
    mesh.centerZ=-354;
    var edges = new THREE.EdgesGeometry( geometry );
    line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( {
        color: 0x2EA9DF,
        transparent: true,
        opacity: 0
    }));

    mesh1 = new THREE.Mesh( geometry1, material1 );
    mesh1.position.x = 0;
    mesh1.position.y = 0;
    mesh1.position.z = 0;
    mesh1.name = 'mesh1';
    mesh1.centerX='-737';
    mesh1.centerZ='-295';
    var edges1 = new THREE.EdgesGeometry( geometry1 );
    line1 = new THREE.LineSegments( edges1, new THREE.LineBasicMaterial( {
        color: 0x2EA9DF,
        transparent: true,
        opacity: 0
    }));

    mesh2 = new THREE.Mesh( geometry2, material2 );
    mesh2.position.x = 0;
    mesh2.position.y = 0;
    mesh2.position.z = 0;
    mesh2.name = 'mesh2';
    mesh2.centerX='79';
    mesh2.centerZ='-338';
    var edges2 = new THREE.EdgesGeometry( geometry2 );
    line2 = new THREE.LineSegments( edges2, new THREE.LineBasicMaterial( {
        color: 0x2EA9DF,
        transparent: true,
        opacity: 0
    }));

    mesh3 = new THREE.Mesh( geometry3, material3 );
    mesh3.position.x = 0;
    mesh3.position.y = 0;
    mesh3.position.z = 0;
    mesh3.name = 'mesh3';
    mesh3.centerX='-112';
    mesh3.centerZ='102';
    var edges3 = new THREE.EdgesGeometry( geometry3 );
    line3 = new THREE.LineSegments( edges3, new THREE.LineBasicMaterial( {
        color: 0x2EA9DF,
        transparent: true,
        opacity: 0
    }));

    mesh4 = new THREE.Mesh( geometry4, material4 );
    mesh4.position.x = 0;
    mesh4.position.y = 0;
    mesh4.position.z = 0;
    mesh4.name = 'mesh4';
    mesh4.centerX='-595';
    mesh4.centerZ='-692';
    var edges4 = new THREE.EdgesGeometry( geometry4 );
    line4 = new THREE.LineSegments( edges4, new THREE.LineBasicMaterial( {
        color: 0x2EA9DF,
        transparent: true,
        opacity: 0
    }));

    scene.add(mesh);
    scene.add(line);
    scene.add(mesh1);
    scene.add(line1);
    scene.add(mesh2);
    scene.add(line2);
    scene.add(mesh3);
    scene.add(line3);
    scene.add(mesh4);
    scene.add(line4);
    group.push({
        mesh: mesh,
        line: line,
    },{
        mesh: mesh1,
        line: line1,
    },{
        mesh: mesh2,
        line: line2,
    },{
        mesh: mesh3,
        line: line3,
    },{
        mesh: mesh4,
        line: line4,
    });
    initLight();
    // controls
    controls = new THREE.MapControls( camera, renderer.domElement );
    controls.enableRotate = false;
    controls.screenSpacePanning = false;
    controls.minDistance = 1000;
    // controls.maxDistance = 3400;
    controls.maxDistance = Math.min(Math.min(2400 / camera.aspect, 2400)  / Math.tan( ( camera.fov / 2 ) * Math.PI / 180.0 ), 4000);
    camera.position.set( 0, controls.maxDistance, 0);
    controls.zoomSpeed = 3;
    //
    window.addEventListener( 'resize', onWindowResize, false );
    // 获取平面坐标
    // window.addEventListener( 'mousemove', function(e){
    //     if(event.clientX>490&&event.clientY>92&&event.clientX<1410&&event.clientY<92+parseInt($("#s_2").height())){
    //         var raycaster = new THREE.Raycaster();
    //         var mouse = new THREE.Vector2();
    //         mouse.x = ((event.clientX-490) / m_width) * 2 - 1;
    //         mouse.y = -((event.clientY-92 )/ m_height) * 2 + 1;
    //         raycaster.setFromCamera(mouse, camera);
    //         var ray = raycaster.ray;
    //         var intersects = raycaster.intersectObjects(scene.children);
    //         curObj = false;
    //         curObj1 = false;
    //         for(var i = 0;i < intersects.length;++i){
    //             if(intersects[i].object.geometry instanceof THREE.Geometry){
    //                 curObj = groupByMesh(intersects[i]);
    //             }
    //         }
    //         if(curObj == false && lastObj != false){
    //             lastObj.mesh.material.opacity = 0;
    //             lastObj.line.material.opacity = 0;
    //             lastObj = false;
    //             $("#message").remove()
    //             document.body.style.cursor = 'default';
    //         }else if(curObj){
    //             if($("#message")){
    //                 $("#message").remove()
    //             }
    //             if(curObj.mesh.name=='mesh0'){
    //                 meshName="传世家宝"
    //             }else if(curObj.mesh.name=='mesh1'){
    //                 meshName="水岸珈蓝"
    //             }else if(curObj.mesh.name=='mesh2'){
    //                 meshName="悠生海华"
    //             }else if(curObj.mesh.name=='mesh3'){
    //                 meshName="海珠花园"
    //             }else if(curObj.mesh.name=='mesh4'){
    //                 meshName="怡景苑"
    //             }
    //             $("#s_2").append("<div id='message'>"+meshName+"</div>");
    //             $("#message").css({"top":parseInt(e.clientY)-20+"px","left":parseInt(e.clientX)+20+"px"})
    //             if(curObj !== lastObj){
    //                 if(lastObj){
    //                     lastObj.mesh.material.opacity = 0
    //                     lastObj.line.material.opacity = 0
    //                 }
    //                 curObj.mesh.material.opacity = 0.4;
    //                 curObj.line.material.opacity = 1;
    //                 lastObj = curObj;
    //             }
    //             document.body.style.cursor = 'pointer';
    //         }
    //         renderer.render( scene, camera );
    //     }else{
    //         if($("#message")){
    //             $("#message").remove()
    //         }
    //     }
    // }, false );
    window.addEventListener( 'click', function(e){
        if(curObj == false && lastObj != false){
        }else if(curObj){
            sessionStorage.setItem("meshName",JSON.stringify({name:meshName,centerX:curObj.mesh.centerX,centerZ:curObj.mesh.centerZ}));
            window.location.href='person.html'
        }
        renderer.render( scene, camera );
    }, false );

};
function groupByMesh(mesh){
    for(var i = 0;i < group.length;++i){
        if(mesh.object.name == group[i].mesh.name) {
            return group[i];
        }
    }
}
function onWindowResize() {
    camera.aspect = m_width / m_height;
    camera.updateProjectionMatrix();
    renderer.setSize( m_width, m_height );
}
function animate() {
    requestAnimationFrame( animate );
    controls.update();
    render();
}
function render() {
    renderer.render( scene, camera );
}

}

export default webgl