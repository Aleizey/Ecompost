
let arrayUser = [];
let ApiUser = "http://ecompost.test/api/users";

async function consultaUserApi() {
    try {

        const resultadoEnBruto = await fetch(ApiUser);
        const resultadoJSON = await resultadoEnBruto.json();

        arrayUser.push(...resultadoJSON.data);

    } catch (error) {

        console.log(`Error en la promesa: ${error}`);
    }
}

window.addEventListener('load', async () => {
    await consultaUserApi();
    addUser()
});

function addUser() {

    const prueba = document.querySelector(".prueba")

    arrayUser.map(users => {

        const div = document.createElement("tr")
        div.classList.add("border-b")

        console.log(arrayUser)

        div.innerHTML = `
                    <td class="py-3 px-6">${users.id}</td>
                    <td class="py-3 px-6">${users.name}</td>
                    <td class="py-3 px-6">${users.email}</td>
                    <td class="py-3 px-6 text-center">
                        <button
                            class="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
                            Editar
                        </button>
                        <form action="" method="POST" class="inline-block"
                            >
                            <button
                                class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                                Eliminar
                            </button>
                        </form>
                    </td>

                `;

        prueba.append(div)
    })

}