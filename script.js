// Array para armazenar as retiradas (com valor, data e hora)
let withdrawals = [];

// Função para adicionar a retirada à lista e atualizar o total
document.getElementById('addWithdraw').addEventListener('click', function() {
    const amountInput = document.getElementById('withdrawAmount');
    const dateInput = document.getElementById('withdrawDate');
    const timeInput = document.getElementById('withdrawTime');

    const amount = parseFloat(amountInput.value);
    const date = dateInput.value;
    const time = timeInput.value;

    if (isNaN(amount) || date === "" || time === "") {
        alert('Por favor, insira todos os campos corretamente.');
        return;
    }

    // Adiciona o valor, data e hora à lista
    withdrawals.push({ amount, date, time });

    // Atualiza a lista de retiradas no HTML
    const withdrawList = document.getElementById('withdrawList');
    const listItem = document.createElement('li');
    listItem.textContent = `Valor: ${amount.toFixed(2)} USDT - Data: ${date} - Hora: ${time}`;
    withdrawList.appendChild(listItem);

    // Limpa os campos de entrada
    amountInput.value = '';
    dateInput.value = '';
    timeInput.value = '';

    // Atualiza o total
    updateTotal();
});

// Função para atualizar o valor total de retiradas
function updateTotal() {
    const totalAmount = withdrawals.reduce((total, withdrawal) => total + withdrawal.amount, 0);
    document.getElementById('totalAmount').textContent = `${totalAmount.toFixed(2)} USDT`;
}

// Função para gerar o PDF
document.getElementById('generatePdf').addEventListener('click', function() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    let content = 'Relatório de Retiradas USDT\n\n';
    content += 'Lista de Retiradas:\n';
    withdrawals.forEach((withdrawal, index) => {
        content += `${index + 1}. Valor: ${withdrawal.amount.toFixed(2)} USDT - Data: ${withdrawal.date} - Hora: ${withdrawal.time}\n`;
    });

    const totalAmount = withdrawals.reduce((total, withdrawal) => total + withdrawal.amount, 0);
    content += `\nTotal de Retiradas: ${totalAmount.toFixed(2)} USDT`;

    // Organiza e estiliza o PDF
    doc.setFontSize(12);
    doc.text(content, 10, 10);
    doc.save('relatorio_retiradas.pdf');
});
