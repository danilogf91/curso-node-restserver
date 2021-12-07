const crearCategoria = document.querySelector(".form-group");

const nuevaCategoria = async (
  tipoDeCategoria,
  descripcionDeCategoria,
  usuarioDeCategoria
) => {
  try {
    const res = await axios({
      method: "POST",
      url: "http://localhost:8080/api/categorias/nueva",
      data: {
        tipo: tipoDeCategoria,
        descripcion: descripcionDeCategoria,
        usuario: usuarioDeCategoria,
      },
    });

    if (res.data.status === "success") {
      location.replace("http://localhost:8080/api/categorias");
    }
  } catch (err) {
    console.log("ERROR ", err.response.data.msg);
  }
};

if (crearCategoria) {
  crearCategoria.addEventListener("submit", async (e) => {
    e.preventDefault();
    const tipoDeCategoria = document.getElementById("tipoDeCategoria").value;
    const descripcionDeCategoria = document.getElementById(
      "descripcionDeCategoria"
    ).value;
    const usuarioDeCategoria =
      document.getElementById("usuarioDeCategoria").value;

    await nuevaCategoria(
      tipoDeCategoria,
      descripcionDeCategoria,
      usuarioDeCategoria
    );
  });
}
