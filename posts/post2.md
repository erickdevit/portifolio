---
Bom, no post anterior eu apresentei os seis pilares que considero fundamentais para sair do absoluto zero e chegar ao ponto de criar soluções de verdade. Agora vamos parar de olhar o mapa inteiro e colocar o pé na primeira parte da trilha: montar nosso ambiente de desenvolvimento, da forma mais simples possível e sem transformar isso em uma aventura desnecessária.

Talvez isso pareça apenas uma preparação para começar a programar, aquela etapa chata em que instalamos algumas coisas, escolhemos um editor e seguimos em frente. Mas não é. **Montar seu ambiente já é começar a programar.** É nele que você vai escrever, errar, apagar, testar, quebrar e entender tudo aquilo que antes existia somente na sua cabeça.

No post anterior contei que escrevia HTML em um caderno porque ainda não tinha um computador, e aquilo era literalmente todo o ambiente de desenvolvimento disponível para mim. Não tinha como executar, não tinha como descobrir se uma tag estava errada e nem mesmo como ver a página horrorosa que eu provavelmente estava criando. Ainda assim eu fazia. Não estou falando que você precisa aprender da forma mais difícil, seria uma grande besteira romantizar aquela falta de recursos. O que quero deixar claro é que esperar pelo ambiente perfeito pode te atrasar muito mais do que começar com aquilo que você tem agora.

E é exatamente isso que construiremos agora.

## Seu ambiente não precisa impressionar ninguém

Uma das primeiras distrações de quem começa é acreditar que precisa ter o computador mais forte, a distribuição Linux mais bonita, um teclado que pisca até o teto e aquele terminal transparente cheio de informações que ninguém realmente lê. Você abre um vídeo de programação e antes de aprender a criar uma variável já está pesquisando qual tema deixa o VS Code mais parecido com uma nave espacial. Quando percebe, perdeu o tempo que usaria para aprender configurando algo que nem sabe para que serve.

Eu entendo. Deixar o nosso espaço com a nossa cara é legal e faz parte da experiência. O problema começa quando a personalização toma o lugar da prática. Você passa três dias escolhendo fonte, tema, ícones, shell, prompt e atalhos, mas ainda não executou uma única linha de código.

Então vamos deixar uma coisa bem definida desde o início: seu ambiente precisa permitir que você tenha uma ideia e consiga testá-la sem lutar contra a própria máquina. É isso. Se toda vez que for estudar você precisar corrigir o editor, atualizar cinco plugins e descobrir por que seu terminal deixou de funcionar, tem alguma coisa muito errada nessa montagem.

Se você tem um computador com Windows, use o Windows. Se já usa Linux, continue no Linux. Se tem um Mac, use o macOS e não ache que precisa instalar outro sistema para acompanhar essa jornada. Se a única coisa disponível agora é um computador antigo, use esse computador antigo. A ferramenta que está nas suas mãos hoje é infinitamente mais útil do que a ferramenta perfeita que você pretende ter algum dia.

## O que realmente forma um ambiente de desenvolvimento?

Quando falamos em ambiente, não estamos falando de um único programa. Estamos falando do conjunto mínimo de ferramentas que permite criar e executar aquilo que você está aprendendo. Para começar, precisamos de quatro coisas:

* **Um sistema operacional funcionando e que você já saiba usar no dia a dia**
* **Um terminal para conversar diretamente com o sistema**
* **Um editor para escrever seus arquivos**
* **Uma pasta organizada para guardar seus projetos**

Sim, apenas isso. Python, Git e Docker vão entrar nessa estrutura agora, mas Git e Docker terão seus próprios momentos de atenção nos próximos pilares. Por enquanto, vamos instalar e testar tudo, sem tentar dominar ferramentas que ainda nem começamos a usar.

Você não precisa começar configurando banco de dados, servidor web, cinco versões de Node e quarenta extensões no editor. Vamos deixar Python, Git e Docker preparados porque eles fazem parte da base que seguiremos, mas não vamos sair ativando tudo que aparecer pela frente. Isso só criaria quarenta novas formas de algo dar errado sem que você saiba o motivo.

Comece pequeno. Entenda cada peça que está colocando na sua bancada. Depois nós aumentamos essa bancada juntos.

## Windows, macOS ou Linux?

Essa pergunta já me fez perder muito tempo no passado e provavelmente vai fazer você perder também se não tomar cuidado. Meu primeiro contato com um computador foi em um laboratório usando Ubuntu, quando eu ainda queria encontrar o tal Windows sobre o qual tinha lido. Eu vi aquele nome estranho, abri o Firefox, encontrei um monte de coisa em inglês e desisti. Naquele momento fiquei triste de verdade, pois achei que não poderia colocar meu HTML em prática só porque o sistema não era o que aparecia no livro. Mais à frente, meu primeiro computador veio com Windows XP e foi nele que finalmente executei aquele HTML que havia praticado tantas vezes no caderno.

