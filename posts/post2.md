---
Bom, no texto anterior eu apresentei os seis pilares que considero fundamentais para sair do absoluto zero e chegar ao ponto de criar soluções de verdade. Agora vamos parar de olhar o mapa inteiro e colocar o pé na primeira parte da trilha: montar nosso ambiente de desenvolvimento, da forma mais simples possível e sem transformar isso em uma aventura desnecessária.

Talvez isso pareça apenas uma preparação para começar a programar, aquela etapa chata em que instalamos algumas coisas, escolhemos um editor e seguimos em frente. Mas não é. **Montar seu ambiente já é começar a programar.** É nele que você vai escrever, errar, apagar, testar, quebrar e entender tudo aquilo que antes existia somente na sua cabeça.

No primeiro texto contei que escrevia HTML em um caderno porque ainda não tinha um computador, e aquilo era literalmente todo o ambiente de desenvolvimento disponível para mim. Não tinha como executar, não tinha como descobrir se uma tag estava errada e nem mesmo como ver a página horrorosa que eu provavelmente estava criando. Ainda assim eu fazia. Não estou falando que você precisa aprender da forma mais difícil, seria uma grande besteira romantizar aquela falta de recursos. O que quero deixar claro é que esperar pelo ambiente perfeito pode te atrasar muito mais do que começar com aquilo que você tem agora.

E é exatamente isso que construiremos agora.

## Seu ambiente não precisa impressionar ninguém

Uma das primeiras distrações de quem começa é acreditar que precisa ter o computador mais forte, a distribuição Linux mais bonita, um teclado que pisca até o teto e aquele terminal transparente cheio de informações que ninguém realmente lê. Você abre um vídeo de programação e antes de aprender a criar uma variável já está pesquisando qual tema deixa o VS Code mais parecido com uma nave espacial. Quando percebe, perdeu o tempo que usaria para aprender configurando algo que nem sabe para que serve.

Eu entendo. Deixar o nosso espaço com a nossa cara é legal e faz parte da experiência. O problema começa quando a personalização toma o lugar da prática. Você passa três dias escolhendo fonte, tema, ícones, shell, prompt e atalhos, mas ainda não executou uma única linha de código.

Então vamos deixar uma coisa bem definida desde o início: seu ambiente precisa permitir que você tenha uma ideia e consiga testá-la sem lutar contra a própria máquina. É isso. Se toda vez que for estudar você precisar corrigir o editor, atualizar cinco plugins e descobrir por que seu terminal deixou de funcionar, tem alguma coisa muito errada nessa montagem.

Se você tem um computador com Windows, use o Windows. Se já usa Linux, continue no Linux. Se a única coisa disponível agora é um computador antigo, use esse computador antigo. A ferramenta que está nas suas mãos hoje é infinitamente mais útil do que a ferramenta perfeita que você pretende ter algum dia.

## O que realmente forma um ambiente de desenvolvimento?

Quando falamos em ambiente, não estamos falando de um único programa. Estamos falando do conjunto mínimo de ferramentas que permite criar e executar aquilo que você está aprendendo. Para começar, precisamos de quatro coisas:

* **Um sistema operacional funcionando e que você já saiba usar no dia a dia**
* **Um terminal para conversar diretamente com o sistema**
* **Um editor para escrever seus arquivos**
* **Uma pasta organizada para guardar seus projetos**

Sim, apenas isso. O Git e o Python vão entrar nessa estrutura, mas terão seus próprios momentos de atenção nos próximos pilares. Por enquanto, eles serão instalados apenas para provar que nosso ambiente está vivo e pronto para o que virá.

Você não precisa começar com Docker, banco de dados, servidor web, cinco versões de Node e quarenta extensões no editor. Na verdade, instalar tudo isso agora só vai criar quarenta novas formas de algo dar errado sem que você saiba o motivo.

Comece pequeno. Entenda cada peça que está colocando na sua bancada. Depois nós aumentamos essa bancada juntos.

## Windows ou Linux?

Essa pergunta já me fez perder muito tempo no passado e provavelmente vai fazer você perder também se não tomar cuidado. Meu primeiro contato com um computador foi em um laboratório usando Ubuntu, quando eu ainda queria encontrar o tal Windows sobre o qual tinha lido. Eu vi aquele nome estranho, abri o Firefox, encontrei um monte de coisa em inglês e desisti. Naquele momento fiquei triste de verdade, pois achei que não poderia colocar meu HTML em prática só porque o sistema não era o que aparecia no livro. Mais à frente, meu primeiro computador veio com Windows XP e foi nele que finalmente executei aquele HTML que havia praticado tantas vezes no caderno.

