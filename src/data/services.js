export const services = [
  { num: '01', title: 'Diagnóstico de Presença', desc: 'Leio o perfil como quem chega pela primeira vez: o que a marca comunica, o que ainda fica confuso e onde existe uma história melhor para contar.' },
  { num: '02', title: 'Direção Editorial', desc: 'Defino ideias centrais, pilares, formatos e ritmo para o conteúdo ter continuidade sem virar fórmula.' },
  { num: '03', title: 'Roteiro e Texto', desc: 'Escrevo ganchos, roteiros, legendas e chamadas com clareza, personalidade e uma voz que combine com o negócio.' },
  { num: '04', title: 'Direção de Captação', desc: 'Planejo cenas, enquadramentos e sequências para transformar produto, rotina e bastidores em material com intenção.' },
  { num: '05', title: 'Edição de Conteúdo', desc: 'Organizo corte, som, legendas e ritmo para cada vídeo sustentar a ideia sem perder naturalidade.' },
  { num: '06', title: 'Organização de Presença', desc: 'Alinho bio, destaques, feed e caminhos de contato para a marca parecer mais clara, coerente e fácil de entender.' },
  { num: '07', title: 'Leitura e Ajuste', desc: 'Observo alcance, retenção, salvamentos e respostas para entender o que merece continuar, mudar ou ser testado de outro jeito.' },
]

const servicesEn = [
  { num: '01', title: 'Presence Diagnosis', desc: 'I read the profile as a first-time visitor: what the brand communicates, what remains unclear and where a better story is waiting to be told.' },
  { num: '02', title: 'Editorial Direction', desc: 'I define central ideas, pillars, formats and rhythm so content can stay consistent without turning into a formula.' },
  { num: '03', title: 'Scripts and Writing', desc: 'I write hooks, scripts, captions and calls to action with clarity, personality and a voice that fits the business.' },
  { num: '04', title: 'Capture Direction', desc: 'I plan scenes, framing and sequences that turn products, routines and behind-the-scenes moments into intentional material.' },
  { num: '05', title: 'Content Editing', desc: 'I shape cuts, sound, captions and rhythm so every video supports the idea without losing its natural feel.' },
  { num: '06', title: 'Presence Organization', desc: 'I align bios, highlights, feeds and contact paths so the brand feels clearer, more coherent and easier to understand.' },
  { num: '07', title: 'Review and Adjustment', desc: 'I look at reach, retention, saves and responses to understand what should continue, change or be tested differently.' },
]

export const localizeServices = (language) => (language === 'en' ? servicesEn : services)
