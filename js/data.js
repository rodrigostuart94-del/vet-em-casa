/* ===========================================================
   Conteúdo do site edite aqui os textos sem mexer no código.
   =========================================================== */

const SERVICOS = [
  {
    icon:"🐶", titulo:"Consulta Domiciliar",
    resumo:"Avaliação clínica completa no conforto da sua casa.",
    detalhe:"Uma consulta tranquila, sem o estresse do transporte. A Dra. Esther faz a avaliação clínica do seu pet, escuta o histórico, esclarece dúvidas e orienta o melhor caminho de cuidado tudo no ambiente em que o animal se sente seguro."
  },
  {
    icon:"💉", titulo:"Vacinação",
    resumo:"Vacinas essenciais aplicadas em casa, com calma.",
    detalhe:"Aplicação de vacinas com toda a segurança e sem filas. Orientamos o calendário vacinal ideal para a idade e o estilo de vida do seu pet, mantendo a carteirinha sempre em dia."
  },
  {
    icon:"🩸", titulo:"Coleta de Exames",
    resumo:"Coleta de material para exames sem deslocamento.",
    detalhe:"Coletamos o material necessário para exames laboratoriais na sua casa, reduzindo o estresse do animal. Os resultados orientam diagnósticos precisos e acompanhamento de tratamentos."
  },
  {
    icon:"🐾", titulo:"Check-up Preventivo",
    resumo:"Prevenir é cuidar antes de o problema aparecer.",
    detalhe:"Uma avaliação preventiva periódica ajuda a identificar sinais precoces e a manter a saúde em dia. Ideal para todas as idades, especialmente para pets que não gostam de sair de casa."
  },
  {
    icon:"🐱", titulo:"Atendimento Geriátrico",
    resumo:"Cuidado especial para pets na melhor idade.",
    detalhe:"Pets idosos merecem atenção redobrada e o mínimo de estresse. O atendimento em casa é ideal para acompanhar de perto a qualidade de vida, com manejo cuidadoso e carinhoso."
  },
  {
    icon:"🤍", titulo:"Cuidados Paliativos",
    resumo:"Conforto, dignidade e amor em todos os momentos.",
    detalhe:"Acompanhamento dedicado para garantir bem-estar e qualidade de vida nos momentos mais delicados, com respeito ao pet e acolhimento à família, sempre no ambiente familiar."
  },
  {
    icon:"📋", titulo:"Atestados e Documentos",
    resumo:"Documentação veterinária com validade e cuidado.",
    detalhe:"Emissão de atestados de saúde, declarações e demais documentações veterinárias necessárias, com a avaliação adequada e atenção a cada detalhe."
  },
  {
    icon:"🚑", titulo:"Orientações Emergenciais",
    resumo:"Orientação rápida para saber o próximo passo.",
    detalhe:"Em situações de urgência, oferecemos orientação para os primeiros cuidados e indicação do encaminhamento mais seguro. Fale conosco para avaliarmos juntos a melhor conduta."
  }
];

const DEPOIMENTOS = [
  { texto:"Atendimento maravilhoso! Meu cachorro ficou muito mais tranquilo sendo atendido em casa. A Dra. Esther tem um carinho enorme.", autor:"Camila R.", pet:"Tutora do Thor", cor:"#0C4A56" },
  { texto:"Minha gata é super arisca e nunca aceitou ir à clínica. Em casa foi outra história atendimento calmo e cuidadoso do início ao fim.", autor:"Rafael M.", pet:"Tutor da Mel", cor:"#C6A15B" },
  { texto:"Profissional atenciosa e humana de verdade. Explicou tudo com paciência e meu pet nem percebeu a vacina. Recomendo de olhos fechados!", autor:"Patrícia L.", pet:"Tutora do Bento", cor:"#7FCDBF" },
  { texto:"Cuidou do meu idoso de 14 anos com um respeito que me emocionou. Saber que ele foi cuidado em casa fez toda a diferença para nós.", autor:"João P.", pet:"Tutor da Nina", cor:"#1B2A47" },
  { texto:"Praticidade e carinho na mesma visita. Agendei pelo WhatsApp e em pouco tempo estava tudo resolvido sem estresse nenhum.", autor:"Aline S.", pet:"Tutora do Caramelo", cor:"#0C4A56" }
];

