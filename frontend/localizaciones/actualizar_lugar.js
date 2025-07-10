async function actualizar_lugar() {
    const id = document.querySelector("#lugaresDropdown").value;
    const nombre = document.querySelector("#name").value;
    const origen_id = document.querySelector("#universeDropdown").value;
    const descripcion = document.querySelector("#description").value;
    const tipo = document.querySelector("#tipo").value;
    const imagen = document.querySelector("#image").value;

    if (!id || !nombre || !origen_id || !tipo || !descripcion || !imagen) {
        alert("Completa todos los campos obligatorios.");
        return;
    }

    const lugar = {
        id: parseInt(id),
        nombre,
        descripcion,
        origen_id: parseInt(origen_id),  
        tipo,
        imagen
    };

    try {
        const response = await fetch("http://localhost:3000/api/lugares/", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(lugar)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Error al actualizar el lugar.");
        }

        alert("Lugar actualizado exitosamente.");
        window.location.href = "index.html";
    } catch (error) {
        console.error("Error al actualizar el lugar:", error);
        alert("Error al actualizar el lugar.");
    }
}

