# appalterafundo

App customizado para VTEX IO criado para suportar experiências específicas de produto na loja da Stermax Health, com foco principal na PDP da linha **Plena**.

## Objetivo

Este app foi criado para centralizar comportamentos visuais e interativos específicos de produtos, evitando duplicação excessiva de blocos no Store Theme e facilitando a manutenção de regras personalizadas.

A proposta do app é concentrar tudo o que foge de uma customização puramente estrutural do tema, especialmente quando a necessidade é:

- alterar elementos visuais por produto;
- trocar logo, header e footer dinamicamente;
- exibir experiências interativas na PDP;
- controlar visualizador 360;
- exibir pontos interativos sobre imagens do produto.

---

## O que existe neste app

Atualmente este app possui **4 frentes principais**:

### 1. Alterador visual por produto

Existe um componente React responsável por verificar o produto atual da PDP e aplicar alterações visuais específicas quando o produto corresponde ao ID configurado.

Hoje a regra principal está aplicada ao produto:

- **ID 2976**

Esse componente foi criado para permitir identidade visual própria para a PDP da Plena sem precisar duplicar páginas inteiras no tema.

---

### 2. Alterador dinâmico de Header e Footer

O app possui um componente responsável por alterar elementos do **header** e do **footer** dinamicamente conforme o produto exibido.

Entre as alterações já implementadas estão:

- troca de gradiente no topo;
- troca de cores de links do menu superior;
- troca de logo;
- troca de imagem específica do footer;
- troca de fundo do footer;
- troca de cor de textos específicos;
- troca de cor de botão;
- ajustes complementares de branding da PDP da Plena.

Essa abordagem foi escolhida para evitar reescrever grandes estruturas com `condition-layout` quando a necessidade era apenas visual.

---

### 3. Visualizador 360 / 3D do produto

Existe um componente React responsável por exibir a sequência de imagens do produto em navegação 360.

Esse visualizador permite:

- rotação horizontal;
- rotação vertical;
- leitura da sequência de imagens a partir de uma base URL;
- organização dos links das imagens em arquivo separado para facilitar expansão futura.

O objetivo é permitir reutilização futura para outros produtos ou linhas, sem precisar reescrever a lógica principal.

---

### 4. Hotspots interativos sobre imagem

O app também possui um componente de **hotspots interativos**, criado para exibir bolinhas clicáveis sobre uma imagem do produto.

Esse componente foi desenvolvido para funcionar de forma responsiva, mantendo os pontos corretamente posicionados sobre áreas específicas da imagem, independentemente do tamanho da tela.

Atualmente os hotspots são usados na imagem frontal e traseira do equipamento da Plena e permitem destacar elementos como:

- Acesse o Manual;
- Visor Digital;
- Manípulo de Fechamento;
- Botão de Despressurização;
- Disjuntor Liga/Desliga;
- Bocal de Saída de Vapor;
- Cabo de Força Bivolt.

### Funcionalidades dos hotspots

O componente de hotspots já possui:

- pontos posicionados com coordenadas percentuais;
- comportamento responsivo;
- abertura de card com título e descrição ao clicar;
- fechamento ao clicar novamente no ponto;
- fechamento pelo botão de fechar do card;
- fechamento ao clicar fora;
- troca do símbolo `+` para `×` quando ativo;
- transição suave na troca do ícone;
- estilo visual customizado da bolinha com aro translúcido.

---

## Estrutura geral do app

A estrutura pode variar conforme evolução do projeto, mas hoje a ideia principal é esta:

```txt
react/
  plenavr.tsx
  ProductThemeController.tsx
  PlenaHotspots.tsx
  PlenaHotspots.css
  config/
    imageBases.ts

store/
  interfaces.json

manifest.json
