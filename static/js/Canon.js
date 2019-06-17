function Canon() {
    var canon = new THREE.Object3D();

    var axes = new THREE.AxesHelper(50);
    var geometry = new THREE.CylinderGeometry(10, 10, 5, 12);
    ////////////////////////////////////////////////////////////////////////wheel
    var material = new THREE.MeshBasicMaterial({
        color: 0xfff000,
        wireframe: false
    });
    var wheel = new THREE.Mesh(geometry, material);
    wheel.rotateZ(Math.PI / 2);
    wheel.position.set(-10, 10, 0);
    ////////////////////////////////////////////////////////////////////////wheel wire
    var material_wire = new THREE.MeshBasicMaterial({
        color: 0x000000,
        wireframe: true
    });
    var wheel_wire = new THREE.Mesh(geometry, material_wire);
    wheel_wire.rotateZ(Math.PI / 2);
    wheel_wire.position.set(-10, 10, 0);


    ////////////////////////////////////////////////////////////////////////wheel clones
    var wheel2 = wheel.clone();
    wheel2.position.set(10, 10, 0);
    var wheel2_wire = wheel_wire.clone();
    wheel2_wire.position.set(10, 10, 0);

    var geometry2 = new THREE.CylinderGeometry(8, 8, 35, 12);
    geometry2.translate(0, 19, 0);
    var barrel = new THREE.Mesh(geometry2, material);
    barrel.position.set(0, 10, -2);
    barrel.rotateX(Math.PI / 2);

    var barrel_wire = new THREE.Mesh(geometry2, material_wire);
    barrel_wire.position.set(0, 10, -2);
    barrel_wire.rotateX(Math.PI / 2);
    // var axes2 = new THREE.AxesHelper(50);
    // barrel.add(axes2)

    canon.add(wheel);
    canon.add(wheel_wire);
    canon.add(axes);
    canon.add(wheel2);
    canon.add(wheel2_wire);
    canon.add(barrel);
    canon.add(barrel_wire);

    this.getCanon = function () {
        return canon;
    }

    this.getWheel = function () {
        return wheel;
    }

    this.getWheel2 = function () {
        return wheel2;
    }
    this.getWheelW = function () {
        return wheel_wire;
    }

    this.getWheel2W = function () {
        return wheel2_wire;
    }

    this.getBarrel = function () {
        return barrel;
    }
    this.getBarrelW = function () {
        return barrel_wire;
    }
    this.getMaterial = function () {
        return material;
    }
}