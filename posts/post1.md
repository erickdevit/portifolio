
---
Bom, meu objetivo será bem direto nessa série de ensinamentos que desejo trazer: criar um roteiro para ir do ponto zero até um ótimo entendimento e capacidade de programar, criar soluções e desenvolver ferramentas com as tecnologias que temos disponíveis, da forma mais correta possível, mais simples de entender e colocar em prática. Acredito que isso não se resumirá só à codificação, mas sim ao uso da tecnologia em geral.

Meu esforço será sempre para que você seja capaz de entender e colocar em prática meus ensinamentos aqui. Eles servirão como uma forma de documentar a mim mesmo os meus próprios conhecimentos também, uma espécie de segundo cérebro, onde no futuro eu possa retornar caso precise de algo. Então iremos fazer abordagens que tragam conteúdos técnicos, mas com uma didática que seja otimizada para essas necessidades. Dito isso, partiremos para o início da nossa jornada. Boa sorte, jovem hacker.

**Antes de começarmos, preciso deixar algo claro:** Os seis pilares que vou apresentar não são uma lista de tarefas para você completar em um fim de semana, nem algo que você precise dominar simultaneamente. Eles representam uma **progressão natural** de conhecimento que vou detalhar em posts futuros, cada um no seu próprio ritmo e profundidade. Meu objetivo aqui é eliminar aquela paralisia inicial de "por onde começo?" e te dar um **mapa claro** do caminho à frente. Pense neste post como a visão panorâmica antes de começarmos a trilha.

## O que é preciso para começar?

Vamos assumir que estamos partindo do absoluto zero, sem linguagens, frameworks, IDEs, distribuições e sistemas favoritos. Partindo do zero absoluto, poderíamos nesse momento pensar que o óbvio é aprender uma linguagem de programação, ou uma linguagem de lógica de programação, etc. Mas não, vamos começar por uma pequena lista de coisas que precisamos e que são realmente cruciais para se iniciar de verdade.

**1 - Ambiente de desenvolvimento**
**2 - Git é o seu melhor amigo**
**3 - Python é sua melhor escolha**
**4 - Cloudflare/Hospedagem**
**5 - Redes e portas**
**6 - Docker para 99% das coisas**

Sim, é isso mesmo, apenas seis coisas. Parece muito simples, né? Montamos nosso ambiente, decidimos ir de Python, lemos um pouco e puff, estamos programando tudo que imaginarmos... Na verdade, não, não é nada simples. São 6 coisas, mas que podem levar anos para serem concluídas caso você faça as coisas da forma errada, mas esse é o caminho que pode ser mais bem otimizado para alcançar resultados em semanas, dependendo do seu esforço, apenas alguns dias.

O foco precisa estar no que realmente importa, sem distrações ou aventuras desnecessárias. É muito natural que ao iniciarmos algo, apareçam coisas que mais nos atrapalham de evoluir do que ajudam. Um exemplo bem claro disso é começar a estudar Python e logo depois ler sobre JavaScript, quando percebe já perdeu dias aprendendo JavaScript também por achar que precisa saber as duas, ou que isso vai te tornar um programador melhor, mais preparado e várias balelas. Mas a verdade é que você não precisa. Focar em uma única coisa até ser o melhor nela, sempre será a forma mais simples e garantida de ter sucesso em algo. Isso se aplica muito bem à programação, pois como citei em relação a querer saber várias linguagens, no final você só vai perceber que tudo que uma faz a outra também faz. Então, não se distraia e foque no que precisa ser feito.

Trarei cada uma dessas etapas de forma detalhada em postagens separadas. Pois seria inviável e confuso trazer tudo aqui, mas farei uma simples abordagem que nos trará uma visão concreta do que são cada uma dessas coisas.

## A ordem importa (mas não como você pensa)

Você pode estar olhando para essa lista e pensando: "Preciso aprender tudo isso antes de escrever minha primeira linha de código?" **Não.** Definitivamente não.

Esses pilares seguem uma progressão orgânica que vou guiar nos próximos posts:

- **Ambiente de desenvolvimento** → É o primeiro passo, literal. Sem ele, você não faz nada.
- **Git** → Vai entrar naturalmente assim que você tiver alguns arquivos de código para gerenciar.
- **Python** → É onde você vai passar a maior parte do tempo inicial, criando e quebrando coisas.
- **Cloudflare/Hospedagem** → Surge quando você quiser mostrar algo para o mundo além do seu localhost.
- **Redes e Portas** → Você vai aprender na prática, quando as coisas não se conectarem como esperado.
- **Docker** → É o nível seguinte, quando você estiver confortável com o básico e quiser profissionalizar seu workflow.

