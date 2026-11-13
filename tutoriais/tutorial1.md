---
Bom, para este tutorial você só precisa de um Ubuntu funcionando, seja no WSL, em uma máquina virtual, em um computador antigo ou até em uma VPS, e de um terminal aberto. Vamos fazer algo que, para mim, sempre teve um gostinho especial: colocar uma página no ar servida por um servidor web de verdade, configurado por você, linha por linha.

Lá no início, quando eu ainda estava na internet discada, colocar qualquer coisa acessível para outra pessoa era praticamente um sonho. Eu tinha meu localhost e só. Mais à frente veio o ngrok, que virou meu canivete suíço, e depois vieram painéis como o cPanel, que deixavam tudo tão fácil que eu acabei ficando acomodado. O problema é que, quando aparecia algo mais específico, era o conhecimento da base que me salvava. É exatamente essa base que vamos construir aqui.

**Antes de começarmos, preciso deixar algo claro:** este tutorial não é sobre deixar um site pronto para produção com balanceamento de carga, cache e tudo mais. É sobre entender o que acontece quando alguém digita um endereço no navegador e uma página aparece. Se você entender isso de verdade, o resto vira só mais uma camada em cima.

## O que é um servidor web, afinal?

Um servidor web é só um programa. Sim, é isso mesmo. Não é uma máquina gigante piscando luzes em uma sala gelada (bom, às vezes também é, mas não é disso que estamos falando). É um programa que fica escutando em uma **porta**, esperando alguém pedir alguma coisa. Quando o pedido chega, ele procura o arquivo correspondente e devolve a resposta.

O navegador pede: "me dá o `index.html`". O servidor responde: "toma aqui". Essa conversa segue um protocolo chamado **HTTP**, e por padrão acontece na porta **80**. Quando está criptografada, vira **HTTPS** e usa a porta **443**. Se você ainda acha que porta é coisa de marceneiro, não se preocupe: até o fim deste tutorial isso vai fazer todo sentido.

Existem vários servidores web: Apache, Caddy, Lighttpd e muitos outros. Aqui vamos usar o **Nginx** (pronuncia-se "engine-x"). Ele é leve, rápido, está em uma parcela enorme dos servidores da internet e a configuração dele, depois que você entende a lógica, é bem simples de ler. Não vá perder três dias comparando servidores web. Escolha um, aprenda bem e depois os outros ficam fáceis.

## Instalando o Nginx

Abra seu terminal no Ubuntu e atualize a lista de pacotes antes de instalar:

```bash
sudo apt update
sudo apt install nginx -y
```

Vamos entender antes de fingir que `sudo apt alguma-coisa` é um feitiço. O `sudo` executa o comando com permissão de administrador e por isso pode pedir sua senha. O `apt update` só atualiza a lista do que está disponível para instalar, e o `apt install nginx` instala de fato. O `-y` responde "sim" automaticamente às confirmações.

Agora vamos perguntar ao `systemd` se o Nginx está vivo:

```bash
systemctl status nginx
```

Se aparecer `active (running)` em verde, ótimo, o serviço está rodando. Pressione `q` para sair dessa tela. Se estiver parado, inicie e deixe ativado para as próximas inicializações:

```bash
sudo systemctl enable --now nginx
```

Se você está no WSL e o `systemctl` reclamou que o sistema não iniciou com `systemd`, abra o arquivo de configuração do WSL:

```bash
sudo nano /etc/wsl.conf
```

Adicione estas linhas:

```ini
[boot]
systemd=true
```

Salve com `Ctrl + O`, Enter, saia com `Ctrl + X` e, no PowerShell do Windows, reinicie o WSL com `wsl --shutdown`. Abra o Ubuntu de novo e repita o `systemctl status nginx`. Não pule essa etapa, pois sem o `systemd` os serviços não vão se comportar como deveriam.

## Testando a primeira resposta

Antes de abrir o navegador, vamos testar pelo próprio terminal:

```bash
curl -I http://localhost
```

O `curl` faz uma requisição HTTP, e o `-I` pede somente os cabeçalhos da resposta, sem o conteúdo da página. Você deve ver algo como `HTTP/1.1 200 OK` e uma linha `Server: nginx`. Esse `200` é o código que significa "deu tudo certo, aqui está o que você pediu". Você ainda vai conhecer muito bem o `404` (não encontrado), o `403` (proibido) e o temido `502` (o servidor tentou falar com outro programa e ninguém respondeu).