O sistema era diferente, mas o HTML continuaria funcionando. Eu só não sabia disso ainda. Hoje gosto muito de Linux, trabalho com ele e minha escolha pessoal seria Linux com toda certeza. Aprender seu funcionamento vai abrir possibilidades enormes na sua vida, principalmente quando chegarmos aos servidores. Mas não transforme minha preferência em uma obrigação sua logo no primeiro dia. Trocar de sistema sem ainda saber diferenciar um problema do código de um problema do ambiente pode colocar uma dificuldade totalmente desnecessária no caminho.

Minha recomendação será bem direta:

- Se você já usa **Windows**, comece com Windows, PowerShell e VS Code.
- Se você já usa **Linux**, comece com sua distribuição atual, o terminal dela e VS Code.
- Se usa Windows e quer conhecer Linux, deixe o **WSL** para quando o ambiente básico já estiver funcionando.

Não formate sua máquina porque alguém disse que programador de verdade usa determinada distribuição. O sistema operacional é uma ferramenta, não um certificado dizendo se você é ou não capaz de programar. Então não entre nessa briga agora.

## O terminal não é um monstro

O terminal costuma assustar porque ele não mostra botões explicando o que deve ser feito. Você encontra uma tela vazia, um cursor piscando e a impressão de que qualquer comando errado vai fazer o computador explodir. Fique tranquilo, ele é muito menos dramático do que parece.

Pense no terminal como uma conversa mais direta com o seu sistema. Em vez de abrir uma pasta clicando duas vezes nela, você escreve o comando para entrar. Em vez de clicar em "Nova pasta", você pede que ele crie uma. A diferença é que essas ações podem ser repetidas, documentadas e automatizadas, algo que vai se tornar muito poderoso mais à frente.

No Windows, abra o PowerShell. No Linux, abra o terminal que já veio com seu sistema. Agora descubra em qual pasta você está:

```powershell
pwd
```

Liste o que existe nela:

```powershell
ls
```

Crie a pasta onde ficarão nossos estudos e entre nela:

```powershell
mkdir projetos
cd projetos
```

Esses comandos funcionam no PowerShell e na maioria dos terminais Linux. Não tente decorar tudo de uma vez. Use, erre, consulte e use de novo. Em pouco tempo seus dedos vão lembrar antes mesmo de você pensar.

## Uma casa para cada projeto

Organização parece uma preocupação pequena quando temos apenas um arquivo chamado `teste.py`. O problema aparece quando começamos a ter `teste2.py`, `teste_agora_vai.py`, `teste_final.py` e o clássico `teste_final_certo_agora.py` espalhados pela Área de Trabalho.

Não faça isso com você mesmo.

Dentro da pasta `projetos`, cada ideia deve ter sua própria casa. Vamos criar a primeira:

```powershell
mkdir primeiro-ambiente
cd primeiro-ambiente
```

Use nomes simples, sem espaços e que expliquem o que existe ali. Não precisa criar uma arquitetura de empresa para guardar um Hello World, mas também não jogue tudo no mesmo lugar. Essa pequena disciplina vai facilitar o uso do Git, dos ambientes virtuais, do Docker e de praticamente tudo que aprenderemos depois.

Agora peça para o VS Code abrir exatamente essa pasta:

```powershell
code .
```

O ponto no final significa "a pasta em que estou agora". Ao instalar o VS Code, habilite a opção de adicionar o comando `code` ao PATH. Se você já instalou e o comando não funcionar, não entre em pânico e nem reinstale tudo imediatamente. Abra o VS Code normalmente, escolha **Abrir Pasta** e selecione `primeiro-ambiente`; depois consulte a documentação do editor para habilitar o comando no seu sistema.

Olha só o que já aconteceu: você abriu o terminal, navegou pelo sistema, criou uma estrutura organizada e entregou uma pasta inteira para o editor. Talvez ainda não pareça programação, mas você já começou a pensar como alguém que controla o próprio ambiente.

## Instale somente o necessário

Para seguir esta jornada, minha escolha continua sendo Python. No Windows, baixe uma versão estável pelo site oficial e marque a opção para adicionar o Python ao `PATH` durante a instalação. Esse tal PATH é uma lista de lugares onde o sistema procura os programas quando você digita um comando. Se o Python estiver nessa lista, você poderá chamá-lo de qualquer pasta.

No Linux, não saia baixando e substituindo o Python do sistema na unha, pois muitas distribuições usam ele em ferramentas internas e você pode criar um problema bem maior do que nosso Hello World. Primeiro verifique se `python3` já existe. Se não existir, instale pelo gerenciador de pacotes da sua distribuição. Em Debian e Ubuntu, por exemplo:

```bash
sudo apt update
sudo apt install python3
```