Cada post futuro vai mergulhar fundo em um desses tópicos, com tutoriais práticos e exemplos reais. Por enquanto, apenas absorva a visão geral.

## Ambiente de desenvolvimento

Com toda certeza, esse deve ser seu pontapé inicial. Não vá correndo aprender qualquer coisa antes de montar seu pedacinho de desenvolvimento, pois praticamente tudo que você vai aprender vai ser fazendo e não lendo. Isso é aprender de verdade, fixar as coisas. Podemos passar horas estudando e lendo, mas sem praticar ou testar esses conhecimentos tudo se perde mais rápido do que você possa aprender. É fato primordial ter um local onde você possa colocar em prática uma linha de código que seja assim que a aprender, a modificar, errar e testar. Por isso considero esse o passo inicial que jamais deve ser pulado ou ignorado.

Como exemplo dessa importância, vou dar um exemplo de como eu comecei. Eu aprendi minha primeira linguagem sozinho aos 10 anos, através de um livro bem caído que tinha na biblioteca da minha escola, um livro sobre HTML, uma linguagem não de programação mas de marcação de hipertexto. Ela é a base de toda e qualquer página web que você conhece, e por muito tempo foi a única coisa. Na época eu não tinha celular, não tinha qualquer coisa que fosse mais tecnológica que a TV de tubo da sala de casa. Porém o livro deixava bem claro a importância de praticar seu conteúdo e dava instruções de como usar o próprio bloco de notas do Windows, mas eu não tinha nenhum recurso para aquilo, era fora da minha realidade... Mas aí veio a grande ideia. Peguei um de meus cadernos antigos e comecei a colocar tudo aquilo que tinha lido em prática, na mão mesmo. Criei páginas inteiras com HTML no caderno, lembrando das sintaxes e funções. Claramente não tinha como testar, mas estava decorando e aprendendo cada vez mais cada uma daquelas coisas. Todos os dias usava uns 15 minutos do intervalo para ler aquele livro.

Alguns meses à frente, abriram o primeiro laboratório de informática da escola. Foi literalmente meu primeiro contato na vida com um computador. Lembro que fomos levados para fazer nosso primeiro trabalho de pesquisa. Ao ligar me deparei com um nome estranho: Ubuntu. Não fazia ideia do que era, fiquei triste pois não seria o tal do Windows que tinha lido, não ia poder praticar meus conhecimentos. Aí tive a ideia de pesquisar o Ubuntu naquele tal de Browser Firefox, me deparei com um monte de coisa em inglês e desisti.

Mais um ano na frente, tive meu primeiro computador, agora com Windows XP. Nossa, aquilo foi um sonho do qual não queria acordar! Mesmo um ano tendo se passado, HTML estava pleno na minha mente, pois eu o praticava sempre no meu caderno. Quando coloquei em prática meu primeiro código, nossa, foi maravilhoso abrir e ver que tinha funcionado. Eu realmente sabia "Programar"!

Esse foi meu primeiro código executado de verdade:

```html
<html>  
<header>  
<title> Olá mundo </title>  
</header>  
<body>   
<H3> OLAAAAA MUNDO!! </H3>  
</body>  
</html>
```

O helloWorld.html mais esperado de todos da minha vida. Isso provou pra mim que mesmo algo muito simples, pode fazer com que aquele desejo de programar não morresse dentro de mim. Se você vai programar no Windows, no Linux, no Android, na calculadora da sua avó ou até mesmo em um caderno, apenas faça, e jamais desista de conquistar algo que deseja.

## Git é o seu melhor amigo

Minha melhor forma de descrever Git, é como se ele fosse uma máquina do tempo com a qual você pudesse criar pontos da sua vida onde sempre pudesse voltar quando quisesse corrigir algo, criando várias ramificações dela e sempre indo pros melhores pontos, onde você fez menos besteiras. Definitivamente o Git é isso, pois para literalmente qualquer linha de código que você mudar, você pode voltar atrás.

O Git vai ser o seu melhor amigo quando você estiver em um momento em que queira só testar algo diferente no seu código (isso é muito importante quando se está aprendendo). Imagine a dor de cabeça que seria ter de reescrever tudo do zero, pois você não sabe onde errou e quebrou seu código. Então você simplesmente compara as modificações entre cada um de seus commits, podendo assim descobrir facilmente o que mudou, quebrou ou até mesmo acertou no seu código. Isso com toda certeza faz toda diferença. Se alinharmos isso ao Github, Gitea ou qualquer outro serviço de versionamento remoto, ficamos ainda mais afiados, podendo agora trabalhar de literalmente qualquer dispositivo no nosso código.

