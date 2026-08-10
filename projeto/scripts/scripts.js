document.addEventListener('DOMContentLoaded', () => {
    initMenuAtivo();
    initMenuMobile();
    initLazyLoading();
    initFiltroServicos();
    initFAQAcordeao();
    initFormularioContato();
    carregarHistoricoLocalStorage();
    preencherParametroServicoURL();
    initModalPortfolio();
});


function escapeHTML(str) {
    if (!str) return '';
    return str.replace(/[&<>"']/g, (match) => {
        const escapeMap = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        };
        return escapeMap[match];
    });
}

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
        // Fallback para navegadores sem suporte
        imagensLazy.forEach(img => {
            const srcReal = img.getAttribute('data-src');
            if (srcReal) img.src = srcReal;
        });
    }
}


function initFiltroServicos() {
    const botoesFiltro = document.querySelectorAll('.btn-filtro');
    const cardsServico = document.querySelectorAll('.card-detalhe-servico');

    if (botoesFiltro.length === 0 || cardsServico.length === 0) return;

    const arrayCards = Array.from(cardsServico);

    botoesFiltro.forEach(botao => {
        botao.addEventListener('click', () => {
            botoesFiltro.forEach(b => b.classList.remove('active'));
            botao.classList.add('active');

            const categoriaSelecionada = botao.getAttribute('data-categoria');

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


function initFAQAcordeao() {
    const perguntas = document.querySelectorAll('.faq-pergunta');

    perguntas.forEach(pergunta => {
        pergunta.addEventListener('click', () => {
            const itemPai = pergunta.parentElement;
            const jaAtivo = itemPai.classList.contains('ativo');

            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('ativo');
            });

            if (!jaAtivo) {
                itemPai.classList.add('ativo');
            }
        });
    });
}


function initFormularioContato() {
    const form = document.getElementById('formOrcamento');
    const statusDiv = document.getElementById('statusForm');

    if (!form) return;

    form.addEventListener('submit', (evento) => {
        evento.preventDefault();

        limparErrosFormulario();

        const dadosForm = {
            nome: document.getElementById('nome').value.trim(),
            email: document.getElementById('email').value.trim(),
            telefone: document.getElementById('telefone').value.trim(),
            servico: document.getElementById('servico').value,
            mensagem: document.getElementById('mensagem').value.trim(),
            dataEnvio: new Date().toLocaleString('pt-BR')
        };

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
            localStorage.setItem('msstaben_ultimo_orcamento', JSON.stringify(dadosForm));

            statusDiv.className = 'status-form sucesso';
            statusDiv.innerHTML = `<p>✅ Obrigado, <strong>${escapeHTML(dadosForm.nome)}</strong>! Sua solicitação para <strong>${escapeHTML(dadosForm.servico)}</strong> foi enviada com sucesso em ${dadosForm.dataEnvio}. Entraremos em contato em breve!</p>`;

            form.reset();
            carregarHistoricoLocalStorage();
        } else {
            statusDiv.className = 'status-form erro';
            statusDiv.innerHTML = `<p>⚠️ Por favor, corrija os erros destacados no formulário acima antes de enviar.</p>`;
        }
    });
}


function exibirErro(idElemento, mensagem) {
    const el = document.getElementById(idElemento);
    if (el) el.textContent = mensagem;
}


function limparErrosFormulario() {
    const erros = document.querySelectorAll('.msg-erro');
    erros.forEach(el => el.textContent = '');
    const statusDiv = document.getElementById('statusForm');
    if (statusDiv) {
        statusDiv.className = 'status-form';
        statusDiv.innerHTML = '';
    }
}


function carregarHistoricoLocalStorage() {
    const containerHistorico = document.getElementById('historicoContainer');
    const conteudoHistorico = document.getElementById('historicoConteudo');
    const btnLimpar = document.getElementById('btnLimparHistorico');

    if (!containerHistorico || !conteudoHistorico) return;

    const orcamentoSalvoJSON = localStorage.getItem('msstaben_ultimo_orcamento');

    if (orcamentoSalvoJSON) {
        try {
            const dados = JSON.parse(orcamentoSalvoJSON);

            conteudoHistorico.innerHTML = `
                <p><strong>Nome:</strong> ${escapeHTML(dados.nome)}</p>
                <p><strong>E-mail:</strong> ${escapeHTML(dados.email)} | <strong>Telefone:</strong> ${escapeHTML(dados.telefone)}</p>
                <p><strong>Serviço Solicitado:</strong> ${escapeHTML(dados.servico)}</p>
                <p><strong>Descrição:</strong> "${escapeHTML(dados.mensagem)}"</p>
                <p><small>Enviado em: ${escapeHTML(dados.dataEnvio)}</small></p>
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


function preencherParametroServicoURL() {
    const params = new URLSearchParams(window.location.search);
    const servicoParam = params.get('servico');
    const selectServico = document.getElementById('servico');

    if (servicoParam && selectServico) {
        selectServico.value = servicoParam;
    }
}


function initModalPortfolio() {
    const modal = document.getElementById('modalPortfolio');
    const imgModal = document.getElementById('imgModal');
    const legendaModal = document.getElementById('legendaModal');
    const btnFechar = document.getElementById('fecharModal');
    const cardsPortfolio = document.querySelectorAll('.card-portfolio');

    if (!modal) return;

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

    const fecharModal = () => {
        modal.style.display = 'none';
    };

    if (btnFechar) {
        btnFechar.addEventListener('click', fecharModal);
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            fecharModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            fecharModal();
        }
    });
}