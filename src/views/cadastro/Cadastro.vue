<template>
    <div>
        <!-- Título da págin -->
        <h1 class="text-center mb-4 mt-4">Cadastro</h1>
        
        <form class="form-row" @submit.prevent="salvar()">

            <!-- Campo do título -->
            <div class="form-group col-md-6">
                <label>Título</label>
                <input  type="text" 
                        id="titulo" 
                        name="titulo" 
                        class="form-control" 
                        v-model="foto.titulo" 
                        data-vv-as="Título"
                        v-validate="'required'" 
                />
                <span>{{ errors.first('titulo') }}</span>
            </div>

            <!-- Campo da URL -->
            <div class="form-group col-md-6">
                <label>URL</label>
                <input  type="text" 
                        id="url" 
                        name="url" 
                        class="form-control" 
                        v-model="foto.url"
                        data-vv-as="URL"
                        v-validate="'required'"
                />
                <span>{{ errors.first('url') }}</span>
            </div>

            <!-- Campo de descrição -->
            <div class="form-group col-md-6">
                <label>Descrição</label>
                <textarea id="descricao" 
                          name="descricao" 
                          rows="10" 
                          class="form-control"
                          v-model="foto.descricao">
                </textarea>
            </div>

            <!-- Preview da foto -->
            <div class="form-group col-md-6">
                <label>Foto</label>
                <Card :foto="foto" v-show="foto.url" class="foto-preview"/>
            </div>

            <!-- Botões de controle da página -->
            <div class="form-group col-md-12">
                <button type="submit" class="btn btn-primary">Confirmar</button>
                <button type="button" class="btn btn-primary" @click="limpar()">Limpar</button>
                <button type="button" class="btn btn-primary" @click="voltar()">Voltar</button>
            </div>
        </form>

        <!-- Modal para confirmação da inclusão/alteração -->
        <Modal :id="idModalConfirmacao" 
               title="Foto" 
               :message="mensagemConfirmacao" 
               cancel="Não" 
               confirm="Sim"
               @confirmed="confirmaSalvar()"/>

    </div>
</template>

<script>
    import FotoService from '@/services/FotoService';
    import Card from '@/components/card/Card';
    import Modal from '@/components/modal/Modal';
    import ModalService from '@/components/modal/ModalService';
    import Foto from '@/domains/Foto';

    export default {
        components: {
            Card,
            Modal
        },
        beforeCreate() {
            this.fotoService = new FotoService(this.$resource);
        },
        created() {
            if (this.id) {
                this.fotoService.carregar(this.id)
                    .then(foto => this.foto = foto)
                    .catch(error => console.log(error.message));
            }
        },
        data() {
            return {
                foto: new Foto(),
                id: this.$route.params.id,
                idModalConfirmacao: 'confirmaAlteracaoFoto'
            }
        },
        computed: {
            mensagemConfirmacao() {
                const acao = this.id ? 'alteração' : 'inclusão';
                return `Confirma a ${acao} da foto?`
            },
            inclusao() {
                return !this.id;
            }
        },
        methods: {
            salvar() {
                this.$validator.validateAll()
                    .then(isFormValid => {
                        if (isFormValid) {
                            ModalService.open(this.idModalConfirmacao);
                        }
                    });
            },
            confirmaSalvar() {
                this.inclusao 
                    ? this.inserirFoto() 
                    : this.alterarFoto();
            },
            inserirFoto() {
                this.fotoService.salvar(this.foto)
                    .then( () => {
                        console.log('Folto salva com sucesso');
                        this.limpar();
                    })
                    .catch(error => console.log(error.message));                
            },
            alterarFoto() {
                this.fotoService.alterar(this.foto)
                    .then( () => {
                        console.log('Foto alterada com sucesso')
                        this.$router.push({name: 'home'});
                    })
                    .catch(error => console.log(error.message))
            },
            limpar() {
                this.$validator.reset();
                this.foto = new Foto();
            },
            voltar() {
                this.$router.push({ name: 'home'});
            }            
        }
    }
</script>

<style lang="sass" scoped>
    @import './Cadastro.scss'
</style>