Por muito tempo eu não usei o Git nos meus projetos. Isso foi um erro medonho e até mesmo de irresponsabilidade, pois perdi coisas muito legais que estava fazendo e reescrever aquilo do zero era mesmo loucura. Não queria perder tempo dando um `git add .` ; `git commit -m "mensagem"`, sempre que fizesse uma alteração na minha aplicação. Eu não tinha um padrão de checkpoints definidos na mente. Muitas vezes isso me fez ter que começar tudo do zero várias vezes, muitas vezes foi doloroso. Não queira reconhecer o valor do Git na base da dor, faça dele seu maior aliado em todos os momentos, você jamais vai se arrepender disso.

## Python é sua melhor escolha

É bem provável que se você tem interesse em começar a estudar e programar, ou se já até mesmo começou a fazer isso, tenha se deparado com diversas linguagens de programação: C, C++, Java, JavaScript, Python, Go e milhares de tantas outras. Talvez você já tenha aprendido um pouco de cada uma, sabe fazer isso e aquilo ou desconheça totalmente até mesmo o que é uma $variável. Porém, dentro disso tudo, só posso falar que, volte tudo isso e pegue o Python.

Python não foi a primeira linguagem que aprendi. Minha primeira linguagem foi o C/C++, porém se pudesse eu voltaria e começaria pelo Python. Confesso que tive muito preconceito com a linguagem no começo pois achava que era a modinha, todo mundo falando o quanto ele era versátil, rápido, e muitas outras coisas. Meu orgulho me fazia ver aquilo como algo que eu não queria. Mas deixe seu orgulho, ou até mesmo sua curiosidade de lado e como diria um amigo "Foque no que vai pagar seus boletos (como um bom dev de Java)". A realidade é que você não precisa aprender a usar as linguagens mais recentes e mais hypadas do momento, que estão ganhando funções novas a cada semana. Não. Você só precisa de algo que é estável, escalável e funcional.

**Aqui vai uma verdade importante:** Minha insistência no Python não é porque ele é a única linguagem que importa, ou porque as outras são inferiores. É estratégia pura. A maior armadilha para iniciantes é a **paralisia por excesso de opções**. "Devo aprender Python ou JavaScript? E se eu escolher errado? E se perder tempo?"

A resposta é simples: **não existe escolha errada, existe falta de escolha**. Python é minha recomendação porque ele remove essa indecisão e te coloca para programar *hoje*. Mais importante ainda: quando você dominar Python — e eu digo *dominar* de verdade — aprender qualquer outra linguagem será absurdamente mais fácil. Você já vai entender loops, condicionais, funções, estruturas de dados, orientação a objetos... A sintaxe muda, mas a lógica permanece.

Então sim, comece com Python. Mas saiba que o que você está realmente aprendendo são **conceitos universais de programação** que vão te acompanhar por toda vida, independente da linguagem. Python é apenas o veículo mais eficiente para chegar lá.

Com Python você vai poder fazer desde aplicações gráficas para qualquer plataforma que imaginar, vai poder fazer aplicações web, APIs, Scripts, Automações e literalmente qualquer outra coisa que você quiser, até mesmo uma linguagem de programação própria se formos ao máximo do turing complete *(Se você não sabe o que é isso, vá aprender e volte aqui depois!)*.

Então sim, Python vai te tornar um hacker de verdade, um programador totalmente capaz de resolver qualquer coisa, de um caixa de supermercado a um mega robô com inteligência artificial. Apenas mantenha-se consistente e alcance a excelência.

Sinta-se à vontade para começar sua jornada:

```python
nome = input("Digite seu nome: ")  
print(f"Hello, World, {nome}!")
```

```bash
python hello.py
```

## Hospedagem e CloudFlare

Pensar em servidores, me faz lembrar do início, onde eu só conseguia ter o meu localhost para testar meus sites, hospedar bancos de dados, fazer rotas de API e afins. Lá no início, com internet discada era quase impossível para mim colocar alguma coisa no ar, de forma externa pelo menos, no início eu não tinha os conhecimentos de redes, portas, firewall ou algo que fosse muito além da minha própria máquina, com o tempo fui aprendendo mais e as possibilidades também foram evoluindo. Algum tempo à frente já tinha uma conexão de 10 mb e agora também tinha uma porta 80 e 443 disponíveis, já tinha também provedores de infra como Azure e AWS, mas era totalmente fora da minha realidade pagar por uma VPS. Comecei a dispor pequenos sites e servidores de arquivos para amigos de uma forma bem legal na época, o ngrok. Ngrok foi uma ferramenta que servia como meu canivete suíço.

