# 🛒 FitStyle - E-commerce Fullstack

Um e-commerce completo e moderno construído com **Next.js 15**, integrando pagamentos via **Stripe**, autenticação com **Supabase** e gerenciamento de estado eficiente com **Zustand**. Desenvolvido com foco em **UI profissional** e **mobile-first**.

## 🚀 [Ver Demonstração ao Vivo](https://fit-style-full-stack-e-commerce-web.vercel.app/)

## 📋 Sobre o Projeto

FitStyle é um e-commerce fullstack que demonstra a implementação de funcionalidades essenciais para uma aplicação de vendas online real, incluindo catálogo de produtos filtrado por categorias, carrinho de compras, processamento de pagamentos seguro e um sistema completo de autenticação com gerenciamento de pedidos.

Este projeto foi desenvolvido do zero, evoluindo de um projeto base com melhorias significativas em funcionalidade, design e experiência do usuário.

## ✨ Funcionalidades

### Catálogo e Navegação
- 🛍️ **Catálogo de Produtos**: Listagem completa com detalhes e imagens
- 🏷️ **Filtro por Categorias**: 5+ páginas dedicadas com categorias customizadas do Stripe
- 🎯 **Busca e Navegação**: Interface intuitiva para descoberta de produtos
- 📱 **Mobile-First**: Design totalmente responsivo e otimizado para dispositivos móveis

### Carrinho e Checkout
- 🛒 **Carrinho de Compras**: Adicionar, remover e atualizar quantidades em tempo real
- 💳 **Pagamento Integrado**: Processamento seguro via Stripe
- ✅ **Validações Robustas**: Formulários e checkout com validação completa
- 💰 **Cálculo Automático**: Subtotal, impostos e total dinâmicos

### Autenticação e Conta do Usuário
- 👤 **Sistema de Login**: Autenticação segura com Supabase
- 📋 **Perfil do Usuário**: Visualização e edição de informações cadastrais
- 🛍️ **Histórico de Compras**: Detalhes completos de pedidos anteriores
- 🔒 **Gerenciamento de Senha**: Alteração e recuperação de senha segura
- 📧 **Verificação de Email**: Confirmação de conta via email

### Design e UX
- ⚡ **Performance Otimizada**: Server Components e Client Components estrategicamente utilizados
- 🎨 **UI Profissional**: Design moderno e consistente
- 🌐 **Interações Aprimoradas**: Componentes customizados com transições suaves
- ♿ **Acessibilidade**: Componentes seguindo padrões WCAG

## 🛠️ Tecnologias Utilizadas

### Core
- **Next.js 15** - Framework React com App Router
- **React 18** - Biblioteca para construção de interfaces
- **TypeScript** - Tipagem estática para maior segurança

### Estilização
- **TailwindCSS** - Framework CSS utilitário
- **shadcn/ui** - Componentes UI reutilizáveis e acessíveis

### Estado e Dados
- **Zustand** - Gerenciamento de estado simplificado
- **Stripe** - Processamento de pagamentos
- **Supabase** - Autenticação, banco de dados e gerenciamento de usuários

### Deploy
- **Vercel** - Hospedagem e CI/CD automático

## 📦 Instalação e Uso

### Pré-requisitos
- Node.js 18+
- npm ou yarn
- Conta no Stripe (para chaves de API)
- Conta no Supabase (para autenticação e banco de dados)

### Passo a Passo

1. **Clone o repositório**

```bash
git clone https://github.com/seu-usuario/fitstyle-ecommerce.git
cd fitstyle-ecommerce
```

2. **Instale as dependências**

```bash
npm install
```

ou com yarn:

```bash
yarn install
```

3. **Configure as variáveis de ambiente**

Crie um arquivo `.env.local` na raiz do projeto:

```env
# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=sua_chave_publica_stripe
STRIPE_SECRET_KEY=sua_chave_secreta_stripe

# Supabase
NEXT_PUBLIC_SUPABASE_URL=sua_url_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima_supabase
SUPABASE_SERVICE_ROLE_KEY=sua_chave_service_role_supabase
```

4. **Execute o projeto em desenvolvimento**

```bash
npm run dev
```

ou com yarn:

```bash
yarn dev
```

5. **Acesse no navegador**

```
http://localhost:3000
```

## 🏗️ Estrutura do Projeto

