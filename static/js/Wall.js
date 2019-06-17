function Wall() {
    var container = []

    var material = new THREE.MeshBasicMaterial({ color: 0x9b774f });
    var material_2 = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true });
    var geometry = new THREE.BoxGeometry(10, 10, 10);
    var geometry_2 = new THREE.BoxGeometry(10, 10, 10);
    for (var i = 0; i < 5; i++) {
        for (var j = 0; j < 5; j++) {
            var box_1 = new THREE.Mesh(geometry.clone(), material.clone());
            var box_2 = new THREE.Mesh(geometry_2.clone(), material_2.clone());
            box_1.name = i + "_" + j + "_color";
            box_2.name = i + "_" + j + "_wireframe";
            box_1.position.set(i * 10, j * 10 + 5, 400);
            box_2.position.set(i * 10, j * 10 + 5, 400);
            var box = [box_1,box_2];
            container.push(box);
        }
    }
    console.log(container);
    this.getWall = () => {
        return container;
    }
}