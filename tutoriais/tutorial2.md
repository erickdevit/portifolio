---
Bom, no [tutorial anterior](/tutorial.html?file=tutoriais/tutorial1.md&title=Como%20Instalar%20um%20Servidor%20Web%20B%C3%A1sico&date=2026-11-13) colocamos um Nginx para responder na nossa máquina e terminamos falando que abrir qualquer coisa para a internet sem entender o que está sendo exposto é pedir para ter problemas. Agora vamos entender o porquê disso e, principalmente, como se proteger, sem paranoia e sem transformar isso em um filme de hacker com tela verde e música dramática (mesmo que esse site seja literalmente uma tela verde).

Segurança de redes é um assunto gigantesco. Existem profissionais que passam a vida inteira estudando só uma pequena parte dele. Então vamos deixar uma coisa bem definida desde o início: meu objetivo aqui não é te transformar em especialista em segurança, mas sim fazer você parar de cometer os erros básicos que derrubam a maior parte das pessoas. E acredite, a maioria dos problemas reais não vem de um ataque genial e cinematográfico, vem de uma porta esquecida aberta, uma senha fraca ou um sistema sem atualização há dois anos.

**Antes de começarmos, preciso deixar algo claro:** tudo que vamos fazer aqui é na **sua** máquina ou em servidores que **você** administra. Escanear, testar ou tentar acessar sistemas de outras pessoas sem autorização não é aprendizado, é problema, inclusive legal. Hacker de verdade constrói e protege, não sai bisbilhotando o que não é dele.

## Pense como uma casa

A melhor forma que encontrei de explicar segurança de rede é pensar no seu servidor como uma casa:

- **O IP** é o endereço da casa.
- **As portas** são literalmente as portas e janelas. Cada serviço rodando e escutando na rede é uma porta aberta.
- **O firewall** é o porteiro que decide quem pode bater em qual porta.
- **As senhas e chaves** são as fechaduras.
- **As atualizações** são o reparo das fechaduras que alguém descobriu como abrir.

Agora pense: quanto mais portas abertas, mais lugares para alguém tentar entrar. Isso tem um nome bonito, **superfície de ataque**. E a regra mais importante de todo este tutorial é simples: **diminua sua superfície de ataque.** Se um serviço não precisa estar acessível, ele não deve estar acessível. Ponto.

## Descobrindo quais portas estão abertas

Você não consegue proteger aquilo que nem sabe que existe. Então o primeiro passo é perguntar ao sistema quais programas estão escutando na rede:

```bash
sudo ss -tulpn
```

O `ss` mostra informações sobre conexões de rede, e cada letra das opções tem um motivo:

- **`-t`** mostra conexões TCP.
- **`-u`** mostra conexões UDP.
- **`-l`** mostra só quem está escutando, esperando conexão.
- **`-p`** mostra qual processo é dono daquela porta (por isso o `sudo`, para ver processos de outros usuários).
- **`-n`** mostra números em vez de nomes, ou seja, `80` em vez de `http`.

Se você seguiu o tutorial anterior, vai ver o Nginx ali nas portas 80 e 8080. Agora preste atenção na coluna `Local Address:Port`, porque é aqui que mora um dos conceitos mais importantes deste tutorial.

## 127.0.0.1 ou 0.0.0.0? Essa diferença importa muito

Lembra que no post dos [seis pilares](/blog/do-zero-ao-hacker.html) eu falei que você precisava entender o que é `127.0.0.1` e o que é `0.0.0.0`? Pois é, aqui isso deixa de ser teoria.

- **`127.0.0.1`** (ou `localhost`) significa que o serviço só aceita conexões vindas da própria máquina. Ninguém de fora consegue nem bater na porta.
- **`0.0.0.0`** significa "escutar em todas as interfaces de rede". Qualquer um que consiga alcançar sua máquina pode tentar se conectar.

Vamos ver na prática. Abra um terminal e suba um servidor rápido com Python, escutando só localmente:

```bash
python3 -m http.server 8000 --bind 127.0.0.1
```

