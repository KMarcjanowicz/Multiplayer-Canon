function Main() {
    var scene;
    var camera;
    var renderer;
    var canon = new Canon();
    var canon2;
    var canonAngle = 0;
    var bullet;
    var bullet2;
    var isShaking = false;
    var shakingStartTime;
    var cameraPosition = new THREE.Vector3();
    //=============== SOCKETS ===================
    var client = io();
    client.on("onconnect", function (data) {
        //alert(data.clientName)
    });

    client.on("canonCreate", function (data) {
        canon2 = new Canon();
        canon.getCanon().position.set(-data.x, 0, 0);
        canon2.getCanon().position.set(data.x, 0, 0);
        canon2.getMaterial().color.setHex(0xff00ff);
        scene.add(canon2.getCanon());

        bullet2 = new Bullet();

        var b = bullet2.getBullet();
        b.position.set(0, 35, 0);
        canon2.getBarrel().add(b);
    });

    client.on("canonRotate", function (data) {
        canon2.getCanon().rotation.set(0, data.rotation, 0);
    });

    client.on("barrelRotate", function (data) {
        canon2.getBarrel().rotation.set(data.rotation, 0, 0);
        canon2.getBarrelW().rotation.set(data.rotation, 0, 0);
    });

    client.on("barrelRotate", function (data) {
        canon2.getBarrel().rotation.set(data.rotation, 0, 0);
        canon2.getBarrelW().rotation.set(data.rotation, 0, 0);
    });

    client.on("canonFire", function (data) {
        fire(bullet2, canon2);
    });

    client.on("bulletHit", function (data) {
        hit(bullet2, canon2);
    });

    $("#canonAngle").on("input", () => {
        var rads = $("#canonAngle").val() * (Math.PI / 180);
        canon.getCanon().rotation.set(0, rads, 0);
        canonAngle = rads;

        client.emit("canonRotate", {
            rotation: rads
        });
    });

    $("#barrelAngle").val("90");
    $("#barrelAngle").on("input", () => {
        var rads = $("#barrelAngle").val() * (Math.PI / 180);
        canon.getBarrel().rotation.set(rads, 0, 0);
        canon.getBarrelW().rotation.set(rads, 0, 0);
        bullet.barrelAngle = (90 - $("#barrelAngle").val()) * (Math.PI / 180);

        client.emit("barrelRotate", {
            rotation: rads
        });
    });
    // function controls(e) {
    //     var x = (e.clientX / $(window).width()) * 2 - 1//* (Math.PI/180);
    //     canon.getCanon().rotation.set(0, x, 0);
    //     canonAngle = x * (Math.PI / 180);
    //     canonAngle = canonAngle.toFixed(2)
    //     canonAngle = canonAngle * 1000;
    //     var y = -(e.clientY / $(window).height()) * 2 + 1
    //     canon.getBarrel().rotation.set(2 * y, 0, 0);
    //     canon.getBarrelW().rotation.set(2 * y, 0, 0);
    //     bullet.barrelAngle = 20 * y * (Math.PI / 180);
    //     bullet.barrelAngle = bullet.barrelAngle.toFixed(2);

    //     client.emit("canonRotate", {
    //         rotation: 2 * x
    //     });

    //     client.emit("barrelRotate", {
    //         rotation: 2 * y
    //     });
    // }
    // $(document).on("mousemove", controls);

    //================ ENGINE ====================
    $("body").keydown(function (e) {
        if (e.key == " ") {
            client.emit("canonFire", {});
            fire(bullet, canon);
        }
    });

    function fire(bul, can) {
        bul.startTime = new Date();
        bul.isFired = true;

        bul.startPosition = bul.getBullet().clone().position;
        THREE.SceneUtils.detach(bul.getBullet(), can.getBarrel(), scene);

        scene.add(bul.getBullet());
        bul.startWorldPosition = bul.getBullet().clone().position;
    }

    initEngine();

    function render() {

        movingBullet(bullet, canon);

        if (bullet2 != undefined)
            movingBullet(bullet2, canon2);


        if (isShaking) {
            var endTime = new Date();
            var t = (endTime - shakingStartTime);
            if (t % 4 == 0)
                camera.position.set(cameraPosition.x + (Math.random() * 10), cameraPosition.y + (Math.random() * 10), cameraPosition.z);

            if (t > 300)
                isShaking = false;
        }

        requestAnimationFrame(render);
        renderer.render(scene, camera);
    }
    render();

    function initEngine() {
        $("#bck").height($(window).height());
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(45, $(window).width() / $(window).height(), 0.1, 10000);

        renderer = new THREE.WebGLRenderer();
        renderer.setClearColor("white");
        renderer.setSize($(window).width(), $(window).height());

        $("#root").append(renderer.domElement);

        camera.position.set(0, 100, 100);
        camera.lookAt(scene.position);

        var orbitControl = new THREE.OrbitControls(camera, renderer.domElement);
        orbitControl.addEventListener('change', function () {
            renderer.render(scene, camera);
        });

        canon.getCanon().position.set(-50, 0, 0);
        scene.add(canon.getCanon());

        addGround();
        addBullet();
    }

    function addGround() {
        var g = new Grid();
        scene.add(g.getFloor());
        var w = new Wall();
        var sand = w.getWall();
        for (var i = 0; i < sand.length; i++) {
            scene.add(sand[i][0]);
            scene.add(sand[i][1]);
        }
    }

    function addBullet() {
        bullet = new Bullet();

        var b = bullet.getBullet();
        b.position.set(0, 35, 0);
        canon.getBarrel().add(b);
    }

    function movingBullet(bul, can) {
        if (bul.isFired) {
            var endTime = new Date();
            var t = (endTime - bul.startTime) / 1000;
            var v = 100;
            bul.x = 0;
            bul.y = v * t * Math.sin(bul.barrelAngle) - ((9.81 * t * t) / 2);
            bul.z = v * t * Math.cos(bul.barrelAngle);

            camera.position.x = 0;
            camera.position.y = v * t * Math.sin(bul.barrelAngle) - ((9.81 * t * t) / 2);
            camera.position.z = v * t * Math.cos(bul.barrelAngle);
            //camera.lookAt(bul.position);

            bul.getBullet().position.set(bul.x + bul.startWorldPosition.x,
                bul.y + bul.startWorldPosition.y,
                bul.z + bul.startWorldPosition.z);

            if (bul.getBullet().position.y < 0) {
                hit(bul, can);
                client.emit("bulletHit", {});
            }


            if (t < 1.5) {
                if (t < 0.5) {
                    can.getCanon().translateOnAxis(new THREE.Vector3(0, 0, -0.1), 6);
                    can.getWheel().rotateOnAxis(new THREE.Vector3(0, 1, 0), -1);
                    can.getWheel2().rotateOnAxis(new THREE.Vector3(0, 1, 0), -1);
                    can.getWheelW().rotateOnAxis(new THREE.Vector3(0, 1, 0), -1);
                    can.getWheel2W().rotateOnAxis(new THREE.Vector3(0, 1, 0), -1);
                }
                else {
                    if (t > 0.6) {
                        can.getCanon().translateOnAxis(new THREE.Vector3(0, 0, 0.1), 3);
                        can.getWheel().rotateOnAxis(new THREE.Vector3(0, 1, 0), 1);
                        can.getWheel2().rotateOnAxis(new THREE.Vector3(0, 1, 0), 1);
                        can.getWheelW().rotateOnAxis(new THREE.Vector3(0, 1, 0), 1);
                        can.getWheel2W().rotateOnAxis(new THREE.Vector3(0, 1, 0), 1);
                    }
                }
            }

        }
    }

    function hit(bul, can) {
        bul.isFired = false;
        bul.getBullet().position.set(bul.startPosition.x, bul.startPosition.y, bul.startPosition.z);
        can.getBarrel().add(bul.getBullet());
        camera.position.set(0, 100, 100);
        camera.lookAt(scene.position);
        isShaking = true;
        shakingStartTime = new Date();

        cameraPosition = camera.clone().position;
    }
}