Agora abra o navegador e acesse `http://localhost`. No Windows com WSL, pode abrir direto no navegador do Windows mesmo, pois o WSL encaminha o localhost para você. Deve aparecer a página padrão "Welcome to nginx!".

Nossa, olha só: você acabou de fazer um servidor web responder. Pode parecer pouco, mas é o mesmo princípio que entrega praticamente toda página que você abre no dia a dia.

## Onde o Nginx guarda as coisas

Antes de criar nosso site, vamos entender onde mexer. Não saia editando arquivos aleatórios dentro de `/etc` porque viu em um fórum de 2014.

- **`/etc/nginx/nginx.conf`:** a configuração principal. No começo, você praticamente não vai mexer nele.
- **`/etc/nginx/sites-available/`:** onde ficam as configurações de cada site. Estar aqui não significa estar ativo.
- **`/etc/nginx/sites-enabled/`:** onde ficam os atalhos para os sites que realmente estão ativos.
- **`/var/www/`:** pasta tradicional para guardar os arquivos dos sites.
- **`/var/log/nginx/`:** os logs. Guarde esse caminho no coração, ele vai te salvar muitas vezes.

Essa separação entre `available` e `enabled` parece burocracia no começo, mas é bem prática. Você pode ter dez configurações prontas e ativar só as que quiser, sem precisar apagar nada.

## Criando nosso próprio site

Cada site merece sua própria casa, então vamos criar uma pasta só para ele:

```bash
sudo mkdir -p /var/www/meusite
sudo chown -R $USER:$USER /var/www/meusite
```

O `-p` do `mkdir` cria a pasta e qualquer pasta intermediária que não exista, sem reclamar se ela já existir. O `chown` muda o dono da pasta para o seu usuário. `$USER` é uma variável do Bash que guarda o seu nome de usuário, e o `-R` aplica isso a tudo que estiver dentro. Fazemos isso para conseguir editar os arquivos sem precisar de `sudo` toda hora. O Nginx continua conseguindo ler, pois as permissões padrão permitem leitura para os outros usuários do sistema.

Agora crie a página:

```bash
nano /var/www/meusite/index.html
```

E escreva algo seu. Pode ser simples, pode ser feio, não importa:

```html
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Meu primeiro servidor</title>
</head>
<body>
    <h1>OLAAAAA MUNDO!!</h1>
    <p>Essa página está sendo servida pelo meu próprio Nginx.</p>
</body>
</html>
```

Sim, esse "OLAAAAA MUNDO!!" é uma homenagem ao primeiro HTML que escrevi na vida. Não resisti.

Salve com `Ctrl + O`, Enter, e saia com `Ctrl + X`.

## Configurando o server block

No Nginx, cada site é descrito por um bloco `server`. Vamos criar o nosso:

```bash
sudo nano /etc/nginx/sites-available/meusite
```

Coloque o seguinte:

```nginx
server {
    listen 8080;
    listen [::]:8080;

    server_name localhost;

    root /var/www/meusite;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }
}
```

Não copie esse bloco sem entender pelo menos a intenção de cada linha:

- **`listen 8080;`** diz ao Nginx para escutar na porta 8080. A segunda linha faz o mesmo para IPv6. Estou usando a 8080 de propósito, para não brigar com a página padrão que já ocupa a porta 80 e para você ver na prática que porta é só um número combinado.
- **`server_name`** é o nome pelo qual esse site responde. Quando você tiver um domínio, ele vai aqui, como `meusite.com.br`.
- **`root`** é a pasta onde estão os arquivos do site.
- **`index`** é o arquivo entregue quando alguém pede só a pasta, sem dizer qual arquivo quer.
- **`location /`** define regras para todos os caminhos que começam com `/`, ou seja, todos. O `try_files` tenta encontrar o arquivo exato (`$uri`), depois uma pasta com esse nome (`$uri/`) e, se nada existir, devolve um `404`.

Repare que toda linha termina com ponto e vírgula. Esquecer um `;` é provavelmente o erro mais comum de quem está começando com Nginx, e duvido que exista alguém que nunca tenha perdido tempo por causa dele.

## Ativando o site

Agora criamos o atalho em `sites-enabled`:

```bash
sudo ln -s /etc/nginx/sites-available/meusite /etc/nginx/sites-enabled/
```

O `ln -s` cria um link simbólico, que é basicamente um atalho. O arquivo de verdade continua em `sites-available`; o `sites-enabled` só aponta para ele.

**Antes de recarregar qualquer coisa, sempre teste a configuração:**

```bash
sudo nginx -t
```

