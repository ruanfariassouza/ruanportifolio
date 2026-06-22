export const services = [
  { num: '01', title: 'Diagnóstico de Perfil', desc: 'Analiso bio, destaques, feed, posicionamento e clareza da comunicação antes de propor conteúdo.' },
  { num: '02', title: 'Planejamento Editorial', desc: 'Organizo pilares, calendário, formatos e pautas a partir do objetivo e da rotina da marca.' },
  { num: '03', title: 'Roteiro e Copy', desc: 'Transformo briefing em ganchos, roteiros, legendas e CTAs adequados a cada formato.' },
  { num: '04', title: 'Captação Mobile', desc: 'Planejo enquadramentos e sequências para transformar produto, equipe e bastidores em material útil.' },
  { num: '05', title: 'Edição de Vídeos Curtos', desc: 'Trabalho cortes, legendas, ritmo e acabamento com prioridade para retenção e clareza.' },
  { num: '06', title: 'Organização de Perfil', desc: 'Estruturo bio, destaques e feed para a identidade e a proposta da marca serem compreendidas.' },
  { num: '07', title: 'Leitura de Métricas', desc: 'Observo alcance, retenção, salvamentos e respostas para orientar os próximos testes editoriais.' },
]

const servicesEn = [
  { num: '01', title: 'Profile Diagnosis', desc: 'I analyze bio, highlights, feed, positioning and communication clarity before proposing content.' },
  { num: '02', title: 'Editorial Planning', desc: 'I organize pillars, calendars, formats and topics around the brand’s goals and routine.' },
  { num: '03', title: 'Scripting and Copy', desc: 'I turn briefs into hooks, scripts, captions and calls to action suited to each format.' },
  { num: '04', title: 'Mobile Capture', desc: 'I plan framing and sequences that turn products, teams and behind-the-scenes moments into useful material.' },
  { num: '05', title: 'Short-form Editing', desc: 'I work on cuts, captions, rhythm and finish with retention and clarity as priorities.' },
  { num: '06', title: 'Profile Organization', desc: 'I structure bios, highlights and feeds so the brand identity and proposition are easy to understand.' },
  { num: '07', title: 'Metrics Analysis', desc: 'I observe reach, retention, saves and responses to guide the next editorial tests.' },
]

export const localizeServices = (language) => (language === 'en' ? servicesEn : services)
