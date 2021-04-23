## 

### O que foi abordado

conceitos:
> protocolo http
> protocolo websocket

ferramentas utilizadas:
> typescript
libs e frameworks:

### O que é websocket e como funciona?

conexão via protocolo http:
A partir do momento que o usuario envia
uma requisição para o servidor e o servidor responde, a conexão será fechada e uma nova conexão será criada com outra requisição do cliente.

conexao via protocolo ws/websocket: 
A partir do momento que o usuario se conecta ao servidor/websocket, os dois ficaram trocando dados, pois a conexão ficará aberta e so deixará de ser aberta quando o cliente se desconecta.

### lib usada para usar o websocket:
>$ yarn add socket.io

para conectar a pagina com o servidor:

>$ yarn add socket.io-client
e logo apos, importa via script src ou import statement