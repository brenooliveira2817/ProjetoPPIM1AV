import http from 'http';
import url, {URLSearchParams} from 'url';

const host = 'localhost';
const porta = 3000; //maior que 1024 e menor que 16000.

function responderRequisicao(requisicao, resposta){
    if(requisicao.method === "GET"){

        const dados = new URLSearchParams(url.parse(requisicao.url).query);
        const numero = dados.get('tabuada');
    
        resposta.setHeader('Content-type','text/html');
        resposta.write('<html>');
        resposta.write('<head>');
        resposta.write('<meta charset="UTF-8"/>');
        resposta.write('<title>Tabuada</title>');
        resposta.write('</head>');
        resposta.write('<body>');
        resposta.write('<h1 style="font-family: Arial; text-align: center; color: #660000;">Olá ! Seja bem vindo ao servidor de tabuada !</h1>');
        resposta.write('<p style="font-family: Arial; text-align: center;">Por gentileza acrescente na url: /?tabuada=1</p>');
        resposta.write('<p style="font-family: Arial; text-align: center;">No lugar do numero altere para mudar a tabuada desejada, Obrigado!</p>');
        
        if(numero){
            resposta.write('<h1 style="font-family: Arial; text-align: center; color: #660000;">Tabuada do ' + numero + '</h1>');
            resposta.write('<table style="width: 50%; margin: 20px auto; border-collapse: collapse; background-color: #f0f0f0; font-size: 20px;">');
            for (let i = 1; i <= 10; i++) {
                resposta.write('<tr><td style="border: 1px solid #999; padding: 15px; text-align: center;">' + numero + ' x ' + i + '</td><td style="border: 1px solid #999; padding: 15px; text-align: center;">=</td><td style="border: 1px solid #999; padding: 15px; text-align: center;">' + (numero * i) + '</td></tr>');
            }
            resposta.write('</table>');
            resposta.write('</body>');
            resposta.write('</html>');
            resposta.end();  
        }
    }
}

const servidor = http.createServer(responderRequisicao);

servidor.listen(porta, host, () => {
    console.log('Servidor escutando em http://' + host + ':' + porta);
});