```
├── app/
│   ├── (routes)/              # Páginas da aplicação
│   │   ├── page.tsx           # Home
│   │   ├── products/          # Páginas de categorias
│   │   ├── login/             # Login e autenticação
│   │   ├── checkout/          # Checkout
│   │   └── account/           # Perfil e histórico
│   ├── api/                   # API Routes (Stripe, Supabase)
│   └── layout.tsx             # Layout principal
├── components/
│   ├── ui/                    # Componentes shadcn/ui
│   ├── navbar/                # Navegação
│   ├── cart/                  # Componentes do carrinho
│   ├── auth/                  # Componentes de autenticação
│   └── ...                    # Componentes customizados
├── lib/
│   ├── store.ts               # Store Zustand
│   ├── supabase.ts            # Cliente Supabase
│   └── stripe.ts              # Utilitários Stripe
├── public/                    # Arquivos estáticos e imagens
└── styles/                    # Estilos globais
```

## 💡 Destaques Técnicos

### Zustand para State Management
O projeto utiliza Zustand para gerenciar o estado do carrinho de compras, proporcionando:
- **Zero Prop Drilling**: Estado acessível em qualquer componente
- **Performance**: Re-renders otimizados
- **Simplicidade**: API minimalista e intuitiva
- **Persistência**: Carrinho mantido entre reloads

```typescript
// Exemplo de uso
const { items, addItem, removeItem } = useCartStore();
```

### Server vs Client Components
Estratégia clara de separação entre Server e Client Components para maximizar performance:
- **Server Components**: Listagem de produtos, páginas estáticas, dados do usuário
- **Client Components**: Carrinho, interações, formulários, autenticação

### Categorias Filtradas
Sistema de categorias customizadas integrado com Stripe:
- Criação de metadados de categoria no Stripe
- Filtros dinâmicos em múltiplas páginas
- URL amigável para SEO
- Navegação intuitiva entre categorias

### Integração com Stripe
Implementação completa do fluxo de pagamento:
1. Criação de sessão de checkout
2. Redirecionamento seguro para Stripe
3. Webhook para confirmação de pagamento
4. Atualização de status do pedido

### Autenticação com Supabase
Sistema robusto de autenticação e gerenciamento de usuários:
1. Registro e login seguro
2. Armazenamento de dados de usuário
3. Histórico de pedidos associado ao usuário
4. Gerenciamento de sessão
5. Recuperação de senha por email

### Design Mobile-First
- Componentes otimizados para tela pequena
- Navegação responsiva
- Touch-friendly interactions
- Performance otimizada para mobile

## 🚀 Deploy

O projeto está configurado para deploy automático na Vercel:

1. Conecte seu repositório na Vercel
2. Configure as variáveis de ambiente (Stripe e Supabase)
3. Deploy automático a cada push
4. Acesse em: https://fit-style-full-stack-e-commerce-web.vercel.app/

## 📚 Aprendizados

Este projeto foi uma oportunidade valiosa para:
- Implementar sistema de autenticação com Supabase
- Gerenciar dados de usuário e histórico de compras
- Criar sistema de categorias dinâmicas
- Aprofundar conhecimentos em Next.js 15 e App Router
- Dominar a diferenciação entre Server e Client Components
- Explorar alternativas de state management (Zustand vs Redux vs Context API)
- Implementar fluxo completo de pagamento com Stripe
- Desenvolver com abordagem mobile-first
- Aplicar boas práticas de UX em e-commerce

## 🔐 Segurança

- Chaves sensíveis armazenadas em variáveis de ambiente
- Autenticação de usuário com Supabase
- Webhooks do Stripe verificados
- Validação de dados no servidor
- Proteção contra CSRF e XSS

## 📝 Próximas Melhorias

- [ ] Sistema de avaliações e comentários de produtos
- [ ] Wishlist/Favoritos
- [ ] Cupons e códigos promocionais
- [ ] Notificações por email de pedidos
- [ ] Dashboard administrativo
- [ ] Sistema de recomendações
- [ ] Analytics e relatórios

## 🙏 Créditos

Projeto desenvolvido com base no tutorial do **PedroTech**, com evoluções significativas em funcionalidade, design e experiência do usuário.

## 📄 Licença

Este projeto está sob a licença MIT. Sinta-se livre para usar, modificar e distribuir.

---

**Desenvolvido com ❤️ usando Next.js, Stripe e Supabase**
