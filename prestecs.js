let llistaPrestecs = []

let indexEdicio = null

const campNom = document.getElementById('nomAlumne')
const campMaterial = document.getElementById('material')
const campDevolt = document.getElementById('devolt')
const boto = document.getElementById('botonGuardar')
const cossTaula = document.getElementById('cossTaulaPrestecs')
const missatgeBuit = document.getElementById('missatgeBuit')
const contenidorTaula = document.getElementById('contenidorTaula')

boto.addEventListener('click', guardarPrestec)


// CREAR i EDITAR
function guardarPrestec() {
    const nom = campNom.value.trim()
    const material = campMaterial.value
    const tornMarcat = document.querySelector('input[name="torn"]:checked')

    if (nom === '' || material === '' || !tornMarcat) {
        alert('Has d\'emplenar tots els camps.')
        return
    }

    const prestec = {
        nom: nom,
        material: material,
        torn: tornMarcat.value,
        devolt: campDevolt.checked
    }

    if (indexEdicio === null) {
        llistaPrestecs.push(prestec)
    } else {
        llistaPrestecs[indexEdicio] = prestec
        indexEdicio = null
        boto.textContent = 'Afegir préstec'
        boto.classList.remove('btn-warning')
        boto.classList.add('btn-primary')
    }

    netejarFormulari()
    mostrarPrestecs()
}


function mostrarPrestecs() {
    cossTaula.innerHTML = ''

    if (llistaPrestecs.length === 0) {
        missatgeBuit.style.display = 'block'
        contenidorTaula.style.display = 'none'
        return
    }

    missatgeBuit.style.display = 'none'
    contenidorTaula.style.display = 'block'

    llistaPrestecs.forEach((prestec, index) => {
        const estatText = prestec.devolt ? 'Sí' : 'No'

        cossTaula.innerHTML += `
            <tr>
                <td>${prestec.nom}</td>
                <td>${prestec.material}</td>
                <td>${prestec.torn}</td>
                <td>${estatText}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editarPrestec(${index})">Editar</button>
                    <button class="btn btn-danger btn-sm" onclick="esborrarPrestec(${index})">Esborrar</button>
                </td>
            </tr>
        `
    })
}


// ESBORRAR
function esborrarPrestec(index) {
    llistaPrestecs.splice(index, 1)
    mostrarPrestecs()
}





// EDITAR — carrega les dades al formulari i neteja
function editarPrestec(index) {
    const prestec = llistaPrestecs[index]

    campNom.value = prestec.nom
    campMaterial.value = prestec.material
    campDevolt.checked = prestec.devolt

    const radio = document.querySelector(`input[name="torn"][value="${prestec.torn}"]`)
    if (radio) radio.checked = true

    indexEdicio = index
    boto.textContent = 'Guardar canvis'
    boto.classList.remove('btn-primary')
    boto.classList.add('btn-warning')
}


function netejarFormulari() {
    campNom.value = ''
    campMaterial.value = ''
    campDevolt.checked = false
    document.querySelectorAll('input[name="torn"]').forEach(r => r.checked = false)
}