O sistema era diferente, mas o HTML continuaria funcionando. Eu só não sabia disso ainda. Hoje gosto muito de Linux, trabalho com ele e minha escolha pessoal seria Linux com toda certeza. Aprender seu funcionamento vai abrir possibilidades enormes na sua vida, principalmente quando chegarmos aos servidores. Mas não transforme minha preferência em uma obrigação sua logo no primeiro dia. Windows, macOS e Linux são totalmente capazes de nos levar por essa jornada. Trocar de sistema sem ainda saber diferenciar um problema do código de um problema do ambiente pode colocar uma dificuldade totalmente desnecessária no caminho.

Minha recomendação será bem direta:

- Se você já usa **Windows**, continue no Windows, mas vamos preparar o WSL com Ubuntu para termos Bash de verdade.
- Se você já usa **macOS**, comece com macOS e o Terminal.
- Se você já usa **Linux**, continue na sua distribuição atual e use o terminal dela ou aquele que você já prefere.

Agora, se você quer aproveitar essa jornada para experimentar Linux, recomendo Ubuntu. Ele entrega uma experiência simples, tem muita documentação e dificilmente vai fazer você passar a primeira semana tentando descobrir por que o Wi-Fi virou um conceito abstrato. Quer ir para um lado um pouco mais diferente? Você também pode testar o [Omybuntu](https://omybuntu.com), minha própria distribuição baseada no Ubuntu e focada em um ambiente bonito e pronto para desenvolvimento. Ela já está disponível em alfa, então pode usar, testar e até reclamar diretamente com o culpado, que no caso sou eu mesmo. Mas alfa é alfa: teste primeiro em uma máquina virtual ou computador secundário e mantenha backup dos seus arquivos antes de pensar em usar como sistema principal. Não quero que nossa primeira conversa seja você me perguntando onde foi parar a pasta Documentos.

## Windows: preparando o WSL com Ubuntu

No Windows, vamos usar o WSL 2 porque precisaremos do Bash e de ferramentas que nasceram no Linux. WSL significa **Windows Subsystem for Linux**, ou Subsistema do Windows para Linux. O nome parece coisa criada para assustar gente normal, mas a ideia é bem simples: ele permite executar um ambiente Linux dentro do Windows, lado a lado com seus programas de sempre, sem formatar o computador e sem fazer dual boot.

Dual boot seria dividir o computador entre dois sistemas e escolher um deles toda vez que ele liga. No WSL você não precisa reiniciar para sair do Windows e entrar no Linux. O Windows continua sendo seu sistema principal, com navegador, arquivos e aplicativos normalmente, enquanto o Ubuntu abre em uma janela como qualquer outro programa. Por baixo disso, o WSL 2 usa uma máquina virtual leve com um kernel Linux real. Esse kernel é o coração do sistema, a parte que conversa com processador, memória, discos e processos. É justamente por ter esse Linux real nos bastidores que comandos, programas e serviços funcionam de forma muito parecida com um servidor Ubuntu.

Isso é importante porque grande parte da internet roda em Linux. Quando você aprende Bash, Python, Git e Docker dentro do Ubuntu no WSL, não está brincando em uma imitação estranha do terminal. Está usando praticamente as mesmas ferramentas que encontrará em servidores, clouds e pipelines de automação. Assim você continua com a praticidade do Windows, mas ganha um pedacinho muito poderoso do mundo Linux sem precisar sacrificar sua instalação inteira aos deuses do particionamento.

Abra o PowerShell como administrador e execute:

```powershell
wsl --install -d Ubuntu
```

Reinicie o computador quando o Windows pedir. Na primeira vez que abrir o Ubuntu pelo menu Iniciar, ele solicitará um nome de usuário e uma senha. A senha não mostra bolinhas, asteriscos e nem sinal de vida enquanto você digita, mas está funcionando. Isso já assustou muita gente, então confie nos seus dedos e pressione Enter.

Depois volte ao PowerShell e confira se o Ubuntu está usando WSL 2:

```powershell
wsl --update
wsl --list --verbose
```

Se a coluna `VERSION` do Ubuntu mostrar `1`, corrija com:

```powershell
wsl --set-version Ubuntu 2
```

Abra novamente o Ubuntu e atualize o sistema:

```bash
sudo apt update
sudo apt upgrade -y
```

Vamos entender esse comando antes de fingir que `sudo apt alguma-coisa` é um feitiço. `sudo` executa uma ação com permissão de administrador e por isso pode pedir a senha que você criou no Ubuntu. Use com cuidado, pois o sistema vai acreditar que você sabe o que está fazendo, mesmo quando claramente ainda estamos descobrindo. `apt update` atualiza a lista de programas e versões disponíveis; ele não atualiza tudo sozinho. Depois, `apt upgrade -y` instala as atualizações encontradas, e o `-y` responde “sim” automaticamente às confirmações.

As versões atuais do Ubuntu instaladas pelo WSL já usam `systemd`, que mais à frente manterá o serviço do Docker funcionando. Confirme com `systemctl status`. Se o comando informar que o sistema não iniciou com `systemd`, abra o arquivo de configuração:

```bash
sudo nano /etc/wsl.conf
```

Adicione estas linhas:

```ini
[boot]
systemd=true
```

No Nano, pressione `Ctrl + O` e Enter para salvar, depois `Ctrl + X` para sair. Feche o Ubuntu, abra o PowerShell e reinicie completamente o WSL:

```powershell
wsl --shutdown
```

Abra o Ubuntu novamente e repita `systemctl status`. Agora ele deve mostrar o sistema em execução.

Esse `systemd` também merece uma tradução. Ele é o gerenciador que inicia e acompanha serviços do Linux. Um serviço é um programa que fica funcionando nos bastidores, sem precisar de uma janela aberta. O Docker Engine será um desses serviços. Quando usamos `systemctl status`, estamos perguntando se esse gerenciador está vivo e cuidando corretamente do que precisa rodar no sistema.

Pronto. Sempre que eu falar em terminal no Windows daqui para frente, abra o Ubuntu pelo menu Iniciar ou pelo perfil Ubuntu do Windows Terminal. O PowerShell continuará útil, mas nossos comandos de programação e Shell Script serão executados dentro do Bash no WSL.

Também guarde seus projetos dentro do próprio Ubuntu, em uma pasta como `~/projetos`. O símbolo `~` representa a pasta pessoal do seu usuário Linux. O WSL consegue acessar o disco do Windows em caminhos como `/mnt/c`, mas trabalhar diretamente ali pode trazer diferenças de permissão e desempenho. Para nossos projetos, códigos e containers, deixe tudo na casa do Linux e acesse esses arquivos pelo VS Code com a extensão WSL. Menos caminhos estranhos, menos problemas estranhos.

Não formate sua máquina porque alguém disse que programador de verdade usa determinada distribuição. O sistema operacional é uma ferramenta, não um certificado dizendo se você é ou não capaz de programar. Então não entre nessa briga agora.

## O terminal não é um monstro

O terminal costuma assustar porque ele não mostra botões explicando o que deve ser feito. Você encontra uma tela vazia, um cursor piscando e a impressão de que qualquer comando errado vai fazer o computador explodir. Fique tranquilo, ele é muito menos dramático do que parece.

Pense no terminal como uma conversa mais direta com o seu sistema. Em vez de abrir uma pasta clicando duas vezes nela, você escreve o comando para entrar. Em vez de clicar em "Nova pasta", você pede que ele crie uma. A diferença é que essas ações podem ser repetidas, documentadas e automatizadas, algo que vai se tornar muito poderoso mais à frente.

Mas existe uma diferença importante que quase ninguém explica no começo: **terminal e Bash não são a mesma coisa**. O terminal é a janela onde a conversa acontece. O Bash é o intérprete que fica dentro dela, recebendo o texto que você digitou, entendendo o comando e pedindo ao sistema para executar aquilo. Pense no terminal como a tela de um chat e no Bash como a pessoa do outro lado lendo e respondendo suas mensagens. Sem o intérprete, aquela janela seria só um retângulo bonito esperando alguma coisa acontecer.

Bash significa **Bourne Again Shell**, uma brincadeira com o nome de um shell mais antigo chamado Bourne Shell. Um *shell* é justamente esse interpretador de comandos. Bash não serve apenas para digitar `ls` e se sentir um hacker olhando uma lista de pastas. Ele também é uma linguagem de programação. Podemos colocar vários comandos dentro de um arquivo, criar condições, repetições, funções e automatizar tarefas que seriam extremamente chatas de fazer uma por uma.

É aí que mora sua importância. Com Bash você pode preparar um servidor, instalar dependências, organizar arquivos, fazer backups, iniciar aplicações, executar testes e automatizar um deploy inteiro. Muitos processos de Git, Docker, servidores e CI/CD acabam passando por comandos de shell em algum momento. Você não precisa decorar centenas deles agora, mas precisa perder o medo dessa tela, pois ela vai aparecer muitas vezes na nossa caminhada.

No Windows, abra o Ubuntu do WSL. No macOS, abra o aplicativo Terminal e execute `bash` para entrar no Bash. No Linux, use o terminal da sua distribuição ou qualquer outro da sua preferência. O importante é confirmar que o Bash está disponível:

```bash
bash --version
```

No Ubuntu do WSL ele já estará pronto. No macOS o Bash também já vem disponível, mesmo que o shell padrão seja o Zsh. A versão incluída pela Apple costuma ser a antiga 3.2, mas todos os comandos desta etapa funcionam nela; quando aprofundarmos nossos conhecimentos em Shell Script, veremos se precisamos instalar uma versão mais atual. No Linux, caso sua distribuição não traga Bash por padrão, instale o pacote `bash` pelo gerenciador dela. Agora descubra em qual pasta você está:

```bash
pwd
```

Liste o que existe nela:

```bash
ls
```

Crie a pasta onde ficarão nossos estudos e entre nela:

```bash
mkdir projetos
cd projetos
```

Esses comandos funcionam no Bash do WSL, no macOS e no Linux. Não tente decorar tudo de uma vez. Use, erre, consulte e use de novo. Em pouco tempo seus dedos vão lembrar antes mesmo de você pensar.

Observe também o formato dos comandos. Em `mkdir projetos`, `mkdir` é o programa que cria uma pasta e `projetos` é o argumento, ou seja, a informação que entregamos para ele trabalhar. Em `apt upgrade -y`, o `-y` é uma opção que modifica o comportamento do comando. Programa, argumentos e opções: você encontrará essa mesma estrutura muitas vezes, mesmo quando os nomes mudarem completamente.

Antes de abrir nosso primeiro projeto, escolha seu editor. Pode ser VS Code, Neovim ou qualquer outro da sua preferência. Eu vou usar o VS Code nos exemplos por ser uma experiência bem simples para quem está começando, mas se você já vive feliz dentro do Neovim não serei eu quem vai tentar te tirar de lá.

Se for acompanhar com ele, instale o [VS Code pelo site oficial](https://code.visualstudio.com/Download), escolhendo a versão do seu sistema. No Windows, siga o instalador e adicione a extensão **WSL** para abrir diretamente as pastas do Ubuntu. No macOS, abra o arquivo baixado e mova o Visual Studio Code para a pasta `Applications`. No Linux, use o pacote indicado para sua distribuição. Abra o editor pelo menos uma vez e instale somente a extensão oficial do Python, nada de sair enchendo ele de coisas agora.

## Uma casa para cada projeto

Organização parece uma preocupação pequena quando temos apenas um arquivo chamado `teste.py`. O problema aparece quando começamos a ter `teste2.py`, `teste_agora_vai.py`, `teste_final.py` e o clássico `teste_final_certo_agora.py` espalhados pela Área de Trabalho.

Não faça isso com você mesmo.

Dentro da pasta `projetos`, cada ideia deve ter sua própria casa. Vamos criar a primeira:

```bash
mkdir primeiro-ambiente
cd primeiro-ambiente
```

Use nomes simples, sem espaços e que expliquem o que existe ali. Não precisa criar uma arquitetura de empresa para guardar um Hello World, mas também não jogue tudo no mesmo lugar. Essa pequena disciplina vai facilitar o uso do Git, dos ambientes virtuais, do Docker e de praticamente tudo que aprenderemos depois.

Agora abra exatamente essa pasta no editor escolhido. No VS Code:

```bash
code .
```

No Neovim:

```bash
nvim .
```

O ponto no final significa "a pasta em que estou agora". No Windows com WSL e no Linux, a instalação do VS Code normalmente já deixa o comando `code` disponível. No macOS, abra o VS Code, pressione `Command + Shift + P` e execute **Shell Command: Install 'code' command in PATH**. Se o comando ainda não funcionar, não entre em pânico e nem reinstale tudo imediatamente. Abra seu editor normalmente e selecione a pasta `primeiro-ambiente`; depois podemos corrigir o comando com calma.

Olha só o que já aconteceu: você abriu o terminal, navegou pelo sistema, criou uma estrutura organizada e entregou uma pasta inteira para o editor. Talvez ainda não pareça programação, mas você já começou a pensar como alguém que controla o próprio ambiente.

## Instale somente o necessário

Para seguir esta jornada, minha escolha continua sendo Python. No Windows, vamos instalar o Python dentro do Ubuntu no WSL, pois é ali que nosso ambiente de desenvolvimento vai viver. Use os mesmos comandos de Ubuntu que estão logo abaixo.

No macOS, use o [instalador oficial para Mac](https://www.python.org/downloads/macos/), abra o arquivo `.pkg` e conclua a instalação normalmente. O macOS pode até trazer alguma coisa relacionada a Python no sistema, mas não vamos depender disso. A versão que instalamos será chamada pelo comando `python3`.

No Linux, não saia baixando e substituindo o Python do sistema na unha, pois muitas distribuições usam ele em ferramentas internas e você pode criar um problema bem maior do que nosso Hello World. Primeiro verifique se `python3` já existe. Se não existir, instale pelo gerenciador de pacotes da sua distribuição. Em Debian e Ubuntu, por exemplo:

```bash
sudo apt update
sudo apt install python3
```

Depois da instalação, volte ao terminal e verifique. Como nosso Windows também está usando o Ubuntu no WSL, o comando será o mesmo nos três sistemas:

```bash
python3 --version
```

Você deve receber algo parecido com `Python 3.x.x`. O número exato pode ser diferente e está tudo bem. O importante aqui é entender o teste: nós fizemos uma pergunta ao sistema e ele respondeu qual versão consegue executar.

Agora vamos preparar o Git, nosso segundo pilar. Git é um sistema de controle de versão: uma ferramenta que registra como os arquivos de um projeto mudam ao longo do tempo. Gosto de pensar nele como uma máquina do tempo onde você mesmo decide quais momentos merecem virar um ponto seguro. Fez algo funcionar? Cria um checkpoint. Tentou uma ideia e transformou seu projeto em uma criatura irreconhecível? Volta para um checkpoint anterior e respira.

Git e GitHub não são a mesma coisa. O Git é o programa que funciona na sua máquina, inclusive sem internet. GitHub, GitLab e Gitea são serviços onde você pode guardar uma cópia remota do repositório e colaborar com outras pessoas. Você pode usar Git sem GitHub, da mesma forma que pode escrever um documento sem colocar ele no Google Drive. Misturar os dois no começo é muito comum, mas agora você já não tem mais essa desculpa.

Quando uma pasta passa a ser controlada pelo Git, ela vira um **repositório**. Dentro dela, o Git guarda o histórico e algumas informações em uma pasta escondida chamada `.git`. Seus arquivos passam por quatro estados principais:

1. **Não rastreado:** o arquivo é novo e o Git ainda não começou a acompanhar suas mudanças.
2. **Modificado:** o arquivo já era acompanhado, mas foi alterado desde o último commit.
3. **Preparado:** você escolheu quais alterações farão parte do próximo checkpoint. Essa área de preparação também é chamada de *staging area*.
4. **Commitado:** o checkpoint foi criado e entrou no histórico local do projeto.

Depois de concluirmos a instalação e criarmos nosso primeiro arquivo, vamos executar esse fluxo sem pular etapas. `git init` transformará a pasta atual em um repositório, `git status` mostrará o estado dos arquivos, `git add` levará as alterações escolhidas para a área de preparação e `git commit` criará nosso checkpoint. Não execute ainda, pois o arquivo que colocaremos no histórico será criado em alguns minutos.

Um **commit** não é simplesmente apertar “salvar”. Salvar escreve o arquivo atual no disco; o commit registra um estado do projeto com uma mensagem explicando o que mudou. Por isso mensagens como `coisas`, `teste` ou `agora vai` são péssimas. No futuro você vai olhar para aquilo e não fará ideia do que sua versão do passado estava pensando. Escreva algo que ajude, como `adiciona validação do formulário`.

A importância do Git não está apenas em recuperar arquivos apagados. Ele permite comparar mudanças, descobrir quando um problema apareceu, testar ideias em ramificações separadas e trabalhar com outras pessoas sem ficar enviando `projeto-final-agora-vai.zip` pelo WhatsApp. E mesmo trabalhando sozinho, você continua sendo uma equipe formada por você hoje, você amanhã e você daqui a seis meses, que com toda certeza não lembrará por que aquela linha estranha existe.

No Windows, o Git também será instalado dentro do Ubuntu no WSL usando o mesmo comando de Debian e Ubuntu abaixo. Assim o histórico, os arquivos e as permissões ficam todos no mesmo ambiente.

No macOS, instale as ferramentas de linha de comando da Apple, que já incluem o Git:

```bash
xcode-select --install
```

No Linux, use o gerenciador de pacotes da sua distribuição. Em Debian e Ubuntu:

```bash
sudo apt install git
```

Depois faça o mesmo teste de versão:

```bash
git --version
```

Agora vamos instalar também o Docker. Sim, ele é nosso sexto pilar e ainda estamos no primeiro, mas preciso que você entenda por que estamos trazendo essa ferramenta tão cedo. Docker é uma plataforma para empacotar e executar aplicações em ambientes isolados chamados **containers**. Em vez de instalar PostgreSQL, Redis, Nginx e mais uma dúzia de coisas diretamente no seu sistema, podemos colocar cada serviço em seu próprio cantinho, com as versões e dependências que ele realmente precisa.

Isso ataca um problema clássico do desenvolvimento: o famoso “na minha máquina funciona”. Às vezes a aplicação funciona no computador de quem criou porque ali existe uma versão específica do Python, uma biblioteca instalada na mão e uma configuração que ninguém documentou. Ao levar essa aplicação para outro computador, puff, nada funciona. Com Docker, descrevemos o ambiente junto do projeto e conseguimos reproduzir aquilo em outra máquina, em um servidor ou na cloud com muito menos surpresa.

Docker não é exatamente uma máquina virtual. Uma máquina virtual simula um computador inteiro, incluindo outro sistema operacional completo. No Linux e no Ubuntu do WSL, um container isola processos e arquivos, mas compartilha o kernel Linux do ambiente onde está rodando. Por isso containers costumam iniciar mais rápido e consumir menos recursos. No macOS existe um detalhe: o Docker Desktop cria uma pequena máquina virtual Linux nos bastidores, e os containers compartilham o kernel dessa VM, não o kernel do macOS. Você quase não vê essa camada, mas agora sabe que ela está lá trabalhando. Isolado também não significa magicamente invencível: configurações ruins, imagens desconhecidas e portas abertas continuam sendo problemas reais. Docker organiza muita coisa, mas não substitui cuidado e bom senso.

Antes dos comandos, vamos traduzir os nomes que sempre aparecem:

- **Imagem:** é um pacote somente de leitura com os arquivos, bibliotecas e instruções necessárias para criar um ambiente. Pense nela como a planta de uma casa.
- **Container:** é uma instância criada a partir daquela imagem. Ele pode estar em execução ou parado e continua existindo até ser removido. Se a imagem é a planta, o container é a casa construída, mesmo que ninguém esteja dentro dela naquele momento. A mesma imagem pode criar vários containers.
- **Volume:** é um espaço usado para manter dados fora da vida temporária do container. Sem um volume, você pode apagar o container de um banco de dados e descobrir da pior forma que apagou os dados junto.
- **Rede:** permite que containers conversem entre si e, quando configurado, com o lado de fora. É assim que uma aplicação encontra seu banco sem precisar morar dentro do mesmo container.
- **Docker Engine:** é o serviço que realmente cria imagens, inicia containers, configura redes e cuida dos volumes. O processo que fica nos bastidores é chamado de *daemon*.
- **Cliente Docker:** é o comando `docker` que usamos no terminal. Ele recebe o que digitamos e envia o pedido para o Engine. Por isso `docker --version` pode funcionar enquanto `docker info` falha: o cliente existe, mas talvez não esteja conseguindo conversar com o serviço.
- **Docker Compose:** é a ferramenta que descreve vários containers em um arquivo, normalmente `compose.yml`. Assim podemos definir aplicação, banco, rede e volumes juntos e subir tudo com um comando, sem realizar um ritual diferente toda vez.

Parece muita coisa, eu sei. Mas guarde principalmente esta sequência: **imagem cria container, volume guarda dados, rede conecta serviços e Engine faz tudo acontecer**. O restante vai ficando natural conforme usarmos.

No Windows, não vamos usar o Docker Desktop. Nosso Docker Engine será instalado diretamente dentro do Ubuntu no WSL, junto do Bash, do Git, do Python e dos projetos. Docker depende profundamente de recursos do kernel Linux; como o WSL 2 já nos entrega esse kernel, conseguimos executar o Engine dentro do próprio Ubuntu. Isso deixa nosso ambiente mais próximo de um servidor Linux de verdade e evita termos duas instalações diferentes brigando para decidir quem manda nos containers.

No macOS, baixe o [Docker Desktop para Mac](https://docs.docker.com/desktop/setup/install/mac-install/) escolhendo corretamente entre **Apple Silicon** e **Intel**. Abra o `.dmg`, arraste o Docker para `Applications`, execute o aplicativo e conclua a configuração inicial.

No Linux e no Ubuntu do WSL, o Docker Engine deve ser instalado dentro da própria distribuição. Para nosso ambiente de estudo em Debian ou Ubuntu, o próprio Docker oferece um script de conveniência para desenvolvimento. Primeiro baixe e confira o que ele pretende fazer:

```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh ./get-docker.sh --dry-run
```

Não copie esse bloco sem entender pelo menos a intenção. `curl` baixa conteúdo da internet. As opções `-fsSL` fazem o comando falhar quando o servidor responde com erro, trabalhar sem poluir o terminal, ainda mostrar erros importantes e seguir redirecionamentos. `-o get-docker.sh` salva o resultado em um arquivo com esse nome. Já o `--dry-run` pede ao instalador uma simulação: ele mostra o que faria sem instalar de verdade. É nossa chance de conferir antes de dar permissão de administrador para um script vindo da internet.

Se a prévia terminar sem problemas, execute a instalação:

```bash
sudo sh get-docker.sh
```

Aqui o `sh` executa o arquivo e o `sudo` entrega permissão administrativa. É exatamente por isso que a prévia anterior importa. Rodar scripts da internet com `sudo` sem conhecer a origem é como entregar a chave da sua casa para alguém porque o panfleto era bonito. Neste caso estamos usando o endereço oficial do Docker e um ambiente de aprendizado, mas o hábito de conferir precisa começar agora.

Esse atalho é útil para nosso ambiente de aprendizado, mas não deve ser usado cegamente em um servidor de produção. Em outras distribuições, siga a [instalação oficial do Docker Engine](https://docs.docker.com/engine/install/) para seu sistema.

No Ubuntu do WSL e no Linux, deixe o serviço iniciado e permita que seu usuário execute Docker sem precisar escrever `sudo` em toda linha:

```bash
sudo systemctl enable --now docker
sudo usermod -aG docker $USER
newgrp docker
```

O primeiro comando pede ao `systemd` que inicie o Docker agora e também nas próximas inicializações. O segundo adiciona seu usuário ao grupo `docker`; `-aG` significa adicionar a um grupo complementar sem remover os grupos que você já possui. O `newgrp docker` abre uma sessão reconhecendo essa nova permissão imediatamente. Sem isso, normalmente seria necessário fechar o Ubuntu inteiro e abrir novamente.

O grupo `docker` oferece acesso elevado ao sistema, então só faça isso na sua própria máquina e para usuários em quem você confia. No macOS, abra o Docker Desktop e espere ele informar que está em execução. Depois, em qualquer um dos três sistemas, feche e abra o terminal novamente e teste nossas três ferramentas:

```bash
python3 --version
git --version
docker --version
docker compose version
docker info
docker run --rm hello-world
```

Os comandos de versão confirmam quais ferramentas e versões foram instaladas. `docker info` vai além e pergunta ao Engine sobre containers, imagens, armazenamento e configuração; se ele responder, cliente e serviço estão conversando. Por fim, `docker run --rm hello-world` baixa uma pequena imagem de teste, cria um container, executa a mensagem de confirmação e remove o container quando ele termina. O `--rm` significa justamente “remova depois de executar”. É um teste pequeno, mas atravessa praticamente o fluxo inteiro que acabamos de explicar.

No Windows, todos esses comandos devem ser executados dentro do Ubuntu no WSL. No macOS e no Linux também continuaremos usando o Bash que preparamos. Caso o `docker info` ainda informe falta de permissão no Linux ou no WSL, feche totalmente o terminal e abra novamente para o novo grupo do usuário ser reconhecido.

Se Python, Git e Docker responderem com suas versões, ótimo. Se algum comando não for encontrado, leia a mensagem. Não saia reinstalando tudo dez vezes. Feche e abra o terminal novamente, confirme se a instalação terminou e verifique o PATH. O erro não está tentando te expulsar da programação, ele está dizendo exatamente qual peça ainda não conseguiu encontrar.

Não me leve a mal, eu sei que no início uma mensagem dizendo que o comando não existe parece simplesmente dizer que nada deu certo. Mas muitas vezes ela está entregando o problema na nossa cara. Aprender a ler isso vai te poupar horas e, com toda certeza, será uma das coisas mais importantes que você aprenderá aqui.

## Execute algo seu

No editor que você escolheu, crie um arquivo chamado `hello.py` e escreva:

```python
nome = input("Digite seu nome: ")
print(f"Seu ambiente está pronto, {nome}!")
```

Salve o arquivo. Volte ao Bash, confira se ainda está dentro da pasta `primeiro-ambiente` e execute. O comando será o mesmo no Ubuntu do WSL, no macOS e no Linux:

```bash
python3 hello.py
```

Digite seu nome e veja a resposta.

Pode parecer simples demais, e realmente é. Mas existe uma diferença gigantesca entre assistir alguém executando um código em um vídeo e preparar seu próprio ambiente, criar o arquivo e ver sua máquina obedecer a uma instrução que você escreveu. Nossa, essa primeira execução faz toda diferença.

Foi essa sensação que tive quando vi meu primeiro HTML funcionando depois de tanto tempo escrevendo código no papel. O código era simples, a página era feia e não resolvia qualquer problema do mundo. Ainda assim, naquele momento uma coisa ficou provada: eu conseguia criar algo e fazer uma máquina executar.

Você acabou de provar a mesma coisa para si.

## Crie seu primeiro checkpoint no Git

Agora o arquivo existe e funciona, então finalmente temos algo real para guardar. Antes do primeiro commit, configure o nome e email que identificarão seus checkpoints. Isso não precisa ser feito novamente em cada projeto, pois `--global` aplica a configuração ao seu usuário:

```bash
git config --global user.name "Seu Nome"
git config --global user.email "voce@exemplo.com"
```

Use seus próprios dados no lugar dos exemplos. Agora transforme a pasta `primeiro-ambiente` em um repositório e pergunte ao Git o que ele está vendo:

```bash
git init
git status
```

O `hello.py` deve aparecer como **não rastreado**, pois o Git encontrou o arquivo, mas ainda não recebeu autorização para acompanhar ele. Prepare apenas esse arquivo e consulte o estado novamente:

```bash
git add hello.py
git status
```

Agora ele deve aparecer na área de preparação. Isso não criou o checkpoint ainda, apenas separou aquilo que queremos incluir. Finalmente, faça o primeiro commit e confira o estado pela última vez:

```bash
git commit -m "adiciona primeiro programa em Python"
git status
```

Se tudo deu certo, o Git informará que não há mudanças pendentes. Você também verá muito o comando `git add .`, que prepara todas as mudanças da pasta atual. Ele é prático, mas olhe o `git status` antes para não incluir senhas, arquivos enormes ou qualquer outra surpresa. Praticidade sem conferir é uma excelente forma de criar problemas com muita velocidade.

## Quebre de propósito

Agora apague uma das aspas do código e execute novamente. Veja o erro aparecer. Leia a última linha, observe o nome do arquivo e o número indicado. Depois devolva a aspa e execute outra vez.

Por que quebrar algo que acabou de funcionar? Porque seu ambiente não serve somente para confirmar acertos. Ele é principalmente o lugar seguro onde você pode errar sem medo. Quanto mais confortável ficar em criar um erro, ler sua mensagem e corrigir o problema, menos assustadores serão os erros que aparecerem sem convite.

Não trate o texto vermelho do terminal como uma derrota. Ele é uma resposta, muitas vezes bem direta inclusive. A máquina não está dizendo que você não sabe programar, só está dizendo: "Olha, nessa linha aqui tem algo que eu não consegui entender". Leia antes de correr para copiar o erro inteiro no Google, pois a solução pode literalmente estar escrita na sua frente.

Programar será repetir esse ciclo incontáveis vezes:

1. Pensar em algo.
2. Tentar transformar isso em código.
3. Executar.
4. Entender o que aconteceu.
5. Corrigir e tentar novamente.

Seu ambiente precisa tornar esse ciclo simples. É por isso que ele é o primeiro pilar.

## O que você não precisa fazer agora

Você não precisa instalar vinte extensões no VS Code, trocar o terminal que já gosta ou configurar atalhos para ações que ainda nem conhece. E, principalmente, não precisa apagar tudo e começar novamente sempre que encontrar um erro. Todas essas coisas podem ser úteis em algum momento, mas agora vão mais te distrair do que ajudar.

No início, instale no editor somente a extensão oficial da linguagem que estiver usando. Para nós, a extensão oficial do Python será suficiente. Conforme uma necessidade real aparecer, colocamos uma ferramenta nova e entendemos qual problema ela resolve. É bem melhor do que encher o editor de coisas e depois não saber qual delas quebrou tudo.

Também evite copiar configurações gigantes da internet sem entender o que elas mudam. Um arquivo de configuração com quinhentas linhas pode deixar o ambiente de outra pessoa perfeito e o seu completamente quebrado. Personalize aos poucos, depois que souber reconhecer o que está melhorando.

Lembra do nosso objetivo: criar o menor caminho possível entre aprender algo e colocar esse algo em prática.

## Seu primeiro checkpoint

Antes de seguir para o próximo pilar, confirme se você consegue fazer estas coisas. Não tem problema consultar os comandos e nem usar a interface quando precisar; nosso objetivo é entender o caminho, não decorar tudo no primeiro dia:

- Abrir o terminal.
- Descobrir em qual pasta está com `pwd`.
- Listar arquivos com `ls`.
- Criar e acessar uma pasta com `mkdir` e `cd`.
- Abrir essa pasta no editor.
- Criar e salvar um arquivo.
- Verificar as versões do Python, do Git, do Docker e do Docker Compose.
- Abrir o Docker Desktop no macOS, ou confirmar que o Docker Engine está em execução no Linux e no Ubuntu do WSL.
- Executar `hello.py`, provocar um erro e corrigi-lo.

Se conseguiu, seu ambiente está pronto. Não pronto para sempre, porque nenhum ambiente está. Ele vai mudar junto com você, receber ferramentas novas, configurações melhores e talvez até outro sistema operacional. Mas está pronto para o que realmente importa agora: aprender fazendo.

Se alguma parte não funcionou, volte somente um passo. Leia o erro, confirme onde está e tente novamente. Não transforme um problema pequeno em uma reforma completa na máquina.

---

**Uma última palavra antes do próximo pilar:**

Seu ambiente de desenvolvimento é sua oficina. Você não precisa começar com todas as máquinas, todas as ferramentas e todas as respostas. Precisa apenas de uma bancada organizada onde seja possível construir a primeira peça.

No meu caso, essa bancada já foi um caderno, depois um computador com Windows XP e, ao longo do tempo, muitos sistemas e ferramentas diferentes. Nenhuma delas substituiu a vontade de colocar em prática aquilo que eu estava aprendendo. Com mais recursos tudo foi ficando mais rápido, claramente, mas aquela primeira página só chegou a existir porque eu não esperei ter o cenário que o livro dizia ser o correto.

Então não espere o computador melhor ou o momento perfeito aparecer. Abra seu terminal, crie sua pasta e execute alguma coisa hoje, mesmo que seja simples. Se você vai programar no Windows, no macOS, no Linux, no Android ou na calculadora da sua avó, apenas faça. Foi assim que terminamos o post anterior e é assim que começamos de verdade esse primeiro pilar.

No próximo pilar, vamos fazer do Git nosso melhor amigo e criar o primeiro ponto seguro dessa jornada. Agora sim, nosso ambiente está preparado para guardar cada acerto, cada erro e cada evolução que virá.