Em outro terminal, rode `sudo ss -tulpn | grep 8000`. Você verá `127.0.0.1:8000`. Agora pare o servidor com `Ctrl + C` e suba de novo assim:

```bash
python3 -m http.server 8000 --bind 0.0.0.0
```

Rode o `ss` de novo e veja `0.0.0.0:8000`. Agora qualquer dispositivo na sua rede consegue acessar esse servidor, que está mostrando a lista de arquivos da pasta onde você o iniciou. Imagine fazer isso sem querer dentro da sua pasta pessoal, em uma rede de cafeteria. Nossa, que medo.

Muitos frameworks, bancos de dados e ferramentas de desenvolvimento escutam em `127.0.0.1` por padrão justamente por isso, mas nem todos. Sempre confira. Banco de dados, painel de administração e servidor de desenvolvimento **quase nunca** precisam estar em `0.0.0.0`.

## Firewall: o porteiro da casa

Mesmo com tudo bem configurado, precisamos de um porteiro. No Ubuntu, o jeito mais simples de lidar com o firewall é o **UFW** (*Uncomplicated Firewall*, e ele faz jus ao nome). Por baixo, ele configura as regras do firewall do kernel Linux, mas com comandos que uma pessoa normal consegue ler.

Esta parte faz mais sentido em uma VPS, máquina virtual ou servidor Linux. No WSL, quem protege a rede é o firewall do próprio Windows, então use esta seção para entender e praticar em uma VM ou servidor.

Instale, caso ainda não tenha:

```bash
sudo apt install ufw -y
```

**Atenção redobrada aqui.** Se você estiver em um servidor remoto acessando por SSH, libere o SSH **antes** de ativar o firewall:

```bash
sudo ufw allow OpenSSH
```

Eu sei que pareço repetitivo, mas é sério. Ativar o firewall sem liberar o SSH em uma VPS é trancar a porta da casa com você do lado de fora e a chave do lado de dentro. Muita gente já precisou abrir chamado no provedor ou usar o console de emergência por causa disso.

Agora defina a política padrão: bloquear tudo que entra e permitir tudo que sai.

```bash
sudo ufw default deny incoming
sudo ufw default allow outgoing
```

Essa é a lógica certa: em vez de tentar lembrar tudo que deve ser bloqueado, bloqueamos tudo e liberamos só o que precisa. Como temos um Nginx, vamos liberar HTTP e HTTPS:

```bash
sudo ufw allow 'Nginx Full'
```

O `Nginx Full` é um perfil que o próprio pacote do Nginx registra, liberando as portas 80 e 443 de uma vez. Você pode ver todos os perfis disponíveis com `sudo ufw app list`. Agora sim, ative e confira:

```bash
sudo ufw enable
sudo ufw status verbose
```

Repare que a porta 8080 do nosso site de teste **não** foi liberada. Ela continua funcionando na sua máquina, mas quem estiver de fora vai dar de cara com o porteiro. Exatamente o que queremos para algo que ainda é teste.

## SSH: troque a senha por uma chave

Se você tem um servidor exposto na internet, pode ter certeza de que existem robôs tentando entrar nele pelo SSH neste exato momento, testando `root` com `123456`, `admin` com `admin` e todas as combinações que você imaginar. Não é pessoal, eles fazem isso com todo IP que existe. Dê um `sudo tail -f /var/log/auth.log` em uma VPS recém-criada e veja com seus próprios olhos.

A melhor defesa é simples: **não use senha para entrar via SSH, use chave**. Na sua máquina (não no servidor), gere um par de chaves:

```bash
ssh-keygen -t ed25519 -C "voce@exemplo.com"
```

O `-t ed25519` escolhe um tipo de chave moderno, curto e seguro, e o `-C` é só um comentário para você identificar a chave depois. Ele vai perguntar onde salvar (Enter aceita o padrão) e uma *passphrase*. Use uma. Ela protege sua chave caso alguém consiga copiar o arquivo.

