<template>
    <div>
        <!-- Título da página -->
        <h1 class="text-center mb-4 mt-4">Fotos</h1>

        <!-- Filtro -->
        <div class="row justify-content-center mb-4">
            <div class="col-md-4">
                <input  type="text" 
                        id="filtro" 
                        name="filtro" 
                        class="form-control" 
                        placeholder="Filtre as fotos aqui..."
                        v-model="filtro"
                        />
            </div>
            <div class="col-md-1">
                <button class="btn btn-primary btn-limpa-filtro">Limpar</button>
            </div>
        </div>

        <!-- Fotos -->
        <CardDeck>
            <Card v-for="foto of fotosFiltradas" :key="foto.url" :foto="foto" :showFooter="true">
                <div slot="footer" class="footer">
                    <div class="row d-flex justify-content-around">
                        <button class="btn btn-primary" 
                                @click="alterarFoto(foto)">
                            Alterar
                        </button>

                        <button class="btn btn-danger" 
                                @click="removerFoto(foto)" 
                                v-modal-handler="idModalExclusao">
                            Excluir
                        </button>

                    </div>
                </div>
            </Card>
        </CardDeck>

        <!-- Modal para confirmação de remoção de foto -->
        <Modal :id="idModalExclusao" 
               title="Foto" 
               :message="mesagemExclusao" 
               cancel="Não" 
               confirm="Sim"
               @confirmed="confirmaRemoverFoto()"
               @canceled="cancelaRemoverFoto()"/>
    </div>
</template>

<script>
    import FotoService from '@/services/FotoService';
    import CardDeck from '@/components/card-deck/CardDeck';
    import Card from '@/components/card/Card';
    import Modal from '@/components/modal/Modal';
    import '@/components/modal/ModalDirective';

    export default {
        components: {
            CardDeck,
            Card,
            Modal
        },
        computed: {
            fotosFiltradas() {
                if (this.filtro) {
                    const termoDeBusca = new RegExp(this.filtro, 'i');
                    return this.fotos.filter(foto => termoDeBusca.test(foto.titulo.toLowerCase()));
                }
                return this.fotos;
            },
            mesagemExclusao() {
                return `Deseja realmente remover a foto "${this.fotoSelecionada.titulo}"?`;
            }
        },
        data() {
            return {
                fotos: [],
                fotoSelecionada: {},
                filtro: '',
                idModalExclusao: 'removerFotoModal'
            }
        },
        beforeCreate() {
            this.fotoService = new FotoService(this.$resource);
        },
        created() {
            this.fotoService.carregarTodas()
                .then(fotos => this.fotos = fotos)
                .catch(error => console.log(error.message));
        },
        methods: {
            removerFoto(foto) {
                this.fotoSelecionada = foto
            },
            confirmaRemoverFoto() {
                this.fotoService.remover(this.fotoSelecionada)
                    .then( () => {
                        const posicaoFoto = this.fotos.indexOf(this.fotoSelecionada);
                        this.fotos.splice(posicaoFoto, 1);
                        this.cancelaRemoverFoto();
                    })
                    .catch(error => console.log(error.message));
            },
            cancelaRemoverFoto() {
                this.fotoSelecionada = {};
            },
            alterarFoto(foto) {
                this.$router.push({ name: 'alteracao', params: { id : foto._id }})
            }
        }
    }
</script>

<style lang="sass" scoped>
    @import './Home.scss'
</style>
