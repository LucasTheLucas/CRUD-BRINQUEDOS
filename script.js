var Brinquedo = document.getElementById("Nome-Brinquedo")
var Nome = document.getElementById("Nome-Pessoa")
var Data = document.getElementById("Data")
var BtnEnviar = document.getElementById("Btn-Enviar")

var TabelaCorpo = document.getElementById("Tabela-Corpo")

var EditarUpdate = document.getElementById("Editar-Update")
var CancelarUpdate = document.getElementById("Cancelar-Update")
var BrinquedoUpdate = document.getElementById("Brinquedo-Update")
var NomeUpdate = document.getElementById("Nome-Update")
var DataUpdate = document.getElementById("Date-Update")

let emprestimos = JSON.parse(localStorage.getItem('emprestimos')) || [];
let emprestimoAtual = null;

EsconderAtualizador()

function Adicionar()
{
    const brinquedo = Brinquedo.value.trim()
    const nome = Nome.value.trim()
    const data = Data.value.trim()

    if(brinquedo && nome && data != null)
        {
            var id = 1

            var pos = emprestimos.map(function(x)
            {
                return x.id
            }).indexOf(id)

            while(pos != -1)
                {
                    id++
                    var pos = emprestimos.map(function(x)
                    {
                        return x.id
                    }).indexOf(id)
                }

            novoEmprestimo =
            {
                id: id,
                brinquedo: brinquedo,
                nome: nome,
                data: data
            }

            emprestimos.push(novoEmprestimo)
            localStorage.setItem('emprestimos', JSON.stringify(emprestimos))
            Brinquedo.value = ""
            Nome.value = ""
            Data.value = ""
            CarregarInformacoes()
        }
    else
        {
            alert("Para que um emprestimo seja registrado, preencha todos os campos!")
        }
}

function MostrarAtualizador(id)
{
    const emprestimo = emprestimos.find((emprestimo) => emprestimo.id === id);
    if(emprestimo)
        {
            BrinquedoUpdate.value = emprestimo.brinquedo
            NomeUpdate.value = emprestimo.nome
            DataUpdate.value = emprestimo.data
            emprestimoAtual = id

            EditarUpdate.addEventListener('click', Editar)
            CancelarUpdate.addEventListener('click', EsconderAtualizador)
            EditarUpdate.style.display = 'inline-block'
            CancelarUpdate.style.display = 'inline-block'
            BrinquedoUpdate.style.display = 'inline-block'
            NomeUpdate.style.display = 'inline-block'
            DataUpdate.style.display = 'inline-block'
            document.getElementById('Atualizar-Form').style.display = 'block'
        }
}

function Deletar(id)
{
    emprestimos = emprestimos.filter((player) => player.id !== id)
    localStorage.setItem("emprestimos", JSON.stringify(emprestimos))
    EsconderAtualizador()
    CarregarInformacoes()
}

function Editar(id)
{
    const BrinquedoAtua = BrinquedoUpdate.value.trim() 
    const NomeAtua = NomeUpdate.value.trim()
    const DataAtua = DataUpdate.value.trim()
    
    if(BrinquedoAtua && NomeAtua && DataAtua != "")
        {
            const index = emprestimos.findIndex((emprestimo) => emprestimo.id == emprestimoAtual)
            emprestimos[index].brinquedo =  BrinquedoAtua
            emprestimos[index].nome = NomeAtua
            emprestimos[index].data = DataAtua
            localStorage.setItem("emprestimos", JSON.stringify(emprestimos))
            EsconderAtualizador()
            CarregarInformacoes()
        }
    else
        {
            alert("Para atualizar é nescessario preencher todos os campos!")
        }

    BrinquedoUpdate.value = '' 
    NomeUpdate.value = ''
    DataUpdate.value = ''
    CarregarInformacoes()
}

function formatarData(data) {
    const partes = data.split("-");
    const ano = partes[0]
    const mes = partes[1]
    const dia = partes[2]
    return dia + "/" + mes + "/" + ano;
}

function EsconderAtualizador()
{
    BrinquedoUpdate.value = '';
    NomeUpdate.value = '';
    DataUpdate.value = '';

    emprestimoAtual = null
    EditarUpdate.removeEventListener('click', Editar)
    CancelarUpdate.removeEventListener('click', EsconderAtualizador)
    EditarUpdate.style.display = 'none'
    CancelarUpdate.style.display = 'none'
    BrinquedoUpdate.style.display = 'none'
    NomeUpdate.style.display = 'none'
    DataUpdate.style.display = 'none'
    document.getElementById('Atualizar-Form').style.display = 'none'
}

function CarregarInformacoes()
{
    TabelaCorpo.innerHTML = ""

    for (let i = 0; i < emprestimos.length; i++) {
        const emprestimo = emprestimos[i]

        const tr = document.createElement("tr")

        const idTd = document.createElement("td")
        const brinquedoTd = document.createElement("td")
        const pessoaTd = document.createElement("td")
        const dataTd = document.createElement("td")

        const acoesTd = document.createElement("td")

        const editarBtn = document.createElement("button")
        const deletarBtn = document.createElement("button")

        editarBtn.className = "Editar-Btn"
        deletarBtn.className = "Deletar-Btn"

        idTd.innerText = emprestimo.id
        brinquedoTd.innerText = emprestimo.brinquedo
        pessoaTd.innerText = emprestimo.nome
        dataTd.innerText = formatarData(emprestimo.data)
        editarBtn.innerText = "Editar"
        deletarBtn.innerText = "Excluir"

        editarBtn.addEventListener('click', () => 
            {
                MostrarAtualizador(emprestimo.id)
            })

        deletarBtn.addEventListener('click', () => 
            {
                Deletar(emprestimo.id)
            })

        acoesTd.appendChild(editarBtn)
        acoesTd.appendChild(deletarBtn)

        tr.appendChild(idTd)
        tr.appendChild(brinquedoTd)
        tr.appendChild(pessoaTd)
        tr.appendChild(dataTd)
        tr.appendChild(acoesTd)

        TabelaCorpo.appendChild(tr)
    }
}

BtnEnviar.addEventListener("click", Adicionar)
CarregarInformacoes()