Isso gera dois arquivos: a chave **privada** (`~/.ssh/id_ed25519`), que **nunca** sai da sua máquina e nunca é enviada para ninguém, e a chave **pública** (`~/.ssh/id_ed25519.pub`), que você pode entregar para os servidores. Pense na pública como um cadeado que você instala na porta e na privada como a única chave que abre esse cadeado.

Envie a chave pública para o servidor:

```bash
ssh-copy-id usuario@ip-do-servidor
```

Teste se consegue entrar sem digitar a senha do servidor (ele vai pedir só a passphrase da chave, se você definiu uma):

```bash
ssh usuario@ip-do-servidor
```

**Só depois de confirmar que a chave funciona**, vamos desativar o login por senha e o login direto como root. No servidor, crie um arquivo de configuração próprio:

```bash
sudo nano /etc/ssh/sshd_config.d/00-seguranca.conf
```

Com este conteúdo:

```ini
PasswordAuthentication no
PermitRootLogin no
```

Por que um arquivo novo em vez de editar o `sshd_config` principal? Porque no Ubuntu o arquivo principal inclui tudo que está em `sshd_config.d/`, e alguns provedores colocam ali arquivos que reativam o login por senha. O SSH usa o **primeiro** valor que encontra para cada opção, e os arquivos são lidos em ordem alfabética, por isso o `00-` no começo do nome: queremos que a nossa regra chegue primeiro.

Teste a configuração e confira o que realmente ficou valendo:

```bash
sudo sshd -t
sudo sshd -T | grep -E "passwordauthentication|permitrootlogin"
```

O `-t` testa se não tem erro de sintaxe, e o `-T` mostra a configuração final que o SSH vai usar. Os dois devem aparecer como `no`. Agora recarregue o serviço:

```bash
sudo systemctl reload ssh
```

**Não feche a sessão atual ainda.** Abra outro terminal e tente entrar de novo. Se funcionar, ótimo. Se não funcionar, você ainda tem a sessão antiga aberta para corrigir. Esse hábito de manter uma porta aberta enquanto testa a nova vai te salvar muitas vezes.

## Fail2ban: o segurança que barra os insistentes

Mesmo com chave, os robôs vão continuar tentando e enchendo seus logs. O **Fail2ban** observa esses logs e, quando um IP erra demais, ele bloqueia esse IP no firewall por um tempo.

```bash
sudo apt install fail2ban -y
sudo systemctl enable --now fail2ban
sudo fail2ban-client status sshd
```

No Ubuntu e no Debian, a proteção do SSH (a chamada *jail* `sshd`) já costuma vir ativada. Se o último comando reclamar que a jail não existe, crie o arquivo `/etc/fail2ban/jail.local` com:

```ini
[sshd]
enabled = true
backend = systemd
```

E reinicie com `sudo systemctl restart fail2ban`. O `backend = systemd` diz para ele ler os logs pelo journal do `systemd`, que é onde muitas versões mais novas guardam as tentativas de login. Depois de algumas horas com o servidor exposto, rode o `status sshd` de novo e veja a lista de IPs banidos crescer. É até divertido.

## Atualizações: a fechadura que precisa de reparo

Lembra quando eu disse que a maioria dos problemas vem de sistema desatualizado? Toda semana são descobertas falhas em programas que todo mundo usa. Quando uma falha vira pública, a correção normalmente já existe, e quem atualiza fica protegido. Quem não atualiza vira alvo fácil para robôs que procuram exatamente aquela versão vulnerável.

No Ubuntu, você pode deixar as atualizações de segurança automáticas:

```bash
sudo apt install unattended-upgrades -y
sudo dpkg-reconfigure -plow unattended-upgrades
```

O segundo comando abre uma pergunta simples; escolha **Yes**. A partir daí, as atualizações de segurança são instaladas sozinhas. Isso não substitui você dar um `sudo apt update && sudo apt upgrade` de vez em quando, mas já te protege das correções mais urgentes enquanto você está ocupado vivendo a vida.

## A pegadinha do Docker

