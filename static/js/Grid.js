function Grid() {
    var container = new THREE.Object3D()

    var lineMaterial = new THREE.LineBasicMaterial({ color: 0xefefef, });
    var geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(0, 0, 0));
    geometry.vertices.push(new THREE.Vector3(100, 0, 0));
    var line = new THREE.Line(geometry, lineMaterial);
    for (var i = -50; i < 50; i++) {
        for (var j = -50; j < 50; j++) {
            var lineClone = line.clone()
            lineClone.position.set(i * 50, 0, j * 50)
            container.add(lineClone);
        }
    }
    for (var i = -50; i < 50; i++) {
        for (var j = -50; j < 50; j++) {
            var lineClone = line.clone()
            lineClone.position.set(i * 50, 0, j * 50)
            lineClone.rotation.y = Math.PI / 2;
            container.add(lineClone);
        }
    }

    this.getFloor = function () {
        return container;
    }
}