Hoje em dia um serviço de VPS e hospedagem em cloud está cada vez mais barato e oferecendo mais recursos que tornam deploys bem mais simplificados, muita coisa não precisa mais de um acesso SSH, como antes. Porém ao longo da minha caminhada eu pude ter certeza de que esse é um dos conhecimentos base e fundamentais, pois depois de um tempo comecei a usar muito ferramentas como Cpanel, o que me deixou muito acomodado e quando aparecia um problema mais específico, como problema de despejo de memória, ou problemas de dependências em algo da versão muito específica de PHP que eu havia feito, nossa, aquilo era terrível. Mas graças aos conhecimentos que eu já tinha, sempre era muito rápido para acessar meu servidor e corrigir tudo na unha. Não me leve a mal, você pode e deve usar as facilidades e ferramentas, porém antes você deve dominar a base, saber fazer a criação de um banco de dados na linha de comando, saber criar e configurar um certificado SSL, saber apontar uma rota de balanceamento de cargas no config do nginx e muitos outros exemplos.

Também pode passar pela sua cabeça uma coisa que eu pensei algumas vezes. Ah, por que eu devo aprender a mexer com servidores Windows? ou Por que aprender esse tal de RedHat Server?. Na minha cabeça na época, fazendo só aplicações locais em C, C++ e Java, parecia besteira. Até o momento em que você realmente entende a necessidade real de backups em nuvem, APIs de comunicação externa para seus serviços e servidores, sincronização em tempo real e muitas outras vantagens. Cheguei a perder uma base de dados inteira de um cliente pois não tinha backup em nuvem das minhas aplicações, o que também me fez perder aquele cliente. Também posso citar a crescente mudança de tudo para serviços web atualmente, tem sido cada dia mais comum você fazer tudo apenas no seu Browser sem nem ligar o computador, para abrir o Chrome e começar a trabalhar, até mesmo muitas aplicações já são apenas um PWA ou uma versão do webapp otimizada para se instalar. Então sim, é primordial que você não só aprenda tudo isso mas também aplique.

Agora você deve estar se perguntando: "Por que raios Cloudflare está nessa lista?" E eu te entendo perfeitamente. Quando comecei, eu também não entendia por que todo mundo falava tanto dessa empresa. Mas deixa eu te contar, Cloudflare não é só isso, é muito mais do que você imagina. Eu resisti muito a ela por achar que era algo complexo e chato, porém a Cloudflare se tornou meu serviço de DNS, CDN e muitas outras coisas favorito, não estou aqui falando que somente ela, existem muitos outros serviços legais e nunca fique refém de uma única solução, mas a Cloudflare é sem dúvidas uma opção incrível e que você deve sim dominar para extrair o máximo de suas capacidades. Muitas das soluções são excelentes para um iniciante, até mesmo para economizar.

A Cloudflare pode te servir para hospedar seus primeiros sites, criar suas primeiras aplicações e aprender na prática como fazer apontamento de domínios, criação de DNS, criação de bancos de dados e tudo sem gastar um único centavo sequer, esse próprio site aqui está rodando diretamente de um Worker Page lá, sem que eu precise pagar por uma hospedagem, configurar serviços de DNS, apontar o domínio e muitas outras coisas. Apenas subo um novo commit direto no repositório e o site já é atualizado de forma instantânea, é o melhor do DevOps de forma prática e simples. Isso sem falar do ZeroTrust, mas aí já é assunto para um post que farei em breve. Então sim, aprenda Cloudflare desde o início.

## Redes e portas

Tá, vamos lá. Agora você deve estar assim: "Mas eu só quero programar, por que preciso entender de rede?" Essa foi exatamente minha reação quando alguém me disse isso. E cara, que erro pensar assim. Entender o básico de redes é fundamental e você vai perceber isso na primeira vez que seu código não conseguir se conectar com uma API, ou quando você não entender por que seu servidor local não está acessível.

Não estou falando para você virar um engenheiro de redes, mas sim entender conceitos básicos que vão fazer toda diferença no seu dia a dia. Saber o que é localhost (127.0.0.1), entender que 0.0.0.0 significa "escutar em todas as interfaces", conhecer as portas mais comuns (80 para HTTP, 443 para HTTPS, 22 para SSH, 3306 para MySQL, 5432 para PostgreSQL), entender o que é um firewall e como ele pode estar bloqueando suas conexões ou até mesmo saber como criar um servidor externo rápido para mostrar seu código rodando para o cliente ou em potencial para ser um, seja com ngrok, com uma VPN, ou até mesmo um túnel de conexão TCP simples.