Se aparecer `syntax is ok` e `test is successful`, pode seguir. Se aparecer erro, leia a mensagem. Ela vai dizer o arquivo e a linha exata do problema, e muitas vezes vai ser aquele ponto e vírgula que ficou para trás. Esse comando é seu cinto de segurança: em um servidor de verdade, recarregar uma configuração quebrada pode derrubar todos os sites que estão nele, não só o seu.

Com o teste ok, recarregue:

```bash
sudo systemctl reload nginx
```

`reload` é diferente de `restart`. O `restart` desliga e liga o serviço, derrubando quem estiver conectado naquele momento. O `reload` só pede ao Nginx que leia a configuração de novo, sem interromper nada. Sempre que puder, prefira o `reload`.

Agora teste:

```bash
curl http://localhost:8080
```

Seu HTML deve aparecer no terminal. Abra também `http://localhost:8080` no navegador e veja sua página ali, servida por um servidor que você mesmo configurou.

## Logs: o lugar onde as respostas moram

Quando algo der errado (e vai dar), não saia reinstalando o Nginx. Leia os logs:

```bash
sudo tail -f /var/log/nginx/access.log
```

O `tail` mostra as últimas linhas de um arquivo, e o `-f` continua acompanhando em tempo real. Deixe esse terminal aberto, atualize a página no navegador algumas vezes e veja cada requisição aparecendo: o IP de quem pediu, a hora, o caminho e o código de resposta. Para sair, `Ctrl + C`.

Se o problema for erro mesmo, o lugar é outro:

```bash
sudo tail -n 50 /var/log/nginx/error.log
```

O `-n 50` mostra as últimas 50 linhas. Um `403 Forbidden`, por exemplo, quase sempre vai aparecer aqui explicando que o Nginx não teve permissão para ler alguma pasta.

## Quebre de propósito

Essa é a minha parte favorita. Vamos quebrar algumas coisas para aprender a consertar:

1. Acesse `http://localhost:8080/naoexiste.html`. Veja o `404` e procure essa requisição no `access.log`.
2. Abra o arquivo `meusite` e apague o ponto e vírgula de alguma linha. Rode `sudo nginx -t` e leia o erro. Depois corrija.
3. Renomeie o `index.html` para `inicio.html` e acesse a página de novo. Entenda por que deu erro e corrija pela configuração, mudando a linha `index`, em vez de renomear o arquivo de volta.

Cada um desses erros vai acontecer com você em algum momento, e muito provavelmente em um momento menos tranquilo do que agora. Melhor conhecer eles no seu ambiente de testes.

## E para colocar na internet de verdade?

Até aqui, seu site responde na sua máquina. Para que outras pessoas acessem, existem alguns caminhos, e cada um vai ganhar seu próprio tutorial:

- **VPS com IP público:** você aluga um servidor, repete exatamente esses passos lá, muda o `listen` para `80`, aponta seu domínio para o IP e libera as portas no firewall.
- **HTTPS com Let's Encrypt:** com o domínio apontando para a VPS, o Certbot gera e renova seu certificado de graça com `sudo apt install certbot python3-certbot-nginx` e depois `sudo certbot --nginx -d seudominio.com`.
- **Cloudflare Tunnel:** cria um túnel de saída da sua máquina até a Cloudflare, sem abrir portas no seu roteador. É o que eu teria amado ter lá na época em que dependia do ngrok.

Mas não corra para essa parte ainda. Abrir uma porta para a internet sem entender o que está expondo é pedir para ter problemas. Antes de expor qualquer coisa, aprenda o básico de segurança de redes: firewall, portas abertas e acesso SSH com chave.

## Seu checkpoint

Antes de seguir, confirme se você consegue:

- Instalar o Nginx e verificar se ele está rodando com `systemctl status`.
- Testar uma resposta com `curl`.
- Explicar a diferença entre `sites-available` e `sites-enabled`.
- Criar um server block escutando em uma porta escolhida por você.
- Testar a configuração com `nginx -t` antes de recarregar.
- Encontrar uma requisição no `access.log` e um erro no `error.log`.

Se conseguiu, parabéns: você não só tem um servidor web rodando, como sabe o que cada peça dele está fazendo.

---

**Uma última palavra:**

Painéis, plataformas de deploy e serviços que fazem tudo com um clique são ótimos, e você deve sim usar. Mas foi justamente saber fazer isso na unha que me salvou nas vezes em que a ferramenta bonita não resolvia o problema.

Então domine a base primeiro. Depois use todas as facilidades que quiser, com a tranquilidade de saber o que está acontecendo por baixo.

Agora abra seu terminal e coloque seu primeiro servidor para responder.