Depois da instalação, volte ao terminal e verifique:

```powershell
python --version
```

Em algumas distribuições Linux, o comando será:

```bash
python3 --version
```

Você deve receber algo parecido com `Python 3.x.x`. O número exato pode ser diferente e está tudo bem. O importante aqui é entender o teste: nós fizemos uma pergunta ao sistema e ele respondeu qual versão consegue executar.

Agora instale o Git. No Windows, use o instalador do site oficial do Git e mantenha as opções recomendadas se ainda não souber o que cada uma faz. Em Debian e Ubuntu, ele pode ser instalado assim:

```bash
sudo apt install git
```

Depois faça o mesmo teste de versão:

```powershell
git --version
```

Se os dois comandos responderem, ótimo. Se algum deles disser que o comando não foi encontrado, leia a mensagem. Não saia reinstalando tudo dez vezes. Feche e abra o terminal novamente, confirme se a instalação terminou e verifique o PATH. O erro não está tentando te expulsar da programação, ele está dizendo exatamente qual peça ainda não conseguiu encontrar.

Não me leve a mal, eu sei que no início uma mensagem dizendo que o comando não existe parece simplesmente dizer que nada deu certo. Mas muitas vezes ela está entregando o problema na nossa cara. Aprender a ler isso vai te poupar horas e, com toda certeza, será uma das coisas mais importantes que você aprenderá aqui.

## Execute algo seu

Dentro do VS Code, crie um arquivo chamado `hello.py` e escreva:

```python
nome = input("Digite seu nome: ")
print(f"Seu ambiente está pronto, {nome}!")
```

Salve o arquivo. Volte ao terminal, confira se ainda está dentro da pasta `primeiro-ambiente` e execute:

```powershell
python hello.py
```

No Linux, caso seu comando seja `python3`:

```bash
python3 hello.py
```

Digite seu nome e veja a resposta.

Pode parecer simples demais, e realmente é. Mas existe uma diferença gigantesca entre assistir alguém executando um código em um vídeo e preparar seu próprio ambiente, criar o arquivo e ver sua máquina obedecer a uma instrução que você escreveu. Nossa, essa primeira execução faz toda diferença.

Foi essa sensação que tive quando vi meu primeiro HTML funcionando depois de tanto tempo escrevendo código no papel. O código era simples, a página era feia e não resolvia qualquer problema do mundo. Ainda assim, naquele momento uma coisa ficou provada: eu conseguia criar algo e fazer uma máquina executar.

Você acabou de provar a mesma coisa para si.

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

Você não precisa instalar vinte extensões no VS Code, trocar o PowerShell por outro terminal ou configurar atalhos para ações que ainda nem conhece. E, principalmente, não precisa apagar tudo e começar novamente sempre que encontrar um erro. Todas essas coisas podem ser úteis em algum momento, mas agora vão mais te distrair do que ajudar.

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
- Verificar as versões do Python e do Git.
- Executar `hello.py`, provocar um erro e corrigi-lo.

Se conseguiu, seu ambiente está pronto. Não pronto para sempre, porque nenhum ambiente está. Ele vai mudar junto com você, receber ferramentas novas, configurações melhores e talvez até outro sistema operacional. Mas está pronto para o que realmente importa agora: aprender fazendo.

Se alguma parte não funcionou, volte somente um passo. Leia o erro, confirme onde está e tente novamente. Não transforme um problema pequeno em uma reforma completa na máquina.

---

**Uma última palavra antes do próximo pilar:**

Seu ambiente de desenvolvimento é sua oficina. Você não precisa começar com todas as máquinas, todas as ferramentas e todas as respostas. Precisa apenas de uma bancada organizada onde seja possível construir a primeira peça.

No meu caso, essa bancada já foi um caderno, depois um computador com Windows XP e, ao longo do tempo, muitos sistemas e ferramentas diferentes. Nenhuma delas substituiu a vontade de colocar em prática aquilo que eu estava aprendendo. Com mais recursos tudo foi ficando mais rápido, claramente, mas aquela primeira página só chegou a existir porque eu não esperei ter o cenário que o livro dizia ser o correto.

Então não espere o computador melhor ou o curso perfeito aparecer. Abra seu terminal, crie sua pasta e execute alguma coisa hoje, mesmo que seja simples. Se você vai programar no Windows, no Linux, no Android ou na calculadora da sua avó, apenas faça. Foi assim que terminamos o texto anterior e é assim que começamos de verdade esse primeiro pilar.

No próximo pilar, vamos fazer do Git nosso melhor amigo e criar o primeiro ponto seguro dessa jornada. Agora sim, nosso ambiente está preparado para guardar cada acerto, cada erro e cada evolução que virá.
