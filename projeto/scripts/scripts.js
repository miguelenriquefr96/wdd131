document.addEventListener('DOMContentLoaded', () => {
    // Inicialização das funções do site
    initMenuAtivo();
    initMenuMobile();
    initLazyLoading();
    initFiltroServicos();
    initFAQAcordeao();
    initFormularioContato();
    carregarHistoricoLocalStorage();
    preencherParametroServicoURL();
});

/**
 * Função Auxiliar: Identifica e marca a página atual no menu de navegação
 */
function initMenuAtivo() {
    const paginaAtual = window.location.pathname.split('/').pop() || 'index.html';
    const linksNav = document.querySelectorAll('.nav-menu a, nav a');

    linksNav.forEach(link => {
        const hrefLink = link.getAttribute('href');
        if (hrefLink === paginaAtual) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

/**
 * Função 1: Navegação Mobile (Menu Hamburguer)
 */
function initMenuMobile() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('aberto');
            const estaAberto = navMenu.classList.contains('aberto');
            navToggle.setAttribute('aria-expanded', estaAberto ? 'true' : 'false');
        });
    }
}

/**
 * Função 2: Carregamento Lento (Lazy Loading) de Imagens via IntersectionObserver
 */
function initLazyLoading() {
    const imagensLazy = document.querySelectorAll('.lazy-img');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, observerSelf) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const srcReal = img.getAttribute('data-src');
                    if (srcReal) {
                        img.src = srcReal;
                        img.removeAttribute('data-src');
                    }
                    observerSelf.unobserve(img);
                }
            });
        });

        imagensLazy.forEach(img => observer.observe(img));
    } else {
        // Fallback para navegadores sem suporte ao IntersectionObserver
        imagensLazy.forEach(img => {
            const srcReal = img.getAttribute('data-src');
            if (srcReal) img.src = srcReal;
        });
    }
}

/**
 * Função 3: Filtro Interativo de Serviços usando Arrays e Array Methods (filter, forEach)
 */