const BLOG = [
  {
    cat:"Vacinas",
    titulo:"Protocolo vacinal para filhotes: passo a passo",
    resumo:"Filhotes precisam de uma sequência de doses para ficarem realmente protegidos. Entenda por quê e quando vacinar cães e gatos.",
    conteudo:`
      <p>Filhotes nascem com uma proteção temporária herdada da mãe, transmitida pelo <strong>colostro</strong> (o primeiro leite) nas primeiras horas de vida. Esses anticorpos maternos defendem o filhote no começo, mas vão desaparecendo com as semanas e, enquanto ainda estão presentes, podem neutralizar a vacina. É por isso que uma dose só não basta: o protocolo é feito em <strong>várias doses</strong>, garantindo que a imunização "pegue" assim que a proteção da mãe acaba.</p>

      <h4>Cães calendário inicial</h4>
      <ul>
        <li><strong>1ª dose:</strong> entre 6 e 8 semanas de vida (vacina polivalente V8 ou V10).</li>
        <li><strong>Reforços:</strong> a cada 21 a 30 dias.</li>
        <li><strong>Última dose:</strong> por volta das 16 semanas no total, geralmente 3 a 4 doses.</li>
        <li><strong>Antirrábica:</strong> a partir dos 3 meses (12 semanas).</li>
      </ul>

      <h4>Gatos calendário inicial</h4>
      <ul>
        <li><strong>1ª dose:</strong> entre 8 e 9 semanas de vida (tríplice, quádrupla ou quíntupla felina).</li>
        <li><strong>Reforços:</strong> a cada 21 a 30 dias, até cerca de 16 semanas em geral 2 a 3 doses.</li>
        <li><strong>Antirrábica:</strong> a partir dos 3 meses.</li>
      </ul>

      <h4>Cuidados que fazem diferença</h4>
      <ul>
        <li><strong>Vermifugue antes de vacinar:</strong> um filhote com vermes responde pior à vacina.</li>
        <li><strong>Segure os passeios:</strong> evite ruas, praças e contato com outros animais até cerca de 7 a 10 dias após a última dose do protocolo.</li>
        <li><strong>Carteirinha sempre em dia:</strong> depois do protocolo inicial, os reforços passam a ser anuais por toda a vida.</li>
      </ul>

      <p>Cada filhote é único: idade, saúde, raça e estilo de vida mudam o calendário ideal. O protocolo deve ser sempre individualizado pela médica-veterinária. Quer montar o calendário do seu pet com tranquilidade, em casa? Fale com a gente.</p>
    `
  },
  {
    cat:"Vacinas",
    titulo:"Vacinas importantes para cães e gatos",
    resumo:"Da polivalente à antirrábica: conheça as vacinas essenciais e as recomendadas conforme o estilo de vida do seu pet.",
    conteudo:`
      <p>As vacinas são divididas, de forma geral, entre as <strong>essenciais</strong> (indicadas para praticamente todos os animais) e as <strong>recomendadas conforme o estilo de vida</strong> (acesso à rua, contato com outros animais, região onde vive).</p>

      <h4>Cães</h4>
      <ul>
        <li><strong>Polivalente (V8 ou V10):</strong> protege contra cinomose, parvovirose, hepatite infecciosa (adenovírus), parainfluenza e leptospirose. A V10 cobre mais sorovares de leptospira e a coronavirose.</li>
        <li><strong>Antirrábica:</strong> contra a raiva doença fatal e transmissível ao ser humano (zoonose). Reforço anual.</li>
        <li><strong>Tosse dos canis (Bordetella):</strong> recomendada para cães que frequentam creches, hotéis, pet shops e exposições.</li>
        <li><strong>Giárdia e Leishmaniose:</strong> avaliadas caso a caso a da leishmaniose é indicada em regiões endêmicas, após teste negativo.</li>
      </ul>

      <h4>Gatos</h4>
      <ul>
        <li><strong>Tríplice felina (V3):</strong> protege contra panleucopenia, rinotraqueíte (herpesvírus felino) e calicivirose.</li>
        <li><strong>Quádrupla (V4):</strong> acrescenta a clamidiose.</li>
        <li><strong>Quíntupla (V5):</strong> acrescenta a leucemia felina (FeLV).</li>
        <li><strong>Antirrábica:</strong> contra a raiva, com reforço anual.</li>
        <li><strong>FeLV (leucemia felina):</strong> especialmente importante para gatos com acesso à rua ou que convivem com outros gatos recomenda-se testar antes de vacinar.</li>
      </ul>

      <p>Depois do protocolo de filhote, a maioria das vacinas tem <strong>reforço anual</strong>. Manter o calendário em dia é a forma mais simples e barata de evitar doenças graves. Na dúvida sobre o que o seu pet já tomou, a gente revisa a carteirinha junto com você.</p>
    `
  },
  {
    cat:"Cuidados Preventivos",
    titulo:"Check-up: por que prevenir é o melhor remédio",
    resumo:"Avaliações periódicas ajudam a flagrar problemas cedo, quando o tratamento é mais simples e eficaz.",
    conteudo:`
      <p>Cães e gatos têm um instinto natural de <strong>esconder a dor e a fraqueza</strong> é uma herança da vida selvagem. Quando o tutor finalmente percebe que "algo está errado", muitas vezes a doença já avançou. O check-up preventivo existe justamente para enxergar antes.</p>

      <h4>Com que frequência?</h4>
      <ul>
        <li><strong>Filhotes:</strong> acompanhamento próximo durante o crescimento e o protocolo vacinal.</li>
        <li><strong>Adultos saudáveis:</strong> uma avaliação ao menos uma vez por ano.</li>
        <li><strong>Idosos (acima de 7 anos):</strong> idealmente a cada 6 meses.</li>
      </ul>

      <h4>O que costuma ser avaliado</h4>
      <ul>
        <li>Peso, escore corporal, pele, pelagem e mucosas.</li>
        <li>Coração, pulmões, abdômen, dentes e gengivas.</li>
        <li>Exames de sangue e urina, quando indicados, para checar rins, fígado e sinais precoces de alterações.</li>
      </ul>

      <p>O melhor de tudo: no atendimento domiciliar, esse acompanhamento acontece <strong>sem o estresse do transporte</strong>, no ambiente em que o pet se sente seguro o que deixa o exame mais tranquilo e fiel ao comportamento real do animal.</p>
    `
  },
  {
    cat:"Cuidados Preventivos",
    titulo:"Vermifugação, pulgas e carrapatos: o básico bem feito",
    resumo:"Parasitas vão muito além da coceira: alguns transmitem doenças sérias. Veja como manter o controle em dia.",
    conteudo:`
      <p>Parasitas são um dos problemas mais comuns e mais subestimados na rotina dos pets. Além do incômodo, eles podem transmitir doenças graves, e vários afetam também as pessoas da casa.</p>

      <h4>Vermes (endoparasitas)</h4>
      <p>Vivem no intestino e em outros órgãos. Em filhotes, a vermifugação começa cedo e é repetida em intervalos curtos; em adultos, costuma ser feita periodicamente ao longo do ano. O veterinário define o produto e a frequência conforme a idade, o peso e o ambiente.</p>

      <h4>Pulgas e carrapatos (ectoparasitas)</h4>
      <ul>
        <li><strong>Pulgas</strong> causam coceira intensa, alergias e podem levar à anemia em casos graves.</li>
        <li><strong>Carrapatos</strong> transmitem doenças sérias, como a erliquiose e a babesiose ("doença do carrapato").</li>
        <li>O controle é feito com produtos específicos (comprimidos, pipetas ou coleiras) sempre os indicados para a espécie. <strong>Nunca use produto de cão em gato:</strong> alguns são tóxicos para felinos.</li>
      </ul>

      <p>A prevenção é contínua, não pontual. Um calendário simples de vermífugo e antipulgas evita a maior parte dos problemas. Podemos organizar esse cronograma junto com você.</p>
    `
  },
  {
    cat:"Gatos",
    titulo:"Gato estressado no transporte? Veja como ajudar",
    resumo:"Felinos sofrem muito fora de casa. Veja por que o atendimento domiciliar transforma a experiência.",
    conteudo:`
      <p>Para o gato, sair de casa é muito mais do que uma viagem curta: é deixar o território seguro, encarar cheiros, sons e outros animais estranhos. O resultado é o estresse que todo tutor conhece miados, salivação, respiração ofegante e, muitas vezes, um bichinho que se esconde por horas depois.</p>

      <h4>Se precisar transportar</h4>
      <ul>
        <li>Deixe a caixa de transporte aberta em casa nos dias anteriores, com um paninho ou petisco dentro, para virar um lugar familiar.</li>
        <li>Forre com um tecido com o cheiro do gato e cubra a caixa com uma toalha para reduzir estímulos.</li>
        <li>Evite alimentar muito perto da viagem, para diminuir o enjoo.</li>
      </ul>

      <h4>Por que o atendimento em casa muda tudo</h4>
      <p>Sem caixa, sem carro, sem sala de espera com cães latindo: o gato é avaliado no <strong>próprio território</strong>, calmo. Isso não só poupa o sofrimento como permite uma avaliação mais real um gato relaxado mostra sinais que um gato apavorado esconde. Para felinos, o domiciliar costuma ser, de longe, a melhor experiência.</p>
    `
  },
  {
    cat:"Cães",
    titulo:"Cães idosos: cuidados na melhor idade",
    resumo:"Adaptações simples de rotina e acompanhamento garantem mais conforto e qualidade de vida.",
    conteudo:`
      <p>Cães entram na fase idosa, em média, a partir dos 7 anos antes nas raças grandes, um pouco depois nas pequenas. Com a idade vêm mudanças naturais, mas muita coisa pode ser feita para que esses anos sejam confortáveis e felizes.</p>

      <h4>O que observar</h4>
      <ul>
        <li>Dificuldade para levantar, subir escadas ou pular pode ser dor articular.</li>
        <li>Mudanças no apetite, na sede e na frequência de xixi.</li>
        <li>Confusão, alteração no sono ou no comportamento.</li>
        <li>Caroços, mau hálito acentuado e perda ou ganho de peso.</li>
      </ul>

      <h4>Adaptações que ajudam</h4>
      <ul>
        <li>Cama macia e quentinha, longe de correntes de ar.</li>
        <li>Tapetes antiderrapantes em pisos lisos.</li>
        <li>Comedouros e bebedouros na altura confortável.</li>
        <li>Passeios mais curtos e frequentes, respeitando o ritmo dele.</li>
      </ul>

      <p>Acompanhamento veterinário a cada 6 meses ajuda a ajustar alimentação, controlar a dor e detectar cedo qualquer alteração. E, em casa, o pet idoso é avaliado sem o cansaço e o estresse do deslocamento.</p>
    `
  },
  {
    cat:"Comportamento Animal",
    titulo:"Sinais de que algo não vai bem com seu pet",
    resumo:"Mudanças de apetite, sono e humor podem dizer muito. Aprenda a observar o que realmente importa.",
    conteudo:`
      <p>Quem conhece o próprio pet percebe quando "ele não está ele mesmo". Confiar nessa percepção é importante: como cães e gatos escondem o desconforto, pequenas mudanças de rotina costumam ser os primeiros e às vezes únicos sinais de que algo precisa de atenção.</p>

      <h4>Fique atento a</h4>
      <ul>
        <li><strong>Apetite e sede:</strong> comer ou beber muito mais (ou muito menos) que o normal.</li>
        <li><strong>Energia:</strong> apatia, isolamento ou, ao contrário, agitação fora do comum.</li>
        <li><strong>Banheiro:</strong> mudanças na frequência, na cor ou na consistência do xixi e das fezes.</li>
        <li><strong>Corpo:</strong> coceira intensa, queda de pelo, caroços, mau hálito, tremores ou claudicação (mancar).</li>
        <li><strong>Respiração:</strong> ofegante em repouso, tosse ou espirros frequentes.</li>
      </ul>

      <h4>Procure ajuda sem demora se houver</h4>
      <ul>
        <li>Vômito ou diarreia persistentes, sangue em qualquer secreção.</li>
        <li>Recusa total de comida e água por mais de um dia.</li>
        <li>Dificuldade para respirar, desmaios ou convulsões.</li>
      </ul>

      <p>Na dúvida, vale conversar. Muitas vezes uma avaliação tranquila em casa já esclarece se é algo simples ou se merece investigação e o quanto antes, melhor.</p>
    `
  },
  {
    cat:"Saúde Animal",
    titulo:"Primeiros cuidados em emergências: o que fazer",
    resumo:"Saber o primeiro passo em uma urgência pode salvar vidas. Veja o que ter sempre em mente.",
    conteudo:`
      <p>Em uma emergência, manter a calma e saber o que <strong>não</strong> fazer é tão importante quanto agir. Estas orientações ajudam nos primeiros minutos mas <strong>não substituem o atendimento veterinário de urgência</strong>.</p>

      <h4>Orientações gerais</h4>
      <ul>
        <li><strong>Mantenha a calma e proteja-se:</strong> animais com dor podem morder, mesmo os mais dóceis. Se necessário, conduza com cuidado.</li>
        <li><strong>Não medique por conta própria:</strong> muitos remédios humanos (como dipirona em gatos, paracetamol e anti-inflamatórios) são <strong>tóxicos</strong> e podem ser fatais.</li>
        <li><strong>Ligue antes:</strong> entrar em contato com um veterinário no caminho agiliza o socorro.</li>
      </ul>

      <h4>Situações comuns</h4>
      <ul>
        <li><strong>Engasgo:</strong> verifique a boca com cuidado; não force objetos garganta abaixo.</li>
        <li><strong>Sangramento:</strong> faça pressão com pano limpo sobre o local.</li>
        <li><strong>Calor excessivo / insolação:</strong> leve para a sombra, ofereça água e molhe o corpo com água em temperatura ambiente (nunca gelada).</li>
        <li><strong>Suspeita de intoxicação:</strong> não provoque vômito sem orientação e leve a embalagem do produto, se houver.</li>
      </ul>

      <p>Tenha sempre à mão o contato de um veterinário e de um pronto atendimento 24h da sua região. Em caso de risco de vida, procure socorro imediatamente.</p>
    `
  }
];

const BLOG_CATS = ["Todos","Saúde Animal","Vacinas","Cuidados Preventivos","Comportamento Animal","Gatos","Cães"];

/* Fotos do carrossel "Sobre Nós".
   Salve as imagens em assets/fotos/ com estes nomes (ou edite a lista abaixo).
   Fotos que não existirem são ignoradas automaticamente. */
const FOTOS = [
  "foto-01.jpg","foto-02.jpg","foto-03.jpg","foto-04.jpg","foto-05.jpg",
  "foto-06.jpg","foto-07.jpg","foto-08.jpg","foto-09.jpg","foto-10.jpg",
  "foto-11.jpg","foto-12.jpg","foto-13.jpg","foto-14.jpg","foto-15.jpg",
  "foto-16.jpg","foto-17.jpg","foto-18.jpg","foto-19.jpg","foto-20.jpg",
  "foto-21.jpg"
];