Quando você roda aquele `python app.py` e ele diz "Running on http://127.0.0.1:5000", você precisa entender o que isso significa. Por que você consegue acessar pelo seu navegador mas seu amigo na mesma rede não consegue? Por que às vezes funciona com localhost e outras vezes só com o IP? Por que sua aplicação Docker não consegue se conectar com o banco que está rodando na sua máquina? Tudo isso vai acontecer com você, em testes mas muitas vezes para nossa infelicidade em produção, é comum que algo caia e um IP que não era estático acabe mudando, ou um outro serviço começar a brigar pela mesma porta.

Todas essas perguntas têm respostas simples quando você entende o básico de redes. E acredite, você vai encontrar esses problemas. Melhor estar preparado do que perder horas debugando algo que era só uma questão de porta errada ou firewall bloqueando.

Minha dica: aprenda lendo, mas principalmente quebrando a cara. Tente fazer seu servidor Flask ficar acessível na rede local, tente conectar um container Docker com outro, tente entender por que aquela API não responde. Cada erro vai te ensinar mais do que qualquer tutorial.

## Docker para 99% das coisas

Docker mudou minha vida como desenvolvedor, e não estou exagerando. Antes dele, eu tinha que instalar Python, Node, MySQL, Redis, MongoDB e mais uma dúzia de coisas na minha máquina. Aí vinha outro projeto que precisava de uma versão diferente de Python, ou um banco de dados diferente, e virava uma bagunça total. Sem contar quando eu tentava passar meu projeto para outra pessoa: "Ah, mas no meu computador funciona!"

Docker resolve tudo isso. Ele é basicamente uma forma de empacotar sua aplicação junto com tudo que ela precisa para rodar. É como se você criasse um mini-sistema operacional só para aquela aplicação, com as versões exatas de cada dependência, isolado do resto do seu sistema.

Precisa de um PostgreSQL para testar? `docker run -d -p 5432:5432 postgres`. Pronto, em segundos você tem um banco rodando. Não precisa instalar, configurar, nem nada. E quando terminar? Para o container e ele não ocupa mais recursos, ou deleta ele completamente. Seu sistema fica limpo.

Mas a verdadeira mágica acontece quando você aprende a criar seus próprios Dockerfiles e docker-compose. Aí você consegue definir toda a infraestrutura do seu projeto em arquivos de texto: "Minha aplicação precisa de Python 3.11, PostgreSQL 15, Redis 7 e Nginx". Todo mundo que clonar seu repositório vai conseguir subir o ambiente inteiro com um único comando: `docker-compose up`.

Isso é especialmente importante quando você está aprendendo porque te permite experimentar com tecnologias diferentes sem medo de bagunçar seu sistema. Quer testar aquele banco de dados novo? Quer experimentar uma versão beta de uma linguagem? Quer rodar aquele projeto antigo que usa versões antigas de tudo? Docker resolve.

E olha, eu sei que Docker parece complicado no começo, com essa história de imagens, containers, volumes, networks... Mas você não precisa entender tudo de uma vez. Comece simples: aprenda a rodar containers prontos, depois aprenda a criar seu Dockerfile, depois docker-compose, e vai evoluindo. Em poucas semanas você vai estar usando Docker para literalmente tudo.

Por isso eu digo 99% das coisas. Porque realmente, a maioria dos seus projetos e necessidades de desenvolvimento vão ser resolvidos com Docker. E quanto mais cedo você aprender, mais cedo vai parar de perder tempo com problemas de ambiente e focar no que importa: programar.

---

**Uma última palavra antes de começarmos:**

Esses seis pilares não são uma maratona que você precisa completar em tempo recorde. São estações de uma jornada que você vai percorrer no seu ritmo. Alguns você vai dominar em dias, outros vão levar meses — e está tudo bem.

O que realmente importa é que você está construindo uma **base sólida e transferível**. Quando você dominar esses fundamentos, não vai ser apenas "alguém que sabe Python e Docker". Você será alguém que **entende como o desenvolvimento moderno funciona**, capaz de pegar qualquer tecnologia nova e aprender rapidamente porque os princípios são os mesmos.

Nos próximos posts, vamos detalhar cada pilar com profundidade, tutoriais passo a passo e os erros que você deve evitar (porque eu já cometi todos eles). Marque este texto, porque você vai voltar aqui várias vezes ao longo da jornada.

Agora vamos ao que interessa: colocar a mão na massa.