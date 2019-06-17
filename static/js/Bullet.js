function Bullet() {

    var container = new THREE.Object3D()
    var geometry = new THREE.SphereGeometry(7, 8, 8);
    var material = new THREE.MeshBasicMaterial({ color: 0x211f1f });
    var sphere_1 = new THREE.Mesh(geometry, material);
    var geometry_2 = new THREE.SphereGeometry(7, 8, 8);
    var material_2 = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true });
    var sphere_2 = new THREE.Mesh(geometry_2, material_2);
    var axes = new THREE.AxesHelper(50);
    container.add(axes)
    container.add(sphere_1)
    container.add(sphere_2)

    this.isFired = false;
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.startTime = 0;
    this.startPosition = new THREE.Vector3();
    this.startWorldPosition = new THREE.Vector3();
    this.barrelAngle = 0;

    this.getBullet = function () {
        return container;
    }
}