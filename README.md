# 🌸 The Emotional Garden

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Características Principais](#-características-principais)
- [Objetivos Educativos](#-objetivos-educativos)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Fluxo da Aplicação](#-fluxo-da-aplicação)
- [Equipa](#-equipa)
- [Informação Académica](#-informação-académica)
- [Licença](#-licença)

---

## Sobre o Projeto

**The Emotional Garden** é uma aplicação web educacional interativa desenvolvida para crianças entre 5 e 8 anos, com o objetivo de ensinar inteligência emocional através de uma experiência lúdica e visual.

O projeto combina:
- **Educação Emocional**: Ensina 6 emoções básicas (Alegria, Tristeza, Medo, Raiva, Amor, Calma)
- **Interatividade**: Pintura de flores emocionais com cores associadas a sentimentos
- **Tecnologia Pepper's Ghost**: Projeção holográfica das flores criadas
- **Gamificação**: Sistema de jardim coletivo e histórico de emoções

### Objetivos Educativos

- Crianças conseguem identificar e nomear 5-6 emoções básicas
- Desenvolvem vocabulário emocional apropriado
- Compreendem que sentimentos são normais e podem ser expressos
- Praticam empatia ao explorar diferentes emoções
- Criam associação positiva entre cores/natureza e estados emocionais

---

## Características Principais

| Funcionalidade | Descrição |
|----------------|-----------|
| **Sistema de Pintura** | Flood Fill e pincel livre para colorir flores |
| **Pepper's Ghost** | Visualização holográfica das flores criadas |
| **Histórico** | Registo mensal das flores pintadas |
| **Jardim Coletivo** | Visualização partilhada das flores de todos |
| **Feedback Sonoro** | Sons gerados via Web Audio API |
| **Responsivo** | Otimizado para tablets e desktops |

---

## Tecnologias Utilizadas

### Frontend
```
HTML5          - Estrutura semântica das páginas
CSS3           - Estilização e animações
JavaScript ES6 - Lógica e interatividade
```

### APIs do Browser
```
Canvas API     - Renderização 2D para pintura
Web Audio API  - Geração de sons em tempo real
LocalStorage   - Persistência de dados local
Fullscreen API - Modo ecrã completo para hologramas
```

### Recursos Externos
```
Google Fonts   - Tipografia Quicksand
SVG            - Ícones e logótipo vetoriais
```

## Fluxo da Aplicação

```
┌─────────────────────────────────────────────────────────────────┐
│                         INDEX.HTML                               │
│                    Menu de 6 Emoções                            │
└─────────────────────┬───────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────────┐
│                    EMOÇÃO.HTML                                   │
│           (alegria, tristeza, medo, raiva, amor, calma)         │
│              Explicação educativa da emoção                      │
└─────────────────────┬───────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────────┐
│                      PINTAR.HTML                                 │
│              🎨 Interface de Pintura                             │
│     - Escolher cor (6 cores = 6 emoções)                        │
│     - Escolher tipo de flor (3 opções)                          │
│     - Pintar com Flood Fill ou Pincel                           │
│     - Dar nome à flor                                            │
└─────────────────────┬───────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────────┐
│                    RESULTADO.HTML                                │
│              Visualização da flor pintada                        │
└─────────────────────┬───────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────────┐
│                     PLANTAR.HTML                                 │
│                  Escolha de destino:                             │
│     ┌──────────────┴──────────────┐                             │
│     ▼                              ▼                             │
│  🌿 Jardim                    ✨ Holograma                       │
│  Coletivo                     Individual                         │
└─────┬────────────────────────────┬──────────────────────────────┘
      │                            │
      ▼                            ▼
┌─────────────┐            ┌─────────────┐
│ JARDIM.HTML │            │HOLOGRAMA.HTML│
│  Mesa com   │            │ Pepper's    │
│ todas as    │            │ Ghost com   │
│ flores      │            │ a tua flor  │
└─────────────┘            └─────────────┘
```
---

## Paleta de Cores e Emoções

| Cor | Código Hex | Emoção | Flor Associada |
|-----|------------|--------|----------------|
| 🟡 Amarelo | `#FEF0CB` | Alegria | Girassol |
| 🔵 Azul Claro | `#DDF0FF` | Calma | Miosótis |
| 🟣 Roxo | `#EBE2FF` | Medo | Violeta |
| 🔴 Vermelho | `#FFE2DF` | Raiva | Rosa com espinhos |
| 🩷 Rosa | `#FFE4F7` | Amor | Tulipa |
| 🟢 Verde | `#D6F2DA` | Tristeza | Trevo |

---

## Atalhos de Teclado

| Tecla | Ação |
|-------|------|
| `1-6` | Selecionar cor |
| `F` | Modo Preencher (Fill) |
| `B` | Modo Pincel (Brush) |
| `C` | Ativar Borracha |
| `Enter` | Enviar flor |
| `F` (hologramas) | Modo ecrã completo |
| `Escape` | Sair do ecrã completo |

---

## Equipa

| Nome | Função |
|------|--------|
| **Gabriel Vieira** | Visual Artist |
| **Leonor Freitas** | UX/UI Designer & Web Developer |
| **Francisco Gouveia** | Designer |

### Informação Académica

- **Instituição**: Universidade da Madeira
- **Faculdade**: Faculdade de Ciências Exatas e da Engenharia
- **Curso**: MDMI (Mestrado em Design de Media Interativos)
- **Disciplina**: Interactive Media Design
- **Professora**: Mara Dionisio

---

## Licença

Copyright © 2026 The Emotional Garden | All Rights Reserved

---

## Orientação

- Professora: Mara Dionisio
- Inspirações: "Inside Out" (Pixar), "O Monstro das Cores", "Emocionário"

---

<div align="center">

**Feito com 💚 para ajudar crianças a entenderem as suas emoções**

[⬆ Voltar ao topo](#-the-emotional-garden)

</div>