Isso aqui eu preciso que você grave, porque pega muita gente experiente. Lembra do Docker, nosso sexto pilar? Quando você publica uma porta com `-p`, por exemplo:

```bash
docker run -d -p 5432:5432 postgres
```

O Docker cria as próprias regras de firewall direto no kernel, **passando por cima do UFW**. Ou seja: você pode ter o UFW bloqueando tudo, achar que está protegido, e seu banco de dados estar aberto para a internet inteira. Sim, é isso mesmo. Não são poucos os casos de bancos de dados sequestrados exatamente assim.

A solução mais simples é publicar a porta só no localhost, colocando o IP antes:

```bash
docker run -d -p 127.0.0.1:5432:5432 postgres
```

Agora a porta 5432 só é acessível pela sua própria máquina. No `compose.yml`, a ideia é a mesma: escreva `"127.0.0.1:5432:5432"` em vez de `"5432:5432"`. E melhor ainda: se o banco só precisa conversar com a sua aplicação, que também está em um container, nem publique a porta. Deixe os dois na mesma rede do Docker e pronto, lembra que a rede é justamente o que conecta os serviços?

## Teste a sua própria casa por fora

Até agora olhamos as portas de dentro. Agora vamos olhar como um estranho veria. O **nmap** é uma ferramenta que escaneia um endereço e descobre quais portas estão respondendo:

```bash
sudo apt install nmap -y
nmap localhost
```

Isso mostra o que está aberto na sua própria máquina. O teste mais honesto, porém, é rodar o `nmap` **de outra máquina**, apontando para o IP do seu servidor:

```bash
nmap ip-do-seu-servidor
```

Se aparecer alguma porta que você não esperava, investigue: descubra com o `ss -tulpn` qual programa é o dono dela e decida se ele precisa mesmo estar ali. E reforçando: use o nmap somente em máquinas que são suas ou que você tem autorização por escrito para testar.

## Quebre de propósito

Seguindo nossa tradição:

1. Suba o `http.server` do Python em `0.0.0.0` e acesse pelo celular, usando o IP da sua máquina na rede local. Depois suba em `127.0.0.1` e tente de novo. Entenda a diferença na prática.
2. Em uma VM com UFW ativo, remova a regra do Nginx com `sudo ufw delete allow 'Nginx Full'` e tente acessar o site de outra máquina. Depois libere de novo.
3. Suba um container com `-p 8081:80` usando a imagem `nginx`, com o UFW bloqueando a 8081, e teste de outra máquina. Veja a pegadinha do Docker acontecendo. Depois troque para `-p 127.0.0.1:8081:80` e teste de novo.

## Seu checkpoint

Antes de seguir, confirme se você consegue:

- Listar as portas abertas e seus processos com `ss -tulpn`.
- Explicar a diferença entre `127.0.0.1` e `0.0.0.0`.
- Configurar o UFW negando tudo por padrão e liberando só o necessário, sem se trancar do lado de fora.
- Gerar uma chave SSH e entender a diferença entre a pública e a privada.
- Desativar o login por senha e o login como root no SSH.
- Ativar o Fail2ban e as atualizações automáticas de segurança.
- Publicar portas do Docker somente no localhost.
- Escanear o seu próprio servidor com o nmap.

Se conseguiu tudo isso, seu servidor já está mais protegido do que uma quantidade assustadora de servidores que existem por aí.

---

**Uma última palavra antes de seguirmos:**

Segurança não é um produto que você instala uma vez e esquece. É um hábito. É conferir antes de abrir, perguntar se aquilo realmente precisa estar exposto, manter as coisas atualizadas e desconfiar do que parece fácil demais. Nada disso é difícil, só exige constância.

E não deixe o medo te paralisar. Você vai errar, vai deixar alguma porta aberta em algum momento e vai aprender com isso, como eu aprendi. O importante é que agora você sabe onde olhar.

Em um próximo post vamos falar de Cloudflare Tunnel e Zero Trust, que permitem colocar serviços na internet sem abrir uma única porta no seu servidor. Mas aí já é assunto para outro dia.