function initFiltroServicos() {
    const botoesFiltro = document.querySelectorAll('.btn-filtro');
    const cardsServico = document.querySelectorAll('.card-detalhe-servico');

    if (botoesFiltro.length === 0 || cardsServico.length === 0) return;

    // Converter NodeList em Array para uso de métodos de array
    const arrayCards = Array.from(cardsServico);

    botoesFiltro.forEach(botao => {
        botao.addEventListener('click', () => {
            // Atualizar classe ativa dos botões
            botoesFiltro.forEach(b => b.classList.remove('active'));
            botao.classList.add('active');

            const categoriaSelecionada = botao.getAttribute('data-categoria');

            // Filtragem utilizando branch condicional e métodos de array
            arrayCards.forEach(card => {
                const categoriaCard = card.getAttribute('data-categoria');

                if (categoriaSelecionada === 'todos' || categoriaCard === categoriaSelecionada) {
                    card.style.display = 'grid';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

/**
 * Função 4: Acordeão de FAQ / Perguntas Frequentes
 */
function initFAQAcordeao() {
    const perguntas = document.querySelectorAll('.faq-pergunta');

    perguntas.forEach(pergunta => {
        pergunta.addEventListener('click', () => {
            const itemPai = pergunta.parentElement;
            const jaAtivo = itemPai.classList.contains('ativo');

            // Fechar todos os itens (repetição)
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('ativo');
            });

            // Se não estava ativo, abre o clicado (branch condicional)
            if (!jaAtivo) {
                itemPai.classList.add('ativo');
            }
        });
    });
}

/**
 * Função 5: Validação, Processamento do Formulário e Salvamento em localStorage
 */
function initFormularioContato() {
    const form = document.getElementById('formOrcamento');
    const statusDiv = document.getElementById('statusForm');

    if (!form) return;

    form.addEventListener('submit', (evento) => {
        evento.preventDefault();

        // Limpar mensagens prévias de erro
        limparErrosFormulario();

        // Objeto com os dados digitados
        const dadosForm = {
            nome: document.getElementById('nome').value.trim(),
            email: document.getElementById('email').value.trim(),
            telefone: document.getElementById('telefone').value.trim(),
            servico: document.getElementById('servico').value,
            mensagem: document.getElementById('mensagem').value.trim(),
            dataEnvio: new Date().toLocaleString('pt-BR')
        };

        // Validação com branch condicional
        let formValido = true;

        if (dadosForm.nome.length < 3) {
            exibirErro('erroNome', 'Por favor, digite seu nome completo (mínimo 3 caracteres).');
            formValido = false;
        }

        if (!dadosForm.email.includes('@') || !dadosForm.email.includes('.')) {
            exibirErro('erroEmail', 'Por favor, informe um endereço de e-mail válido.');
            formValido = false;
        }

        if (dadosForm.telefone.length < 8) {
            exibirErro('erroTelefone', 'Por favor, informe um telefone válido.');
            formValido = false;
        }

        if (!dadosForm.servico) {
            exibirErro('erroServico', 'Selecione a categoria de serviço desejada.');
            formValido = false;
        }

        if (dadosForm.mensagem.length < 10) {
            exibirErro('erroMensagem', 'Descreva brevemente sua solicitação (mínimo 10 caracteres).');
            formValido = false;
        }

        if (formValido) {
            // Salvar no localStorage
            localStorage.setItem('msstaben_ultimo_orcamento', JSON.stringify(dadosForm));

            // Feedback visual utilizando EXCLUSIVAMENTE Template Literals
            statusDiv.className = 'status-form sucesso';
            statusDiv.innerHTML = `<p>✅ Obrigado, <strong>${dadosForm.nome}</strong>! Sua solicitação para <strong>${dadosForm.servico}</strong> foi enviada com sucesso em ${dadosForm.dataEnvio}. Entraremos em contato em breve!</p>`;

            form.reset();
            carregarHistoricoLocalStorage();
        } else {
            statusDiv.className = 'status-form erro';
            statusDiv.innerHTML = `<p>⚠️ Por favor, corrija os erros destacados no formulário acima antes de enviar.</p>`;
        }
    });
}

/**
 * Função Auxiliar para Exibir Erros
 */
function exibirErro(idElemento, mensagem) {
    const el = document.getElementById(idElemento);
    if (el) el.textContent = mensagem;
}

/**
 * Função Auxiliar para Limpar Erros do Form
 */
function limparErrosFormulario() {
    const erros = document.querySelectorAll('.msg-erro');
    erros.forEach(el => el.textContent = '');
    const statusDiv = document.getElementById('statusForm');
    if (statusDiv) {
        statusDiv.className = 'status-form';
        statusDiv.innerHTML = '';
    }
}

/**
 * Função 6: Carregar e Exibir Dados do localStorage usando Template Literals
 */
function carregarHistoricoLocalStorage() {
    const containerHistorico = document.getElementById('historicoContainer');
    const conteudoHistorico = document.getElementById('historicoConteudo');
    const btnLimpar = document.getElementById('btnLimparHistorico');

    if (!containerHistorico || !conteudoHistorico) return;

    const orcamentoSalvoJSON = localStorage.getItem('msstaben_ultimo_orcamento');

    if (orcamentoSalvoJSON) {
        try {
            const dados = JSON.parse(orcamentoSalvoJSON);

            // Construção da string de saída usando EXCLUSIVAMENTE Template Literals
            conteudoHistorico.innerHTML = `
                <p><strong>Nome:</strong> ${dados.nome}</p>
                <p><strong>E-mail:</strong> ${dados.email} | <strong>Telefone:</strong> ${dados.telefone}</p>
                <p><strong>Serviço Solicitado:</strong> ${dados.servico}</p>
                <p><strong>Descrição:</strong> "${dados.mensagem}"</p>
                <p><small>Enviado em: ${dados.dataEnvio}</small></p>
            `;

            containerHistorico.style.display = 'block';

            if (btnLimpar) {
                btnLimpar.onclick = () => {
                    localStorage.removeItem('msstaben_ultimo_orcamento');
                    containerHistorico.style.display = 'none';
                };
            }
        } catch (e) {
            console.error('Erro ao ler do localStorage', e);
        }
    } else {
        containerHistorico.style.display = 'none';
    }
}

/**
 * Função Auxiliar: Preenche o combo do formulário com base no parâmetro URL ?servico=
 */
function preencherParametroServicoURL() {
    const params = new URLSearchParams(window.location.search);
    const servicoParam = params.get('servico');
    const selectServico = document.getElementById('servico');

    if (servicoParam && selectServico) {
        selectServico.value = servicoParam;
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modalPortfolio');
    const imgModal = document.getElementById('imgModal');
    const legendaModal = document.getElementById('legendaModal');
    const btnFechar = document.getElementById('fecharModal');
    const cardsPortfolio = document.querySelectorAll('.card-portfolio');

    // Ao clicar em qualquer card do portfólio
    cardsPortfolio.forEach(card => {
        card.addEventListener('click', () => {
            const img = card.querySelector('img');
            const titulo = card.querySelector('h3') ? card.querySelector('h3').innerText : '';

            if (img) {
                modal.style.display = 'block';
                imgModal.src = img.src;
                imgModal.alt = img.alt;
                legendaModal.innerText = titulo;
            }
        });
    });

    // Fechar ao clicar no botão "X"
    if (btnFechar) {
        btnFechar.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    // Fechar ao clicar fora da imagem
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
});